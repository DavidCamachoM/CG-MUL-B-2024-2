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
    constructor(x, y, lado) {
        this.x = x;
        this.y = y;
        this.lado = lado;
    }

    dibujar(ctx) {
        ctx.strokeRect(this.x, this.y, this.lado, this.lado);
    }
}

class Cubo {
    constructor(size) {
        this.size = size;
        this.vertices = this.calcularVertices();
    }

    calcularVertices() {
        const s = this.size / 2;
        return [
            [-s, -s, -s], [s, -s, -s], [s, s, -s], [-s, s, -s],  // Frente
            [-s, -s, s], [s, -s, s], [s, s, s], [-s, s, s]       // Detrás
        ];
    }

    // Proyección Perspectiva
    dibujar_perspectiva(ctx, distancia) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const verticesPerspectiva = this.vertices.map(([x, y, z]) => {
            const factor = distancia / (distancia + z);
            return [
                x * factor + ctx.canvas.width / 2,
                y * factor + ctx.canvas.height / 2
            ];
        });
        this.dibujarAristas(ctx, verticesPerspectiva);
    }

    // Proyección Ortográfica
    dibujar_ortografica(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const verticesOrtograficas = this.vertices.map(([x, y]) => [
            x + ctx.canvas.width / 2,
            y + ctx.canvas.height / 2
        ]);
        this.dibujarAristas(ctx, verticesOrtograficas);
    }

    // Proyección Isométrica
    dibujar_isometrica(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const angulo = Math.PI / 6;  // 30 grados en radianes
        const verticesIsometricos = this.vertices.map(([x, y, z]) => [
            (x - z) * Math.cos(angulo) + ctx.canvas.width / 2,
            (x + z) * Math.sin(angulo) - y + ctx.canvas.height / 2
        ]);
        this.dibujarAristas(ctx, verticesIsometricos);
    }

    // Método para dibujar las aristas del cubo
    dibujarAristas(ctx, vertices) {
        const aristas = [
            [0, 1], [1, 2], [2, 3], [3, 0], // Frente
            [4, 5], [5, 6], [6, 7], [7, 4], // Atrás
            [0, 4], [1, 5], [2, 6], [3, 7]  // Conexiones entre frente y atrás
        ];
        aristas.forEach(([i, j]) => {
            const [x1, y1] = vertices[i];
            const [x2, y2] = vertices[j];
            const linea = new Linea(x1, y1, x2, y2);
            linea.dibujar(ctx);
        });
    }
}

// Configuración inicial
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cubo = new Cubo(100);

// Botones para cambiar la proyección
document.getElementById('btn-perspectiva').addEventListener('click', () => {
    cubo.dibujar_perspectiva(ctx, 300);
});

document.getElementById('btn-ortografica').addEventListener('click', () => {
    cubo.dibujar_ortografica(ctx);
});

document.getElementById('btn-isometrica').addEventListener('click', () => {
    cubo.dibujar_isometrica(ctx);
});
