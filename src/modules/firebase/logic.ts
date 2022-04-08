import { LoggerEnum } from "./../../common/enums/logger.enum";
import { IFirebaseSendMessage } from "./utils/interface";
import BaseLogic from "../../base/logic/BaseLogic";
import firebaseRepository from "./repository";
import { firebase } from "../../boot";
import {
  DataMessagePayload,
  MessagingPayload,
  NotificationMessagePayload,
} from "firebase-admin/lib/messaging/messaging-api";
import { firebaseSchema } from "./utils/schema";
import _ from "lodash";

class FirebaseLogic extends BaseLogic {
  public async selectAll(args: IFirebaseSendMessage): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(firebaseSchema.sendMessage, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else {
        let registrationTokenOrTokens = "";
        await firebaseRepository
          .selectOne({ id: args.id })
          .then((response) => {
            if (!("fcm_token" in response)) return reject({ result: false, error_code: 3014 });
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
          firebase
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
