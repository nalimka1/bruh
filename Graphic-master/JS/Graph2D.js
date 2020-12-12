
class Graph2D {
    constructor(graphs, mouseX){
        this.WINDOW = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20
        };
        this.graph = new Graph({ id: 'canvas', width: 800, height: 800, WINDOW: WINDOW, callBacks: { wheel, mouseup, mousedown, mousemove, mouseleave } });
        this.ui = new UI({ callbacks: { setIntegral, enterFunction, enterColorFunction, enterWidthFunction, changeAsymphtot, deleteFunc, setDerivative } });
        this.zoomStep = 0.5;
        this.canScroll = false;
        this.graphs = graphs;
        this.mouseX = mouseX;
    }
    

    
    //функции ввода с input'ов
    enterFunction(f, n, num) {
        if (this.graphs[num]) {
            this.graphs[num].func = f;
            this.graphs[num].name = n;
        } else {
            this.graphs[num] = {
                func: f,
                name: n,
                width: 1,
                color: '#0f0'
            }
        }
        render();
    }

    setDerivative(value, num) {
        if (this.graphs[num]) {
            this.graphs[num].derivative = value;
            render();
        }
    }

    setIntegral(value, num){
        if (this.graphs[num]){
            this.graphs[num].integral = value;
            render();
        }
    }

    deleteFunc(num) {
        this.graphs[num] = null;
        render();
    }

    enterColorFunction(f, num) {
        this.graphs[num].color = f;
        render();
    }

    enterWidthFunction(f, num) {
        this.graphs[num].width = f;
        render();
    }

    changeAsymphtot(x, value) {
        if (x == 1) {
            this.asymphX1 = value;
        }
        if (x == 2) {
            this.asymphX2 = value;
        }
        render();
    }

    //функции для действий мышью 
    wheel(event) {
        var delta = (event.wheelDelta > 0) ? - this.zoomStep : this.zoomStep;
        if (this.WINDOW.WIDTH - this.zoomStep > 5) {
            this.WINDOW.WIDTH += delta;
            this.WINDOW.HEIGHT += delta;
            this.WINDOW.LEFT -= delta / 2;
            this.WINDOW.BOTTOM -= delta / 2;
        } else {
            this.WINDOW.WIDTH += this.zoomStep;
            this.WINDOW.HEIGHT += this.zoomStep;
            this.WINDOW.LEFT -= this.zoomStep / 2;
            this.WINDOW.BOTTOM -= this.zoomStep / 2;
        }
        render();
    }

    mousedown() {
        this.canScroll = true;
    }

    mouseup() {
        this.canScroll = false;
    }

    mouseleave() {
        this.canScroll = false;
    }

    mousemove(event) {
        if (this.canScroll) { 
            this.WINDOW.LEFT -= this.graph.sx(event.movementX);
            this.WINDOW.BOTTOM -= this.graph.sy(event.movementY);
        }
        this.mouseX = this.graph.sx(event.offsetX) + this.WINDOW.LEFT;
        render();
    }

    //отрисовка
    printOXY() {
        var size = 0.2;
        // Ox
        this.graph.line(this.WINDOW.LEFT, 0, this.WINDOW.WIDTH + this.WINDOW.LEFT, 0, this.mainColor, 1);
        // Oy
        this.graph.line(0, this.WINDOW.BOTTOM, 0, this.WINDOW.HEIGHT + this.WINDOW.BOTTOM, this.mainColor, 1);
        // Ox >
        this.graph.line(this.WINDOW.WIDTH + this.WINDOW.LEFT, 0, this.WINDOW.WIDTH + this.WINDOW.LEFT - 1 / 2, size, this.mainColor, 1);
        this.graph.line(this.WINDOW.WIDTH + this.WINDOW.LEFT, 0, this.WINDOW.WIDTH + this.WINDOW.LEFT - 1 / 2, -size, this.mainColor, 1);
        // Oy >
        this.graph.line(0, this.WINDOW.HEIGHT + this.WINDOW.BOTTOM, +size, this.WINDOW.HEIGHT + this.WINDOW.BOTTOM - 1 / 2, this.mainColor, 1);
        this.graph.line(0, this.WINDOW.HEIGHT + this.WINDOW.BOTTOM, -size, this.WINDOW.HEIGHT + this.WINDOW.BOTTOM - 1 / 2, this.mainColor, 1);

        for (var i = 1; i < this.WINDOW.WIDTH + this.WINDOW.LEFT; i++) {
            this.graph.line(i, this.WINDOW.HEIGHT, i, this.WINDOW.BOTTOM, '#fab9b4', 1);
            if (i % 5 == 0) {
                this.graph.line(i, -size, i, size, this.mainColor, 2);
            } else {
                this.graph.line(i, -size, i, size, this.mainColor, 1);
            }
        }
        for (var i = -1; i > this.WINDOW.LEFT; i--) {
            this.graph.line(i, this.WINDOW.HEIGHT, i, this.WINDOW.BOTTOM, '#fab9b4', 1);
            if (i % -5 == 0) {
                this.graph.line(i, -size, i, size, this.mainColor, 2);
            } else {
                this.graph.line(i, -size, i, size, this.mainColor, 1);
            }
        }
        for (var i = 1; i < this.WINDOW.HEIGHT + this.WINDOW.BOTTOM; i++) {
            this.graph.line(this.WINDOW.LEFT, i, this.WINDOW.WIDTH, i, '#fab9b4', 1);
            if (i % 5 == 0) {
                this.graph.line(-size, i, size, i, this.mainColor, 2);
            } else {
                this.graph.line(-size, i, size, i, this.mainColor, 1);
            }
        }
        for (var i = -1; i > this.WINDOW.BOTTOM; i--) {
            this.graph.line(this.WINDOW.LEFT, i, this.WINDOW.WIDTH, i, '#fab9b4', 1);
            if (i % -5 == 0) {
                this.graph.line(-size, i, size, i, this.mainColor, 2);
            } else {
                this.graph.line(-size, i, size, i, this.mainColor, 1);
            }
        }
    }

    printDerivative(f, x0){
        var der = getDerivative(f, x0);
        if(der){
            var x1 = this.WINDOW.LEFT;
            var x2 = this.WINDOW.LEFT + this.WINDOW.WIDTH;
            this.graph.line(x1 + x0, der * x1 + f(x0), x2 + x0, der * x2 + f(x0), '#aaa', 1, true);
            var str = `${der.toFixed(3)};${f(der).toFixed(3)}`;
            this.graph.printText(str, der, f(der));
            this.graph.angle(Math.atan(der), f(x0)/der);
        }
    }

    getIntegral(f, a, b){
        var dx = (b - a) / 500;
        var x = a;
        var s = 0;
        while (x <= b){
            s += (Math.abs(f(x)) + Math.abs(f(x + dx))) / 2 / dx;
            x += dx;
        }
        return s;
    }

    printIntegral(f){
        var values = ui.getAB();
        var a = values.a;
        var b = values.b;
        if (a > b) {
            var k = a;
            a = b;
            b = k;
        }
        if (!isNaN(a) && !isNaN(b) && a !== b){
            var dx = (b - a) / 500;
            var x = a;
            var points = [];
            points.push({x: a, y: 0});
            while (x <= b) {
                points.push({x, y: f(x)});
                x += dx;
            }
            points.push({x: b, y: 0});
            this.graph.polygon(points);
            var s = getIntegral(f, a, b);
            var half = (a + b) / 2;
            this.graph.printIntegralValue(`s = ${s}`, f, 'red', half);      
        }
    }

    printNumbers() {
        for (var i = 1; i < this.WINDOW.WIDTH + this.WINDOW.LEFT; i++) {
            this.graph.number(i, i, 0, 'x');
        }
        for (var i = 1; i < Math.abs(this.WINDOW.LEFT); i++) {
            this.graph.number(-i, -i, 0, 'x');
        }
        for (var i = 1; i < this.WINDOW.HEIGHT + this.WINDOW.BOTTOM; i++) {
            this.graph.number(i, 0, i, 'y');
        }
        for (var i = 1; i < Math.abs(this.WINDOW.BOTTOM); i++) {
            this.graph.number(-i, 0, -i, 'y');
        }
        this.graph.number('0', 0, 0, '0');
    }

    getOldZero(f, a, b) {
        var c;
        var E = 0.001;
        if (this.graphs[0].func == '') {
            return false;
        }
        if (Math.abs(f(a) - f(b) == 0)) {
            return false;
        }
        while (isNaN(f(a))) {
            a += 0.1;
            if (a >= b) {
                break;
            }
        }
        while (isNaN(f(b))) {
            b -= 0.1;
            if (a >= b) {
                break;
            }
        }
        while (Math.abs(f(a) - f(b)) >= E) {
            if (isNaN(f(a)) || isNaN(f(b))) {
                return null;
            }
            if (f(a) * f(b) > 0) {
                return false;
            }
            c = (a + b) / 2;
            if (f(a) * f(c) <= 0) {
                b = c;
                continue;
            }
            if (f(c) * f(b) <= 0) {
                a = c;
            }
        }
        return a;
    }

    getCross(f, g, a, b) {
        var c;
        var E = 0.001;
        if (this.graphs[0].func == '') {
            return false;
        }
        while (Math.abs(f(a) - g(b)) >= E) {
            if (isNaN(f(a)) || isNaN(f(b))) {
                return null;
            }
            if ((f(a) - g(a)) * (f(b) - g(b)) > 0) {
                return false;
            }
            c = (a + b) / 2;
            if ((f(a) - g(a)) * (f(c) - g(c)) > 0) {
                b = c;
                continue;
            }
            if ((f(c) - g(c)) * (f(b) - g(b)) > 0) {
                a = c;
            }
        }
        console.log(a, f(a));
        this.graph.point(a, f(a), 'red', 5);
        return a;
    }
    
    getZero(f, a, b) {
        while (a < b) {
            if (this.graphs[0].func == '') {
                return false;
            }
            if (f(a) - f(b) == 0) {
                return false;
            }
            while (isNaN(f(a))) {
                a += 0.1;
                if (a >= b) {
                    break;
                }
            }
            while (isNaN(f(b))) {
                b -= 0.1;
                if (a >= b) {
                    break;
                }
            }
            if (f(a) * f(a + 0.01) < 0) {
                return a;
            }
            a += 0.01;
        }
    }

    printFunction(f, color, width, asymph, x1, x2) {
        var x = this.WINDOW.LEFT;
        var dx = this.WINDOW.WIDTH / 1000;
        var count = 0;
        while (x < this.WINDOW.WIDTH + this.WINDOW.LEFT) {
            //printFuncBreak(x, x + dx, f);
            //if(isNaN(f(x))){
            //    count += dx;
            //}
            try {
                if (asymph && x > x1 && x < x2) {
                    this.graph.line(x, f(x), x + dx, f(x + dx), 'black', width);
                } else {
                    this.graph.line(x, f(x), x + dx, f(x + dx), color, width);
                }
            } catch (e) { }
            x += dx;
        }
        //printNanGraphic(x, x + count);
    }

    getDerivative(f, x0) {
        deltaX = 0.0000000001;
        return (f(x0 + deltaX) - f(x0)) / deltaX;
    }

    drawAsymphtots(f, x1, x2) {
        x = getZero(f, x1, x2);
        if (x != null && x) {
            graph.line(x1, WINDOW.BOTTOM, x1, WINDOW.HEIGHT + WINDOW.BOTTOM, 'blue', 1, true);
            graph.line(x2, WINDOW.BOTTOM, x2, WINDOW.HEIGHT + WINDOW.BOTTOM, 'blue', 1, true);
        }
    }

    changeFuncColor(f, x1, x2) {
        printFunction(f, graphs[0].color, 3, true, x1, x2);
    }

    printNanGraphic(x, x2) {
        graph.printRect(x, x2, 'rgba(255, 255, 0, 0.5)');
    }

    printFuncBreak(x, x2, func) {
        if (Math.abs(func(x) - func(x2) > 100)) {
            graph.line(x, WINDOW.HEIGHT, x, WINDOW.BOTTOM, 'rgba(255, 0, 0, 0.5)', 5, true);
        }
    }

    render() {
        graph.clear();
        printOXY();
        printNumbers();
        for (var i = 0; i < graphs.length; i++) {
            if (graphs[i]) {
                printFunction(graphs[i].func, graphs[i].color, graphs[i].width);
                graph.printFuncNames(graphs[i].name, graphs[i].func, graphs[i].color);
            }
        }
        if (graphs[0] && graphs[1]) {
            getCross(graphs[0].func, graphs[1].func, -2, 5);
        }
        for (var i = 0; i < graphs.length; i++) {
            if (graphs[i]) {
                if (graphs[i].derivative) {
                    printDerivative(graphs[i].func, mouseX); 
                }
                if (graphs[i].integral){
                    //console.log('asdasdqweasdawea');
                    printIntegral(graphs[i].func);
                }
            }
        }



        //x = getZero(graphs[0].func, asymphX1, asymphX2);
        //if (x) {
        //    drawAsymphtots(graphs[0].func, asymphX1, asymphX2);
        //    changeFuncColor(graphs[0].func, asymphX1, asymphX2);
        //    graph.point(x, 0, 'red', 3);
        //}
    }
    render();
}