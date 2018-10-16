# Next.js sample app with page authoring integration

Assumption: Page information available through a sample page service - and dynamically importing required components
We can create a mapper to transform service response to required structure assumed.

## Getting Started

Clone this repo and run following for development mode:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Run the mock server separately (which serves the page services):

```bash
npm run mock-server
# or
yarn mock-server
```

For production mode (all with mocks for now):

```bash
npm run build:serve
# or
yarn build:serve
```

## The idea behind the example

This examples shows how to dynamically import modules via [`import()`](https://github.com/tc39/proposal-dynamic-import) API and futher extend it to a use case where the page layouts are governed by an external CMS.

## Important files

- Application Layout Component: `pages/_app.js`
- Base Rendering Engine (for all routes): `pages/BaseLayoutEngine.js`
- Component Registry: `modules/lib/componentRegistry.js`
- Layout Renderer: `modules/lib/renderers/layout.js`
- Page Service Mocks: `mocks/page-service`

Self-signed certificates under `certificates/` for running http2 server.

## Bundle Analyzer

You can run one of these commands:

```bash
# Build and analyze the back end server bundle
ANALYZE_BUNDLE=server yarn build

# Build and analyze the front end browser bundle
ANALYZE_BUNDLE=browser yarn build

# Build and analyze both server and browser
ANALYZE_BUNDLE=both yarn build

# Build and analyze neither server nor browser
yarn build
```

If you choose both then two different browser windows will open. One will be for the server bundle, one for the browser bundle.
