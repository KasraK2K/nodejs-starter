//================================================================================================================
//
//  #####   ###    ###   ####         #####   ####   #####    ####  ##    ##   ####  ######  #####  ###    ###
//  ##  ##  ## #  # ##  #    #        ##     ##     ##   ##  ##      ##  ##   ##       ##    ##     ## #  # ##
//  #####   ##  ##  ##     ##         #####  ##     ##   ##   ###     ####     ###     ##    #####  ##  ##  ##
//  ##      ##      ##   ##           ##     ##     ##   ##     ##     ##        ##    ##    ##     ##      ##
//  ##      ##      ##  ######        #####   ####   #####   ####      ##     ####     ##    #####  ##      ##
//
//================================================================================================================

module.exports = {
  apps: [
    {
      name: "api.mng",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      script: "build/index.js",
      autorestart: false,
      watch: false,
      time: true,
      instances: "max",
      exec_mode: "cluster",
      error_file: "/var/pm2-logs/prod/api/err.log",
      out_file: "/var/pm2-logs/prod/api/out.log",
      log_file: "/var/pm2-logs/prod/api/combined.log",

      // default variables
      env: {
        IS_ON_SERVER: true,
        NODE_ENV: "production",
      },

      // production environment
      env_production: {
        NODE_ENV: "production",
        JWT_SECRET: "Embargo_mnG_V2.1_Emb@rgoL!m!ted@!AllManagementSaltsPr0d0cti0n",
        PORT: "6300",
      },
    },
  ],
};
