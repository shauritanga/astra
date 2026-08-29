module.exports = {
  apps: [
    {
      name: 'astra-admin',
      cwd: '/var/www/astra/dashboard',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3400',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3400,
      },
    },
  ],
}
