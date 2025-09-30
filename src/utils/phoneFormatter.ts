export const removePhoneCharacters = (phone: string): string => {
  if (!phone) return "";
  return phone.replace(/[^0-9]/g, "");
};
