/* ------- ACTION TYPES/CONTSTANTS --------*/
const TOGGLE_MODAL = 'SHOW_ADD_RELATIONSHIPS_MODAL';


/* ------- ACTION CREATORS --------*/
export const toggleStateModal = (str, bool) => ({
  type: TOGGLE_MODAL,
  str,
  bool
});

/* ------- INITIAL STATE --------*/
const initialState = {
  showAddRelationshipModal: false,
  showSettingsModal: false
};

/* ------- RELATIONSHIPS REDUCER --------*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return Object.assign({}, state, { [action.str]: action.bool });
    default:
      return state;
  }
};

export default reducer;
