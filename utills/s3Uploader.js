const AWS = require('aws-sdk');
const formidable = require('formidable');
const fs = require('fs');

// Configure AWS with your credentials
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.ACCESS_KEY_ID.SECRET_ACCESS_KEY,
  region: process.env.ACCESS_KEY_ID.REGION
});

// Create S3 instance
const s3 = new AWS.S3();

// Handle file upload
const uploadFileToS3 = (file) => {
  const fileName = file.name;
  const fileStream = fs.createReadStream(file.path);

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
    ACL: 'public-read' // Adjust the access control as needed
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location); // URL of the uploaded file
      }
    });
  });
};

module.exports={uploadFileToS3}
