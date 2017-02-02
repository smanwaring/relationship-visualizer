import React from 'react';
import {combineReducers} from 'redux';
import relationships from './reducers/relationships';
import activities from './reducers/activities';



const rootReducer = combineReducers({
	relationships,
	activities
});

export default rootReducer;
