import React from 'react';
import { combineReducers } from 'redux';
import relationships from './components/relationships/relationships.reducer';
import loggedInUser from './components/login/login.reducer';
import mainMenu from './components/main-menu/main-menu.reducer';
import activities from './reducers/activities';
import selectedRelationship from './components/relationship/relationship.reducer';
import addRelationshipStatus from './components/forms/add-relationship/add-relationship.reducer';

const rootReducer = combineReducers({
	relationships,
	activities,
	selectedRelationship,
	loggedInUser,
	addRelationshipStatus,
	mainMenu
});

export default rootReducer;
