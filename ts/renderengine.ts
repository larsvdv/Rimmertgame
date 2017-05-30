class RenderEngine {

    constructor(game:Game, gameCanvas:HTMLCanvasElement)
    {
        this.game = game;
        this.gameCanvas = gameCanvas;
        this.crc = this.gameCanvas.getContext("2d");
    }

    private gameCanvas:HTMLCanvasElement;
    private crc:CanvasRenderingContext2D;
    private game:Game;
    private playerSprite = new Sprite("rimmert.svg");

    drawBackground() {
        this.crc.fillStyle = "skyblue";
        this.crc.fillRect(0,0,1280,720); 
    }

    drawSprite(s:Sprite, x:number, y:number) {
        let img = this.playerSprite.get();
        this.crc.drawImage(img, x, y);
    }

    getCrc() {
        return this.crc;
    }

    update()
    {
        this.clearCanvas();
        this.drawBackground();
        this.drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
        this.drawFallingObjects();
    }

    clearCanvas() {
        this.crc.clearRect(0,0,1280,720);
    }
    
    drawText(s:string, x:number, y:number) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    }

    drawFallingObjects() {
        for (let i=0;i<this.game.getFallingObjects().length;i++)
        this.drawSprite(new Sprite("rimmert.svg"), this.game.getFallingObjects()[i].getX(), this.game.getFallingObjects()[i].getY())
    }

}