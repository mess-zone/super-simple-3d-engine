import createEngine from "../src/engine.js";
import MatrixHelper from "../src/matrixHelper.js";

const canvas = document.querySelector('#canvas');
const renderer = new createEngine(canvas);

renderer.init();

const a = [
    [ 1, 2, 1 ],
    [ 0, 1, 0 ],
    [ 2, 3, 4 ],
];

const b = [
    2, 
    6, 
    1
];

console.log(MatrixHelper.multiply(a, b));

