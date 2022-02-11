import Vector from "./vector.js";
import Vertice from "./vertice.js";

export default class Cube {
    constructor(posX, posY, posZ, size) {
        this.size = size;

        this.originalPos = new Vector(posX, posY, posZ);
        this.pos = new Vector(posX, posY, posZ);

        this.appearance = {
            vertices: true,
            edges: true,
            faces: true,
        };
        
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;

        this.vertices = [];

        this.vertices.push(new Vertice(-size/2, -size/2, -size/2));
        this.vertices.push(new Vertice(size/2, -size/2, -size/2));
        this.vertices.push(new Vertice(size/2, size/2, -size/2));
        this.vertices.push(new Vertice(-size/2, size/2, -size/2));

        this.vertices.push(new Vertice(-size/2, -size/2, size/2));
        this.vertices.push(new Vertice(size/2, -size/2, size/2));
        this.vertices.push(new Vertice(size/2, size/2, size/2));
        this.vertices.push(new Vertice(-size/2, size/2, size/2));
    }

    /**
     * Infinitely rotate object in the x axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateX(velocity) {
        this.rotationX = velocity; 
        this.vertices.forEach(vertice => {
            vertice.rotateX(velocity);
        });
    }

    /**
     * Infinitely rotate object in the y axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateY(velocity) {
        this.rotationY = velocity; 
        this.vertices.forEach(vertice => {
            vertice.rotateY(velocity);
        });
    }

    /**
     * Infinitely rotate object in the z axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateZ(velocity) {
        this.rotationZ = velocity; 
        this.vertices.forEach(vertice => {
            vertice.rotateZ(velocity);
        });
    }

    /**
     * Update position based on velocities
     * @param {*} time 
     * @param {*} frameCount 
     */
    update(time, frameCount) {
        for(const vertice of this.vertices) {
            vertice.update(time, frameCount)
            // console.log(frameCount, time, point.pos)
        }
    }

    drawVertice(vector, ctx) {
        const color = "#fff";
        const radius = 5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(vector.x, vector.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    drawEdge(start, end, ctx) {
        const color = "#fff";
        const strokeWidth = 3;

        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }

    drawFace(v1, v2, v3, v4, ctx) {
        const color = "#8888";

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.lineTo(v4.x, v4.y);
        ctx.closePath();
        ctx.fill();
    }

    draw(ctx) {
        if(this.appearance.faces) {
            this.drawFace(this.vertices[0].pos, this.vertices[1].pos, this.vertices[2].pos, this.vertices[3].pos, ctx);
            this.drawFace(this.vertices[4].pos, this.vertices[5].pos, this.vertices[6].pos, this.vertices[7].pos, ctx);
            
            this.drawFace(this.vertices[0].pos, this.vertices[4].pos, this.vertices[7].pos, this.vertices[3].pos, ctx);
            this.drawFace(this.vertices[1].pos, this.vertices[5].pos, this.vertices[6].pos, this.vertices[2].pos, ctx);
            
            this.drawFace(this.vertices[0].pos, this.vertices[1].pos, this.vertices[5].pos, this.vertices[4].pos, ctx);
            this.drawFace(this.vertices[3].pos, this.vertices[2].pos, this.vertices[6].pos, this.vertices[7].pos, ctx);
        }

        if(this.appearance.edges) {
            for (let i = 0; i < 4; i++) {
                this.drawEdge(this.vertices[i].pos, this.vertices[(i + 1) % 4].pos, ctx);
                this.drawEdge(this.vertices[i + 4].pos, this.vertices[((i + 1) % 4) + 4].pos, ctx);
                this.drawEdge(this.vertices[i].pos, this.vertices[i + 4].pos, ctx);
            }
        }

        if(this.appearance.vertices) {
            this.vertices.forEach(vertice => {
                this.drawVertice(vertice.pos, ctx);
            });
        }

    }

}