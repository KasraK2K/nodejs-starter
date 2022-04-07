import { GenderEnum } from "./../modules/postgres/common/enum";

export const schema = {
  // ──────────────────────────────────────────────────────────────────────
  //   :::::: P A G I N A T I O N : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  pagination: {
    type: "object",
    additionalProperties: false,
    required: ["limit", "page"],
    properties: {
      limit: { type: "integer", minimum: 1, maximum: 200 },
      page: { type: "integer" },
      filter: {
        type: "object",
        properties: {
          where: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: { type: "string" },
                operator: { type: "string", enum: ["=", "<", ">", "IS NOT"] },
                value: { type: "string" },
              },
              required: ["field", "operator", "value"],
              minProperties: 3,
            },
          },
          group: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
          },
          order: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
          },
          is_asc: { type: "boolean" },
        },
      },
    },
  },
  // ──────────────────────────────────────────────────────────
  //   :::::: F I N D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  find: {
    type: "object",
    additionalProperties: false,
    properties: {
      id: { type: "string", format: "id" },
      user_name: { type: "string" },
      email: { type: "string", format: "email" },
    },
    anyOf: [{ required: ["id"] }, { required: ["user_name"] }, { required: ["email"] }],
  },
  // ──────────────────────────────────────────────────────
  //   :::::: I D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────
  id: {
    type: "object",
    additionalProperties: false,
    properties: {
      id: { type: "string", format: "id" },
    },
    required: ["id"],
  },
  // ──────────────────────────────────────────────────────────
  //   :::::: U S E R : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  user: {
    create: {
      type: "object",
      additionalProperties: false,
      required: ["user_name", "password", "email"],
      properties: {
        user_name: { type: "string" },
        password: { type: "string", minLength: 6, maxLength: 20 },
        first_name: { type: "string", minLength: 2, maxLength: 20 },
        last_name: { type: "string", minLength: 2, maxLength: 20 },
        email: {
          type: "string",
          format: "email",
          minLength: 6,
          maxLength: 100,
        },
        phone: { type: "string", format: "phone" },
        gender: {
          type: "string",
          enum: [GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.TRANSSEXUAL, GenderEnum.OTHER],
        },
      },
    },
    edit: {
      type: "object",
      additionalProperties: false,
      required: ["id"],
      properties: {
        id: { type: "string", format: "id" },
        password: { type: "string", minLength: 6, maxLength: 20 },
        first_name: { type: "string", minLength: 2, maxLength: 20 },
        last_name: { type: "string", minLength: 2, maxLength: 20 },
        email: { type: "string", format: "email", minLength: 6, maxLength: 100 },
        phone: { type: "string", format: "phone" },
        gender: {
          type: "string",
          enum: [GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.TRANSSEXUAL, GenderEnum.OTHER],
        },
      },
    },
    upsert: {
      type: "object",
      additionalProperties: false,
      properties: {
        id: { type: "string", format: "id" },
        password: { type: "string", minLength: 6, maxLength: 20 },
        first_name: { type: "string", minLength: 2, maxLength: 20 },
        last_name: { type: "string", minLength: 2, maxLength: 20 },
        email: { type: "string", format: "email", minLength: 6, maxLength: 100 },
        phone: { type: "string", format: "phone" },
        gender: {
          type: "string",
          enum: [GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.TRANSSEXUAL, GenderEnum.OTHER],
        },
      },
    },
  },
  // ──────────────────────────────────────────────────────────────────
  //   :::::: F I R E B A S E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  firebase: {
    sendMessage: {
      type: "object",
      additionalProperties: false,
      required: ["id"],
      properties: {
        id: { type: "string", format: "id" },
        notification: {
          type: "object",
          additionalProperties: false,
          required: ["title", "body"],
          properties: {
            title: { type: "string", minLength: 6, maxLength: 100 },
            body: { type: "string", minLength: 10, maxLength: 255 },
            icon: { type: "string", minLength: 6, maxLength: 255 },
            image: { type: "string", minLength: 6, maxLength: 255 },
          },
        },
        data: { type: "object" },
      },
    },
  },
};

export default schema;
