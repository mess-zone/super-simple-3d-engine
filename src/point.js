import Vector from "./vector.js";

export default class Point {
    constructor(posX, posY, posZ, radius, color) {
        this.pos = new Vector(posX, posY, posZ);
        this.radius = radius;
        this.color = color;
        this.rotationVelocity = {
            x: 0,
            y: 0,
            z: 0,
        }
    }

    setRotationVelocity(x, y, z) {
        this.rotationVelocity.x = x;
        this.rotationVelocity.y = y;
        this.rotationVelocity.z = z;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}