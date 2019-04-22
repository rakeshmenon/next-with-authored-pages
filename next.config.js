const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const nextRuntimeDotenv = require('next-runtime-dotenv');

const environment = process.env.NODE_ENV || 'development';

const withConfig = nextRuntimeDotenv({
  path: `${__dirname}/config/envs/${environment}.env`,
  public: ['PAGE_SERVICE_DOMAIN'],
  server: []
});

module.exports = withConfig(
  withBundleAnalyzer({
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../bundles/client.html'
      }
    }
  })
);
