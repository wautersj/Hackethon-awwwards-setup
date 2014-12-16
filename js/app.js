var FPS;
var CANVAS;
var CONTEXT;

var _greenCrystalAsset;
var _whiteCrystalAsset;

var pixels;
var maxPixels;

/* making some changes for upload git */


function init(){

    FPS = 30;
    CANVAS = $('#myCanvas').get(0);
    CONTEXT = CANVAS.getContext('2d');

    pixels = [];
    maxPixels = 400;

    setupAssets(render);
}

function setupAssets(callback) {
    
    type1 = {
        name: 'type 1 white',
        url: 'assets/type-1-white.png',
        img: null,

        width: null,
        height: null
    };

    type2 = {
        name: 'type 2 white',
        url: 'assets/type-1-green.png',
        img: null,

        width: null,
        height: null
    };

    var que = [type1, type2];

    function load(){
        if(que.length>0){
            var item = que.shift();

            var img = new Image();
            img.onload = function(){
                console.log('Preloaded img: ' + item.name);

                //Save the img context
                item.img = this;
                item.width = img.width;
                item.height = img.height;

                //Load next item in que
                load();
            }

            img.src = item.url;
        } else {
            console.log('Preloaded Complete!');

            //Preload complete, start render
            callback();
        }
    }

    load();
}

function addPixels(){
    if(pixels.length<maxPixels){
        for (var i = 0 ; i<3; i++) {
            var x = Math.floor(Math.random() * CANVAS.width);
            var y = -10; // out of sight

            var pixel = {
                x : x,
                y : y,
                size : 2 + Math.floor(Math.random() * 15),
                smoothness : 25 + Math.floor(Math.random() * 300),
                offsetX : Math.round(-100 + Math.random()*(window.innerWidth/3 + 100)),
                fill : "#FFFFFF",
                opacity: Math.random(),

                asset: type1
            };

            pixel.opacity = pixel.size/15;

            pixels.push(pixel);    
        };
    }
}

var type = true;
function getPixelType(){
    if(type) {
        return type1;
    } 
    type != type;
    return type2;
}

function clearPixels(){
    var pixelCount = pixels.length;
    if(pixelCount >= maxPixels) {
        pixels.shift();
    }
}

function draw(){

    // constant rotation

    var pixelCount = pixels.length;
    for(var i = 0; i < pixelCount ; i++){
        var pixel = pixels[i];


        /* dots */
        CONTEXT.globalAlpha = pixel.opacity;
        //CONTEXT.shadowColor = '#FFFFFF';
        //CONTEXT.shadowBlur = 10;
        //CONTEXT.beginPath();
        //CONTEXT.arc(pixel.x, pixel.y, pixel.size, 0, 2 * Math.PI, false);
        CONTEXT.drawImage(pixel.asset.img,0,0,pixel.asset.width,pixel.asset.height, pixel.x, pixel.y, pixel.size, pixel.size);
        //CONTEXT.translate(CANVAS.width / 2, CANVAS.height / 2);
        //CONTEXT.scale(pixel.scaleX,pixel.scaleY);
        //CONTEXT.fillStyle = pixel.fill;
        //CONTEXT.fill();
    }
}

function simulate(){

    for(var i = 0; i < pixels.length ; i++) {
        //cache pixel
        var currentPixel = pixels[i];

        //move pixel
        currentPixel.x += ((currentPixel.x + currentPixel.offsetX) - currentPixel.x) / currentPixel.smoothness;
        currentPixel.y += ((window.innerHeight * 1.5) - currentPixel.y) / currentPixel.smoothness;

        //pixels collision detection
        for(var j = 0; j < pixels.length ; j++) {
            var otherPixel = pixels[j];
            if(j !== i) {
                var result = detectCollision(currentPixel, otherPixel);
                if(result){
                    snowFlakeToFireWork(currentPixel, otherPixel);
                }
            }
        }

        //delete when out-of-window
        if(currentPixel.y > window.innerHeight){
            var indexToRemove = pixels.indexOf(currentPixel);
            pixels.splice(indexToRemove, 1);
        }
    }
}

function snowFlakeToFireWork(pixel, otherPixel){
    pixel.asset = otherPixel.asset = type2;
}

function detectCollision(circle,anotherCircle){
    var xDistance = (anotherCircle.x - circle.x); 
    var yDistance = (anotherCircle.y - circle.y);
    var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance *yDistance)); 
    var sumOfRadius = ((circle.size/5) + (anotherCircle.size/5)); // devide by x (svg size)
    if (distanceBetween < sumOfRadius) {
        return true;
    }
    return false;
}

function scaleCanvas(){
    if(CANVAS.width !== window.innerWidth) {
        CANVAS.width = window.innerWidth;
        CANVAS.height = window.innerHeight;
    }
}

function clearCanvas(){
    CONTEXT.clearRect(0,0, window.innerWidth, window.innerHeight);
}

function render (){
    window.requestAnimationFrame(function(){
        clearCanvas();
        scaleCanvas();

        addPixels();
        //clearPixels();
        
        draw();
        simulate();

        window.setTimeout(render, 1000/FPS);
    });
}

init();