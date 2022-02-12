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
});