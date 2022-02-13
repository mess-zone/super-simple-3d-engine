import { expect } from "chai";
import MatrixHelper from "../src/helpers/matrixHelper.js";
import Vector from "../src/helpers/vector.js";

describe("MatrixHelper", function () {
    describe("#vectorToMatrix()", function () {
        it("should convert a 3D vector to a 3D matrix", function () {
            const vector = new Vector(10, 20, 30);
            const result = MatrixHelper.vectorToMatrix(vector);

            const expectedResult = [[10], [20], [30]];
            expect(result).to.deep.equal(expectedResult);
        });

        it("should convert a 4D vector to a 4D matrix");
    });

    describe("#matrixToVector()", function () {
        it("should convert a 3D matrix to a 3D vector", function () {
            const matrix = [[10], [20], [30]];
            const result = MatrixHelper.matrixToVector(matrix);

            const expectedResult = new Vector(10, 20, 30);
            expect(result).to.deep.equal(expectedResult);
        });

        it("should convert a 4D matrix to a 4D vector");
    });

    describe("#multiply()", function () {
        context('matrices 1 rows', function() {
            it("1x1 . 1x1 should result 1x1", function () {
                const a = [
                    [ 2 ],
                ];
    
                const b = [
                    [ 3 ],
                ];
                const result = MatrixHelper.multiply(a, b);
                const expectedResult = [
                    [ 6 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("1x1 . 1x2 should result 1x2", function () {
                const a = [
                    [ 2 ],
                ];
    
                const b = [
                    [ 3, 4 ],
                ];
                const result = MatrixHelper.multiply(a, b);
                const expectedResult = [
                    [ 6, 8 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("1x2 . 1x1 should not multiply", function () {
                const a = [
                    [ 3, 4 ],
                ];

                const b = [
                    [ 2 ],
                ];

                const result = MatrixHelper.multiply(a, b);
                expect(result).to.equal(null);
            });

            it("1x1 . 1x3 should result 1x3", function () {
                const a = [
                    [ 2 ],
                ];
    
                const b = [
                    [ 3, 4, 5 ],
                ];
                const result = MatrixHelper.multiply(a, b);
                const expectedResult = [
                    [ 6, 8, 10 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("1x3 . 1x1 should not multiply", function () {
                const a = [
                    [ 3, 4, 5 ],
                ];

                const b = [
                    [ 2 ],
                ];

                const result = MatrixHelper.multiply(a, b);
                expect(result).to.equal(null);
            });
            
            it("1x1 . 1x4 should result 1x4", function () {
                const a = [
                    [ 2 ],
                ];
    
                const b = [
                    [ 3, 4, 5, 6 ],
                ];
                const result = MatrixHelper.multiply(a, b);
                const expectedResult = [
                    [ 6, 8, 10, 12 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("1x4 . 1x1 should not multiply", function () {
                const a = [
                    [ 3, 4, 5, 6 ],
                ];

                const b = [
                    [ 2 ],
                ];

                const result = MatrixHelper.multiply(a, b);
                expect(result).to.equal(null);
            });

        });

        context('matrices 2 rows', function() {
            it("2x2 . 2x2 should result 2x2", function () {
                const a = [
                    [ 1, 2 ],
                    [ 3, 4 ],
                ];
    
                const b = [
                    [ 5, 6 ],
                    [ 7, 8 ],
                ];
                const result = MatrixHelper.multiply(a, b);
                const expectedResult = [
                    [ 19, 22 ],
                    [ 43, 50 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("2x2 . 2x1 should result 2x1", function () {
                const a = [
                    [ 1, 2 ],
                    [ 3, 4 ],
                ];
    
                const b = [
                    [ 5 ],
                    [ 7 ],
                ];
                const result = MatrixHelper.multiply(a, b);
                const expectedResult = [
                    [ 19 ],
                    [ 43 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("2x1 . 2x2 should not multiply", function () {
                const a = [
                    [ 5 ],
                    [ 7 ],
                ];

                const b = [
                    [ 1, 2 ],
                    [ 3, 4 ],
                ];

                const result = MatrixHelper.multiply(a, b);
                expect(result).to.equal(null);
            });
        });

        context('matrices 3 rows', function() {
            it("3x3 . 3x3 should result 3x3", function () {
                const a = [
                    [ 1, 2, 3 ],
                    [ 4, 5, 6 ],
                    [ 7, 8, 9 ],
                ];
    
                const b = [
                    [ 9, 8, 7 ],
                    [ 6, 5, 4 ],
                    [ 3, 2, 1 ],
                ];
                const result = MatrixHelper.multiply(a, b);
    
                const expectedResult = [
                    [ 30, 24, 18 ],
                    [ 84, 69, 54 ],
                    [ 138, 114, 90 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });
    
            it("3x3 . 3x2 should result 3x2", function () {
                const a = [
                    [ 1, 2, 3 ],
                    [ 4, 5, 6 ],
                    [ 7, 8, 9 ],
                ];
    
                const b = [
                    [ 2, 5 ],
                    [ 6, 7 ],
                    [ 1, 8 ],
                ];
                const result = MatrixHelper.multiply(a, b);
    
                const expectedResult = [
                    [ 17, 43 ],
                    [ 44, 103 ],
                    [ 71, 163 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });
    
            it("3x2 . 3x3 should not multiply", function () {
                const a = [
                    [ 2, 5 ],
                    [ 6, 7 ],
                    [ 1, 8 ],
                ];
    
                const b = [
                    [ 1, 2, 3 ],
                    [ 4, 5, 6 ],
                    [ 7, 8, 9 ],
                ];
    
                const result = MatrixHelper.multiply(a, b);
                expect(result).to.deep.equal(null);
            });
    
            it("3x3 . 3x1 should result 3x1", function () {
                const a = [
                    [ 1, 2, 3 ],
                    [ 4, 5, 6 ],
                    [ 7, 8, 9 ],
                ];
    
                const b = [
                    [ 2 ],
                    [ 6 ],
                    [ 1 ],
                ];
                const result = MatrixHelper.multiply(a, b);
    
                const expectedResult = [
                    [ 17 ],
                    [ 44 ],
                    [ 71 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });
    
            it("3x1 . 3x3 should not multiply", function () {
                const a = [
                    [ 2 ],
                    [ 6 ],
                    [ 1 ],
                ];
    
                const b = [
                    [ 1, 2, 3 ],
                    [ 4, 5, 6 ],
                    [ 7, 8, 9 ],
                ];
    
                const result = MatrixHelper.multiply(a, b);
    
                expect(result).to.deep.equal(null);
            });
        });

        context('matrices 4 rows', function() {
            it("4x4 . 4x4 should result 4x4", function () {
                const a = [
                    [ 1, 2, 3, 4 ],
                    [ 5, 6, 7, 8 ],
                    [ 9, 10, 11, 12 ],
                    [ 13, 14, 15, 16 ],
                ];
    
                const b = [
                    [ 16, 15, 14, 13 ],
                    [ 12, 11, 10, 9 ],
                    [ 8, 7, 6, 5 ],
                    [ 4, 3, 2, 1],
                ];
                const result = MatrixHelper.multiply(a, b);
    
                const expectedResult = [
                    [ 80, 70, 60, 50 ],
                    [ 240, 214, 188, 162 ],
                    [ 400, 358, 316, 274 ],
                    [ 560, 502, 444, 386 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("4x4 . 4x3 should result 4x3", function () {
                const a = [
                    [ 1, 2, 3, 4 ],
                    [ 5, 6, 7, 8 ],
                    [ 9, 10, 11, 12 ],
                    [ 13, 14, 15, 16 ],
                ];
    
                const b = [
                    [ 16, 15, 14 ],
                    [ 12, 11, 10 ],
                    [ 8, 7, 6 ],
                    [ 4, 3, 2],
                ];
                const result = MatrixHelper.multiply(a, b);
    
                const expectedResult = [
                    [ 80, 70, 60 ],
                    [ 240, 214, 188 ],
                    [ 400, 358, 316 ],
                    [ 560, 502, 444 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("4x3 . 4x4 should not multiply", function () {
                const a = [
                    [ 16, 15, 14 ],
                    [ 12, 11, 10 ],
                    [ 8, 7, 6 ],
                    [ 4, 3, 2],
                ];

                const b = [
                    [ 1, 2, 3, 4 ],
                    [ 5, 6, 7, 8 ],
                    [ 9, 10, 11, 12 ],
                    [ 13, 14, 15, 16 ],
                ];

                const result = MatrixHelper.multiply(a, b);
                expect(result).to.equal(null);
            });

            it("4x4 . 4x2 should result 4x2", function () {
                const a = [
                    [ 1, 2, 3, 4 ],
                    [ 5, 6, 7, 8 ],
                    [ 9, 10, 11, 12 ],
                    [ 13, 14, 15, 16 ],
                ];
    
                const b = [
                    [ 16, 15 ],
                    [ 12, 11 ],
                    [ 8, 7 ],
                    [ 4, 3 ],
                ];
                const result = MatrixHelper.multiply(a, b);
    
                const expectedResult = [
                    [ 80, 70 ],
                    [ 240, 214 ],
                    [ 400, 358 ],
                    [ 560, 502 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("4x2 . 4x4 should not multiply", function () {
                const a = [
                    [ 16, 15 ],
                    [ 12, 11 ],
                    [ 8, 7 ],
                    [ 4, 3 ],
                ];

                const b = [
                    [ 1, 2, 3, 4 ],
                    [ 5, 6, 7, 8 ],
                    [ 9, 10, 11, 12 ],
                    [ 13, 14, 15, 16 ],
                ];

                const result = MatrixHelper.multiply(a, b);
                expect(result).to.equal(null);
            });

            it("4x4 . 4x1 should result 4x1", function () {
                const a = [
                    [ 1, 2, 3, 4 ],
                    [ 5, 6, 7, 8 ],
                    [ 9, 10, 11, 12 ],
                    [ 13, 14, 15, 16 ],
                ];
    
                const b = [
                    [ 16 ],
                    [ 12 ],
                    [ 8 ],
                    [ 4 ],
                ];
                const result = MatrixHelper.multiply(a, b);
    
                const expectedResult = [
                    [ 80 ],
                    [ 240 ],
                    [ 400 ],
                    [ 560 ],
                ];
                expect(result).to.deep.equal(expectedResult);
                expect(result.length).to.equal(expectedResult.length);
                expect(result[0].length).to.equal(expectedResult[0].length);
            });

            it("4x1 . 4x4 should not multiply", function () {
                const a = [
                    [ 16 ],
                    [ 12 ],
                    [ 8 ],
                    [ 4 ],
                ];

                const b = [
                    [ 1, 2, 3, 4 ],
                    [ 5, 6, 7, 8 ],
                    [ 9, 10, 11, 12 ],
                    [ 13, 14, 15, 16 ],
                ];

                const result = MatrixHelper.multiply(a, b);
                expect(result).to.equal(null);
            });
        });

    });

    describe("#matrixMultiplyVector()", function () {
        it("should multiply 3D matrix by 3D vector and return a new vector", function() {
            const matrix = [
                [ 1, 2, 3 ],
                [ 4, 5, 6 ],
                [ 7, 8, 9 ],
            ];

            const vector = new Vector(9, 6, 3);

            const result = MatrixHelper.matrixMultiplyVector(matrix, vector);
            
            const expectedResult = new Vector(30, 84, 138)
            expect(result).to.deep.equal(expectedResult);

        });

        it("4D multiplication?");
    });
});
