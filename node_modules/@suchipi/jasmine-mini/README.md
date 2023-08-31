# `@suchipi/jasmine-mini`

Fork of jasmine's npm package that strips it down so it can run in non-browser, non-node environments.

It removes all the file and CLI-related parts of the jasmine node API, and also changes it so that it doesn't pollute the global with jasmine's public interface. The resulting bundle (`bundle.js`) should run in any JavaScript environment with the following defined:

- `console.log`
- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInteval`

### Usage

```js
// Either require "@suchipi/jasmine-mini" with your CommonJS-compatible
// module loader, or run the file `bundle.js` found in the root of this repo.
// It's a UMD bundle that defines the global `Jasmine` when CJS/AMD aren't
// available.

const j = new Jasmine();

const {
  describe,
  it,
  expect
  // etc. stuff you would normally find on the global
} = j.getInterface();

describe("thing", () => {
  it("works", () => {
    expect(2 + 2).toBe(4);
  });
});

j.execute();
```

### Usage (Promise wrapper)

This package also has a Promise wrapper you can use instead of the node interface, which works like this:

```js
const output = await Jasmine.run(({ describe, it, expect }) => {
  describe("thing", () => {
    it("works", () => {
      expect(2 + 2).toBe(4);
    });
  });
});
```

If the tests fail, the Promise will be rejected, and the output will be in the Error message.

### Bumping jasmine-core

This bundle is compiled with `jasmine-core@3.2.1`. If you want to compile with a different version of `jasmine-core`, follow these steps:

- Clone the repo
- Bump the jasmine-core dependency
- Run `yarn install`
- Run `yarn build`

And the `bundle.js` file will be updated.
