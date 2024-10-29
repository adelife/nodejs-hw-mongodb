import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
// import path from 'node:path';
// import { CLOUDINARY } from '../constants/index.js';
import { env } from '../utils/env.js';

cloudinary.config({
  cloud_name: env('CLOUDINARY_CLOUD_NAME'),
  api_key: env('CLOUDINARY_API_KEY'),
  api_secret: env('CLOUDINARY_API_SECRET'),
});

export const uploadToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
