import { Env } from '../types';
import { corsHeaders } from '../utils/cors';

export async function diagnosticRouter(request: Request, env: Env, path: string[]): Promise<Response> {
  const [action] = path;
  
  switch (action) {
    case 'status':
      return handleStatus(env);
    case 'test-ai':
      return handleTestAI(env);
    default:
      return new Response(JSON.stringify({ error: 'Invalid diagnostic endpoint' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  }
}

async function handleStatus(env: Env): Promise<Response> {
  const status = {
    timestamp: new Date().toISOString(),
    environment: {
      has_db: !!env.DB,
      has_kv: !!env.SESSIONS,
      has_ai: !!env.AI,
      has_cloudflare_ai_token: !!(env.CLOUDFLARE_AI_TOKEN && env.CLOUDFLARE_ACCOUNT_ID),
      has_openrouter_key: !!(env.OPENROUTER_API_KEY && env.OPENROUTER_API_KEY !== 'YOUR_API_KEY_HERE'),
      openrouter_url: env.OPENROUTER_API_URL || 'not set (will use default)',
    },
    database: {
      status: 'unknown',
      tables: []
    },
    ai_providers: {
      cloudflare_rest: !!(env.CLOUDFLARE_AI_TOKEN && env.CLOUDFLARE_ACCOUNT_ID) ? 'configured' : 'not configured',
      cloudflare_binding: !!env.AI ? 'available' : 'not available',
      openrouter: !!(env.OPENROUTER_API_KEY && env.OPENROUTER_API_KEY !== 'YOUR_API_KEY_HERE') ? 'configured' : 'not configured'
    }
  };
  
  // Test database connection
  try {
    const result = await env.DB.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    status.database.status = 'connected';
    status.database.tables = result.results.map((r: any) => r.name);
  } catch (error: any) {
    status.database.status = 'error';
    status.database.error = error.message;
  }
  
  return new Response(JSON.stringify(status, null, 2), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function handleTestAI(env: Env): Promise<Response> {
  const results = {
    timestamp: new Date().toISOString(),
    tests: {
      cloudflare_ai: { status: 'not_tested', response: null, error: null },
      openrouter: { status: 'not_tested', response: null, error: null }
    }
  };
  
  // Test Cloudflare AI REST API
  if (env.CLOUDFLARE_AI_TOKEN && env.CLOUDFLARE_ACCOUNT_ID) {
    try {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-3.1-8b-instruct`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.CLOUDFLARE_AI_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            prompt: 'What is 2+2? Answer in one sentence.',
            max_tokens: 50
          })
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        results.tests.cloudflare_ai.status = 'success';
        results.tests.cloudflare_ai.response = data.result?.response || data.result?.text || 'Response received';
      } else {
        const errorText = await response.text();
        results.tests.cloudflare_ai.status = 'error';
        results.tests.cloudflare_ai.error = `HTTP ${response.status}: ${errorText}`;
      }
    } catch (error: any) {
      results.tests.cloudflare_ai.status = 'error';
      results.tests.cloudflare_ai.error = error.message;
    }
  } else {
    results.tests.cloudflare_ai.status = 'not_configured';
  }
  
  // Test OpenRouter
  if (env.OPENROUTER_API_KEY && env.OPENROUTER_API_KEY !== 'YOUR_API_KEY_HERE') {
    try {
      const apiUrl = env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1';
      const response = await fetch(`${apiUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://tulo-afrika.pages.dev',
          'X-Title': 'Tulo Afrika Educational Platform'
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            { role: 'system', content: 'You are a helpful assistant. Answer in one sentence.' },
            { role: 'user', content: 'What is 2+2?' }
          ],
          temperature: 0.1,
          max_tokens: 50,
          stream: false
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        results.tests.openrouter.status = 'success';
        results.tests.openrouter.response = data.choices[0].message.content;
      } else {
        const errorText = await response.text();
        results.tests.openrouter.status = 'error';
        results.tests.openrouter.error = `HTTP ${response.status}: ${errorText}`;
      }
    } catch (error: any) {
      results.tests.openrouter.status = 'error';
      results.tests.openrouter.error = error.message;
    }
  } else {
    results.tests.openrouter.status = 'not_configured';
  }
  
  return new Response(JSON.stringify(results, null, 2), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}