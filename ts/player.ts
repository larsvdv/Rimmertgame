class Player {

    constructor(){
        
    }

    private x : number = 0;
    private y : number = 0;

    getX() : number {
        return this.x;
    }

    getY() : number {
        return this.y;
    }

    setLocation(x:number, y:number) {
        this.x = x;
        this.y = y;
        console.log("your location is now "+x+" "+y);
    }

    getSpeed() {
        return 10;
    }
}