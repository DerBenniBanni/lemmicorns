import {Game} from './js/game.js'
import { GameObject } from './js/gameobjects/gameobject.js';
import { Unicorn } from './js/gameobjects/unicorn.js';

const game = new Game();
const $ = (query) => document.getElementById(query);

document.addEventListener("DOMContentLoaded", ()=> {
    game.init($("level"), $("game"));
    let ctx = game.ctxLevel;
    ctx.fillStyle = "#fff";
    for(let i = 0; i < 10; i++) {
        ctx.fillRect(10 + i*50, 50 + i*10,53,12);
    }

    for(let u = 0; u < 30; u++) {
        game.add(new Unicorn(50,30-u*40));
    }

    
});