import TransformationChain from "./helpers/transformationChain.js";
import AbstractMesh from "./abstractMesh.js";

/**
 * Face-vertex mesh
 * 
 * Represent an object as a set of faces and a set of vertices. 
 * This is the most widely used mesh representation, being the input typically accepted by modern graphics hardware.
 * Face-vertex meshes improve on VV-mesh for modeling in that they allow explicit lookup of the vertices of a face, 
 * and the faces surrounding a vertex. 
 * Every face is required to have exactly 3 vertices.
 */
export default class FVMesh extends AbstractMesh {
    constructor(geometry) {
        super(geometry);
        
        const { faceList, vertexMap } = this.geometry.cloneData();
        this.faceList = faceList;
        this.vertexMap = vertexMap;
    }

    update(timeframe, time, frameCount) {
        this.rotationDegree.x = this.rotationVelocity.x * timeframe + this.rotationDegree.x;
        this.rotationDegree.y = this.rotationVelocity.y * timeframe + this.rotationDegree.y;
        this.rotationDegree.z = this.rotationVelocity.z * timeframe + this.rotationDegree.z;
        
        const scaledGeometyCentroidPos = this.getScaledGeometyCentroidPosition();
      
        // vertices update
        const verticesIterator = this.vertexMap.keys();
        const geometryIterator = this.geometry.vertexMap.keys();
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

    draw(ctx) {
        if(this.appearance.faces) {
            for(const face of this.faceList) {
                const [a, b, c] = face;
                this.drawFace(a.pos, b.pos, c.pos, ctx);
            }
        }

        if(this.appearance.edges) {
            // TODO this method is inefficient, because draws the same edge more than 1 time
            for(const face of this.faceList) {
                const [a, b, c] = face;
                this.drawEdge(a.pos, b.pos, "#fff", ctx);
                this.drawEdge(a.pos, c.pos, "#fff", ctx);
                this.drawEdge(b.pos, c.pos, "#fff", ctx);
            }
        }

        if(this.appearance.vertices) {
            const iterator = this.vertexMap.keys();
            for(const vertex of iterator) {
                let color = '#fff';
                if(vertex.name === 'v0') {
                    color = '#080';
                }
                this.drawVertice(vertex.pos, color, ctx);
            }
        }
    }
}