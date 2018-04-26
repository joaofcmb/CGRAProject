

class MyTerrain extends CGFobject{

	constructor(scene)
	{
		super(scene);

    this.terrain = new Plane(this.scene, 5, 0, 3, 0, 3);

    this.materialTerrain = new CGFappearance(this.scene);
    this.materialTerrain.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialTerrain.setSpecular(0.3, 0.3, 0.3, 1);
    this.materialTerrain.setDiffuse(0.8, 0.8, 0.8, 1);
    this.materialTerrain.setShininess(20);
    this.materialTerrain.loadTexture("../resources/images/RockyDesert.png");
	};

	display()
	{
    this.materialTerrain.apply();
    this.scene.pushMatrix();
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.scene.scale(50, 50, 1);
		  this.terrain.display();
		this.scene.popMatrix();
	};

};
