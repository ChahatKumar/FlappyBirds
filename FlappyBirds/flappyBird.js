var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// load images and sounds

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

/****************************************************************/
var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// pipe coordinates

var pipe = [];

pipe[0] = {
    x : 300,
    y : 0
};
pipe[1] = {
    x : 600,
    y :  Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
};
pipe[2] = {
    x : 900,
    y :  Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
};
pipe[3] = {
    x : 1200,
    y :  Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
};
pipe[4] = {
    x : 1500,
    y :  Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
};
// draw images

function draw(){
    
    ctx.drawImage(bg,0,0,);
    ctx.drawImage(bg,bg.width,0,);
    ctx.drawImage(bg,(bg.width)*2,0,);
    ctx.drawImage(bg,(bg.width)*3,0,);
    ctx.drawImage(bg,(bg.width)*4,0,);
    ctx.drawImage(bg,(bg.width)*5,0,);

    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(fg,fg.width,cvs.height - fg.height);
    ctx.drawImage(fg,2*fg.width,cvs.height - fg.height);
    ctx.drawImage(fg,3*fg.width,cvs.height - fg.height);
    ctx.drawImage(fg,4*fg.width,cvs.height - fg.height);


    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
    
}

draw();

