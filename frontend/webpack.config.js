// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   // Entry point for your app (usually the main JavaScript file)
//   entry: './frontend/src/index.js',  // Update with the actual entry point for your app

//   // Output configuration (where your bundled files will be placed)
//   output: {
//     path: path.resolve(__dirname, 'dist'),  // Output directory
//     filename: 'bundle.js',  // The name of the bundled JavaScript file
//     publicPath: '/',  // Ensure it's served from the root
//   },

//   // Module rules to handle different file types (e.g., JS, CSS, HTML)
//   module: {
//     rules: [
//       {
//         test: /\.js$/, // Handle JS files
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.css$/, // Handle CSS files
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.html$/, // Handle HTML files
//         use: {
//           loader: 'html-loader',
//         },
//       },
//     ],
//   },

//   // Plugins for additional functionality (e.g., generating index.html)
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './frontend/pages/index.html',  // Change path to your HTML location
//       filename: 'index.html',
//     }),
//   ],

//   // DevServer configuration for local development
//   devServer: {
//     contentBase: path.join(__dirname, 'dist'),  // Directory to serve
//     compress: true,
//     port: 3000,  // You can change the port to any available port
//   },
// };
