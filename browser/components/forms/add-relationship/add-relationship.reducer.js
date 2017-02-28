import axios from 'axios';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const ADD_RELATIONSHIP = 'ADD_RELATIONSHIP';
const SHOW_REL_EXISTS_ERROR = 'SHOW_REL_EXISTS_ERROR';

/* ------- ACTION CREATORS --------*/
export const addRelationship = (relationship) => ({
  type: ADD_RELATIONSHIP,
  relationship
});

export const toggleRelExistsError = (bool) => ({
  type: SHOW_REL_EXISTS_ERROR,
  bool
});

/* ------- DISPATCHERS --------*/
export const postRelationship = ( relationshipInfo ) => dispatch => {
  return axios.post(`/api/relationship/`, relationshipInfo)
  .then(res => res.status === 204 ? dispatch( toggleRelExistsError(true)) : dispatch( addRelationship(res.data)) )
  .catch(err => console.error(err));
};

/* ------- REDUCER --------*/
const reducer = (state=false, action) => {
  switch (action.type) {
    case SHOW_REL_EXISTS_ERROR:
      return action.bool;
    default:
      return state;
  }
};

export default reducer;

