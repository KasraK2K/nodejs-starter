import Ajv from "ajv";
import addFormats from "ajv-formats";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export const validator = (schema: Record<string, any>, data: any) => {
  const errors: string[] = [];
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    validate &&
      validate.errors &&
      validate.errors.length &&
      validate.errors.forEach((error) => {
        const parameter =
          error.instancePath && error.instancePath.length
            ? error.instancePath.replace("/", "")
            : error.params.missingProperty;

        errors.push(`[${parameter}]: ${error.message}`);
      });
  }
  return { valid, errors };
};

export default validator;
