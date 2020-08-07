module.exports = {
  // The URL where the .NET Core app will be listening.
  // Specific port depends on whether IISExpress/Kestrel and HTTP/HTTPS are used
  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:5001",
      }
    },
  },
  lintOnSave: false,


}