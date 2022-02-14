import Vector from "../helpers/vector.js";

/**
 * Primitive 3D shape representing a simple Box ("box-cylinder")
 * 
 */
export default class AbstractBoxGeometry {
    constructor() {
        if (new.target === AbstractBoxGeometry) {
            throw new TypeError("Cannot construct AbstractBoxGeometry instances directly");
        }

        this.boxSize = 1;
        // this.boxWidth = 1;
        // this.boxHeight = 1;
        // this.boxDepth = 1;
    }

    /**
     * Populate a structure representing the mesh
     */
    cloneData() {
        throw new TypeError("cloneData method should be implemented in concrete class");
    }

    /**
     * 
     * @returns Return a vertex representing the centroid position of the geometry 
     */
    getCentroid() {
        return new Vector(this.boxSize/2, this.boxSize/2, this.boxSize/2);
    }
}
