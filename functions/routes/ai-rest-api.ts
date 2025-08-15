import { Env, AIRequest } from '../types';
import { corsHeaders } from '../utils/cors';
import { verifyToken } from '../utils/auth';

// AI router using Cloudflare Workers AI REST API
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
    
    // Try to save user message to history (non-blocking)
    try {
      await env.DB.prepare(
        'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
      ).bind(user.id, body.sessionId || 'default', 'user', body.message).run();
    } catch (dbError) {
      console.warn('Chat - DB save skipped:', dbError);
    }
    
    // Try Cloudflare Workers AI REST API first
    let response: { content: string };
    let aiProvider = 'cloudflare';
    
    try {
      console.log('Chat - Attempting Cloudflare Workers AI REST API');
      response = await callCloudflareAIRest({
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
      console.log('Chat - Cloudflare AI successful');
    } catch (cfError: any) {
      console.error('Chat - Cloudflare AI failed, trying OpenRouter:', cfError.message);
      aiProvider = 'openrouter';
      
      // Fallback to OpenRouter
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
        model: 'openai/gpt-3.5-turbo',
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
      console.warn('Chat - DB save skipped:', dbError);
    }
    
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
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleSearch(request: Request, env: Env, user: any): Promise<Response> {
  try {
    const body = await request.json() as { query: string };
    console.log('Search - Request from user:', user.id);
    
    // Try to save search query to history (non-blocking)
    try {
      await env.DB.prepare(
        'INSERT INTO ai_search_history (user_id, query) VALUES (?, ?)'
      ).bind(user.id, body.query).run();
    } catch (dbError) {
      console.warn('Search - DB save skipped:', dbError);
    }
    
    // Try Cloudflare Workers AI REST API first
    let response: { content: string };
    let aiProvider = 'cloudflare';
    
    try {
      console.log('Search - Attempting Cloudflare Workers AI REST API');
      response = await callCloudflareAIRest({
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
        ]
      }, env);
      console.log('Search - Cloudflare AI successful');
    } catch (cfError: any) {
      console.error('Search - Cloudflare AI failed, trying OpenRouter:', cfError.message);
      aiProvider = 'openrouter';
      
      // Fallback to OpenRouter
      response = await callOpenRouter({
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
    }
    
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
      details: error?.message || 'Unknown error'
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
    console.log('Copilot - Request from user:', user.id);
    
    let systemPrompt = `You are an AI learning co-pilot for ${user.full_name || 'a student'}.`;
    
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
    
    // Try Cloudflare Workers AI REST API first
    let response: { content: string };
    let aiProvider = 'cloudflare';
    
    try {
      console.log('Copilot - Attempting Cloudflare Workers AI REST API');
      response = await callCloudflareAIRest({ messages }, env);
      console.log('Copilot - Cloudflare AI successful');
    } catch (cfError: any) {
      console.error('Copilot - Cloudflare AI failed, trying OpenRouter:', cfError.message);
      aiProvider = 'openrouter';
      
      // Fallback to OpenRouter
      response = await callOpenRouter({
        messages,
        model: 'openai/gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 1200
      }, env);
    }
    
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
      details: error?.message || 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Call Cloudflare Workers AI using REST API
async function callCloudflareAIRest(request: { messages: Array<{ role: string; content: string }> }, env: Env): Promise<{ content: string }> {
  // Check if we have the necessary credentials
  if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_AI_TOKEN) {
    throw new Error('Cloudflare AI credentials not configured');
  }
  
  console.log('Cloudflare AI REST - Calling API');
  
  try {
    // Convert messages to prompt format for Llama model
    const prompt = request.messages
      .map(msg => `${msg.role === 'system' ? 'System' : msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n') + '\nAssistant:';
    
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CLOUDFLARE_AI_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          prompt: prompt,
          max_tokens: 1000
        })
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudflare AI REST - API error:', response.status, errorText);
      throw new Error(`Cloudflare AI API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Cloudflare AI REST - Response received');
    
    if (!data.success || !data.result) {
      throw new Error('Invalid response from Cloudflare AI');
    }
    
    return {
      content: data.result.response || data.result.text || 'No response generated'
    };
  } catch (error: any) {
    console.error('Cloudflare AI REST - Error:', error);
    throw error;
  }
}

// Call OpenRouter API
async function callOpenRouter(request: AIRequest, env: Env): Promise<{ content: string }> {
  if (!env.OPENROUTER_API_KEY || env.OPENROUTER_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('OpenRouter API key not configured');
  }
  
  const apiUrl = env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1';
  console.log('OpenRouter - Calling API');
  
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
      throw new Error(`OpenRouter API error: ${response.status}`);
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