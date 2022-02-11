import Point from "./point.js";
import Vector from "./vector.js";
import MatrixHelper from "./matrixHelper.js";

export default class Cube {
    constructor(posX, posY, posZ, size) {
        this.size = size;
        this.originalPos = new Vector(posX, posY, posZ);
        this.pos = new Vector(posX, posY, posZ);
        this.points  = [];
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;

        this.points.push(new Point(-size/2, -size/2, -size/2, 5, 'red'));
        this.points.push(new Point(size/2, -size/2, -size/2, 5, 'green'));
        this.points.push(new Point(-size/2, size/2, -size/2, 5, 'orange'));
        this.points.push(new Point(size/2, size/2, -size/2, 5, 'blue'));

        this.points.push(new Point(-size/2, -size/2, size/2, 5, 'red'));
        this.points.push(new Point(size/2, -size/2, size/2, 5, 'green'));
        this.points.push(new Point(-size/2, size/2, size/2, 5, 'orange'));
        this.points.push(new Point(size/2, size/2, size/2, 5, 'blue'));
    }

    /**
     * Infinitely rotate object in the x axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateX(velocity) {
        this.rotationX = velocity; 
        this.points.forEach(point => {
            point.rotateX(velocity);
        });
    }

    /**
     * Infinitely rotate object in the y axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateY(velocity) {
        this.rotationY = velocity; 
        this.points.forEach(point => {
            point.rotateY(velocity);
        });
    }

    /**
     * Infinitely rotate object in the z axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateZ(velocity) {
        this.rotationZ = velocity; 
        this.points.forEach(point => {
            point.rotateZ(velocity);
        });
    }

    /**
     * Update position based on velocities
     * @param {*} time 
     * @param {*} frameCount 
     */
    update(time, frameCount) {
        for(const point of this.points) {
            point.update(time, frameCount)
            // console.log(frameCount, time, point.pos)
        }
    }

    draw(ctx) {
        this.points.forEach(point => {
            point.draw(ctx);
        });
    }

}