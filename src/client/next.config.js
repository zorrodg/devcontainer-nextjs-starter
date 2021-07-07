/* global module */

module.exports = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "",
  },
  async rewrites() {
    return [
      {
        source: "/azure/:path*",
        destination: "http://localhost:7071/api/:path*",
      },
    ];
  },
};
