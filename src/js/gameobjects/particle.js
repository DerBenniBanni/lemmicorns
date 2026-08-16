import { GameObject } from "./gameobject.js";

// definition: [x,y,w,h] from sprites.png
const PARTICLE_HEART_BIG = [48,64,7,6];
const PARTICLE_HEART_MED = [55,64,5,4];
const PARTICLE_HEART_SML = [60,64,3,2];
const PARTICLE_HEART_BIG_YELLOW = [50,70,7,6];
const PARTICLE_HEART_BIG_GREEN = [57,68,7,6];
const PARTICLE_HEART_BIG_MAGENTA = [57,74,7,6];
const PARTICLE_HEART_MED_BLUE = [48,76,5,4];
const MUD_1 = [48,70,2,2];
const MUD_2 = [48,71,2,2];
const MUD_3 = [48,72,2,2];
const MUD_4 = [48,74,2,2];
const MUD_5 = [48,75,2,1];
const MUD_6 = [49,74,1,2];
const MUD_7 = [53,76,2,2];
const MUD_8 = [53,77,2,2];
const MUD_9 = [53,78,2,2];
const MUD_A = [53,79,2,1];
const MUD_B = [54,78,1,2];
const MUD_C = [55,76,2,2];
const MUD_D = [55,77,2,2];
const MUD_E = [55,78,2,2];
const MUD_F = [55,79,2,1];
const MUD_G = [55,78,1,2];

export const PARTICLEGROUP_HEART = [PARTICLE_HEART_BIG, PARTICLE_HEART_MED, PARTICLE_HEART_SML, PARTICLE_HEART_BIG_YELLOW, PARTICLE_HEART_BIG_GREEN, PARTICLE_HEART_BIG_MAGENTA, PARTICLE_HEART_MED_BLUE];
export const PARTICLEGROUP_MUD = [MUD_1, MUD_2, MUD_3, MUD_4, MUD_5, MUD_6, MUD_7, MUD_8, MUD_9, MUD_A, MUD_B, MUD_C, MUD_D, MUD_E, MUD_F, MUD_G];

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