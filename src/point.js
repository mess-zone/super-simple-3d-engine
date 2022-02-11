import Vector from "./vector.js";

export default class Point {
    constructor(posX, posY, posZ, radius, color) {
        this.originalPos = new Vector(posX, posY, posZ);
        this.pos = new Vector(posX, posY, posZ);
        this.radius = radius;
        this.color = color;
        this.rotationZ = 0;
    }

    /**
     * INfinitely rotate object in the z axis
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