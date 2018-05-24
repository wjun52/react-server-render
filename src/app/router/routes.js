import React from 'react';
import Loadable from 'react-loadable';
import { homeThunk, animeThumk, detailThumk } from '../../store/actions/thunk';

const Loading =(props) => {
  console.log('loading', props)
  return <div></div>
}

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */'../../containers/Home'),
  loading: Loading,
});
const LoadableUser = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */'../../containers/User'),
  loading: Loading,
});

const LoadableAnime = Loadable({
  loader: () => import(/* webpackChunkName: 'Anime' */'../../containers/Anime'),
  loading: Loading,
});

const LoadableAnimeDetail = Loadable({
  loader: () => import(/* webpackChunkName: 'detail' */'../../containers/detail'),
  loading: Loading,
});

const routesConfig=[{
  path: '/',
  exact: true,
  component: LoadableHome,
  thunk: homeThunk,
}, {
  path: '/user',
  component: LoadableUser,
  thunk: ()=>{},
}, {
  path: '/anime',
  exact: true,
  component: LoadableAnime,
  thunk: animeThumk,
}, {
  path: '/anime/:id',
  component: LoadableAnimeDetail,
  thunk: detailThumk,
}];

export default routesConfig;