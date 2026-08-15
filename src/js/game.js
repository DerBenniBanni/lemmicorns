import { Spritesheet } from "./framework/spritesheet.js";
import { STATE_STOP } from "./gameobjects/unicorn.js";

const MAX_DELTA = 0.1;

export class Game {
    constructor() {
        this.canvasLevel = null;
        this.ctxLevel = null;
        this.canvas = null;
        this.ctx = null;
        this.lastUpdate = performance.now();
        this.objects = [];
        this.levelImageData= [];
        this.sprites = null;

        this.stoppers = [];
    }

    init(canvasLevel, canvasGame, spriteImage) {
        this.canvasLevel = canvasLevel;
        this.ctxLevel = canvasLevel.getContext("2d", {willReadFrequently: true});
        this.canvas = canvasGame;
        this.ctx = canvasGame.getContext("2d");
        this.sprites = new Spritesheet(spriteImage);
        this.gameloop();
    }

    getObjectsByType(type) {
        return this.objects.filter(o => o.type == type)
    }

    gameloop() {
        let delta = this.delta();
        this.setSpecialGameObjects()
        this.levelImageData = this.ctxLevel.getImageData(0,0,this.canvasLevel.width, this.canvasLevel.height);
        this.update(delta);
        this.render();
        requestAnimationFrame(()=>this.gameloop());
    }

    setSpecialGameObjects() {
        this.stoppers = this.objects.filter(o => o.type == "unicorn" && o.state == STATE_STOP)
    }

    delta() {
        let now = performance.now();
        let delta = (now - this.lastUpdate) / 1000;
        if(delta > MAX_DELTA) {
            delta = MAX_DELTA;
        }
        this.lastUpdate = now;
        return delta;
    }

    update(delta) {
        this.objects.forEach(o => o.update(delta));
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach(o => o.render(this.ctx));
    }

    add(gameobject) {
        gameobject.game = this;
        this.objects.push(gameobject);
    }

    getImageData(x,y) {
        let idx = Math.floor(x) * 4 + Math.ceil(y) *this.canvasLevel.width * 4;
        let data = this.levelImageData.data;
        return {
            "r":data[idx],
            "g":data[idx+1],
            "b":data[idx+2],
            "a":data[idx+3]
        }
    }
}