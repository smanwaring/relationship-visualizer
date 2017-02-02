
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from "react-tap-event-plugin";
import store from './store';

// allows onTapTouch() to work for React Components
injectTapEventPlugin();


/*------ COMPONENTS/CONTAINERS ------ */
import Root from './components/Root';
import Homepage from './components/Homepage';
import ActivityInfo from './components/ActivityInfo';

/*--------- ACTION CREATORS --------- */
import {fetchRelationships} from './reducers/relationships';
import {fetchSelectedRelationship} from './reducers/selectedRelationship';

/*--------- ON-ENTER HOOKS ---------- */

const onHomepageEnter = () => {
	store.dispatch(fetchRelationships())
}

ReactDOM.render(
  <Provider store={store}>
	    <Router history={hashHistory}>
				<Route component={Root}>
					<IndexRoute component={Homepage}/>
					<Route path="/" component={Homepage} onEnter={onHomepageEnter}>
				</Route>
				<Route path="/relationships/:id/activities" component={ActivityInfo} onEnter={}/>
			</Route>
		</Router>
  </Provider>,
  document.getElementById('app'));
