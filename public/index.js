import createEngine from "../src/engine.js";
import MatrixHelper from "../src/matrixHelper.js";
import Vector from "../src/vector.js";

const canvas = document.querySelector('#canvas');
const renderer = new createEngine(canvas);

renderer.init();

const a = [
    [ 1, 2, 1 ],
    [ 0, 1, 0 ],
    [ 2, 3, 4 ],
];

const b = [
    [ 2 ], 
    [ 6 ], 
    [ 1 ],
];

const bvec = new Vector(2, 6, 1)

// console.log(MatrixHelper.multiply(a, b));
// console.log(MatrixHelper.matrixMultiplyVector(a, bvec));
const [ x, y, z ] = [ 10, 20, 30 ];

const translation = [
    [ 1, 0, 0, x ],
    [ 0, 1, 0, y ],
    [ 0, 0, 1, z ],
    [ 0, 0, 0, 1 ],
];

const homogenousVector = [
    [ 2 ], 
    [ 6 ], 
    [ 3 ],
    [ 1 ],
];

console.log(MatrixHelper.multiply(translation, homogenousVector));

