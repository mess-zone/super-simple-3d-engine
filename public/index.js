import createEngine from "../src/engine.js";

const vvCanvas = document.querySelector('#vv-canvas');
const vvRenderer = new createEngine(vvCanvas);
vvRenderer.init();

const fvcanvas = document.querySelector('#fv-canvas');
const fvRenderer = new createEngine(fvcanvas);
fvRenderer.init();

