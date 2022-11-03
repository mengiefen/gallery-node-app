const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

cloudinary.uploader
  .upload(
    'https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_thumb,g_face,r_20/lady.jpg',
    {
      resourceType: 'image',
      public_id: 'lady',
      overwrite: true,
      notification_url: 'https://mysite.example.com/notify_endpoint',
    },
  )
  .then((uploadResult) => console.log(uploadResult))
  .catch((error) => console.error(error));
