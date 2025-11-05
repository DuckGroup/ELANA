import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

export const uploadImagesToCloudinary = async (
  images: string[],
  folder: string = "products"
): Promise<string[]> => {
  if (!images || images.length === 0) {
    return [];
  }

  return await Promise.all(
    images.map(async (imageData) => {
      if (imageData.startsWith("http")) {
        return imageData;
      }

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload(
          imageData,
          {
            folder,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
      });

      return result.secure_url;
    })
  );
};

export default cloudinary;
