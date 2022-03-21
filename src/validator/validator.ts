import Ajv from "ajv";
import addFormats from "ajv-formats";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validator = (schema: Record<string, any>, data: any) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  return { valid, errors: validate.errors };
};

export default validator;
