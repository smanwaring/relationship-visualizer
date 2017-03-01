import React from 'react';
import { combineReducers } from 'redux';
import relationships from './components/relationships/relationships.reducer';
import loggedInUser from './components/login/login.reducer';
import mainMenu from './components/main-menu/main-menu.reducer';
import activities from './reducers/activities';
import selectedRelationship from './reducers/selectedRelationship';
import addRelationshipError from './components/forms/add-relationship/add-relationship.reducer';

const rootReducer = combineReducers({
	relationships,
	activities,
	selectedRelationship,
	loggedInUser,
	addRelationshipError,
	mainMenu
});

export default rootReducer;
