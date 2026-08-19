import Point from "../framework/point.js";

const GO_SIZE = 4;
export class GameObject extends Point {
    constructor(x,y) {
        super(x,y);
        this.game = null;
        this.type = "gameobject";
        this.origin = new Point(GO_SIZE/2, GO_SIZE/2);
        this.size = GO_SIZE;
        this.w = GO_SIZE;
        this.h = GO_SIZE;
        this.ttl = Infinity;
    }
    

    getBoundingBox() {
        let x = this.x-this.origin.x;
        let y = this.y-this.origin.y;
        return {
            x:x,
            y:y,
            w:this.w,
            h:this.h
        }
    }

    update(delta) {
        this.ttl -= delta;
    }

    renderStart(ctx) {
        ctx.save();
        ctx.translate(Math.round(this.x-this.origin.x), Math.round(this.y-this.origin.y));
    }

    // override this!
    render(ctx) {
        this.renderStart(ctx);
        // render stuff here
        this.renderEnd(ctx);
    }

    renderEnd(ctx) {
        ctx.restore();
    }
}