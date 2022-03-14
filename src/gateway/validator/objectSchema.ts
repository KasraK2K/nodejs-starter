export const objectSchema = {
  login: {
    email: { type: "string", force_type: true },
    password: { type: "string", force_type: true },
  },
};

export default objectSchema;
