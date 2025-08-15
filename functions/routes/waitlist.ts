import { Env } from '../types';
import { corsHeaders } from '../utils/cors';

export async function waitlistRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  
  switch (request.method) {
    case 'POST':
      return addToWaitlist(request, env);
    case 'GET':
      return getWaitlist(request, env);
    default:
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
}

async function addToWaitlist(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as {
      name: string;
      email: string;
      type: 'student' | 'school';
      country?: string;
      message?: string;
    };
    
    // Check if email already exists
    const existing = await env.DB.prepare(
      'SELECT id FROM waitlist WHERE email = ?'
    ).bind(body.email).first();
    
    if (existing) {
      return new Response(JSON.stringify({ error: 'Email already on waitlist' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const entry = await env.DB.prepare(
      'INSERT INTO waitlist (name, email, type, country, message) VALUES (?, ?, ?, ?, ?) RETURNING *'
    ).bind(
      body.name,
      body.email,
      body.type,
      body.country || null,
      body.message || null
    ).first();
    
    return new Response(JSON.stringify({
      message: 'Successfully added to waitlist',
      entry
    }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Waitlist error:', error);
    return new Response(JSON.stringify({ error: 'Failed to add to waitlist' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function getWaitlist(request: Request, env: Env): Promise<Response> {
  // This should be protected and only accessible by admins
  // For now, we'll return a forbidden response
  return new Response(JSON.stringify({ error: 'Forbidden' }), {
    status: 403,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}