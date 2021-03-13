class App extends Component {
    constructor(options){
        super(options);
        this.header = new Header({
            id: 'header',
            parent: this.id,
            template: template.headerTemplate,
            callbacks: {
                showGraph2D: () => this.showGraph2D(),
                showCalculator: () => this.showCalculator()
            }
        });
        this.graph2D = new Graph2D({
            id: 'graph2D',
            parent: this.id,
            template: template.graph2DTemplate
        });
        this.calculator = new Calculator({
            id: 'calculator',
            parent: this.id,
            template: template.calculatorTemplate
        });

        // проинициализировать компоненты
        this.calculator.hide();
    }

    showGraph2D() {
        this.calculator.hide();
        this.graph2D.show();
    }

    showCalculator() {
        this.graph2D.hide();
        this.calculator.show();
    }
}