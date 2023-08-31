# `ogmo-project-loader`

This is a webpack loader that loads [Ogmo Editor](https://ogmo-editor-3.github.io/) project files (\*.ogmo).

It wraps images referenced in the file with a `require`, so your normal webpack loader for PNGs or etc will be used (eg `file-loader`).

## Usage

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.ogmo$/i,
        use: ["ogmo-project-loader"],
      },
    ],
  },
};
```

```js
const project = require("./project.ogmo");

console.log(project);
// { name: "project", ogmoVersion: "3.3.0", ... }
```

## License

MIT
