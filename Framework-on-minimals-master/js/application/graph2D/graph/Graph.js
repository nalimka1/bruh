class Graph {
    constructor({ id, width, height, WINDOW = {}, callbacks } = {}) {
        this.WINDOW = WINDOW;
        this.canvas;
        if (id) {
            this.canvas = document.getElementById(id);
        } else {
            this.canvas = document.createElement('canvas');
            document.querySelector('body').appendChild(this.canvas);
        }
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('wheel', callbacks.wheel);
        this.canvas.addEventListener('mouseup', callbacks.mouseup);
        this.canvas.addEventListener('mousedown', callbacks.mousedown);
        this.canvas.addEventListener('mousemove', callbacks.mousemove);
        this.canvas.addEventListener('mouseleave', callbacks.mouseleave);
    }

    xs(x) {
        return (x - this.WINDOW.LEFT) / this.WINDOW.WIDTH * this.canvas.width;
    }

    ys(y) {
        return this.canvas.height - 
            (y - this.WINDOW.BOTTOM) / this.WINDOW.HEIGHT * this.canvas.height;
    }

    sx(x) {
        return x * this.WINDOW.WIDTH / this.canvas.width;
    }

    sy(y) {
        return -y * this.WINDOW.HEIGHT / this.canvas.height;
    }

    clear() {
        this.ctx.fillStyle = '#d9d9d9';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    point(x, y, size, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color || '#F00';
        this.ctx.arc(this.xs(x), this.ys(y), size || 2, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    line(x1, y1, x2, y2, color, width, isDash) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color || 'black';
        this.ctx.lineWidth = width || 2;
        if (isDash) {
            this.ctx.setLineDash([10, 10]);
        } else {
            this.ctx.setLineDash([]);
        }
        this.ctx.moveTo(this.xs(x1), this.ys(y1));
        this.ctx.lineTo(this.xs(x2), this.ys(y2));
        this.ctx.stroke();
    }

    number(text, x, y, axis) {
        this.ctx.fillStyle = "#000";
        this.ctx.font = "italic 11pt Arial";
        if (axis == 'x') {
            this.ctx.fillText(text, this.xs(x - 0.25), this.ys(y - 0.7));
        } else if (axis == 'y') {
            this.ctx.fillText(text, this.xs(x - 0.7), this.ys(y - 0.15));
        } else {
            this.ctx.fillText(text, this.xs(x + 0.1), this.ys(y - 0.5));
        }
    }

    printFuncNames(name, x, f, color) {
        this.ctx.fillStyle = color || 'F00';
        this.ctx.font = "italic 12pt Arial";
        const y = f(x) + 1.5;
        this.ctx.fillText(name, this.xs(x), this.ys(y));
    }
}