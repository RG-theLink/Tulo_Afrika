import { Env, AIRequest } from '../types';
import { corsHeaders } from '../utils/cors';
import { verifyToken } from '../utils/auth';

export async function aiRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  const [action] = path;
  
  // Verify authentication for all AI endpoints
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
  
  switch (action) {
    case 'chat':
      return handleChat(request, env, user);
    case 'search':
      return handleSearch(request, env, user);
    case 'copilot':
      return handleCopilot(request, env, user);
    default:
      return new Response(JSON.stringify({ error: 'Invalid AI endpoint' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
}

async function handleChat(request: Request, env: Env, user: any): Promise<Response> {
  try {
    const body = await request.json() as { message: string; sessionId?: string };
    
    // Save user message to history
    await env.DB.prepare(
      'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
    ).bind(user.id, body.sessionId || 'default', 'user', body.message).run();
    
    // Call OpenRouter API
    const response = await callOpenRouter({
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
      model: 'openai/gpt-oss-20b', // Free OpenAI model
      temperature: 0.7,
      max_tokens: 1000
    }, env);
    
    // Save AI response to history
    await env.DB.prepare(
      'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
    ).bind(user.id, body.sessionId || 'default', 'assistant', response.content).run();
    
    return new Response(JSON.stringify({ 
      response: response.content,
      sessionId: body.sessionId || 'default'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleSearch(request: Request, env: Env, user: any): Promise<Response> {
  try {
    const body = await request.json() as { query: string };
    
    // Save search query to history
    await env.DB.prepare(
      'INSERT INTO ai_search_history (user_id, query) VALUES (?, ?)'
    ).bind(user.id, body.query).run();
    
    // Call OpenRouter API for educational search
    const response = await callOpenRouter({
      messages: [
        {
          role: 'system',
          content: `You are an educational search assistant. Provide comprehensive, accurate information about the topic.
            Format your response with clear sections, examples, and explanations suitable for learning.
            Include relevant facts, concepts, and practical applications.`
        },
        {
          role: 'user',
          content: `Search and explain: ${body.query}`
        }
      ],
      model: 'openai/gpt-oss-20b', // Free OpenAI model
      temperature: 0.5,
      max_tokens: 1500
    }, env);
    
    // Update search history with results
    await env.DB.prepare(
      'UPDATE ai_search_history SET results = ? WHERE user_id = ? AND query = ? ORDER BY created_at DESC LIMIT 1'
    ).bind(response.content, user.id, body.query).run();
    
    return new Response(JSON.stringify({ 
      results: response.content,
      query: body.query
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process search request' }), {
      status: 500,
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
    
    let systemPrompt = `You are an AI learning co-pilot for ${user.full_name}.`;
    
    // Customize prompt based on user role and request type
    if (user.role === 'student') {
      systemPrompt += ` Help the student understand concepts, solve problems, and learn effectively.`;
      if (body.type === 'homework') {
        systemPrompt += ` Guide them through homework problems step by step without giving direct answers.`;
      } else if (body.type === 'explanation') {
        systemPrompt += ` Explain concepts clearly with examples and analogies.`;
      }
    } else if (user.role === 'educator') {
      systemPrompt += ` Assist the educator with lesson planning, student assessment, and teaching strategies.`;
    }
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: body.question }
    ];
    
    if (body.context) {
      messages.splice(1, 0, { role: 'system', content: `Context: ${body.context}` });
    }
    
    // Call OpenRouter API
    const response = await callOpenRouter({
      messages,
      model: 'openai/gpt-oss-20b', // Free OpenAI model
      temperature: 0.7,
      max_tokens: 1200
    }, env);
    
    return new Response(JSON.stringify({ 
      response: response.content,
      type: body.type || 'general'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Copilot error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process copilot request' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function callOpenRouter(request: AIRequest, env: Env): Promise<{ content: string }> {
  const response = await fetch(`${env.OPENROUTER_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://tulo-afrika.pages.dev',
      'X-Title': 'Tulo Afrika Educational Platform'
    },
    body: JSON.stringify({
      model: request.model || 'openai/gpt-oss-20b', // Free OpenAI model
      messages: request.messages,
      temperature: request.temperature || 0.7,
      max_tokens: request.max_tokens || 1000,
      stream: false
    })
  });
  
  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }
  
  const data = await response.json() as any;
  return {
    content: data.choices[0].message.content
  };
}