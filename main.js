var canvas = document.getElementById("mainGame");
var ctx = canvas.getContext("2d");



//classes

function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "http://ellisonleao.github.io/clumsy-bird/data/img/bg.png";
    this.score = 0;
    this.music = new Audio();
    this.music.src = "assets/Mario and Luigi - Partners in Time - Main Title 2.mp3" 
    
    
    this.img.onload = function(){
        this.draw();
    }.bind(this);

    this.move = function(){
        this.x--;
        if(this.x < -canvas.width)this.x = 0;
    }

    this.draw = function(){
        this.move();
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height)
        

    }
    
    this.drawScore = function(){
        ctx.font = "50px Avenir";
        ctx.fillStyle = "white";    
        ctx.fillText(this.score,this.width/2,this.y+50);
    }
}

//flappy

function Flappy(){
    this.x =150;
    this.y = 150;
    this.width = 30;
    this.height=30;
    this.img = new Image();
    this.img.src = "assets/flappy.png";
    this.img.onload = function(){
        this.draw();
    }.bind(this);
    this.draw = function(){
        this.y += 1;
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height);
    }
    this.move = function(){
        this.y -=20;
            
        }


    

}

//pipes

function Pipe(y,height){
    this.x = canvas.width;
    this.y = y;
    this.width = 50;
    this.height=height;

    this.draw = function(){
        this.x --;
        ctx.fillStyle = "green"; 
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }


}


//declaraciones

var tablero = new Board();
var flappy = new Flappy();
var pipes =[];


var intervalo;
var frames = 0;

//aux function
function generatePipes(){
        if(!(frames % 200 === 0))return;
        var ventana = 100;
        var randomHeight = Math.floor(Math.random()* 200 ) + 50;
        var pipe = new Pipe(0,randomHeight);
        var pipe2 = new Pipe(randomHeight+ventana ,canvas.height-(randomHeight+ventana));
        pipes.push(pipe);
        pipes.push(pipe2);
}

function drawPipes(){
    pipes.forEach(function(pipe){
        pipe.draw();
    })
}

//main function

function update(){
    generatePipes();
    frames ++;
    console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.draw();
    flappy.draw();
    drawPipes();
    tablero.drawScore();
}

function start(){
    //extras que necesitemos inicializar
    tablero.music.play();
    if(intervalo>0)return;
    intervalo = setInterval(function(){
    update();  
    } , 1000/60)
}

function stop(){
    tablero.music.pause();
    clearInterval(intervalo);
    intervalo=0;
}

//listeners (observadores)

//comienza el juego
document.getElementById("startButton")
    .addEventListener("click",function(){
        start();
    })
document.getElementById("pauseGame")
    .addEventListener("click",function(){
        stop();
    })

addEventListener("keydown",function(e){
    if(e.keyCode===32){
        flappy.move();
    }
})


