import {
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_FAIL,
  ANONYMOUS_LOGIN_FAIL,
  ANONYMOUS_LOGIN_REQUEST,
  ANONYMOUS_LOGIN_SUCCESS,
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../constants/userContants';

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
} from 'firebase/auth';

import { auth, db, provider } from '../../config/firebase';
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  onValue,
  update,
} from 'firebase/database';
import axios from 'axios';

export const googleAuthAction = () => async (dispatch) => {
  dispatch({ type: GOOGLE_LOGIN_REQUEST });

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      // localStorage.setItem('userInfo', JSON.stringify(user.uid));
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            dispatch({
              type: GOOGLE_LOGIN_SUCCESS,
              payload: snapshot.val(),
            });
            console.log({ ...snapshot.val(), status: 'Present' });
          } else {
            dispatch({
              type: GOOGLE_LOGIN_SUCCESS,
              payload: user,
            });
            set(ref(db, 'users/' + user.uid), {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GOOGLE_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const signInAnonymouslyAction = () => async (dispatch) => {
  dispatch({ type: ANONYMOUS_LOGIN_REQUEST });

  signInAnonymously(auth)
    .then(async () => {
      const {
        data: { results },
      } = await axios.get('https://randomuser.me/api/');
      dispatch({
        type: ANONYMOUS_LOGIN_SUCCESS,
        payload: results,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch({
        type: ANONYMOUS_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const allUserAction = () => async (dispatch) => {
  dispatch({ type: ALL_USER_REQUEST });

  try {
    const userRef = ref(db, 'users/');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      dispatch({
        type: ALL_USER_SUCCESS,
        payload: data,
      });
    });
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userDetailsAction = (uid) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST });

  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: data,
        });
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const userUpdateAction =
  (uid, likes, dislikes) => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST });

    // const {
    //   googleAuth: { user },
    // } = getState();

    // console.log(user.uid);

    // const adminRef = ref(db, `users/${user.uid}`);

    // console.log(userInfo);

    const userRef = ref(db, `users/${uid}`);
    update(userRef, { likes: likes, dislikes: dislikes })
      .then(() => {
        dispatch({
          type: USER_UPDATE_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };

export const adminUpdateAction =
  (status, cardsLiked, cardsDisliked, cardsFavourite) =>
  async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      googleAuth: { user },
    } = getState();

    // console.log(user.uid);

    const adminRef = ref(db, `users/${user.uid}`);

    update(adminRef, { status, cardsLiked, cardsDisliked, cardsFavourite })
      .then(() => {
        dispatch({
          type: USER_UPDATE_SUCCESS,
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
