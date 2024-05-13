class Element {
    constructor(main) {
        this.element = document.createElement('div');
        main.appendChild(this.element);
    }

    //posicion
    getPos() {
        return this.element.getBoundingClientRect();
    }

    //destruccion
    remove() {
        this.element.remove();
    }
}