export default function createEngine(canvas) {

    let lastTime = 0;

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let frameCount = 0;

    let meshes = [];

    function init() {
        console.log('[init]');
        requestAnimationFrame(render);
    }

    function addMesh(mesh) {
        meshes.push(mesh);
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
            mesh.drawPos(ctx);
        }

        frameCount++;
        requestAnimationFrame(render);
    }

    return {
        init,
        addMesh,
        render,
    }
}