import { pixelTerrain } from "../framework/utils.js";
import { GameObject } from "./gameobject.js";

const BRIDGE_SPEED = 40; // pixel per second

export class Bridge extends GameObject {
    constructor(x,y,w, direction) {
        super(x,y);
        this.w = w; // width of the bridge (height = 50% of the width)
        this.direction = direction;
        this.px = 0;
        this.py = 0; 
    }

    update(delta) {
        let tx = Math.round(this.px + BRIDGE_SPEED * delta);
        let ty = Math.round(tx / 2);
        let hitWall = pixelTerrain(this.game.getImageData(this.x + (tx+1) * this.direction, this.y - (ty+0.5)));
        let ctx = this.game.ctxLevel;
        ctx.lineWidth = 1;
        ['f00','ff0','0f0','0ff','00f'].forEach((c,i)=> {
            ctx.beginPath();
            ctx.strokeStyle = '#'+c;
            ctx.moveTo(this.x + this.px * this.direction, this.y - this.py + i);
            ctx.lineTo(this.x + tx * this.direction, this.y - ty + i);
            ctx.stroke();
        });
        this.px = tx;
        this.py = ty;
        if(this.px >= this.w || hitWall) {
            this.ttl = 0;
        }
    }

    render(ctx) {
        ctx.fillStyle = '#fff8';
        for(let i = 0; i <10; i++) {
            let x = this.x + Math.round(Math.random()*8 - 4 + this.px * this.direction);
            let y = this.y + Math.round(Math.random()*6 - 3 - this.py);
            ctx.fillRect(x-2,y-2, 4, 4);
        }
    }
}