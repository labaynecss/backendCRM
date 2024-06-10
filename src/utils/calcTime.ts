import ms from "ms";

export const getExpirationTime = (): Date => {
  const expiresIn = ms(process.env.REFRESH_TOKEN_EXPIRES_IN as string);
  const expirationDate = new Date(Date.now() + expiresIn);
  const phExpirationDate = expirationDate.toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });
  const expirationTime = new Date(phExpirationDate);
  return expirationTime;
};

export const currentTimestamp = Math.floor(Date.now() / 1000);

const currentDate = new Date();

// Convert to ISO-8601 format
export const isoDate = currentDate.toISOString();
