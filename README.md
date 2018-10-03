# Example app with dynamic-imports and page authoring integration

Clone this repo and run:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Run the mock server (which serves the page services):

```bash
npm run mock-server
# or
yarn mock-server
```

## The idea behind the example

This examples shows how to dynamically import modules via [`import()`](https://github.com/tc39/proposal-dynamic-import) API and futher extend it to a use case where the page layouts are governed by an external CMS.
