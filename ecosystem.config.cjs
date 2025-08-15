module.exports = {
  apps: [
    {
      name: 'tulo-frontend',
      script: 'npx',
      args: 'vite --host 0.0.0.0 --port 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'tulo-api',
      script: 'server.js',
      cwd: '/home/user/webapp',
      interpreter: 'node',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      }
    }
  ]
};