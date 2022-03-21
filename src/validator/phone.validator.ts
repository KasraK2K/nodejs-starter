import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const phoneValidator = (phone: string): boolean => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phone);
    return phoneUtil.isValidNumber(number);
  } catch {
    return false;
  }
};

export default {
  phoneUtil,
  phoneValidator,
};
