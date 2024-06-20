let shoe;
let shoeAni;
let sneakers, dressShoes, sandals;
let templatecsv, sneakercsv;

let DMSans, Vollkorn;

let currentIndex = 0;
let toggleButton;
let growthSlider;

let sneakerCheckbox, dressShoesCheckbox, sandalsCheckbox;
let consumerEngaged = false;

let rawMaterials, manufacturing, postIndustrialWaste, shoeUse, wholeShoeReuse, repair, landfill, takeback, materialReuse, shoeBreakdown;
let polyurethane, pulp, polyester, olefinCopolymer, dieneRubber, EVA, thermoplasticElastomer, nylon, carbonBlack, PPG, other;
let upper, midsole, outsole, trusstic, gel, socklining, otherSole, otherPackaging;

let cycleInterval = 30;

function preload() {
    DMSans = loadFont('fonts/DMSans.ttf');
    Vollkorn = loadFont('fonts/Vollkorn.ttf');
    templatecsv = loadTable('data/FTCtemplateSame.csv', 'csv', 'header');
    sneakercsv = loadTable('data/Sneaker_data.csv', 'csv', 'header');
    sneakers = loadImage('img/sneakers3.png');
    dressShoes = loadImage('img/dress2.png');
    sandals = loadImage('img/sandals2.png');
}

function setup() {
    createCanvas(1910, 1200);
    colorMode(HSB, 360, 100, 100, 100);
    angleMode(DEGREES);
    background(0, 0, 180);
    world.gravity.y = 0;
    textFont(DMSans);

    // toggleButton = createButton('mass of one pair of running shoes (incl. packaging) (%)');
    // toggleButton.position(50, 260);
    // toggleButton.mousePressed(toggleRow);

    growthSlider = select('#growthSlider');
    growthSlider.input(updateGrowth);

    sneakerCheckbox = createCheckbox('sneakers', true);
    sneakerCheckbox.position(50, 220);
    dressShoesCheckbox = createCheckbox('dress shoes', false);
    dressShoesCheckbox.position(180, 220);
    sandalsCheckbox = createCheckbox('sandals', false);
    sandalsCheckbox.position(340, 220);

    sneakerCheckbox.changed(() => handleCheckboxChange(sneakerCheckbox, [dressShoesCheckbox, sandalsCheckbox]));
    dressShoesCheckbox.changed(() => handleCheckboxChange(dressShoesCheckbox, [sneakerCheckbox, sandalsCheckbox]));
    sandalsCheckbox.changed(() => handleCheckboxChange(sandalsCheckbox, [sneakerCheckbox, dressShoesCheckbox]));
}

function toggleRow() {
    currentIndex = (currentIndex + 1) % sneakercsv.getRowCount();
    updateButtonLabel();
}

function updateGrowth() {
    redraw();
}

function updateButtonLabel() {
    let row = sneakercsv.getRow(currentIndex);
    let firstColumnText = row.getString(0);
    toggleButton.html(firstColumnText);
    toggleButton.style('font-family', 'DMSans');
    toggleButton.style('font-size', '24px');
}

function handleCheckboxChange(checkbox, otherCheckboxes) {
    if (checkbox.checked()) {
        otherCheckboxes.forEach(cb => cb.checked(false));
    }
    updateDiagram();
}

function updateDiagram() {
    redraw();
}

function drawData() {
    let xOffset = 100;
    let yOffset = 100;
    let spacing = 150;

    let polyurethaneAmount, pulpAmount, polyesterAmount, olefinCopolymerAmount, dieneRubberAmount, EVAAmount, thermoplasticElastomerAmount, nylonAmount, carbonBlackAmount, PPGAmount, otherAmount;

    if (sneakerCheckbox.checked()) {
        let row = sneakercsv.getRow(currentIndex);

        polyurethaneAmount = row.getNum('polyurethane');
        pulpAmount = row.getNum('pulp');
        polyesterAmount = row.getNum('polyester');
        olefinCopolymerAmount = row.getNum('olefin copolymer');
        dieneRubberAmount = row.getNum('diene rubber');
        EVAAmount = row.getNum('EVA');
        thermoplasticElastomerAmount = row.getNum('thermoplastic elastomer');
        nylonAmount = row.getNum('nylon');
        carbonBlackAmount = row.getNum('carbon black');
        PPGAmount = row.getNum('PPG');
        otherAmount = row.getNum('other');

    } else if (dressShoesCheckbox.checked()) {
        polyurethaneAmount = 0.5;
        dieneRubberAmount = 0.2;
        pulpAmount = polyesterAmount = olefinCopolymerAmount = EVAAmount = thermoplasticElastomerAmount = nylonAmount = carbonBlackAmount = PPGAmount = otherAmount = 0;
        
    } else if (sandalsCheckbox.checked()) {
        dieneRubberAmount = 0.2;
        EVAAmount = 0.6;
        polyurethaneAmount = pulpAmount = polyesterAmount = olefinCopolymerAmount = thermoplasticElastomerAmount = nylonAmount = carbonBlackAmount = PPGAmount = otherAmount = 0;
    }

    let row = sneakercsv.getRow(currentIndex);

    let upperAmount = row.getNum('upper');
    let midsoleAmount = row.getNum('midsole');
    let outsoleAmount = row.getNum('outsole');
    let trussticAmount = row.getNum('trusstic');
    let gelAmount = row.getNum('gel');
    let sockliningAmount = row.getNum('socklining');
    let otherSoleAmount = row.getNum('other (sole)');
    let otherPackagingAmount = row.getNum('other (including packaging)');

    let percentageFactor = 1;

    let polyurethane = polyurethaneAmount * percentageFactor;
    let pulp = pulpAmount * percentageFactor;
    let polyester = polyesterAmount * percentageFactor;
    let olefinCopolymer = olefinCopolymerAmount * percentageFactor;
    let dieneRubber = dieneRubberAmount * percentageFactor;
    let EVA = EVAAmount * percentageFactor;
    let thermoplasticElastomer = thermoplasticElastomerAmount * percentageFactor;
    let nylon = nylonAmount * percentageFactor;
    let carbonBlack = carbonBlackAmount * percentageFactor;
    let PPG = PPGAmount * percentageFactor;
    let other = otherAmount * percentageFactor;

    let upper = upperAmount * percentageFactor;
    let midsole = midsoleAmount * percentageFactor;
    let outsole = outsoleAmount * percentageFactor;
    let trusstic = trussticAmount * percentageFactor;
    let gel = gelAmount * percentageFactor;
    let socklining = sockliningAmount * percentageFactor;
    let otherSole = otherSoleAmount * percentageFactor;
    let otherPackaging = otherPackagingAmount * percentageFactor;

    // New diameters based on the specified areas
    let rawMaterialsDiameter = Math.sqrt(10000 / Math.PI) * 2;
    let manufacturingDiameter = Math.sqrt(3000 / Math.PI) * 2;
    let postIndustrialWasteDiameter = Math.sqrt(7000 / Math.PI) * 2;
    let otherDiameter = Math.sqrt(3000 / Math.PI) * 2;

    // Get the scaling factor from the slider
    let scaleFactor = Math.sqrt(growthSlider.value());

    rawMaterialsDiameter *= scaleFactor;
    manufacturingDiameter *= scaleFactor;
    postIndustrialWasteDiameter *= scaleFactor;
    otherDiameter *= scaleFactor;

    // Compute diameters for all positions
    let diameters = [
        rawMaterialsDiameter,
        manufacturingDiameter,
        postIndustrialWasteDiameter,
        otherDiameter,
        otherDiameter,
        otherDiameter,
        otherDiameter,
        otherDiameter,
        otherDiameter,
        otherDiameter
    ];

    // Circle positions for the grid system
    let positions = [
        { x: 200, y: 500, label: 'raw materials' },
        { x: 950, y: 200, label: 'manufacturing' },
        { x: 1800, y: 200, label: 'post-industrial waste' },
        { x: 1600, y: 500, label: 'shoe use' },
        { x: 1750, y: 650, label: 'whole shoe reuse' },
        { x: 1550, y: 880, label: 'repair' },
        { x: 1800, y: 970, label: 'landfill' },
        { x: 1200, y: 990, label: 'takeback and collection' },
        { x: 600, y: 1000, label: 'material reuse in other industries' },
        { x: 780, y: 850, label: 'shoe breakdown to material' }
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

    let materialDiameters = [
        polyurethane, pulp, polyester, olefinCopolymer, dieneRubber, EVA, thermoplasticElastomer, nylon, carbonBlack, PPG, other
    ];
    let materialAngles = materialDiameters.map(d => d * 360);

    // pieChart(200, 500, 150, materialAngles);

    let manufacturingDiameters = [
        upper, midsole, outsole, trusstic, gel, socklining, otherSole, otherPackaging
    ];
    let manufacturingAngles = manufacturingDiameters.map(d => d * 360);

    // pieChart(950, 200, 150, manufacturingAngles);
}

function pieChart(xCenter, yCenter, diameter, angles) {
    let lastAngle = 0;
    let labelSize = 12;
    let rlabel = 1.1
    for (let i = 0; i < angles.length; i++) {
        let height = diameter / (0.005 * angles[i]);
        stroke(0);
        noFill();
        // fill(colors[i % colors.length]);
        arc(
            xCenter,
            yCenter,
            height,
            height,
            lastAngle,
            lastAngle + (angles[i])
        );
        // stroke(1);
        // fill(255, 255, 255, 240);
        textSize(labelSize);
        let wText = textWidth(String(angles[i]));
        let hText = textAscent() - textDescent();
        text(label[i],
             xCenter + cos(lastAngle + radians(angles[i] / 2)) * diameter * (rlabel / 2) - wText / 2,
             yCenter + sin(lastAngle + radians(angles[i] / 2)) * diameter * (rlabel / 2) + hText / 2);
        lastAngle += (angles[i]);
    }
}

function sum(array) {
    return array.reduce((acc, val) => acc + val, 0);
}

function draw() {
    clear();
    
    let selectedImage;
    if (sneakerCheckbox.checked()) {
        selectedImage = sneakers;
    } else if (dressShoesCheckbox.checked()) {
        selectedImage = dressShoes;
    } else if (sandalsCheckbox.checked()) {
        selectedImage = sandals;
    }
    
    if (selectedImage) {
        let scaleFactor = min(width / selectedImage.width, height / selectedImage.height);
        let imgWidth = selectedImage.width * scaleFactor * 0.6;
        let imgHeight = selectedImage.height * scaleFactor * 0.6;
        image(selectedImage, width / 2 - imgWidth / 2, height / 2 - imgHeight / 2 + 50, imgWidth, imgHeight);
    }

    translate(0, 70);

    noFill();
    strokeWeight(2);
    stroke(80);
    drawingContext.setLineDash([10, 5, 2, 5]);

    stroke(20);
    drawingContext.setLineDash([0]);

    translate(width / 2, height / 2);
    translate(-width / 2, -height / 2);

    beginShape();
        curveVertex(190, 600);
        curveVertex(200, 500);
        curveVertex(400, 300);
        curveVertex(600, 200);
        curveVertex(950, 200);
        curveVertex(1300, 200);
        bezierVertex(1500, 300);
        curveVertex(1600, 500);
        curveVertex(1750, 650);
        curveVertex(1600, 850);
        curveVertex(1300, 980);
        curveVertex(1100, 1000);
        curveVertex(1100, 1000);
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

    beginShape();
        curveVertex(950, 600);
        curveVertex(950, 200);
        curveVertex(1400, 50);
        curveVertex(1800, 200);
        curveVertex(1800, 600);
    endShape();

    beginShape();
        curveVertex(1600, 400);
        curveVertex(1600, 500);
        curveVertex(1670, 600);
        curveVertex(1650, 700);
        curveVertex(1550, 880);
        curveVertex(1500, 950);
    endShape();

    beginShape();
        curveVertex(600, 1100);
        curveVertex(600, 950);
        curveVertex(750, 850);
        curveVertex(820, 850);
        curveVertex(1100, 1000);
        curveVertex(950, 1050);
        curveVertex(800, 1000);
        curveVertex(600, 1000);
        curveVertex(600, 700);
    endShape();

    // beginShape();
    //     curveVertex(700, 1100);
    //     curveVertex(640, 1000);
    //     curveVertex(550, 1000);
    //     curveVertex(450, 950);
    //     curveVertex(350, 850);
    //     curveVertex(350, 650);
    //     curveVertex(250, 600);
    //     curveVertex(200, 500);
    //     curveVertex(100, 400);
    // endShape();

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

    strokeWeight(3);
    stroke(0);
    // beginShape();
    //     curveVertex(100, 200);
    //     curveVertex(355, 340);
    //     curveVertex(515, 470);
    //     curveVertex(660, 460);
    // endShape();

    // beginShape();
    //     curveVertex(1350, 600);
    //     curveVertex(1464, 598);
    //     curveVertex(1520, 530);
    //     curveVertex(1600, 540);
    //     curveVertex(1700, 600);
    // endShape();

    drawData();

    noFill();
    strokeWeight(1);
    stroke(0);
    textSize(20);

    noStroke();
    fill('#424BEF');
    ellipse(75, 50, 50);
    text('raw materials', 172, 55);

    fill('#0B6046');
    ellipse(75, 120, 50);
    text('infrastructure', 175, 125);

    fill('#D3C6FF');
    ellipse(75, 190, 50);
    fill(0);
    text('consumer use', 175, 195);
}
