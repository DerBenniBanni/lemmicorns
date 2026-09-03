export class Text {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
    }

    render(ctx) {
        ctx.fillStyle ='#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'hanging';
        ctx.font = '12px monospace';
        ctx.fillText(this.text, this.x, this.y);
    }
}