/**************************************************
 * University of Sunderland                       *
 **************************************************
 * School of Computer Science and Engineering     *
 **************************************************
 * Script: sketch - Starter.js                              *
 * Author: Neil Eliot edited by Mark Bennison     *
 * Date: v2 05/03/2026 | v1 16/01/2024            *
 **************************************************
 * Description:                                   *
 * Basic security style application               *
 * to extract faces from a video feed.            *                                   *
 **************************************************/
/**************************************************
 * AI Face Tracking - Part 1 Starter
 **************************************************/

let video;
let faceMesh;
let faces = [];
let cnv;

// UI
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
  // PASTE STEP 1 CODE HERE
  // 1 - Menu (End)
}

function draw() {
  drawBackground();   // Step 3
  drawVideo();        // Step 2
  isolateFaces();     // Step 5
  drawMeshDots();     // Step 4
  drawMugshots();     // Step 6
}

// -------------------------
// Step 2
function drawVideo() {
  // 2 - Video (Start)
  // PASTE STEP 2 CODE HERE
  // 2 - Video (End)
}

// Step 3
function drawBackground() {
  // 3 - Background (Start)
  // PASTE STEP 3 CODE HERE
  // 3 - Background (End)
}

// Step 4
function drawMeshDots() {
  // 4 - Mesh Dots (Start)
  // PASTE STEP 4 CODE HERE
  // 4 - Mesh Dots (End)
}

// Step 5
function isolateFaces() {
  // 5 - Isolate Faces (Start)
  // PASTE STEP 5 CODE HERE
  // 5 - Isolate Faces (End)
}

// Step 6
function drawMugshots() {
  // 6 - Mugshots (Start)
  // PASTE STEP 6 CODE HERE
  // 6 - Mugshots (End)
}

// Step 7 - Saving
// 7 - Save (Start)
// PASTE STEP 7 CODE HERE
// 7 - Save (End)

// -------------------------
// Helpers (do not edit)
function windowResized() {
  centerCanvas();
}

function centerCanvas() {
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cnv.position(x, y);
}