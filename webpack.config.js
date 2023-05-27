const path = require('path');

module.exports = {
  entry: './src/js/popup.js', // This is where webpack starts bundling
  output: {
    filename: 'popup.js', // The name of the output file
    path: path.resolve(__dirname, 'dist'), // The directory where webpack will output your bundled file
  },
  devtool: 'cheap-module-source-map', // or 'source-map'
  mode: 'development', // Use 'production' for production mode
};
