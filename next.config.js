const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const nextRuntimeDotenv = require('next-runtime-dotenv');

const environment = process.env.NODE_ENV || 'development';
const analyzerMode = process.env.ANALYZE_BUNDLE;

const withConfig = nextRuntimeDotenv({
  path: `${__dirname}/config/envs/${environment}.env`,
  public: ['PAGE_SERVICE_DOMAIN'],
  server: []
});

module.exports = withConfig(
  withBundleAnalyzer({
    analyzeServer: ['server', 'both'].includes(analyzerMode),
    analyzeBrowser: ['browser', 'both'].includes(analyzerMode),
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
