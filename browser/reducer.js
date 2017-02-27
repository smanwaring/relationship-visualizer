import React from 'react';
import {combineReducers} from 'redux';
import { relationships, relationshipError } from './reducers/relationships';
import loggedInUser from './reducers/login';
import activities from './reducers/activities';
import selectedRelationship from './reducers/selectedRelationship';


const rootReducer = combineReducers({
	relationships,
	activities,
	selectedRelationship,
	loggedInUser,
	relationshipError
});

export default rootReducer;
