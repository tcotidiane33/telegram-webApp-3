const path = require('path');

module.exports = {
  entry: './src/index.js', // Chemin vers le point d'entrée de votre application
  output: {
    filename: 'bundle.js', // Nom du fichier de sortie
    path: path.resolve(__dirname, 'dist'), // Dossier de sortie
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Utilisez Babel pour transpiler les fichiers JavaScript
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs'],
    fallback: { "querystring": false }  },
};
