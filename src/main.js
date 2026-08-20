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
        'assets/sprites.png'
    );
    let ctx = game.ctxLevel;
    ctx.fillStyle = "#fff";
    
    


    // unicorn-stampede
    for(let i = 0; i < 4; i++) {
        ctx.fillRect(10 + i*50, 50 + i*10,53,12);
    }
    for(let u = 0; u < 30; u++) {
        setTimeout(()=>game.add(new Unicorn(50,30)), u*1100);
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

});