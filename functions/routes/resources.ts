import { Env } from '../types';
import { corsHeaders } from '../utils/cors';
import { verifyToken } from '../utils/auth';

export async function resourcesRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  // Some resources might be public, so auth is optional for GET
  let user = null;
  if (token) {
    user = await verifyToken(token, env);
  }
  
  const [action, id] = path;
  
  switch (request.method) {
    case 'GET':
      if (id) {
        return getResourceById(id, env);
      }
      return getResources(request, env);
    case 'POST':
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return createResource(request, env, user);
    case 'PUT':
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return updateResource(request, id, env, user);
    case 'DELETE':
      if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return deleteResource(id, env, user);
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
}

async function getResources(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const subject = url.searchParams.get('subject');
  const gradeLevel = url.searchParams.get('gradeLevel');
  const type = url.searchParams.get('type');
  
  let query = 'SELECT * FROM resources WHERE 1=1';
  const params = [];
  
  if (subject) {
    query += ' AND subject = ?';
    params.push(subject);
  }
  
  if (gradeLevel) {
    query += ' AND grade_level = ?';
    params.push(gradeLevel);
  }
  
  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }
  
  query += ' ORDER BY created_at DESC LIMIT 100';
  
  const resources = await env.DB.prepare(query).bind(...params).all();
  
  return new Response(JSON.stringify(resources.results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getResourceById(id: string, env: Env): Promise<Response> {
  const resource = await env.DB.prepare(
    'SELECT * FROM resources WHERE id = ?'
  ).bind(id).first();
  
  if (!resource) {
    return new Response(JSON.stringify({ error: 'Resource not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  return new Response(JSON.stringify(resource), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function createResource(request: Request, env: Env, user: any): Promise<Response> {
  if (user.role !== 'educator' && user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Only educators and admins can create resources' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const body = await request.json();
  
  const resource = await env.DB.prepare(
    `INSERT INTO resources (title, description, type, subject, grade_level, content_url, metadata, created_by) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(
    body.title,
    body.description,
    body.type,
    body.subject,
    body.gradeLevel,
    body.contentUrl,
    JSON.stringify(body.metadata || {}),
    user.id
  ).first();
  
  return new Response(JSON.stringify(resource), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateResource(request: Request, id: string, env: Env, user: any): Promise<Response> {
  // Check if user owns the resource or is admin
  const resource = await env.DB.prepare(
    'SELECT created_by FROM resources WHERE id = ?'
  ).bind(id).first();
  
  if (!resource) {
    return new Response(JSON.stringify({ error: 'Resource not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  if (resource.created_by !== user.id && user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const body = await request.json();
  const updates = [];
  const values = [];
  
  if (body.title) {
    updates.push('title = ?');
    values.push(body.title);
  }
  
  if (body.description) {
    updates.push('description = ?');
    values.push(body.description);
  }
  
  if (body.contentUrl) {
    updates.push('content_url = ?');
    values.push(body.contentUrl);
  }
  
  if (body.metadata) {
    updates.push('metadata = ?');
    values.push(JSON.stringify(body.metadata));
  }
  
  updates.push('updated_at = datetime("now")');
  values.push(id);
  
  await env.DB.prepare(
    `UPDATE resources SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...values).run();
  
  return new Response(JSON.stringify({ message: 'Resource updated successfully' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function deleteResource(id: string, env: Env, user: any): Promise<Response> {
  const resource = await env.DB.prepare(
    'SELECT created_by FROM resources WHERE id = ?'
  ).bind(id).first();
  
  if (!resource) {
    return new Response(JSON.stringify({ error: 'Resource not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  if (resource.created_by !== user.id && user.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  await env.DB.prepare('DELETE FROM resources WHERE id = ?').bind(id).run();
  
  return new Response(JSON.stringify({ message: 'Resource deleted successfully' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}