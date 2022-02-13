import Vector from "./vector.js";
export default class MatrixHelper {

    constructor() {

    }

    static vectorToMatrix(vector) {
        let m = [];
        for(let i = 0; i < 3; i++) {
            m[i] = [];            
        }

        m[0][0] = vector.x;
        m[1][0] = vector.y;
        m[2][0] = vector.z;

        return m;
    }

    static matrixToVector(matrix) {
        return new Vector(matrix[0][0], matrix[1][0], matrix.length > 2 ? matrix[2][0] : 0);
    }

    static multiply(a, b) {

        let colsA = a[0].length;
        let rowsA = a.length;
        let colsB = b[0].length;
        let rowsB = b.length;

        if(colsA !== rowsB) {
            // console.error('Columns of A must match rows of B');
            return null;
        }

        const result = [];
        for(let j = 0; j < rowsA; j++) {
            result[j] = [];
            for(let i = 0; i < colsB; i++) {
                let sum = 0;
                for(let n = 0; n < colsA; n++) {
                    sum += a[j][n] * b[n][i];
                }
                result[j][i] = sum;
            }
        }

        return result;
    }

    static matrixMultiplyVector(matrix, vector) {
        let v = MatrixHelper.vectorToMatrix(vector);
        let result = MatrixHelper.multiply(matrix, v);
        return MatrixHelper.matrixToVector(result);
    }
}