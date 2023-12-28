const fs = require("fs");

const createUploadsFolder = () => {
  const directory = "uploads";

  // Check if the directory already exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory); // Create the directory if it doesn't exist
    console.log("Uploads directory created successfully.");
  } else {
    console.log("Uploads directory already exists.");
  }
};

// Call the function to create the directory
createUploadsFolder();
