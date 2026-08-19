import { Button, Buttons } from "./framework/buttons.js";
import Point from "./framework/point.js";
import { Spritesheet } from "./framework/spritesheet.js";
import { STATE_DIG_DIAGONAL, STATE_DIG_DOWN, STATE_STOP } from "./gameobjects/unicorn.js";

const MAX_DELTA = 0.1;

//obj needs to have getBoundingBox() defined
function pointInBox(x,y, obj) {
    let rect = obj.getBoundingBox();
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

export class Game {
    constructor() {
        this.canvasLevel = null;
        this.ctxLevel = null;
        this.canvas = null;
        this.ctx = null;
        this.lastUpdate = performance.now();
        this.objects = [];
        this.gui = [];
        this.levelImageData= [];
        this.sprites = null;
        this.mouse = new Point(0,0);

        this.stoppers = [];
    }

    init(canvasLevel, canvasGame, spriteImage) {
        this.canvasLevel = canvasLevel;
        this.ctxLevel = canvasLevel.getContext("2d", {willReadFrequently: true});
        this.canvas = canvasGame;
        canvasGame.addEventListener("mousemove", (e)=>this.readMouse(e));
        canvasGame.addEventListener("pointerdown", (e)=>this.readMouse(e, true));
        this.ctx = canvasGame.getContext("2d");
        this.sprites = new Spritesheet(spriteImage);
        this.buttons = new Buttons(this);
        // stopper
        let b = this.buttons.add(new Button());
        b.addSprite(16,16,16,16,8,8);
        b.lemmicornAction = (u,g) => u.state = STATE_STOP;
        // explode
        b = this.buttons.add(new Button());
        b.addSprite(48,48,16,16,8,8);
        b.lemmicornAction = (u,g) => u.setExploding();
        // dig down
        b = this.buttons.add(new Button());
        b.addSprite(40,56,8,8,12,8);
        b.addSprite(40,48,8,8,12,18);
        b.lemmicornAction = (u,g) => u.state = STATE_DIG_DOWN;
        // dig diagonal
        b = this.buttons.add(new Button());
        b.addSprite(40,56,8,8,8,8);
        b.addSprite(32,56,8,8,18,18);
        b.lemmicornAction = (u,g) => u.state = STATE_DIG_DIAGONAL;
        // dig horizontal
        b = this.buttons.add(new Button());
        b.addSprite(40,56,8,8,8,12);
        b.addSprite(32,48,8,8,18,12);
        b.lemmicornAction = (u,g) => u.willDigHorizontal = true;


        this.gui.push(this.buttons);
        this.gameloop();
    }


    readMouse(e, clicked = false) {
        let rect = this.canvas.getBoundingClientRect();
        let factX = this.canvas.width / rect.width;
        let factY = this.canvas.height / rect.height;
        let fact = Math.max(factX, factY);
        let realSizeX = this.canvas.width / fact;
        let realSizeY= this.canvas.height / fact;
        let playArea = {
            x:Math.floor(rect.width/2 - realSizeX/2),
            y:Math.floor(rect.height/2 - realSizeY/2),
            w:Math.ceil(realSizeX),
            h:Math.ceil(realSizeY)
        };
        let ePos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
        this.mouse.x = Math.round((ePos.x - playArea.x) * fact);
        this.mouse.y = Math.round((ePos.y - playArea.y) * fact);
        if(clicked) {
            // check buttons first
            let btnClicked = false;
            for(let btn of this.buttons.buttons) {
                if(pointInBox(this.mouse.x, this.mouse.y, btn)) {
                    this.buttons.setActive(btn);
                    break;
                }
            }
            // then gameobjects
            if(!btnClicked && !!this.buttons.activeButton && !!this.buttons.activeButton.lemmicornAction) {
                for(let unicorn of this.getObjectsByType("unicorn")) {
                    if(pointInBox(this.mouse.x, this.mouse.y, unicorn)) {
                        this.buttons.activeButton.lemmicornAction(unicorn, this);
                    }
                }
            }
        }
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
        this.objects = this.objects.filter(o=>o.ttl > 0);
        this.objects.forEach(o => o.update(delta));
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.objects.forEach(o => o.render(this.ctx));
        this.gui.forEach(o => o.render(this.ctx));
        // mouse pointer
        this.ctx.strokeStyle = '#ff08';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.rect(this.mouse.x - 8, this.mouse.y - 8, 16,16);
        this.ctx.rect(this.mouse.x - 1, this.mouse.y - 1, 2,2);
        this.ctx.stroke();
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