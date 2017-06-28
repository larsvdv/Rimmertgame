class Game { 
    
    private renderEngine:RenderEngine;
    private inputHandler:InputHandler;
    private eventHandler:EventHandler;
    private player:Player;
    private fallingObjects:Array<FallingObject>;
    private fallingObject:FallingObject;
    private spawnDelay:number;
    private score:number = 0;

    constructor() {
        //player
        this.player = new Player(this);
        //handlers
        this.eventHandler = new EventHandler(this);
        this.inputHandler = new InputHandler(this);
        this.fallingObjects = new Array(0);
        //rendering
        let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs');
        this.renderEngine = new RenderEngine(this, canvas);

        this.startGame();
    }

    public collides(x1:number,y1:number,w1:number,h1:number,x2:number,y2:number,w2:number,h2:number) : boolean {
        let left1=x1;
        let right1=x1+w1;
        let top1=y1;
        let bottom1=y1+h1;

        let left2=x2;
        let right2=x2+w2;
        let top2=y2;
        let bottom2=y2+h2;

        return !(left2 > right1 ||
            right2 < left1 ||
            top2 > bottom1 ||
            bottom2 < top1);
    }

    getPlayer() : Player {
        return this.player;
    }

    getFallingObjects() : FallingObject[] {
        return this.fallingObjects;
    }
    
    getRenderEngine() : RenderEngine {
        return this.renderEngine;
    }

    getScore() {
        return this.score;
    }

    startGame() {
        this.spawnObjects();
        this.moveFallingObjects();
    }

    //an object spawns between 200 and 1500 ms
    spawnObjects() {
        this.fallingObjects.push(this.spawnRandomObject());
        setTimeout(()=>{this.spawnObjects()}, this.spawnDelay = 200 + (Math.random() * 1500));
    }

    //Collision with sides of the canvas
    collide() {
        const player = this.getPlayer();

        if(player.getX() <= 0 ){
            player.setLocation(0);
        }

        if(player.getX() >= 1220 ){
            player.setLocation(1220);
        }
    }

    //spawntimer for objects
    spawnRandomObject(){
    if ((Math.random()) >= 0.7){
        return new FallingObject(this);
    } else {
        return new SuperEnemy(this);
    }}

    moveFallingObjects() {

        if (this.fallingObjects.length == 0)
        return;

        for(let i=0;i<this.fallingObjects.length;i++) {

            if(this.fallingObjects[i] != null) {
            this.fallingObjects[i].setLocation(this.fallingObjects[i].getX(), this.fallingObjects[i].getY()+this.fallingObjects[i].getSpeed());

            if (this.collides(this.getPlayer().getX(), this.getPlayer().getY(), 76, 92, this.fallingObjects[i].getX(), this.fallingObjects[i].getY(), 69, 69)){
                if (this.fallingObjects[i] instanceof SuperEnemy) {
                    return this.renderEngine.endGame();
                }
                if (!(this.fallingObjects[i]  instanceof SuperEnemy)) {
                    this.score++;
                }

                this.fallingObjects[i] = null;

                for (let a = i;a<=this.fallingObjects.length;a++) {
                    if (this.fallingObjects[a+1] != null) {
                        this.fallingObjects[a] = this.fallingObjects[a+1];
                    }
                }
            }
        
            //destroys the object on Y 900
            else if (this.fallingObjects[i].getY() > 900) {
                this.fallingObjects[i] = null;
                for (let a = i;a<=this.fallingObjects.length;a++) {
                    if (this.fallingObjects[a+1] != null) {
                    this.fallingObjects[a] = this.fallingObjects[a+1];
                    }
                }
            }
        }
        }
        this.getRenderEngine().update();
        setTimeout(()=>{this.moveFallingObjects()}, 0);
    }
}