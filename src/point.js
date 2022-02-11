import Vector from "./vector.js";

export default class Point {
    constructor(posX, posY, radius, color) {
        this.pos = pos;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}