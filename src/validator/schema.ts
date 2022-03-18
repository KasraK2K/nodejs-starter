export const schema = {
  user: {
    create: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        password: { type: "string", minLength: 6 },
      },
      required: ["name", "email", "password"],
    },
  },
};

export default schema;
