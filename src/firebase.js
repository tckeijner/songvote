import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCy5j6jKUbFsSsjQMHvvggvIWVawZFB9xI",
    authDomain: "songvote-5622e.firebaseapp.com",
    databaseURL: "https://songvote-5622e.firebaseio.com",
    projectId: "songvote-5622e",
    storageBucket: "songvote-5622e.appspot.com",
    messagingSenderId: "443576159939",
    appId: "1:443576159939:web:7482dd7c7a4a83f6"
};
firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const playlistsRef = databaseRef.child("playlists");