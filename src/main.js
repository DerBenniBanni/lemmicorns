import { TerrainPainter } from './js/framework/terrainpainter.js';
import {Game} from './js/game.js'
import { GameObject } from './js/gameobjects/gameobject.js';
import { Rainbow } from './js/gameobjects/rainbow.js';
import { STATE_DIG_DIAGONAL, STATE_DIG_DOWN, STATE_DIG_HORIZONTAL, STATE_EXPLODE, STATE_STOP, Unicorn } from './js/gameobjects/unicorn.js';

const game = new Game();
window.g = game;
const $ = (query) => document.getElementById(query);

document.addEventListener("DOMContentLoaded", ()=> {
    game.init(
        $("level"), $("game"), 
        $('spritesheet')
    );
    //titlescreen
    game.levels.push([
        'p,1,20,171,81,125,81,119,121,151,119,120,124,117,157,161,157', 'p,1,20,184,154,191,81,216,121,244,81,237,157', 'p,1,20,328,158,332,91', 'p,1,20,334,67,335,56', 'p,1,20,255,158,265,81,291,121,312,87,306,158', 'p,1,20,396,93,370,85,350,115,350,141,374,165,398,153', 'p,1,20,458,88,458,88,458,88,431,86,417,123,430,160,458,163,477,130,459,87', 'p,1,20,498,160,495,88,530,84,550,103,549,125,506,137,549,166', 'p,1,20,568,165,569,91,609,163,620,94', 'p,1,20,691,99,691,99,669,80,642,89,634,116,677,139,687,166,662,184,80,184,98,61',
        "r,1,0,360,800,20",
        "r,0,50,360,700,10",
        "t,500,372", // rainbow
        "l,300,350,3", // lemmicorns
        "i,400,200,CHASING RAINBOWS,30",
        "i,500,300,Let them reach the rainbow!",
        "a,0,0,0,0,0", // lemmicorn actions available (in order of buttons)
    ]);
    //just dig, dont fall too deep!
    game.levels.push([
        "r,1,0,0,800,460", // filled box
        "r,0,40,40,720,100", // cleared box
        "r,0,400,160,200,200", // cleared box
        "r,0,200,160,200,50",
        "c,0,100, 120,30", // circle cleared
        "c,0,300, 260,30", // circle cleared
        "c,1,520, 260,30", // circle filled
        "p,1,30,100,40,200,110,300,50,400,90", // Path, filled, 15 linewidth
        "l,60,60,10", // 10 lemmicorns
        "t,500,362", // rainbow
        "a,0,0,3,3,0",
        "i,450,80,Just Dig",
        "i,500,170,Dont let them fall too high!",
    ]);
    game.loadLevel(0);

    /*
    let ctx = game.ctxLevel;
    ctx.fillStyle = "#fff";
    
    


    // unicorn-stampede
    for(let i = 0; i < 4; i++) {
        ctx.fillRect(10 + i*50, 50 + i*10,53,12);
    }
    for(let u = 0; u < 30; u++) {
        //setTimeout(()=>game.add(new Unicorn(50,30)), u*1100);
    }
    // lethal fall height
    ctx.fillRect(100, 260, 180, 10);
    game.add(new Unicorn(200,110));


    let u = null;

    // wall-test
    ctx.fillRect(20, 110, 123, 12);
    ctx.fillRect(20, 105, 10, 12);
    ctx.fillRect(133, 105, 10, 12);
    game.add(new Unicorn(50,100));

    

    // stopper test
    ctx.fillRect(20, 154, 123, 12);
    u = new Unicorn(30,150);
    u.state = STATE_STOP;
    game.add(u);
    u = new Unicorn(130,150);
    u.state = STATE_STOP;
    game.add(u);
    game.add(new Unicorn(80,140));

    // digger test down
    ctx.fillRect(160, 130, 50, 50);
    // catcher (test for non-lethal drop height)
    ctx.fillRect(160, 230, 50, 10);
    ctx.fillRect(160, 220, 5, 10);
    ctx.fillRect(205, 220, 5, 10);
    u = new Unicorn(185,129);
    u.state = STATE_DIG_DOWN;
    game.add(u);

    // digger horizontal
    ctx.fillRect(50, 200, 60, 70);
    ctx.fillRect(10, 250, 40, 10);
    ctx.fillRect(110, 220, 40, 10);
    u = new Unicorn(35,249);
    u.willDigHorizontal = true;
    game.add(u);
    u = new Unicorn(120,219);
    u.willDigHorizontal = true;
    u.direction = -1;
    game.add(u);

    // digger diagonal
    ctx.fillRect(10, 300, 200, 70);
    u = new Unicorn(110,299);
    u.state = STATE_DIG_DIAGONAL;
    game.add(u);
    u = new Unicorn(180,299);
    u.state = STATE_DIG_DIAGONAL;
    game.add(u);
    u = new Unicorn(80,299);
    u.state = STATE_DIG_DIAGONAL;
    u.direction = -1;
    game.add(u);

    // explode
    ctx.clearRect(90,340,16,16);
    u = new Unicorn(98,350);
    u.state = STATE_DIG_DOWN;
    u.setExploding();
    game.add(u);

    game.add(new Rainbow(300,350));
    
    ctx.fillRect(200, 348, 200, 10);

    let painter = new TerrainPainter(ctx);
    painter.paint();
    */

});