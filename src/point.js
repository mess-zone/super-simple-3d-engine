import Vector from "./vector.js";

export default class Point {
    constructor(posX, posY, posZ, radius, color) {
        this.originalPos = new Vector(posX, posY, posZ);
        this.pos = new Vector(posX, posY, posZ);
        this.radius = radius;
        this.color = color;
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
    }

    /**
     * Infinitely rotate object in the x axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateX(velocity) {
        this.rotationX = velocity; 
    }

    /**
     * Infinitely rotate object in the y axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateY(velocity) {
        this.rotationY = velocity; 
    }

    /**
     * Infinitely rotate object in the z axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateZ(velocity) {
        this.rotationZ = velocity; 
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}