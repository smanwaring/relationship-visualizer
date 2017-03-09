import axios from 'axios';
import { setRelationships } from '../../relationships/relationships.reducer';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const SET_ACTIVITIES = 'SET_ACTIVITIES';
const TOGGLE_ADD_ACTIVITY = 'TOGGLE_ADD_ACTIVITY';

/* ------- ACTION CREATORS --------*/
export const setActivities = (activities) => ({
  type: SET_ACTIVITIES,
  activities
});

export const toggleAddActivity = (bool) => ({
  type: TOGGLE_ADD_ACTIVITY,
  bool
});

/* ------- DISPATCHERS --------*/
export const postNewActivity = ({ type, date, relationshipId }) => (dispatch, getState) => {
  console.log(relationshipId);
  return axios.post(`/api/activity`, {
    date: date,
    relationshipId,
    type
  })
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
const initialState = {
  open: false
};

/* ------- REDUCER --------*/
const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case TOGGLE_ADD_ACTIVITY:
      return Object.assign({}, state, { open: action.bool });
    default:
      return state;
  }
};

export default reducer;
