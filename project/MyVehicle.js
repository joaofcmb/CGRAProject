/**
 * MyVehicle
 * @constructor
 */
 class MyVehicle extends CGFobject
 {
	constructor(scene)
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
		super(scene);

		this.LENGTH = 4.830;
		this.WHEELBASE = 2.760;
		this.WIDTH = 1.8745;

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
		this.scene.pushMatrix();
			this.scene.scale(this.WIDTH, 0.1, this.LENGTH);
			this.cube.display();
		this.scene.popMatrix();

		// CAR WHEELS ---------------------------------
		this.scene.pushMatrix();
			this.scene.translate(this.WIDTH/2-.35, 0, -this.LENGTH*2/7)
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.LLWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(this.WIDTH/2-.35, 0, -this.LENGTH*2/7+this.WHEELBASE);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.ULWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-this.WIDTH/2+.35, 0, -this.LENGTH*2/7);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.LRWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-this.WIDTH/2+.35, 0, -this.LENGTH*2/7+this.WHEELBASE);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.URWheel.display();
		this.scene.popMatrix();

		// BACK OF CAR -----------------------------
		this.materialBody.apply();
		this.scene.pushMatrix();
			this.bBumper = new MyTrapSolid(this.scene, 72, 85);
			this.scene.translate(0, 0, -this.LENGTH/2 +.35);
			this.scene.scale(this.WIDTH, .2, .60);
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.bBumper.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, .2, -this.LENGTH/2 + .25);
			this.scene.scale(this.WIDTH, .2, .9);
			this.cube.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, .5, -this.LENGTH/2 +.3);
			this.scene.scale(this.WIDTH, .5, .8);
			this.scene.rotate(90 * degToRad, 0, 1, 0);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.cube.display();
		this.scene.popMatrix();

		// MIDDLE OF CAR
		this.scene.pushMatrix();
			this.carTop = new MyTrapSolid(this.scene, 40, 60);
			this.scene.translate(0, .9, -.5);
			this.scene.scale(this.WIDTH, .45, 1.2);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.carTop.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0, .515, -.55);
			this.scene.scale(this.WIDTH, .32, 3);
			this.cube.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.carBot = new MyTrapSolid(this.scene, 87, 87);
			this.scene.translate(0, .11, 0);
			this.scene.scale(this.WIDTH, .5, 1.96);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.carBot.display();
		this.scene.popMatrix();

		// FRONT OF CAR
		this.scene.pushMatrix();
			this.fdBumper = new MyTrapSolid(this.scene, 80, 85);
			this.scene.translate(0, 0.025, this.LENGTH/2 -.35);
			this.scene.scale(this.WIDTH, .15, .60);
			this.scene.rotate(-90 * degToRad, 0, 1, 0);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.fdBumper.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.fmBumper = new MyTrapSolid(this.scene, 90, 85);
			this.scene.translate(0, 0.2, this.LENGTH/2 -.3);
			this.scene.scale(this.WIDTH, .2, .8);
			this.scene.rotate(-90 * degToRad, 0, 1, 0);
			this.scene.rotate(Math.PI, 0, 0, 1);
			this.fmBumper.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.fuBumper = new MyTrapSolid(this.scene, 90, 85);
			this.scene.translate(0, 0.375, this.LENGTH/2 -.4);
			this.scene.scale(this.WIDTH, .15, .60);
			this.scene.rotate(-90 * degToRad, 0, 1, 0);
			this.fuBumper.display();
		this.scene.popMatrix();
			this.scene.pushMatrix();
			this.scene.translate(0, 0.464, this.LENGTH/3);
			this.scene.rotate(9.3 * degToRad, 1, 0, 0);
			this.scene.scale(this.WIDTH, .2, 1.4);
			this.cube.display();
		this.scene.popMatrix();
	};
 };
