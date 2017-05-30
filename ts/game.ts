class Game { 

    constructor() {
        //player
        this.player = new Player(this);
        //handlers
        this.eventHandler = new EventHandler(this);
        this.inputHandler = new InputHandler(this);
        this.fallingObjects = new Array(10);
        //rendering
        let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs');
        //this.getFallingObject = new FallingObject(this, canvas);
        this.renderEngine = new RenderEngine(this, canvas);

        this.startGame();
    }
    
    private renderEngine:RenderEngine;
    private inputHandler:InputHandler;
    private eventHandler:EventHandler;
    private player:Player;
    private fallingObjects:Array<FallingObject>;

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
        for(let i=0;i<=0;i++){
        this.fallingObjects[i] = new FallingObject(this); 
    }
            this.moveFallingObjects();   
    }

    moveFallingObjects() {

        if (this.fallingObjects.length == 0)
        return;

        for(let i=0;i<this.fallingObjects.length;i++) {
            this.fallingObjects[i].setLocation(this.fallingObjects[i].getX(), this.fallingObjects[i].getY()+this.fallingObjects[i].getSpeed());
        }
        
        this.getRenderEngine().update();
        setTimeout(()=>{this.moveFallingObjects()}, 0);
    }
}