import fetch from 'node-fetch';

const API_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('🧪 Testing Tulo Afrika API...\n');
  
  try {
    // Test 1: Login with demo account
    console.log('1️⃣ Testing Login...');
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'demo.student@tutokitulo.africa',
        password: 'student123'
      })
    });
    
    const loginData = await loginResponse.json();
    if (loginData.token) {
      console.log('✅ Login successful!');
      console.log(`   User: ${loginData.user.fullName} (${loginData.user.role})`);
    } else {
      throw new Error('Login failed');
    }
    
    const token = loginData.token;
    
    // Test 2: AI Search
    console.log('\n2️⃣ Testing AI Search...');
    const searchResponse = await fetch(`${API_URL}/ai/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        query: 'What is photosynthesis?'
      })
    });
    
    const searchData = await searchResponse.json();
    if (searchData.results) {
      console.log('✅ AI Search working!');
      console.log(`   Response preview: ${searchData.results.substring(0, 100)}...`);
    } else {
      throw new Error('Search failed');
    }
    
    // Test 3: AI Chat
    console.log('\n3️⃣ Testing AI Chat...');
    const chatResponse = await fetch(`${API_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        message: 'Hello, can you help me learn?',
        sessionId: 'test-session'
      })
    });
    
    const chatData = await chatResponse.json();
    if (chatData.response) {
      console.log('✅ AI Chat working!');
      console.log(`   Response preview: ${chatData.response.substring(0, 100)}...`);
    } else {
      throw new Error('Chat failed');
    }
    
    // Test 4: AI Co-Pilot
    console.log('\n4️⃣ Testing AI Co-Pilot...');
    const copilotResponse = await fetch(`${API_URL}/ai/copilot`, {
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
    
    const copilotData = await copilotResponse.json();
    if (copilotData.response) {
      console.log('✅ AI Co-Pilot working!');
      console.log(`   Response preview: ${copilotData.response.substring(0, 100)}...`);
    } else {
      throw new Error('Co-Pilot failed');
    }
    
    console.log('\n🎉 All API tests passed successfully!');
    console.log('\n📱 You can now access the application at:');
    console.log('   https://3000-iu5ynodllr156f3qzibsj-6532622b.e2b.dev');
    console.log('\n🔑 Login with:');
    console.log('   Email: demo.student@tutokitulo.africa');
    console.log('   Password: student123');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Wait a moment for servers to be ready
setTimeout(testAPI, 2000);