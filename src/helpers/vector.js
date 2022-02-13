export default class Vector {   
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    multiply(scalar) {
        return new Vector( this.x * scalar,  this.y * scalar,  this.z * scalar)
    }

    invert() {
        return new Vector(-this.x, -this.y, -this.z);
    }


}