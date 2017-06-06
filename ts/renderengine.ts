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
    private playerSprite = new Sprite("rimmert.svg");
    //private spawnTime = Math.random()*3000 + 2000;

    drawBackground() {
        this.crc.fillStyle = "skyblue";
        this.crc.fillRect(0,0,1280,720); 
    }

    drawSprite(s:Sprite, x:number, y:number) {
        let img = s.get();
        this.crc.drawImage(img, x, y);
    }

    getCrc() {
        return this.crc;
    }

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
        this.drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
        this.collide();
    }

    clearCanvas() {
        this.crc.clearRect(0,0,1280,720);
    }
    
    drawText(s:string, x:number, y:number) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    }

    /*spawnEnemy() {
        this.spawnTime = Math.random()*300 + 200;
    }*/

    /*drawSuperEnemy() {
        if (this.spawnTime = 200)
        return;
    }*/

    drawFallingObjects() {
        for (let i=0;i<this.game.getFallingObjects().length;i++)
        this.drawSprite(this.game.getFallingObjects()[i].getSprite(), this.game.getFallingObjects()[i].getX(), this.game.getFallingObjects()[i].getY())
    }

}