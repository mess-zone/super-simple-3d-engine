import TransformationChain from "./helpers/transformationChain.js";
import AbstractMesh from "./abstractMesh.js";

/**
 * Vertex-vertex mesh
 * 
 * Represent an object as a set of vertices connected to other vertices. 
 * This is the simplest representation, but not widely used since the face and edge information is implicit. 
 * Thus, it is necessary to traverse the data in order to generate a list of faces for rendering. 
 * In addition, operations on edges and faces are not easily accomplished.
 */
export default class VVMesh extends AbstractMesh {
    constructor(geometry) {
        super(geometry);

        const { vertexMap } = this.geometry.cloneData();
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
            // TODO
        }

        if(this.appearance.edges) {
            // TODO this method is inefficient, because draws the same edge more than 1 time
            for(const item of this.vertexMap) {
                const [vertice, relations] = item;
                for(let i = 0; i < relations.length; i++) {
                    this.drawEdge(vertice.pos, relations[i].pos, "#fff", ctx);
                }
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