var webpack = require("webpack");
var path = require("path");

var SRC = path.resolve(__dirname, "src"); 
var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "build");

var config = {
  entry: SRC  + "/index.jsx",
  output: {
    path:OUTPUT,
    library:'Panel',
    libraryTarget:'umd',
    filename:'myCode.js'
  },
  module: {
    loaders: [{
        include: SRC,
        loader: "babel-loader",
        query: {
                     presets: ['es2015','stage-2']
                 }
    }]
  }
};
 
module.exports = config;