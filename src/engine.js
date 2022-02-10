import Vector from "./vector.js";
import Point from "./point.js";

export default function createEngine(canvas) {

    const ctx = canvas.getContext("2d");
    const width = 500;
    const height = 500;

    let points  = [];

    function init() {
        console.log('[init]');

        points.push(new Point(new Vector(width/2, height/2, 0), 5, '#40b'))
        points.push(new Point(new Vector(width/2, height/2, 0), 5, '#333'))
        points.push(new Point(new Vector(width/2, height/2, 0), 5, '#006'))
        points.push(new Point(new Vector(width/2, height/2, 0), 5, '#606'))
        points.push(new Point(new Vector(width/2, height/2, 0), 5, '#05a'))

        requestAnimationFrame(render);
    }

    function render(time) {
        ctx.clearRect(0, 0, width, height);

        const max = 1;
        const min = -1;

        for(const point of points) {
            point.pos.x += Math.floor(Math.random() * (max - min + 1)) + min;
            point.pos.y += Math.floor(Math.random() * (max - min + 1)) + min;
    
            point.draw(ctx);
        }
       
        requestAnimationFrame(render);
    }

    return {
        init,
        render,
    }
}