import React from 'react';
import { combineReducers } from 'redux';
import relationships from './components/relationships/relationships.reducer';
import loggedInUser from './components/login/login.reducer';
import mainMenu from './components/main-menu/main-menu.reducer';
import addActivityStatus from './components/forms/add-activity/add-activity.reducer';
import addRelationshipStatus from './components/forms/add-relationship/add-relationship.reducer';

const rootReducer = combineReducers({
	relationships,
	addActivityStatus,
	loggedInUser,
	addRelationshipStatus,
	mainMenu
});

export default rootReducer;
