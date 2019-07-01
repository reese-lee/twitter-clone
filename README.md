* Install  `$ apm install react@0.16.2` Adds proper syntax highlighting for .jsx files(just for Atom)

* Initialize Node Package Manager (npm) with `$ npm init`

* Create .gitignore file and add the following files
``` 
.DS_STORE
node_modules
build
```

*  Install React package with `$ npm install react@15.5.4 react-dom@15.5.4 --save`

*  Install webpack, a module bundler with `$ npm install webpack@3.4.0 --save-dev`

*  Install webpack globally with `$ npm install webpack@3.4.0 -g` to give access to commands in the terminal

* Install Babel transpiler to convert .jsx files to ES5 with `$ npm install babel-core@6.24.1 babel-loader@7.0.0 babel-preset-es2015@6.24.1 babel-preset-react@6.24.1 --save-dev`
```
* babel-core is the primary Babel library.
* babel-loader is the loader tool we'll use to integrate Babel with Webpack.
* babel-preset-es2015 contains the information necessary for Babel to transpile our code to ES5.
* babel-preset-react contains the information necessary for Babel to understand our React code, in order to transpile it correctly.
```

* Install React Prop Types library `$ npm install prop-types@15.5.10 --save`

* Add development server with webpack-dev-server packages: 
    
    `$ npm install webpack-dev-server@2.5.0 -g`  
    `$ npm install webpack-dev-server@2.5.0 --save-dev`

* Install Hot Moule Replacement package with
  
  `$ npm install react-hot-loader@3.0.0-beta.7 --save-dev`

* Add html template generator with `$ npm install html-webpack-plugin@2.29.0 --save-dev`

* Create new file "webpack.config.js" in root dir and paste into it:
```
const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    resolve(__dirname, "src", "index.jsx")
  ],

  output: {
    filename: 'app.bundle.js',
    path: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  devtool: '#source-map',

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ["es2015", {"modules": false}],
            "react",
          ],
          plugins: [
            "react-hot-loader/babel"
          ]
        }
      }
    ]
  },

    plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template:'template.ejs',
      appMountId: 'react-app-root',
      title: 'React Help Queue',
      filename: resolve(__dirname, "build", "index.html"),
    }),
  ]
};
```

* Create "index.jsx" file in src/ folder and paste in: 
```import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('react-app-root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
}
```
* create new "template.ejs" file in the top level of the directory and fill it with the following code:
```
<!DOCTYPE html>
<head>
  <meta charset="utf-8">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
  <body>
    <% if (htmlWebpackPlugin.options.appMountId) { %>
      <div id="<%= htmlWebpackPlugin.options.appMountId%>"></div>
    <% } %>
  </body>
</html>
```
