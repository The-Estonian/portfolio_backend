import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const filename = Date.now() + '-' + file.originalname;
      cb(null, `images/${filename}`);
    },
  }),
});

export default upload.single('img');
