/**
 * 8MyWheel
 * @constructor
 */
 class MyWheel extends CGFobject
 {
	constructor(scene)
	{
		super(scene);

		this.tire = new MyCylinder(this.scene, 20, 3);
		this.rim  = new MyCircle(this.scene, 20);

		this.initMaterials();
	};

	initMaterials()
	{
		this.materialTire = new CGFappearance(this.scene);
		//this.materialTire.setAmbient(0.8, 0.8, 0.8, 1);
		this.materialTire.setSpecular(0.1, 0.1, 0.1, 1);
		this.materialTire.setDiffuse(0.2, 0.2, 0.2, 1);
		//this.materialTire.setShininess(20);
		//this.materialTire.loadTexture("../resources/images/tire.jpg");
		//this.materialTire.setTextureWrap('CLAMP_TO_EDGE','REPEAT');
	}

  	display()
	{
		this.scene.pushMatrix();
			this.materialTire.apply();
			this.tire.display();

			this.scene.translate(0, 0, 1); 
			this.rim.display();
		this.scene.popMatrix();
	};
 };
