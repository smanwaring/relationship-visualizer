
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import AuthService from './utils/AuthService';

//instantiate the authService
const auth = new AuthService('tI3Yb8b6o4t7iOXLO4vffTYVpsHptMjl', 'stephaniemanwaring.auth0.com');

// allows onTapTouch() to work for React Components
injectTapEventPlugin();


/*------ COMPONENTS/CONTAINERS ------ */
import Root from './components/Root';
import Homepage from './components/Homepage';
import Login from './components/Login';

/*--------- ACTION CREATORS --------- */
import { fetchRelationships } from './reducers/relationships';

/*--------- ON-ENTER HOOKS ---------- */

// const onHomepageEnter = () => {
// 	store.dispatch(fetchRelationships())
// };

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  } else {
		store.dispatch(fetchRelationships());
  }
};


ReactDOM.render(
  <Provider store={store}>
	    <Router history={hashHistory}>
			<Route path="/" component={Root} auth={auth}>
				<Route path="/home" component={Homepage} onEnter={requireAuth} />
				<Route path="/login" component={Login} />
				<IndexRedirect to="/home" />
			</Route>
		</Router>
  </Provider>,
  document.getElementById('app'));

