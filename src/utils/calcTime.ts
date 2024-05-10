import ms from "ms";

export const getExpirationTime = (): Date => {
  const expiresIn = ms(process.env.REFRESH_TOKEN_EXPIRES_IN as string);
  const expirationDate = new Date(Date.now() + expiresIn);
  const phExpirationDate = expirationDate.toLocaleString("ja-JP", {
    timeZone: "Asia/Manila",
  });
  const expirationTime = new Date(phExpirationDate);
  return expirationTime;
};