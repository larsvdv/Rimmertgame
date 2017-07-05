class RenderEngine {

    private gameCanvas:HTMLCanvasElement;
    public crc:CanvasRenderingContext2D;
    private game:Game;
    private playerSprite = new Sprite("rimmert.svg");
    private backgroundSprite = new Sprite("desktop.svg")
    private score = 0;

    constructor(game:Game, gameCanvas:HTMLCanvasElement) {
        this.game = game;
        this.gameCanvas = gameCanvas;
        this.crc = this.gameCanvas.getContext("2d");
    }

    drawBackground() {
        this.drawSprite(this.backgroundSprite, 0, 0);
    }

    drawSprite(s:Sprite, x:number, y:number) {
        let img = s.get();
        this.crc.drawImage(img, x, y);
    }

    getCrc() {
        return this.crc;
    }

    //Updates the game canvas
    update() {
        this.clearCanvas();
        this.drawBackground();
        this.drawFallingObjects();
        this.drawScore();
        this.drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
    }

    clearCanvas() {
        this.crc.clearRect(0,0,1280,720);
    }
    
    //Draws the score in the top right corner
    drawScore() {
        this.crc.font = "32px Comic Sans MS";
        this.crc.fillStyle = "red";
        this.crc.fillText("Score: "+this.game.getScore(), 1100, 40);
    }

    //For drawing text on the canvas
    drawText(s:string, x:number, y:number) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    }

    //Draws the falling objects 
    drawFallingObjects() {
        for (let i=0;i<this.game.getObjectCollection().getCollection().length;i++) {
            let object = this.game.getObjectCollection().get(i);
            this.drawSprite(object.getSprite(), object.getX(), object.getY());
        }
    }
    

}