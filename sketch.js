var soundFile,amp,back;
var num = 800;

// ARRAYS

let noiseX = [];
let noiseY = [];

let randX = [];
let randY = [];

let posX = [];
let posY = [];

let minX = [];
let maxX = [];
let minY = [];
let maxY = [];


let pointX = [];
let pointY = [];

var rayon = 0;

var distance = 0; 
let distRand = []; 
var noiseDistance = 0;

// WAVE
var waves = 0;
var ampWaves = 0;

function preload(){
    soundFile = loadSound('heartbeat.mp3');
    back = loadSound('2.wav');
}



// SETUP --------------------------------------------------------------------------------------------------------------------------------------------------
var backVolume=0.0;
function setup() {
  amplitude = new p5.Amplitude();
  soundFile.loop();
  back.loop();
  createCanvas(windowWidth,windowHeight);
  background(51);
	
	rayon = (height-200)/2;
	
	for (var i=0; i<num; i++)
  {
		 noiseX[i] = 0;
		 noiseY[i] = 0;
		 
		 randX[i] = 0;
		 randY[i] = 0;
			
			posX[i] = 0;
			posY[i] = 0;
			
			minX[i] = 0;
			maxX[i] = 0;
			minY[i] = 0;
			maxY[i] = 0;
			
     pointX[i] = 0;
     pointY[i] = 0;
		
		 distRand[i] = 0;
	}
	
	
	for (var i=0; i<num; i++)
  {
    while (dist(pointX[i],pointY[i],width/2,height/2) >= rayon) 
    {
     pointX[i] = random(width);
     pointY[i] = random(height);
    }
	}
	
	var min = 10; // Minimum possible pour les variations noise
	var max = 100; // Maximum possible pour les variations noise
  
   for (var i=0; i<num; i++)
  {
     randX[i] = random(500)/10000; 
     randY[i] = random(500)/10000;
     
     minX[i] = -round(random(min,max));
     maxX[i] = round(random(min,max));
     
     minY[i] = -round(random(min,max));
     maxY[i] = round(random(min,max));
  }

   

 
}
var count=0;
// DRAW --------------------------------------------------------------------------------------------------------------------------------------------------
function draw() {
    let level = amplitude.getLevel();
    if(count>10){
            back.setVolume(backVolume);
            if(backVolume<=0.3){
            backVolume+=0.0005;
        }
}else{
    back.setVolume(0); 
}
console.log(backVolume);
  var colour = map(level, 0, 0.3, 20, 250);
  noStroke();
  fill(26,50);
  rect(0,0,width,height);
  
for (var i=0; i<num; i++)
  {
    posX[i] = pointX[i] + map(noise(noiseX[i]),0,1,minX[i],maxX[i]);
    posY[i] = pointY[i] + map(noise(noiseY[i]),0,1,minY[i],maxY[i]);
    
    if(count<=10){
    noiseX[i] += randX[i];
    noiseY[i] += randY[i];
    }else{
        noiseX[i] += randX[i]*level*20; 
        noiseY[i] += randY[i]*level*20; 
    }

   }

   distance = 20
   
   
   //println(minX[0]);
    for (var i=0; i<num; i++)
    {
        if(count<=10){
            stroke(255);
        }else{
            fill(255)
        ellipse(posX[i],posY[i],level*7,level*7);
         stroke(143,253,colour*5);
        }
      for (var j=0; j<num; j++)
      {
				
				var posFromCenter = dist(posX[i],posY[i],width/2,height/2);
				
        if ( posFromCenter >= waves - ampWaves && posFromCenter <= waves + ampWaves){
          	if ( dist(posX[i],posY[i],posX[j],posY[j]) <= distance)
          	{
                strokeWeight(0.1);
                  if(count<10){
                line(posX[i],posY[i],posX[j],posY[j]);
                  }else{
                    line(posX[i],posY[i],posX[j]+level*50,posY[j]+level*50);
                  }
          	}
         }
				
       }
    }

    if (waves >= height/3)
	{
		waves = 10;
        ampWaves = 10;
        count+=1;
    } 
  if(count<=10){
        waves*=1.02;
        waves+= 150*level;
        
        ampWaves*=1.02;
        ampWaves+= 1;
}
else{
    waves*=0;
    waves+= 0;
    
    ampWaves*=1.02;
    ampWaves+= 5;
    if (waves >= height/2+100)
	{
		waves = 0;
        ampWaves = 0;
    }
}

}

function touchStarted() {
  getAudioContext().resume()
}
