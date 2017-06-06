class FallingObject{
    
    private x:number;
    private y:number;
    protected speed:number=3;
    protected sprite:Sprite = new Sprite('apple.svg');
    private game:Game;

    constructor(game:Game) {
        this.x = Math.random() * 1280;
        this.y = -120;
        this.game = game;
    }

    
    getSpeed() {
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

    getSprite() {
        return this.sprite;
    }

    setLocation(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}