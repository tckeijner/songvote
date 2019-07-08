import firebase from 'firebase';

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

const db = {
    writePlaylistData(playlistName, playlistId, partyPin, userId) {
        firebase.database().ref(`playlists/${partyPin}`).set({
            playlistName: playlistName,
            playlistId: playlistId,
            partyPin: partyPin,
            userId: userId
        });
    },

    matchPartyPin(pinEntry) {
        return firebase.database().ref(`playlists/${pinEntry}`).once('value')
        .then((snapshot) => {
            const playlistIdRef = snapshot.child('playlistId').val()
            return playlistIdRef;
        });
    }
};


export default db;