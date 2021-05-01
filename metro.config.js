/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// const path = require('path');

// // react-native >= 0.57

// const extraNodeModules = {
//   'metro-runtime': path.resolve(__dirname + '/../metro-runtime/'),
// };
// const watchFolders = [
//   path.resolve(__dirname + '/../metro-runtime/')
// ];

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  // resolver: {
  //   extraNodeModules,
  // },
  // watchFolders
};
