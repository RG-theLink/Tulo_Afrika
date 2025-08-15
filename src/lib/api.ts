// API configuration
// Use Cloudflare Pages API in production (when deployed on Netlify)
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://tulo-afrika.pages.dev/api' : '/api');

// Helper function to get auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');

// Helper function to make authenticated requests
async function authenticatedFetch(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Authentication API
export const auth = {
  async register(data: {
    email: string;
    password: string;
    fullName: string;
    role: 'student' | 'educator' | 'admin' | 'school';
    metadata?: any;
  }) {
    const response = await authenticatedFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },
  
  async login(email: string, password: string) {
    const response = await authenticatedFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },
  
  async logout() {
    await authenticatedFetch('/auth/logout', { method: 'POST' });
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  
  async verify() {
    return authenticatedFetch('/auth/verify');
  },
};

// AI API
export const ai = {
  async chat(message: string, sessionId?: string) {
    return authenticatedFetch('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, sessionId }),
    });
  },
  
  async search(query: string) {
    return authenticatedFetch('/ai/search', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },
  
  async copilot(question: string, context?: string, type?: 'homework' | 'explanation' | 'practice' | 'general') {
    return authenticatedFetch('/ai/copilot', {
      method: 'POST',
      body: JSON.stringify({ question, context, type }),
    });
  },
};

// Users API
export const users = {
  async getAll() {
    return authenticatedFetch('/users');
  },
  
  async getById(id: string) {
    return authenticatedFetch(`/users/${id}`);
  },
  
  async update(id: string, data: any) {
    return authenticatedFetch(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  async delete(id: string) {
    return authenticatedFetch(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Resources API
export const resources = {
  async getAll(filters?: { subject?: string; gradeLevel?: string; type?: string }) {
    const params = new URLSearchParams(filters as any).toString();
    return authenticatedFetch(`/resources${params ? `?${params}` : ''}`);
  },
  
  async getById(id: string) {
    return authenticatedFetch(`/resources/${id}`);
  },
  
  async create(data: any) {
    return authenticatedFetch('/resources', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  async update(id: string, data: any) {
    return authenticatedFetch(`/resources/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  async delete(id: string) {
    return authenticatedFetch(`/resources/${id}`, {
      method: 'DELETE',
    });
  },
};

// Messages API
export const messages = {
  async getInbox() {
    return authenticatedFetch('/messages?type=inbox');
  },
  
  async getSent() {
    return authenticatedFetch('/messages?type=sent');
  },
  
  async send(recipientId: string, content: string) {
    return authenticatedFetch('/messages', {
      method: 'POST',
      body: JSON.stringify({ recipientId, content }),
    });
  },
  
  async markAsRead(messageIds: string[]) {
    return authenticatedFetch('/messages/read', {
      method: 'PUT',
      body: JSON.stringify({ messageIds }),
    });
  },
};

// Waitlist API
export const waitlist = {
  async add(data: {
    name: string;
    email: string;
    type: 'student' | 'school';
    country?: string;
    message?: string;
  }) {
    return authenticatedFetch('/waitlist', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export default {
  auth,
  ai,
  users,
  resources,
  messages,
  waitlist,
};