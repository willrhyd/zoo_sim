// jshint esversion:6

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
// var sun = document.getElementById("canvasSun");
// var sunCtx = sun.getContext("2d");
var sky = document.getElementById("canvasSky");
var skyCtx = sky.getContext("2d");

// Set the canvas to fullscreen
var w = window.innerWidth;
var h = window.innerHeight;
canvas.width = w;
canvas.height = h;
// Would like to animate the sun moving with +1 Hour button click
// sun.width = w;
// sun.height = h;

//Separate sky canvas to allow for easier redrawing on the animation
sky.width = w;
sky.height = h;

// Draw the static scene on the canvas
drawStatics();

// function init(duration){
//   var requestID;
//   var startTime = null;
//   var time ;
//   var animate = function(time) {
//     time = new Date().getTime();
//     if (startTime === null) {
//         startTime = time;
//    }
//    let progress = time - startTime;
//    sunCtx.clearRect(0, 0, canvas.width, canvas.height);
//    sunCtx.save();
//    sunCtx.translate(w/2, h/2);
//
//
//    sunCtx.rotate(((2 * Math.PI) * (progress/duration))  );
//    sunCtx.arc(w/2, h/2, 50, 0, 2 * Math.PI);
//
//    sunCtx.fillStyle= "#fce88b";
//    sunCtx.fill();
//    ctx.restore();
//    if (progress < duration ) {
//      requestAnimationFrame(animate);
//    } else{
//       cancelAnimationFrame(requestID);
//    }
//  };
// animate();
// }

// init(2000);



function drawStatics() {
  //Draw sky
  skyCtx.fillStyle = "#03e3fc";
  skyCtx.fillRect(0, 0, w, h / 2);

  //Draw grass
  ctx.fillStyle = "#009e0d";
  ctx.fillRect(0, h / 2, w, h / 2);

  // Draw paths
  ctx.fillStyle = "#fce88b";
  drawLeftPath();
  drawRightPath();
  drawCentralPath();
  // Draw entry gate
  drawGate();

  // Draw enclosure fences
  drawFences();
}

// Functions for drawing the paths from the entrance to the animals
function drawLeftPath() {
  let leftPath = new Path2D();
  leftPath.moveTo(45 * w / 100, 50 * h / 100);
  leftPath.lineTo(25 * w / 100, 60 * h / 100);
  leftPath.lineTo(25 * w / 100, 70 * h / 100);
  leftPath.lineTo(45 * w / 100, 55 * h / 100);
  ctx.fill(leftPath);
}

function drawRightPath() {
  let rightPath = new Path2D();
  rightPath.moveTo(55 * w / 100, 50 * h / 100);
  rightPath.lineTo(75 * w / 100, 60 * h / 100);
  rightPath.lineTo(75 * w / 100, 70 * h / 100);
  rightPath.lineTo(55 * w / 100, 55 * h / 100);
  ctx.fill(rightPath);
}

function drawCentralPath() {
  let centralPath = new Path2D();
  centralPath.moveTo(45 * w / 100, h / 2);
  centralPath.lineTo(40 * w / 100, h / 1.3);
  centralPath.lineTo(60 * w / 100, h / 1.3);
  centralPath.lineTo(55 * w / 100, h / 2);
  ctx.fill(centralPath);
}

// Function for drawing the entry gate
function drawGate() {
  ctx.fillStyle = "#000000";
  // Draw left post
  ctx.fillRect(45 * w / 100, 30 * h / 100, 10, 20 * h / 100);
  // Draw right post
  ctx.fillRect(55 * w / 100 - 10, 30 * h / 100, 10, 20 * h / 100);


  // Set arc start 1% to the right of the left  post, 3% above the top of the post, radius =1% of width, start at 270 degrees, go to 360, drawing left to right
  ctx.arc(46 * w / 100, 27 * h / 100, w / 100, Math.PI * 1, Math.PI * 1.5);
  // Straight line to next arc, needs to go to 48% of width at height = 27% + 1% of the width (as that's the radius, make it level with top of arc)
  ctx.lineTo(48 * w / 100, 27 * h / 100 - w / 100);
  // Anticlockwise arc up to the top
  ctx.arc(49 * w / 100, 27 * h / 100 - 2 * w / 100, w / 100, Math.PI * 0.5, Math.PI * 2, true);
  // Start of the right side of the curved top
  ctx.arc(51 * w / 100, 27 * h / 100 - 2 * w / 100, w / 100, Math.PI * 1, Math.PI * 0.5, true);
  // Line to last curve on the right
  ctx.lineTo(54 * w / 100, 27 * h / 100 - w / 100);
  // Curve back down
  ctx.arc(54 * w / 100, 27 * h / 100, w / 100, Math.PI * 1.5, Math.PI * 2);
  // Line to top right of right post
  ctx.lineTo(55 * w / 100, 30 * h / 100);
  // Line back to left post
  ctx.lineTo(45 * w / 100, 30 * h / 100);
  // Fill the banner
  ctx.fill();

  ctx.fillStyle = "#fce88b";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Zoo", 50 * w / 100, 29 * h / 100);
}

// Functions for loading, drawing and skewing images to create the pens and animals and clouds
function loadAndDrawImage(url, x, y, skewX, skewY) {
  // Create an image object. This is not attached to the DOM and is not part of the page.
  var image = new Image();
  // When the image has loaded, draw it to the canvas
  image.onload = function() {
    ctx.save();
    ctx.transform(1, skewX, skewY, 1, 0, 0);
    ctx.drawImage(this, x, y, 200, 200);
    ctx.restore();
  };
  image.src = url;
}

// Series of calls to "loadAndDrawImage" to put the fences up
function drawFences() {
  loadAndDrawImage("public/fence.svg", 0, 50 * h / 100 - 180, 0, 0);
  loadAndDrawImage("public/fence.svg", 0, 90 * h / 100 - 180, 0, 0);
  loadAndDrawImage("public/fence.svg", 50 * w / 100 - 100, 75 * h / 100 - 180, 0, 0);
  loadAndDrawImage("public/fence.svg", w - 216, 50 * h / 100 - 180, 0, 0);
  loadAndDrawImage("public/fence.svg", w - 216, 90 * h / 100 - 180, 0, 0);

  // Draw skewed fences on the left hand side
  loadAndDrawImage("public/fence.svg", 200, 50 * h / 100 - 260, 0.4, 0);
  loadAndDrawImage("public/fence.svg", 200, 90 * h / 100 - 100, -0.4, 0);

  // Draw skewed fences on the right hand side
  loadAndDrawImage("public/fence.svg", w - 416, 50 * h / 100 - 420, 0.4, 0);
  loadAndDrawImage("public/fence.svg", w - 416, h - 14, -0.4, 0);

  // Draw skewed fences in the center
  loadAndDrawImage("public/fence.svg", 55 * w / 100 + 20, 50 * h / 100 - 690, 0.8, 0);
  loadAndDrawImage("public/fence.svg", 25 * w / 100 + 85, h + 170, -0.8, 0);
}
