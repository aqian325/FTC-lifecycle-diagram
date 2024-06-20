let shoe;
let shoeAni;
let sneakers;
let templatecsv;
let sneakercsv;

let DMSans;
let Vollkorn;

let currentIndex = 0;
let toggleButton;

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
    toggleButton = createButton('mass of one pair of running shoes (incl. packaging) (%)');
    toggleButton.position(50, 250);
    toggleButton.mousePressed(toggleRow);
}

function toggleRow() {
    currentIndex = (currentIndex + 1) % sneakercsv.getRowCount();
    updateButtonLabel();
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

    // if (templatecsv.rows.length > 0) {
    //     let row = templatecsv.rows[currentIndex];

    //     let manufacturingAmount = row.getNum('manufacturing');
    //     let retailAmount = row.getNum('retail');
    //     let useAmount = row.getNum('use');
    //     let repairAmount = row.getNum('repair');
    //     let landfillAmount = row.getNum('landfill');
    //     let takebackAmount = row.getNum('takeback');
    //     let recyclingAmount = row.getNum('recycling');
    //     let newMaterialsAmount = row.getNum('new-materials');

    //     let manufacturingDiameter = manufacturingAmount * 0.2;
    //     let retailDiameter = retailAmount * 0.2;
    //     let useDiameter = useAmount * 0.2;
    //     let repairDiameter = repairAmount * 0.25;
    //     let landfillDiameter = landfillAmount * 0.2;
    //     let takebackDiameter = takebackAmount * 0.2;
    //     let recyclingDiameter = recyclingAmount * 0.2;
    //     let newMaterialsDiameter = newMaterialsAmount * 0.2;

	// 	let manufacturingOut = manufacturingAmount * 0.25;
    //     let retailOut = retailAmount * 0.25;
    //     let useOut = useAmount * 0.25;
    //     let repairOut = repairAmount * 0.25;
    //     let landfillOut = landfillAmount * 0.25;
    //     let takebackOut = takebackAmount * 0.25;
    //     let recyclingOut = recyclingAmount * 0.25;
    //     let newMaterialsOut = newMaterialsAmount * 0.25;

    //     // let EVA, foam, textiles, cotton, leather, rubber;
    //     // let insole, lining, vamp, upper, quarter, midsole, outsole, laces;

    //     let EVAAmount = row.getNum('EVA');
    //     let foamAmount = row.getNum('retail');
    //     let textilesAmount = row.getNum('textiles');
    //     // let cottonAmount = row.getNum('cotton');
    //     // let leatherAmount = row.getNum('leather');
    //     let rubberAmount = row.getNum('rubber');

    //     let insoleAmount = row.getNum('insole');
    //     let liningAmount = row.getNum('lining');
    //     // let vampAmount = row.getNum('vamp');
    //     let upperAmount = row.getNum('upper');
    //     let midsoleAmount = row.getNum('midsole');
    //     // let outsoleAmount = row.getNum('outsole');
    //     let lacesAmount = row.getNum('laces');

    //     let EVA = EVAAmount * 0.12;
    //     let foam = foamAmount * 0.12;
    //     let textiles = textilesAmount * 0.12;
    //     // let cotton = cottonAmount * 0.2;
    //     // let leather = leatherAmount * 0.2;
    //     let rubber = rubberAmount * 0.12;

    //     let insole = insoleAmount * 0.12;
    //     let lining = liningAmount * 0.12;
    //     // let vamp = vampAmount * 0.2;
    //     let upper = upperAmount * 0.12;
    //     let midsole = midsoleAmount * 0.12;
    //     // let outsole = outsoleAmount * 0.2;
    //     let laces = lacesAmount * 0.12;
	
	if (sneakercsv.rows.length > 0) {
		let row = sneakercsv.rows[currentIndex];
	
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
	
		// Material categories
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
	
		// Shoe parts categories
		let upperAmount = row.getNum('upper');
		let midsoleAmount = row.getNum('midsole');
		let outsoleAmount = row.getNum('outsole');
		let trussticAmount = row.getNum('trusstic');
		let gelAmount = row.getNum('gel');
		let sockliningAmount = row.getNum('socklining');
		let otherSoleAmount = row.getNum('other (sole)');
		let otherPackagingAmount = row.getNum('other (including packaging)');
	
		// Compute Diameters
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
	
		let percentageFactor = 250;

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
	
		// Compute outer diameters
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
	
		// let polyurethaneOut = polyurethaneAmount * 0.25;
		// let pulpOut = pulpAmount * 0.25;
		// let polyesterOut = polyesterAmount * 0.25;
		// let olefinCopolymerOut = olefinCopolymerAmount * 0.25;
		// let dieneRubberOut = dieneRubberAmount * 0.25;
		// let EVAOut = EVAAmount * 0.25;
		// let thermoplasticElastomerOut = thermoplasticElastomerAmount * 0.25;
		// let nylonOut = nylonAmount * 0.25;
		// let carbonBlackOut = carbonBlackAmount * 0.25;
		// let PPGOut = PPGAmount * 0.25;
		// let otherOut = otherAmount * 0.25;
	
		// let upperOut = upperAmount * 0.25;
		// let midsoleOut = midsoleAmount * 0.25;
		// let outsoleOut = outsoleAmount * 0.25;
		// let trussticOut = trussticAmount * 0.25;
		// let gelOut = gelAmount * 0.25;
		// let sockliningOut = sockliningAmount * 0.25;
		// let otherSoleOut = otherSoleAmount * 0.25;
		// let otherPackagingOut = otherPackagingAmount * 0.25;
	

        noStroke();
        // fill('#DBFF9C');
		// let outDiameters = [
        //     manufacturingOut, retailOut, useOut, repairOut, landfillOut, takebackOut, recyclingOut, newMaterialsOut
        // ];


		
		let outDiameters = [
			rawMaterialsOut, manufacturingOut, postIndustrialWasteOut, shoeUseOut, wholeShoeReuseOut, repairOut, landfillOut, 
			takebackOut, materialReuseOut, shoeBreakdownOut
		];

		// let outDiameters = [
		// 	rawMaterialsOut, manufacturingOut, postIndustrialWasteOut, shoeUseOut, wholeShoeReuseOut, repairOut, landfillOut, 
		// 	takebackOut, materialReuseOut, shoeBreakdownOut, polyurethaneOut, pulpOut, polyesterOut, olefinCopolymerOut, 
		// 	dieneRubberOut, EVAOut, thermoplasticElastomerOut, nylonOut, carbonBlackOut, PPGOut, otherOut, upperOut, midsoleOut, 
		// 	outsoleOut, trussticOut, gelOut, sockliningOut, otherSoleOut, otherPackagingOut
		// ];

        // Circle positions for the grid system
        let positions = [
			{x: 200, y: 500, label: 'raw materials'},
            {x: 950, y: 200, label: 'manufacturing'},
			{x: 1800, y: 200, label: 'post-industrial waste'},
            {x: 1600, y: 500, label: 'shoe use'},
			{x: 1750, y: 650, label: 'whole shoe reuse'},
            {x: 1550, y: 880, label: 'repair'},
            {x: 1800, y: 950, label: 'landfill'},
            {x: 1200, y: 990, label: 'takeback and collection'},
            {x: 500, y: 1000, label: 'material reuse in other industries'},
			{x: 780, y: 850, label: 'shoe breakdown to material'},

			//raw materials --> manufacturing --> post-industrial waste || shoe use --> whole shoe reuse --> repair || landfill
			//takeback and collection --> material reuse in other industries || shoe breakdown to material --> raw materials

			// {x: 300, y: 50, label: 'EVA'},
            // {x: 300, y: 50, label: 'foam'},
            // {x: 1800, y: 600, label: 'textiles'},
            // {x: 1800, y: 200, label: 'rubber'},
            // {x: 1500, y: 1000, label: 'takeback'},
            // {x: 950, y: 1000, label: 'recycling'},
            // {x: 200, y: 600, label: 'new-materials'}
        ];

		// let diameters = [
		// 	rawMaterials, manufacturing, postIndustrialWaste , shoeUse , wholeShoeReuse , 
		// 	repair , landfill , takeback , materialReuse , shoeBreakdown 
		// ];

		let diameters = [
			rawMaterials, manufacturing, postIndustrialWaste , shoeUse , wholeShoeReuse , 
			repair , landfill , takeback , materialReuse , shoeBreakdown 
		];
        // let diameters = [
        //     manufacturingDiameter, useDiameter, repairDiameter, landfillDiameter, 
        //     takebackDiameter, recyclingDiameter, newMaterialsDiameter
        // ];


        // // Draw outer circles with larger diameters
        // for (let i = 0; i < (positions.length); i++) {
		// 	fill('#DBFF9C');
        //     ellipse(positions[i].x, positions[i].y, outDiameters[i]);
        // }

        // Draw inner circles and labels
        // fill('#424BEF');
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
			// stroke(0);
            // text(positions[i].label, positions[i].x, positions[i].y + diameters[i] / 2 + 25);
            text(positions[i].label, positions[i].x, positions[i].y + diameters[i] / 2 + 25);
            fill(color);
			noStroke();
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
		let radius = 160;  // Adjust as needed

		// Calculate the angle between each item
		let angleStep = 360 / numMaterials;

		// Calculate the positions
		let materialPositions = [];
		for (let i = -180; i < numMaterials; i++) {
			let angle = i * angleStep;
			let x = centerX + radius * cos(angle);
			let y = centerY + radius * sin(angle);
			materialPositions.push({ x: x, y: y, label: materialPositions[i] });
		}

		console.log(materialPositions);
        // let materialPositions = [

        //     {x: 475, y: 350, label: 'EVA'},
        //     {x: 550, y: 400, label: 'foam'},
        //     {x: 475, y: 500, label: 'textiles'},
        //     // {x: 200, y: 650, label: 'cotton'},
        //     // {x: 125, y: 600, label: 'leather'},
        //     {x: 400, y: 400, label: 'rubber'}
        // ];

        for (let i = 0; i < materialPositions.length; i++) {
			fill('#424BEF');
            ellipse(materialPositions[i].x, materialPositions[i].y, materialDiameters[i]);
            fill(0);
            textAlign(CENTER);
			textSize(12);
            let label = ["polyurethane", "pulp", "polyester", "olefin copolymer", "diene rubber", "EVA", "thermoplastic elastomer", "nylon", "carbon black", "PPG", "other"][i];
            text(label, materialPositions[i].x, materialPositions[i].y + materialDiameters[i] / 2 + 15);
            fill('#424BEF');
        }


        // Positions and diameters for additional circles around "manufacturing"
		let manufacturingDiameters = [
			upper, midsole, outsole, trusstic, gel, socklining, otherSole, otherPackaging
        ];
		let numManufacturing = manufacturingDiameters.length;

		// Center of the ring
		let centerX2 = 950; // Adjust as needed
		let centerY2 = 200;  // Adjust as needed

		// Radius of the ring
		let radius2 = 150;  // Adjust as needed

		// Calculate the angle between each item
		let angleStep2 = 360 / numManufacturing;

		// Calculate the positions
		let manufacturingPositions = [];
		for (let i = 0; i < numManufacturing; i++) {
			let angle2 = i * angleStep2;
			let x = centerX2 + radius2 * cos(angle2+220);
			let y = centerY2 + radius2 * sin(angle2+220);
			manufacturingPositions.push({ x: x, y: y, label: manufacturingPositions[i] });
		}

		console.log(manufacturingPositions);
        // let manufacturingPositions = [
        //     {x: 900, y: 50, label: 'insole'},
        //     {x: 1000, y: 50, label: 'lining'},
        //     // {x: 1050, y: 150, label: 'vamp'},
        //     // {x: 950, y: 200, label: 'upper'},
        //     {x: 800, y: 150, label: 'midsole'},
        //     // {x: 850, y: 50, label: 'outsole'},
        //     {x: 1100, y: 150, label: 'laces'}
        // ];

        for (let i = 0; i < manufacturingPositions.length; i++) {
			fill('#0B6046');
            ellipse(manufacturingPositions[i].x, manufacturingPositions[i].y, manufacturingDiameters[i]);
            fill(0);
            textAlign(CENTER);
			textSize(12);
            let label = ["upper", "midsole", "outsole", "trusstic", "gel", "socklining", "other (sole)", "packaging"][i];
            text(label, manufacturingPositions[i].x, manufacturingPositions[i].y + manufacturingDiameters[i] / 2 + 15);
            fill('#0B6046');
        }

    // Additional set of circles around "material reuse in other industries"
    let materialReuseDiameters = materialDiameters;
    let centerX3 = 500;
    let centerY3 = 1000;
    let radius3 = 100;
    let angleStep3 = (360 / numMaterials);
    let materialReusePositions = [];
    for (let i = 0; i < numMaterials; i++) {
        let angle3 = i * angleStep3;
        let x = centerX3 + radius3 * cos(angle3+220);
        let y = centerY3 + radius3 * sin(angle3+220);
        materialReusePositions.push({ x: x, y: y, label: materialReusePositions[i] });
    }

    for (let i = 0; i < materialReusePositions.length; i++) {
        fill(0);
        ellipse(materialReusePositions[i].x, materialReusePositions[i].y, 0.6*materialReuseDiameters[i]);
        fill(0);
        textAlign(CENTER);
        textSize(12);
        let label = ["polyurethane", "pulp", "polyester", "olefin copolymer", "diene rubber", "EVA", "thermoplastic elastomer", "nylon", "carbon black", "PPG", "other"][i];
        text(label, materialReusePositions[i].x, materialReusePositions[i].y + materialReuseDiameters[i] / 2 + 7);
        fill(0);
    }

    // Additional set of circles around "shoe breakdown to material"
    let shoeBreakdownDiameters = manufacturingDiameters;
    let centerX4 = 780;
    let centerY4 = 850;
    let radius4 = 90;
    let angleStep4 = 360 / numManufacturing;
    let shoeBreakdownPositions = [];
    for (let i = 0; i < numManufacturing; i++) {
        let angle4 = i * angleStep4;
        let x = centerX4 + radius4 * cos(angle4+240);
        let y = centerY4 + radius4 * sin(angle4+240);
        shoeBreakdownPositions.push({ x: x, y: y, label: shoeBreakdownPositions[i] });
    }

    for (let i = 0; i < shoeBreakdownPositions.length; i++) {
        fill('#0B6046');
        ellipse(shoeBreakdownPositions[i].x, shoeBreakdownPositions[i].y, 0.6*shoeBreakdownDiameters[i]);
        fill(0);
        textAlign(CENTER);
        textSize(12);
        let label = ["upper", "midsole", "outsole", "trusstic", "gel", "socklining", "other (sole)", "packaging"][i];
        text(label, shoeBreakdownPositions[i].x, shoeBreakdownPositions[i].y + shoeBreakdownDiameters[i] / 2 + 5);
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
		curveVertex(1800,200);
		curveVertex(1800,600);
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
		curveVertex(500,1100);
		curveVertex(500,950);
		curveVertex(750,850);
		curveVertex(820,850);
		curveVertex(1100,1000);
		curveVertex(950,1050);
		curveVertex(800,1000);
		curveVertex(500,1000);
		curveVertex(500,700);
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
