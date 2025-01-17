const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dbye8jxrs',
  api_key: '311829516323793',
  api_secret: 'yLagDPV4EpnEIink1oD7DjQSf3E'
});

module.exports = cloudinary;