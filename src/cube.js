import Vector from "./vector.js";
import Vertice from "./vertice.js";
import MatrixHelper from "./matrixHelper.js";

export default class Cube {
    constructor(posX, posY, posZ, size) {
        this.size = size;

        this.originalPos = new Vector(posX, posY, posZ);
        this.pos = new Vector(0, 0, 0);

        this.appearance = {
            vertices: true,
            edges: true,
            faces: true,
        };
        
        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;

        this.vertices = [];

        this.vertices.push(new Vertice(-0.5, -0.5, -0.5));
        this.vertices.push(new Vertice(0.5, -0.5, -0.5));
        this.vertices.push(new Vertice(0.5, 0.5, -0.5));
        this.vertices.push(new Vertice(-0.5, 0.5, -0.5));

        this.vertices.push(new Vertice(-0.5, -0.5, 0.5));
        this.vertices.push(new Vertice(0.5, -0.5, 0.5));
        this.vertices.push(new Vertice(0.5, 0.5, 0.5));
        this.vertices.push(new Vertice(-0.5, 0.5, 0.5));
    }

    /**
     * Infinitely rotate object in the x axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateX(velocity) {
        this.rotationX = velocity; 
        // this.vertices.forEach(vertice => {
        //     vertice.rotateX(velocity);
        // });
    }

    /**
     * Infinitely rotate object in the y axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateY(velocity) {
        this.rotationY = velocity; 
        // this.vertices.forEach(vertice => {
        //     vertice.rotateY(velocity);
        // });
    }

    /**
     * Infinitely rotate object in the z axis
     * @param {*} velocity velocity of rotation in degrees per second
     */
    rotateZ(velocity) {
        this.rotationZ = velocity; 
        // this.vertices.forEach(vertice => {
        //     vertice.rotateZ(velocity);
        // });
    }

    /**
     * Update position based on velocities
     * @param {*} time 
     * @param {*} frameCount 
     */
    update(time, frameCount) {
        this.vertices.forEach(vertice => {

            // FIX IT scale não funciona depois de trasnlate
            const scale = [
                [ this.size, 0, 0, 0 ],
                [ 0, this.size, 0, 0 ],
                [ 0, 0, this.size, 0 ],
                [ 0, 0, 0, 1 ],
            ];

            let homogenousVector = MatrixHelper.vectorToMatrix(vertice.originalPos);
            homogenousVector[3] = []
            homogenousVector[3][0] = 1;
            let scaledMatriz = MatrixHelper.multiply(scale, homogenousVector);
            let scaled = MatrixHelper.matrixToVector(scaledMatriz);


            const angleXDegrees = this.rotationX * time;
            const angleXRad = angleXDegrees * Math.PI / 180;
            const rotationX = [
                [ 1, 0, 0 ],
                [ 0, Math.cos(angleXRad), -Math.sin(angleXRad) ],
                [ 0, Math.sin(angleXRad), Math.cos(angleXRad) ]
            ];
    
            let rotated = MatrixHelper.matrixMultiplyVector(rotationX, scaled);


            const angleYDegrees = this.rotationY * time;
            const angleYRad = angleYDegrees * Math.PI / 180;
            const rotationY = [
                [ Math.cos(angleYRad), 0, Math.sin(angleYRad) ],
                [ 0, 1, 0 ],
                [ -Math.sin(angleYRad), 0, Math.cos(angleYRad) ]
            ];
    
            rotated = MatrixHelper.matrixMultiplyVector(rotationY, rotated);


            const angleZDegrees = this.rotationZ * time;
            const angleZRad = angleZDegrees * Math.PI / 180;
            const rotationZ = [
                [ Math.cos(angleZRad), -Math.sin(angleZRad), 0 ],
                [ Math.sin(angleZRad), Math.cos(angleZRad), 0 ],
                [ 0, 0, 1 ]
            ];
    
            rotated = MatrixHelper.matrixMultiplyVector(rotationZ, rotated);



            const translateCenter = [
                [ 1, 0, 0, this.originalPos.x ],
                [ 0, 1, 0, this.originalPos.y ],
                [ 0, 0, 1, this.originalPos.z ],
                [ 0 ,0, 0, 1 ]
            ];
    
            homogenousVector = MatrixHelper.vectorToMatrix(rotated);
            homogenousVector[3] = []
            homogenousVector[3][0] = 1;
            let translatedMatriz = MatrixHelper.multiply(translateCenter, homogenousVector);
            let translated = MatrixHelper.matrixToVector(translatedMatriz);


            const orthographicProjection = [
                [ 1, 0, 0 ],
                [ 0, 1, 0 ]
            ];
    
            const distance = 2;
            const z = 1 / ( distance - translated.z);
    
            // FIXIT perspective projection does not work after scale
            const perspectiveProjection = [
                [ z, 0, 0 ],
                [ 0, z, 0 ]
            ];
    
            let projected2D = MatrixHelper.matrixMultiplyVector(orthographicProjection, translated);

            vertice.pos = projected2D;
        });


/////////////////////////////////////////

        // FIXIT aplicar rotação num vertice que está no meio do centro de rotação é o equivalente a não rotacionar
        console.log('cube update', this.originalPos, this.pos)

        const angleXDegrees = this.rotationX * time;
        const angleXRad = angleXDegrees * Math.PI / 180;
        const rotationX = [
            [ 1, 0, 0 ],
            [ 0, Math.cos(angleXRad), -Math.sin(angleXRad) ],
            [ 0, Math.sin(angleXRad), Math.cos(angleXRad) ]
        ];

        let rotated = MatrixHelper.matrixMultiplyVector(rotationX, new Vector(0,0,0));

        const angleYDegrees = this.rotationY * time;
        const angleYRad = angleYDegrees * Math.PI / 180;
        const rotationY = [
            [ Math.cos(angleYRad), 0, Math.sin(angleYRad) ],
            [ 0, 1, 0 ],
            [ -Math.sin(angleYRad), 0, Math.cos(angleYRad) ]
        ];

        rotated = MatrixHelper.matrixMultiplyVector(rotationY, rotated);

        const angleZDegrees = this.rotationZ * time;
        const angleZRad = angleZDegrees * Math.PI / 180;
        const rotationZ = [
            [ Math.cos(angleZRad), -Math.sin(angleZRad), 0 ],
            [ Math.sin(angleZRad), Math.cos(angleZRad), 0 ],
            [ 0, 0, 1 ]
        ];

        rotated = MatrixHelper.matrixMultiplyVector(rotationZ, rotated);


        const translateCenter = [
            [1, 0, 0, this.originalPos.x],
            [0, 1, 0, this.originalPos.y],
            [0, 0, 1, this.originalPos.z],
            [0 ,0, 0, 1]
        ];

        const homogenousVector = MatrixHelper.vectorToMatrix(rotated);
        homogenousVector[3] = []
        homogenousVector[3][0] = 1;
        let translatedMatriz = MatrixHelper.multiply(translateCenter, homogenousVector);
        let translated = MatrixHelper.matrixToVector(translatedMatriz);

        this.pos = translated;


    }

    drawVertice(vector, ctx) {
        const color = "#fff";
        const radius = 5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(vector.x, vector.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    drawEdge(start, end, ctx) {
        const color = "#fff";
        const strokeWidth = 3;

        ctx.strokeStyle = color;
        ctx.lineWidth = strokeWidth;

        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }

    drawFace(v1, v2, v3, v4, ctx) {
        const color = "#8888";

        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.lineTo(v4.x, v4.y);
        ctx.closePath();
        ctx.fill();
    }

    draw(ctx) {
        if(this.appearance.faces) {
            this.drawFace(this.vertices[0].pos, this.vertices[1].pos, this.vertices[2].pos, this.vertices[3].pos, ctx);
            this.drawFace(this.vertices[4].pos, this.vertices[5].pos, this.vertices[6].pos, this.vertices[7].pos, ctx);
            
            this.drawFace(this.vertices[0].pos, this.vertices[4].pos, this.vertices[7].pos, this.vertices[3].pos, ctx);
            this.drawFace(this.vertices[1].pos, this.vertices[5].pos, this.vertices[6].pos, this.vertices[2].pos, ctx);
            
            this.drawFace(this.vertices[0].pos, this.vertices[1].pos, this.vertices[5].pos, this.vertices[4].pos, ctx);
            this.drawFace(this.vertices[3].pos, this.vertices[2].pos, this.vertices[6].pos, this.vertices[7].pos, ctx);
        }

        if(this.appearance.edges) {
            for (let i = 0; i < 4; i++) {
                this.drawEdge(this.vertices[i].pos, this.vertices[(i + 1) % 4].pos, ctx);
                this.drawEdge(this.vertices[i + 4].pos, this.vertices[((i + 1) % 4) + 4].pos, ctx);
                this.drawEdge(this.vertices[i].pos, this.vertices[i + 4].pos, ctx);
            }
        }

        if(this.appearance.vertices) {
            this.vertices.forEach(vertice => {
                this.drawVertice(vertice.pos, ctx);
            });
            console.log('------------')
        }

    }

    // helper
    drawPos(ctx) {
        const orthographicProjection = [
            [ 1, 0, 0 ],
            [ 0, 1, 0 ]
        ];

        const distance = 2;
        const z = 1 / ( distance - this.pos.z);

        const perspectiveProjection = [
            [ z, 0, 0 ],
            [ 0, z, 0 ]
        ];

        let projected2D = MatrixHelper.matrixMultiplyVector(orthographicProjection, this.pos);
        // console.log('projected2d', projected2D)

        const color = "#f008";
        const radius = 5;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(projected2D.x, projected2D.y, radius, 0, 2 * Math.PI, true);
        ctx.fill();

    }

}