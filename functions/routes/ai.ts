import { Env, AIRequest } from '../types';
import { corsHeaders } from '../utils/cors';
import { verifyToken } from '../utils/auth-fixed';

// AI router with optional auth bypass for testing
export async function aiRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  const [action] = path;
  
  console.log('AI Router - Action:', action, 'Path:', path);
  
  // Check for auth token
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  // Try to verify token, but don't fail if it doesn't work
  let user = null;
  if (token) {
    user = await verifyToken(token, env);
    if (user) {
      console.log('AI Router - User authenticated:', user.id, user.role);
    } else {
      console.log('AI Router - Token invalid, using demo mode');
    }
  } else {
    console.log('AI Router - No token, using demo mode');
  }
  
  // Use demo user if authentication fails
  if (!user) {
    user = {
      id: 'demo-user',
      email: 'demo@tulo-afrika.com',
      password_hash: 'demo',
      full_name: 'Demo User',
      role: 'student' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      metadata: {}
    };
    console.log('AI Router - Using demo user for unauthenticated request');
  }
  
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
    
    // Skip DB operations if they fail
    if (user.id !== 'demo-user') {
      try {
        await env.DB.prepare(
          'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
        ).bind(user.id, body.sessionId || 'default', 'user', body.message).run();
      } catch (dbError) {
        console.warn('Chat - DB save skipped:', dbError);
      }
    }
    
    // Try Google Gemma first, then fall back
    let response: { content: string };
    let aiProvider = 'google-gemma';
    
    try {
      console.log('Chat - Attempting Google Gemma via AI Studio');
      response = await callGoogleGemma({
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
      console.log('Chat - Google Gemma successful');
    } catch (gemmaError: any) {
      console.error('Chat - Google Gemma failed, trying Cloudflare Workers AI:', gemmaError.message);
      aiProvider = 'cloudflare';
      
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
        try {
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
        } catch (orError: any) {
          console.error('Chat - OpenRouter also failed:', orError.message);
          // Provide a helpful error response
          response = {
            content: "I apologize, but I'm having trouble connecting to the AI service. This could be due to: \n\n1. API keys not being properly configured\n2. Rate limits being exceeded\n3. Network connectivity issues\n\nPlease try again in a moment or contact support if the issue persists."
          };
          aiProvider = 'fallback';
        }
      }
    }
    
    // Skip DB save for demo user
    if (user.id !== 'demo-user') {
      try {
        await env.DB.prepare(
          'INSERT INTO ai_chat_history (user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
        ).bind(user.id, body.sessionId || 'default', 'assistant', response.content).run();
      } catch (dbError) {
        console.warn('Chat - DB save skipped:', dbError);
      }
    }
    
    return new Response(JSON.stringify({ 
      response: response.content,
      sessionId: body.sessionId || 'default',
      provider: aiProvider,
      demo: user.id === 'demo-user'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Chat - Fatal error:', error);
    return new Response(JSON.stringify({ 
      response: "I'm sorry, but I encountered an error processing your request. Please try again.",
      error: true,
      details: error?.message || 'Unknown error'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

async function handleSearch(request: Request, env: Env, user: any): Promise<Response> {
  try {
    const body = await request.json() as { query: string };
    console.log('Search - Request from user:', user.id);
    
    // Skip DB for demo user
    if (user.id !== 'demo-user') {
      try {
        await env.DB.prepare(
          'INSERT INTO ai_search_history (user_id, query) VALUES (?, ?)'
        ).bind(user.id, body.query).run();
      } catch (dbError) {
        console.warn('Search - DB save skipped:', dbError);
      }
    }
    
    // Try Google Gemma first, then fall back
    let response: { content: string };
    let aiProvider = 'google-gemma';
    
    try {
      console.log('Search - Attempting Google Gemma via AI Studio');
      response = await callGoogleGemma({
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
      console.log('Search - Google Gemma successful');
    } catch (gemmaError: any) {
      console.error('Search - Google Gemma failed, trying Cloudflare Workers AI:', gemmaError.message);
      aiProvider = 'cloudflare';
      
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
        try {
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
        } catch (orError: any) {
          console.error('Search - OpenRouter also failed:', orError.message);
          response = {
            content: `I couldn't complete the search for "${body.query}" due to a technical issue. Please ensure the AI services are properly configured and try again.`
          };
          aiProvider = 'fallback';
        }
      }
    }
    
    return new Response(JSON.stringify({ 
      results: response.content,
      query: body.query,
      provider: aiProvider,
      demo: user.id === 'demo-user'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Search - Fatal error:', error);
    return new Response(JSON.stringify({ 
      results: "Search service is temporarily unavailable. Please try again.",
      query: body?.query || '',
      error: true,
      details: error?.message || 'Unknown error'
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
    
    // Try Google Gemma first, then fall back
    let response: { content: string };
    let aiProvider = 'google-gemma';
    
    try {
      console.log('Copilot - Attempting Google Gemma via AI Studio');
      response = await callGoogleGemma({ messages }, env);
      console.log('Copilot - Google Gemma successful');
    } catch (gemmaError: any) {
      console.error('Copilot - Google Gemma failed, trying Cloudflare Workers AI:', gemmaError.message);
      aiProvider = 'cloudflare';
      
      try {
        console.log('Copilot - Attempting Cloudflare Workers AI REST API');
        response = await callCloudflareAIRest({ messages }, env);
        console.log('Copilot - Cloudflare AI successful');
      } catch (cfError: any) {
        console.error('Copilot - Cloudflare AI failed, trying OpenRouter:', cfError.message);
        aiProvider = 'openrouter';
        
        // Fallback to OpenRouter
        try {
          response = await callOpenRouter({
            messages,
            model: 'openai/gpt-3.5-turbo',
            temperature: 0.7,
            max_tokens: 1200
          }, env);
        } catch (orError: any) {
          console.error('Copilot - OpenRouter also failed:', orError.message);
          response = {
            content: "I'm currently unable to assist due to a technical issue. Please try again in a moment."
          };
          aiProvider = 'fallback';
        }
      }
    }
    
    return new Response(JSON.stringify({ 
      response: response.content,
      type: body.type || 'general',
      provider: aiProvider,
      demo: user.id === 'demo-user'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Copilot - Fatal error:', error);
    return new Response(JSON.stringify({ 
      response: "Co-pilot service is temporarily unavailable. Please try again.",
      type: 'general',
      error: true,
      details: error?.message || 'Unknown error'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

// Call Google Gemma via Google AI Studio
async function callGoogleGemma(request: { messages: Array<{ role: string; content: string }> }, env: Env): Promise<{ content: string }> {
  if (!env.GOOGLE_AI_API_KEY) {
    throw new Error('Google AI API key not configured');
  }

  const modelId = env.GOOGLE_AI_MODEL || 'gemma-3n-e2b-it';

  const systemInstructions = request.messages
    .filter((msg) => msg.role === 'system')
    .map((msg) => msg.content);

  const conversationMessages = request.messages
    .filter((msg) => msg.role !== 'system')
    .map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

  const payload: Record<string, unknown> = {
    contents: conversationMessages
  };

  if (systemInstructions.length > 0) {
    payload.systemInstruction = {
      parts: [{ text: systemInstructions.join('\n') }]
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${env.GOOGLE_AI_API_KEY}`;

  console.log('Google Gemma - Calling API with model:', modelId);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Google Gemma - API error:', response.status, errorText);
    throw new Error(`Google Gemma API error: ${response.status}`);
  }

  const data = await response.json();
  console.log('Google Gemma - Response received');

  const text = data?.candidates?.[0]?.content?.parts
    ?.map((part: any) => part.text)
    ?.join('')
    ?.trim();

  if (!text) {
    throw new Error('No response generated by Google Gemma');
  }

  return { content: text };
}

// Call Cloudflare Workers AI using REST API
async function callCloudflareAIRest(request: { messages: Array<{ role: string; content: string }> }, env: Env): Promise<{ content: string }> {
  if (!env.CLOUDFLARE_ACCOUNT_ID || !env.CLOUDFLARE_AI_TOKEN) {
    throw new Error('Cloudflare AI credentials not configured');
  }
  
  console.log('Cloudflare AI REST - Calling API');
  
  try {
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