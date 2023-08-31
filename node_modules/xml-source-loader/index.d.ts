declare namespace XMLSourceLoader {
  type Element =
    | string
    | {
        tagName: string;
        children?: Array<Element>;
        attributes: {
          [attributeName: string]: any;
        };
      };
}
