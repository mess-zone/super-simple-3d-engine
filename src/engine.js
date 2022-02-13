import Mesh from "./mesh.js";
import BoxGeometry from "./primitives/BoxGeometry.js";

export default function createEngine(canvas) {

    let lastTime = 0;

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let frameCount = 0;

    let meshes = [];

    function init() {
        console.log('[init]');

        const boxGeometry = new BoxGeometry();

        const boxMesh = new Mesh(boxGeometry);
        boxMesh.scale = 100;
        boxMesh.pos.x = 250;
        boxMesh.pos.y = 250;
        boxMesh.pos.z = 50;
        // boxMesh.rotationDegree.x = 20;
        // boxMesh.rotationDegree.y = 0;
        // boxMesh.rotationDegree.z = 0;
        boxMesh.rotationVelocity.x = 25;
        boxMesh.rotationVelocity.y = 75;
        boxMesh.rotationVelocity.z = 45;

        meshes.push(boxMesh);
        
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


        for(const mesh of meshes) {
            mesh.update(timeframe, time, frameCount);
            mesh.draw(ctx);
            mesh.drawCentroid(ctx);
        }

        frameCount++;
        requestAnimationFrame(render);
    }

    return {
        init,
        render,
    }
}