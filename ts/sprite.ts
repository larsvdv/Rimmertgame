class Sprite {

    private src:string;
    private img:HTMLImageElement;

    constructor(src:string) {
        this.src= "assets/sprites/"+src;
        this.img = this.get();
    }

    get() {
        let img = new Image();
        img.useMap = this.src;
        img.setAttribute('src', img.useMap);
        return img;
    }

}