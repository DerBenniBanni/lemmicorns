import { Animation } from "../framework/animation.js";
import Point from "../framework/point.js";
import { GameObject } from "./gameobject.js";

const SPEED = 20;
const FALL_SPEED = 40;

const STATE_WALK = "walk";
const STATE_STOP = "stop";
const STATE_DIG_DOWN = "dig";

export class Unicorn extends GameObject{
    constructor(x,y) {
        super(x,y);
        this.type = "unicorn";
        this.origin = new Point(8, 16);
        this.size = 16;
        this.direction = 1; // positive = right, negative = left
        this.animations = {
            "walk": new Animation(16, 16, this, [
                0, 0.2,
                1, 0.2,
                2, 0.2,
                3, 0.2,
            ]),
            "stop": new Animation(16,16, this, [
                4, 0.5,
                5, 0.2,
                6, 0.5,
                7, 0.2,
            ])
        };
        this.state = STATE_WALK;
    }

    update(delta) {
        this.animations[this.state].update(delta);
        let grounded = [-5, 5].map(dx => this.game.getImageData(this.x + dx, this.y))
            .filter(d => !!d.a || d.a > 180)
            .length > 0;
        if(!grounded) {
            this.y += FALL_SPEED * delta;
        } else {
            if(this.state == STATE_WALK) {
                this.x += SPEED * delta* this.direction;
            }
        }
    }

    render(ctx) {
        this.renderStart(ctx);
        this.animations[this.state].render(ctx, this.direction < 0)
        this.renderEnd(ctx);
    }
}