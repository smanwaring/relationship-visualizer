import React from 'react';
import {combineReducers} from 'redux';
import relationships from './reducers/relationships';

const testReducer = function(state = '', action) {
	switch (action.type){
		case 'test':
			return action.payload;
		default: return state;
	}
};



const rootReducer = combineReducers({
    test: testReducer,
	relationships
});

export default rootReducer;
