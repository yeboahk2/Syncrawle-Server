  // Your web app's Firebase configuration
  var firebase = require('firebase/app')
  require('firebase/firestore')

  var firebaseConfig = {
    apiKey: "AIzaSyAehe_HpVe19yx57VFOAEqtTwMUe5fl5jM",
    authDomain: "syncrawler-storage.firebaseapp.com",
    databaseURL: "https://syncrawler-storage.firebaseio.com",
    projectId: "syncrawler-storage",
    storageBucket: "syncrawler-storage.appspot.com",
    messagingSenderId: "886841567989",
    appId: "1:886841567989:web:edf6c6527aaf9d9ca073bc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();