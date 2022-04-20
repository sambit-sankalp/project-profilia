import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   databaseURL: 'https://project-profilia-default-rtdb.firebaseio.com/',
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_MESSAGING_APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyCwzIW4NXwkr4X9nSQ8DHBGW_0B4uZ9o04',
  authDomain: 'project-profilia.firebaseapp.com',
  databaseURL: 'https://project-profilia-default-rtdb.firebaseio.com',
  projectId: 'project-profilia',
  storageBucket: 'project-profilia.appspot.com',
  messagingSenderId: '44975733601',
  appId: '1:44975733601:web:b7e2dc294aae7c4e52e320',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth, provider };
