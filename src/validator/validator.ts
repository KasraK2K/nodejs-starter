import Ajv from "ajv";
import addFormats from "ajv-formats";
import { phoneValidator } from "./phone.validator";
import { isId, isMongoObjectId, isUUIDv4 } from "./id.validator";

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
});
addFormats(ajv);

// ajv.addKeyword({
//   keyword: "phone",
//   type: "string",
//   schemaType: "string",
//   validate: async (phone: string) => {
//     return await phoneValidator(phone);
//   },
// });

// ajv.addKeyword({
//   keyword: "idExists",
//   async: true,
//   type: "string",
//   async validate(schema: Record<string, any>, id: string) {
//     const query = `SELECT id FROM ${schema.table} WHERE id = '${id}' LIMIT 1`;
//     const result = await pg.pool.query(query);
//     return result.rowCount > 0;
//   },
// });

ajv.addFormat("phone", phoneValidator);
ajv.addFormat("objectId", isMongoObjectId);
ajv.addFormat("uuidv4", isUUIDv4);
ajv.addFormat("id", isId);

export const validator = (schema: Record<string, any>, data: any) => {
  const validate = ajv.compile(schema);
  const valid: boolean = validate(data);
  return { valid, errors: validate.errors };
};

export default validator;
