export class TerrainPainter {
    constructor(ctx) {
        this.ctx = ctx;
    }

    paint() {
        let w = this.ctx.canvas.width;
        let h = this.ctx.canvas.height;
        let imagedata = this.ctx.getImageData(0,0,w,h);
        let data = imagedata.data;
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
                        let up1 = i-w*4; // one pixel above
                        let up2 = i-w*8; // two pixel above
                        let up3 = i-w*12; // two pixel above
                        let up1Air = data[up1+3] < 50;
                        let up2Air = data[up2+3] < 50 && Math.random() > 0.5;
                        let up3Air = data[up3+3] < 50 && Math.random() > 0.8;
                        if(up1Air || up2Air || up3Air ) {      
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
                }
                'rgb(113, 47, 11)'
            }
        }
        this.ctx.putImageData(imagedata,0,0);
    }
}