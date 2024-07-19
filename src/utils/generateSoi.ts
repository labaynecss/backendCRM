export const generateSoiId = (sourcetype: string | undefined): string => {
  const validSourcetype = sourcetype ? sourcetype : "default";
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // Convert current date to a string
  return `${validSourcetype}-${timestamp}`;
};

