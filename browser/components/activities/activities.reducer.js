import axios from 'axios';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const SET_ACTIVITIES = 'SET_ACTIVITIES';

/* ------- ACTION CREATORS --------*/
export const setActivities = (activities) => ({
  type: SET_ACTIVITIES,
  activities
});

/* ------- DISPATCHERS --------*/
export const fetchActivitiesByRelationshipId = ({ relationshipId }) => dispatch => {
  return axios.get(`/api/activity/relationship/${relationshipId}`)
  .then(activities => {
    dispatch(setActivities(activities.data));
  })
  .catch(err => console.error(err));
};


/* ------- INITIAL STATE --------*/
const initialState = [];

/* ------- RELATIONSHIPS REDUCER --------*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVITIES:
      return action.activities;
    default:
      return state;
  }
};

export default reducer;