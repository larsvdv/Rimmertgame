class AnimationEngine{
    
    constructor(game:Game, gameCanvas:HTMLCanvasElement)
    {
        this.game = game;
        this.gameCanvas = gameCanvas;
        this.crc = this.gameCanvas.getContext("2d");
    }

    private gameCanvas:HTMLCanvasElement;
    private crc:CanvasRenderingContext2D;
    private running:boolean = false;
    private game:Game;


    drawAnimation() {
        let x = 200;
        requestAnimationFrame(this.drawAnimation);
        this.crc.beginPath();
        this.crc.arc(x, 200, 30, 0, Math.PI * 2, false);
        this.crc.strokeStyle = 'blue';
        this.crc.stroke();

        x += 1;
    }

        update()
    {
        this.clearCanvas();
        this.drawBackground();
    }

    clearCanvas() {
        this.crc.clearRect(0,0,1280,720);
    }
        drawBackground() {
        this.crc.fillStyle = "black";
        this.crc.fillRect(0,0,1280,720); 
    }
}