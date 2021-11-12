import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import { getFirestore, collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD7zgbJv1l_qpEEvyONHx6ha-zE6sGb0fs",
    authDomain: "ienlab-projectwa.firebaseapp.com",
    projectId: "ienlab-projectwa",
    storageBucket: "ienlab-projectwa.appspot.com",
    messagingSenderId: "395486030657",
    appId: "1:395486030657:web:e1f00d5443f7b567ae8fc0",
    measurementId: "G-FRBXSKR8S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);