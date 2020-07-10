module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            actions: './actions',
            assets: './assets',
            components: './components',
            data: './data',
            navigation: './navigation',
            reducers: './reducers',
            res: './res',
            screens: './screens',
            utils: './utils',
          },
        },
      ],
      [
        '@babel/plugin-transform-modules-commonjs',
        {
          strictMode: false,
          allowTopLevelThis: true,
          loose: true,
        },
      ],
    ],
  };
};
