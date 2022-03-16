import config from "config";
import { IConfig } from "./config/config.interface";

const configs: IConfig = config.util.toObject();

export default {
  openapi: "3.0.n",
  info: {
    title: "Node Starter",
    description: "This is a node.js starter pack to create service easy and fast",
    version: configs.application.api_version,
  },
  servers: [
    {
      url: process.env.IS_ON_SERVER ? "https://api.mng.dev.embargoapp.com" : "http://localhost:3000",
      description: "Manager API",
    },
  ],

  // ────────────────────────────────────────────────────────────────────
  //   :::::: E N D P O I N T S : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  paths: {
    "/shake-hand": {
      post: {
        summary: "Returns information about the server",
        consumes: ["application/json"],
        produces: ["application/json"],
        description: "This api no need to validate with method and token but need api_key",
        parameters: [
          {
            in: "body",
            name: "api_key",
            description: "api key to authenticate request",
            required: true,
            schema: { type: "string", example: "api_key_1" },
          },
        ],
        schema: {
          type: "object",
          in: "body",
          required: ["api_key"],
          properties: {
            api_key: { type: "string", example: "api_key_1" },
          },
        },
        responses: {
          200: { description: "Success", schema: { type: "object" } },
          401: { description: "Unauthorized", schema: { type: "object" } },
        },
      },
    },
  },

  // ──────────────────────────────────────────────────
  //   :::::: : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────
  schemas: {
    "shake-hand": {
      schema: {
        type: "object",
        in: "body",
        required: ["api_key"],
        properties: {
          api_key: { type: "string", example: "api_key_1" },
        },
      },
    },
  },

  // ──────────────────────────────────────────────────────────────────────
  //   :::::: P A R A M E T E R S : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  parameters: {
    api_key: {
      name: "api_key",
      description: "api key to authenticate request",
      in: "body",
      required: true,
      schema: { type: "string", example: "api_key_1" },
    },
  },
};
