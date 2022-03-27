export const objectSchema = {
  login: {
    email: { type: "string", force_type: true },
    password: { type: "string", force_type: true },
  },
  manager: {
    list: {
      id: { type: "int" },
      email: { type: "string" },
    },
    upsert: {
      id: { type: "int", default: 0 },
      name: {
        type: "string",
        force_type: true,
        min_length: 5,
        cut_at_max: 100,
      },
      email: {
        type: "string",
        force_type: true,
        min_length: 5,
        cut_at_max: 100,
      },
      access: {
        type: "string",
        force_type: true,
        min_length: 5,
        cut_at_max: 50,
      },
      password: { type: "string", min_length: 5, cut_at_max: 50 },
    },
  },
};

export default objectSchema;
