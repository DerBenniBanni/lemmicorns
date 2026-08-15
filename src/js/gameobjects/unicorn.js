import { Animation } from "../framework/animation.js";
import Point from "../framework/point.js";
import { GameObject } from "./gameobject.js";

const SPEED = 20;
const FALL_SPEED = 40;
const DIG_INTERVAL = 0.3;

export const STATE_WALK = "walk";
export const STATE_STOP = "stop";
export const STATE_DIG_DOWN = "dig";
export const STATE_FALLING = "fall";

const pixelTerrain = (imageData) => !!imageData.a && imageData.a > 180;

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
            ]),
            "dig": new Animation(16,16, this, [
                8, 0.3,
                9, 0.1,
                10, 0.3,
                11, 0.1,
            ]),
            "fall": new Animation(16,16, this, [
                12, 0.2,
                13, 0.2,
            ]),
        };
        this.state = STATE_WALK;
        this.functionState = STATE_WALK;
        this.digTimer = 0;
    }

    update(delta) {
        this.animations[this.state].update(delta);
        let grounded = [-5, 5].map(dx => this.game.getImageData(this.x + dx, this.y))
            .filter(d => !!d.a || d.a > 180)
            .length > 0;
        if(!grounded) {
            this.y += FALL_SPEED * delta;
            if(this.state != STATE_FALLING) {
                this.functionState = this.state;
                this.state = STATE_FALLING;
            }
        } else {
            if(this.state == STATE_FALLING) {
                this.state = this.functionState;
            }
            if(this.state == STATE_WALK) {
                let nextX = this.x + SPEED * delta* this.direction;
                let checkX = this.x + 5*this.direction;
                let checkY = this.y-2;
                if(pixelTerrain(this.game.getImageData(checkX,checkY))
                    || this.checkStopperCollide(checkX, checkY)) {
                    this.direction *= -1;
                    nextX = this.x;
                }
                this.x = nextX;
            }
            if(this.state == STATE_DIG_DOWN) {
                this.digTimer+=delta;
                if(this.digTimer > DIG_INTERVAL) {
                    this.digTimer -= DIG_INTERVAL;
                    this.game.ctxLevel.clearRect(this.x-8,this.y-16, 16, 18);
                }
                
            }
        }
    }

    checkStopperCollide(x, y) {
        for(let stopper of this.game.stoppers) {
            if(stopper.x - 5 < x 
                && stopper.x + 5 > x
                && stopper.y - 16 < y 
                && stopper.y > y) {
                return true;
            }
        }
        return false;
    }

    render(ctx) {
        this.renderStart(ctx);
        this.animations[this.state].render(ctx, this.direction < 0)
        this.renderEnd(ctx);
    }
}