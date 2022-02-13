import Vector from "../helpers/vector.js";
import Vertex from "../vertex.js";

/**
 * Primitive 3D shape representing a simple Box
 * 
 * Uses the Vertex-vertex mesh to represent the data
 */
export default class VVBoxGeometry {
    constructor() {
        this.boxSize = 1;
        // this.boxWidth = 1;
        // this.boxHeight = 1;
        // this.boxDepth = 1;

        this.vertexList = [];
        this.vertexMap = new Map();
        this.buildMap(this.vertexList, this.vertexMap);

    }

    buildMap(vertexList, vertexMap) {
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
        
        vertexList.push(v0);
        vertexList.push(v1);
        vertexList.push(v2);
        vertexList.push(v3);
        vertexList.push(v4);
        vertexList.push(v5);
        vertexList.push(v6);
        vertexList.push(v7);
        vertexList.push(v8);
        vertexList.push(v9);

        vertexMap.set(v0, [ v1, v5, v4, v3, v9 ]);
        vertexMap.set(v1, [ v2, v6, v5, v0, v9 ]);
        vertexMap.set(v2, [ v3, v7, v6, v1, v9 ]);
        vertexMap.set(v3, [ v2, v6, v7, v4, v9 ]);
        vertexMap.set(v4, [ v5, v0, v3, v7, v8 ]);
        vertexMap.set(v5, [ v6, v1, v0, v4, v8 ]);
        vertexMap.set(v6, [ v7, v2, v1, v5, v8 ]);
        vertexMap.set(v7, [ v4, v3, v2, v6, v8 ]);
        vertexMap.set(v8, [ v4, v5, v6, v7 ]);
        vertexMap.set(v9, [ v0, v1, v2, v3 ]);
    }

    // @deprecated
    // deepCopyMap() {
    //     const findVertexByName = (name, list) => {
    //         return list.find((vertex) => vertex.name === name);
    //     }

    //     const vlist = [];
    //     for(let vertex of this.vertexList) {
    //         // TODO function to deep copy a vertex 
    //         vlist.push(new Vertex(vertex.pos.x, vertex.pos.y, vertex.pos.z, vertex.name));
    //     }

    //     const copyMap = new Map();

    //     for(let item of this.vertexMap) {
    //         const [ key, relations ] = item;
    //         // TODO find a way to copy without relying in the vertex name, witch may not be unique
    //         const vertex = findVertexByName(key.name, vlist);
    //         const rel = [];
    //         for(let i = 0; i < relations.length; i++) {
    //             rel.push(findVertexByName(relations[i].name, vlist));
    //         }
    //         copyMap.set(vertex, rel);
    //     }

    //     return copyMap;

    // }

    getCentroid() {
        return new Vector(this.boxSize/2, this.boxSize/2, this.boxSize/2);
    }
}
