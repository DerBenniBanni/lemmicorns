export class Text {
    constructor(x, y, text, size) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.size = size;
        this.levelBound = true;
    }

    render(ctx) {
        ctx.fillStyle ='#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'hanging';
        ctx.font = this.size + 'px monospace';
        ctx.fillText(this.text, this.x, this.y);
    }
}