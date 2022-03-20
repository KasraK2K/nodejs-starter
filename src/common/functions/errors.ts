const map = new Map([
  [3000, "Something went wrong"],
  [3001, "Not Found"],
  [3002, "Validation error"],
  [3003, "This email is already registered"],
  [3004, "Unauthenticated"],
  [3005, "Method not allowed"],
  [3006, "Too Many Requests"],
  [3007, "Table not found"],
  [3008, "Some uniques are not unique"],
  [3009, "Database Connection Refused"],
  [3010, "Column not found"],
]);

export const getError = (code: number) => {
  return map.has(code) ? { code, message: map.get(code) } : { code, message: "Error code not found" };
};
