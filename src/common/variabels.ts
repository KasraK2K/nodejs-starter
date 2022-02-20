import validator from "../gateway/validator/validator";
import schema from "../gateway/validator/schema";

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

declare global {
  const service: typeof globals.service;
  const validator: typeof globals.validator;
  const schema: typeof globals.schema;
}

export default {
  locals,
  globals,
};
