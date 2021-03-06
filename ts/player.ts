class Player {

    private game:Game;
    private x : number = 600;
    private y : number = 600;
    private direction : number = -1;
    private isMoving : boolean = false;
    private score : 0;

    constructor(game:Game){
       this.game = game;
       this.movementLoop();
    }

    getX() : number {
        return this.x;
    }

    getY() : number {
        return this.y;
    }

    setLocation(x:number) {
        this.x = x;
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

        if (this.getX() >= 1210) {
            this.setIsMoving(false);
            this.setLocation(1209);
            return;
        }
        if (this.getX() <= 0) {
            this.setIsMoving(false);
            this.setLocation(1);
            return;
        }
           
           

        if (this.direction == 0)
            this.setLocation(this.getX()-this.getSpeed());
        if (this.direction == 1)
            this.setLocation(this.getX()+this.getSpeed());

        
        setTimeout(()=>{this.movementLoop()}, 0);
    }

}