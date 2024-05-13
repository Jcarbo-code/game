class Bonus extends Element {
    constructor(main) {
        super(main);
        this.element.id = 'bonus';
        this.element.classList.add('available');
        const positions = ['floorbonus', 'midbonus', 'floatingbonus'];
        this.element.classList.add(positions[Math.floor(Math.random() * positions.length)]);
    }

    //efecto de capturar tiempo
    time() {
        this.element.classList.add('time');
        this.element.addEventListener('animationend', () => {
            this.element.remove();
        })
    }
}