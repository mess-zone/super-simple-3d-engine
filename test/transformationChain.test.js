import { expect } from "chai";
import TransformationChain from "../src/transformationChain.js";
import Vector from "../src/vector.js";

describe("TransformationChain", function() {
    context("Scale transformation", function() {
        it('scale by 0 factor not allowed (keeps the current vector)', function() {
            const vector = new Vector(10, 20, 30);
            const sut = new TransformationChain(vector);
    
            const factor = 0;
    
            const result = sut.scale(factor).getVector();
            const expectedResult = vector;
            expect(result).to.deep.equal(expectedResult);
        });

        it('scale by 0.5 factor', function() {
            const vector = new Vector(10, 20, 30);
            const sut = new TransformationChain(vector);
    
            const factor = 0.5;
    
            const result = sut.scale(factor).getVector();
            const expectedResult = new Vector(10 * factor, 20 * factor, 30 * factor);
            expect(result).to.deep.equal(expectedResult);
        });

        it('scale by 1 factor keeps the current vector', function() {
            const vector = new Vector(10, 20, 30);
            const sut = new TransformationChain(vector);
    
            const factor = 1;
    
            const result = sut.scale(factor).getVector();
            const expectedResult = new Vector(10 * factor, 20 * factor, 30 * factor);
            expect(result).to.deep.equal(expectedResult);
        });

        it('scale by 1.5 factor', function() {
            const vector = new Vector(10, 20, 30);
            const sut = new TransformationChain(vector);
    
            const factor = 1.5;
    
            const result = sut.scale(factor).getVector();
            const expectedResult = new Vector(10 * factor, 20 * factor, 30 * factor);
            expect(result).to.deep.equal(expectedResult);
        });

        it('scale by 2 factor', function() {
            const vector = new Vector(10, 20, 30);
            const sut = new TransformationChain(vector);
    
            const factor = 2;
    
            const result = sut.scale(factor).getVector();
            const expectedResult = new Vector(10 * factor, 20 * factor, 30 * factor);
            expect(result).to.deep.equal(expectedResult);
        });

        it('scale by negative factor also inverts de vector', function() {
            const vector = new Vector(10, 20, 30);
            const sut = new TransformationChain(vector);
    
            const factor = -2;
    
            const result = sut.scale(factor).getVector();
            const expectedResult = new Vector(10 * factor, 20 * factor, 30 * factor);
            expect(result).to.deep.equal(expectedResult);
        });
    });

    context("RotateX transformation", function() {

        it('Rotate by 0 degrees should not move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = 0;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = vector;
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 360 degrees should not move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = 360;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = vector;
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 45 degrees clockwise should move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = 45;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = new Vector(10, 0, 14);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees clockwise - starting perpendicular to z-axis, should end parallel to z-axis', function() {
            const vector = new Vector(0, 20, 0);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = 90;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = new Vector(0, 0, 20);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees clockwise - starting perpendicular to y-axis, should end parallel to y-axis', function() {
            const vector = new Vector(0, 0, -20);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = 90;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = new Vector(0, 20, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees anti-clockwise - starting perpendicular to z-axis, should end parallel to z-axis', function() {
            const vector = new Vector(0, 20, 0);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = -90;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = new Vector(0, 0, -20);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees anti-clockwise - starting perpendicular to y-axis, should end parallel to y-axis', function() {
            const vector = new Vector(0, 0, -20);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = -90;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = new Vector(0, -20, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 450 degrees clockwise should be equivalent to rotate by 90 degrees clockwise', function() {
            const vector = new Vector(0, 20, 0);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = 450;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = new Vector(0, 0, 20);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 450 degrees anti-clockwise should be equivalent to rotate by 90 degrees anti-clockwise', function() {
            const vector = new Vector(0, 20, 0);
            const sut = new TransformationChain(vector);
            
            const angleXDegrees = -450;
    
            const result = sut.rotateX(angleXDegrees).getVector();
            const expectedResult = new Vector(0, 0, -20);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });
    });

    context("RotateY transformation", function() {
        it('Rotate by 0 degrees should not move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = 0;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = vector;
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 360 degrees should not move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = 360;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = vector;
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 45 degrees clockwise should move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = 45;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = new Vector(14, 10, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees clockwise - starting perpendicular to z-axis, should end parallel to z-axis', function() {
            const vector = new Vector(20, 0, 0);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = 90;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = new Vector(0, 0, -20);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees clockwise - starting perpendicular to x-axis, should end parallel to x-axis', function() {
            const vector = new Vector(0, 0, -20);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = 90;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = new Vector(-20, 0, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees anti-clockwise - starting perpendicular to z-axis, should end parallel to z-axis', function() {
            const vector = new Vector(20, 0, 0);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = -90;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = new Vector(0, 0, 20);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees anti-clockwise - starting perpendicular to x-axis, should end parallel to x-axis', function() {
            const vector = new Vector(0, 0, -20);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = -90;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = new Vector(20, 0, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 450 degrees clockwise should be equivalent to rotate by 90 degrees clockwise', function() {
            const vector = new Vector(20, 0, 0);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = 450;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = new Vector(0, 0, -20);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 450 degrees anti-clockwise should be equivalent to rotate by 90 degrees anti-clockwise', function() {
            const vector = new Vector(20, 0, 0);
            const sut = new TransformationChain(vector);
            
            const angleYDegrees = -450;
    
            const result = sut.rotateY(angleYDegrees).getVector();
            const expectedResult = new Vector(0, 0, 20);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });
    });

    context("RotateZ transformation", function() {
        it('Rotate by 0 degrees should not move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = 0;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = vector;
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 360 degrees should not move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = 360;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = vector;
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 45 degrees clockwise should move the vector', function() {
            const vector = new Vector(10, 10, 10);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = 45;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = new Vector(0, 14, 10);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees clockwise - starting perpendicular to y-axis, should end parallel to y-axis', function() {
            const vector = new Vector(20, 0, 0);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = 90;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = new Vector(0, 20, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees clockwise - starting perpendicular to x-axis, should end parallel to x-axis', function() {
            const vector = new Vector(0, 20, 0);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = 90;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = new Vector(-20, 0, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees anti-clockwise - starting perpendicular to y-axis, should end parallel to y-axis', function() {
            const vector = new Vector(20, 0, 0);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = -90;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = new Vector(0, -20, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 90 degrees anti-clockwise - starting perpendicular to x-axis, should end parallel to x-axis', function() {
            const vector = new Vector(0, 20, 0);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = -90;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = new Vector(20, 0, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });

        it('Rotate by 450 degrees clockwise should be equivalent to rotate by 90 degrees clockwise', function() {
            const vector = new Vector(20, 0, 0);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = 450;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = new Vector(0, 20, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });
        
        it('Rotate by 450 degrees anti-clockwise should be equivalent to rotate by 90 degrees anti-clockwise', function() {
            const vector = new Vector(20, 0, 0);
            const sut = new TransformationChain(vector);
            
            const angleZDegrees = -450;
    
            const result = sut.rotateZ(angleZDegrees).getVector();
            const expectedResult = new Vector(0, -20, 0);
            expect(Math.round(result.x)).to.equal(expectedResult.x);
            expect(Math.round(result.y)).to.equal(expectedResult.y);
            expect(Math.round(result.z)).to.equal(expectedResult.z);
        });
    });
});