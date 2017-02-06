import axios from 'axios';

// constants
const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER';
const CLEAR_LOGGED_IN_USER = 'CLEAR_LOGGED_IN_USER';

// sync action creators
export const setLoggedInUser = (userInfo) => ({
  type: SET_LOGGEDIN_USER,
  userInfo
});

export const clearLoggedInUser = () => ({
  type: CLEAR_LOGGED_IN_USER
});


// login reducer
// async action creators
export const findOrCreateUser = (userDetails) => dispatch => {
  console.log("here are the user detials", userDetails);
  axios.post('/api/user/user', userDetails)
  .then(foundUser => {
    console.log('here is the user', foundUser);
  });
};


const reducer = (state = {}, { type, userInfo }) => {
  switch (type) {
    case SET_LOGGEDIN_USER:
      return userInfo;
    case CLEAR_LOGGED_IN_USER:
      return {};
    default:
      return state;
  }
};

export default reducer;


