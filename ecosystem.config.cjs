module.exports = {
  apps: [
    {
      name: 'astra',
      cwd: '/var/www/astra',
      script: './node_modules/.bin/serve',
      args: '-s dist -l tcp://127.0.0.1:3300',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
