class Game { 

    constructor() {
        //player
        this.player = new Player(this);
        //handlers
        this.eventHandler = new EventHandler(this);
        this.inputHandler = new InputHandler(this);
        //rendering
        let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cnvs');
        //this.getFallingObject = new FallingObject(this, canvas);
        this.renderEngine = new RenderEngine(this, canvas);
    }
    
    private renderEngine:RenderEngine;
    private inputHandler:InputHandler;
    private eventHandler:EventHandler;
    private player:Player;
    private fallingObject:FallingObject;

    getPlayer() : Player {
        return this.player;
    }

    getFallingObject() : FallingObject {
        return this.fallingObject;
    }
    
    getRenderEngine() : RenderEngine {
        return this.renderEngine;
    }
}