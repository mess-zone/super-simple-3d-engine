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

        this.list = [];
        this.list.push(v0);
        this.list.push(v1);
        this.list.push(v2);
        this.list.push(v3);
        this.list.push(v4);
        this.list.push(v5);
        this.list.push(v6);
        this.list.push(v7);
        this.list.push(v8);
        this.list.push(v9);

        this.map = new Map();

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

    deepCopyMap() {
        const findVertexByName = (name, list) => {
            return list.find((vertex) => vertex.name === name);
        }

        const list = [];

        const verticesIterator = this.map.keys();
        for(let vertice of verticesIterator) {
            const v = new Vertex(vertice.pos.x, vertice.pos.y, vertice.pos.z, vertice.name);
            list.push(v);
        }

        const copyMap = new Map();

        for(let item of this.map) {
            const [ key, relations ] = item;
            const vertex = findVertexByName(key.name, list);
            const rel = [];
            for(let i = 0; i < relations.length; i++) {
                rel.push(findVertexByName(relations[i].name, list));
            }
            copyMap.set(vertex, rel);
        }

        return copyMap;

    }

    getCentroid() {
        return new Vector(this.boxSize/2, this.boxSize/2, this.boxSize/2);
    }
}
