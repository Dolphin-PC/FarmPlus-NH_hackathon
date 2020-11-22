import firebase from "firebase/app";

import "firebase/storage";

const firebaseConfig = {
   apiKey: "AIzaSyBNVQ8U5WOX6kd8XnMChWtwhcT-unciiV4",
   authDomain: "nh-farmplus.firebaseapp.com",
   databaseURL: "https://nh-farmplus.firebaseio.com",
   projectId: "nh-farmplus",
   storageBucket: "nh-farmplus.appspot.com",
   messagingSenderId: "559522837633",
   appId: "1:559522837633:web:77785f507ef80084d14980",
   measurementId: "G-EKZ2V8R3NJ",
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

export const FirebaseApp = firebase;
export const FireStorage = firebase.storage();
