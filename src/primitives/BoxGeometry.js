import Vector from "../helpers/vector.js";


export default class BoxGeometry {
    constructor() {
        this.boxSize = 1;
        // this.boxWidth = 1;
        // this.boxHeight = 1;
        // this.boxDepth = 1;

        this.mold = [];

        this.mold.push(new Vector(-this.boxSize/2, -this.boxSize/2, -this.boxSize/2));
        this.mold.push(new Vector(this.boxSize/2, -this.boxSize/2, -this.boxSize/2));
        this.mold.push(new Vector(this.boxSize/2, this.boxSize/2, -this.boxSize/2));
        this.mold.push(new Vector(-this.boxSize/2, this.boxSize/2, -this.boxSize/2));

        this.mold.push(new Vector(-this.boxSize/2, -this.boxSize/2, this.boxSize/2));
        this.mold.push(new Vector(this.boxSize/2, -this.boxSize/2, this.boxSize/2));
        this.mold.push(new Vector(this.boxSize/2, this.boxSize/2, this.boxSize/2));
        this.mold.push(new Vector(-this.boxSize/2, this.boxSize/2, this.boxSize/2));
    }
}
