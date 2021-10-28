/* eslint-disable */
const CracoAlias = require('craco-alias');
const getLocalIdent = require('./getBemCssLocalIdent');
const externals = require('./native-modules.config');

module.exports = {
  webpack: { externals },
  eslint: {
    enable: false,
  },
  style: {
    css: {
      loaderOptions: ((cssLoaderOptions) => {
        console.log(cssLoaderOptions);
        return {
          ...cssLoaderOptions,
          modules: {
            auto: true,
            exportLocalsConvention: 'camelCase',
            getLocalIdent,
          },
        };
      }),
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};