export interface Env {
  DB: D1Database;
  SESSIONS: KVNamespace;
  AI: any;
  OPENROUTER_API_KEY: string;
  OPENROUTER_API_URL: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_AI_TOKEN: string;
  GOOGLE_AI_API_KEY: string;
  GOOGLE_AI_MODEL?: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  role: 'student' | 'educator' | 'admin' | 'school';
  created_at: string;
  updated_at: string;
  metadata: any;
}

export interface Session {
  id: string;
  user_id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIRequest {
  messages: AIMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}