class FallingObject{
    
    private x:number;
    private y:number;
    private numberofobjects:number;
    private speed:number=3;
    private sprite:Sprite;
    private game:Game;
    private crc:CanvasRenderingContext2D;

    constructor(game:Game) {
        this.x = Math.random() * 1280;
        this.y = 0;
        this.game = game;
    }

    drawAsteroids() {
        // Draw asteroids.
        for (let i = 0; i <= 20; i++) {
            // Get random positions for asteroids.
             var a = Math.floor(Math.random() * 299);
             var b = Math.floor(Math.random() * 299);

          // Make the asteroids red
          this.crc.fillStyle = "#FF0000";

          // Keep the asteroids far enough away from
          // the beginning or end.
          if (a > 40 && b > 40 && a < 270 && b < 270) {

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
    }
}