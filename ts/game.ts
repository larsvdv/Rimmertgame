class Game { 

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
    
    private renderEngine:RenderEngine;
    private inputHandler:InputHandler;
    private eventHandler:EventHandler;
    private player:Player;
    private fallingObjects:Array<FallingObject>;
    private spawnDelay:number = 1500;

    getPlayer() : Player {
        return this.player;
    }

    getFallingObjects() : FallingObject[] {
        return this.fallingObjects;
    }

    
    getRenderEngine() : RenderEngine {
        return this.renderEngine;
    }

    startGame() {
            this.spawnObjects();
            this.moveFallingObjects();
    }

    spawnObjects() {
        this.fallingObjects.push(this.spawnRandomObject());
        setTimeout(()=>{this.spawnObjects()}, this.spawnDelay);
    }

    spawnRandomObject(){
    if ((Math.random()) >= 0.5){
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
            if (this.fallingObjects[i].getY() > 600) {
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