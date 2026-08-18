const BUTTON_SIZE = 32;

export class Buttons {
    constructor(game) {
        this.game = game;
        this.buttons = [];
        this.x = 0;
        this.y = 5000;  // out of sight
        this.w = 0;
        this.h = 0;
    }

    add(button) {
        button.buttons = this;
        this.buttons.push(button);
        this.calculatePosition();
    }

    calculatePosition() {
        let canvasW = this.game.canvas.width;
        let canvasH = this.game.canvas.height;
        this.h = 0;
        this.w = 0;
        this.buttons.forEach(b => {
            this.h = this.h < b.h ? b.h : this.h;
            this.w += b.w;
        });
        this.x = Math.round(canvasW/2 - this.w/2);
        this.y =  canvasH - this.h;
        let x = this.x;
        let y = this.y;
        this.buttons.forEach(b => {
            b.x = x;
            b.y = y;
            x += b.w;
        })
    }

    render(ctx) {
        this.buttons.forEach(b => b.render(ctx));
    }
}

export class Button {
    constructor(w = BUTTON_SIZE, h = BUTTON_SIZE) {
        this.w = w;
        this.h = h;
        this.buttons = null;
        this.action = null;
        this.x = 0;
        this.y = 5000;
    }

    render(ctx) {
        ctx.fillStyle = '#840';
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = '#310';
        ctx.fillRect(this.x+1, this.y+1, this.w-2, this.h-2);
    }
}