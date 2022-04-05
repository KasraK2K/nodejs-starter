import { LoggerEnum } from "./../../common/enums/logger.enum";
import { IFirebaseSendMessage } from "./common/interface";
import BaseLogic from "../../base/logic/BaseLogic";
import mongoDbRepository from "../mongodb/repository";
import boot from "../../boot";
import {
  DataMessagePayload,
  MessagingPayload,
  NotificationMessagePayload,
} from "firebase-admin/lib/messaging/messaging-api";
import _ from "lodash";

class FirebaseLogic extends BaseLogic {
  public async selectAll(args: IFirebaseSendMessage): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.mongo.firebase.sendMessage, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else {
        let registrationTokenOrTokens = "";
        await mongoDbRepository
          .selectOne({ id: args.id })
          .then((response) => {
            if (!response.fcm_token) return reject({ result: false, error_code: 3013 });
            else registrationTokenOrTokens = response.fcm_token;
          })
          .catch((err) => reject({ result: false, ...err }));

        // ─── FILL NEEDED CONSTANTS ───────────────────────────────────────
        const data: DataMessagePayload = {};
        const notification: NotificationMessagePayload = {};

        if (args.notification) _.assign(notification, args.notification);
        if (args.data) _.assign(data, args.data);

        const options = { priority: "high", timeToLive: 60 * 60 * 24 };
        const payload: MessagingPayload = { data, notification };

        // ─── SEND MESSAGE ────────────────────────────────────────────────
        if (registrationTokenOrTokens)
          boot.firebase
            .messaging()
            .sendToDevice(registrationTokenOrTokens, payload, options)
            .then((response) => resolve({ result: true, data: response }))
            .catch((err) => {
              logger(`{red}Error on sending firebase push message{reset}`, LoggerEnum.ERROR);
              logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
              reject({ result: false, error_code: 3012 });
            });
      }
    });
  }
}

export default new FirebaseLogic();
