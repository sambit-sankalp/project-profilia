import {
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_FAIL,
  ANONYMOUS_LOGIN_REQUEST,
  ANONYMOUS_LOGIN_SUCCESS,
  ANONYMOUS_LOGIN_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
} from '../constants/userContants';

export const googleSigninReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case GOOGLE_LOGIN_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case GOOGLE_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case GOOGLE_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const anonymousAuthReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case ANONYMOUS_LOGIN_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case ANONYMOUS_LOGIN_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case ANONYMOUS_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const allUsersReducer = (state = { allusers: {} }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        loading: true,
        allusers: {},
      };
    case ALL_USER_SUCCESS:
      return {
        loading: false,
        allusers: action.payload,
      };
    case ALL_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
        user: {},
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      };
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const adminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADMIN_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
