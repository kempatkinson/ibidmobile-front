module.exports = {
  // The URL where the .NET Core app will be listening.
  // Specific port depends on whether IISExpress/Kestrel and HTTP/HTTPS are used
  devServer: {
    proxy: {
      "/api/": {
        target: "http://localhost:5001",
        //target: "https://afternoon-taiga-12401.herokuapp.com/api/items/" 

      }
    },
  },
  lintOnSave: false,


}