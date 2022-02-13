import Vector from "./helpers/vector.js";

// TODO vertex seems to be only a simple inheritance of Vector
export default class Vertex {
    constructor(x, y, z, name){
        this.name = name; // for debug purposes
        this.pos = new Vector(x, y, z);
    }
}