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

		this.setUpdatePeriod(100);

   		this.enableTextures(true);

		this.initCameras();

		this.initLights();

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		//example for nrDivs = 8 -> grid of 9x9 vertices     
		this.altimetry =[[6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],   
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						 [6.0, 6.6, 7.8, 7.6, 6.5, 4.6, 0.0, 0.0, 3.4, 4.7, 6.5],
						]; 
		
		this.vehicle = new MyVehicle(this, 15, 0);
		this.terrain = new MyTerrain(this, 8, this.altimetry);
    
    	this.luz1=true;
		this.luz2=true;
    
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

		this.vehicle.update(this.deltaTime);
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
		if (keysPressed)
			console.log(text);
	}

	display()
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clearColor(179/255,236/255,255/255,1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// ---- END Background, camera and axis setup

		// ---- BEGIN Scene drawing section
		this.vehicle.display();

		this.lightsControl();

		if(axisControl) {
			this.axis.display();
		}
    this.terrain.display();
    
		// ---- END Scene drawing section
	};
};
