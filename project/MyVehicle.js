/**
 * MyVehicle
 * @constructor
 */
 class MyVehicle extends CGFobject
 {
	constructor(scene, x, y)
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

		// Dimension Constants
		this.LENGTH 	= 4.830;
		this.WHEELBASE 	= 2.760;
		this.WIDTH 		= 1.8745;

		// Physics / Animation Constants
		this.THROTTLE	= 3; 	// Positive acceleration of vehicle
		this.BRAKES		= 1; 	// Negative acceleration of vehicle
		this.STEERING	= 2; 	// Angular Velocity of steering
		this.TURNBACK	= 1;	// Angular Velocity of turn stabalization
		this.POPUP		= 1;	// Angular Velocity of pop up headlights	

		this.cube 		= new MyUnitCubeQuad(this.scene);
		this.prism 		= new MyPrism(this.scene, 4, 10);
		this.square 	= new MyQuad(this.scene);
		this.semiSphere = new MySphere(this.scene, 10, 4);

		this.LRWheel = new MyWheel(this.scene);
		this.LLWheel = new MyWheel(this.scene);
		this.URWheel = new MyWheel(this.scene);
		this.ULWheel = new MyWheel(this.scene);

		this.initSpecialSolids();

		this.initMaterials();

		this.initMovement(x || 0, y || 0);

		// Pop Up Headlights
		this.popUpAngle = 0;
		this.isPopped = false;
	};

	initSpecialSolids()
	{
		this.bBumper = new MyTrapSolid(this.scene, 72, 85);

		this.carTop = new MyTrapSolid(this.scene, 40, 60);
		this.carBot = new MyTrapSolid(this.scene, 87, 87);

		this.fdBumper = new MyTrapSolid(this.scene, 80, 85);
		this.fmBumper = new MyTrapSolid(this.scene, 90, 85);
		this.fuBumper = new MyTrapSolid(this.scene, 90, 85);

		this.upperLight = new MyTrapSolid(this.scene, 90, 85);	

		this.leftMirror = new MyTrapSolid(this.scene, 90, 45);
		this.rightMirror = new MyTrapSolid(this.scene, 45, 90);

		this.rightGlass = new MyTrapeze(this.scene, 80, 53);
		this.leftGlass = new MyTrapeze(this.scene, 53, 80);
	}

	initMaterials()
	{
		this.materialBody = new CGFappearance(this.scene);
		this.materialBody.setSpecular(0.7, 0.7, 0.7, 1);
		this.materialBody.setDiffuse(1, 1, 1, 1);

		this.materialGlass = new CGFappearance(this.scene);
		this.materialGlass.setSpecular(.8, .8, .8, 1);
		this.materialGlass.setDiffuse(.8, .8, .8, 1);

	}

	initMovement(x, y)
	{
		this.xPos = x;
		this.zPos = y;

		// angle of front wheels in degrees in respect to the front of the car
		this.turnAng = 0;
		// linear velocity of car. Direction depends on the turn angle 
		this.velocity = 0;
	}
	
	// External Methods (To be accessed by other classes)
	updateVelocity(onThrottle, onBrakes) 
	{
		if (onThrottle)		this.velocity += this.THROTTLE;
		if (onBrakes)		this.velocity -= this.BRAKES;
	}

	updateTurnAngle(isSteeringLeft, isSteeringRight) 
	{
		if (!(isSteeringLeft && isSteeringRight)) 
		{
			this.turnAng += this.turnAng > 0 ? -this.TURNBACK: this.TURNBACK;
		}
		else 
		{
			if (isSteeringLeft)		this.turnAng += this.STEERING;
			if (isSteeringRight)	this.turnAng -= this.STEERING;
		}
	}

	togglePopUpHeadlights()
	{
		this.isPopped = !this.isPopped;
	}

	update(delta) 
	{
		// update car position based on the current velocity and turn angle
		this.xPos += this.velocity * delta * Math.cos(turnAng * degToRad);
		this.yPos += this.velocity * delta * Math.sin(turnAng * degToRad);

		// update pop up headlights angle
		if (isPopped)	this.popUpAngle = max(0, this.popUpAngle - this.POPUP);
		else			this.popUpAngle = min(this.popUpAngle + this.POPUP, 90);

	}
	
  	display()
	{
		this.scene.pushMatrix();
			this.scene.rotate(this.turnAng * degToRad, 0, 1, 0);
			this.scene.translate(this.xPos, .35, this.zPos);

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
	
			this.materialBody.apply();

			// BACK OF CAR -----------------------------
			this.scene.pushMatrix();
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
				this.scene.translate(0, .11, 0);
				this.scene.scale(this.WIDTH, .5, 1.96);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.scene.rotate(-Math.PI/2, 0, 1, 0);
				this.carBot.display();
			this.scene.popMatrix();

			// FRONT OF CAR
			this.scene.pushMatrix();
				this.scene.translate(0, 0.025, this.LENGTH/2 -.38);
				this.scene.scale(this.WIDTH, .15, .55);
				this.scene.rotate(-90 * degToRad, 0, 1, 0);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.fdBumper.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, 0.2, this.LENGTH/2 -.35);
				this.scene.scale(this.WIDTH, .2, .7);
				this.scene.rotate(-90 * degToRad, 0, 1, 0);
				this.scene.rotate(Math.PI, 0, 0, 1);
				this.fmBumper.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, 0.375, this.LENGTH/2 -.4);
				this.scene.scale(this.WIDTH *.6, .15, .60);
				this.scene.rotate(-90 * degToRad, 0, 1, 0);
				this.fuBumper.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(0, 0.464, this.LENGTH/3);
				this.scene.rotate(9.3 * degToRad, 1, 0, 0);
				this.scene.scale(this.WIDTH, .2, 1.4);
				this.cube.display();
			this.scene.popMatrix();

			// POP UP HEADLIGHTS
			this.scene.pushMatrix();
				this.scene.translate(-this.WIDTH/2, 0.375, this.LENGTH/2 -.25);
				this.scene.translate(0, 0, this.WIDTH * .2 -Math.cos(-40 * degToRad));
				this.scene.rotate(-40 * degToRad, 1, 0, 0);
				this.scene.pushMatrix();
					this.scene.scale(this.WIDTH *.2, .15, this.WIDTH *.2);
					this.scene.rotate(-90 * degToRad, 0, 1, 0);
					this.upperLight.display();
				this.scene.popMatrix();
			this.scene.popMatrix();

			// SIDE MIRRORS
			this.scene.pushMatrix();
				this.scene.translate(this.WIDTH/2 -.02, .75, .5);
				this.scene.scale(.1, .1, .1);
				this.scene.rotate(Math.PI / 2, 1, 0, 0);
				this.leftMirror.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(-this.WIDTH/2 +.02, .75, .5);
				this.scene.scale(.1, .1, .1);
				this.scene.rotate(Math.PI / 2, 1, 0, 0);
				this.rightMirror.display();
			this.scene.popMatrix();

			// WINDOWS 
			this.materialGlass.apply();
			// Windshield (Front)
			this.scene.pushMatrix();
				this.scene.translate(0, .9, .45);
				this.scene.rotate(-57 * degToRad, 1, 0, 0);
				this.scene.scale(this.WIDTH - .1, .7, 1.2);
				this.square.display();
			this.scene.popMatrix();
			// Rear Window
			this.scene.pushMatrix();
				this.scene.translate(0, .98, -1.6);
				this.scene.rotate(253 * degToRad, 1, 0, 0);
				this.scene.scale(this.WIDTH - .1, 1, 1.2);
				this.square.display();
			this.scene.popMatrix();
			// Side Windows
			this.scene.pushMatrix();
				this.scene.translate(-this.WIDTH/2 -.01, .9, -.3);
				this.scene.scale(1, .4, .8)
				this.scene.rotate(-Math.PI / 2, 0, 1, 0);
				this.rightGlass.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(this.WIDTH/2 +.01, .9, -.3);
				this.scene.scale(1, .4, .8);
				this.scene.rotate(Math.PI, 0, 1, 0);
				this.scene.rotate(-Math.PI / 2, 0, 1, 0);
				this.leftGlass.display();
			this.scene.popMatrix();

		this.scene.popMatrix();
	};
 };
