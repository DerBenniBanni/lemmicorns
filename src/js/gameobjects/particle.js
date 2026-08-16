import { GameObject } from "./gameobject.js";

// definition: [x,y,w,h] from sprites.png
const PARTICLE_HEART_BIG = [48,64,7,6];
const PARTICLE_HEART_MED = [55,64,5,4];
const PARTICLE_HEART_SML = [60,64,3,2];
const PARTICLE_HEART_BIG_YELLOW = [50,70,7,6];
const PARTICLE_HEART_BIG_GREEN = [57,68,7,6];
const PARTICLE_HEART_BIG_MAGENTA = [57,74,7,6];
const PARTICLE_HEART_MED_BLUE = [48,76,5,4];

export const PARTICLEGROUP_HEART = [PARTICLE_HEART_BIG, PARTICLE_HEART_MED, PARTICLE_HEART_SML, PARTICLE_HEART_BIG_YELLOW, PARTICLE_HEART_BIG_GREEN, PARTICLE_HEART_BIG_MAGENTA, PARTICLE_HEART_MED_BLUE];

export function getParticle(group) {
    return group[Math.floor(Math.random()*group.length)];
}

export class Particle extends GameObject {
    constructor(x, y, particleDef, ttl = 1, dx = 0, dy = 0, grav = 0) {
        super(x,y);
        this.ttl = ttl;
        this.dx = dx;
        this.dy = dy;
        this.grav = grav;
        this.particleDef = {
            x:particleDef[0],
            y:particleDef[1],
            w:particleDef[2],
            h:particleDef[3],
        };
    }

    update(delta) {
        super.update(delta);
        this.dy += delta * this.grav;
        this.x += this.dx * delta;
        this.y += this.dy *delta;
    }

    render(ctx) {
        this.renderStart(ctx);
        let img = this.game.sprites.img;
        let p = this.particleDef;
        ctx.drawImage(img, p.x, p.y, p.w, p.h, Math.floor(-p.w/2), Math.floor(-p.h/2), p.w, p.h);
        this.renderEnd(ctx);
    }

}