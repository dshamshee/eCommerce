const cloudinary = require('cloudinary').v2;
const fs = require('fs');
// const { fileURLToPath } = require('url');



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const uploadOnCloudinary = async (localFilePath) =>{

    try {
        if(!localFilePath) return null; // if no local file path is provided, return null / error message 

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // automatically detect the file type (image, video, etc.)
        })

        // file has been uploaded successfully
        // console.log("File uploaded successfully on cloudinary", response.url);
        return response.url;
    } catch (error) {
        fs.unlinkSync(localFilePath); // delete the file from the local file system 
        return null;
    }
}

module.exports = uploadOnCloudinary;

    