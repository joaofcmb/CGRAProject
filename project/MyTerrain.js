

class MyTerrain extends Plane{
 
  constructor(scene, altimetry)
  {
    super(scene, altimetry.length - 1);

    this.altimetry = altimetry;
    this.altimetry[0][0] = 7;
    
    this.materialTerrain = new CGFappearance(this.scene);
    this.materialTerrain.setAmbient(0.8, 0.8, 0.8, 1);
    this.materialTerrain.setSpecular(0.3, 0.3, 0.3, 1);
    this.materialTerrain.setDiffuse(0.8, 0.8, 0.8, 1);
    this.materialTerrain.setShininess(20);
    this.materialTerrain.loadTexture("../resources/images/RockyDesert.png");

    this.initBuffers();
    this.initGLBuffers();
  };

  initBuffers()
  {
    if (!this.altimetry)  return;

    super.initBuffers();

    this.vertices = [];

    var yCoord = 0.5;
    for (var i = 0; i <= this.nrDivs; i++)
    {
      var xCoord = -0.5;
      for (var j = 0; j <= this.nrDivs; j++)
      {
        this.vertices.push(xCoord, yCoord, this.altimetry[i][j]);
        xCoord += this.patchLength;
      }
      yCoord -= this.patchLength;
    }
  }

  display()
  {
    this.materialTerrain.apply();
    this.scene.pushMatrix();
      this.scene.rotate(-Math.PI/2, 1, 0, 0);
      this.scene.scale(50, 50, 1);
      this.drawElements(this.primitiveType);
    this.scene.popMatrix();
  };
};
