/*
    title: PING PONG
    author: Mike Mao Che
    description: simple table tennis 2D
    keys control: left or right
*/

/*** using inheritance to avoid redundancy ***/
class Element {
    constructor(x,y,width,height,color,name){
        // initialize all values on the map
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

}

class Ball extends Element
{
    constructor(x,y,width,height,color,name){
        super(x,y,width,height,color,name);
    }
}

class Bot extends Element
{
    constructor(x,y,width,height,color,name){
        super(x,y,width,height,color,name);
    }
}

class Player extends Element
{
    constructor(x,y,width,height,color,name){
        super(x,y,width,height,color,name);    
        this.x = x;  
        this.direction = 0;  
        //console.log(this.x)
    }
    
    moving(e)
    {    
        try {
            var code = e != null ? e.keyCode : null;            
            if(code != null)
            {                
                // if left -10 else if +10 else stay here
                this.direction = code == 37 ? -10 : code == 39 ? 10 : 0;                
                // change here
            }
            //return this.direction;                     
        } catch (error) {
            console.log(error)
            //return error;
        }  
    }

    getDirection()
    {
        return this.direction;
    }

    newPosition(direction)
    {
        this.x += direction; // left or right
    }
}

function tick(elements) {
    setInterval(function(){drawing(elements)},1000); // draw here
}


function drawing(draws) {
    var canvas = document.getElementById('app')
    var ctx = canvas.getContext("2d");
    
    // loop
    draws.forEach(element => {
        // move before drawing
        // drawing at the end
        switch(element.name){
            case "ball":
            break;
            case "bot":
            break;
            case "player":
                window.addEventListener('keydown',element.moving,false);
                element.moving();
                var newDirection = element.getDirection(); 
                console.log(newDirection)               
                element.newPosition(newDirection);                
                ctx.fillStyle = element.color;
                ctx.fillRect(element.pos.x,element.pos.y,element.size.width,element.size.height);
                break;
            default:
            alert("no data")
            break;
        } 
    });
}

function run()
{
    var ball = new Ball(0,0,100,100,"white","ball");
    var bot = new Bot(10,10,35,5,"red","bot");
    var player = new Player(10,140,35,5,"blue","player");

    // to store more elements in the future
    var draws = [ball,bot,player]; 

    this.tick(draws); // repeat the drawing every 1s

}

run();