import Vector from "./helpers/vector.js";
import TransformationChain from "./helpers/transformationChain.js";

/**
 * Represent an object as a polygon mesh
 * 
 * Depending on strategy of implementation, can use diferent structures to store the polygon mesh data:
 * Vertex-vertex meshes, Face-vertex meshes, Winged-edge, Half-edge meshes, Quad-edge meshes, Corner-tables, etc...
 */
export default class AbstractMesh {
    constructor(geometry) {
        if (new.target === AbstractMesh) {
            throw new TypeError("Cannot construct AbstractMesh instances directly");
        }

        this.appearance = {
            vertices: true,
            edges: true,
            faces: true,
        };

        this.scale = 1;
        this.pos = new Vector(0,0,0);
        this.rotationDegree = new Vector(0,0,0);
        this.rotationVelocity = new Vector(0,0,0);

        this.geometry = geometry;
    }

    update(timeframe, time, frameCount) {
        throw new TypeError("update method should be implemented in concrete class");
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

    // TODO does not apply to vvmesh?
    drawFace(v1, v2, v3, ctx) {
        const color = "#8888";

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.closePath();
        ctx.fill();
    }

    draw(ctx) {
        throw new TypeError("draw method should be implemented in concrete class");
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