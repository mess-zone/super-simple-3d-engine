
import MatrixHelper from "./matrixHelper.js";
import Point from "./point.js";

export default function createEngine(canvas) {

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let frameCount = 0;

    let points  = [];

    function init() {
        console.log('[init]');

        // points.push(new Point(0, 0, 0, 2, '#aaa'));

        points.push(new Point(-50, -50, 0, 5, 'red'));
        points.push(new Point(50, -50, 0, 5, 'green'));
        points.push(new Point(-50, 50, 0, 5, 'orange'));
        points.push(new Point(50, 50, 0, 5, 'blue'));
        // points.push(new Point(100, 25, 0, 7, '#006'));
        // points.push(new Point(50, 150, 0, 13, '#4f8'));
        // points.push(new Point(0, 44, 0, 8, '#05a'));

        points[0].rotateZ(45);
        points[1].rotateZ(45);
        points[2].rotateZ(45);
        points[3].rotateZ(45);

        points[0].rotateX(25);
        points[1].rotateX(25);
        points[2].rotateX(25);
        points[3].rotateX(25);

        points[0].rotateY(75);
        points[1].rotateY(75);
        points[2].rotateY(75);
        points[3].rotateY(75);

        requestAnimationFrame(render);
    }

    function render(time) {
        time *= 0.001;  // convert time to seconds

        // if(steps > 24) return;
        // if(time > 1) return;

        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        //set canvas origin to center
        ctx.translate(width/2, height/2);


        for(const point of points) {

            const angleXDegrees = point.rotationX * time;
            const angleXRad = angleXDegrees * Math.PI / 180;
            const rotationX = [
                [ 1, 0, 0 ],
                [ 0, Math.cos(angleXRad), -Math.sin(angleXRad) ],
                [ 0, Math.sin(angleXRad), Math.cos(angleXRad) ]
            ];

            let rotated = MatrixHelper.matrixMultiplyVector(rotationX, point.originalPos);

            const angleYDegrees = point.rotationY * time;
            const angleYRad = angleYDegrees * Math.PI / 180;
            const rotationY = [
                [ Math.cos(angleYRad), 0, Math.sin(angleYRad) ],
                [ 0, 1, 0 ],
                [ -Math.sin(angleYRad), 0, Math.cos(angleYRad) ]
            ];

            rotated = MatrixHelper.matrixMultiplyVector(rotationY, rotated);

            const angleZDegrees = point.rotationZ * time;
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

            point.pos = projected;
            console.log(frameCount, time , angleXDegrees, angleXRad, point.pos)
        }

        for(const point of points) {
            point.draw(ctx);
        }

        // canvas origin
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, 2 * Math.PI, true);
        ctx.fill();

        frameCount++;
        
        // angleGraus += 0.005;
        // angleGraus = angleGraus % 360;
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