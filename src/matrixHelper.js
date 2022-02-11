export default class MatrixHelper {

    constructor() {

    }

    static multiply(matrix, vector) {

        if(vector.length !== matrix.length) return null;

        const result = [];

        for(let row = 0; row < matrix.length; row++) {
            let sum = 0;
            for(let col = 0; col < vector.length; col++) {
                sum += matrix[row][col] * vector[col];
            }
            result[row] = sum;
        }

        return result;
    }
}