// module.exports = (api) => {
//     api.cache(true);
//     const presets = [
//         ['@babel/preset-env', {
//             useBuiltIns: false,
//             loose: true,
//         }],
//         '@babel/preset-react',
//     ];

//     const plugins = [
//         'react-hot-loader/babel',
//         // '@babel/plugin-proposal-class-properties',
//         // '@babel/plugin-proposal-object-rest-spread',
//         ['@babel/plugin-transform-runtime', {
//             regenerator: true,
//         }],
//     ];

//     if (process.env.LOCAL) {
//         plugins.shift();
//     }

//     return {
//         presets,
//         plugins,
//     };
// };
