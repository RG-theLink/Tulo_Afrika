#!/usr/bin/env node

/**
 * Test script for AI features
 * Run this after deployment to verify AI functionality
 */

const API_BASE_URL = process.argv[2] || 'https://tulo-afrika.pages.dev';

async function testDiagnostics() {
  console.log('\n=== Testing Diagnostic Endpoints ===\n');
  
  try {
    // Test system status
    console.log('1. Testing system status...');
    const statusResponse = await fetch(`${API_BASE_URL}/api/diagnostic/status`);
    const statusData = await statusResponse.json();
    console.log('System Status:', JSON.stringify(statusData, null, 2));
    
    // Test AI providers
    console.log('\n2. Testing AI providers...');
    const testResponse = await fetch(`${API_BASE_URL}/api/diagnostic/test-ai`);
    const testData = await testResponse.json();
    console.log('AI Test Results:', JSON.stringify(testData, null, 2));
    
    return { statusData, testData };
  } catch (error) {
    console.error('Diagnostic test failed:', error.message);
    return null;
  }
}

async function testWithAuth() {
  console.log('\n=== Testing Authenticated AI Endpoints ===\n');
  
  // First, we need to login
  console.log('Logging in as demo user...');
  
  try {
    const loginResponse = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'student@demo.com',
        password: 'password123'
      })
    });
    
    if (!loginResponse.ok) {
      console.error('Login failed:', loginResponse.status);
      const error = await loginResponse.text();
      console.error('Error:', error);
      return;
    }
    
    const loginData = await loginResponse.json();
    console.log('Login successful! Token received.');
    
    const token = loginData.token;
    
    // Test AI Chat
    console.log('\n3. Testing AI Chat...');
    const chatResponse = await fetch(`${API_BASE_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: 'Hello, can you help me with math?',
        sessionId: 'test-session'
      })
    });
    
    if (chatResponse.ok) {
      const chatData = await chatResponse.json();
      console.log('Chat Response:', chatData.response?.substring(0, 100) + '...');
      console.log('Provider:', chatData.provider);
    } else {
      console.error('Chat failed:', chatResponse.status, await chatResponse.text());
    }
    
    // Test AI Search
    console.log('\n4. Testing AI Search...');
    const searchResponse = await fetch(`${API_BASE_URL}/api/ai/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query: 'What is photosynthesis?'
      })
    });
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log('Search Results:', searchData.results?.substring(0, 100) + '...');
      console.log('Provider:', searchData.provider);
    } else {
      console.error('Search failed:', searchResponse.status, await searchResponse.text());
    }
    
    // Test AI Copilot
    console.log('\n5. Testing AI Copilot...');
    const copilotResponse = await fetch(`${API_BASE_URL}/api/ai/copilot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        question: 'Explain the water cycle',
        type: 'explanation'
      })
    });
    
    if (copilotResponse.ok) {
      const copilotData = await copilotResponse.json();
      console.log('Copilot Response:', copilotData.response?.substring(0, 100) + '...');
      console.log('Provider:', copilotData.provider);
    } else {
      console.error('Copilot failed:', copilotResponse.status, await copilotResponse.text());
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

async function main() {
  console.log(`\nTesting AI features at: ${API_BASE_URL}`);
  console.log('=' .repeat(50));
  
  // Run diagnostic tests (no auth required)
  const diagnostics = await testDiagnostics();
  
  if (diagnostics) {
    // Run authenticated tests
    await testWithAuth();
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Testing complete!');
  console.log('\nNext steps:');
  console.log('1. Check the Cloudflare dashboard for real-time logs');
  console.log('2. Visit the debug panel at: ' + API_BASE_URL + '/debug/ai');
  console.log('3. Monitor the Functions logs for any errors');
}

// Run the tests
main().catch(console.error);