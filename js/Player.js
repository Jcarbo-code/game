class Player extends Element {
    constructor(main) {
        super(main);
        this.element.id = 'player';
        this.element.classList.add('run');
        this.jumping = false;
    }

    //salto
    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.element.classList.remove('run');
            this.element.classList.add('jump');
            this.element.addEventListener('animationend', () => {
                this.element.classList.remove('jump');
                this.element.classList.add('run');
                this.jumping = false;
            })
        }
    }

    //muere y se destruye
    die() {
        if (this.jumping) {
            this.element.classList.remove('jump')
        } else {
            this.element.classList.remove('run')
        }
        this.element.style.animationPlayState = 'running';
        this.element.classList.add('die');
        this.element.addEventListener('animationend', () => {
            this.element.remove();
        })
    }
}