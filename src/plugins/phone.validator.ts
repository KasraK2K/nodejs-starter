import {
  PhoneNumberFormat,
  PhoneNumberType,
  PhoneNumberUtil,
} from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

export const phoneValidator = (phone: string) => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(phone);
    return phoneUtil.isValidNumber(number);
  } catch {
    return false;
  }
};
