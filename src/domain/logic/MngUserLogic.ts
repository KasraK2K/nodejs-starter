import Logic from "./Logic";
import mngUserRepository from "../repository/MngUserRepository";
import { hashGen } from "./../../common/functions/bcrypt";

class MngUserLogic extends Logic {
  public async list(args: Record<string, any> = {}): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const value = objectValidator(args ?? {}, objectSchema.manager.list);

      if ("errors" in value) return reject({ result: false, error_code: 3002, errors: value.errors });
      else
        await mngUserRepository
          .list(value)
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, err }));
    });
  }

  public async upsert(args: Record<string, any> = {}): Promise<any> {
    return new Promise(async (resolve, reject) => {
      /* REVIEW Use to log with mongodb */
      // const portal_user_id: number = args.portal_user_id || -2;
      // const portal_user_name: string = args.portal_user_name || "-";

      const value = objectValidator(args.data ?? {}, objectSchema.manager.upsert);

      if ("errors" in value) return reject({ result: false, error_code: 3002, errors: value.errors });
      else {
        /* REVIEW I hold this for venue and we see that another time */
        // const sql_schema = {
        //   table_name: `"mng_users"`,
        //   checking_data_field: "table_id",
        //   table_id: "table_id",
        //   returning: "table_id",
        //   fields: {
        //     name: { field: "name" },
        //     email: { field: "email" },
        //     access: { field: "access" },
        //     password: { field: "password" },
        //   },
        // };

        value.password && (value.hashPassword = hashGen(value.password));

        await mngUserRepository
          .upsert(value)
          .then((response) => {
            resolve({ result: true, data: [response] });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}

export default new MngUserLogic();
