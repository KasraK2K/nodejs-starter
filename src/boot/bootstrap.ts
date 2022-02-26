// ──────────────────────────────────────────────────────────────────────
//   :::::: E N V I R E M E N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const env = dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});
dotenvExpand.expand(env);

// ──────────────────────────────────────────────────────────────────
//   :::::: D A T A B A S E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
import "./database";
