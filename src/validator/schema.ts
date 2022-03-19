import { GenderEnum } from "./../modules/postgres/common/enum";
export const schema = {
  user: {
    create: {
      type: "object",
      properties: {
        user_name: { type: "string" },
        password: { type: "string", minLength: 6, maxLength: 20 },
        first_name: { type: "string", minLength: 2, maxLength: 20 },
        last_name: { type: "string", minLength: 2, maxLength: 20 },
        email: { type: "string", format: "email", minLength: 6, maxLength: 100 },
        phone: { type: "string", minLength: 13, maxLength: 13 },
        gender: {
          type: "string",
          enum: [GenderEnum.FEMALE, GenderEnum.MALE, GenderEnum.TRANSSEXUAL, GenderEnum.OTHER],
        },
      },
      required: ["user_name", "password", "email"],
    },
  },
};

export default schema;
