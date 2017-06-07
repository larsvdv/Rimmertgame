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
    private sprite:Sprite;
    private player:Player;
    private playerSprite = new Sprite("rimmert.svg");
    private backgroundSprite = new Sprite("desktop.svg")
    private score = 0;

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

    //Collision with sides of the canvas
    collide() {
        const player = this.game.getPlayer();

        if(player.getX() <= 0 ){
            player.setLocation(0);
        }

        if(player.getX() >= 1220 ){
            player.setLocation(1220);
        }
    }

    update() {
        this.clearCanvas();
        this.drawBackground();
        this.drawFallingObjects();
        this.drawScore();
        this.drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
        this.collide();
    }

    clearCanvas() {
        this.crc.clearRect(0,0,1280,720);
    }

    //Ends the game with a gameover screen
    endGame() {
        this.clearCanvas();
        this.crc.font = "60px Comic Sans MS";
        this.crc.fillStyle = "black";
        this.crc.fillText("GAMEOVER!!",450,400);
    }
    
    drawScore() {
        this.crc.font = "24px Comic Sans MS";
        this.crc.fillStyle = "red";
        this.crc.fillText("Score: "+this.game.getScore(), 1160, 40);
    }

    //For drawing text on the canvas
    drawText(s:string, x:number, y:number) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    }

    drawFallingObjects() {
        for (let i=0;i<this.game.getFallingObjects().length;i++) {
            if (this.game.getFallingObjects()[i] != null)
                this.drawSprite(this.game.getFallingObjects()[i].getSprite(), this.game.getFallingObjects()[i].getX(), this.game.getFallingObjects()[i].getY())
        }
    }
    

}