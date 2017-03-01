import axios from 'axios';
import { animateBubbles, expandBubble } from '../../d3/bubbleD3';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const SET_RELATIONSHIPS = 'SET_RELATIONSHIPS';
const SET_RELATIONSHIP = 'SET_RELATIONSHIP';
const ADD_TO_SCORE = 'ADD_TO_SCORE';
const ADD_RELATIONSHIP = 'ADD_RELATIONSHIP';

/* ------- ACTION CREATORS --------*/
export const setRelationships = (relationships) => ({
  type: SET_RELATIONSHIPS,
  relationships
});

export const concatRelationship = (createdRelationship) => ({
  type: ADD_RELATIONSHIP,
  createdRelationship
});


/* ------- DISPATCHERS --------*/
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

/* ------- INITIAL STATE --------*/
const initialState = [];

/* ------- RELATIONSHIPS REDUCER --------*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RELATIONSHIPS:
      return action.relationships;
    case ADD_RELATIONSHIP:
      return [...state, action.createdRelationship];
    default:
      return state;
  }
};

export default reducer;
