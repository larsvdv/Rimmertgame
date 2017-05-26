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
    }
    
    private renderEngine:RenderEngine;
    private inputHandler:InputHandler;
    private eventHandler:EventHandler;
    private player:Player;
    private fallingobject:FallingObject;

    getPlayer() : Player {
        return this.player;
    }

    drawAsteroids() : FallingObject {
        return this.fallingobject;
    }
    
    getRenderEngine() : RenderEngine {
        return this.renderEngine;
    }
}