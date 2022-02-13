import createEngine from "../src/engine.js";
import VVMesh from "../src/VVMesh.js";
import VVBoxGeometry from "../src/primitives/vvBoxGeometry.js";

/**
 * VV Mesh example
 */
function vvMeshExample() {
    const canvas = document.querySelector('#vv-canvas');
    const renderer = new createEngine(canvas);
    
    const boxGeometry = new VVBoxGeometry();
    
    const boxMesh = new VVMesh(boxGeometry);
    boxMesh.scale = 100;
    boxMesh.pos.x = 200;
    boxMesh.pos.y = 200;
    boxMesh.pos.z = 50;
    boxMesh.rotationVelocity.x = 25;
    boxMesh.rotationVelocity.y = 75;
    boxMesh.rotationVelocity.z = 45;
    renderer.init();
    renderer.addMesh(boxMesh);
}

vvMeshExample();


/**
 * FV Mesh example
 */
 function fvMeshExample() {
    const canvas = document.querySelector('#fv-canvas');
    const renderer = new createEngine(canvas);
    
    const boxGeometry = new VVBoxGeometry();
    
    const boxMesh = new VVMesh(boxGeometry);
    boxMesh.scale = 100;
    boxMesh.pos.x = 200;
    boxMesh.pos.y = 200;
    boxMesh.pos.z = 50;
    boxMesh.rotationVelocity.x = 25;
    boxMesh.rotationVelocity.y = 75;
    boxMesh.rotationVelocity.z = 45;
    renderer.init();
    renderer.addMesh(boxMesh);
}

fvMeshExample();