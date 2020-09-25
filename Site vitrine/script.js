
// declare variables 

let covidimg;
let gelimg;
let soapimg;
let coviddiv;
let geldiv;
let canvas;

let covids = [];        // create empty array in which we will put covid elements
let last_gel = 0;       // create variable for a time counter we will use on gel

let im_list = [];       //for replacing profile pictures


function setup() {

    canvas = createCanvas(windowWidth, windowHeight + 10);
    canvas.position("z-index", "-1");        
    frameRate(30);                                              // number of frame/sec
    generateCoviddiv();                                         // call function generateCoviddiv

     
    geldiv = createDiv();                                           // create div called gelimg
    geldiv.style("background-image", "url('imgs/lotion-bottle.png')");       // put gel img in empty div
    geldiv.style("display", "none");                                // geldiv not displaying by default
    geldiv.class("geldiv");                                         // add class ".geldiv" to the div
    geldiv.addClass("cvd-picture");                                 // add class ".geldiv" to the div

    geldiv.mouseClicked(clicked_gel);                               // add action defined in function "clicked_gel" if geldiv is clicked 
}


// function to generate the covid elements on screen

function generateCoviddiv() {
    //print("Hello");

    select("body").style("width", "100%");                      // body's width = window width 


    // generate divs in HTML
    for (let i = 0; i < 5; i++) {                                           // starting from 0, go through the for loop 5 times
    
        let coviddiv = createDiv(); 
        coviddiv.style("background-image", "url('imgs/microbe.png')");       // put covid img in empty div
        coviddiv.class("coviddiv");                                         // add class ".coviddiv" 
        coviddiv.style("z-index", "0");
        coviddiv.addClass("cvd-picture");  
        coviddiv.position(random(width), random(height), "fixed");                                 // add class ".cvd-picture"
        coviddiv.mouseOver(over_covid);                                     // add action defined in function "over_covid" if mouse over something with class .coviddiv
        //console.log("new coviddiv");                                      // log "new coviddiv" each time a new div is created

    
        let new_covid = new Particle(coviddiv, random(width), random(height), "fixed");  // create new covid particle 
        covids.push(new_covid);                                                 // and add it to array "covids"                         
    }  
} // end of generateCoviddiv()


// function draw that will loop each frame count

function draw() {
        

    // will display a gel div after 5 seconds if there is no gel div visible
    if (last_gel >= 0){                                                         // dont change geldiv if last_gel is visible
        if (second() - last_gel > 5){                                           // if 5s after last_gel
            last_gel = -1;                                                      // set last_gel negative just to detect that geldiv is visible
            geldiv.position(random(width-100), random(height-100), 'fixed');    // set random position
            geldiv.style("display", "block");                                   // display geldiv
        }
    }

    
    for ( let i = 0 ; i < covids.length ; i++ ) {
        covids[i].draw();      // update and draw as many covids as there are in the array
    }



} // end of draw()

// function to trigger action when mouse is over one covid
function over_covid(){
    console.log("fire over covid");     // if mouse hovers covid elmts then "fire over covid" is printed in the console
    generateCoviddiv();                 // if mouse hovers covid elmts, then we generate more covids by re-running the function responsible for their apparition
} // end of function over_covid()

// action if one click on gel
function clicked_gel(){
    geldiv.style("display", "none"); // if geldiv is clicked, hide geldiv
    last_gel = second();             // reinit timer
    console.log("gel is clicked");   // log
    
    for ( let i = 0 ; i < covids.length ; i++ ) {
        covids[i].elem.remove();    // if geldiv is clicked, erase all covid array and therefor all covid elmts on the page
    }

    covids = [];                    // create a new empty array   
    generateCoviddiv();             // fill the new empty array with new covid elmts by re-running function generateCoviddiv()    
} // end of function clicked_gel()


// class to generate covids elements as particles so they can randomly move arround
class Particle{
    constructor(elem, x, y){
        this.elem = elem;
        this.x = x;
        this.y = y;
        this.seed_x = random(15);
        this.seed_y = random(15);
    }

    draw(){
        this.x += noise(this.seed_y + new Date()/1000)*4-2;
        this.y += noise(this.seed_x + new Date()/1000)*4-2;

        this.elem.position(this.x, this.y, "fixed");
    }
} // end of class Particle




