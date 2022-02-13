import Vector from "./vector.js";
import TransformationChain from "./transformationChain.js";

export default class Geometry {
    constructor(posX, posY, posZ) {

        this.appearance = {
            vertices: true,
            edges: true,
            faces: true,
        };

        this.pos = new Vector(posX, posY, posZ);

        this.rotationXDegree = 0;
        this.rotationYDegree = 0;
        this.rotationZDegree = 0;

        this.rotationXVelocity = 0;
        this.rotationYVelocity = 0;
        this.rotationZVelocity = 0;
    }

    /**
     * Infinitely rotate object in the x axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    setRotationXVelocity(velocity) {
        this.rotationXVelocity = velocity;
    }

    /**
     * Infinitely rotate object in the y axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    setRotationYVelocity(velocity) {
        this.rotationYVelocity = velocity;
    }

    /**
     * Infinitely rotate object in the z axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    setRotationZVelocity(velocity) {
        this.rotationZVelocity = velocity;
    }

    update(timeframe, time, frameCount) {
        this.rotationXDegree = this.rotationXVelocity * timeframe + this.rotationXDegree;
        this.rotationYDegree = this.rotationYVelocity * timeframe + this.rotationYDegree;
        this.rotationZDegree = this.rotationZVelocity * timeframe + this.rotationZDegree;
    }

    drawVertice(vector, ctx) {
        const color = "#fff";
        const radius = 5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(vector.x, vector.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    drawEdge(start, end, ctx) {
        const color = "#fff";
        const strokeWidth = 3;

        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }

    drawFace(v1, v2, v3, v4, ctx) {
        const color = "#8888";

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.lineTo(v4.x, v4.y);
        ctx.closePath();
        ctx.fill();
    }

    draw(ctx) {
        console.error('draw method must be implemented');
    }

    // helper
    drawPos(ctx) {
        const color = "#f008";
        const radius = 5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

}