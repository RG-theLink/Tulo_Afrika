import { Env, AIRequest } from '../types';
import { corsHeaders } from '../utils/cors';
import { verifyToken } from '../utils/auth';

// Enhanced AI router with better error handling and Cloudflare AI support
export async function aiRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  const [action] = path;
  
  // Log the request for debugging
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
    console.log('Chat - Request:', { message: body.message.substring(0, 50), sessionId: body.sessionId });
    
    // Try to save user message to history (non-blocking)
    try {
      await env.DB.prepare(
        'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
      ).bind(user.id, body.sessionId || 'default', 'user', body.message).run();
    } catch (dbError) {
      console.error('Chat - DB save error (continuing):', dbError);
    }
    
    // Try Cloudflare Workers AI first if available
    let response: { content: string };
    let aiProvider = 'openrouter';
    
    if (env.AI) {
      console.log('Chat - Attempting Cloudflare Workers AI');
      try {
        response = await callCloudflareAI({
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
          ]
        }, env);
        aiProvider = 'cloudflare';
        console.log('Chat - Cloudflare AI successful');
      } catch (cfError) {
        console.error('Chat - Cloudflare AI failed, falling back to OpenRouter:', cfError);
      }
    }
    
    // Fallback to OpenRouter
    if (!response) {
      console.log('Chat - Using OpenRouter');
      response = await callOpenRouter({
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
        model: 'openai/gpt-oss-20b',
        temperature: 0.7,
        max_tokens: 1000
      }, env);
    }
    
    // Try to save AI response to history (non-blocking)
    try {
      await env.DB.prepare(
        'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
      ).bind(user.id, body.sessionId || 'default', 'assistant', response.content).run();
    } catch (dbError) {
      console.error('Chat - DB save error (continuing):', dbError);
    }
    
    console.log('Chat - Success, provider:', aiProvider);
    return new Response(JSON.stringify({ 
      response: response.content,
      sessionId: body.sessionId || 'default',
      provider: aiProvider
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Chat - Fatal error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process chat request',
      details: error?.message || 'Unknown error',
      debug: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleSearch(request: Request, env: Env, user: any): Promise<Response> {
  try {
    const body = await request.json() as { query: string };
    console.log('Search - Request:', { query: body.query });
    
    // Try to save search query to history (non-blocking)
    try {
      await env.DB.prepare(
        'INSERT INTO ai_search_history (user_id, query) VALUES (?, ?)'
      ).bind(user.id, body.query).run();
    } catch (dbError) {
      console.error('Search - DB save error (continuing):', dbError);
    }
    
    // Try Cloudflare Workers AI first if available
    let response: { content: string };
    let aiProvider = 'openrouter';
    
    if (env.AI) {
      console.log('Search - Attempting Cloudflare Workers AI');
      try {
        response = await callCloudflareAI({
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
          ]
        }, env);
        aiProvider = 'cloudflare';
        console.log('Search - Cloudflare AI successful');
      } catch (cfError) {
        console.error('Search - Cloudflare AI failed, falling back to OpenRouter:', cfError);
      }
    }
    
    // Fallback to OpenRouter
    if (!response) {
      console.log('Search - Using OpenRouter');
      response = await callOpenRouter({
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
        model: 'openai/gpt-oss-20b',
        temperature: 0.5,
        max_tokens: 1500
      }, env);
    }
    
    // Try to update search history with results (non-blocking)
    try {
      await env.DB.prepare(
        'UPDATE ai_search_history SET results = ? WHERE user_id = ? AND query = ? ORDER BY created_at DESC LIMIT 1'
      ).bind(response.content, user.id, body.query).run();
    } catch (dbError) {
      console.error('Search - DB update error (continuing):', dbError);
    }
    
    console.log('Search - Success, provider:', aiProvider);
    return new Response(JSON.stringify({ 
      results: response.content,
      query: body.query,
      provider: aiProvider
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Search - Fatal error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process search request',
      details: error?.message || 'Unknown error',
      debug: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    }), {
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
    console.log('Copilot - Request:', { question: body.question.substring(0, 50), type: body.type });
    
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
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: body.question }
    ];
    
    if (body.context) {
      messages.splice(1, 0, { role: 'system' as const, content: `Context: ${body.context}` });
    }
    
    // Try Cloudflare Workers AI first if available
    let response: { content: string };
    let aiProvider = 'openrouter';
    
    if (env.AI) {
      console.log('Copilot - Attempting Cloudflare Workers AI');
      try {
        response = await callCloudflareAI({ messages }, env);
        aiProvider = 'cloudflare';
        console.log('Copilot - Cloudflare AI successful');
      } catch (cfError) {
        console.error('Copilot - Cloudflare AI failed, falling back to OpenRouter:', cfError);
      }
    }
    
    // Fallback to OpenRouter
    if (!response) {
      console.log('Copilot - Using OpenRouter');
      response = await callOpenRouter({
        messages,
        model: 'openai/gpt-oss-20b',
        temperature: 0.7,
        max_tokens: 1200
      }, env);
    }
    
    console.log('Copilot - Success, provider:', aiProvider);
    return new Response(JSON.stringify({ 
      response: response.content,
      type: body.type || 'general',
      provider: aiProvider
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Copilot - Fatal error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process copilot request',
      details: error?.message || 'Unknown error',
      debug: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Call OpenRouter API with enhanced error handling
async function callOpenRouter(request: AIRequest, env: Env): Promise<{ content: string }> {
  // Check if API key is configured
  if (!env.OPENROUTER_API_KEY || env.OPENROUTER_API_KEY === 'YOUR_API_KEY_HERE') {
    console.error('OpenRouter - API key not configured');
    throw new Error('OpenRouter API key not configured. Please set OPENROUTER_API_KEY in environment variables.');
  }
  
  const apiUrl = env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1';
  console.log('OpenRouter - Calling API:', apiUrl, 'Model:', request.model);
  
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
        model: request.model || 'openai/gpt-oss-20b',
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.max_tokens || 1000,
        stream: false
      })
    });
    
    const responseText = await response.text();
    console.log('OpenRouter - Response status:', response.status);
    
    if (!response.ok) {
      console.error('OpenRouter - API error:', response.status, responseText);
      throw new Error(`OpenRouter API error: ${response.status} - ${responseText}`);
    }
    
    const data = JSON.parse(responseText);
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('OpenRouter - Invalid response structure:', data);
      throw new Error('Invalid response from OpenRouter API');
    }
    
    return {
      content: data.choices[0].message.content
    };
  } catch (error: any) {
    console.error('OpenRouter - Fatal error:', error);
    throw new Error(`OpenRouter API call failed: ${error.message}`);
  }
}

// Call Cloudflare Workers AI (new function)
async function callCloudflareAI(request: { messages: Array<{ role: string; content: string }> }, env: Env): Promise<{ content: string }> {
  if (!env.AI) {
    throw new Error('Cloudflare AI not available');
  }
  
  console.log('Cloudflare AI - Calling with messages:', request.messages.length);
  
  try {
    // Use Cloudflare's Llama 2 model (free and available)
    const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: request.messages
    });
    
    console.log('Cloudflare AI - Response received');
    
    if (!response || !response.response) {
      throw new Error('Invalid response from Cloudflare AI');
    }
    
    return {
      content: response.response
    };
  } catch (error: any) {
    console.error('Cloudflare AI - Error:', error);
    throw new Error(`Cloudflare AI call failed: ${error.message}`);
  }
}