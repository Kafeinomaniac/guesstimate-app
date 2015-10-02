import app from 'ampersand-app'
import Router from 'ampersand-router'
import SpaceShow from './views/repos/show'
import SpaceNew from './views/repos/new'
import Home from './views/home'
import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './layouts/application'

import { Provider } from 'react-redux';
import todoApp from './reducers';
import {createStore} from 'redux'
import configureStore from './stores/configureStore.js'

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

const Debug = ({store, LogMonitor}) => (
  <DebugPanel right top bottom>
    <DevTools store={store} monitor={LogMonitor} />
  </DebugPanel>
);

const FullPage = ({isFluid, page}) => (
  <Layout isFluid={isFluid}>
    {page}
  </Layout>
);

export default Router.extend({
  render (page, isFluid=false) {
    let store = configureStore()
    ReactDOM.render(
      <div>
        <Provider store={store}>
          <FullPage isFluid={isFluid} page={page}/>
        </Provider>
        {__DEV__ ? <Debug/> : ''}
      </div>,
      document.body)
  },

  routes: {
    '': 'home',
    'space/new': 'spaceNew',
    'space/:id': 'spaceShow',
  },

  home () {
    this.render(<Home/>, true)
  },

  spaceNew () {
    this.render(<SpaceNew/>, false)
  },

  spaceShow (id) {
    this.render(<SpaceShow spaceId={id}/>, true)
  },
})
