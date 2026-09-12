import { STATE_MENU } from "../game.js";
import { GameObject } from "./gameobject.js";
import { Unicorn } from "./unicorn.js";

export class Dispender extends GameObject{
    constructor(x, y, count, direction = 1, interval = 1) {
        super(x,y);
        this.type = "dispenser";
        this.count = count;
        this.interval = interval;
        this.timer = 0;
        this.direction = direction;
        // cloud-particles: x, y, radius, rotation-radius, PI/second, value
        this.cloud = [
            [-15, -5, 10, 3, 2, 0],
            [15, -5, 12, 2, -1,0],
            [0, -18, 8, 2, -2,0],
            [-7, -12, 14, 2, 3,0],
            [7, -12, 12, 2, 4,0]
        ]
    }

    update(delta) {
        this.cloud.forEach(c=>c[5] += delta * c[4]);
        if(this.count <= 0 || this.game.state == STATE_MENU) {
            return;
        }
        this.timer += delta;
        if(this.timer > this.interval) {
            let u = this.game.add(new Unicorn(this.x, this.y));
            u.direction = this.direction;
            this.count--;
            this.timer -= this.interval;
        }
    }

    render(ctx){
        ctx.fillStyle = '#fffc';
        this.cloud.forEach(c => {
            ctx.beginPath();
            let x = Math.round(this.x + c[0] + Math.cos(c[5]) * c[3]);
            let y = Math.round(this.y + c[1] + Math.sin(c[5]) * c[3]);
            ctx.arc(x, y, c[2], 0, Math.PI*2);
            ctx.fill();
        })
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