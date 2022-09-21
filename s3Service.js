const { S3 } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");


exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map((param) => s3.upload(param).promise()));
};

