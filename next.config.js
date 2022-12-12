/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      "i.imgur.com",
      "images.unsplash.com",
      "ibb.co",
      "monstar-lab.com",
      "localhost",
      "insta-sham.s3.us-east-2.amazonaws.com",
      "insta-clone-api-mongo-multer-s3.vercel.app",
      "*",
    ],
  },
  env: {
    API_KEY: process.env.API_KEY,
    SERVER: process.env.SERVER,
    SOCKETIO: process.env.SOCKETIO,
  },
  reactStrictMode: true,
};
