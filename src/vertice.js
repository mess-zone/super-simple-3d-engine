import Vector from "./vector.js";

export default class Vertice {
    constructor(posX, posY, posZ) {
        // this.modelPos = new Vector(posX, posY, posZ);
        this.pos = new Vector(posX, posY, posZ);
    }
}