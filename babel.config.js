/**
 * babel.config.js
 *
 * Configuration file for Babel.
 * Specifies presets used for transpiling JavaScript code, such as
 * '@babel/preset-env' for modern JavaScript features and
 * '@babel/preset-react' for JSX and other React-specific syntax.
 */
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-react'
  ]
}
