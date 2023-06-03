Song1 = "";
Song2 = ""; 
song1_status = "";
song2_status = "";


leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

ScoreLeftWrist = 0;
ScoreRightWrist = 0;


function preload()
{
    Song1 = loadSound("music.mp3");
    Song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600 , 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score LeftWrist = " + ScoreLeftWrist + " , Score RightWrist = " + ScoreRightWrist);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + " , LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + " , RightWristY = " + rightWristY);
    }
}

function modelLoaded()
{
    console.log('PoseNet is Initialized');
}

function draw()
{
    image(video , 0 , 0 , 600 , 500);

    fill("#06c92d");
    stroke("#06c92d");

    song1_status = Song1.isPlaying();
    song2_status = Song2.isPlaying();

    if(ScoreLeftWrist > 0.2)
    { 
      circle(leftWristX , leftWristY , 20);
      Song1.stop();

      if(song2_status == false)
      {
        Song2.play();
        document.getElementById("song_name").innerHTML = "Playing Peter Pan song";
      }
    }
    if(ScoreRightWrist > 0.2)
    { 
      circle(rightWristX , rightWristY , 20);
      Song2.stop();

      if(song1_status == false)
      {
        Song1.play();
        document.getElementById("song_name").innerHTML = "Playing Disco song";
      }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}