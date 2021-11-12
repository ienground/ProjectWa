/**
 * Designed, Developed by
 * @ienground_
 * Geometry Tetris RPG
 *
 * Ericano Rhee on github.com/ienground
 */

let input;
let button;

function preload() {
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    colorMode(RGB);
    background(255);

    input = createInput();
    input.position(40, 40);

    button = createButton("OK");
    button.position(input.x + input.width + 20, 40);
    button.mousePressed(requestApi)

}

function draw() {
    background(255);

}

function requestApi() {

    const openApiURL = 'http://aiopen.etri.re.kr:8000/WiseQAnal';
    const access_key = 'YOUR_ACCESS_KEY';

    const requestJson = {
        'access_key': access_key,
        'argument': {
            'text': input.text
        }
    };

    // import request from 'request'
    const request = require('request');
    const options = {
        url: openApiURL,
        body: JSON.stringify(requestJson),
        headers: {'Content-Type': 'application/json; charset=UTF-8'}
    };
    request.post(options, function (error, response, body) {
        console.log('responseCode = ' + response.statusCode);
        console.log('responseBody = ' + body);
    });
}

