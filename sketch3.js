let shoe;
let shoeAni;
let sneakers;
let templatecsv;
let sneakercsv;

let DMSans;
let Vollkorn;

let currentIndex = 0;
let toggleButton;
let expandCircles = false;
let cumulativeEffectToggle;

let sneakerCheckbox, dressShoesCheckbox, sandalsCheckbox;
let lever;
let consumerEngaged = false;

let cycleInterval = 30; // Number of frames to wait before cycling to the next row

function preload() {
    DMSans = loadFont('fonts/DMSans.ttf');
    Vollkorn = loadFont('fonts/Vollkorn.ttf');
    templatecsv = loadTable('data/FTCtemplateSame.csv', 'csv','header');
    sneakercsv = loadTable('data/Sneaker_data.csv', 'csv','header');
    sneakers = loadImage('img/sneakers2.png');
}

function setup() {
    createCanvas(1910, 1200);
    colorMode(HSB, 360, 100, 100, 100);
    angleMode(DEGREES);
    background(0, 0, 180);
    world.gravity.y = 0;
    textFont(DMSans);

    toggleButton = createButton('mass of one pair of running shoes (incl. packaging) (%)');
    toggleButton.position(50, 280);
    toggleButton.mousePressed(toggleRow);

    cumulativeEffectToggle = createButton('Toggle Cumulative Effect');
    cumulativeEffectToggle.position(50, 320);
    cumulativeEffectToggle.mousePressed(toggleCumulativeEffect);

    sneakerCheckbox = createCheckbox('Sneakers', true);
    sneakerCheckbox.position(50, 360);
    dressShoesCheckbox = createCheckbox('Dress Shoes', false);
    dressShoesCheckbox.position(50, 380);
    sandalsCheckbox = createCheckbox('Sandals', false);
    sandalsCheckbox.position(50, 400);

    lever = createSlider(0, 1, 0, 1);
    lever.position(50, 440);
    lever.input(toggleConsumerEngagement);
}

function toggleRow() {
    currentIndex = (currentIndex + 1) % sneakercsv.getRowCount();
    updateButtonLabel();
}

function toggleCumulativeEffect() {
    expandCircles = !expandCircles;
}

function toggleConsumerEngagement() {
    consumerEngaged = lever.value() === 1;
}

function updateButtonLabel() {
    let row = sneakercsv.getRow(currentIndex);
    let firstColumnText = row.getString(0); // Assuming the first column is at index 0
    toggleButton.html(firstColumnText);
    toggleButton.style('font-family', 'DMSans');
    toggleButton.style('font-size', '24px');
}

function drawData() {
    let xOffset = 100;
    let yOffset = 100;
    let spacing = 150;

    if (sneakercsv.rows.length > 0) {
        let row = sneakercsv.getRow(currentIndex);

        let rawMaterialsAmount = row.getNum('raw materials');
        let manufacturingAmount = row.getNum('manufacturing');
        let postIndustrialWasteAmount = row.getNum('post-industrial waste');
        let shoeUseAmount = row.getNum('shoe use');
        let wholeShoeReuseAmount = row.getNum('whole shoe reuse');
        let repairAmount = row.getNum('repair');
        let landfillAmount = row.getNum('landfill');
        let takebackAmount = row.getNum('takeback and collection');
        let materialReuseAmount = row.getNum('material reuse in other industries');
        let shoeBreakdownAmount = row.getNum('shoe breakdown to material');

        let polyurethaneAmount = row.getNum('polyurethane');
        let pulpAmount = row.getNum('pulp');
        let polyesterAmount = row.getNum('polyester');
        let olefinCopolymerAmount = row.getNum('olefin copolymer');
        let dieneRubberAmount = row.getNum('diene rubber');
        let EVAAmount = row.getNum('EVA');
        let thermoplasticElastomerAmount = row.getNum('thermoplastic elastomer');
        let nylonAmount = row.getNum('nylon');
        let carbonBlackAmount = row.getNum('carbon black');
        let PPGAmount = row.getNum('PPG');
        let otherAmount = row.getNum('other');

        let upperAmount = row.getNum('upper');
        let midsoleAmount = row.getNum('midsole');
        let outsoleAmount = row.getNum('outsole');
        let trussticAmount = row.getNum('trusstic');
        let gelAmount = row.getNum('gel');
        let sockliningAmount = row.getNum('socklining');
        let otherSoleAmount = row.getNum('other (sole)');
        let otherPackagingAmount = row.getNum('other (including packaging)');

        let percentageFactor = expandCircles ? 10000 : 250;
        let rawMaterials = rawMaterialsAmount * 0.4;
        let manufacturing = manufacturingAmount * 0.4;
        let postIndustrialWaste  = postIndustrialWasteAmount * 0.4;
        let shoeUse  = shoeUseAmount * 0.2;
        let wholeShoeReuse  = wholeShoeReuseAmount * 0.2;
        let repair  = repairAmount * 0.2;
        let landfill  = landfillAmount * 0.4;
        let takeback  = takebackAmount * 0.2;
        let materialReuse  = materialReuseAmount * 0.2;
        let shoeBreakdown  = shoeBreakdownAmount * 0.2;

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

        let rawMaterialsOut = rawMaterialsAmount * 0.25;
        let manufacturingOut = manufacturingAmount * 0.25;
        let postIndustrialWasteOut = postIndustrialWasteAmount * 0.25;
        let shoeUseOut = shoeUseAmount * 0.25;
        let wholeShoeReuseOut = wholeShoeReuseAmount * 0.25;
        let repairOut = repairAmount * 0.25;
        let landfillOut = landfillAmount * 0.25;
        let takebackOut = takebackAmount * 0.25;
        let materialReuseOut = materialReuseAmount * 0.25;
        let shoeBreakdownOut = shoeBreakdownAmount * 0.25;

        let outDiameters = [
            rawMaterialsOut, manufacturingOut, postIndustrialWasteOut, shoeUseOut, wholeShoeReuseOut, repairOut, landfillOut, 
            takebackOut, materialReuseOut, shoeBreakdownOut
        ];

        let positions = [
            {x: 200, y: 500, label: 'raw materials'},
            {x: 950, y: 200, label: 'manufacturing'},
            {x: 1800, y: 200, label: 'post-industrial waste'},
            {x: 1600, y: 500, label: 'shoe use'},
            {x: 1750, y: 650, label: 'whole shoe reuse'},
            {x: 1550, y: 880, label: 'repair'},
            {x: 1800, y: 950, label: 'landfill'},
            {x: 1200, y: 990, label: 'takeback and collection'},
            {x: 600, y: 1000, label: 'material reuse in other industries'},
            {x: 780, y: 850, label: 'shoe breakdown to material'}
        ];

        let diameters = [
            rawMaterials, manufacturing, postIndustrialWaste , shoeUse , wholeShoeReuse , 
            repair , landfill , takeback , materialReuse , shoeBreakdown 
        ];

        noStroke();

        for (let i = 0; i < positions.length; i++) {
            let color;
            switch (positions[i].label) {
                case 'raw materials':
                    color = '#424BEF'; // Blue
                    break;
                case 'manufacturing':
                case 'takeback and collection':
                case 'material reuse in other industries':
                case 'shoe breakdown to material':
                    color = '#0B6046'; // Dark Green
                    break;
                case 'shoe use':
                case 'whole shoe reuse':
                case 'repair':
                    color = '#D3C6FF'; // Lilac
                    break;
                case 'post-industrial waste':
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
            text(positions[i].label, positions[i].x, positions[i].y + diameters[i] / 2 + 25);
            fill(color);
        }

        let materialDiameters = [
            polyurethane, pulp, polyester, olefinCopolymer, dieneRubber, EVA, thermoplasticElastomer, nylon, carbonBlack, PPG, other
        ];
        let numMaterials = materialDiameters.length;

        let centerX = 200;
        let centerY = 500;
        let radius = 150;

        let angleStep = 360 / numMaterials;

        let materialPositions = [];
        for (let i = -180; i < numMaterials; i++) {
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

        let manufacturingDiameters = [
            upper, midsole, outsole, trusstic, gel, socklining, otherSole, otherPackaging
        ];
        let numManufacturing = manufacturingDiameters.length;

        let centerX2 = 950;
        let centerY2 = 200;
        let radius2 = 150;

        let angleStep2 = 360 / numManufacturing;

        let manufacturingPositions = [];
        for (let i = -180; i < numManufacturing; i++) {
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
}

function draw() {
    clear();
    let scaleFactor = min(width / sneakers.width, height / sneakers.height);
    let imgWidth = sneakers.width * scaleFactor * 0.6;
    let imgHeight = sneakers.height * scaleFactor * 0.6;
    image(sneakers, width / 2 - imgWidth / 2, height / 2 - imgHeight / 2 + 50, imgWidth, imgHeight);

    translate(0, 70);

    noFill();
    strokeWeight(2);
    stroke(80);
    drawingContext.setLineDash([10, 5, 2, 5]);

    stroke(20);
    drawingContext.setLineDash([0]);

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
        if (consumerEngaged) {
            curveVertex(1650, 600);
            curveVertex(1700, 700);
        }
        curveVertex(1750, 650); // reuse
        curveVertex(1600, 850); // repair
        curveVertex(1300, 980); // takeback
        curveVertex(1100, 1000); // close loop
        curveVertex(1100, 1000); // close loop
    endShape();

    if (!consumerEngaged) {
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
    }

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
    text('consumer use', 175, 195);

    let d = 20;
    noStroke();
    fill(0, 20, 20);

    if (mouseIsPressed) {
        ellipse(mouseX, mouseY, d, d);
    }
}
