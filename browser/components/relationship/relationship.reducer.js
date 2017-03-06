import axios from 'axios';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const SET_SELECTED_RELATIONSHIP = 'SET_SELECTED_RELATIONSHIP';
const CHANGE_COLOR = 'CHANGE_COLOR';

/* ------- ACTION CREATORS --------*/
export const setSelectedRelationship = (relationship) => ({
  type: SET_SELECTED_RELATIONSHIP,
  relationship
});

export const changeColor = (color) => ({
  type: CHANGE_COLOR,
  color
});

/* ------- DISPATCHERS --------*/
export const fetchSelectedRelationship = ( {relationshipId, userId} ) => dispatch => {
  return axios.get(`/api/relationship/user/${userId}/rel/${relationshipId}`)
  .then(relationship => {
    dispatch(setSelectedRelationship(relationship.data));
  });
};

export const saveColor = (relationshipId, colorHex) => dispatch => {
  return axios.put(`/api/relationship/${relationshipId}`, { color: colorHex })
  .then(relationship => {
    dispatch(setSelectedRelationship(relationship.data));
  });
};

/* ------- INITIAL STATE --------*/
const initialState = {};

/* ------- RELATIONSHIP REDUCER --------*/
const reducer = (state = initialState, { type, relationship, color }) => {
  switch (type) {
    case SET_SELECTED_RELATIONSHIP:
      return relationship;
    case CHANGE_COLOR:
      return Object.assign({}, state, { color });
    default:
      return state;
  }
};

export default reducer;
