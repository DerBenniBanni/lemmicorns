import Point from "../framework/point.js";
import { GameObject } from "./gameobject.js";

const RAINBOWSIZE = 20;
export class Rainbow extends GameObject {
    constructor(x,y) {
        super(x,y);
        this.type = "rainbow";
        this.sizeModBaseValue = 0;
        this.sizeMod = 4;
    }
    getBoundingBox() {
        return {
            x:this.x-4,
            y:this.y-16,
            w:8,
            h:16
        }
    }

    update(delta) {
        this.sizeModBaseValue += delta;
    }

    render(ctx) {
        this.renderStart(ctx);
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        let size = RAINBOWSIZE + Math.sin(this.sizeModBaseValue) * this.sizeMod;
        ['#f00','#f80','#ff0','#0f0','#0ff','#00f','#a0f'].forEach((c,i)=>{
            ctx.beginPath();
            ctx.strokeStyle = c;
            ctx.arc(0,0, size-i, Math.PI, 0);
            ctx.stroke();
        });
        
        this.renderEnd(ctx);
    }
}