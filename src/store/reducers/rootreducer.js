import {
  anonymousAuthReducer,
  googleSigninReducer,
  allUsersReducer,
  userUpdateReducer,
  anonymousDetailsReducer,
  adminUpdateReducer,
  currentUserReducer,
} from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  googleAuth: googleSigninReducer,
  anonymousAuth: anonymousAuthReducer,
  allUserReducer: allUsersReducer,
  updateUser: userUpdateReducer,
  userDetails: anonymousDetailsReducer,
  updateAdmin: adminUpdateReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;
