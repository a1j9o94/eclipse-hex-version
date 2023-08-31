const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");
const DOMParser = require("xmldom").DOMParser;

const makeProgram = template(`
  module.exports = EXPORTS;
`);

const makeRequire = template.expression(`
  typeof require(SOURCE) === "object" &&
    require(SOURCE) != null &&
    require(SOURCE).__esModule &&
    {}.hasOwnProperty.call(require(SOURCE), "default")

    ? require(SOURCE).default
    : require(SOURCE)
`);

function parseXML(source) {
  const parser = new DOMParser();
  const document = parser.parseFromString(source, "text/xml");

  const objExpression = handleNode(document.documentElement);

  const ast = makeProgram({
    EXPORTS: objExpression,
  });

  return generate(ast).code;
}

function handleNode(node) {
  if (!node.tagName) {
    if (node.textContent && Boolean(node.textContent.trim())) {
      return t.stringLiteral(node.textContent);
    } else {
      return null;
    }
  }

  const el = t.objectExpression([
    t.objectProperty(
      t.identifier("tagName"),
      t.stringLiteral(node.tagName || "null")
    ),
  ]);

  const attributes = Array.from(node.attributes || []);

  const properties = Object.create(null);

  for (const attr of attributes) {
    const value =
      String(Number(attr.value)) === attr.value
        ? t.numericLiteral(Number(attr.value))
        : t.stringLiteral(attr.value);

    properties[attr.name] = value;
  }

  switch (node.tagName) {
    case "tileset":
    case "image": {
      if (properties.source) {
        let sourceString = properties.source.value;
        if (!sourceString.startsWith(".")) {
          sourceString = "./" + sourceString;
        }

        properties.source = makeRequire({
          SOURCE: t.stringLiteral(sourceString),
        });
      }
      break;
    }
  }

  const attrsObjectExpression = t.objectExpression([]);
  for (const key of Object.keys(properties)) {
    const value = properties[key];
    attrsObjectExpression.properties.push(
      t.objectProperty(t.stringLiteral(key), value)
    );
  }

  el.properties.push(
    t.objectProperty(t.identifier("attributes"), attrsObjectExpression)
  );

  const children = Array.from(node.childNodes || []);

  if (children.length > 0) {
    const arrayExpression = t.arrayExpression();

    el.properties.push(
      t.objectProperty(t.identifier("children"), arrayExpression)
    );

    for (const child of children) {
      const astNode = handleNode(child);
      if (astNode) {
        arrayExpression.elements.push(astNode);
      }
    }
  }

  return el;
}

module.exports = parseXML;
