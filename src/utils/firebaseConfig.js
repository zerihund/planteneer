import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyD_m9dZelzhVC3wWeIyoAPnQ2b1B2V0JsM",
    authDomain: "planteneer.firebaseapp.com",
    databaseURL: "https://planteneer.firebaseio.com",
    projectId: "planteneer",
    storageBucket: "planteneer.appspot.com",
    messagingSenderId: "773454049234",
    appId: "1:773454049234:web:518c338b6d765a558e620b",
    measurementId: "G-1419MCWGK8"
    // apiKey: "AIzaSyDrQlxmfH8JZ2UdVDVym2SlC19MdLyIokg",
    // authDomain: "plant-test-b3422.firebaseapp.com",
    // databaseURL: "https://plant-test-b3422.firebaseio.com",
    // projectId: "plant-test-b3422",
    // storageBucket: "plant-test-b3422.appspot.com",
    // messagingSenderId: "1082745092725",
    // appId: "1:1082745092725:web:8f5fb55499f8c36ac2163c"
};
firebase.initializeApp(config);

export default firebase; 