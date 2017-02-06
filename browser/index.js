'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
import ActivityInfo from './components/ActivityInfo';

/*--------- ACTION CREATORS --------- */
import { fetchRelationshipsByUser } from './reducers/relationships';
import { fetchActivitiesByRelationship } from './reducers/activities';
import { fetchSelectedRelationship } from './reducers/selectedRelationship';
import { findOrCreateUser } from './reducers/login';

/*--------- ON-ENTER HOOKS ---------- */
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  } else {
		const user = auth.getProfile();
		const userDetails = {
				name: `${user.given_name} ${user.family_name}`,
				email: user.email,
				authId: user.user_id
		};
		store.dispatch(findOrCreateUser(userDetails))
		.then(() => {
			store.dispatch(fetchRelationshipsByUser({ id: store.getState().loggedInUser.id }));
		})
  }
};

const onActivityInfoEnter = ({ params }) => {
	store.dispatch(fetchActivitiesByRelationship({ relationshipId: params.id }));
	store.dispatch(fetchSelectedRelationship({ relationshipId: params.id }));
};

ReactDOM.render(
  <Provider store={store}>
		<MuiThemeProvider>
	    <Router history={browserHistory}>
			<Route path="/" component={Root} auth={auth}>
				<Route path="/home" component={Homepage} onEnter={requireAuth} />
				<Route path="/login" component={Login} />
        <Route path="/relationship/:id/activities" component={ActivityInfo} onEnter={onActivityInfoEnter} />
				<IndexRedirect to="/login" />
			</Route>
		</Router>
   </MuiThemeProvider>
  </Provider>,
  document.getElementById('app'));


