const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        roomSelected: null,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        roomSelected: null,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        roomSelected: null,
        error: action.payload,
      };
    case "ROOM_SELECTED":
      return {
        user: state.user,
        isFetching: false,
        roomSelected: action.payload,
        error: false,
      };
    // case "LOGOUT":
    // return {
    //     user: null,
    //     isFetching: false,
    //     error: false,
    // };
    default:
      return state;
  }
};

export default AuthReducer;
