var leftWristX = 0;
var rightWristX = 0;

var leftWristY = 0;
var rightWristY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;

var song = "";
var song1 = "";
var song2 = "";
var song3 = "";
var song4 = "";

    song_final = "";

select_value = "";

function preload() {
  song = loadSound("BONKERS.mp3");
  song1 = loadSound("SLAUGHTER HOUSE.mp3");
  song2 = loadSound("Driftyyy.mp3");
  song3 = loadSound("Cutting.mp3");
  song4 = loadSound("Resonance.mp3");
  
  song_final = song;
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video, function () {
    console.log("Model loaded.");
  });
  posenet.on("pose", function (results) {
    if (results.length > 0) {
      console.log(results);

      scoreLeftWrist = results[0].pose.keypoints[9].score;
      scoreRightWrist = results[0].pose.keypoints[10].score;
      console.log(
        "Score left wrist: " +
          scoreLeftWrist +
          " and right wrist: " +
          scoreRightWrist
      );

      leftWristX = results[0].pose.leftWrist.x;
      leftWristY = results[0].pose.leftWrist.y;
      console.log("Left wrist x: " + leftWristX + " and y: " + leftWristY);

      rightWristX = results[0].pose.rightWrist.x;
      rightWristY = results[0].pose.rightWrist.y;
      console.log("Right wrist x: " + rightWristX + " and y: " + rightWristY);
    }
  });
}

function draw() {
  image(video, 0, 0, 600, 500);
  fill("#ff0000");
  stroke("#ff0000");
  if (scoreLeftWrist > 0.2) {
    circle(leftWristX - 10, leftWristY - 10, 20);
    numberLeftWristY = Number(leftWristY);
    volume = floor(numberLeftWristY) / 500;
    document.getElementById("volume").innerHTML = "Volume is " + volume;
    song_final.setVolume(volume);
  }

  if (scoreLeftWrist > 0.2) {
    circle(rightWristX - 10, rightWristY - 10, 20);
    numberRightWristY = Number(rightWristY);
    speed = floor(numberRightWristY) / 200;
    document.getElementById("speed").innerHTML = "Speed is " + speed + "X";
    song_final.rate(speed);
  }
}

function select_song() {
  select_value = document.getElementById("song-name").value;
  switch (select_value) {
    case "1":
      song_final = song;
      break;
    case "2":
      song_final = song1;
      break;
    case "3":
      song_final = song2;
      break;
    case "4":
      song_final = song3;
      break;
    case "5":
      song_final = song4;
      break;
  }
}

function play() {
  song_final.play();
  song_final.setVolume(1);
  song_final.rate(1);
}

function pause() {
  song_final.pause();
}

function stop() {
  song_final.stop();
}
