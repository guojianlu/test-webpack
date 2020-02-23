const path = require('path');
const glob = require("glob");
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin');
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  entryFiles.map(entryFile => {
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        title: pageName,
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true
      })
    );
  });
  
  return { entry, htmlWebpackPlugins };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  // entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'replaceLoader',
          {
            loader: 'replaceLoaderAsync',
            options: {
              name: 'kobe!!!'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...htmlWebpackPlugins,
    new CopyrightWebpackPlugin({ name: 'kobe' })
  ]
};
