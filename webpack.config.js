const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  style: [
    path.join(__dirname, 'node_modules', 'purecss'),
    path.join(__dirname, 'app', 'main.css'),
  ],
  build: path.join(__dirname, 'build')
};

const pkg =  require ( './package.json' ) ;

process.env.BABEL_ENV = TARGET;

const common = merge(
  {

    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
      style: PATHS.style,
      app: PATHS.app,
      //vendor: ['react']
    },
    output: {
      path: PATHS.build,
      //filename: 'js/[name]/[name].js'
      filename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo'
      })
    ],
    // Important! Do not remove ''. If you do, imports without
    // an extension won't work anymore!
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  parts.loadJSX(PATHS.app)
);


var config;

// Detect how npm is run and branch based on that
switch(TARGET) {
  case 'build':
  case 'stats':
    config = merge(
      common,
      {
        devtool: 'source-map',
        output: {
          path: PATHS.build,
          // Tweak this to match your GitHub project name
          publicPath: '/webpack-demo/',
          filename: '[name].[chunkhash].js',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: '[chunkhash].js'
        },
        //watch: true
      },
      parts.clean(path.join(PATHS.build, '*')),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.dependencies)
      }),
      //parts.loadJSX(PATHS.app),
      parts.minify(),
      parts.extractCSS(PATHS.style),
      parts.purifyCSS([PATHS.app])
    );
    break;

  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHS.style),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config, {
  quiet: true
});
