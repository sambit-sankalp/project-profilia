import {
  anonymousAuthReducer,
  googleSigninReducer,
  allUsersReducer,
  userUpdateReducer,
  userDetailsReducer,
  adminUpdateReducer,
} from './userReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  googleAuth: googleSigninReducer,
  anonymousAuth: anonymousAuthReducer,
  allUserReducer: allUsersReducer,
  updateUser: userUpdateReducer,
  userDetails: userDetailsReducer,
  updateAdmin: adminUpdateReducer,
});

export default rootReducer;
