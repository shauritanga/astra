module.exports = {
  apps: [
    {
      name: 'astra',
      cwd: '/var/www/astra',
      script: './node_modules/.bin/serve',
      args: '-s dist -l 3000',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
