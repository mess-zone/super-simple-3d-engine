import Vector from "./helpers/vector.js";
import TransformationChain from "./helpers/transformationChain.js";

export default class Mesh {
    constructor(geometry) {

        this.appearance = {
            vertices: true,
            edges: true,
            faces: true,
        };

        this.scale = 1;
        this.pos = new Vector(0,0,0); //centroid
        this.rotationDegree = new Vector(0,0,0);
        this.rotationVelocity = new Vector(0,0,0);


        this.geometry = geometry;

        this.vertices = [];

        for (let i = 0; i <= this.geometry.mold.length; i++) {
            this.vertices.push(new Vector(0,0,0));
        }
    }

    update(timeframe, time, frameCount) {
        this.rotationDegree.x = this.rotationVelocity.x * timeframe + this.rotationDegree.x;
        this.rotationDegree.y = this.rotationVelocity.y * timeframe + this.rotationDegree.y;
        this.rotationDegree.z = this.rotationVelocity.z * timeframe + this.rotationDegree.z;

        // vertices update
        for(let i = 0; i < this.vertices.length; i++) {
            const transformationChain = new TransformationChain(this.geometry.mold[i]);
    
            this.vertices[i] = transformationChain
                .scale(this.scale)
                .rotateX(this.rotationDegree.x)
                .rotateY(this.rotationDegree.y)
                .rotateZ(this.rotationDegree.z)
                .translate(this.pos)
                .orthographicProjection()
                .getVector();
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
            this.drawFace(this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3], ctx);
            this.drawFace(this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7], ctx);
            
            this.drawFace(this.vertices[0], this.vertices[4], this.vertices[7], this.vertices[3], ctx);
            this.drawFace(this.vertices[1], this.vertices[5], this.vertices[6], this.vertices[2], ctx);
            
            this.drawFace(this.vertices[0], this.vertices[1], this.vertices[5], this.vertices[4], ctx);
            this.drawFace(this.vertices[3], this.vertices[2], this.vertices[6], this.vertices[7], ctx);
        }

        if(this.appearance.edges) {
            for (let i = 0; i < 4; i++) {
                this.drawEdge(this.vertices[i], this.vertices[(i + 1) % 4], ctx);
                this.drawEdge(this.vertices[i + 4], this.vertices[((i + 1) % 4) + 4], ctx);
                this.drawEdge(this.vertices[i], this.vertices[i + 4], ctx);
            }
        }

        if(this.appearance.vertices) {
            this.vertices.forEach(vector => {
                this.drawVertice(vector, ctx);
            });
        }
    }

    drawCentroid(ctx) {
        const color = "#f008";
        const radius = 5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

}