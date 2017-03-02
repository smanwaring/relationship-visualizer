import axios from 'axios';
import { concatRelationship } from '../../relationships/relationships.reducer';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const RELATIONSHIP_ADD_ERROR = 'RELATIONSHIP_ADD_ERROR';
const TOGGLE_RELATIONSHIP_ADDED = 'TOGGLE_RELATIONSHIP_ADDED';


/* ------- ACTION CREATORS --------*/
export const toggleRelExistsError = (bool) => ({
  type: RELATIONSHIP_ADD_ERROR,
  bool
});

export const changeRelationshipAdded = (bool) => ({
  type: TOGGLE_RELATIONSHIP_ADDED,
  bool
});

/* ------- DISPATCHERS --------*/
export const postRelationship = ( relationshipInfo ) => dispatch => {
  return axios.post(`/api/relationship/`, relationshipInfo)
  .then(res => {
    if (res.status === 204) {
      dispatch( toggleRelExistsError(true) );
      dispatch( changeRelationshipAdded(false) );
    } else {
      dispatch( concatRelationship(res.data) );
      dispatch( changeRelationshipAdded(true) );
    }
  })
  .catch(err => console.error(err));
};

/* ------- INITIAL STATE --------*/
const initialState = {
  addRelationshipError: false,
  relationshipAdded: false,
};

/* ------- REDUCER --------*/
const reducer = ( state = initialState, action ) => {
  switch (action.type) {
    case RELATIONSHIP_ADD_ERROR:
      return Object.assign({}, state, {addRelationshipError: action.bool });
    case TOGGLE_RELATIONSHIP_ADDED:
      return Object.assign({}, state, {relationshipAdded: action.bool });
    default:
      return state;
  }
};

export default reducer;

