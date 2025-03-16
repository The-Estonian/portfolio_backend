import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import mime from 'mime-types';

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const fileExtension = mime.extension(file.mimetype) || 'bin';
      cb(null, `images/${uuidv4()}.${fileExtension}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const s3Middleware = (req, res, next) => {
  if (!req.file) return next();
  req.imgUrl = req.file.location;
  next();
};

export { upload, s3Middleware };
