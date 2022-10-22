var status = "";
var objects = [];

function preload() {
    img = loadImage("Animal.webp");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    object_detection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw() {
    image(img, 0, 0, 600, 500);
    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill('#FF0000');
            stroke('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("number").innerHTML = "There are 4 big objects from which CoCoSSD model detected 2 objects."
        }
    }
}

function modelLoaded() {
    console.log("CoCoSSD Model Is Loaded.")
    status = true;
    object_detection.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function back() {
    window.location = "index.html";
}