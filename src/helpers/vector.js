export default class Vector {   
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    multiply(scalar) {
        this.x = this.x * scalar;
        this.y = this.y * scalar;
        this.z = this.z * scalar;
    }
}