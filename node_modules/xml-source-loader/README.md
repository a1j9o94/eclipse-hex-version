# `xml-source-loader`

This is a webpack loader that loads XML files and requires any dependencies they have, as specified via a `"source"` node attribute.

It marshals the XML into a JSON format, and for any nodes with a `source` attribute, it will wrap that attribute with a `require` so that it will get loaded through webpack's normal loading mechanism (eg `file-loader`).

It was designed to be compatible with the XML format produced by [Tiled](https://www.mapeditor.org/).

The JSON format that the XML gets converted into can be described using this type:

```ts
interface Element {
  tagName: string;
  children: Array<Element>;
  attributes: {
    [attributeName: string]: any;
  };
}
```

## Usage

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.xml$/i,
        use: ["xml-source-loader"],
      },
    ],
  },
};
```

```js
const tileset = require("./tileset.xml");
const map = require("./map.xml");

console.log(tileset);
// { tagName: "tileset", ... }
console.log(map);
// { tagName: "map", ... }
```

## License

MIT
