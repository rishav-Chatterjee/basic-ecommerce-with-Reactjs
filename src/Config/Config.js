import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDGXFr5T40kO3waaWPJxij2NSRPcNQ1tBs",
    authDomain: "ecommerce-project-demo.firebaseapp.com",
    projectId: "ecommerce-project-demo",
    storageBucket: "ecommerce-project-demo.appspot.com",
    messagingSenderId: "485050385732",
    appId: "1:485050385732:web:e1e4d98a69bd3a13ebc311"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const fs = firebase.firestore();
  const storage = firebase.storage();
  
  export {auth,fs,storage}