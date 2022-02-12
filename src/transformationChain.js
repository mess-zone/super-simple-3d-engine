import MatrixHelper from "./matrixHelper.js";

export default class TransformationChain {
    constructor(vector) {
        this.currentVector = vector;
    }

    // FIX IT scale não funciona depois de translate
    /**
     * Proportionally scale a vector by a factor
     * 
     * If factor is 1 or 0, don't change the vector size
     * If factor is negative, also inverts the vector direction
     * @param {*} factor must be a positive or negative number different of 0
     * @returns 
     */
    scale(factor) {
        if(factor === 0) return this;

        const scale = [
            [ factor, 0, 0, 0 ],
            [ 0, factor, 0, 0 ],
            [ 0, 0, factor, 0 ],
            [ 0, 0, 0, 1 ],
        ];

        const homogenousVector = MatrixHelper.vectorToMatrix(this.currentVector);
        homogenousVector[3] = []
        homogenousVector[3][0] = 1;
        const scaledMatriz = MatrixHelper.multiply(scale, homogenousVector);
        this.currentVector = MatrixHelper.matrixToVector(scaledMatriz);

        return this;
    }

    rotateX(angleXDegrees) {
        const angleXRad = angleXDegrees * Math.PI / 180;
        const rotationX = [
            [ 1, 0, 0 ],
            [ 0, Math.cos(angleXRad), -Math.sin(angleXRad) ],
            [ 0, Math.sin(angleXRad), Math.cos(angleXRad) ]
        ];

        this.currentVector = MatrixHelper.matrixMultiplyVector(rotationX, this.currentVector);

        return this;
    }

    rotateY(angleYDegrees) {
        const angleYRad = angleYDegrees * Math.PI / 180;
        const rotationY = [
            [ Math.cos(angleYRad), 0, Math.sin(angleYRad) ],
            [ 0, 1, 0 ],
            [ -Math.sin(angleYRad), 0, Math.cos(angleYRad) ]
        ];

        this.currentVector = MatrixHelper.matrixMultiplyVector(rotationY, this.currentVector);

        return this;
    }

    rotateZ(angleZDegrees) {
        const angleZRad = angleZDegrees * Math.PI / 180;
        const rotationZ = [
            [ Math.cos(angleZRad), -Math.sin(angleZRad), 0 ],
            [ Math.sin(angleZRad), Math.cos(angleZRad), 0 ],
            [ 0, 0, 1 ]
        ];

        this.currentVector = MatrixHelper.matrixMultiplyVector(rotationZ, this.currentVector);

        return this;
    }

    translate(destination) {
        const translate = [
            [ 1, 0, 0, destination.x ],
            [ 0, 1, 0, destination.y ],
            [ 0, 0, 1, destination.z ],
            [ 0 ,0, 0, 1 ]
        ];

        const homogenousVector = MatrixHelper.vectorToMatrix(this.currentVector);
        homogenousVector[3] = []
        homogenousVector[3][0] = 1;
        const translatedMatriz = MatrixHelper.multiply(translate, homogenousVector);
        this.currentVector = MatrixHelper.matrixToVector(translatedMatriz);

        return this;
    }

    orthographicProjection() {
        const orthographicProjection = [
            [ 1, 0, 0 ],
            [ 0, 1, 0 ]
        ];

        this.currentVector = MatrixHelper.matrixMultiplyVector(orthographicProjection, this.currentVector);

        return this;
    }

    // FIXIT perspective projection does not work after scale
    perspectiveProjection() {
        const distance = 2;
        const z = 1 / ( distance - this.currentVector.z);

        const perspectiveProjection = [
            [ z, 0, 0 ],
            [ 0, z, 0 ]
        ];

        this.currentVector = MatrixHelper.matrixMultiplyVector(perspectiveProjection, this.currentVector);

        return this;
    }

    getVector() {
        return this.currentVector;
    }

}