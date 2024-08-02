import bcrypt from "bcrypt";

export const hashPassword = async (plainTextPassword) => {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
  return hashedPassword;
};

export const verifyPassword = async ({ plainText, hashedValue }) => {
  return await bcrypt.compare(plainText, hashedValue);
};
