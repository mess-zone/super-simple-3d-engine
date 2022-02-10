import Vector from "./vector.js";

export default function createEngine(canvas) {

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let v1;

    function init() {
        console.log('[init]');

        v1 = new Vector(width/2, height/2, 0);

        requestAnimationFrame(render);
    }

    function render(time) {
        ctx.clearRect(0, 0, width, height);

        const max = 1;
        const min = -1;

        v1.x += Math.floor(Math.random() * (max - min + 1)) + min;
        v1.y += Math.floor(Math.random() * (max - min + 1)) + min;

        ctx.beginPath();
        ctx.arc(v1.x, v1.y, 5, 0, 2 * Math.PI, true);
        ctx.fill();
       
        requestAnimationFrame(render);
    }

    return {
        init,
        render,
    }
}