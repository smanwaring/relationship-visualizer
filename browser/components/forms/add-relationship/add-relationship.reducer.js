import axios from 'axios';

/* ------- CONSTANTS --------*/
const RELATIONSHIP_ADD_ERROR = 'RELATIONSHIP_ADD_ERROR';

/* ------- ACTION CREATORS --------*/
export const toggleRelExistsError = (bool) => ({
  type: RELATIONSHIP_ADD_ERROR,
  bool
});

/* ------- DISPATCHERS --------*/
export const postRelationship = ( relationshipInfo ) => dispatch => {
  return axios.post(`/api/relationship/`, relationshipInfo)
  .then(res => {
    if (res.status === 204) {
      dispatch( toggleRelExistsError(true) );
    }
  })
  .catch(err => console.error(err));
};

/* ------- REDUCER --------*/
const reducer = ( state = false, action ) => {
  switch (action.type) {
    case RELATIONSHIP_ADD_ERROR:
      return action.bool;
    default:
      return state;
  }
};

export default reducer;

