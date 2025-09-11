// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     'react-native-worklets/plugin',
//   ],

// };

module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // keep this last
  ],
};
// module.exports = {
//   presets: ['@react-native/babel-preset'],
//   plugins: [
//     'react-native-worklets/plugin',
//   ],
// };
// module.exports = {
//   presets: ['@react-native/babel-preset'],
//   plugins: [
//     // Required for worklets
//     'react-native-worklets/plugin',

//     // Must be last for Reanimated
//     'react-native-reanimated/plugin',
//   ],
// };
