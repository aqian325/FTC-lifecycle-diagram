let shoe;
let shoeAni;
let sneakers;
let templatecsv;
let sneakercsv;

let DMSans;
let Vollkorn;

let currentIndex = 0;
let toggleButton;
// let isScaledUp = false;

let sneakerCheckbox, dressShoesCheckbox, sandalsCheckbox;
// let lever;
let consumerEngaged = false;
// let otherDiameterOriginal, landfillDiameterOriginal;
let otherDiameter = 0;
let landfillDiameter = 0;
let takebackDiameter = 0;
let materialReuseDiameter = 0;
let shoeBreakdownDiameter = 0;
let manufacturingDiameter = 0;

let otherDiameterOriginal;
let landfillDiameterOriginal;
let takebackDiameterOriginal;
let materialReuseDiameterOriginal;
let shoeBreakdownDiameterOriginal;
let manufacturingDiameterOriginal;

//data categories
let rawMaterials, manufacturing, postIndustrialWaste, shoeUse, wholeShoeReuse, repair, landfill, takeback, materialReuse, shoeBreakdown;
let polyurethane, pulp, polyester, olefinCopolymer, dieneRubber, EVA, thermoplasticElastomer, nylon, carbonBlack, PPG, other;
let upper, midsole, outsole, trusstic, gel, socklining, otherSole, otherPackaging;

let cycleInterval = 30; // Number of frames to wait before cycling to the next row

document.addEventListener("DOMContentLoaded", function() {
    let toggleSwitch = document.querySelector('#toggleSwitch');
    toggleSwitch.addEventListener('change', handleToggleChange);

    preload();
    setup();
});

function preload() {
    DMSans = loadFont('fonts/DMSans.ttf');
    Vollkorn = loadFont('fonts/Vollkorn.ttf');
    templatecsv = loadTable('data/FTCtemplateSame.csv', 'csv','header');
	sneakercsv = loadTable('	data/Sneaker_data.csv', 'csv','header');
	sneakers = loadImage('img/sneakers3.png');
}

function setup() {
    createCanvas(1910, 1200);
    colorMode(HSB, 360, 100, 100, 100);
    angleMode(DEGREES);
    background(0, 0, 180);
    world.gravity.y = 0;
    textFont(DMSans);

    // Get the original diameters
    otherDiameterOriginal = Math.sqrt(6000 / Math.PI) * 3;
    landfillDiameterOriginal = Math.sqrt(10000 / Math.PI) * 3;
    takebackDiameterOriginal = Math.sqrt(3000 / Math.PI) * 3;
    materialReuseDiameterOriginal = Math.sqrt(3000 / Math.PI) * 3;
    shoeBreakdownDiameterOriginal = Math.sqrt(3000 / Math.PI) * 3;
    manufacturingDiameterOriginal = Math.sqrt(3000 / Math.PI) * 3;

    // Initial diameter values
    otherDiameter = otherDiameterOriginal;
    landfillDiameter = landfillDiameterOriginal;
    takebackDiameter = takebackDiameterOriginal;
    materialReuseDiameter = materialReuseDiameterOriginal;
    shoeBreakdownDiameter = shoeBreakdownDiameterOriginal;
    manufacturingDiameter = manufacturingDiameterOriginal;

    noLoop(); // Only redraw when necessary
}

function handleToggleChange() {
    let toggleLabel = document.querySelector('#toggleLabel');

    if (toggleSwitch.checked) {
        toggleLabel.textContent = 'engaged consumer';
        animateDiameterChange(
            otherDiameterOriginal,
            otherDiameterOriginal * 1,
            landfillDiameterOriginal,
            landfillDiameterOriginal / 2,
            takebackDiameterOriginal,
            takebackDiameterOriginal * 2,
            materialReuseDiameterOriginal,
            materialReuseDiameterOriginal * 2,
            shoeBreakdownDiameterOriginal,
            shoeBreakdownDiameterOriginal * 2,
            10000
        );
    } else {
        toggleLabel.textContent = 'unengaged consumer';
        animateDiameterChange(
            otherDiameterOriginal * 1,
            otherDiameterOriginal,
            landfillDiameterOriginal / 2,
            landfillDiameterOriginal,
            takebackDiameterOriginal * 2,
            takebackDiameterOriginal,
            materialReuseDiameterOriginal * 2,
            materialReuseDiameterOriginal,
            shoeBreakdownDiameterOriginal * 2,
            shoeBreakdownDiameterOriginal,
            10000
        );
    }
}

function animateDiameterChange(
    startOther,
    endOther,
    startLandfill,
    endLandfill,
    startTakeback,
    endTakeback,
    startMaterialReuse,
    endMaterialReuse,
    startShoeBreakdown,
    endShoeBreakdown,
    duration
) {
    let startTime = millis();

    function updateDiameter() {
        let elapsedTime = millis() - startTime;
        let progress = constrain(elapsedTime / duration, 0, 1);

        otherDiameter = lerp(startOther, endOther, progress);
        landfillDiameter = lerp(startLandfill, endLandfill, progress);
        takebackDiameter = lerp(startTakeback, endTakeback, progress);
        materialReuseDiameter = lerp(startMaterialReuse, endMaterialReuse, progress);
        shoeBreakdownDiameter = lerp(startShoeBreakdown, endShoeBreakdown, progress);

        redraw();

        if (progress < 1) {
            requestAnimationFrame(updateDiameter);
        }
    }

    updateDiameter();
}

function drawData() {
    let rawMaterialsDiameter = Math.sqrt(10000 / Math.PI) * 2;
    let postIndustrialWasteDiameter = Math.sqrt(7000 / Math.PI) * 2;

    // Compute diameters for all positions
    let diameters = [
        rawMaterialsDiameter,
        manufacturingDiameter,
        postIndustrialWasteDiameter,
        otherDiameter,
        otherDiameter,
        otherDiameter,
        landfillDiameter,
        takebackDiameter,
        materialReuseDiameter,
        shoeBreakdownDiameter
    ];

    // Circle positions for the grid system
    let positions = [
        {x: 200, y: 500, label: 'raw materials'},
        {x: 950, y: 200, label: 'manufacturing'},
        {x: 1800, y: 200, label: 'post-industrial waste'},
        {x: 1600, y: 500, label: 'shoe use'},
        {x: 1750, y: 650, label: 'whole shoe reuse'},
        {x: 1550, y: 880, label: 'repair'},
        {x: 1800, y: 1000, label: 'landfill'},
        {x: 1200, y: 990, label: 'takeback and collection'},
        {x: 500, y: 1000, label: 'material reuse in other industries'},
        {x: 780, y: 850, label: 'shoe breakdown to material'}
    ];

    noStroke();

    // Draw inner circles with specific colors and labels
    for (let i = 0; i < positions.length; i++) {
        let color;
        switch (positions[i].label) {
            case 'raw materials':
                color = '#424BEF'; // Blue
                break;
            case 'manufacturing':
            case 'takeback and collection':
            case 'shoe breakdown to material':
                color = '#0B6046'; // Dark Green
                break;
            case 'shoe use':
            case 'whole shoe reuse':
            case 'repair':
                color = '#D3C6FF'; // Lilac
                break;
            case 'post-industrial waste':
            case 'material reuse in other industries':
            case 'landfill':
                color = '#202020'; // gray
                break;
            default:
                color = '#DBFF9C'; // Light Green
        }
        fill(color);
        ellipse(positions[i].x, positions[i].y, diameters[i]);
        fill(0);
        textAlign(CENTER);
        textSize(20);
        text(positions[i].label, positions[i].x, positions[i].y + diameters[i] / 2 + 25);
        fill(color);
    }

    // Positions and diameters for additional circles around "new-materials"
    let materialDiameters = [
        polyurethane, pulp, polyester, olefinCopolymer, dieneRubber, EVA, thermoplasticElastomer, nylon, carbonBlack, PPG, other
    ];
    let numMaterials = materialDiameters.length;

    // Center of the ring
    let centerX = 200; // Adjust as needed
    let centerY = 500;  // Adjust as needed

    // Radius of the ring
    let radius = 150;  // Adjust as needed

    // Calculate the angle between each item
    let angleStep = 360 / numMaterials;

    // Calculate the positions
    let materialPositions = [];
    for (let i = 0; i < numMaterials; i++) {
        let angle = i * angleStep;
        let x = centerX + radius * cos(angle);
        let y = centerY + radius * sin(angle);
        materialPositions.push({ x: x, y: y });
    }

    for (let i = 0; i < materialPositions.length; i++) {
        fill('#424BEF');
        ellipse(materialPositions[i].x, materialPositions[i].y, materialDiameters[i]);
        fill(0);
        textAlign(CENTER);
        let label = ["polyurethane", "pulp", "polyester", "olefin copolymer", "diene rubber", "EVA", "thermoplastic elastomer", "nylon", "carbon black", "PPG", "other"][i];
        text(label, materialPositions[i].x, materialPositions[i].y + materialDiameters[i] / 2 + 20);
        fill('#424BEF');
    }

    // Positions and diameters for additional circles around "manufacturing"
    let manufacturingDiameters = [
        upper, midsole, outsole, trusstic, gel, socklining, otherSole, otherPackaging
    ];
    let numManufacturing = manufacturingDiameters.length;

    let centerX2 = 950; // Adjust as needed
    let centerY2 = 200;  // Adjust as needed

    let radius2 = 150;  // Adjust as needed

    let angleStep2 = 360 / numManufacturing;

    let manufacturingPositions = [];
    for (let i = 0; i < numManufacturing; i++) {
        let angle2 = i * angleStep2;
        let x = centerX2 + radius2 * cos(angle2);
        let y = centerY2 + radius2 * sin(angle2);
        manufacturingPositions.push({ x: x, y: y });
    }

    for (let i = 0; i < manufacturingPositions.length; i++) {
        fill('#0B6046');
        ellipse(manufacturingPositions[i].x, manufacturingPositions[i].y, manufacturingDiameters[i]);
        fill(0);
        textAlign(CENTER);
        let label = ["upper", "midsole", "outsole", "trusstic", "gel", "socklining", "other (sole)", "other (including packaging)"][i];
        text(label, manufacturingPositions[i].x, manufacturingPositions[i].y + manufacturingDiameters[i] / 2 + 30);
        fill('#0B6046');
    }
}

function draw() {
    clear();

    // Calculate the appropriate scale to fit the image within the canvas
    let scaleFactor = min(width / sneakers.width, height / sneakers.height);

    // Calculate the dimensions of the scaled image
    let imgWidth = sneakers.width * scaleFactor * 0.6;
    let imgHeight = sneakers.height * scaleFactor * 0.6;

    // Draw the image at the center of the canvas
    image(sneakers, width / 2 - imgWidth / 2, height / 2 - imgHeight / 2 + 50, imgWidth, imgHeight);

    translate(0, 70);

    noFill();
    strokeWeight(2);
    stroke(80);
    drawingContext.setLineDash([10, 5, 2, 5]);

    stroke(20);
    drawingContext.setLineDash([0]);

    // Draw the loop as a curved line instead of a circle
    let r = width * 0.20;
    let rFactor = 2;
    translate(width / 2, height / 2);

    translate(-width / 2, -height / 2);

    beginShape();
    curveVertex(190, 600);
    curveVertex(200, 500); // raw
    curveVertex(400, 300);
    curveVertex(600, 200);
    curveVertex(950, 200); // manu
    curveVertex(1300, 200);
    bezierVertex(1500, 300);
    curveVertex(1600, 500); // use
    curveVertex(1750, 650); // reuse
    curveVertex(1600, 850); // repair
    curveVertex(1300, 980); // takeback
    curveVertex(1100, 1000); // close loop
    curveVertex(1100, 1000); // close loop
    endShape();

    beginShape();
    curveVertex(1400, 600);
    curveVertex(1600, 500);
    curveVertex(1850, 550);
    curveVertex(1900, 650);
    curveVertex(1850, 800);
    curveVertex(1900, 820);
    curveVertex(1800, 1000);
    curveVertex(2000, 1000);
    endShape();
    // landfill line

    beginShape();
    curveVertex(950, 600);
    curveVertex(950, 200);
    curveVertex(1400, 50);
    curveVertex(1800, 200);
    curveVertex(1800, 600);
    endShape();
    // manufacturing to post industrial waste

    beginShape();
    curveVertex(1600, 400);
    curveVertex(1600, 500);
    curveVertex(1670, 600);
    curveVertex(1650, 700);
    curveVertex(1550, 880);
    curveVertex(1500, 950);
    endShape();
    // shoe use to repair cycle

    beginShape();
    curveVertex(500, 1100);
    curveVertex(500, 950);
    curveVertex(750, 850);
    curveVertex(820, 850);
    curveVertex(1100, 1000);
    curveVertex(950, 1050);
    curveVertex(800, 1000);
    curveVertex(500, 1000);
    curveVertex(500, 700);
    endShape();
    // material reuse to shoe breakdown

    beginShape();
    curveVertex(800, 850);
    curveVertex(760, 840);
    curveVertex(550, 830);
    curveVertex(450, 620);
    curveVertex(380, 610);
    curveVertex(350, 550);
    curveVertex(250, 600);
    curveVertex(200, 500);
    curveVertex(100, 400);
    endShape();
    // shoe breakdown to raw materials

    strokeWeight(3);
    stroke(0);

    drawData();

    noFill();
    strokeWeight(1);
    stroke(0);
    textSize(20);

    noStroke();
    fill('#424BEF');
    ellipse(75, 50, 30);
    text('raw materials', 172, 55);

    fill('#0B6046');
    ellipse(75, 100, 30);
    text('infrastructure', 175, 105);

    fill('#D3C6FF');
    ellipse(75, 150, 30);
    fill(0);
    text('consumer use', 175, 155);
}
