class Game { 

    constructor() {
        //player
        this.player = new Player();
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
    private animationEngine:AnimationEngine;

    getPlayer() : Player {
        return this.player;
    }
    
    getRenderEngine() : RenderEngine {
        return this.renderEngine;
    }

    getAnimationEngine() : AnimationEngine {
        return this.animationEngine;
    }
}