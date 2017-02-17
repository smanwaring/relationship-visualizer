import axios from 'axios';

// constants
const SET_RELATIONSHIPS = "SET_RELATIONSHIPS";
const SET_RELATIONSHIP = "SET_RELATIONSHIP";
const ADD_TO_SCORE = "ADD_TO_SCORE";

// sync action creators
export const setRelationships = (relationships) => ({
  type: SET_RELATIONSHIPS,
  relationships
})

// async action creators
export const fetchRelationshipsByUser = ({ id }) => dispatch => {
  axios.get(`/api/relationship/user/${id}`)
  .then(relationships => {
    dispatch(setRelationships(relationships.data));
  })
}

export const incrementScore = (relationship, user) => dispatch => {
  console.log("HIT ACTION CREATOR");
  axios.put(`api/relationship/${relationship.id}`, { score: relationship.score + 5 })
  .then(relationship => {
    return axios.get(`/api/relationship/user/${user.id}`)
  })
  .then(relationships => {
    dispatch(setRelationships(relationships.data));
  })
}

// initial state
const initialState = [];

// reducer
const reducer = (state=initialState, action) => {

  switch(action.type) {
    case SET_RELATIONSHIPS:
      return action.relationships;
    default:
      return state;
  }
}

export default reducer;