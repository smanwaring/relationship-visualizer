import axios from 'axios';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const SET_RELATIONSHIPS = 'SET_RELATIONSHIPS';
const SET_RELATIONSHIP = 'SET_RELATIONSHIP';
const ADD_TO_SCORE = 'ADD_TO_SCORE';
const ADD_RELATIONSHIP = 'ADD_RELATIONSHIP';
const SORT_RELATIONSHIP = 'SORT_RELATIONSHIP';
const CHANGE_COLOR = 'CHANGE_COLOR';

/* ------- ACTION CREATORS --------*/
export const setRelationships = (relationships) => ({
  type: SET_RELATIONSHIPS,
  relationships
});

export const concatRelationship = (createdRelationship) => ({
  type: ADD_RELATIONSHIP,
  createdRelationship
});

export const sortRelationshipState = (newRelationshipArr) => ({
  type: SORT_RELATIONSHIP,
  newRelationshipArr
});


/* ------- DISPATCHERS --------*/
export const fetchRelationshipsByUser = ({ id }) => dispatch => {
  return axios.get(`/api/relationship/user/${id}`)
  .then(relationships => {
    dispatch(setRelationships(relationships.data));
  });
};

export const editRelationship = (relationshipId, colorHex, name) => (dispatch, getState) => {
  return axios.put(`/api/relationship/${relationshipId}`, { color: colorHex, name })
  .then(() => {
    let userId = getState().loggedInUser.id;
    return axios.get(`/api/relationship/user/${userId}`)
  })
  .then((relationships) => {
    dispatch(setRelationships(relationships.data));
  })
  .catch(err => console.error(err))
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
    case SORT_RELATIONSHIP:
      return action.newRelationshipArr;
    default:
      return state;
  }
};

export default reducer;
