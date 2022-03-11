//==============================================================================
//
//  #####   ####   #####    ####  ##    ##   ####  ######  #####  ###    ###
//  ##     ##     ##   ##  ##      ##  ##   ##       ##    ##     ## #  # ##
//  #####  ##     ##   ##   ###     ####     ###     ##    #####  ##  ##  ##
//  ##     ##     ##   ##     ##     ##        ##    ##    ##     ##      ##
//  #####   ####   #####   ####      ##     ####     ##    #####  ##      ##
//
//==============================================================================

// NOTE: To run typescript file install this `pm2 install typescript`
module.exports = {
  apps: [
    {
      name: "www-api",
      log_date_format: "YYYY-MM-DD HH:mm Z",
      script: "src/index.ts",
      watch: true,
      env_production: {
        NODE_ENV: "production",
        JWT_SECRET: "secret",
        PORT: "6000",
      },
      env_development: {
        NODE_ENV: "development",
        JWT_SECRET: "secret",
        PORT: "6000",
      },
    },
  ],
};
