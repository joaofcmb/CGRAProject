/**
 * MyQuad
 * @constructor
 */
class MyTrapeze extends CGFobject
{
	constructor(scene, rAng, lAng)
	{
		super(scene);

		this.lAng = lAng;
		this.rAng = rAng;

		this.initBuffers();
	};

	initBuffers()
	{
        this.vertices = [
        	-0.5 - Math.cos(this.lAng * Math.PI / 180), -0.5, 0,
            0.5 + Math.cos(this.rAng * Math.PI / 180), -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
        ];

        this.indices = [
            0, 1, 2,
            3, 2, 1
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

        this.texCoords = [
            this.minS, this.maxT,
            this.maxT, this.maxS,
            this.minS, this.minS,
            this.maxT, this.minT
        ];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};