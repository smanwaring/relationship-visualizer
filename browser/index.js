'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';
import AuthService from './utils/AuthService';

import { animateBubbles } from './d3/bubbleD3';

//instantiate the authService
const auth = new AuthService('tI3Yb8b6o4t7iOXLO4vffTYVpsHptMjl', 'stephaniemanwaring.auth0.com');

// allows onTapTouch() to work for React Components
injectTapEventPlugin();

/*------ COMPONENTS/CONTAINERS ------ */
import Root from './components/Root';
import Homepage from './components/Homepage';
import Login from './components/login/login.component';
import ActivityInfo from './components/ActivityInfo';
import Relationships from './components/relationships/relationships.component';
import Relationship from './components/relationship/relationship.component';

/*--------- ACTION CREATORS --------- */
import { fetchRelationshipsByUser } from './components/relationships/relationships.reducer';
import { fetchActivitiesByRelationship } from './reducers/activities';
import { fetchSelectedRelationship } from './components/relationship/relationship.reducer';
import { findOrCreateUser } from './components/login/login.reducer';

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
			store.dispatch(fetchRelationshipsByUser({ id: store.getState().loggedInUser.id }))
			.then(response => {
				if (!nextState.params.id) {
					store.getState().relationships.forEach(relationship => {
						animateBubbles(relationship);
					});
				}
			});
		});
  }
};

const onActivityInfoEnter = ({ params }) => {
	store.dispatch(fetchActivitiesByRelationship({ relationshipId: params.id }));
	store.dispatch(fetchSelectedRelationship({ relationshipId: params.id }));
};

const onRelationshipsEnter = (nextState) => {
	if (!store.getState().loggedInUser.id) return;
	store.dispatch(fetchRelationshipsByUser({ id: store.getState().loggedInUser.id }))
	.then(response => {
		if (!nextState.params.id) {
			store.getState().relationships.forEach(relationship => {
				animateBubbles(relationship);
			});
		}
	});
};

const onOneRelationshipEnter = ({ params }) => {
	store.dispatch(fetchSelectedRelationship({ relationshipId: params.relationshipId, userId: params.userId }));
};

ReactDOM.render(
  <Provider store={store}>
		<MuiThemeProvider>
	    <Router history={browserHistory}>
			<Route path="/" component={Root} auth={auth}>
				<Route path="/home" component={Homepage} onEnter={requireAuth}>
					<Route path="/relationships" component={Relationships}  onEnter={onRelationshipsEnter} />
					<Route path="/relationship/user/:userId/rel/:relationshipId" component={Relationship} onEnter={onOneRelationshipEnter} />
        	<Route path="/relationship/:id/activities" component={ActivityInfo} onEnter={onActivityInfoEnter} />
				</Route>
				<Route path="/login" component={Login} />
				<IndexRedirect to="/login" />
			</Route>
		</Router>
   </MuiThemeProvider>
  </Provider>,
  document.getElementById('app'));


