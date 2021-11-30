let wa_datas = [];
let colors;
let typefaceRegular, typefaceBold;

function preload() {
    const firebaseConfig = {
        apiKey: "AIzaSyD7zgbJv1l_qpEEvyONHx6ha-zE6sGb0fs",
        authDomain: "ienlab-projectwa.firebaseapp.com",
        projectId: "ienlab-projectwa",
        storageBucket: "ienlab-projectwa.appspot.com",
        messagingSenderId: "395486030657",
        databaseURL: "https://ienlab-projectwa-default-rtdb.firebaseio.com/",
        appId: "1:395486030657:web:e1f00d5443f7b567ae8fc0",
        measurementId: "G-FRBXSKR8S0"
    };

    firebase.initializeApp(firebaseConfig);
    // const analytics = analytics.getAnalytics(app);

    const db = firebase.database();
    const ref = db.ref("datas");
    ref.on('value', gotData, errData);

    typefaceRegular = loadFont("fonts/Pretendard-Regular.otf");
    typefaceBold = loadFont("fonts/Pretendard-Black.otf");
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    background(255);

    colors  = [
        color('#FF4081'),
        color('#7C4DFF'),
        color('#03A9F4'),
        color('#3F51B5')
    ];

}

function draw() {
    background(255);
    for (let i = 0; i < wa_datas.length; i++) {
        noStroke();

        for (let j = 0; j <= wa_datas[i].age; j++) {
            let c = colors[(j + i) % colors.length];
            c.setAlpha(50);
            fill(c);
            // circle(wa_datas[i].x - j * wa_datas[i].vy * 10 * (j % 2 - 0.5) / 0.5, wa_datas[i].y + j * wa_datas[i].vx * 10 * (j % 2 - 0.5) / 0.5, 200);
            push();
            translate(wa_datas[i].x - j * wa_datas[i].vy * 10 * (j % 2 - 0.5) / 0.5, wa_datas[i].y + j * wa_datas[i].vx * 10 * (j % 2 - 0.5) / 0.5);
            drawLiq(18,50,20,100);
            pop();
        }

        textFont(typefaceBold);
        fill(0);
        textAlign(CENTER);
        textSize(20);
        text(wa_datas[i].data, wa_datas[i].x, wa_datas[i].y);

        textSize(14);
        let gen_time_gap = new Date(new Date().getTime() - wa_datas[i].gen_time);
        text("Day " + moment(gen_time_gap).format("D"), wa_datas[i].x, wa_datas[i].y - 20);

        wa_datas[i].x += wa_datas[i].vx;
        wa_datas[i].y += wa_datas[i].vy;

        if (wa_datas[i].x < 0 || wa_datas[i].x > width) wa_datas[i].vx *= -1;
        if (wa_datas[i].y < 0 || wa_datas[i].y > height) wa_datas[i].vy *= -1;
    }

    let search_input = document.getElementById("searchInput");
    let search_button = document.getElementById("searchButton");
    let dialog_input = document.getElementById("dialog_edit");
    let dialog_content_edit = document.getElementById("dialog_content_edit");
    let dialog_input_btn_confirm = document.getElementById("btn_confirm_edit");

    search_button.onclick = function() {
        let data = wa_datas.find(element => element.key === search_input.value);
        if (data !== undefined) {
            let gen_time_gap = new Date(new Date().getTime() - data.gen_time);
            dialog_content_edit.innerHTML = moment(data.gen_time).format("YYYY년 MM월 DD일 A h시 m분 s초") + "<br>" + moment(gen_time_gap).format("D") + "일차";
        } else {
            dialog_content_edit.innerHTML = "검색된 데이터가 없습니다";
        }

        dialog_input.className = "page-wrapper show";

    }


    dialog_input_btn_confirm.onclick = function() {
        dialog_input.className = "page-wrapper";
    };
}

function gotData(data) {
    wa_datas = [];
    const scores = data.val();
    const keys = Object.keys(scores);

    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const wa_age = scores[k].age;
        const wa_data = scores[k].data;
        const wa_time = scores[k].gen_time;

        wa_datas.push({key: k, data: wa_data, gen_time: wa_time, age: wa_age, x: random(0, width), y: random(0, height), vx: random(-2, 2), vy: random(-2, 2)});
        // print(scores);
    }
}

function drawLiq(vNnum,nm,sm,fcm){
    push();
    rotate(frameCount / fcm);
    let dr = TWO_PI / vNnum;
    beginShape();
    for(let i = 0; i < vNnum + 3; i++){
        let ind = i % vNnum;
        let rad = dr * ind;
        let r = (height * 0.3 + noise(frameCount / nm + ind) * height * 0.1 + sin(frameCount / sm + ind) * height * 0.05) * 0.5;
        curveVertex(cos(rad) * r, sin(rad) * r);
    }
    endShape();
    pop();
}

function errData(err) {
    console.log('Error!');
    console.log(err);
}