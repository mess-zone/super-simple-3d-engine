import Vector from "./helpers/vector.js";
import TransformationChain from "./helpers/transformationChain.js";

/**
 * Vertex-vertex mesh
 * 
 * Represent an object as a set of vertices connected to other vertices. 
 * This is the simplest representation, but not widely used since the face and edge information is implicit. 
 * Thus, it is necessary to traverse the data in order to generate a list of faces for rendering. 
 * In addition, operations on edges and faces are not easily accomplished.
 */
export default class VVMesh {
    constructor(geometry) {

        this.appearance = {
            vertices: true,
            edges: true,
            faces: false,
        };

        this.scale = 1;
        this.pos = new Vector(0,0,0);
        this.rotationDegree = new Vector(0,0,0);
        this.rotationVelocity = new Vector(0,0,0);


        this.geometry = geometry;

        this.map = this.geometry.deepCopyMap();
    }

    update(timeframe, time, frameCount) {
        this.rotationDegree.x = this.rotationVelocity.x * timeframe + this.rotationDegree.x;
        this.rotationDegree.y = this.rotationVelocity.y * timeframe + this.rotationDegree.y;
        this.rotationDegree.z = this.rotationVelocity.z * timeframe + this.rotationDegree.z;
        
        const scaledGeometyCentroidPos = this.getScaledGeometyCentroidPosition();
      
        // vertices update
        const verticesIterator = this.map.keys();
        const geometryIterator = this.geometry.map.keys();
        for(const vertex of verticesIterator) {
            vertex.pos = new TransformationChain(geometryIterator.next().value.pos)
                .scale(this.scale)
                // change origin to the center of element to rotation around the element
                .translate(scaledGeometyCentroidPos) 
                .rotateX(this.rotationDegree.x)
                .rotateY(this.rotationDegree.y)
                .rotateZ(this.rotationDegree.z)
                // undo change in origin
                .inverseTranslate(scaledGeometyCentroidPos)
                .translate(this.pos)
                .orthographicProjection()
                .getVector();
        }
    }

    drawVertice(vector, color, ctx) {
        const radius = 5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(vector.x, vector.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    drawEdge(start, end, color, ctx) {
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
            for(const item of this.map) {
                const [vertice, relations] = item;
                for(let i = 0; i < relations.length; i++) {
                    this.drawEdge(vertice.pos, relations[i].pos, "#fff", ctx);
                }
            }
        }

        if(this.appearance.vertices) {
            const iterator = this.map.keys();
            for(const vertex of iterator) {
                let color = '#fff';
                if(vertex.name === 'v0') {
                    color = '#080';
                }
                this.drawVertice(vertex.pos, color, ctx);
            }
        }
    }

    getScaledGeometyCentroidPosition() {
        return new TransformationChain(this.geometry.getCentroid())
            .scale(-this.scale) // TODO create inverseScale transformation?
            .getVector();
    }

    getMeshCentroid() {
        const scaledGeometyCentroidPos = this.getScaledGeometyCentroidPosition();

        return new TransformationChain(this.geometry.getCentroid())
                .scale(this.scale)
                // change origin to the center of element to rotation around the element
                .translate(scaledGeometyCentroidPos)
                // TODO rotation transformation is necessary to calc mesh centroid?
                .rotateX(this.rotationDegree.x)
                .rotateY(this.rotationDegree.y)
                .rotateZ(this.rotationDegree.z)
                // undo change in origin
                .inverseTranslate(scaledGeometyCentroidPos)
                .translate(this.pos)
                .orthographicProjection()
                .getVector();
    }

    drawCentroid(ctx) {
        const color = "#f008";
        const radius = 2;
        ctx.fillStyle = color;
        ctx.beginPath();
        const centroid = this.getMeshCentroid();
        ctx.arc(centroid.x, centroid.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    drawPos(ctx) {
        const color = "#00f8";
        const radius = 10;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

}