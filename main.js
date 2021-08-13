img = "";
status = "";
objects = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    object = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";

}

function draw() {
    image(video, 0, 0, 500, 500);
    if (status != "") {
        object.detect(video, gotresult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Detected Objects";
            document.getElementById("number").innerHTML = "Number of objects Detected =" + objects.length;

            fill(r, g, b);
            lokesh = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + lokesh + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}

function modelloaded() {
    console.log("model loaded");
    status = true;
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }

}