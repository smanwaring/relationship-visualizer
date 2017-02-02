import React from 'react';
import {combineReducers} from 'redux';
import relationships from './reducers/relationships';
import activities from './reducers/activities';
import selectedRelationship from './reducers/selectedRelationship';



const rootReducer = combineReducers({
	relationships,
	activities,
	selectedRelationship
});

export default rootReducer;
