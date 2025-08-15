module.exports = {
  apps: [
    {
      name: 'tulo-afrika-dev',
      script: 'npx',
      args: 'vite --host 0.0.0.0 --port 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        VITE_API_URL: '/api'
      }
    }
  ]
};