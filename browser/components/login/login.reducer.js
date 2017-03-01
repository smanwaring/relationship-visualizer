import axios from 'axios';

/* ------- ACTION TYPES/CONTSTANTS --------*/
const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER';
const CLEAR_LOGGED_IN_USER = 'CLEAR_LOGGED_IN_USER';

/* ------- ACTION CREATORS --------*/
export const setLoggedInUser = (foundUser) => ({
  type: SET_LOGGEDIN_USER,
  foundUser
});

export const clearLoggedInUser = () => ({
  type: CLEAR_LOGGED_IN_USER
});

/* ------- DISPATCHERS --------*/
export const findOrCreateUser = userDetails => dispatch => {
  return axios.post('/api/user', userDetails)
  .then(res => res.data)
  .then(foundUser => {
    dispatch(setLoggedInUser(foundUser));
  });
};

/* ------- LOGIN REDUCER --------*/
const reducer = (state = {}, { type, foundUser }) => {
  switch (type) {
    case SET_LOGGEDIN_USER:
      return foundUser;
    case CLEAR_LOGGED_IN_USER:
      return {};
    default:
      return state;
  }
};

export default reducer;
