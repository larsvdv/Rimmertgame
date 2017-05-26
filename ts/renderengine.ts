/*
* @Author Mitch
*/
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
        this.crc.fillStyle = "black";
        this.crc.fillRect(0,0,1280,720); 
    }

    drawAnimation() {
        let x = 200;
        requestAnimationFrame(this.drawAnimation);
        this.crc.beginPath();
        this.crc.arc(x, 200, 30, 0, Math.PI * 2, false);
        this.crc.strokeStyle = 'blue';
        this.crc.stroke();

        x += 1;
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
        this.game.getRenderEngine().drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
    }

    clearCanvas() {
        this.crc.clearRect(0,0,1280,720);
    }
    
    drawText(s:string, x:number, y:number) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    }

}