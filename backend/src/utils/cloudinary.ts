import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMedia = async (file: Express.Multer.File): Promise<string> => {
  try {
    const result = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url || '');
        })
        .end(file.buffer);
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Media upload failed');
  }
};