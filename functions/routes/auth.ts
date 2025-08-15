import { Env } from '../types';
import { corsHeaders } from '../utils/cors';
import { hashPassword, verifyPassword, createSession, verifyToken, deleteSession } from '../utils/auth';

export async function authRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  const [action] = path;
  
  switch (action) {
    case 'register':
      return handleRegister(request, env);
    case 'login':
      return handleLogin(request, env);
    case 'logout':
      return handleLogout(request, env);
    case 'verify':
      return handleVerify(request, env);
    default:
      return new Response(JSON.stringify({ error: 'Invalid auth endpoint' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
}

async function handleRegister(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as {
      email: string;
      password: string;
      fullName: string;
      role: 'student' | 'educator' | 'admin' | 'school';
      metadata?: any;
    };
    
    // Check if user already exists
    const existingUser = await env.DB.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(body.email).first();
    
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Hash password and create user
    const passwordHash = await hashPassword(body.password);
    
    const user = await env.DB.prepare(
      'INSERT INTO users (email, password_hash, full_name, role, metadata) VALUES (?, ?, ?, ?, ?) RETURNING id, email, full_name, role'
    ).bind(
      body.email,
      passwordHash,
      body.fullName,
      body.role,
      JSON.stringify(body.metadata || {})
    ).first();
    
    // Create session
    const session = await createSession(user.id, env);
    
    return new Response(JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      },
      token: session.token
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Registration failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleLogin(request: Request, env: Env): Promise<Response> {
  try {
    const body = await request.json() as {
      email: string;
      password: string;
    };
    
    // Find user
    const user = await env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(body.email).first();
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Verify password
    const isValid = await verifyPassword(body.password, user.password_hash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Create session
    const session = await createSession(user.id, env);
    
    return new Response(JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      },
      token: session.token
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleLogout(request: Request, env: Env): Promise<Response> {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (token) {
      await deleteSession(token, env);
    }
    
    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Logout error:', error);
    return new Response(JSON.stringify({ error: 'Logout failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleVerify(request: Request, env: Env): Promise<Response> {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return new Response(JSON.stringify({ error: 'No token provided' }), {
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
    
    return new Response(JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Verify error:', error);
    return new Response(JSON.stringify({ error: 'Verification failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}