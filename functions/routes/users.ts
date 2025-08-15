import { Env } from '../types';
import { corsHeaders } from '../utils/cors';
import { verifyToken } from '../utils/auth';

export async function usersRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const user = await verifyToken(token, env);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const [action, id] = path;
  
  switch (request.method) {
    case 'GET':
      if (id) {
        return getUserById(id, env, user);
      }
      return getUsers(env, user);
    case 'PUT':
      return updateUser(request, id, env, user);
    case 'DELETE':
      return deleteUser(id, env, user);
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
}

async function getUsers(env: Env, currentUser: any): Promise<Response> {
  if (currentUser.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const users = await env.DB.prepare(
    'SELECT id, email, full_name, role, created_at FROM users'
  ).all();
  
  return new Response(JSON.stringify(users.results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function getUserById(id: string, env: Env, currentUser: any): Promise<Response> {
  if (currentUser.role !== 'admin' && currentUser.id !== id) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const user = await env.DB.prepare(
    'SELECT id, email, full_name, role, created_at, metadata FROM users WHERE id = ?'
  ).bind(id).first();
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  return new Response(JSON.stringify(user), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function updateUser(request: Request, id: string, env: Env, currentUser: any): Promise<Response> {
  if (currentUser.role !== 'admin' && currentUser.id !== id) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const body = await request.json();
  const updates = [];
  const values = [];
  
  if (body.fullName) {
    updates.push('full_name = ?');
    values.push(body.fullName);
  }
  
  if (body.metadata) {
    updates.push('metadata = ?');
    values.push(JSON.stringify(body.metadata));
  }
  
  updates.push('updated_at = datetime("now")');
  values.push(id);
  
  await env.DB.prepare(
    `UPDATE users SET ${updates.join(', ')} WHERE id = ?`
  ).bind(...values).run();
  
  return new Response(JSON.stringify({ message: 'User updated successfully' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function deleteUser(id: string, env: Env, currentUser: any): Promise<Response> {
  if (currentUser.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  await env.DB.prepare('DELETE FROM users WHERE id = ?').bind(id).run();
  
  return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}