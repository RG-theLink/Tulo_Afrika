import { Env, AIRequest } from '../types';
import { corsHeaders } from '../utils/cors';
import { verifyToken } from '../utils/auth';

// Enhanced AI router optimized for OpenRouter-only operation
export async function aiRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  const [action] = path;
  
  console.log('AI Router - Action:', action, 'Path:', path);
  
  // Verify authentication for all AI endpoints
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    console.error('AI Router - No token provided');
    return new Response(JSON.stringify({ error: 'Unauthorized - No token provided' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  const user = await verifyToken(token, env);
  if (!user) {
    console.error('AI Router - Invalid token');
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
  
  console.log('AI Router - User authenticated:', user.id, user.role);
  
  switch (action) {
    case 'chat':
      return handleChat(request, env, user);
    case 'search':
      return handleSearch(request, env, user);
    case 'copilot':
      return handleCopilot(request, env, user);
    default:
      return new Response(JSON.stringify({ error: `Invalid AI endpoint: ${action}` }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
}

async function handleChat(request: Request, env: Env, user: any): Promise<Response> {
  try {
    const body = await request.json() as { message: string; sessionId?: string };
    console.log('Chat - Request from user:', user.id);
    
    // Skip DB operations if they fail (non-critical)
    try {
      await env.DB.prepare(
        'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
      ).bind(user.id, body.sessionId || 'default', 'user', body.message).run();
    } catch (dbError) {
      console.warn('Chat - DB save skipped:', dbError);
    }
    
    // Direct OpenRouter call with better error handling
    const response = await callOpenRouterDirect({
      messages: [
        {
          role: 'system',
          content: `You are a helpful educational AI assistant for Tulo Afrika. 
            You help ${user.role === 'student' ? 'students learn' : user.role === 'educator' ? 'educators teach' : 'users'} effectively.
            Provide clear, concise, and educational responses.`
        },
        {
          role: 'user',
          content: body.message
        }
      ],
      model: 'openai/gpt-3.5-turbo', // Using a more reliable model
      temperature: 0.7,
      max_tokens: 1000
    }, env);
    
    // Skip DB save on error
    try {
      await env.DB.prepare(
        'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
      ).bind(user.id, body.sessionId || 'default', 'assistant', response.content).run();
    } catch (dbError) {
      console.warn('Chat - DB save skipped:', dbError);
    }
    
    return new Response(JSON.stringify({ 
      response: response.content,
      sessionId: body.sessionId || 'default',
      provider: 'openrouter'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Chat - Error:', error);
    
    // Provide a fallback response
    const fallbackResponse = "I apologize, but I'm having trouble connecting to the AI service. Please ensure your API key is configured in the Cloudflare dashboard environment variables. You can also try refreshing the page.";
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      sessionId: body?.sessionId || 'default',
      provider: 'fallback',
      error: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleSearch(request: Request, env: Env, user: any): Promise<Response> {
  try {
    const body = await request.json() as { query: string };
    console.log('Search - Request from user:', user.id);
    
    // Skip DB operations if they fail
    try {
      await env.DB.prepare(
        'INSERT INTO ai_search_history (user_id, query) VALUES (?, ?)'
      ).bind(user.id, body.query).run();
    } catch (dbError) {
      console.warn('Search - DB save skipped:', dbError);
    }
    
    const response = await callOpenRouterDirect({
      messages: [
        {
          role: 'system',
          content: `You are an educational search assistant. Provide comprehensive, accurate information about the topic.
            Format your response with clear sections, examples, and explanations suitable for learning.`
        },
        {
          role: 'user',
          content: `Search and explain: ${body.query}`
        }
      ],
      model: 'openai/gpt-3.5-turbo',
      temperature: 0.5,
      max_tokens: 1500
    }, env);
    
    return new Response(JSON.stringify({ 
      results: response.content,
      query: body.query,
      provider: 'openrouter'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Search - Error:', error);
    
    const fallbackResponse = `I couldn't complete the search for "${body?.query || 'your query'}". Please check that your OpenRouter API key is properly configured in the Cloudflare environment variables.`;
    
    return new Response(JSON.stringify({ 
      results: fallbackResponse,
      query: body?.query || '',
      provider: 'fallback',
      error: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleCopilot(request: Request, env: Env, user: any): Promise<Response> {
  try {
    const body = await request.json() as { 
      question: string; 
      context?: string;
      type?: 'homework' | 'explanation' | 'practice' | 'general';
    };
    console.log('Copilot - Request from user:', user.id);
    
    let systemPrompt = `You are an AI learning co-pilot. `;
    
    if (user.role === 'student') {
      systemPrompt += `Help the student understand concepts and learn effectively. `;
      if (body.type === 'homework') {
        systemPrompt += `Guide them step by step without giving direct answers.`;
      } else if (body.type === 'explanation') {
        systemPrompt += `Explain concepts clearly with examples.`;
      }
    } else if (user.role === 'educator') {
      systemPrompt += `Assist with lesson planning and teaching strategies.`;
    }
    
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: body.question }
    ];
    
    if (body.context) {
      messages.splice(1, 0, { role: 'system' as const, content: `Context: ${body.context}` });
    }
    
    const response = await callOpenRouterDirect({
      messages,
      model: 'openai/gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 1200
    }, env);
    
    return new Response(JSON.stringify({ 
      response: response.content,
      type: body.type || 'general',
      provider: 'openrouter'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Copilot - Error:', error);
    
    const fallbackResponse = "I'm unable to process your request right now. Please ensure your OpenRouter API key is configured correctly in the Cloudflare environment variables.";
    
    return new Response(JSON.stringify({ 
      response: fallbackResponse,
      type: body?.type || 'general',
      provider: 'fallback',
      error: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Simplified OpenRouter call with better error messages
async function callOpenRouterDirect(request: AIRequest, env: Env): Promise<{ content: string }> {
  // Check for API key
  if (!env.OPENROUTER_API_KEY || env.OPENROUTER_API_KEY === 'YOUR_API_KEY_HERE' || env.OPENROUTER_API_KEY === '') {
    console.error('OpenRouter - No valid API key configured');
    throw new Error('OpenRouter API key not configured. Please add your API key in Cloudflare Dashboard → Pages → Settings → Environment Variables → OPENROUTER_API_KEY');
  }
  
  const apiUrl = env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1';
  console.log('OpenRouter - Calling with model:', request.model);
  
  try {
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://tulo-afrika.pages.dev',
        'X-Title': 'Tulo Afrika Educational Platform'
      },
      body: JSON.stringify({
        model: request.model || 'openai/gpt-3.5-turbo',
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.max_tokens || 1000,
        stream: false
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter - API error:', response.status, errorText);
      
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenRouter API key in Cloudflare environment variables.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      } else {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }
    }
    
    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenRouter');
    }
    
    return {
      content: data.choices[0].message.content
    };
  } catch (error: any) {
    console.error('OpenRouter - Error:', error);
    throw error;
  }
}