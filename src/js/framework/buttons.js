const BUTTON_SIZE = 32;

export class Buttons {
    constructor(game) {
        this.game = game;
        this.buttons = [];
        this.x = 0;
        this.y = 5000;  // out of sight
        this.w = 0;
        this.h = 0;
        this.activeButton = null;
    }

    add(button) {
        button.buttons = this;
        button.game = this.game;
        this.buttons.push(button);
        this.calculatePosition();
        return button;
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

    setActive(btn) {
        this.buttons.forEach(b => b.active = b === btn);
        this.activeButton = btn;
    }
}

export class Button {
    constructor(w = BUTTON_SIZE, h = BUTTON_SIZE) {
        this.w = w;
        this.h = h;
        this.buttons = null;
        this.game = null;
        this.lemmicornAction = null;
        this.x = 0;
        this.y = 5000;
        this.sprites = [];
        this.active = false;
    }

    addSprite(x,y,w,h,dx,dy) {
        this.sprites.push({x,y,w,h,dx,dy});
    }

    render(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#840';
        ctx.fillRect(0, 0, this.w, this.h);
        ctx.fillStyle = this.active ? 'rgb(107, 59, 13)' : '#310';
        ctx.fillRect(1, 1, this.w-2, this.h-2);
        this.sprites.forEach(s => {
            ctx.drawImage(this.game.sprites.img, s.x, s.y, s.w, s.h, s.dx, s.dy, s.w, s.h);
        });
        ctx.restore();
    }
    getBoundingBox() {
        return {
            x:this.x,
            y:this.y,
            w:this.w,
            h:this.h
        }
    }
}