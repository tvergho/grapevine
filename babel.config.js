module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
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
          },
        },
      ],
    ],
  };
};
