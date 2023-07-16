leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

leftWristScore=0;
rightWristScore=0;

song1_status="";
song2_status="";

function preload(){
    song1=loadSound('music.mp3');
    song2=loadSound('music2.mp3');
}


function setup(){
    canvas=createCanvas(500,400);
    canvas.position(520,220);

    video=createCapture(VIDEO);
    video.position(520,200);
     video.hide();
 
   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses)
}

function modelLoaded(){
    console.log("Model is loaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftWristX=Math.floor(results[0].pose.leftWrist.x-100);
        leftWristY=Math.floor(results[0].pose.leftWrist.y-80);

        rightWristX=Math.floor(results[0].pose.rightWrist.x-15);
        rightWristY=Math.floor(results[0].pose.rightWrist.y-80);


        console.log("Left wrist X=  "+leftWristX);
        console.log("Left wrist Y=  "+leftWristY);
        console.log("Right wrist X= "+rightWristX);
        console.log("Right wrist Y= "+rightWristY);

        leftWristScore=results[0].pose.keypoints[9].score;
        rightWristScore=results[0].pose.keypoints[10].score;

    }
}

function draw(){
    image(video,0,0,500,400);

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    if(song1.isPlaying()){
        fill("red");
        circle(leftWristX,leftWristY,20);
    }
    else if(leftWristScore>0.2){
    fill("red");
    circle(leftWristX,leftWristY,20);
    song2.stop();
    song1.play();
    document.getElementById("song_id").innerHTML="Harry Potter";
    }

   if(song2.isPlaying()){
    fill("red");
    circle(rightWristX,rightWristY,20);
   }
   else if(rightWristScore>0.2){
    fill("red");
    circle(rightWristX,rightWristY,20);
    song1.stop();
    song2.play();
    document.getElementById("song_id").innerHTML="Peter Pan";
   }
}

