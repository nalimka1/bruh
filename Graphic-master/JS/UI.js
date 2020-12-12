function cos(x) { return Math.cos(x); }
function sin(x) { return Math.sin(x); }
function tg(x) { return Math.tan(x); }
function ctg(x) { return 1/Math.tan(x); }

class UI {
    constructor({ callbacks } = {}){ 
        this.num = 0;
        this.callbacks = callbacks;
        document.getElementById('addFunction').addEventListener('click', () => this.addFunction());
        document.getElementById('menu').addEventListener('click', this.menu);
    }

    addFunction() {
        const element = document.createElement('div');
            element.setAttribute('class', 'element');
        const del = document.createElement('button');
            //каюсь, не бейте, не исправил
            del.style.height = 20 + 'px';
            del.style.marginLeft = 20 + 'px';
            del.innerHTML = 'удаляй-ка';
            del.dataset.num = this.num;
            del.addEventListener('click', () => deleteFunction(del));
        //добавляем input цвета
        const FuncColor = document.createElement('input');
            FuncColor.setAttribute('placeholder', `цветик цвети семицветик`);
            FuncColor.dataset.num = this.num;
            FuncColor.addEventListener('keyup', () => this.colorKeyup(FuncColor));
        //добавляем input касательной
        const derivative = document.createElement('input');
            derivative.setAttribute('type', 'checkbox');
            derivative.setAttribute('id', `derivative${this.num}`);
            derivative.addEventListener('change', () => derevativeFunc(derivative));
        //текст для касательной
        const derText = document.createElement('label');
            derText.innerHTML = 'Касательная';
            derivative.appendChild(derText);
        //добавляем input функции
        const Func = document.createElement('input');
            Func.setAttribute('placeholder', `function №${this.num}`);
            Func.dataset.num = this.num;
            Func.addEventListener('keyup', () => this.funcKeyup(Func));
        //добавляем input ширины линии
        const FuncWidth = document.createElement('input');
            FuncWidth.setAttribute('placeholder', `ширинка`);
            FuncWidth.dataset.num = this.num;
            FuncWidth.addEventListener('keyup', () => this.widthKeyup(FuncWidth));
        //добавляем интеграл
        const funcIntegral1 = document.createElement('input');
            funcIntegral1.setAttribute('placeholder', `начало промежутка`);
            funcIntegral1.dataset.num = this.num;
            funcIntegral1.addEventListener('keyup', () => this.itegral1Keyup(funcIntegral1));
            funcIntegral1.setAttribute('id', 'a');
        const funcIntegral2 = document.createElement('input');
            funcIntegral2.setAttribute('placeholder', `конец промежутка`);
            funcIntegral2.dataset.num = this.num;
            funcIntegral2.addEventListener('keyup', () => this.itegral2Keyup(funcIntegral2));
            funcIntegral2.setAttribute('id', 'b');
        const inputIntegral = document.createElement('input');
            inputIntegral.setAttribute('type', 'checkbox');
            inputIntegral.setAttribute('id', `integral${this.num}`);
            inputIntegral.addEventListener('change', () => integralFunc(inputIntegral));
        element.appendChild(Func);
        element.appendChild(FuncColor);
        element.appendChild(FuncWidth);
        element.appendChild(del);
        element.appendChild(derivative);
        element.appendChild(funcIntegral1);
        element.appendChild(funcIntegral2);
        element.appendChild(inputIntegral);
        
        const deleteFunction = elem => {
            this.callbacks.deleteFunc(elem.dataset.num);
            functions.removeChild(element);
        }

        const integralFunc = context => {
            this.callbacks.setIntegral(context.checked, Func.dataset.num, inputIntegral);
        }

        const derevativeFunc = context => {
            this.callbacks.setDerivative(context.checked, FuncColor.dataset.num, derivative);
        }
        
        var functions = document.getElementById('functions');
        functions.appendChild(element);
        this.num += 1;
    }

    funcKeyup(context) {
        try {
            var f, n;
            eval(`f = function(x){ return ${context.value}; }`);
            var n = 'y = ' + context.value;
            console.log(context);
            this.callbacks.enterFunction(f, n, context.dataset.num);
        } catch (e) {
            console.log(e);
        }
    }
    colorKeyup(context) {
        try {
            var f;
            eval(`f = '${context.value}'`);
            this.callbacks.enterColorFunction(f, context.dataset.num);
        } catch (e) {
            console.log(e);
        }
    }
    widthKeyup(context) {
        try {
            var f;
            eval(`f = '${context.value}'`);
            this.callbacks.enterWidthFunction(f, context.dataset.num);
        } catch (e) {
            console.log(e);
        }
    }
    firstAsUp(context) {
        try{
            this.callbacks.changeAsymphtot(1, context.value - 0);
        } catch {}  
    }
    secondAsUp(context) {
        try{ 
            this.callbacks.changeAsymphtot(2, context.value - 0);
        } catch {}  
    }
    menu(){
        var over = document.getElementById('over');
        over.classList.toggle("show");    
    }

    itegral1Keyup(context){
        try {
            var integral1 = context.value;
            this.callbacks.setIntegral(context.dataset.num, integral1);
        } catch (e) {
            console.log(e)
        }
    }

    itegral2Keyup(context){
        try {
            var integral2 = context.value;
            this.callbacks.setIntegral(context.dataset.num, integral2);
        } catch (e) {
            console.log(e)
        }
    }

    getAB = function(){
        var a = document.getElementById('a').value-0;
        var b = document.getElementById('b').value-0;
        return {a, b};
    }
}