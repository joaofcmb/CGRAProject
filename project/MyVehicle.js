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
		this.materialBody.setDiffuse(0.8, 0.8, 0.8, 1);
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
		this.scene.pushMatrix();
			this.scene.scale(1.8745, 0.1, 4.830);
			this.scene.rotate(Math.PI/4, 0, 0, 1);

			this.prism.display();
		this.scene.popMatrix();

		// CAR WHEELS ---------------------------------
		this.scene.pushMatrix();
			this.scene.translate(.97, 0, 1);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.LLWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(.97, 0, 3.76);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(Math.PI/2, 0, 1, 0);
			this.ULWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-.97, 0, 1);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.LRWheel.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(-.97, 0, 3.76);
			this.scene.scale(0.35, 0.35, 0.35);
			this.scene.rotate(-Math.PI/2, 0, 1, 0);
			this.URWheel.display();
		this.scene.popMatrix();

		// BACK OF CAR
		this.materialBody.apply();
		this.scene.pushMatrix();
			this.scene.rotate(0.05, 1, 0, 0);
			this.scene.scale(1.875, .7, 0.6);
			this.scene.translate(0, .5, .5);
			this.cube.display();
		this.scene.popMatrix();
	};
 };
