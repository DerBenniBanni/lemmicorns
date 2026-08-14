import Point from "../framework/point.js";
import { GameObject } from "./gameobject.js";

export class Unicorn extends GameObject{
    constructor(x,y) {
        super(x,y);
        this.type = "unicorn";
        this.origin = new Point(8, 16);
        this.size = 16;
    }

    update(delta) {
        let data = this.game.getImageData(this.x, this.y);
        if(!!!data.a || data.a < 1) {
            this.y += 30* delta;
        } else {
            this.x += 20 * delta;
        }
    }
}