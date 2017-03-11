import axios from 'axios';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const SET_RELATIONSHIP = 'SET_RELATIONSHIP';

/* ------- ACTION CREATORS --------*/
export const setRelationship = (relationship) => ({
  type: SET_RELATIONSHIP,
  relationship
});

/* ------- DISPATCHERS --------*/
export const fetchRelationshipById = ({ relationshipId, userId }) => dispatch => {
  return axios.get(`/api/relationship//user/${userId}/rel/${relationshipId}`)
  .then(relationship => {
    dispatch(setRelationship(relationship.data));
  });
};


/* ------- INITIAL STATE --------*/
const initialState = {};

/* ------- RELATIONSHIPS REDUCER --------*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RELATIONSHIP:
      return action.relationship;
    default:
      return state;
  }
};

export default reducer;