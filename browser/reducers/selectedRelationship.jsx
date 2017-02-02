import axios from 'axios';

// constants
const SET_SELECTED_RELATIONSHIP = "SET_SELECTED_RELATIONSHIP";

// sync action creators
export const setSelectedRelationship = (relationship) => ({
  type: SET_SELECTED_RELATIONSHIP,
  relationship
})

// async action creators
export const fetchSelectedRelationship = ({relationshipId}) => dispatch => {
  axios.get(`/api/relationship/${relationshipId}`)
  .then(relationship => {
    dispatch(setSelectedRelationship(relationship.data));
  })
}

// initial state
const initialState = [];

// reducer
const reducer = (state=initialState, { type, relationship }) => {
  switch(type) {
    case SET_SELECTED_RELATIONSHIP:
      return relationship;
    default:
      return state;
  }
}

export default reducer;