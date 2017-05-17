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
    private running:boolean = false;
    private game:Game;


    startRendering() {
        this.running = true;
        this.renderLoop();
    }

    stopRendering() {
        this.running = false;
    }

    renderLoop() : void {
        if (this.running == false)
            return;
        
        this.drawBackground();
        this.drawRimmert();
        //this.drawAnimation();
        
        this.renderLoop(); 
    }

    drawBackground() {
        this.crc.fillStyle = "black";
        this.crc.fillRect(0,0,1280,720); 
    }

    /*drawAnimation() {
        let x = 200;
        requestAnimationFrame(this.drawAnimation);
        this.crc.beginPath();
        this.crc.arc(x, 200, 30, 0, Math.PI * 2, false);
        this.crc.strokeStyle = 'blue';
        this.crc.stroke();

        x += 1;
    }*/

    drawRimmert() {
        let img = <HTMLImageElement>document.getElementById("testimg");
        this.crc.drawImage(img,this.game.getPlayer().getX(), this.game.getPlayer().getY());
    }

    getCrc() {
        return this.crc;
    }

    update()
    {
        this.clearCanvas();
        this.drawBackground();
    }

    clearCanvas() {
        this.crc.clearRect(0,0,1280,720);
    }
    
    drawText(s:string, x:number, y:number) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    }

}