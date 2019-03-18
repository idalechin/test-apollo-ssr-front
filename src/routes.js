import React from 'react'
import universal from 'react-universal-component';
import Loader from './components/loader'
import notFound from './components/notFound'
import App from './App'

const defaultOptions = {
  onError: error => {
    console.log('Router error: ', error);
    return null
  },
  // minDelay: 300,
  loading: Loader,
  error: notFound,
  // ignoreBabelRename: true
}

export default [
  { component: universal(import('./App'), defaultOptions),
    routes: [
      {
        path: '/',
        key: 'home',
        exact: true,
        component: universal(import('./containers/Home'), defaultOptions)
      },
      {
        path: '/vendors/:page',
        key: 'vendors',
        component: universal(import('./containers/vendors/index'), defaultOptions),
      },
      {
        path: '/venues/:page',
        key: 'venues',
        component: universal(import('./containers/venues'), defaultOptions),
      },
      {
        path: '/vendor/:slug',
        key: 'vendor',
        component: universal(import('./containers/Vendor'), defaultOptions),
      },
      {
        path: '/signin',
        key: 'signin',
        component: universal(import('./containers/signin-page'), defaultOptions),
      },
    ]
  }
];
