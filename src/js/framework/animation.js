export class Animation {
    constructor(w, h, gameobject, framedef) {
        this.time = 0;
        this.idx = 0;
        this.w = w;
        this.h = h;
        this.gameobject = gameobject;
        this.frames = [];
        for(let i = 0; i < framedef.length - 1; i += 2) {
            this.frames.push({
                idx: framedef[i],
                duration: framedef[i + 1],
                x:null,
                y:null
            });
        }
    }

    update(delta) {
        this.time += delta;
        while(this.time > this.frames[this.idx].duration) {
            this.time -= this.frames[this.idx].duration;
            this.idx++;
            if(this.idx >= this.frames.length) {
                this.idx = 0;
            }
        }
    }

    render(ctx, flipped = false) {
        let img = this.gameobject.game.sprites.img;
        let frame = this.frames[this.idx];
        if(!frame.x) {
            let spritesPerRow = img.width / this.w;
            //let rows = img.height / this.h;
            let row = Math.floor(frame.idx / spritesPerRow);
            let col = frame.idx - row*spritesPerRow;
            frame.x = col * this.w;
            frame.y = row * this.h;
        }
        if(flipped) {
            ctx.translate(this.w, 0);
            ctx.scale(-1,1);
        }
        ctx.drawImage(img, frame.x, frame.y, this.w, this.h, 0, 0, this.w, this.h);
    }
}