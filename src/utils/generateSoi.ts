export const generateSoiId = (sourcetype: string): string => {
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // Convert current date to a string
    return `${sourcetype}-${timestamp}`;
  };
  