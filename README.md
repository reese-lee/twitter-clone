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

* to install linter
```
$ npm install eslint@4.13.1 -g
$ npm install eslint@4.13.1 --save-dev
```

* initialize linter at the top level of your directory
```
$ eslint --init
```

* This will prompt a series of questions; select "Answer questions about your style" and select the following answers:
```
? Are you using ECMAScript 6 features? Yes
? Are you using ES6 modules? Yes
? Where will your code run? Browser
? Do you use CommonJS? No
? Do you use JSX? Yes
? Do you use React? Yes
? What style of indentation do you use? Spaces  
? What quotes do you use for strings? Single
? What line endings do you use? Unix
? Do you require semicolons? Yes
? What format do you want your config file to be in? JSON
```

* Run ESLint with the following command
```
$ eslint src/** src/**/**
```

* Manually install React plugins for ESLinter
```
$ npm install eslint-plugin-react -g
$ npm install eslint-plugin-react --save-dev
```

* In your index.jsx file, wrap the final conditional with the following:
```
/*eslint-disable */
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
/*eslint-enable */
```

* Install eslint-loader, a special Webpack loader to work with ESLint
```
$ npm install eslint-loader --save-dev
```

* Use the following to fix indent errors automatically:
```
$ npm run lint-fix
```

* Copy and paste the following to your .eslintr.json file:
```
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-key": 2,
        "react/jsx-uses-vars": 2,
        "react/jsx-uses-react": 2,
        "react/jsx-no-duplicate-props": 2,
        "react/jsx-no-undef": 2,
        "react/no-multi-comp": 2,
        "react/jsx-indent-props": [
            "error",
            2
          ],
        "react/jsx-pascal-case": 2,
        "react/prop-types": 2,
        "react/jsx-indent": [
            "error",
            2
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],

        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
```

* And the following to your webpack.config.js
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
    extensions: [ '.js', '.jsx' ]
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
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          emitWarning: true,
          configFile: "./.eslintrc.json"
        }
      },
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
            "react-hot-loader/babel",
            "styled-jsx/babel"
          ]
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]

  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template:'template.ejs',
      appMountId: 'react-app-root',
      title: 'Lee & Bateman Markets',
      filename: resolve(__dirname, "build", "index.html"),
    }),
  ]
};

```
