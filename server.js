import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import crypto from 'crypto';

const app = express();
const PORT = 3001;

// OpenRouter Configuration
const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';

// In-memory storage for development
const users = new Map();
const sessions = new Map();
const chatHistory = [];
const searchHistory = [];

// Initialize with demo users
users.set('demo.student@tutokitulo.africa', {
  id: '1',
  email: 'demo.student@tutokitulo.africa',
  password: hashPassword('student123'),
  fullName: 'Alex Johnson',
  role: 'student'
});

users.set('demo.educator@tutokitulo.africa', {
  id: '2',
  email: 'demo.educator@tutokitulo.africa',
  password: hashPassword('educator123'),
  fullName: 'Dr. Sarah Wilson',
  role: 'educator'
});

users.set('admin@tutokitulo.africa', {
  id: '3',
  email: 'admin@tutokitulo.africa',
  password: hashPassword('admin123'),
  fullName: 'Michael Chen',
  role: 'admin'
});

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function verifyToken(token) {
  const session = sessions.get(token);
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) {
    sessions.delete(token);
    return null;
  }
  return users.get(session.userEmail);
}

// Auth middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  req.user = user;
  next();
}

// Authentication routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, fullName, role } = req.body;
  
  if (users.has(email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const user = {
    id: crypto.randomBytes(16).toString('hex'),
    email,
    password: hashPassword(password),
    fullName,
    role
  };
  
  users.set(email, user);
  
  const token = generateToken();
  sessions.set(token, {
    userEmail: email,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword, token });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.get(email);
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken();
  sessions.set(token, {
    userEmail: email,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });
  
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword, token });
});

app.post('/api/auth/logout', requireAuth, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  sessions.delete(token);
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/verify', requireAuth, (req, res) => {
  const { password: _, ...userWithoutPassword } = req.user;
  res.json({ user: userWithoutPassword });
});

// AI routes
app.post('/api/ai/chat', requireAuth, async (req, res) => {
  const { message, sessionId } = req.body;
  
  try {
    // Save user message to history
    chatHistory.push({
      userId: req.user.id,
      sessionId: sessionId || 'default',
      role: 'user',
      content: message,
      timestamp: new Date()
    });
    
    // Call OpenRouter API
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Tulo Afrika Educational Platform'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful educational AI assistant for Tulo Afrika. 
              You help ${req.user.role === 'student' ? 'students learn' : req.user.role === 'educator' ? 'educators teach' : 'users'} effectively.
              Provide clear, concise, and educational responses.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Save AI response to history
    chatHistory.push({
      userId: req.user.id,
      sessionId: sessionId || 'default',
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    });
    
    res.json({ 
      response: aiResponse,
      sessionId: sessionId || 'default'
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to process chat request. Please try again.' });
  }
});

app.post('/api/ai/search', requireAuth, async (req, res) => {
  const { query } = req.body;
  
  try {
    // Save search query to history
    searchHistory.push({
      userId: req.user.id,
      query,
      timestamp: new Date()
    });
    
    // Call OpenRouter API for educational search
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Tulo Afrika Educational Platform'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are an educational search assistant. Provide comprehensive, accurate information about the topic.
              Format your response with clear sections, examples, and explanations suitable for learning.
              Include relevant facts, concepts, and practical applications.`
          },
          {
            role: 'user',
            content: `Search and explain: ${query}`
          }
        ],
        temperature: 0.5,
        max_tokens: 1500
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }
    
    const data = await response.json();
    const searchResults = data.choices[0].message.content;
    
    res.json({ 
      results: searchResults,
      query
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to process search request. Please try again.' });
  }
});

app.post('/api/ai/copilot', requireAuth, async (req, res) => {
  const { question, context, type } = req.body;
  
  try {
    let systemPrompt = `You are an AI learning co-pilot for ${req.user.fullName}.`;
    
    // Customize prompt based on user role and request type
    if (req.user.role === 'student') {
      systemPrompt += ` Help the student understand concepts, solve problems, and learn effectively.`;
      if (type === 'homework') {
        systemPrompt += ` Guide them through homework problems step by step without giving direct answers.`;
      } else if (type === 'explanation') {
        systemPrompt += ` Explain concepts clearly with examples and analogies.`;
      }
    } else if (req.user.role === 'educator') {
      systemPrompt += ` Assist the educator with lesson planning, student assessment, and teaching strategies.`;
    }
    
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ];
    
    if (context) {
      messages.splice(1, 0, { role: 'system', content: `Context: ${context}` });
    }
    
    // Call OpenRouter API
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Tulo Afrika Educational Platform'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 1200
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }
    
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    res.json({ 
      response: aiResponse,
      type: type || 'general'
    });
  } catch (error) {
    console.error('Copilot error:', error);
    res.status(500).json({ error: 'Failed to process copilot request. Please try again.' });
  }
});

// Placeholder routes for other endpoints
app.get('/api/users', requireAuth, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  const allUsers = Array.from(users.values()).map(u => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });
  
  res.json(allUsers);
});

app.get('/api/resources', (req, res) => {
  // Placeholder resources
  res.json([
    {
      id: '1',
      title: 'Introduction to Mathematics',
      description: 'Basic math concepts for beginners',
      type: 'video',
      subject: 'Mathematics',
      gradeLevel: 'Grade 6'
    },
    {
      id: '2',
      title: 'Science Experiments',
      description: 'Fun science experiments you can do at home',
      type: 'article',
      subject: 'Science',
      gradeLevel: 'Grade 7'
    }
  ]);
});

app.get('/api/messages', requireAuth, (req, res) => {
  res.json([]);
});

app.post('/api/waitlist', (req, res) => {
  const { name, email, type } = req.body;
  res.json({ 
    message: 'Successfully added to waitlist',
    entry: { name, email, type }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- POST /api/auth/login');
  console.log('- POST /api/auth/register');
  console.log('- POST /api/ai/chat');
  console.log('- POST /api/ai/search');
  console.log('- POST /api/ai/copilot');
});