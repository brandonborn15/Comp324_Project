var app_firebase = {};
var app_firestore = {};
var app_storage = {};
(function () {
    var config = {
        apiKey: "AIzaSyB63jO73rBCPEs-WwB7ZT3NZ1kMSnbzuJY",
        authDomain: "comp324-6a1a9.firebaseapp.com",
        databaseURL: "https://comp324-6a1a9.firebaseio.com",
        projectId: "comp324-6a1a9",
        storageBucket: "comp324-6a1a9.appspot.com",
        messagingSenderId: "917098222674",
        appId: "1:917098222674:web:101bb929bc988f9f95bb8b",
        measurementId: "G-0HK3B2NCX9"
    };
    firebase.initializeApp(config);
    app_firebase = firebase;
    app_firestore = firebase.firestore;
    app_storage = firebase.storage();
})()