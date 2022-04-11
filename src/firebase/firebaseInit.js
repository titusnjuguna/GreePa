import  firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyBMDgUGxZxg-j1aFBqRbC0AJoyZvPmegck",

  authDomain: "greep-2a416.firebaseapp.com",

  projectId: "greep-2a416",

  storageBucket: "greep-2a416.appspot.com",

  messagingSenderId: "315360914763",

  appId: "1:315360914763:web:50e92952a0d06e17788cce"

};


// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export{timestamp};
export default firebaseApp.firestore();