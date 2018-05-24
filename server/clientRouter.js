import React from 'react';
import { renderToString } from 'react-dom/server';
import { getBundles } from 'react-loadable/webpack';
import { matchPath } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import createHistory from 'history/createMemoryHistory';
import stats from '../dist/react-loadable.json';
import Helmet from 'react-helmet';
import client from '../src/app';
import path from 'path';
import fs from 'fs';
import 'isomorphic-fetch';

const { configureStore, createApp, routesConfig } = client;

const createStore = (configureStore) => {
  const store = configureStore();
  return store;
}

const createTags = (modules) => {
  const bundles = getBundles(stats, modules);
  const scriptfiles = bundles.filter(bundle => bundle.file.endsWith('.js'));
  const stylefiles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  const scripts = scriptfiles.map(script => `<script src="/${script.file}"></script>`).join('\n');
  const styles = stylefiles.map(style => `<link href="/${style.file}" rel="stylesheet"/>`).join('\n');
  return { scripts, styles };
}

const prepHTML = (data, { html, head, rootString, scripts, styles, initState }) => {
  data = data.replace('<html', `<html ${html}`);
  data = data.replace('</head>', `${head}${styles}</head>`);
  data = data.replace('<div id="root"></div>', `<div id="root">${rootString}</div>`);
  data = data.replace('<div id="initState"></div>', `<script>window.__INITIAL_STATE__ = ${JSON.stringify(initState)}</script>`);
  data = data.replace('</body>', `${scripts}</body>`);
  return data;
}

const getMatch = (routesArray, url) => {
  return routesArray.some(router => matchPath(url, {
    path: router.path,
    exact: router.exact,
  }));
}
// 渲染
const makeup = (ctx, store, createApp, html) => {
  const initState = store.getState();
  const history = createHistory({ initialEntries: [ctx.req.url] });
  const modules = [];
  const rootString = renderToString(createApp({ store, history, modules }));
  const { scripts, styles } = createTags(modules);
  const helmet = Helmet.renderStatic();
  const renderedHtml = prepHTML(html, {
    html: helmet.htmlAttributes.toString(),
    head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
    rootString,
    scripts,
    styles,
    initState,
  })
  return renderedHtml;
}

// 匹配路由
const clientRouter = async(ctx, next) => {
  const html = fs.readFileSync(path.join(path.resolve(__dirname, '../dist'), 'index.html'), 'utf-8');
  const store = createStore(configureStore);
  const branch = matchRoutes(routesConfig, ctx.req.url);
  const promises = branch.map(({ route, match }) => {
    // console.log(route.component.getServerFetch)
    const params = JSON.stringify(match.params) === '{}' ? route.thunk(store) : route.thunk(store, match.params) // 接口请求是否有入参
    return route.thunk ? params : Promise.resolve(null)
  });
  await Promise.all(promises).catch(err => console.log('err:---', err))
  const isMatch = getMatch(routesConfig, ctx.req.url);
  if(isMatch){
    const renderedHtml = await makeup(ctx, store, createApp, html);
    ctx.body = renderedHtml;
  }
  await next();
}

export default clientRouter;