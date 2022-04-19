import {
  anonymousAuthReducer,
  googleSigninReducer,
  allUsersReducer,
  userUpdateReducer,
  userDetailsReducer,
  adminUpdateReducer,
  currentUserReducer,
} from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  googleAuth: googleSigninReducer,
  anonymousAuth: anonymousAuthReducer,
  allUserReducer: allUsersReducer,
  updateUser: userUpdateReducer,
  userDetails: userDetailsReducer,
  updateAdmin: adminUpdateReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;
