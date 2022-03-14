if (process.env.NODE_ENV === "development") {
  import("jsonwebtoken")
    .then(({ default: jwt }) => {
      const sample_jwt = jwt.sign({ user_id: 123 }, process.env.JWT_SECRET!, {
        expiresIn: "365d",
      });
      const api_keys = process.env.API_KEYS?.split(",");
      console.log({
        sample_jwt,
        api_keys,
        isServer: JSON.parse(process.env.IS_ON_SERVER || "false"),
      });
    })
    .catch((err) => console.log(`boot information error: ${err.message}`));
}
