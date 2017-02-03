'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './store';

// allows onTapTouch() to work for React Components
injectTapEventPlugin();


/*------ COMPONENTS/CONTAINERS ------ */
import Root from './components/Root';
import Homepage from './components/Homepage';
import ActivityInfo from './components/ActivityInfo';

/*--------- ACTION CREATORS --------- */
import {fetchRelationships} from './reducers/relationships';
import {fetchActivitiesByRelationship} from './reducers/activities';
import {fetchSelectedRelationship} from './reducers/selectedRelationship';

/*--------- ON-ENTER HOOKS ---------- */

const onHomepageEnter = () => {
	store.dispatch(fetchRelationships());
}

const onActivityInfoEnter = ({ params }) => {
	store.dispatch(fetchActivitiesByRelationship({ relationshipId: params.id }));
	store.dispatch(fetchSelectedRelationship({ relationshipId: params.id }))
}

ReactDOM.render(
  <Provider store={store}>
		<MuiThemeProvider>
	    <Router history={hashHistory}>
				<Route component={Root}>
					<IndexRoute component={Homepage}/>
					<Route path="/" component={Homepage} onEnter={onHomepageEnter} />
					<Route path="/relationship/:id/activities" component={ActivityInfo} onEnter={onActivityInfoEnter}/>
				</Route>
			</Router>
		</MuiThemeProvider>
  </Provider>,
  document.getElementById('app'));