var totalObjects = 1500;
var maxVelocity = 2;
var starSize = 1;
var twinkleFreq = 50000;
var shootingStarFreq = 500;
var shootingStarVelocity = 100;
var shootingStarSize = 1;
var background = new Image();
background.src = "/img/space.jpg";

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            setInterval(callback, 75);
          };
})();

var canvas = document.getElementById('field');
canvas.width = document.width || 1024;
canvas.height = document.height || 320;
var ctx = canvas.getContext("2d");



var stars = [];
var shootingStars = [];
this.init();

setInterval(update, 30);
requestAnimFrame(draw);

function init() {
  for(i=0;i<totalObjects;i++){
    stars.push(new Star());
  }
}

function draw() {

// Make sure the image is loaded first otherwise nothing will draw.
  requestAnimFrame(draw);
  //ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.fillStyle = "rgba(0, 0, 0, .4)";
   ctx.fillRect (0, 0, canvas.width, canvas.height);
   background.onload = function(){
    ctx.drawImage(background,0,0); }
   for(f=0;f<stars.length;f++)
   {
     stars[f].Update();
     stars[f].Draw();
   }
   for(f=0;f<shootingStars.length;f++)
   {
     shootingStars[f].Update();
     shootingStars[f].Draw();
   }
}

function update()
{
  if(Math.round((Math.random()*shootingStarFreq))==1){
    shootingStars.push(new ShootingStar());
  }
   for(f=0;f<shootingStars.length;f++)
   {
     if (shootingStars[f].X < -1000)
     {
       shootingStars.splice(f,1);
     }
   }
}


function Star(){
  this.X = Math.random()*canvas.width;
  this.Y = Math.random()*canvas.height;
  this.Velocity = (Math.random()*maxVelocity);
  this.Opacity = (((Math.random()*10)+1)*0.1);
  
  this.Update = function() {
    this.X -= this.Velocity;
    if(this.X<0){ ///reset
      this.X = canvas.width+1;
    }
  };
  
  this.Draw = function() {
    ctx.fillStyle = "rgba(255,255,255," + this.Opacity + ")";
    if(Math.round((Math.random()*twinkleFreq))==1){
      ctx.fillRect(this.X,this.Y,starSize+2,starSize+2);
    }
    else{
      ctx.fillRect(this.X,this.Y,starSize,starSize);
    }
  };
}

function ShootingStar() {
    this.X = 2000;
    this.Y = Math.random()*canvas.height;
    this.Length = 1000;
  
  this.Update = function(){
    this.X -= shootingStarVelocity;
  };
  
  this.Draw = function() {
    for (var i = 0; i < this.Length; i++){
      opacity = (0.8 - (0.001 * i));
      ctx.fillStyle = "rgba(255,255,255," + opacity + ")";
      ctx.fillRect(this.X+i,this.Y,shootingStarSize,shootingStarSize);
    }
  };
}