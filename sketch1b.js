let shoe;
let shoeAni;
let sneakers;
let templatecsv;
let sneakercsv;

let DMSans;
let Vollkorn;

let currentIndex = 0;
let toggleButton;
let growthSlider;
// let isScaledUp = false;

let sneakerCheckbox, dressShoesCheckbox, sandalsCheckbox;
let lever;
let consumerEngaged = false;

//data categories
let rawMaterials, manufacturing, postIndustrialWaste, shoeUse, wholeShoeReuse, repair, landfill, takeback, materialReuse, shoeBreakdown;
let polyurethane, pulp, polyester, olefinCopolymer, dieneRubber, EVA, thermoplasticElastomer, nylon, carbonBlack, PPG, other;
let upper, midsole, outsole, trusstic, gel, socklining, otherSole, otherPackaging;

let cycleInterval = 30; // Number of frames to wait before cycling to the next row

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

    //shoeAni = loadAnimation(
    //    'img/yeezy.png',
    //    'img/huarache.png',
    //    'img/internationalist.png',
   // );
    //shoeAni.scale = 0.2;
    //shoeAni.frameDelay = 20;
    // Create a button to toggle between rows
    // toggleButton = createButton('mass of one pair of running shoes (incl. packaging) (%)');
    // toggleButton.position(50, 260);
    // toggleButton.mousePressed(toggleRow);

    // Create a slider to toggle growth
    growthSlider = select('#growthSlider');
    growthSlider.input(updateGrowth);

	// sneakerCheckbox = createCheckbox('sneakers', true);
    // sneakerCheckbox.position(50, 220);
    // dressShoesCheckbox = createCheckbox('dress shoes', false);
    // dressShoesCheckbox.position(180, 220);
    // sandalsCheckbox = createCheckbox('sandals', false);
    // sandalsCheckbox.position(340, 220);

    // lever = createSlider(0, 1, 0, 1);
    // lever.position(50, 440);
    // lever.input(toggleConsumerEngagement);
        // Initialize diameters with default values
        rawMaterialsDiameter = Math.sqrt(10000 / Math.PI) * 2;
        manufacturingDiameter = Math.sqrt(3000 / Math.PI) * 2;
        postIndustrialWasteDiameter = Math.sqrt(7000 / Math.PI) * 2;
        otherDiameter = Math.sqrt(3000 / Math.PI) * 2;
    
        // Draw the initial data
        drawData();
    
}

function toggleRow() {
    currentIndex = (currentIndex + 1) % sneakercsv.getRowCount();
    updateButtonLabel();
}
function toggleConsumerEngagement() {
    consumerEngaged = lever.value() === 1;
}
// function toggleGrowth() {
//     isScaledUp = !isScaledUp;
//     if (isScaledUp) {
//         growthToggleButton.html('550 million pairs of shoes');
//     } else {
//         growthToggleButton.html('one pair of shoes');
//     }
// }
function updateGrowth() {
    redraw(); // Redraw the canvas when the slider value changes
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
            {x: 200, y: 500, label: 'raw materials'},
            {x: 950, y: 200, label: 'manufacturing'},
            {x: 1750, y: 200, label: 'post-industrial waste'},
            {x: 1600, y: 500, label: 'shoe use'},
            {x: 1750, y: 650, label: 'whole shoe reuse'},
            {x: 1550, y: 880, label: 'repair'},
            {x: 1800, y: 980, label: 'landfill'},
            {x: 1200, y: 990, label: 'takeback and collection'},
            {x: 600, y: 990, label: 'material reuse in other industries'},
            {x: 790, y: 850, label: 'shoe breakdown to material'}
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
}


function draw() {
	// background(0);
    clear();
	// if (sneakers) {
	// 	image(sneakers, width / 2, height / 2);
	//   }

  	// Calculate the appropriate scale to fit the image within the canvas
  	let scaleFactor = min(width / sneakers.width, height / sneakers.height);
	
  	// Calculate the dimensions of the scaled image
 	let imgWidth = sneakers.width * scaleFactor*0.6;
  	let imgHeight = sneakers.height * scaleFactor*0.6;
	
  	// Draw the image at the center of the canvas
  	image(sneakers, width / 2 - imgWidth / 2, height / 2 - imgHeight / 2 + 50, imgWidth, imgHeight);

    translate(0, 70);
    //animation(shoeAni, width / 2, height / 2);

    noFill();
    strokeWeight(2);
    stroke(80);
    drawingContext.setLineDash([10, 5, 2, 5]);

    // line(width / 3, 0, width / 3, height);
    // line(width * 2 / 3, 0, width * 2 / 3, height);

    stroke(20);
    drawingContext.setLineDash([0]);

    // Draw the loop as a curved line instead of a circle
    let r = width * 0.20;
    let rFactor = 2;
    translate(width / 2, height / 2);
    // beginShape();
    // 	vertex(0, -r);
    // 	quadraticVertex(rFactor * r, -r, rFactor * 0.7* r, 0);
    // 	quadraticVertex(rFactor * r, r, 0, r);
    // 	quadraticVertex(-rFactor * r, r, -rFactor * r, 0);
   	// 	quadraticVertex(-rFactor * r, -r, 0, -r);
    // endShape();

	//{x: 200, y: 500, label: 'raw materials'},
	//{x: 950, y: 200, label: 'manufacturing'},
	//{x: 1800, y: 200, label: 'post-industrial waste'},
	//{x: 1600, y: 500, label: 'shoe use'},
	//{x: 1750, y: 650, label: 'whole shoe reuse'},

	//{x: 1600, y: 850, label: 'repair'},
	//{x: 1800, y: 950, label: 'landfill'},
	//{x: 1250, y: 950, label: 'takeback and collection'},
	//{x: 650, y: 950, label: 'material reuse in other industries'},
	//{x: 1000, y: 880, label: 'shoe breakdown to material'},



    translate(-width / 2, -height / 2);
    // ellipse(1650, 600, 350, 100);
	// ellipse(400,400,250,250);

	beginShape();
		curveVertex(190,600);
		curveVertex(200,500);//raw
		curveVertex(400,300);
		curveVertex(600,200);
		// curveVertex(700,190);
		curveVertex(950,200);//manu
		curveVertex(1300,200);
		// curveVertex(1300,250);
		// curveVertex(1400,300);
		bezierVertex(1500,300);
		// bezierVertex(1600,300);

		curveVertex(1600,500);//use
		curveVertex(1750,650);//reuse
		curveVertex(1600,850);//repair
		curveVertex(1300,980);//takeback
		curveVertex(1100,1000);//close loop
		curveVertex(1100,1000);//close loop

	endShape();

	beginShape();
		curveVertex(1400,600);
		curveVertex(1600,500);
		// curveVertex(1650,550);
		curveVertex(1850,550);
		curveVertex(1900,650);
		curveVertex(1850,800);
		curveVertex(1900,820);
		curveVertex(1800,1000);
		curveVertex(2000,1000);
	endShape();
	//landfill line
	// line(1500, 600, 1800, 1000);

	beginShape();
		curveVertex(950,600);
		curveVertex(950,200);
		curveVertex(1400,50);
		curveVertex(1750,200);
		curveVertex(1750,600);
	endShape();
	//manufacturing to post industrial waste

	beginShape();
		curveVertex(1600,400);
		curveVertex(1600,500);
		curveVertex(1670,600);
		curveVertex(1650,700);
		curveVertex(1550,880);
		curveVertex(1500,950);

	// 	curveVertex(1400,500);
	// 	curveVertex(1600,500);
	// 	curveVertex(1700,600);
	// 	curveVertex(1800,600);
	// 	curveVertex(1600,850);
	// 	curveVertex(1500,900);
	// 	curveVertex(1300,950);
	// 	curveVertex(1250,950);
	// 	curveVertex(1250,950);
	endShape();
	//shoe use to repair cycle

	beginShape();
		curveVertex(600,1200);
		curveVertex(600,990);
		curveVertex(750,900);
		curveVertex(790,840);
		curveVertex(1100,1000);
		curveVertex(950,1050);
		curveVertex(800,990);
		curveVertex(600,980);
		curveVertex(600,800);
	endShape();
	//material reuse to shoe breakdown

	// beginShape();
	// 	curveVertex(700,1100);
	// 	curveVertex(640,1000);
	// 	curveVertex(550,1000);
	// 	curveVertex(450,950);
	// 	curveVertex(350,850);
	// 	curveVertex(350,650);
	// 	curveVertex(250,600);
	// 	curveVertex(200,500);
	// 	curveVertex(100,400);
	// endShape();
	// //material reuse to raw materials

	beginShape();
		curveVertex(800,850);
		curveVertex(760,840);
		curveVertex(550,830);
		curveVertex(450,620);
		curveVertex(380,610);
		curveVertex(350,550);
		curveVertex(250,600);
		curveVertex(200,500);
		curveVertex(100,400);
	endShape();
	//shoe breakdown to raw materials
	
	strokeWeight(3);
	stroke(0);
	// beginShape();
	// 	curveVertex(100,200);
	// 	curveVertex(355,340);
	// 	curveVertex(515,470);
	// 	curveVertex(660,460);
	// 	// curveVertex(650,400);
	// 	// curveVertex(700,400);
	// endShape();
	// //left shoelace

	// beginShape();
	// 	curveVertex(1350,600);
	// 	curveVertex(1464,598);
	// 	curveVertex(1520,530);
	// 	curveVertex(1600,540);
	// 	curveVertex(1700,600);

	// 	// curveVertex(700,400);
	// endShape();
	// //right shoelace

    drawData();

    noFill();
    strokeWeight(1);
    stroke(0);
    textSize(20);

	noStroke();
    fill('#424BEF');
	ellipse(75,50,50);
    text('raw materials', 172, 55);

    fill('#0B6046');
	ellipse(75,120,50);
    text('infrastructure', 175, 125);

    fill('#D3C6FF');
	ellipse(75,190,50);
    fill(0);
    text('consumer use', 175, 195);

    // if (frameCount % cycleInterval === 0) {
    //     currentIndex = (currentIndex + 1) % sneakercsv.getRowCount();
    // }

    let d = 20;
    noStroke();
    fill(0, 20, 20);

    if (mouseIsPressed) {
        ellipse(mouseX, mouseY, d, d);
    }

    // // Add square color palette for reference
    // fill('#DBFF9C');
    // square(50, 10, 40);
	// //light green
    // fill('#0B6046');
    // square(50, 50, 40);
	// //dark green
    // fill('#D3C6FF');
    // square(50, 90, 40);
	// //lilac
    // fill('#424BEF');
    // square(50, 130, 40);
	// //blue
}
