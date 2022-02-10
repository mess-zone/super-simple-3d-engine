import createEngine from "../src/engine.js";

const canvas = document.querySelector('#canvas');
const renderer = new createEngine(canvas);

renderer.init();