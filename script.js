window.onload = function()
{
    var canvasW = 900;
    var canvasH = 600;
    var blocksize = 30;
    var ctx;
    var delay = 100;
    var lenine;
    var pomme;
    
    init()
    
    function  init()
    {
        var canvas = document.createElement('canvas');
        canvas.height = canvasH;
        canvas.width = canvasW;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        lenine = new snake([[6,4],[5,4],[4,4]], "right");
        pomme = new Apple([10,10]);
        refreshcanvas();
    }
    
    function refreshcanvas()
    {
        ctx.clearRect(0, 0, canvasW, canvasH);
        lenine.advanced();
        lenine.draw();
        pomme.draw();
        setTimeout(refreshcanvas, delay);
    }
    
    function drawBlock(ctx, position)
    {
        var x = position[0] * blocksize;
        var y = position[1] * blocksize;
        ctx.fillRect(x, y, blocksize, blocksize)
    }
    
    function snake(body, direction)
    {
        this.body = body;
        this.direction=direction;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = 'red';
            for(var i = 0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i])
            }
            ctx.restore();    
                
        };        
        this.advanced = function()
        { 
            var nextP = this.body[0].slice();
            switch(this.direction)
                {
                    case "left":
                        nextP[0] -= 1;
                        break;
                    case "right":
                        nextP[0] += 1;
                        break;
                    case "down":
                        nextP[1] += 1;
                        break;
                    case "up":
                        nextP[1] -= 1;
                        break;
                    default:
                        throw("Invalid direction");
                }
            this.body.unshift(nextP);
            this.body.pop();
           
        }; 
        this.setDir = function(newDir)
        {
            var allowDir;
            switch(this.direction)
            {
                case "left":
                case "right":
                    allowDir = ["up","down"];
                    break;
                case "down":
                case "up":
                    allowDir = ["left","right"];
                    break;
                default:
                    throw("Invalid direction");
            }
            if(allowDir.indexOf(newDir) > -1)
            {
                this.direction = newDir;
            }
        };
    }
   
    function Apple(position)
    {
        this.position = position;
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle="green";
            ctx.beginPath();
            var radius = blocksize/2;
            var x = this.position[0] * blocksize + radius;
            var y = this.position[1] * blocksize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();

        };

    }

    document.onkeydown = function handleKeyDown(e)
    {
        var key=e.keyCode;
        var newDir;
        switch(key)
        {
            case 37:
                newDir = "left"
                break;
            case 38:
                newDir = "up"
                break;
            case 39:
                newDir = "right"
                break;
            case 40:
                newDir = "down"
                break;
            default:
                return;
        }
        lenine.setDir(newDir);
    };
}