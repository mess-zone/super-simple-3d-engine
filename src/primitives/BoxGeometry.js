import Vector from "../helpers/vector.js";


export default class BoxGeometry {
    constructor() {
        this.boxSize = 1;
        // this.boxWidth = 1;
        // this.boxHeight = 1;
        // this.boxDepth = 1;

        this.mold = [];

        this.mold.push(new Vector(0,0,0));
        this.mold.push(new Vector(1,0,0));
        this.mold.push(new Vector(1,1,0));
        this.mold.push(new Vector(0,1,0));

        this.mold.push(new Vector(0,0,1));
        this.mold.push(new Vector(1,0,1));
        this.mold.push(new Vector(1,1,1));
        this.mold.push(new Vector(0,1,1));
        this.mold.push(new Vector(.5,.5,1));
        this.mold.push(new Vector(.5,.5,0));
    }
}
