import Vector from "../helpers/vector.js";
import Vertex from "../vertex.js";

/**
 * Primitive 3D shape representing a simple Box ("box-cylinder")
 * 
 * Uses the Face-vertex mesh to represent the data
 */
export default class FVBoxGeometry {
    constructor() {
        this.boxSize = 1;
        // this.boxWidth = 1;
        // this.boxHeight = 1;
        // this.boxDepth = 1;

        const { faceList, vertexMap } = this.cloneData();
        this.faceList = faceList;
        this.vertexMap = vertexMap;
    }

    /**
     * Populate a faceList and a vertex map
     */
    cloneData() {
        //vertices
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

        // faces
        const f0 = [ v0, v4, v5 ];
        const f1 = [ v0, v5, v1 ];

        const f2 = [ v1, v5, v6 ];
        const f3 = [ v1, v6, v2 ];

        const f4 = [ v2, v6, v7 ];
        const f5 = [ v2, v7, v3 ];

        const f6 = [ v3, v7, v4 ];
        const f7 = [ v3, v4, v0 ];

        const f8 = [ v8, v5, v4 ];
        const f9 = [ v8, v6, v5 ];
        const f10 = [ v8, v7, v6 ];
        const f11 = [ v8, v4, v7 ];

        const f12 = [ v9, v1, v0 ];
        const f13 = [ v9, v2, v1 ];
        const f14 = [ v9, v3, v2 ];
        const f15 = [ v9, v0, v3 ];

        // faceList
        const faceList = [];
        faceList.push(f0);
        faceList.push(f1);
        faceList.push(f2);
        faceList.push(f3);
        faceList.push(f4);
        faceList.push(f5);
        faceList.push(f6);
        faceList.push(f7);
        faceList.push(f8);
        faceList.push(f9);
        faceList.push(f10);
        faceList.push(f11);
        faceList.push(f12);
        faceList.push(f13);
        faceList.push(f14);
        faceList.push(f15);

        //vertexMap
        const vertexMap = new Map();
        vertexMap.set(v0, [ f0, f1, f7, f12, f15 ]);
        vertexMap.set(v1, [ f1, f2, f3, f12, f13 ]);
        vertexMap.set(v2, [ f3, f4, f5, f13, f14 ]);
        vertexMap.set(v3, [ f5, f6, f7, f14, f15 ]);
        vertexMap.set(v4, [ f0, f6, f7, f8, f11 ]);
        vertexMap.set(v5, [ f0, f1, f2, f8, f9 ]);
        vertexMap.set(v6, [ f2, f3, f4, f9, f10 ]);
        vertexMap.set(v7, [ f4, f5, f6, f10, f11 ]);
        vertexMap.set(v8, [ f8, f9, f10, f11 ]);
        vertexMap.set(v9, [ f12, f13, f14, f15 ]);

        return {
            faceList,
            vertexMap,
        }
    }

    getCentroid() {
        return new Vector(this.boxSize/2, this.boxSize/2, this.boxSize/2);
    }
}
