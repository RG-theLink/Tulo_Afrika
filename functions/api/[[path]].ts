import { Env } from '../types';
import { authRouter } from '../routes/auth';
import { aiRouter } from '../routes/ai';
import { usersRouter } from '../routes/users';
import { resourcesRouter } from '../routes/resources';
import { messagesRouter } from '../routes/messages';
import { waitlistRouter } from '../routes/waitlist';
import { diagnosticRouter } from '../routes/diagnostic';
import { corsHeaders } from '../utils/cors';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const path = params.path as string[] || [];
  
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Route to appropriate handler based on path
    const pathString = path.join('/');
    
    // Authentication routes
    if (pathString.startsWith('auth')) {
      return await authRouter(request, env, path.slice(1));
    }
    
    // AI routes
    if (pathString.startsWith('ai')) {
      return await aiRouter(request, env, path.slice(1));
    }
    
    // User management routes
    if (pathString.startsWith('users')) {
      return await usersRouter(request, env, path.slice(1));
    }
    
    // Resources routes
    if (pathString.startsWith('resources')) {
      return await resourcesRouter(request, env, path.slice(1));
    }
    
    // Messages routes
    if (pathString.startsWith('messages')) {
      return await messagesRouter(request, env, path.slice(1));
    }
    
    // Waitlist routes
    if (pathString.startsWith('waitlist')) {
      return await waitlistRouter(request, env, path.slice(1));
    }
    
    // Diagnostic routes (for debugging)
    if (pathString.startsWith('diagnostic')) {
      return await diagnosticRouter(request, env, path.slice(1));
    }
    
    // Default 404 response
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  }
};