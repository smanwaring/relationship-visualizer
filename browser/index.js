
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import store from './store';


/*------ COMPONENTS/CONTAINERS ------ */
import Root from './components/Root';
import Homepage from './components/Homepage';

/*--------- ACTION CREATORS --------- */
import {fetchRelationships} from './reducers/relationships';

/*--------- ON-ENTER HOOKS ---------- */

const onHomepageEnter = () => {
	store.dispatch(fetchRelationships())
}

ReactDOM.render(
  <Provider store={store}>
	    <Router history={hashHistory}>
			<Route component={Root}>
				<Route path="/" component={Homepage} onEnter={onHomepageEnter}/>
				<IndexRoute component={Homepage}/>
			</Route>
		</Router>
  </Provider>,
  document.getElementById('app'));
