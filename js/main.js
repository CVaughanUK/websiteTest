//P5 Code

//Creates boolenas for the load and main screen state
var loadScreen = false;
var scattyArp = false;
var doorbellArp = false;
var visualSketch = false;

//Creates the variables
var lineAmnt;
var xRandom;
var yRandom;
var widthChoice = 500;
var heightChoice = 500;

//Creates line factor variables
var lineFactorRandom = false;
var lineFactorX = 100;
var lineFactorY = 100;
var lineFactorOffsetX;
var lineFactorOffsetY;

//Creates the mouse vectors and boolean
var mVector1;
var mVector2;
var mouseTrig = false;

//Doorbell Arp Variables
var v2lineAmnt;
var linesLfo1Val = 0;
var linesPointCenterX = width / 4;
var linesPointsCenterY = height / 4;
var linesPointCenterXRandom;
var linesPointCenterYRandom;
var pause = 0;

function setup() {
    //Creates a canvas the size of the screen
    createCanvas(screen.width, screen.height);
    //Creates the initial mouse vector position
    mVector1 = createVector(mouseX, mouseY);

}


function draw() {
    //Sets the background to black
    background(0);
    mouseCheck();
    controls();
    stateCheck();

    //If the load screen is on
    if (loadScreen) {
        //Creates a small white rectangle
        rectMode(CENTER);
        fill(255);
        rect(width / 2, height / 2, 600, 200);

        //Creates the load screen text
        stroke(0);
        fill(0);
        textAlign(CENTER);
        textSize(15);
        text("d _ i _ s _ t _ o _ r _ t", width / 2, (height / 2) - 70);
        textSize(13);
        text("a _ s m a l l _ v i s u a l i z e r _ f o r _ a _ f m _ s y n t h", width / 2, (height / 2) - 50);

        text(10 - int(playHead / 12), width / 2, height / 2);

        textSize(11);
        text("y o u r _ m o u s e _ p o s i t i o n _ a n d _ s p e e d _ w i l l _ a l t e r _ p a r a m e t e r s", width / 2, (height / 2) + 50);
        text("o r _ u s e _ t h e _ c o n t r o l s _ i n _ t h e _ l e f t _ t o p _ c o r n e r", width / 2, (height / 2) + 70);

    }

    //If the visual screen state is on
    if (scattyArp) {

        //The amount of lines is relative to the amount of clock ticks
        lineAmnt = clockTicks * 10;

        //Sets the min and max osc freq for the randomisation based off the mouse x position
        oscFreqMin = 100 + ((mouseX / width) * 2000);
        oscFreqMax = 5000 - ((mouseX / width) * 5000);

        //Makes the shape orientate around the mouse position
        widthChoice = mouseX;
        heightChoice = mouseY;

        //This creates the lines
        for (var i = 0; i < lineAmnt; i++) {
            stroke(255); //Sets them to white

            if (lineFactorRandom) {

                //If the random setting is on, the line is drawn with a random x and y factoring mulitpling the cos and sin calculations, with two poitns sets to the mouse position
                line(cos(radians(i)) * xRandom, heightChoice, widthChoice, sin(radians(i)) * yRandom);

            } else {
                //If the random setting is of, the line is drawn with a scaled x and y factor mulitpling the cos and sin calculations, with two poitns sets to the mouse position
                line(cos(radians(i)) * (lineFactorX + lineFactorOffsetX), heightChoice, widthChoice, sin(radians(i)) * (lineFactorY + lineFactorOffsetY));
            }
        }

        //This sets the lfo freqyency according to the mouse y position
        lfoFreq = (mouseY / height) * 50;

    }


    if (doorbellArp) {
        
        //Creates a lines amount from the chance input but scaled
        v2lineAmnt = mapValue(v2Chance, 1, 5, 10, 100);


        if (pause === 0) { //If pause is on (0) then it creates a strobe of the background
            if ((frameCount % 2) === 0) {
                background(255);
            } else {
                background(0);
            }
        }

        //Draws the liens in white
        stroke(255);

        //Draws the lines according to the line amount
        for (var i = 0; i < v2lineAmnt; i++) {
            noFill();
            if (lineFactorRandom) { //If the random switch is on
                //The lines are actually a quad shape with the origin being the mouse, modulated curves for sides and a focus point randomly selected every tick
                quad(mouseX, mouseY, cos(radians(i * (linesLfo1Val * pause))) * 100, sin(radians(i)) * 900, linesPointCenterXRandom, linesPointCenterYRandom, cos(radians(i * (-linesLfo1Val * pause))) * 900, sin(radians(i)) * 100);
            } else {
                //If the random selection is not on the modulations are controlled by the sliders and mouse positions
                //quad(mouseX, mouseY, cos(radians(i * (linesLfo1Val * pause))) * 100, sin(radians(i)) * 900, mouseX / 3, mouseY / 3, cos(radians(i * (-linesLfo1Val * pause))) * 900, sin(radians(i)) * 100);
                quad(mouseX, mouseY, cos(radians(i * (linesLfo1Val * pause))) * 100, sin(radians(i)) * 900, mouseX / 3, mouseY / 3, cos(radians(i * (-linesLfo1Val * pause))) * 900, sin(radians(i)) * 100);
            }
        }
    } 


}

//This is a function for checking whether the mouse has moved quickly
function mouseCheck() {
    //This checks for the mouse speed
    if (mouseX != mVector1.x && mouseY != mVector1.y) { //If the mouse position is different to the last recorded mouse vector
        mVector2 = createVector(mouseX, mouseY); //Set the second mouse vector to the mouse value
        var mgVec = createVector(mVector2.x - mVector1.x, mVector2.y - mVector1.y); //Creates a new vector of the difference between the last mouse position and the current one
        var mg = mgVec.mag(); //Creates a variable of the magnitude of the difference of vectors
        if (mg >= 200) { //If the magnitude is bigger than 100
            mouseTrig = true; //It triggers the mouse trig to true, which randomises the ticks amount
        } else {
            mouseTrig = false;
        }
        //Updates the mouse vector to the current mouse x and y
        mVector1.x = mouseX;
        mVector1.y = mouseY;
    } else {
        //Update the mouse vector to the current mouse x and y
        mVector1.x = mouseX;
        mVector1.y = mouseY;
    }
}

//This is a panel for drawing the panel behind the controls
function controls() {
    //This draws a background panel for the controls
    fill(50);
    stroke(50);
    rectMode(CENTER);
    rect(170, 25, 340, 50);

    //This creates the text labels for the controls
    stroke(255);
    fill(255);
    text("r a n d", 28, 42);
    text("m o d   1", 112, 41);
    text("m o d   2", 222, 41);
    text("v i s", 305, 41);
}

//This is a function for checking which visual to trigger
function stateCheck() {
    //This sets the in the first 10 seconds, the load screen will show then switch
    if (playHead <= 120) {
        loadScreen = true;
    } else {
        //This checks the position of the vis switch to switch between the visualisations
        loadScreen = false;
        if (visualSketch) {
            doorbellArp = false;
            scattyArp = true;
        } else {
            doorbellArp = true;
            scattyArp = false;
        }
    }

}

function mapValue(value, istart, istop, ostart, ostop) {
    return (ostart + (ostop - ostart) * ((value - istart) / (istop - istart))) ;
};