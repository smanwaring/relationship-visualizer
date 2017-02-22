import axios from 'axios';

// constants
const SET_SELECTED_RELATIONSHIP = "SET_SELECTED_RELATIONSHIP";
const CHANGE_COLOR = "CHANGE_COLOR";

// sync action creators
export const setSelectedRelationship = (relationship) => ({
  type: SET_SELECTED_RELATIONSHIP,
  relationship
})

export const changeColor = (color) => ({
  type: CHANGE_COLOR,
  color
})

// async action creators
export const fetchSelectedRelationship = ({relationshipId}) => dispatch => {
  return axios.get(`/api/relationship/${relationshipId}`)
  .then(relationship => {
    dispatch(setSelectedRelationship(relationship.data));
  })
}

export const saveColor = (relationshipId, colorHex) => dispatch => {
  return axios.put(`/api/relationship/${relationshipId}`, { color: colorHex })
  .then(relationship => {
    dispatch(setSelectedRelationship(relationship.data));
  })
}

// initial state
const initialState = {};

// reducer
const reducer = (state=initialState, { type, relationship, color }) => {
  switch(type) {
    case SET_SELECTED_RELATIONSHIP:
      return relationship;
    case CHANGE_COLOR:
      return Object.assign({}, state, { color })
    default:
      return state;
  }
}

export default reducer;