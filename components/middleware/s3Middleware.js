import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const s3Middleware = async (req, res, next) => {
  if (!req.file) return next();

  try {
    // Resize and compress the image
    const processedImage = await sharp(req.file.buffer)
      .resize({ width: 80 })
      .rotate()
      .png({ quality: 100 })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .toBuffer();

    const filename = `images/${uuidv4()}.jpg`;

    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filename,
      Body: processedImage,
      ContentType: 'image/jpeg',
    };

    await s3.send(new PutObjectCommand(uploadParams));
    req.imgUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

    next();
  } catch (err) {
    console.error('Error processing image:', err);
    res.status(500).json({ error: 'Failed to process image' });
  }
};

export { upload, s3Middleware };
