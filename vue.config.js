module.exports = {
    // The URL where the .NET Core app will be listening.
    // Specific port depends on whether IISExpress/Kestrel and HTTP/HTTPS are used
    devServer: {
      proxy: 
      'https://afternoon-taiga-12401.herokuapp.com/'
      // "https://localhost:5001/api/BidItems/"
    },
    lintOnSave: false,


  }