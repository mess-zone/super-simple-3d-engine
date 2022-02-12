
import Cube from "./cube.js";

export default function createEngine(canvas) {

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let frameCount = 0;

    let cubes = [];

    function init() {
        console.log('[init]');

        const cube = new Cube(100, 150, -5, 100);
        // cube.rotateX(25);
        // cube.rotateY(75);
        // cube.rotateZ(45);

        cubes.push(cube);
        
        requestAnimationFrame(render);
    }

    function render(time) {
        time *= 0.001;  // convert time to seconds
        // console.log(frameCount, time);

        if(time > 1) return;

        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        //set canvas origin to center
        // ctx.translate(width/2, height/2);

        // draw canvas origin
        ctx.fillStyle = '#fff8';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, 2 * Math.PI, true);
        ctx.fill();


        for(const cube of cubes) {
            cube.update(time, frameCount);
            cube.draw(ctx);
            cube.drawPos(ctx);
        }

        frameCount++;
        requestAnimationFrame(render);


        /////////////////////

        // const max = 1;
        // const min = -1;

        // const angleRad = ((time/10) % 360) * Math.PI / 180;
        // const angleRad = -1 * Math.PI / 360;
        // const rotationZ = [
        //     [Math.cos(angleRad), -Math.sin(angleRad), 0],
        //     [Math.sin(angleRad), Math.cos(angleRad), 0],
        //     [0, 0, 1]
        // ];

        // const projection = [
        //     [1, 0, 0],
        //     [0, 1, 0]
        // ];

        // const translateCenter = [
        //     [1, 0, 0, width/2],
        //     [0, 1, 0, height/2],
        //     [0, 0, 1, 0],
        //     [0 ,0, 0, 1]
        // ];

        // const translateDiagonal = [
        //     [1, 0, 0, steps],
        //     [0, 1, 0, steps],
        //     [0, 0, 1, 0],
        //     [0 ,0, 0, 1],
        // ];
          


        // for(const point of points) {

        //     const homogenousVector = MatrixHelper.vectorToMatrix(point.pos);
        //     homogenousVector[3] = []
        //     homogenousVector[3][0] = 1;
        //     let translatedMatriz = MatrixHelper.multiply(translateDiagonal, homogenousVector);
        //     let translated = MatrixHelper.matrixToVector(translatedMatriz);

        //     let rotated = MatrixHelper.matrixMultiplyVector(rotationZ, translated);

        //     let projected = MatrixHelper.matrixMultiplyVector(projection, rotated);

        //     point.pos = projected;
        //     console.log(frameCount, time , steps, point.pos)
        // }

        // for(const point of points) {
        //     // const translateCenter = [
        //     //     [1, 0, 0, 1],
        //     //     [0, 1, 0, 1],
        //     //     [0, 0, 1, 0],
        //     //     [0 ,0, 0, 1]
        //     // ];


        //     const angleRad = point.rotationVelocity.z;
        //     const rotationZ = [
        //         [Math.cos(angleRad), -Math.sin(angleRad), 0],
        //         [Math.sin(angleRad), Math.cos(angleRad), 0],
        //         [0, 0, 1]
        //     ];

        //     // const homogenousVector = MatrixHelper.vectorToMatrix(point.pos);
        //     // homogenousVector[3] = []
        //     // homogenousVector[3][0] = 1;
        //     // let translatedMatriz = MatrixHelper.multiply(translateCenter, homogenousVector);
        //     // let centered = MatrixHelper.matrixToVector(translatedMatriz);

        //     let rotated = MatrixHelper.matrixMultiplyVector(rotationZ, point.pos);

        //     let projected = MatrixHelper.matrixMultiplyVector(projection, rotated);

        //     point.pos = projected;
        //     // console.log(frameCount, time , steps, point.pos)
        // }

    }

    return {
        init,
        render,
    }
}