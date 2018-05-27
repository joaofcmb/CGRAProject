var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 300;
var BOARD_B_DIVISIONS = 4;

var axisControl = true;

class LightingScene extends CGFscene
{
	constructor()
	{
		super();
	};

	init(application)
	{
		super.init(application);

		this.setUpdatePeriod(1/60);

   		this.enableTextures(true);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(179/255,236/255,255/255,1); 
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.altimetry =[[6.0, 0.0, 0.0, 4.4, 4.4, 4.4, 4.4, 4.4, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 4.4, 4.4, 4.4, 4.4, 4.4, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 4.2, 4.2, 4.2, 4.2, 4.2, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 3.5, 0.0, 0.0, 0.0, 3.5, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 2.4, 0.0, 0.0, 0.0, 2.4, 0.0, 0.0, 6.5],
						 [6.0, 0.0, 0.0, 1.3, 2.3, 2.4, 2.3, 1.3, 0.0, 0.0, 4.7],
						 [6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.7],
						 [6.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 4.7],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 5.6, 4.7, 3.4, 4.7, 6.5],
						];

		this.vehicle = new MyVehicle(this, 12, 0);
		this.terrain = new MyTerrain(this, this.altimetry);

    	this.luz1=true;
		this.luz2=true;

		this.vehicleAppearances =["none",	"pineapple", "apple", "orange", "strawberry"];

		this.vehicleAppearanceList = {};

		for (var i = 0; i < this.vehicleAppearances.length; i++) {
			this.vehicleAppearanceList[this.vehicleAppearances[i]] = i;
		}

		this.currVehicleAppearance = 0;

		this.vehicle = new MyVehicle(this, 0, -5);
		this.crane 	 = new MyCrane(this, 0, 3);
		this.terrain = new MyTerrain(this, this.altimetry);

	};

	initCameras()
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights()
	{
		this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

		this.lights[0].setPosition(0, 10, 0, 1);
		this.lights[0].enable();

		this.lights[1].setPosition(30, 0, 0, 1);
		this.lights[1].enable();

		this.lights[2].setPosition(0, 0, 10, 1);
		this.lights[2].enable();

	};

	update(currTime){
		this.lastTime = this.lastTime || 0;
		this.deltaTime = currTime - this.lastTime;
		this.lastTime = currTime;

		this.checkKeys();

		// Update Vehicle
		this.vehicle.update(this.deltaTime);
		this.vehicle.updateTexture(this.currVehicleAppearance);

		// Update Crane
		this.crane.checkPickUp(this.vehicle.getXPos(), this.vehicle.getZPos());
		this.crane.update(this.deltaTime);
	}

	updateLights()
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	lightsControl()
	{
		if (this.luz1) {
			this.lights[1].enable();
		}
		else{
			this.lights[1].disable();
		}

		if (this.luz2) {
			this.lights[2].enable();
		}
		else{
			this.lights[2].disable();
		}
	}

	eixos()
	{
		if(axisControl){
			axisControl = false
		}
		else{
			axisControl = true;
		}
	}

	none(){
		this.currVehicleAppearance = this.vehicleAppearanceList["none"]
	}
	pineapple(){
		this.currVehicleAppearance = this.vehicleAppearanceList["pineapple"]
	}
	apple(){
		this.currVehicleAppearance = this.vehicleAppearanceList["apple"]
	}
	orange(){
		this.currVehicleAppearance = this.vehicleAppearanceList["orange"]
	}
	strawberry(){
		this.currVehicleAppearance = this.vehicleAppearanceList["strawberry"]
	}

	checkKeys()
	{
		var text="Keys pressed: ";
		var keysPressed=false;
		if (this.gui.isKeyPressed("KeyW"))
		{
			text+=" W ";
			keysPressed=true;

			this.vehicle.throttle();
		}
		if (this.gui.isKeyPressed("KeyS"))
		{
			text+=" S ";
			keysPressed=true;

			this.vehicle.brake();
		}
		if (this.gui.isKeyPressed("KeyA"))
		{
			text+=" A ";
			keysPressed=true;

			this.vehicle.turnLeft();
		}
		if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D ";
			keysPressed=true;

			this.vehicle.turnRight();
		}
		if (this.gui.isKeyPressed("KeyL"))
		{
			text+=" L ";
			keysPressed=true;

			this.vehicle.togglePopUpHeadlights();
		}
		if (keysPressed)
			console.log(text);
	}

	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		this.lightsControl();

		// this.updateTextures();

		if(axisControl) {
			this.axis.display();
		}
		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section
    	this.terrain.display();
    	this.vehicle.display();
    	this.crane.display();

		// ---- END Scene drawing section
	};
};
