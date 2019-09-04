import * as actions from './actions';

const initialState = {
  allLeagues: [],
  fetchedLeague: false,
  myLeagues: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_LEAGUES_SUCCESS:
      return {
        ...state,
        allLeagues: action.allLeagues,
        myLeagues: action.myLeagues,
        fetchedLeague: true
      };
    default:
      return state;
  }
};

export default authReducer;
