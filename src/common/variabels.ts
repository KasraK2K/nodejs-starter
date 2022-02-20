import validator from "../plugins/validator";
import schema from "../plugins/schema";

export const locals = {
  application: {
    name: "Hackaton Starter",
  },
};

export const globals = {
  service: {
    name: "Global Service Name",
    version: "0.0.1",
  },
  validator,
  schema,
};
