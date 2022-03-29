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
      name: "api.mng",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      script: "src/index.ts",
      autorestart: true,
      watch: true,
      time: true,
      instances: "max",
      exec_mode: "cluster",
      error_file: "/var/pm2-logs/dev/api/err.log",
      out_file: "/var/pm2-logs/dev/api/out.log",
      log_file: "/var/pm2-logs/dev/api/combined.log",

      // default variables
      env: {
        IS_ON_SERVER: true,
        NODE_ENV: "development",
      },

      // development environment
      env_development: {
        NODE_ENV: "development",
        JWT_SECRET: "Embargo_mnG_V2.1_Emb@rgoL!m!ted@!AllManagementSaltsDevel0pment",
        PORT: "6300",
      },
    },
  ],
};
