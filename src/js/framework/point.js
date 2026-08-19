export default class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    getBoundingBox() {
        return {
            x:this.x,
            y:this.y,
            w:1,
            h:1
        }
    }
}