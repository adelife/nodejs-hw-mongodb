import path from 'node:path';

const contactType = ['work', 'home', 'personal'];

const sortOrderList = ['asc', 'desc'];

const contactFieldList = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000; // 15 min

export const REFRESH_TOKEN_TTL = 30 * 24 * 3600 * 1000; //30 days

export const SMTP = {
  HOST: process.env.SMTP_HOST,
  PORT: process.env.SMTP_PORT,
  USER: process.env.SMTP_USER,
  PASSWORD: process.env.SMTP_PASSWORD,
  FROM: process.env.SMTP_FROM,
};

export const CLOUDINARY = {
  // CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  // API_KEY: process.env.CLOUDINARY_API_KEY,
  // API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
  // CLOUDINARY_CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  // CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
  // CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
};

export const TEMPLATE_DIR = path.resolve('src', 'templates');
export const TEMP_UPLOAD_DIR = path.resolve('temp');
export const UPLOAD_DIR = path.resolve('uploads');

export { contactType, sortOrderList, contactFieldList };
