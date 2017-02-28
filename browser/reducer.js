import React from 'react';
import { combineReducers } from 'redux';
import { relationships } from './reducers/relationships';
import loggedInUser from './reducers/login';
import activities from './reducers/activities';
import selectedRelationship from './reducers/selectedRelationship';
import relationshipError from './components/forms/add-relationship/add-relationship.reducer';

const rootReducer = combineReducers({
	relationships,
	activities,
	selectedRelationship,
	loggedInUser,
	relationshipError
});

export default rootReducer;
