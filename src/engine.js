import Cube from "./cube.js";

export default function createEngine(canvas) {

    let lastTime = 0;

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let frameCount = 0;

    let cubes = [];

    function init() {
        console.log('[init]');

        const cube = new Cube(250, 250, 50, 150);
        // cube.setRotationXVelocity(25);
        // cube.setRotationYVelocity(75);
        cube.setRotationZVelocity(45);

        cubes.push(cube);
        
        requestAnimationFrame(render);
    }

    function render(time) {
        time *= 0.001;  // convert time to seconds
        const timeframe = time - lastTime
        // console.log(frameCount, lastTime, time, timeframe);
        lastTime = time;

        // if(time > 1) return;

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
            cube.update(timeframe, time, frameCount);
            cube.draw(ctx);
            cube.drawPos(ctx);
        }

        frameCount++;
        requestAnimationFrame(render);
    }

    return {
        init,
        render,
    }
}