window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;

    document.getElementById("page_scroll").style.width = scrolled + "%";
}

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import * as firebase from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import * as analytics from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import * as firestore from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import * as database from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

$(function () {

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

    const app = firebase.initializeApp(firebaseConfig);
    // const analytics = analytics.getAnalytics(app);

    const db = database.getDatabase();
    const ref = database.ref(db, "datas");
    // database.onValue(ref, (snapshot => {
    //     const data = snapshot.val();
    //     console.log(data);
    // }));

    // const ref = db.collection('datas');


    // async function getData(db) {
    //
    //     // const col = firestore.collection(db, 'datas');
    //     // const docs = await firestore.getDocs(col);
    //     // const datas = docs.docs.map(doc => doc.data());
    //     // console.log(datas);
    //     // return datas;
    // }
    //
    function writeUserData(gen_time, data, key) {
        database.set(database.ref(db, "datas/" + key), {
            age: 0,
            gen_time: gen_time,
            data: data
        });
    }

    // getData(db).then(r => r);

    let docu = document.documentElement;

    let prevScroll = window.scrollY || document.scrollTop;
    let curScroll;

    let DIRECTION_INITIAL = 0;
    let DIRECTION_UP = 1;
    let DIRECTION_DOWN = 2;

    let direction = DIRECTION_INITIAL;
    let prevDirection = DIRECTION_INITIAL;

    let header = document.getElementById("header");
    let app_header = document.getElementById("app_header");
    let search_input = document.getElementById("searchInput");
    let search_button = document.getElementById("searchButton");
    let button_add = document.getElementById("btn_add");

    let dialog_input = document.getElementById("dialog_input");
    let dialog_input_input = document.getElementById("input_sentence");
    let dialog_input_btn_cancel = document.getElementById("btn_cancel");
    let dialog_input_btn_confirm = document.getElementById("btn_confirm");

    let checkScroll = function() {
        curScroll = window.scrollY || dcm.scrollTop;
        if (curScroll > prevScroll) {
            // scrolled up
            direction = DIRECTION_DOWN;
        } else if (curScroll < prevScroll) {
            // scrolled down
            direction = DIRECTION_UP;
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
    };
    let toggleHeader = function(direction, curScroll) {
        if (direction === DIRECTION_DOWN && curScroll > 80) {
            // 80은 헤더 높이
            header.classList.add('hide');
            app_header.classList.add('hide');
            prevDirection = direction;
        } else if (direction === DIRECTION_UP) {
            header.classList.remove('hide');
            app_header.classList.remove('hide');
            prevDirection = direction;
        }
    };

    button_add.onclick = function() {
        dialog_input.className = "page-wrapper show"
    };

    dialog_input_btn_cancel.onclick = function() {
        dialog_input.className = "page-wrapper"
    };

    dialog_input_btn_confirm.onclick = function() {
        // dialog_input.style.visibility = "hidden";
        let key = btoa(new Date().getTime() + encodeURIComponent(dialog_input_input.value))
        writeUserData(new Date().getTime(), dialog_input_input.value, key);
        dialog_input.className = "page-wrapper";

        copyToClipboard(key);
        alert("고유 키가 복사되었습니다.");

    };



    window.addEventListener('scroll', checkScroll);

});

function copyToClipboard(val) {
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
}
function copy() {
    copyToClipboard('Hello World');
    console.log('Copied!');
}

