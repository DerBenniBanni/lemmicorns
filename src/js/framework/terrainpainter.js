export class TerrainPainter {
    constructor(ctx) {
        this.ctx = ctx;
        this.data = [];
    }

    isAir(i) {
        return this.data[i+3] < 50;
    }

    paint() {
        let w = this.ctx.canvas.width;
        let h = this.ctx.canvas.height;
        let imagedata = this.ctx.getImageData(0,0,w,h);
        this.data = imagedata.data;
        let data = this.data;
        for(let x = 0; x < w; x++) {
            for(let y = 0; y < h; y++) {
                let i = (x + y*w) *4;
                let r = data[i];
                let g = data[i+1];
                let b = data[i+2];
                let a = data[i+3];
                if(a > 30) {
                    // grass?
                    if(y > 4) {
                        if(this.isAir(i-w*4) // 1 pixel above
                            || (this.isAir(i-w*8) && Math.random() > 0.5) // 2 pixel above
                            || (this.isAir(i-w*12) && Math.random() > 0.8) // 3 pixel above
                        ) {      
                            data[i] = 10 + Math.random()*50;
                            data[i+1]= 150 + Math.random()*100;
                            data[i+2]= 11 +  Math.random()*40;
                            continue;
                        }
                    }

                    // mud
                    data[i] = 113 + Math.random()*30;
                    data[i+1]= 47 + Math.random()*30;
                    data[i+2]= 11 +  Math.random()*10;

                    if (y < 455) {
                        if(this.isAir(i+w*4) // 1 pixel down
                            || (this.isAir(i+w*8) && Math.random() > 0.3) // 2 pixel down
                            || (this.isAir(i+w*12) && Math.random() > 0.5) // 3 pixel down
                            || (this.isAir(i+w*16) && Math.random() > 0.7) // 4 pixel down
                        ) {  
                            data[i] = Math.floor(data[i] * 0.5);
                            data[i+1] = Math.floor(data[i+1] * 0.5);
                            data[i+2] = Math.floor(data[i+2] * 0.5);

                        };
                    }
                }
                'rgb(113, 47, 11)'
            }
        }
        this.ctx.putImageData(imagedata,0,0);
    }
}