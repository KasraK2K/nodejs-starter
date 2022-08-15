import "reflect-metadata"
import firebase, {
  DataMessagePayload,
  MessagingOptions,
  MessagingPayload,
  NotificationMessagePayload,
} from "./firebase"
import stuart, { IStuartDropoffs, IStuartJob, IStuartPickups } from "./stuart"
import mailGunJS from "./mailgun.js"
import twilio from "./twilio"

import dotenv from "dotenv"
import dotenvExpand from "dotenv-expand"
const env = dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
dotenvExpand.expand(env)

// ───────────────────────────────────────────────────────────
//   :::::: Firebase : :  :   :    :     :        :          :
// ───────────────────────────────────────────────────────────
async function sendToDevice() {
  new Promise(async (resolve, reject) => {
    const registrationTokenOrTokens: string | string[] = ""
    const data: DataMessagePayload = {}
    const notification: NotificationMessagePayload = {}
    const payload: MessagingPayload = { data, notification }
    const options: MessagingOptions = {
      priority: "high",
      timeToLive: 60 * 60 * 24,
    }

    await firebase.messaging
      .sendToDevice(registrationTokenOrTokens, payload, options)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
// ───────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────
//   :::::: Mailgun : :  :   :    :     :        :           :
// ───────────────────────────────────────────────────────────
async function createMessage() {
  new Promise(async (resolve, reject) => {
    const data = {
      to: ["kasra_k2k@yahoo.com"],
      subject: "html",
      text: "html Testing some Mailgun awesomness!",
      html: "<h1>HTML Content</h1>",
    }

    mailGunJS.message
      .createMessage(data)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
// ───────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────
//   :::::: Stuart : :  :   :    :     :         :           :
// ───────────────────────────────────────────────────────────
async function jobCreation() {
  new Promise(async (resolve, reject) => {
    const pickup_at = ""
    const pickups: IStuartPickups = { address: "" }
    const dropoffs: IStuartDropoffs = {
      package_type: "",
      address: "",
    }
    const job: IStuartJob = { pickup_at, pickups: [pickups], dropoffs: [dropoffs] }

    await stuart.job
      .jobCreation(job)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
// ───────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────
//   :::::: Twilio : :  :   :    :     :         :           :
// ───────────────────────────────────────────────────────────
async function sendSms() {
  new Promise(async (resolve, reject) => {
    const data = {
      body: "Hi reza. i am kasra",
      to: ["+447702219932"],
    }

    await twilio.sms
      .message(data)
      .then((response) => resolve(response))
      .catch((err) => reject(err))
  })
}
// ───────────────────────────────────────────────────────────

