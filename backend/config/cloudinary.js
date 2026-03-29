const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Cloudinary Storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lost-and-found', // Optional: Folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Allowed formats
    // Remove formatting below if you want to keep original filenames (will generate unique IDs by default)
  },
});

module.exports = {
  cloudinary,
  storage
};
