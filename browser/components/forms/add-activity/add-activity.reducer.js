import axios from 'axios';
import moment from 'moment';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const SET_ACTIVITIES = "SET_ACTIVITIES";

/* ------- ACTION CREATORS --------*/
export const setActivities = (activities) => ({
  type: SET_ACTIVITIES,
  activities
})

/* ------- DISPATCHERS --------*/
export const fetchActivitiesByRelationship = ({relationshipId}) => dispatch => {
  axios.get(`/api/activity/relationship/${relationshipId}`)
  .then(activities => {
    dispatch(setActivities(activities.data));
  })
}

export const postNewActivity = ({ type, date, relationshipId }) => dispatch => {
  axios.post(`/api/activity`, {
    date: date,
    relationshipId,
    type
  })
  .then(activity => {
    console.log(activity);
  });
};

/* ------- INITIAL STATE --------*/
const initialState = [];

/* ------- REDUCER --------*/
const reducer = (state=initialState, { type, activities }) => {
  switch(type) {
    case SET_ACTIVITIES:
      return activities;
    default:
      return state;
  }
}

export default reducer;