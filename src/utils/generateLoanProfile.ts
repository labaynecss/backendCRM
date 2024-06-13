export const generateloanProfileId = (): string => {
  const hexPart = Math.random().toString(16).substring(2, 10); // Generates a random hex string of length 8
  const datePart = new Date().toISOString().slice(0, 7).replace("-", ""); // Generates 'YYYYMM' from current date
  return `${hexPart}-${datePart}`;
};
