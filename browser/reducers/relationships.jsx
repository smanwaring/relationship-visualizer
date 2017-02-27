import axios from 'axios';
import { animateBubbles, expandBubble } from '../d3/bubbleD3';

// constants
const SET_RELATIONSHIPS = 'SET_RELATIONSHIPS';
const SET_RELATIONSHIP = 'SET_RELATIONSHIP';
const ADD_TO_SCORE = 'ADD_TO_SCORE';
const ADD_RELATIONSHIP = 'ADD_RELATIONSHIP';

// sync action creators
export const setRelationships = (relationships) => ({
  type: SET_RELATIONSHIPS,
  relationships
});

export const addRelationship = (relationship) => ({
  type: ADD_RELATIONSHIP,
  relationship
});

// async action creators
export const fetchRelationshipsByUser = ({ id }) => dispatch => {
  return axios.get(`/api/relationship/user/${id}`)
  .then(relationships => {
    dispatch(setRelationships(relationships.data));
  });
};

export const incrementScore = (relationship, user) => dispatch => {
  axios.put(`/api/relationship/${relationship.id}`, { score: relationship.score + 5 })
  .then(relationship => {
    animateBubbles(relationship.data);
    expandBubble(relationship.data);
    return axios.get(`/api/relationship/user/${user.id}`);
  })
  .then(relationships => {
    dispatch(setRelationships(relationships.data));
  });
};

export const postRelationship = ( relationshipInfo ) => dispatch => {
  return axios.post(`/api/relationship/`, relationshipInfo)
  .then(relationship => {
    dispatch(addRelationship(relationship.data));
  });
};

// initial state
const initialState = [];

// reducer
const reducer = (state=initialState, action) => {

  switch (action.type) {
    case SET_RELATIONSHIPS:
      return action.relationships;
    case ADD_RELATIONSHIP:
      return [...state, action.relationship];
    default:
      return state;
  }
};

export default reducer;