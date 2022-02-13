import Vector from "./vector.js";
import TransformationChain from "./transformationChain.js";
import Geometry from "./geometry.js";

export default class RetangularPrims extends Geometry {
    constructor(posX, posY, posZ, size) {
        super(posX, posY, posZ);

        // TODO must have a scale factor and width, height, lenght attributes
        this.size = size;
        this.lenght = size * 2;

        this.mold = [];

        this.mold.push(new Vector(-0.5, -0.5, -1));
        this.mold.push(new Vector(0.5, -0.5, -1));
        this.mold.push(new Vector(0.5, 0.5, -1));
        this.mold.push(new Vector(-0.5, 0.5, -1));

        this.mold.push(new Vector(-0.5, -0.5, 1));
        this.mold.push(new Vector(0.5, -0.5, 1));
        this.mold.push(new Vector(0.5, 0.5, 1));
        this.mold.push(new Vector(-0.5, 0.5, 1));

        this.vertices = [];

        this.vertices.push(new Vector(0, 0, 0));
        this.vertices.push(new Vector(0, 0, 0));
        this.vertices.push(new Vector(0, 0, 0));
        this.vertices.push(new Vector(0, 0, 0));

        this.vertices.push(new Vector(0, 0, 0));
        this.vertices.push(new Vector(0, 0, 0));
        this.vertices.push(new Vector(0, 0, 0));
        this.vertices.push(new Vector(0, 0, 0));
    }

    /**
     * Update position and rotation of cube and its vertices
     * @param {*} time 
     * @param {*} frameCount 
     */
    update(timeframe, time, frameCount) {
        super.update(timeframe, time, frameCount)

        // vertices update
        for(let i = 0; i < this.vertices.length; i++) {
            const transformationChain = new TransformationChain(this.mold[i]);
    
            this.vertices[i] = transformationChain
                .scale(this.size)
                .rotateX(this.rotationXDegree)
                .rotateY(this.rotationYDegree)
                .rotateZ(this.rotationZDegree)
                .translate(this.pos)
                .orthographicProjection()
                .getVector();
        }
    }

    draw(ctx) {
        if(this.appearance.faces) {
            this.drawFace(this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3], ctx);
            this.drawFace(this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7], ctx);
            
            this.drawFace(this.vertices[0], this.vertices[4], this.vertices[7], this.vertices[3], ctx);
            this.drawFace(this.vertices[1], this.vertices[5], this.vertices[6], this.vertices[2], ctx);
            
            this.drawFace(this.vertices[0], this.vertices[1], this.vertices[5], this.vertices[4], ctx);
            this.drawFace(this.vertices[3], this.vertices[2], this.vertices[6], this.vertices[7], ctx);
        }

        if(this.appearance.edges) {
            for (let i = 0; i < 4; i++) {
                this.drawEdge(this.vertices[i], this.vertices[(i + 1) % 4], ctx);
                this.drawEdge(this.vertices[i + 4], this.vertices[((i + 1) % 4) + 4], ctx);
                this.drawEdge(this.vertices[i], this.vertices[i + 4], ctx);
            }
        }

        if(this.appearance.vertices) {
            this.vertices.forEach(vector => {
                this.drawVertice(vector, ctx);
            });
        }

    }
}