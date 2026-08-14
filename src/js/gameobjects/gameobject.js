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
        ctx.translate(Math.round(this.x), Math.round(this.y));
    }

    render(ctx) {
        this.renderStart(ctx);
        ctx.fillStyle = '#ff06';
        ctx.fillRect(-this.origin.x, -this.origin.y, this.size, this.size);
        this.renderEnd(ctx);
    }

    renderEnd(ctx) {
        ctx.restore();
    }
}