/* Ping pong game 2D 
 * Made by : Mike Mao Che
 */
var stop = "";
const app = document.getElementById('app')
// rackets
const width = 40, height  = 5; // dimensions
const gap = 2; // space
const min = 0, max = (app.width/2) - (width/2) ;

// bot 
const range = 80;

// ball
const radius = 6;
const centerX = (app.scrollWidth-app.width)/2;
const centerY = app.height/2;
var dx = 2, dy = -4;
const minBall = 0, maxBall = (app.width/2) - (radius/2) ;
let start = false; // start the game when you move or press the button

/* super class */
function Object(x,y,width,height,color,name)
{
	this.pos = {
        x,y
    };

    this.size = 
    {
        width,height
    };

    this.color = color;
    this.name = name;

}

// instances of the super class
let player = new Object(min+gap,(app.height-height),width,height,"blue","player");
let ball = new Object(centerX,centerY,radius,0,"orange","ball");
let bot = new Object(max-gap,min,width,height,"purple","bot");


// for any element
function moving(e){
    player.moving(e.keyCode) // 37 or 39
}

// add event listener
window.addEventListener('keydown',moving);



Object.prototype.moving = function(code) {
	try {				
        let direction = 0;
        let nextX = this.pos.x;
        // if left -2 else if +2 else stay here
        direction = code == 37 ? -4 : code == 39 ? 4 : 0;                
        // change here
        nextX += direction; // check if it is out
        if(nextX > min && nextX < max)
        {
            this.pos.x += direction;
            start = true;
        }     

    } catch (error) {        
        console.log(error);
    }  
}

Object.prototype.bounce = function() {
    let nextX = this.pos.x;
    let nextY = this.pos.y;

    nextX+= dx;
    nextY+= dy;

    if(nextX > maxBall || nextX < radius) {
        dx=-dx;
    }

    if(nextY < radius){
        dy=-dy;
    }

    // collide with the player
    if(nextY + radius > player.pos.y + height && // thick of the ball and the racket
        nextX > player.pos.x && 
        nextX < player.pos.x + width/2) { // player position + height of the racket
        dy=-dy;        
    }

    // collide with the bot
    /*if(nextY > bot.pos.y + height &&
        nextX > bot.pos.x && 
        nextX < bot.pos.x + width/2 ) { // thick of the ball and the racket
        dy=-dy;
        dx=-dx;
    }*/
  

    // Gamer over for player
    if(nextY > app.height || nextY < 0){ //|| nextY < min){
        //clearInterval(stop);
        location.reload();
    }
    this.pos.x += dx;
    this.pos.y += dy;
}

// robot
Object.prototype.run = function() {
    let nextX = this.pos.x;
    let nextY = this.pos.y;
    let dRobot =-10; // direction robot
    //let chooseDirectionX = -10; // by default check LEFT
    
    //if(ball.pos.y+radius >= min && nextY + range <= ball.pos.y+radius) { // if detect ball
        nextX += dRobot; // predict next move    
        //console.log(chooseDirectionX+this.pos.x % ball.pos.x)   
        if(Math.floor(Math.random(100)*100) % 2 != 0 ){            
            dRobot = -10;
        }else {
            dRobot = 10;
        }
        if(nextX > min && nextX < max ){
            this.pos.x += dRobot;
        }
    }

function drawing(draws) {
    let canvas = app // width = 300, height = 150
    let ctx = canvas.getContext("2d");

    if(start == true) // game has started
    {
        bot.run();
        ball.bounce();        
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // redraw
    // Lines
    ctx.beginPath();
    ctx.moveTo(app.width/2,min); // start coord
    ctx.lineTo(app.width/2,app.height); //  end coord
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.stroke();

    // loop
    draws.forEach(element => {
        // move before drawing
        // drawing at the end
        switch(element.name){
            case "ball":
            ctx.beginPath();
            ctx.fillStyle = element.color;
            ctx.arc(element.pos.x*gap,element.pos.y,element.size.width,element.size.height,2*Math.PI,false);                
            ctx.fill();
            ctx.closePath();
            // edge of the ball
            /*ctx.lineWidth = 1;
            ctx.strokeStyle = 'white';
            ctx.stroke();*/
            break;
            case "bot":
                ctx.fillStyle = element.color;
                ctx.fillRect(element.pos.x*gap,element.pos.y,element.size.width,element.size.height);
            break;
            case "player":           	
                ctx.fillStyle = element.color;
                ctx.fillRect(element.pos.x*gap,element.pos.y,element.size.width,element.size.height);
                break;
            default:
                alert("no data");
            break;
        } 
    });
}

function tick(elements) {
    stop = setInterval(function(){drawing(elements)},150); // draw here
}

function run()
{
    // to store more elements in the future
    var draws = [player,ball,bot]; 
    this.tick(draws); // repeat the drawing every 1s
}

// launch the app
run();