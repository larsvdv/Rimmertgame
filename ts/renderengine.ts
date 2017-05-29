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
    /*private x:number;
    private y:number;
    private numberofobjects:number;
    private speed:number=3;
    private sprite:Sprite;*/

    drawBackground() {
        this.crc.fillStyle = "skyblue";
        this.crc.fillRect(0,0,1280,720); 
    }

    drawSprite(s:Sprite, x:number, y:number) {
        let img = this.playerSprite.get();
        this.crc.drawImage(img, x, y);
    }

    /*drawAsteroids() {
        // Draw asteroids.
        for (let i = 0; i <= 20; i++) {
            // Get random positions for asteroids.
             var a = Math.floor(Math.random() * 1280);
             var b = Math.floor(Math.random() * 720);

          // Make the asteroids red
          this.crc.fillStyle = "red";

          // Keep the asteroids far enough away from
          // the beginning or end.
          if (a > 40 && b > 40 && a < 1280 && b < 1280) {

            // Draw an individual asteroid.
            this.crc.beginPath();
            this.crc.arc(a, b, 10, 0, Math.PI * 2, true);
            this.crc.closePath();
            this.crc.fill();
          } else--i;
        }
    }


    getSpeed()
    {
        return this.speed;
    }

    setSpeed(s:number) {
        this.speed = s;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }*/

    getCrc() {
        return this.crc;
    }

    update()
    {
        this.clearCanvas();
        this.drawBackground();
        this.game.getRenderEngine().drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
        this.game.getFallingObject().drawAsteroids();
    }

    clearCanvas() {
        this.crc.clearRect(0,0,1280,720);
    }
    
    drawText(s:string, x:number, y:number) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    }

}