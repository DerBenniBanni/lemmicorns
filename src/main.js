import {Game} from './js/game.js'
import { GameObject } from './js/gameobjects/gameobject.js';
import { STATE_DIG_DOWN, STATE_STOP, Unicorn } from './js/gameobjects/unicorn.js';

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
    for(let i = 0; i < 4; i++) {
        ctx.fillRect(10 + i*50, 50 + i*10,53,12);
    }
    ctx.fillRect(20, 130, 123, 12);
    ctx.fillRect(20, 125, 10, 12);
    ctx.fillRect(133, 125, 10, 12);
    
    ctx.fillRect(20, 183, 123, 12);

    ctx.fillRect(160, 130, 50, 200);

    for(let u = 0; u < 30; u++) {
        setTimeout(()=>game.add(new Unicorn(50,30)), u*1100);
    }
    let u = new Unicorn(30,180);
    u.state = STATE_STOP;
    game.add(u);
    u = new Unicorn(130,180);
    u.state = STATE_STOP;
    game.add(u);

    u = new Unicorn(185,120);
    u.state = STATE_DIG_DOWN;
    game.add(u);

    game.add(new Unicorn(50,110));
    
    game.add(new Unicorn(80,170));
    
});