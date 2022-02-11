import Vector from "./vector.js";
import MatrixHelper from "./matrixHelper.js";

export default class Vertice {
    constructor(posX, posY, posZ) {
        this.originalPos = new Vector(posX, posY, posZ);
        this.pos = new Vector(posX, posY, posZ);
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        
        this.color = '#fff';
        this.radius = 5;
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

    /**
     * Update position based on velocities
     * @param {*} time 
     * @param {*} frameCount 
     */
    update(time, frameCount) {
        const angleXDegrees = this.rotationX * time;
        const angleXRad = angleXDegrees * Math.PI / 180;
        const rotationX = [
            [ 1, 0, 0 ],
            [ 0, Math.cos(angleXRad), -Math.sin(angleXRad) ],
            [ 0, Math.sin(angleXRad), Math.cos(angleXRad) ]
        ];

        let rotated = MatrixHelper.matrixMultiplyVector(rotationX, this.originalPos);

        const angleYDegrees = this.rotationY * time;
        const angleYRad = angleYDegrees * Math.PI / 180;
        const rotationY = [
            [ Math.cos(angleYRad), 0, Math.sin(angleYRad) ],
            [ 0, 1, 0 ],
            [ -Math.sin(angleYRad), 0, Math.cos(angleYRad) ]
        ];

        rotated = MatrixHelper.matrixMultiplyVector(rotationY, rotated);

        const angleZDegrees = this.rotationZ * time;
        const angleZRad = angleZDegrees * Math.PI / 180;
        const rotationZ = [
            [ Math.cos(angleZRad), -Math.sin(angleZRad), 0 ],
            [ Math.sin(angleZRad), Math.cos(angleZRad), 0 ],
            [ 0, 0, 1 ]
        ];

        rotated = MatrixHelper.matrixMultiplyVector(rotationZ, rotated);

        const projection = [
            [1, 0, 0],
            [0, 1, 0]
        ];

        let projected = MatrixHelper.matrixMultiplyVector(projection, rotated);

        this.pos = projected;
        // console.log(frameCount, time, this.pos)
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}