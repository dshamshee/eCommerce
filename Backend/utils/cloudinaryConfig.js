const cloudinary = require('cloudinary').v2;
const fs = require('fs');
// const { fileURLToPath } = require('url');



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (fileData) =>{

    try {
        if(!fileData) return null; // if no file data is provided, return null / error message 

        let uploadResponse;
        
        // Check if fileData is a string (file path) or an object with buffer (from memory storage)
        if (typeof fileData === 'string') {
            // It's a file path (from disk storage)
            uploadResponse = await cloudinary.uploader.upload(fileData, {
                resource_type: "auto", // automatically detect the file type (image, video, etc.)
            });
            
            // Delete the file from local filesystem after upload
            fs.unlinkSync(fileData);
        } else if (fileData.buffer) {
            // It's a file object from memory storage
            const b64 = Buffer.from(fileData.buffer).toString('base64');
            const dataURI = "data:" + fileData.mimetype + ";base64," + b64;
            
            uploadResponse = await cloudinary.uploader.upload(dataURI, {
                resource_type: "auto", // automatically detect the file type
            });
        } else {
            return null;
        }

        // file has been uploaded successfully
        // console.log("File uploaded successfully on cloudinary", uploadResponse.url);
        return uploadResponse.url;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        // Only try to delete the file if it's a path string
        if (typeof fileData === 'string') {
            try {
                fs.unlinkSync(fileData);
            } catch (err) {
                // Ignore errors if file doesn't exist
            }
        }
        return null;
    }
}

module.exports = uploadOnCloudinary;

    