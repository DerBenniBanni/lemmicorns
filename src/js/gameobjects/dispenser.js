import { GameObject } from "./gameobject.js";
import { Unicorn } from "./unicorn.js";

export class Dispender extends GameObject{
    constructor(x, y, count, interval = 1) {
        super(x,y);
        this.type = "dispenser";
        this.count = count;
        this.interval = interval;
        this.timer = 0;
    }

    update(delta) {
        if(this.count <= 0) {
            return;
        }
        this.timer += delta;
        if(this.timer > this.interval) {
            this.game.add(new Unicorn(this.x, this.y));
            this.count--;
            this.timer -= this.interval;
        }
    }

    render(ctx){
        ctx.beginPath();
        ctx.fillStyle = '#222';
        ctx.moveTo(this.x-20, this.y-12);
        ctx.lineTo(this.x+20, this.y-12);
        ctx.lineTo(this.x+15, this.y+5);
        ctx.lineTo(this.x-15, this.y+5);
        ctx.fill();
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.moveTo(this.x+14, this.y+5);
        ctx.lineTo(this.x+14, this.y-11);
        ctx.moveTo(this.x-14, this.y+5);
        ctx.lineTo(this.x-14, this.y-11);
        ctx.stroke();
        
    }
}