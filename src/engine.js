
import MatrixHelper from "./matrixHelper.js";
import Point from "./point.js";

export default function createEngine(canvas) {

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let angleGraus = 0;
    let steps = 2;
    let frameCount = 0;

    let points  = [];

    function init() {
        console.log('[init]');

        points.push(new Point(0, 0, 0, 5, '#40b'));
        // points.push(new Point(width/2, height/2, 0, 5, '#333'));
        // points.push(new Point(width/2, height/2, 0, 5, '#006'));
        // points.push(new Point(width/2, height/2, 0, 5, '#606'));
        // points.push(new Point(width/2, height/2, 0, 5, '#05a'));

        requestAnimationFrame(render);
    }

    function render(time) {
        time *= 0.001;  // convert time to seconds

        // if(steps > 24) return;
        if(time > 3) return;

        // console.log(steps)
        // console.log(angleGraus)
        ctx.clearRect(0, 0, width, height);

        // const max = 1;
        // const min = -1;

        // const angleRad = ((time/10) % 360) * Math.PI / 180;
        const angleRad = -1 * Math.PI / 360;
        const rotationZ = [
            [Math.cos(angleRad), -Math.sin(angleRad), 0],
            [Math.sin(angleRad), Math.cos(angleRad), 0],
            [0, 0, 1]
        ];

        const projection = [
            [1, 0, 0],
            [0, 1, 0]
        ];

        const translateCenter = [
            [1, 0, 0, width/2],
            [0, 1, 0, height/2],
            [0, 0, 1, 0],
            [0 ,0, 0, 1]
        ];

        const translateDiagonal = [
            [1, 0, 0, steps],
            [0, 1, 0, steps],
            [0, 0, 1, 0],
            [0 ,0, 0, 1],
        ];
          


        for(const point of points) {

            const homogenousVector = MatrixHelper.vectorToMatrix(point.pos);
            homogenousVector[3] = []
            homogenousVector[3][0] = 1;
            let translatedMatriz = MatrixHelper.multiply(translateDiagonal, homogenousVector);
            let translated = MatrixHelper.matrixToVector(translatedMatriz);

            let rotated = MatrixHelper.matrixMultiplyVector(rotationZ, translated);

            let projected = MatrixHelper.matrixMultiplyVector(projection, rotated);

            point.pos = projected;
            console.log(frameCount, time , steps, point.pos)
        }

        for(const point of points) {
            point.draw(ctx);
        }

        // steps += 1;
        // steps = steps % 1;
        frameCount++;
       
        // angleGraus += 0.005;
        // angleGraus = angleGraus % 360;
        requestAnimationFrame(render);
    }

    return {
        init,
        render,
    }
}