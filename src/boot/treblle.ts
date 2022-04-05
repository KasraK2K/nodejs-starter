import boot from "./index";
import { useTreblle } from "treblle";
import config from "config";
import { ITreblleConfig } from "../../config/config.interface";

const treblleConfig: ITreblleConfig = config.get("application.monitoring.treblle");

useTreblle(boot.app, {
  apiKey: treblleConfig.apiKey,
  projectId: treblleConfig.projectId,
});
