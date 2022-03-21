import Ajv from "ajv";
import addFormats from "ajv-formats";
import { phoneValidator } from "./phone.validator";
const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);

// ajv.addKeyword({
//   keyword: "phone",
//   type: "string",
//   schemaType: "string",
//   validate: async (phone: string) => {
//     return await phoneValidator(phone);
//   },
// });

ajv.addFormat("phone", phoneValidator);

export const validator = (schema: Record<string, any>, data: any) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  return { valid, errors: validate.errors };
};

export default validator;
