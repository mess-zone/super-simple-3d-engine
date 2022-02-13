import Vector from "./helpers/vector.js";
import TransformationChain from "./helpers/transformationChain.js";
import Vertex from "./vertex.js";

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

        this.map = new Map();

        const v0 = new Vertex(0,0,0, 'v0');
        const v1 = new Vertex(1,0,0, 'v1');
        const v2 = new Vertex(1,1,0, 'v2');
        const v3 = new Vertex(0,1,0, 'v3');
        const v4 = new Vertex(0,0,1, 'v4');
        const v5 = new Vertex(1,0,1, 'v5');
        const v6 = new Vertex(1,1,1, 'v6');
        const v7 = new Vertex(0,1,1, 'v7');
        const v8 = new Vertex(.5,.5,1, 'v8');
        const v9 = new Vertex(.5,.5,0, 'v9');

        this.map.set(v0, [ v1, v5, v4, v3, v9 ]);
        this.map.set(v1, [ v2, v6, v5, v0, v9 ]);
        this.map.set(v2, [ v3, v7, v6, v1, v9 ]);
        this.map.set(v3, [ v2, v6, v7, v4, v9 ]);
        this.map.set(v4, [ v5, v0, v3, v7, v8 ]);
        this.map.set(v5, [ v6, v1, v0, v4, v8 ]);
        this.map.set(v6, [ v7, v2, v1, v5, v8 ]);
        this.map.set(v7, [ v4, v3, v2, v6, v8 ]);
        this.map.set(v8, [ v4, v5, v6, v7 ]);
        this.map.set(v9, [ v0, v1, v2, v3 ]);

    }

    update(timeframe, time, frameCount) {
        this.rotationDegree.x = this.rotationVelocity.x * timeframe + this.rotationDegree.x;
        this.rotationDegree.y = this.rotationVelocity.y * timeframe + this.rotationDegree.y;
        this.rotationDegree.z = this.rotationVelocity.z * timeframe + this.rotationDegree.z;

        // vertices update
        let index = 0;
        const iterator = this.map.keys();
        for(const vertex of iterator) {
            // console.log(index, vertex)
            const transformationChain = new TransformationChain(this.geometry.mold[index]);
            vertex.pos = transformationChain
                .scale(this.scale)
                .rotateX(this.rotationDegree.x)
                .rotateY(this.rotationDegree.y)
                .rotateZ(this.rotationDegree.z)
                .translate(this.pos)
                .orthographicProjection()
                .getVector();

            index++;
        }
    }

    drawVertice(vector, ctx) {
        const color = "#fff";
        const radius = 5;
        // ctx.fillStyle = color;
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
            // this.drawFace(this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3], ctx);
            // this.drawFace(this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7], ctx);
            
            // this.drawFace(this.vertices[0], this.vertices[4], this.vertices[7], this.vertices[3], ctx);
            // this.drawFace(this.vertices[1], this.vertices[5], this.vertices[6], this.vertices[2], ctx);
            
            // this.drawFace(this.vertices[0], this.vertices[1], this.vertices[5], this.vertices[4], ctx);
            // this.drawFace(this.vertices[3], this.vertices[2], this.vertices[6], this.vertices[7], ctx);
        }

        if(this.appearance.edges) {

            // const iterator = this.map.keys();
            // const v0 = iterator.next().value;
            // const relations = this.map.get(v0);
            // console.log(v0, relations);
            // this.drawEdge(v0.pos, relations[4].pos, ctx);
            // for(let i = 0; i < relations.length; i++) {
            //     this.drawEdge(v0.pos, relations[i].pos, ctx);
            // }

            let index = 0;
            for(const item of this.map) {
                const [vertice, relations] = item;
                for(let i = 0; i < relations.length; i++) {
                    this.drawEdge(vertice.pos, relations[i].pos, ctx);
                }
                index++;
            }
        }

        if(this.appearance.vertices) {
            const iterator = this.map.keys();
            for(const vertex of iterator) {
                ctx.fillStyle = '#fff';
                if(vertex.name === 'v0') {
                    ctx.fillStyle = '#080';
                }
                this.drawVertice(vertex.pos, ctx);
            }
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