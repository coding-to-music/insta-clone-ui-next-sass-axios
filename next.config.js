/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      "i.imgur.com",
      "images.unsplash.com",
      "ibb.co",
      "monstar-lab.com",
      "localhost",
      "*",
    ],
  },
  env: {
    API_KEY: process.env.API_KEY,
    SERVER: process.env.SERVER,
  },
  reactStrictMode: true,
};
