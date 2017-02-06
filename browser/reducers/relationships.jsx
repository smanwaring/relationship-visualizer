import axios from 'axios';

// constants
const SET_RELATIONSHIPS = "SET_RELATIONSHIPS";

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

// initial state
const initialState = [];

// reducer
const reducer = (state=initialState, { type, relationships }) => {
  switch(type) {
    case SET_RELATIONSHIPS:
      return relationships;
    default:
      return state;
  }
}

export default reducer;