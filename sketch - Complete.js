/**************************************************
 * University of Sunderland                       *
 **************************************************
 * School of Computer Science and Engineering     *
 **************************************************
 * Script: sketch - Complete.js                              *
 * Author: Neil Eliot edited by Mark Bennison     *
 * Date: v2 05/03/2026 | v1 16/01/2024            *
 **************************************************
 * Description:                                   *
 * Basic security style application               *
 * to extract faces from a video feed.            *                                   *
 **************************************************/
/**************************************************
 * AI Face Tracking - Part 1 Complete
 **************************************************/

let video;
let faceMesh;
let faces = [];
let cnv;

let dotsCheckbox;
let faceCheckbox;
let mugshotsCheckbox;
let videoCheckbox;
let backCheckbox;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 5, flipped: true });
}

function gotFaces(results) {
  faces = results;
}

function setup() {
  cnv = createCanvas(640, 480);
  centerCanvas();

  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  faceMesh.detectStart(video, gotFaces);

  // 1 - Menu (Start)
  dotsCheckbox = createCheckbox(" Mesh");
  dotsCheckbox.position(0, 40);

  faceCheckbox = createCheckbox(" Faces");
  faceCheckbox.position(0, 60);

  mugshotsCheckbox = createCheckbox(" Mugshots");
  mugshotsCheckbox.position(0, 80);

  videoCheckbox = createCheckbox(" Video", true);
  videoCheckbox.position(0, 100);

  backCheckbox = createCheckbox(" Background", true);
  backCheckbox.position(0, 120);
  // 1 - Menu (End)
}

function draw() {
  drawBackground();
  drawVideo();
  isolateFaces();
  drawMeshDots();
  drawMugshots();
}

// 2 - Video
function drawVideo() {
  if (videoCheckbox.checked()) {
    image(video, 0, 0);
  }
}

// 3 - Background
function drawBackground() {
  if (backCheckbox.checked()) {
    background(0);
  }
}

// 4 - Mesh dots
function drawMeshDots() {
  if (dotsCheckbox.checked() && faces.length > 0) {
    for (let f = 0; f < faces.length; f++) {
      const face = faces[f];
      noStroke();
      fill(0, 255, 0);
      for (let p = 0; p < face.keypoints.length; p++) {
        circle(face.keypoints[p].x, face.keypoints[p].y, 3);
      }
    }
  }
}

// 5 - Isolate faces
function isolateFaces() {
  if (faceCheckbox.checked() && faces.length > 0) {
    for (let f = 0; f < faces.length; f++) {
      const frame = video.get(0, 0, width, height);
      const face = faces[f];
      const box = face.box;

      const shape = createGraphics(width, height);
      shape.fill(0);
      shape.strokeWeight(5);
      shape.beginShape();

      for (let p = 0; p < face.faceOval.keypoints.length; p++) {
        const k = face.faceOval.keypoints[p];
        shape.point(k.x, k.y);
        shape.curveVertex(k.x, k.y);
      }

      shape.endShape(CLOSE);
      frame.mask(shape);

      const faceImage = frame.get(box.xMin, box.yMin, box.width, box.height);
      image(faceImage, box.xMin, box.yMin);
    }
  }
}

// 6 - Mugshots
function drawMugshots() {
  if (mugshotsCheckbox.checked()) {
    const bannerHeight = 145;

    strokeWeight(6);
    stroke(125);
    fill(255);
    rect(3, 3, width - 6, bannerHeight, 5);

    for (let f = 0; f < faces.length; f++) {
      const face = faces[f];
      const box = face.box;

      const faceImage = video.get(box.xMin, box.yMin, box.width, box.height);
      faceImage.resize(80, 100);

      image(faceImage, (f * 85) + 10, 10);
      noStroke();
      fill(0);
      textSize(18);
      text("face " + f, (f * 85) + 25, 130);
    }
  }
}

// 7 - Save
function saveFaces() {
  if (mugshotsCheckbox.checked()) {
    for (let f = 0; f < faces.length; f++) {
      const box = faces[f].box;
      const faceImage = video.get(box.xMin, box.yMin, box.width, box.yMin ? box.height : box.height);
      // (keep it simple; box.height exists)
      faceImage.save("face" + f, "png");
    }
  }
}

function saveSnapshot() {
  saveCanvas("canvas.png");
}

function keyPressed() {
  if (key === "m" || key === "M") saveFaces();
  if (key === "s" || key === "S") saveSnapshot();
}

// Helpers
function windowResized() {
  centerCanvas();
}

function centerCanvas() {
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cnv.position(x, y);
}