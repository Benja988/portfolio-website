import cloudinary from 'cloudinary';
import { v2 as cloudinaryV2 } from 'cloudinary';

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMedia = async (file: Express.Multer.File): Promise<string> => {
  try {
    const result = await cloudinaryV2.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (error) throw error;
      return result?.secure_url;
    }).end(file.buffer);
    return result.secure_url;
  } catch (error) {
    throw new Error('Media upload failed');
  }
};