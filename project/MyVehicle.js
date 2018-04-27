/**
 * MyVehicle
 * @constructor
 */
 class MyVehicle extends CGFobject
 {
	constructor(scene)
	{
		super(scene);

		this.cube = new MyUnitCubeQuad(this.scene);
		this.prism = new MyPrism(this.scene, 4, 10);
		this.square = new MyQuad(this.scene);

		this.LRWheel = new MyWheel(this.scene);
		this.LLWheel = new MyWheel(this.scene);
		this.URWheel = new MyWheel(this.scene);
		this.ULWheel = new MyWheel(this.scene);

		this.initMaterials();
	};

	initMaterials()
	{
		this.materialBody = new CGFappearance(this.scene);
		this.materialBody.setSpecular(0.7, 0.7, 0.7, 1);
		this.materialBody.setDiffuse(1, 1, 1, 1);
	}

  	display()
	{
		/* CAR CHASSIS (Toyota Sprinter Trueno AE86)
			Real Car Specs:
				Length: 4200mm
				WheelBase: 2400mm
				Width: 1630mm
				Height: 1340mm

			Ratio: 1.15 units per meter

			Model Size:
				Length: 4.830 units
				WheelBase: 2.760 units
				Width: 1.8745 units
				Height: 1.541 units

			Wheel diameter: around 0.7 units
		*/
		var LENGTH = 4.830;
		var WHEELBASE = 2.760;
		var WIDTH = 1.8745;

		this.scene.pushMatrix();
			this.scene.scale(WIDTH, 0.1, LENGTH);
			this.cube.display();
		this.scene.popMatrix();

		// CAR WHEELS ---------------------------------
		this.scene.pushMatrix();
			this.scene.translate(WIDTH/2-.35, 0, -LENGTH*2/7)
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.LLWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(WIDTH/2-.35, 0, -LENGTH*2/7+WHEELBASE);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.ULWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-WIDTH/2+.35, 0, -LENGTH*2/7);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.LRWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-WIDTH/2+.35, 0, -LENGTH*2/7+WHEELBASE);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.URWheel.display();
		this.scene.popMatrix();

		// BACK OF CAR -----------------------------
		this.materialBody.apply();
		this.scene.pushMatrix();
			this.bBumper = new MyTrapSolid(this.scene, 75, 85);
			this.scene.translate(0, 0, -LENGTH/2 +.3);
			this.scene.scale(WIDTH, .2, .65);
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.bBumper.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, .2, -LENGTH/2 + .25);
			this.scene.scale(WIDTH, .2, .9);
			this.cube.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, .5, -LENGTH/2 +.3);
			this.scene.scale(WIDTH, .5, .8);
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.cube.display();
		this.scene.popMatrix();

		// MIDDLE OF CAR
		this.scene.pushMatrix();
			this.carTop = new MyTrapSolid(this.scene, 35, 50);
			this.scene.translate(0, .975, -.5);
			this.scene.scale(WIDTH, .6, 1);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.carTop.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			//his.scene.translate(0, .5, -LENGTH/2 +.3);
			//this.scene.scale(WIDTH, .5, .8);
			//this.scene.rotate(90 * degToRad, 0, 1, 0);
			//this.scene.rotate(Math.PI, 0, 0, 1);
			this.cube.display();
		this.scene.popMatrix();
	};
 };
