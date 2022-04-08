import { GenderEnum } from "../../../common/enums/general.enum";
export const mongodbSchema = {
  // ──────────────────────────────────────────────────────────
  //   :::::: F I N D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────
  find: {
    type: "object",
    additionalProperties: false,
    properties: {
      _id: { type: "string", format: "objectId" },
      user_name: { type: "string" },
      email: { type: "string", format: "email" },
    },
  },
  // ──────────────────────────────────────────────────────────────────
  //   :::::: F I N D   O N E : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  findOne: {
    type: "object",
    additionalProperties: false,
    properties: {
      _id: { type: "string", format: "objectId" },
      user_name: { type: "string" },
      email: { type: "string", format: "email" },
    },
    anyOf: [{ required: ["_id"] }, { required: ["user_name"] }, { required: ["email"] }],
  },
  // ──────────────────────────────────────────────────────
  //   :::::: I D : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────
  _id: {
    type: "object",
    additionalProperties: false,
    properties: {
      _id: { type: "string", format: "objectId" },
    },
    required: ["_id"],
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
      required: ["_id"],
      properties: {
        _id: { type: "string", format: "objectId" },
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
        _id: { type: "string", format: "objectId" },
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
};

export default mongodbSchema;
