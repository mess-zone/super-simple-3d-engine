import Vector from "./vector.js";
import Point from "./point.js";

export default function createEngine(canvas) {

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let point1;

    function init() {
        console.log('[init]');

        const v1 = new Vector(width/2, height/2, 0);
        point1 = new Point(v1, 5, '#40b');

        requestAnimationFrame(render);
    }

    function render(time) {
        ctx.clearRect(0, 0, width, height);

        const max = 1;
        const min = -1;

        point1.pos.x += Math.floor(Math.random() * (max - min + 1)) + min;
        point1.pos.y += Math.floor(Math.random() * (max - min + 1)) + min;

        point1.draw(ctx);
       
        requestAnimationFrame(render);
    }

    return {
        init,
        render,
    }
}