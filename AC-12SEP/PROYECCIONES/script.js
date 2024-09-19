class Linea {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}

class Cuadrado {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    dibujar(ctx, proyeccion) {
        const vertices = this.obtenerVertices(proyeccion);
        for (let i = 0; i < vertices.length; i++) {
            const nextIndex = (i + 1) % vertices.length;
            new Linea(vertices[i][0], vertices[i][1], vertices[nextIndex][0], vertices[nextIndex][1]).dibujar(ctx);
        }
    }

    obtenerVertices(proyeccion) {
        switch (proyeccion) {
            case 'perspectiva':
                const d = 2; // Profundidad de la proyección
                return [
                    [this.x, this.y], // Inferior izquierda
                    [this.x + this.size, this.y], // Inferior derecha
                    [this.x + this.size * 0.8, this.y - this.size / d], // Superior derecha
                    [this.x + 0.2 * this.size, this.y - this.size / d] // Superior izquierda
                ];
            case 'ortografica':
                return [
                    [this.x, this.y],
                    [this.x + this.size, this.y],
                    [this.x + this.size, this.y - this.size],
                    [this.x, this.y - this.size]
                ];
            case 'isometrica':
                return [
                    [this.x, this.y],
                    [this.x + this.size, this.y],
                    [this.x + this.size * 0.5, this.y - this.size * 0.5],
                    [this.x - this.size * 0.5, this.y - this.size * 0.5]
                ];
            default:
                return [];
        }
    }
}

class Cubo {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    proyeccion(tipo) {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.dibujarCubo(ctx, tipo);
    }

    dibujarCubo(ctx, tipo) {
        // Dibujar la cara frontal
        new Cuadrado(this.x, this.y, this.size).dibujar(ctx, tipo);
        
        // Dibujar la cara trasera
        const offset = this.size * 0.5; // Desplazamiento para perspectiva
        new Cuadrado(this.x + offset, this.y - offset, this.size).dibujar(ctx, tipo);
        
        // Dibujar las aristas
        const edges = [
            [this.x, this.y, this.x + offset, this.y - offset], // Inferior izquierda a superior derecha
            [this.x + this.size, this.y, this.x + this.size + offset, this.y - offset], // Inferior derecha a superior derecha
            [this.x, this.y - this.size, this.x + offset, this.y - this.size - offset], // Superior izquierda a superior derecha
            [this.x + this.size, this.y - this.size, this.x + this.size + offset, this.y - this.size - offset] // Superior derecha a superior derecha
        ];

        edges.forEach(edge => {
            new Linea(edge[0], edge[1], edge[2], edge[3]).dibujar(ctx);
        });
    }
}

// Crear el cubo y dibujar la proyección inicial
const cubo = new Cubo(200, 200, 50);
cubo.proyeccion('perspectiva');
