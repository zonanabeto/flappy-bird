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
        ctx.font = "50px Avenir";
        ctx.fillStyle = "peru";    
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


//declaraciones

var tablero = new Board();
var flappy = new Flappy();

var intervalo;
var frames = 0;

//main function

function update(){
    frames ++;
    console.log(frames);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    tablero.draw();
    flappy.draw();
}

function start(){
    //extras que necesitemos inicializar

    if(intervalo>0)return;
    intervalo = setInterval(function(){
    update();  
    } , 1000/60)
}

function stop(){
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


