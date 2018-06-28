require('./ignore.js')();
require('babel-polyfill');
require('babel-register')({
  presets: ['env', 'react', 'stage-0'],
  plugins: ["react-loadable/babel", 'syntax-dynamic-import', "dynamic-import-node"]
});
// const config = require('../config/config')
// Css required hook
// require('css-modules-require-hook')({
//   extensions: ['.scss'],
//   preprocessCss: (data, filename) =>
//       require('node-sass').renderSync({
//           data,
//           file: filename
//       }).css,
//   camelCase: true,
//   generateScopedName: config.cssModulesClass
// })

// Image required hook
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif', 'webp'],
  limit: 1024,
  name: 'img/[hash:base64:32].[ext]'
})
require('jsdom');
const Koa = require('koa');
const app = new Koa();
const clientRouter = require('./clientRouter.js').default;
const port = process.env.port || 3002;
const staticCache = require("koa-static-cache");
const path = require('path');
const cors = require('koa2-cors');
const Loadable = require('react-loadable');
// const webpack = require("webpack");
// const webpackConfig = require("../config/webpack.config.prod");
// const devMiddleware = require("./devMiddleware");
// const hotMiddleware = require('./hotMiddleware');

// const compiler = webpack(webpackConfig);

// app.use(devMiddleware(compiler));
// app.use(hotMiddleware(compiler));
app.use(cors());
app.use(clientRouter);
app.use(staticCache (path.resolve(__dirname, '../dist'), {
  maxAge: 365 * 24 * 60 * 60,
  gzip:true
}));


console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`)
// koa 渲染按需加载
Loadable.preloadAll().then(() => {
  app.listen(port)
}).catch(err => {
  console.log(err);
});


