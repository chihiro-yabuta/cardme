const path = require('path');

module.exports = {
  mode: 'production',

  entry: './public/index.tsx',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env', '@babel/react'] },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    allowedHosts: 'all',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  target: 'web',

  performance: { hints: false }
};