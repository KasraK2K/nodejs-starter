//================================================================================================================
//
//  #####   ###    ###   ####         #####   ####   #####    ####  ##    ##   ####  ######  #####  ###    ###
//  ##  ##  ## #  # ##  #    #        ##     ##     ##   ##  ##      ##  ##   ##       ##    ##     ## #  # ##
//  #####   ##  ##  ##     ##         #####  ##     ##   ##   ###     ####     ###     ##    #####  ##  ##  ##
//  ##      ##      ##   ##           ##     ##     ##   ##     ##     ##        ##    ##    ##     ##      ##
//  ##      ##      ##  ######        #####   ####   #####   ####      ##     ####     ##    #####  ##      ##
//
//================================================================================================================

// NOTE: To run typescript file install this `pm2 install typescript`
module.exports = {
  apps: [
    {
      name: "mng-api",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      script: process.env.NODE_ENV === "production" ? "build/index.js" : "src/index.ts",
      autorestart: process.env.NODE_ENV === "development",
      watch: process.env.NODE_ENV === "development",
      time: true,
      instances: "max",
      exec_mode: "cluster",
      error_file: "/var/pm2-logs/dev/err.log",
      out_file: "/var/pm2-logs/dev/out.log",
      log_file: "/var/pm2-logs/dev/combined.log",

      // default variables
      env: {
        IS_ON_SERVER: true,
      },

      // production environment
      env_production: {
        NODE_ENV: "production",
        JWT_SECRET: "secret",
        PORT: "6000",
      },

      // development environment
      env_development: {
        NODE_ENV: "development",
        JWT_SECRET: "secret",
        PORT: "6000",
      },
    },
  ],
};
