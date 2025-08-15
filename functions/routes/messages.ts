import { Env } from '../types';
import { corsHeaders } from '../utils/cors';
import { verifyToken } from '../utils/auth';

export async function messagesRouter(request: Request, env: Env, path: string[]): Promise<Response> {
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
  
  const [action] = path;
  
  switch (request.method) {
    case 'GET':
      return getMessages(request, env, user);
    case 'POST':
      return sendMessage(request, env, user);
    case 'PUT':
      if (action === 'read') {
        return markAsRead(request, env, user);
      }
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
}

async function getMessages(request: Request, env: Env, user: any): Promise<Response> {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'inbox';
  
  let query;
  if (type === 'sent') {
    query = env.DB.prepare(
      `SELECT m.*, u.full_name as recipient_name, u.email as recipient_email 
       FROM messages m 
       JOIN users u ON m.recipient_id = u.id 
       WHERE m.sender_id = ? 
       ORDER BY m.created_at DESC`
    ).bind(user.id);
  } else {
    query = env.DB.prepare(
      `SELECT m.*, u.full_name as sender_name, u.email as sender_email 
       FROM messages m 
       JOIN users u ON m.sender_id = u.id 
       WHERE m.recipient_id = ? 
       ORDER BY m.created_at DESC`
    ).bind(user.id);
  }
  
  const messages = await query.all();
  
  return new Response(JSON.stringify(messages.results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function sendMessage(request: Request, env: Env, user: any): Promise<Response> {
  const body = await request.json() as {
    recipientId: string;
    content: string;
  };
  
  // Verify recipient exists
  const recipient = await env.DB.prepare(
    'SELECT id FROM users WHERE id = ?'
  ).bind(body.recipientId).first();
  
  if (!recipient) {
    return new Response(JSON.stringify({ error: 'Recipient not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const message = await env.DB.prepare(
    'INSERT INTO messages (sender_id, recipient_id, content) VALUES (?, ?, ?) RETURNING *'
  ).bind(user.id, body.recipientId, body.content).first();
  
  return new Response(JSON.stringify(message), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function markAsRead(request: Request, env: Env, user: any): Promise<Response> {
  const body = await request.json() as { messageIds: string[] };
  
  if (!body.messageIds || body.messageIds.length === 0) {
    return new Response(JSON.stringify({ error: 'No message IDs provided' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const placeholders = body.messageIds.map(() => '?').join(',');
  await env.DB.prepare(
    `UPDATE messages SET is_read = TRUE 
     WHERE id IN (${placeholders}) AND recipient_id = ?`
  ).bind(...body.messageIds, user.id).run();
  
  return new Response(JSON.stringify({ message: 'Messages marked as read' }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}