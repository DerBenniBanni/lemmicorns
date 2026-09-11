import { MenuButton } from './js/framework/buttons.js';
import { TerrainPainter } from './js/framework/terrainpainter.js';
import {Game, STATE_LEVEL_RUNNING, STATE_MENU} from './js/game.js'
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
        'p,1,20,171,81,125,81,119,121,151,119,120,124,117,157,161,157', 
        'p,1,20,184,154,191,81,216,121,244,81,237,157', 
        'p,1,20,328,158,332,91', 
        'p,1,20,334,67,335,56', 
        'p,1,20,255,158,265,81,291,121,312,87,306,158', 
        'p,1,20,396,93,370,85,350,115,350,141,374,165,398,153', 
        'p,1,20,458,88,458,88,458,88,431,86,417,123,430,160,458,163,477,130,459,87', 
        'p,1,20,498,160,495,88,530,84,550,103,549,125,506,137,549,166', 
        'p,1,20,568,165,569,91,609,163,620,94', 
        'p,1,20,691,99,691,99,669,80,642,89,634,116,677,139,687,166,662,184,80,184,98,61',
        "r,1,0,360,800,20",
        "r,0,50,360,700,10",
        "t,500,372,3", // rainbow, 3 lemmicorns to be saved!
        "l,300,350,5,1", // lemmicorns
        "i,400,200,CHASING RAINBOWS,30",
        "i,500,385,Let them reach the rainbow!",
        "a,0,100,0,0,0,0", // lemmicorn actions available (in order of buttons)
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
        "l,60,90,10", // 10 lemmicorns
        "t,500,362,8", // rainbow, 8 to save
        "a,0,0,3,3,0,0",
        "i,320,90,Just Dig...",
        "i,500,170,Dont let them fall too high!",
    ]);
    game.levels.push([
        "r,1,461,614,1,1",
        "r,1,0,0,800,460",
        "r,0,41,43,174,93",
        "r,0,219,79,133,65",
        "r,0,96,140,98,188",
        "r,0,201,277,141,49",
        "r,0,244,148,89,125",
        "r,0,356,64,185,97",
        "r,0,462,165,175,27",
        "r,0,462,183,58,231",
        "r,0,347,300,107,67",
        "r,0,530,352,187,58",
        "r,0,642,164,75,195",
        "a,0,10,10,10,10,0",
        "l,65,90,10",
        "t,645,413,8",
        "i,440,85,A leap of faith...",
        "i,240,335,...or find another way",
    ]);
    game.levels.push([
        "r,1,66,65,597,5",
        "p,1,20,304,120,534,231,629,232",
        "p,1,20,753,258,250,393",
        "r,1,60,382,456,56",
        "c,1,632,396,36",
        "c,1,696,391,20",
        "c,1,737,386,10",
        "r,1,199,68,125,61",
        "r,1,207,127,5,264",
        "a,1,2,0,0,1,0",
        "l,80,10,10",
        "t,160,385,8", // 8 to save
        "i,530,35,The needs of the many outweigh the needs of the few.",
        "i,350,400,...especially in times of not many options",
    ]);
    game.levels.push([
        "r,1,0,310,800,189",
        "r,0,21,300,268,74",
        "r,0,201,300,268,35",
        "l,80,320,10",
        "t,660,312,8", // 8 to save
        "i,350,200,Bifrost to the rescue!",
        "a,1,1,0,0,0,2",
    ]);
    game.levels.push([
        "c,1,131,131,35",
        "r,1,127,96,194,69",
        "r,1,283,125,70,153",
        "c,1,318,131,35",
        "c,1,318,278,35",
        "r,1,313,251,70,60",
        "r,1,313,295,191,18",
        "r,1,96,55,100,81",
        "r,0,113,46,69,96",
        "l,140,80,4",
        "t,450,297,2", 
        "i,450,100,Tunnel Expert Wanted!",
        "a,10,10,10,10,10,0",
    ]);
    game.levels.push([
        "r,1,0,421,132,41",
        "r,1,226,372,103,89",
        "r,1,427,321,115,139",
        "r,1,641,271,120,186",
        "r,1,445,224,97,29",
        "r,1,252,179,97,29",
        "r,1,59,133,99,135",
        "c,0,62,248,53",
        "c,0,173,277,53",
        "c,0,327,471,82",
        "c,0,453,427,77",
        "c,0,735,343,53",
        "c,0,654,428,53",
        "c,0,492,268,37",
        "c,0,342,215,23",
        "c,0,257,212,23",
        "c,0,299,225,23",
        "c,0,126,183,23",
        "c,0,640,325,32",
        "r,1,5,258,114,11",
        "a,1,0,0,0,0,10",
        "l,20,400,2",
        "t,55,258,1",
        "i,400,100,Stairway to the Rainbow",
    ]);
    game.levels.push([
        "r,1,56,106,142,93",
        "r,1,586,105,142,93",
        "r,0,55,105,140,82",
        "r,0,590,101,140,82",
        "r,1,191,236,99,32",
        "r,1,496,233,99,32",
        "r,1,586,300,99,52",
        "r,1,94,300,99,52",
        "r,1,149,347,467,13",
        "c,1,218,93,26",
        "c,1,565,97,26",
        "c,1,265,75,26",
        "c,1,518,79,26",
        "c,1,314,66,26",
        "c,1,363,60,29",
        "c,1,416,60,29",
        "c,1,468,65,26",
        "t,400,350,10", // 10 to save
        "i,400,100,Double Trouble!",
        "a,6,1,0,0,4,0",
        "l,140,150,10,-1",,
        "l,640,150,10,1",
    ])
    game.loadLevel(0);
    game.state = STATE_MENU;
    game.gui.push(new MenuButton(400,280,200,50,"START",(game, btn)=>{
        game.state = STATE_LEVEL_RUNNING;
        game.gui = game.gui.filter(elem => elem !== btn);
        game.startMusic();
    }));

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