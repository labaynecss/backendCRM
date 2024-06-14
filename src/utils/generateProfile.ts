export const generateProfile = (): string => {
    // Generate a random string of 10 characters
    const randomString = Math.random().toString(36).substring(2, 12);
  
    // Get the current date and format it as YYYYMMDD
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateString = `${year}${month}${day}`;
  
    // Combine to form the profile string
    return `CRM-${randomString}-${dateString}`;
  };
  
  // // Example usage
  // const profile = generateProfile();
  // console.log(profile);



  export const  generateAssetId =() =>  {
    // Define the characters allowed in the barcode
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = 12; // Length of the barcode

    let assetId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        assetId += characters[randomIndex];
    }

    return assetId;
}

// // Example usage:
// const newAssetId = generateAssetId();
// console.log("Generated Asset ID:", newAssetId);
