import React from 'react';
import firebaseConfig from './firebase.config';
import { initializeApp } from "firebase/app";



const firebaseInitialization = () => {
    return initializeApp(firebaseConfig);
};

export default firebaseInitialization;