let shoe;
let shoeAni;
let templatecsv;

let DMSans;
let Vollkorn;

let manufacturing, postInfrastructure;
let shoeUse;
let material;

let EVA, foam, textiles, cotton, leather, rubber;
let insole, lining, vamp, upper, quarter, midsole, outsole, laces;

// let manufacturingData = [];
let currentIndex = 0;
let cycleInterval = 30; // Number of frames to wait before cycling to the next row

function preload() {
	DMSans = loadFont('fonts/DMSans.ttf');
	Vollkorn = loadFont('fonts/Vollkorn.ttf');
	templatecsv = loadTable('data/FTCtemplate.csv', 'header');
}

function setup() {
	//some setup code
	createCanvas(1910, 1000);
	colorMode(HSB, 360, 100, 100, 100);
	angleMode(DEGREES);
	background(0, 0, 180);
    world.gravity.y = 0;
	textFont(DMSans);
	// text('testtest',10,50);



	shoeAni = loadAnimation(
		'img/yeezy.png',
		'img/huarache.png',
		'img/internationalist.png',
	)
	// shoe = new Sprite();
	// shoe.img = 'img/yeezy.png';
	shoeAni.scale=0.2;
	// shoe.w=10;

	// cycle.color='black';
	// shoe.textSize=40;
	// cycle.fill=noFill();
	// cycle.stroke='black';
	// cycle.textColor='white';
	// cycle.text='test';

	shoeAni.frameDelay = 20;
  }
  
  function drawData() {
	let xOffset = 100;
	let yOffset = 100;
	let spacing = 150;
  
	if (templatecsv.rows.length > 0) {
	  let row = templatecsv.rows[currentIndex];
  
	  let manufacturingAmount = row.getNum('manufacturing');
	  let retailAmount = row.getNum('retail');
	  let useAmount = row.getNum('use');
	  let repairAmount = row.getNum('repair');
	  let landfillAmount = row.getNum('landfill');
	  let takebackAmount = row.getNum('takeback');
	  let recyclingAmount = row.getNum('recycling');
	  let newMaterialsAmount = row.getNum('new-materials');
  
	  // Set the circle diameters based on data
	  let manufacturingDiameter = manufacturingAmount * 0.2;
	  let retailDiameter = retailAmount * 0.2;
	  let useDiameter = useAmount * 0.2;
	  let repairDiameter = repairAmount * 0.25;
	  let landfillDiameter = landfillAmount * 0.2;
	  let takebackDiameter = takebackAmount * 0.2;
	  let recyclingDiameter = recyclingAmount * 0.2;
	  let newMaterialsDiameter = newMaterialsAmount * 0.2;
  
	  // Draw circles
	  noStroke();
	  fill('#DBFF9C');
	  //manufacturing
	  ellipse(950, 120, manufacturingDiameter);

	  //no retail for now
	//   ellipse(xOffset + spacing, yOffset, retailDiameter);

	  //consumer use
	  ellipse(1720, 500, useDiameter);

	  //repair
	  ellipse(1550, 500, repairDiameter);

	  //landfill
	  ellipse(1800, 200, landfillDiameter);

	  //takeback
	  ellipse(1400, 830, takebackDiameter);

	  //open loop recycling
	  ellipse(950, 885, recyclingDiameter);

	  //raw materials
	  ellipse(200, 500, newMaterialsDiameter);
	}
  }

  function draw() {
	clear();

	translate(0,70);

	animation(shoeAni,width/2,height/2);

	// //background texture
	// for (let i = 0; i < width * height * 5 / 100; i++) {
	// 	stroke(0, 0, 0, 5);
	// 	let px = random(width);
	// 	let py = random(height);
	// 	point(px, py);
	//   }

	  //styling for cycle - rounded square
	  noFill();


	  strokeWeight(2);
	  stroke(80);
	  drawingContext.setLineDash([10,5, 2,5]);

	  line(width/3,0,width/3,height);
	  line(width*2/3,0,width*2/3,height);

	  stroke(60);
	  drawingContext.setLineDash([0]);

	  let r = width * 0.20;
	  let rFactor = 2
	  translate(width/2, height/2);
	  beginShape();
		vertex(0, -r)
		quadraticVertex(rFactor*r, -r, rFactor*r, 0);
		quadraticVertex(rFactor*r, r, 0, r);
		quadraticVertex(-rFactor*r, r, -rFactor*r, 0);
		quadraticVertex(-rFactor*r, -r, 0, -r);
	  endShape();
	

	
	translate(-width/2,-height/2);
	// stroke(0);
	ellipse(1635,500,170,100);
	line(1720, 500,1800, 200);

	drawData();
	
	noFill();

	strokeWeight(1);
	stroke(0);
	textSize(20);
	text('raw materials',350,-15);
	text('infrastructure',900,-15);
	text('consumer use',1450,-15);

	// Cycle through the data rows
	if (frameCount % cycleInterval === 0) {
		currentIndex = (currentIndex + 1) % templatecsv.getRowCount();
  	}

	let d = 20;
	//b-circle
	noStroke();
	fill(0, 0, 20);
	
	if (mouseIsPressed){
	ellipse(mouseX, mouseY, d, d);
	}

	//add square color palette for reference
	//TFC lime
	fill('#DBFF9C');
	square(50,10,40);

	//Tfc forest
	fill('#0B6046');
	square(50,50,40);

	//tfc lilac
	fill('#D3C6FF');
	square(50,90,40);

	//tfc blue
	fill('#424BEF');
	square(50,130,40);
  }