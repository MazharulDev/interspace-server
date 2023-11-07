import config from "../config";

export const generateTransactionId = (length: number) => {
  const characters = config.ssl.transCharacters as string;
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};
