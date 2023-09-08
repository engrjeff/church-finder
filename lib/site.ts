import { Inter } from "next/font/google";

const sans = Inter({ subsets: ["latin"] });

export const siteConfig = {
  font: { sans },
};

export const envVars = {
  cloudinaryCloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  cloudinaryApiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  cloudinaryApiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
  cloudinaryUploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
  cloudinaryUploadFolder: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER!,
};
