export default class MatrixHelper {

    constructor() {

    }

    static multiply(a, b) {

        let colsA = a[0].length;
        let rowsA = a.length;
        let colsB = b[0].length;
        let rowsB = b.length;

        if(colsA !== rowsB) {
            console.error('Columns of A must match rows of B');
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
}