# webpack-plugin-responsive-app [beta]
A Webpack plugin to automatically handle your app responsiveness:

* Set up and ready
* Web accessible compliant
* Mobile screen auto-adaptation [experimental]

## Install

```javascript
npm i -D webpack-plugin-responsive-app
```

## Usage

In your `webpack.config.js` file:

```javascript
const WebpackResponsiveApp = require('webpack-plugin-responsive-app')

module.exports = {
  ...
  plugins: [
    ...,
    // Last plugin on the list
    new WebpackResponsiveApp(),
  ],
};
```

## Options
Check the [responsive-app](https://www.npmjs.com/package/responsive-app?activeTab=readme) docs page
