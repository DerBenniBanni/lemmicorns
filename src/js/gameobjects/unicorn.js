import { Animation } from "../framework/animation.js";
import Point from "../framework/point.js";
import { pointInBox } from "../framework/utils.js";
import { GameObject } from "./gameobject.js";
import { getParticle, Particle, PARTICLEGROUP_HEART, PARTICLEGROUP_MUD } from "./particle.js";

const SPEED = 20; // pixel per second
const FALL_SPEED = 40; // pixel per second
const DIG_INTERVAL = 0.3; // seconds until one pixel is digged
const FALLING_TIMEOUT = 0.1; // seconds until the falling-state is activated
const FALL_HEIGHT_SURVIVABLE = 80; // max pixel of survivable falling
const EXPLOSION_TIMEOUT = 3; // seconds after a activation
const EXPLOSION_ANIM = 1; // duration for the oh-no animation

export const STATE_WALK = "walk";
export const STATE_STOP = "stop";
export const STATE_DIG_DOWN = "dig";
export const STATE_DIG_HORIZONTAL = "dig_h";
export const STATE_DIG_DIAGONAL = "dig_d";
export const STATE_FALLING = "fall";
export const STATE_EXPLODE = "explode";

const pixelTerrain = (imageData) => !!imageData.a && imageData.a > 180;

export class Unicorn extends GameObject{
    constructor(x,y) {
        super(x,y);
        this.type = "unicorn";
        this.origin = new Point(8, 16);
        this.size = 16;
        this.w = 16;
        this.h = 16;
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
            "dig_h": new Animation(16,16, this, [
                16, 0.3,
                17, 0.2,
                1, 0.1,
                18, 0.3,
                3, 0.1,
                17, 0.2,
            ]),
            "dig_d": new Animation(16,16, this, [
                16, 0.3,
                17, 0.3,
                1, 0.2,
                17, 0.2,
            ]),
            "fall": new Animation(16,16, this, [
                12, 0.2,
                13, 0.2,
            ]),
            "explode": new Animation(16,16, this, [
                20, 0.1,
                21, 0.1,
                20, 0.1,
                22, 0.1,
            ]),
        };
        this.state = STATE_WALK;
        this.functionState = STATE_WALK;
        this.digTimer = 0;
        this.fallingTimeout = 0;
        this.fallHeight = 0;
        this.willDigHorizontal = false;
        this.explode = Infinity; // never
        this.ohNo = false; // Audio startet?
    }

    getFunctionStateAfterFall() {
        if([STATE_DIG_DOWN].indexOf(this.state) >= 0) {
            return STATE_WALK;
        }
        return this.state;
    }

    die() {
        this.ttl = -1;
        for(let i=0; i < 10; i++) {
            let p = new Particle(this.x, this.y, getParticle(PARTICLEGROUP_HEART), Math.random()+0.8, Math.random() * 30 - 15, Math.random() * -30 - 20, 70);
            this.game.add(p);
        }
        this.generateMud(10);
    }

    setExploding(timeout = EXPLOSION_TIMEOUT) {
        if(this.explode > timeout)
            this.explode = timeout;
    }

    explodeTerrain() {
        let max = 8;
        let rad = 16;
        let x = this.x-rad;
        let y = this.y-rad-this.origin.y/2;
        for(let i = 0; i <= max; i++) {
            let ii = max-i; // inversed i
            let dx = x + i;
            let w = 2*(rad-i);
            let dy = y + ii;
            let h = 2*(rad-ii);
            this.game.ctxLevel.clearRect(dx,dy,w,h);
        }
    }

    update(delta) {
        super.update(delta);
        this.explode-=delta;
        if(this.explode <= 0){
            this.state = STATE_EXPLODE;
            if(!this.ohNo) {
                this.game.sfx.playAudio("sfx", "oh-no");
                this.ohNo = true;
            }
            if(this.explode <= -EXPLOSION_ANIM) {
                this.die();
                this.explodeTerrain();
                this.game.sfx.playAudio("sfx", "explode");
            }
        }
        this.animations[this.state].update(delta);
        let grounded = [-3, 3].map(dx => this.game.getImageData(this.x + dx, this.y))
            .filter(d => !!d.a || d.a > 180)
            .length > 0;
        if(!grounded) {
            this.fallingTimeout += delta;
            if(this.state != STATE_FALLING && this.fallingTimeout > FALLING_TIMEOUT) {
                this.functionState = this.getFunctionStateAfterFall();
                this.state = STATE_FALLING;
            }
            let dy = FALL_SPEED * delta
            this.y += dy;
            this.fallHeight += dy;
        } else {
            if(this.state == STATE_FALLING) {
                this.state = this.functionState;
                if(this.fallHeight > FALL_HEIGHT_SURVIVABLE) {
                    this.die();
                    this.game.sfx.playAudio("sfx", "tudd");
                    return;
                }
            }
            // set y to highest non air pixel
            for(let i= 1; i<16; i++) {
                if(this.y - i >= 0) {
                let d = this.game.getImageData(this.x, this.y-i);
                    if(d.a < 180) {
                        this.y -= i-1;
                        break;
                    }
                }
                if(i == 15) {
                    this.die();
                }
            }
            this.fallingTimeout = 0;
            this.fallHeight = 0;
            if(this.state == STATE_WALK) {
                let nextX = this.x + SPEED * delta* this.direction;
                let checkX = this.x + 5*this.direction;
                let checkY = this.y-6;
                let hitWall = pixelTerrain(this.game.getImageData(checkX,checkY));
                if(hitWall && this.willDigHorizontal) {
                    this.state = STATE_DIG_HORIZONTAL;
                    nextX = this.x;
                }else if(hitWall || this.checkStopperCollide(checkX, checkY)) {
                    this.direction *= -1;
                    nextX = this.x;
                }
                this.x = nextX;
            }
            if(this.state == STATE_DIG_DOWN) {
                this.digTimer+=delta;
                if(this.digTimer > DIG_INTERVAL) {
                    this.digTimer -= DIG_INTERVAL;
                    this.game.ctxLevel.clearRect(this.x-8,this.y-16, 16, 16);
                    this.game.ctxLevel.clearRect(this.x-7,this.y-16, 14, 17);
                    this.game.ctxLevel.clearRect(this.x-6,this.y-16, 12, 18);
                    this.generateMud(3);
                    this.y++;
                }
                
            }
            if(this.state == STATE_DIG_HORIZONTAL) {
                this.digTimer+=delta;
                if(this.digTimer > DIG_INTERVAL) {
                    this.digTimer -= DIG_INTERVAL;
                    if(this.direction > 0) {
                        this.game.ctxLevel.clearRect(this.x-8,this.y-15, 15, 16);
                        this.game.ctxLevel.clearRect(this.x-8,this.y-14, 16, 14);
                        this.game.ctxLevel.clearRect(this.x-8,this.y-13, 17, 12);
                    } else {
                        this.game.ctxLevel.clearRect(this.x-8,this.y-15, 15, 16);
                        this.game.ctxLevel.clearRect(this.x-9,this.y-14, 16, 14);
                        this.game.ctxLevel.clearRect(this.x-10,this.y-13, 17, 12);
                    }
                    this.generateMud(3);
                    this.x+= this.direction;
                    let checkX = this.x + 5 * this.direction;
                    let checkY = this.y-2;
                    let hitWall = pixelTerrain(this.game.getImageData(checkX,checkY));
                    if(!hitWall) {
                        this.state = STATE_WALK;
                    }
                }
            }
            if(this.state == STATE_DIG_DIAGONAL) {
                this.digTimer+=delta;
                if(this.digTimer > DIG_INTERVAL) {
                    this.digTimer -= DIG_INTERVAL;
                    if(this.direction > 0) {
                        this.game.ctxLevel.clearRect(this.x-8,this.y-14, 15, 16);
                        this.game.ctxLevel.clearRect(this.x-8,this.y-13, 16, 14);
                        this.game.ctxLevel.clearRect(this.x-8,this.y-12, 17, 12);
                    } else {
                        this.game.ctxLevel.clearRect(this.x-8,this.y-14, 15, 16);
                        this.game.ctxLevel.clearRect(this.x-9,this.y-13, 16, 14);
                        this.game.ctxLevel.clearRect(this.x-10,this.y-12, 17, 12);
                    }
                    this.generateMud(3);
                    this.x+= this.direction;
                    this.y++;
                    let checkX = this.x + 1 * this.direction;
                    let checkY = this.y;
                    let hitWall = pixelTerrain(this.game.getImageData(checkX,checkY));
                    if(!hitWall) {
                        this.state = STATE_WALK;
                    }
                }
            }
        }
        if(this.y >= this.game.canvasLevel.height) {
            this.die();
            return;
        }

        let rainbowReached = this.game.rainbows.find(r=> pointInBox(this.x, this.y, r));
        if(rainbowReached){
            this.game.sfx.playAudio("sfx", "target");
            this.ttl = 0;
            this.game.lemSaved++;
            this.game.checkLevelCleared();
        }

    }

    generateMud(amount) {
        for(let i=0; i < amount; i++) {
            this.game.add(new Particle(this.x, this.y, getParticle(PARTICLEGROUP_MUD), Math.random()/2+0.4, Math.random() * 50 - 25, Math.random() * -30 - 10, 30));
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
        if(this.ttl <= 0) {
            return;
        }
        this.renderStart(ctx);
        this.animations[this.state].render(ctx, this.direction < 0);
        
        this.renderEnd(ctx);
        if(this.explode < Infinity) {
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.font = '9px monospace';
            ctx.fillText(Math.ceil(this.explode), this.x, this.y-16);
        }
    }
}