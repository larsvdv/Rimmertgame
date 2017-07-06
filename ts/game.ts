class Game { 

    constructor() {
        //player
        this.player = new Player(this);
        //handlers
        this.eventHandler = new EventHandler(this);
        this.inputHandler = new InputHandler(this);
        //rendering
        let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs');
        this.renderEngine = new RenderEngine(this, canvas);

        this.startGame();
    }
    
    private renderEngine:RenderEngine;
    private inputHandler:InputHandler;
    private eventHandler:EventHandler;
    private player:Player;
    private objectCollection:ObjectCollection = new ObjectCollection();
    private spawnDelay:number=200;
    private score:number = 0;

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

    public getObjectCollection(): ObjectCollection {
        return this.objectCollection;
    }

    getPlayer() : Player {
        return this.player;
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
        this.objectCollection.add(this.spawnRandomObject());
        setTimeout(()=>{this.spawnObjects()}, 1337);
    }

    //spawntimer for objects
    spawnRandomObject(){
    console.log(this.getObjectCollection());
    if ((Math.random()) >= 0.7){
        return new FallingObject(this);
    } else {
        return new SuperEnemy(this);
    }
}

    //Ends the game with a gameover screen
    endGame() {
        this.getRenderEngine().clearCanvas();
        this.getRenderEngine().crc.font = "60px Comic Sans MS";
        this.getRenderEngine().crc.fillStyle = "black";
        this.getRenderEngine().crc.fillText("GAMEOVER!!",450,400);
    }

    moveFallingObjects() {

        let col = this.objectCollection.getCollection();


        for(let i=0;i<col.length;i++) {

            let object = this.objectCollection.get(i);

            object.setLocation(object.getX(), object.getY()+object.getSpeed());

            if (this.collides(this.getPlayer().getX(), this.getPlayer().getY(), 76, 92, object.getX(), object.getY(), 69, 69)){
                if (object instanceof SuperEnemy) {
                    return this.endGame();
                }
                if (!(object  instanceof SuperEnemy)) {
                    this.score++;
                }

                this.objectCollection.remove(i);
        }
                    //destroys the object on Y 900
                if (object.getY() > 900) {
                this.objectCollection.remove(i);
            }
        }
        this.getRenderEngine().update();
        setTimeout(()=>{this.moveFallingObjects()}, 0);
    }
}