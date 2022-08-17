//=======================================================================================================================================================
//
//   ####  #####  #####    ##   ##  #####  #####          ##  ##     ##  #####   #####   #####    ###    ###    ###    ######  ##   #####   ##     ##
//  ##     ##     ##  ##   ##   ##  ##     ##  ##         ##  ####   ##  ##     ##   ##  ##  ##   ## #  # ##   ## ##     ##    ##  ##   ##  ####   ##
//   ###   #####  #####    ##   ##  #####  #####          ##  ##  ## ##  #####  ##   ##  #####    ##  ##  ##  ##   ##    ##    ##  ##   ##  ##  ## ##
//     ##  ##     ##  ##    ## ##   ##     ##  ##         ##  ##    ###  ##     ##   ##  ##  ##   ##      ##  #######    ##    ##  ##   ##  ##    ###
//  ####   #####  ##   ##    ###    #####  ##   ##        ##  ##     ##  ##      #####   ##   ##  ##      ##  ##   ##    ##    ##   #####   ##     ##
//
//=======================================================================================================================================================

import os from "os";
import config from "config";
import { IApplicationConfig } from "../../../config/config.interface";
import { sign, IConfigs } from "k2token";

const applicationConfig: IApplicationConfig = config.get("application");

export const getUserInformation = (port: number) => {
  if (applicationConfig.print_info) {
    console.group("Server Information:");
    console.table([
      {
        Port: port,
        NODE_ENV: process.env.NODE_ENV,
        Platform: os.platform(),
        "CPU Model": os.cpus()[0].model,
        Arch: os.arch(),
      },
    ]);
    console.groupEnd();
    // CPU/Ram Information
    console.group("\nCPU/Ram Information:");
    console.table([
      {
        "CPU Count": os.cpus().length,
        "CPU Speed": os.cpus()[0].speed,
        "Total Memory": os.totalmem(),
        "Free Memory": os.freemem(),
        "Used Memory": os.totalmem() - os.freemem(),
      },
    ]);
    console.groupEnd();
    // Node Information
    console.group("\nNode Information:");
    console.table([
      {
        "Node PID": process.pid,
        "Node CPU Usage": process.cpuUsage(),
        "Node Version": process.version,
        "Node Exec Path": process.execPath,
      },
    ]);
    console.groupEnd();
    // Secrets Information
    console.group("\nExample Secrets Information:");
    const payload: Record<string, any> = { user_id: 123 };
    console.table([
      {
        payload: payload,
        is_on_server: JSON.parse(process.env.IS_ON_SERVER || "false"),
      },
    ]);
    console.groupEnd();

    const configs: IConfigs = {
      secret: process.env.K2Token_SECRET!,
      phrase_one: process.env.K2Token_PHRASE_ONE!,
      phrase_two: process.env.K2Token_PHRASE_TWO!,
    };
    const token = sign(payload, configs);
    console.log("\ntoken: %s", token.split(".").join(".\n\t"));
    console.log("\napi_keys: %s", process.env.API_KEYS?.split(",").join(".\n\t"));
  }
  console.info(`\nServer running on http://localhost:${port}`);
};
