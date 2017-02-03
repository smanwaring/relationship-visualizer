import axios from 'axios';
import moment from 'moment';

// constants
const SET_ACTIVITIES = "SET_ACTIVITIES";

// sync action creators
export const setActivities = (activities) => ({
  type: SET_ACTIVITIES,
  activities
})

// async action creators
export const fetchActivitiesByRelationship = ({relationshipId}) => dispatch => {
  axios.get(`/api/activity/relationship/${relationshipId}`)
  .then(activities => {
    dispatch(setActivities(activities.data));
  })
}

export const postNewActivity = ({ type, time, date, score, relationshipId }) => dispatch => {
  // have to use moment.js to combine time and date, because material-ui separates the forms
  console.log(relationshipId);
  let momentTime = moment(time);
  let momentDate = moment(date);
  let databaseDate = moment({
    year: momentDate.year(),
    month: momentDate.month(),
    day: momentDate.date(),
    hour: momentTime.hours(),
    minute: momentTime.minutes()
  })
  console.log(databaseDate);
  axios.post(`/api/activity`, {
    date: databaseDate,
    relationshipId,
    type,
    score
  })
  .then(activity => {
    console.log(activity);
  })
}

// initial state
const initialState = [];

// reducer
const reducer = (state=initialState, { type, activities }) => {
  switch(type) {
    case SET_ACTIVITIES:
      return activities;
    default:
      return state;
  }
}

export default reducer;