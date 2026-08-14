import Point from "../framework/point.js";

const GO_SIZE = 4;
export class GameObject extends Point {
    constructor(x,y) {
        super(x,y);
        this.game = null;
        this.type = "gameobject";
        this.origin = new Point(GO_SIZE/2, GO_SIZE/2);
        this.size = GO_SIZE;
    }

    update(delta) {

    }

    renderStart(ctx) {
        ctx.save();
        ctx.translate(Math.round(this.x-this.origin.x), Math.round(this.y-this.origin.y));
    }

    render(ctx) {
        this.renderStart(ctx);
        ctx.fillStyle = '#ff06';
        ctx.fillRect(0, 0, this.size, this.size);
        this.renderEnd(ctx);
    }

    renderEnd(ctx) {
        ctx.restore();
    }
}