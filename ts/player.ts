class Player {

    constructor(game:Game){
       this.game = game;
       this.movementLoop();
    }

    private game:Game;

    private x : number = 600;
    private y : number = 600;
    private direction : number = -1;
    private isMoving : boolean = false;

    getX() : number {
        return this.x;
    }

    getY() : number {
        return this.y;
    }

    setLocation(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    getSpeed() {
        return 10;
    }

    setDirection(d:number) {
        this.direction = d;
    }

    getDirection() {
        return this.direction;
    }

    getIsMoving() {
        return this.isMoving;
    }

    setIsMoving(b:boolean) {
        this.isMoving = b;
            this.movementLoop();
    }

    movementLoop() {

        if (this.isMoving == false)
        return;

        if (this.direction == 0)
            this.setLocation(this.getX()-this.getSpeed(), this.getY());
        if (this.direction == 1)
            this.setLocation(this.getX()+this.getSpeed(), this.getY());
        
        setTimeout(()=>{this.movementLoop()}, 0);
    }

}