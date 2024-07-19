export const generateAssets = (): string => {
    // Get the current date and format it as YYYYMMDD
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
  
    const dateString = `${year}${month}${day}`;
  
    const randomUniqueNumber = Math.floor(1000 + Math.random() * 9000);
  
    // Format the unique number to a fixed length, e.g., 4 digits
    const formattedNumber = randomUniqueNumber.toString().padStart(4, "0");
  
    // Combine to form the profile string
    return `ASSET-${dateString}-${formattedNumber}`;
  };
  