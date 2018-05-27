/**
 * MyVehicle
 * @constructor
 */
 class MyCrane extends CGFobject
 {
	constructor(scene, x, z)
	{
		super(scene);

		// Dimension Constants
		this.ARMLENGTH 	 = 10;
		this.CABLELENGTH = 3;
		this.MAGNETSIZE  = 2;
		this.BASESIZE 	 = 1.5;

		this.PITCH 		 = 30;		// Fixed Pitch of Lower Arm in Degrees

		// Physics / Animation Constants
		this.STEERING	 = 2; 		// Angular Velocity of joints

		// Angles in degrees, starting from the Y axis
		this.PICKUPBASE  = 0;		// Angle of Base Joint in Pickup Position 
		this.PICKUPARM 	 = 0;		// Angle of Arm Joint in Pickup Position 
		this.DROPBASE 	 = 0;		// Angle of Base Joint in Drop Position 
		this.DROPARM 	 = 108;		// Angle of Base Joint in Drop Position


		this.cube 		 = new MyUnitCubeQuad(this.scene);
		this.wheel 		 = new MyWheel(this.scene);

		this.initMaterials();
		this.initMovement(x || 0, z || 0);
	};

	initMaterials()
	{
		this.materialBase = new CGFappearance(this.scene);
		this.materialBase.setAmbient(0.8, 0.8, 0.8, 1);
		this.materialBase.setSpecular(0.1, 0.1, 0.1, 1);
		this.materialBase.setDiffuse(0.2, 0.2, 0.2, 1);

		this.materialArm = new CGFappearance(this.scene);
		this.materialArm.setAmbient(0.8, 0.8, 0.8, 1);
		this.materialArm.setSpecular(0.6, 0.6, 0.6, 1);
		this.materialArm.setDiffuse(0.2, 0.2, 0.2, 1);
	}

	initMovement(x, z)
	{
		// Position of the Crane's base
		this.xPos = x;
		this.zPos = z;

		// Angle of Both Joints (Degrees)
		this.baseAng = this.DROPBASE;
		this.armAng  = this.DROPARM;

		// Useful Variables for display()
		this.dzLowerArm	 = this.ARMLENGTH * Math.sin(this.PITCH * degToRad);
		this.dyLowerArm	 = this.ARMLENGTH * Math.cos(this.PITCH * degToRad);

		this.dzUpperArm	 = this.ARMLENGTH * Math.sin(this.armAng * degToRad);
		this.dyUpperArm	 = this.ARMLENGTH * Math.cos(this.armAng * degToRad);
	}

	// External Methods (To be accessed by other classes)

	update(delta)
	{
		
	}

  	display()
	{
		this.scene.pushMatrix();
			this.scene.translate(this.xPos, 1, this.zPos);
			this.scene.rotate(this.baseAng * degToRad, 0, 1, 0);

			// BASE HINGE
			this.scene.pushMatrix();
				this.scene.scale(this.BASESIZE, 1, this.BASESIZE);
				this.scene.rotate(Math.PI/2, 1, 0, 0);
				this.wheel.display();
			this.scene.popMatrix();
			
			// LOWER ARM
			this.scene.pushMatrix();
				this.scene.translate(0, this.dyLowerArm / 2 - 1, this.dzLowerArm / 2);
				this.scene.rotate(this.PITCH * degToRad, 1, 0, 0);
				this.scene.scale(1, this.ARMLENGTH, 1);
				this.cube.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();	 
				this.scene.translate(0, this.dyLowerArm, this.dzLowerArm);

				// ARM HINGE
				this.scene.pushMatrix();
					this.scene.translate(-.5, -1, 0);
					this.scene.rotate(Math.PI/2, 0, 1, 0);
					this.wheel.display();
				this.scene.popMatrix();

				// UPPER ARM
				this.scene.pushMatrix();
					this.scene.translate(0, this.dyUpperArm / 2 - 1, this.dzUpperArm / 2);
					this.scene.rotate(this.armAng * degToRad, 1, 0, 0);
					this.scene.scale(1, this.ARMLENGTH, 1);
					this.cube.display();
				this.scene.popMatrix();

				this.scene.pushMatrix();
					this.scene.translate(0, this.dyUpperArm - 1, this.dzUpperArm -.5);

					// MAGNET CABLE
					this.scene.pushMatrix();
						this.scene.translate(0, -this.CABLELENGTH / 2, 0);
						this.scene.scale(.1, this.CABLELENGTH, .1);
						this.cube.display();
					this.scene.popMatrix();

					// MAGNET
					this.scene.pushMatrix();
						this.scene.translate(0, -this.CABLELENGTH, 0);
						this.scene.scale(this.MAGNETSIZE, 1, this.MAGNETSIZE);
						this.scene.rotate(Math.PI/2, 1, 0, 0);
						this.wheel.display();
					this.scene.popMatrix();
				this.scene.popMatrix();
			this.scene.popMatrix();
		this.scene.popMatrix();
	};
 };
