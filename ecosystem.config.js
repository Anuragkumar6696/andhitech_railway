module.exports = {
  apps: [
    {
      name: "andhitech-next",
      cwd: "D:/andhitechnewweb/andhitech",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
