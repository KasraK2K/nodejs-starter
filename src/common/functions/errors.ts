const map = new Map([
  [3001, "Not Found"],
  [3002, "This is first error"],
  [3003, "This is second error"],
]);

export const getError = (code: number) => {
  return map.has(code)
    ? { code, message: map.get(code) }
    : { code, message: "Error code not found" };
};
