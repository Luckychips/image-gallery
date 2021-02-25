const CracoAlias = require('craco-alias');
const emotionPresetOptions = {};
const emotionBabelPreset = require('@emotion/babel-preset-css-prop').default(undefined, emotionPresetOptions);

module.exports = {
  babel: {
    plugins: [...emotionBabelPreset.plugins],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './config/tsconfig.extend.json',
      },
    },
  ],
};
