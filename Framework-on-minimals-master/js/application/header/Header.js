class Header extends Component {
    addEventListeners() {
        document.getElementById('showGraph2D').
            addEventListener('click', () => this.callbacks.showGraph2D());
        document.getElementById('showCalculator').
            addEventListener('click', () => this.callbacks.showCalculator());
    }
}