
module.exports = {
    apps: [
      {
        name: 'backendCRM',
        script: 'node_modules/ts-node/dist/bin.js',
        args: 'src/server.ts',
        interpreter: 'none',
        watch: true,
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  