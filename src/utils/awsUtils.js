import s3 from "../config/s3.js";
import { v4 as uuidv4 } from "uuid";

export const uploadToS3 = async (file, uuid) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${uuid}/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location; 
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};