const fs = require("fs");
const template = require("@babel/template").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

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

function jsonToAst(data) {
  if (typeof data === "object" && data != null) {
    if (Array.isArray(data)) {
      return t.arrayExpression(data.map(jsonToAst));
    } else {
      if (typeof data.type === "string") return data;

      const objExpression = t.objectExpression([]);
      Object.entries(data).forEach(([key, value]) => {
        const keyNode = jsonToAst(key);
        const valueNode = jsonToAst(value);

        objExpression.properties.push(t.objectProperty(keyNode, valueNode));
      });

      return objExpression;
    }
  } else if (data === null) {
    return t.nullLiteral();
  } else if (data === undefined) {
    return t.identifier("undefined");
  } else if (typeof data === "string") {
    return t.stringLiteral(data);
  } else if (typeof data === "number") {
    return t.numericLiteral(data);
  } else if (typeof data === "boolean") {
    return t.booleanLiteral(data);
  }
}

function parseProject(filepath) {
  const jsonStr = fs.readFileSync(filepath, "utf-8");
  const project = JSON.parse(jsonStr);

  if (Array.isArray(project.entities)) {
    project.entities.forEach((ent) => {
      if (typeof ent.texture === "string") {
        ent.texture = makeRequire({
          SOURCE: t.stringLiteral("./" + ent.texture),
        });
      }

      if (typeof ent.textureImage === "string") {
        delete ent.textureImage;
      }
    });
  }

  if (Array.isArray(project.tilesets)) {
    project.tilesets.forEach((tileset) => {
      if (typeof tileset.path === "string") {
        tileset.path = makeRequire({
          SOURCE: t.stringLiteral("./" + tileset.path),
        });
      }

      if (typeof tileset.image === "string") {
        delete tileset.image;
      }
    });
  }

  const ast = makeProgram({
    EXPORTS: jsonToAst(project),
  });

  return generate(ast).code;
}

module.exports = parseProject;
