import React from 'react';
import {combineReducers} from 'redux';
import relationships from './reducers/relationships';
import loggedInUser from './reducers/login';
import activities from './reducers/activities';
import selectedRelationship from './reducers/selectedRelationship';


const rootReducer = combineReducers({
	relationships,
	activities,
	selectedRelationship,
	loggedInUser
});

export default rootReducer;
