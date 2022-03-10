const map = new Map([
  [3001, "Not Found"],
  [3002, "Validation error"],
  [3003, "This email is already registered"],
  [3004, "Unauthenticated"],
]);

export const getError = (code: number) => {
  return map.has(code)
    ? { code, message: map.get(code) }
    : { code, message: "Error code not found" };
};
