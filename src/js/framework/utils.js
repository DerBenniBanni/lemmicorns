
//obj needs to have getBoundingBox() defined
export function pointInBox(x,y, obj) {
    let rect = obj.getBoundingBox();
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

export function pixelTerrain(imageData){
    return !!imageData.a && imageData.a > 180;
}