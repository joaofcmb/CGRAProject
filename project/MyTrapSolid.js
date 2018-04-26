/**
 * MyUnitCubeQuad
 * @constructor
 */
class MyTrapSolid extends CGFobject
{
	constructor(scene, lAng, rAng) 
	{
		super(scene);

		this.lAng = lAng;
		this.rAng = rAng;

		this.quad = new MyQuad(this.scene);
		this.trapeze = new MyTrapeze(this.scene, lAng, rAng);
	};

	display() 
	{
		// front face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.trapeze.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(180 * degToRad, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.trapeze.display();
		this.scene.popMatrix();

		// top face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * degToRad, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// down faces
		var dLen = 1+ Math.sin(this.rAng * degToRad) 
					+ Math.sin(this.lAng * degToRad);

		this.scene.pushMatrix();
			this.scene.scale(dLen, 1, 1);
			this.scene.rotate(90 * degToRad, 1, 0, 0);
			this.scene.translate(0, 0, 0.5);
			this.quad.display();
		this.scene.popMatrix();

		// left face
		this.scene.pushMatrix();
		this.scene.translate(-.5 - .5/Math.tan(this.lAng * degToRad), 0, 0);
		this.scene.rotate(-90 * degToRad, 0, 1, 0);
		this.scene.rotate(-(90-this.lAng) * degToRad, 1, 0, 0);
		this.scene.scale(1, 1/Math.sin(this.lAng*degToRad), 1);
		this.quad.display();
		this.scene.popMatrix();

		// right face
		this.scene.pushMatrix();
		this.scene.translate(.5 + .5/Math.tan(this.lAng * degToRad), 0, 0);
		this.scene.rotate(90 * degToRad, 0, 1, 0);
		this.scene.rotate(-(90-this.lAng) * degToRad, 1, 0, 0);
		this.scene.scale(1, 1/Math.sin(this.lAng*degToRad), 1);
		this.quad.display();
		this.scene.popMatrix();
	};
};
