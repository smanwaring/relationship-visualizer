import axios from 'axios';

// constants
const SET_ACTIVITIES = "SET_ACTIVITIES";

// sync action creators
export const setActivities = (activities) => ({
  type: SET_ACTIVITIES,
  activities
})

// async action creators
export const fetchActivitiesByRelationship = ({relationshipId}) => dispatch => {
  console.log(relationshipId)
  axios.get(`/api/activity/relationship/${relationshipId}`)
  .then(activities => {
    console.log(activities.data)
    dispatch(setActivities(activities.data));
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