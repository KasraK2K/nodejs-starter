export const schema = {
  user: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: { type: "string", format: "phone" },
      password: { type: "string", minLength: 6 },
    },
  },
  name: {
    type: "string",
  },
};

export default schema;
