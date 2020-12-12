class Graph {
    constructor({ id, width, height, WINDOW = {}, callBacks } = {}) {
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
        this.canvas.addEventListener('wheel', callBacks.wheel);
        this.canvas.addEventListener('mouseup', callBacks.mouseup);
        this.canvas.addEventListener('mousedown', callBacks.mousedown);
        this.canvas.addEventListener('mousemove', callBacks.mousemove);
        this.canvas.addEventListener('mouseleave', callBacks.mouseleave);
    }



    xs(x) {
        return (x - this.WINDOW.LEFT) / this.WINDOW.WIDTH * this.canvas.width;
    }

    ys(y) {
        return this.canvas.height - (y - this.WINDOW.BOTTOM) / this.WINDOW.HEIGHT * this.canvas.height;
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

    point(x, y, color, size) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color || '#F00';
        this.ctx.arc(this.xs(x), this.ys(y), size || 2, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    angle(angle, x, size) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'red';
        console.log(x);
        this.ctx.setLineDash([]);
        if (angle > 0) {
            angle = -angle;
            this.ctx.arc(this.xs(x), this.ys(0), size || 75, 0, angle, true);
        } else {
            angle = angle;
            this.ctx.arc(this.xs(x), this.ys(0), size || 75, Math.PI, Math.PI - angle);
        }

        this.ctx.stroke();
    }

    line(x1, y1, x2, y2, color, width, dotted) {
        this.ctx.beginPath();
        if (dotted) {
            this.ctx.setLineDash([10, 10]);
        } else {
            this.ctx.setLineDash([]);
        }
        this.ctx.strokeStyle = color || 'black';
        this.ctx.lineWidth = width || 2;
        this.ctx.moveTo(this.xs(x1), this.ys(y1));
        this.ctx.lineTo(this.xs(x2), this.ys(y2));
        this.ctx.stroke();
    }

    number(text, x, y, axis) {
        this.ctx.fillStyle = "#F00";
        this.ctx.font = "italic 11pt Arial";
        if (axis == 'x') {
            this.ctx.fillText(text, this.xs(x - 0.25), this.ys(y - 0.7));
        } else if (axis == 'y') {
            this.ctx.fillText(text, this.xs(x - 0.7), this.ys(y - 0.15));
        } else {
            this.ctx.fillText(text, this.xs(x + 0.1), this.ys(y - 0.5));
        }
    }

    printText(text, x, y, color) {
        this.ctx.fillStyle = color || 'red';
        this.ctx.font = "italic 11pt Arial";
        this.ctx.fillText(text, this.xs(x), this.ys(y));
    }

    printFuncNames(name, f, color) {
        this.ctx.fillStyle = color || 'F00';
        this.ctx.font = "italic 12pt Arial";
        const y = f(this.WINDOW.LEFT) + 1.5;
        this.ctx.fillText(name, this.xs(this.WINDOW.LEFT + 1 / 2), this.ys(y));
    }
    printRect(x1, x2, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x1, 0, x2, this.canvas.height);
    }

    printIntegralValue(name, f, color, num) {
        this.ctx.fillStyle = color || 'F00';
        this.ctx.font = "italic 12pt Arial";
        const y = f(num) + 1.5;
        this.ctx.fillText(name, this.xs(num), this.ys(y));
    }

    polygon(points, color) {
        this.ctx.fillStyle = color || '#FF800055';
        this.ctx.beginPath();
        this.ctx.moveTo(this.xs(points[0].x), this.ys(points[0].y));
        for (var i = 1; i < points.length; i++) {
            this.ctx.lineTo(this.xs(points[i].x), this.ys(points[i].y));
        }
        this.ctx.lineTo(this.xs(points[0].x), this.ys(points[0].y));
        this.ctx.closePath();
        this.ctx.fill();
    }

}