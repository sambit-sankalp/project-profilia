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
  CURRENT_USER_REQUEST,
  CURRENT_USER_SUCCESS,
} from '../constants/userContants';

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
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
import { async } from '@firebase/util';

export const googleAuthAction = () => async (dispatch) => {
  dispatch({ type: GOOGLE_LOGIN_REQUEST });

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      localStorage.setItem('id', user.uid);
      localStorage.setItem('name', user.displayName);
      localStorage.setItem('isAnonymous', false);
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            localStorage.setItem('status', snapshot.val().status);
            if (snapshot.val().cardsLiked) {
              localStorage.setItem(
                'likes',
                JSON.stringify(snapshot.val().cardsLiked)
              );
            }
            if (snapshot.val().cardsDisliked) {
              localStorage.setItem(
                'dislikes',
                JSON.stringify(snapshot.val().cardsDisliked)
              );
            }
            if (snapshot.val().favCards) {
              localStorage.setItem(
                'fav',
                JSON.stringify(snapshot.val().favCards)
              );
            }
            window.location.reload(false);
            dispatch({
              type: GOOGLE_LOGIN_SUCCESS,
              payload: snapshot.val(),
            });
          } else {
            localStorage.setItem('status', 'Hi there I am using this app');
            dispatch({
              type: GOOGLE_LOGIN_SUCCESS,
              payload: user,
            });
            set(ref(db, 'users/' + user.uid), {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              status: 'Hi there I am using this app',
              likes: 0,
              dislikes: 0,
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
      localStorage.setItem('id', results[0].login.uuid);
      localStorage.setItem('anonymousId', results[0].login.uuid);
      localStorage.setItem(
        'name',
        `${results[0].name.first} ${results[0].name.last}`
      );
      localStorage.setItem('isAnonymous', true);
      localStorage.setItem('status', 'Hi there I am using this app');
      dispatch({
        type: ANONYMOUS_LOGIN_SUCCESS,
        payload: results[0].name,
      });
      set(ref(db, 'users/' + results[0].login.uuid), {
        uid: results[0].login.uuid,
        name: `${results[0].name.first} ${results[0].name.last}`,
        email: results[0].picture.large,
        status: 'Hi there I am using this app',
        likes: 0,
        dislikes: 0,
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

export const userDetailsAction = () => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST });

  const id = localStorage.getItem('anonymousId');

  signInAnonymously(auth)
    .then(() => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            localStorage.setItem('id', snapshot.val().uid);
            localStorage.setItem('name', snapshot.val().name);
            localStorage.setItem('isAnonymous', true);
            localStorage.setItem('status', snapshot.val().status);
            if (snapshot.val().cardsLiked) {
              localStorage.setItem(
                'likes',
                JSON.stringify(snapshot.val().cardsLiked)
              );
            }
            if (snapshot.val().cardsDisliked) {
              localStorage.setItem(
                'dislikes',
                JSON.stringify(snapshot.val().cardsDisliked)
              );
            }
            if (snapshot.val().favCards) {
              localStorage.setItem(
                'fav',
                JSON.stringify(snapshot.val().favCards)
              );
            }
            window.location.reload(false);
            dispatch({
              type: USER_DETAILS_SUCCESS,
              payload: snapshot.val(),
            });
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
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

export const userUpdateAction = (uid, likes, dislikes) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });

  const adminID = localStorage.getItem('id');
  const cardsLiked = JSON.parse(localStorage.getItem('likes'));
  const cardsDisliked = JSON.parse(localStorage.getItem('dislikes'));
  const favCards = JSON.parse(localStorage.getItem('fav'));

  // console.log(adminID, cardsLiked, cardsDisliked);

  if (cardsDisliked || cardsLiked || favCards) {
    const adminRef = ref(db, `users/${adminID}`);

    update(adminRef, {
      cardsLiked: cardsLiked,
      cardsDisliked: cardsDisliked,
      favCards: favCards,
    })
      .then(() => {
        console.log('done');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const userRef = ref(db, `users/${uid}`);
  update(userRef, {
    likes: likes,
    dislikes: dislikes,
  })
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

export const adminUpdateAction = (status, id) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_REQUEST });

  const adminRef = ref(db, `users/${id}`);

  update(adminRef, { status: status })
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

export const currentUserAction = () => async (dispatch) => {
  dispatch({ type: CURRENT_USER_REQUEST });

  onAuthStateChanged(auth, (user) => {
    dispatch({
      type: CURRENT_USER_SUCCESS,
      payload: user,
    });
  });
};
