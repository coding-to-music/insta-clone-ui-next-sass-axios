/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: [
      "i.imgur.com",
      "images.unsplash.com",
      "ibb.co",
      "monstar-lab.com",
      "*",
    ],
  },
  env: {
    API_KEY: process.env.API_KEY,
  },
  reactStrictMode: true,
};
