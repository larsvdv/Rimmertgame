var EventHandler = (function () {
    function EventHandler(game) {
        var _this = this;
        this.keyboardInput = function (event) {
            if (event.type == "keydown")
                _this.getInputHandler().handleKeyPress(String.fromCharCode(event.keyCode));
            if (event.type == "keyup")
                _this.getInputHandler().handleKeyRelease(String.fromCharCode(event.keyCode));
        };
        this.addEventHandlers();
        this.game = game;
        this.inputHandler = new InputHandler(game);
    }
    EventHandler.prototype.addEventHandlers = function () {
        document.addEventListener('keydown', this.keyboardInput);
        document.addEventListener('keyup', this.keyboardInput);
    };
    EventHandler.prototype.getInputHandler = function () {
        return this.inputHandler;
    };
    return EventHandler;
}());
var FallingObject = (function () {
    function FallingObject(game) {
        this.speed = 3;
        this.x = Math.random() * 1280;
        this.y = 0;
        this.game = game;
    }
    FallingObject.prototype.drawAsteroids = function () {
        for (var i = 0; i <= 20; i++) {
            var a = Math.floor(Math.random() * 299);
            var b = Math.floor(Math.random() * 299);
            this.crc.fillStyle = "#FF0000";
            if (a > 40 && b > 40 && a < 270 && b < 270) {
                this.crc.beginPath();
                this.crc.arc(a, b, 10, 0, Math.PI * 2, true);
                this.crc.closePath();
                this.crc.fill();
            }
            else
                --i;
        }
    };
    FallingObject.prototype.getSpeed = function () {
        return this.speed;
    };
    FallingObject.prototype.setSpeed = function (s) {
        this.speed = s;
    };
    FallingObject.prototype.getX = function () {
        return this.x;
    };
    FallingObject.prototype.getY = function () {
        return this.y;
    };
    return FallingObject;
}());
var Game = (function () {
    function Game() {
        this.player = new Player(this);
        this.eventHandler = new EventHandler(this);
        this.inputHandler = new InputHandler(this);
        var canvas = document.getElementById('cnvs');
        this.renderEngine = new RenderEngine(this, canvas);
    }
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.drawAsteroids = function () {
        return this.fallingobject;
    };
    Game.prototype.getRenderEngine = function () {
        return this.renderEngine;
    };
    return Game;
}());
var InputHandler = (function () {
    function InputHandler(game) {
        this.game = game;
    }
    InputHandler.prototype.handleKeyPress = function (char) {
        var player = this.game.getPlayer();
        var x = this.game.getPlayer().getX();
        var y = this.game.getPlayer().getY();
        switch (char) {
            case "A":
                if (!player.getIsMoving()) {
                    player.setDirection(0);
                    player.setIsMoving(true);
                }
                else {
                    player.setDirection(0);
                }
                break;
            case "D":
                if (!player.getIsMoving()) {
                    player.setDirection(1);
                    player.setIsMoving(true);
                }
                else {
                    player.setDirection(1);
                }
                break;
        }
    };
    InputHandler.prototype.handleKeyRelease = function (char) {
        var player = this.game.getPlayer();
        var x = this.game.getPlayer().getX();
        var y = this.game.getPlayer().getY();
        switch (char) {
            case "A":
            case "D":
                player.setIsMoving(false);
                break;
        }
    };
    return InputHandler;
}());
var Player = (function () {
    function Player(game) {
        this.x = 600;
        this.y = 600;
        this.direction = -1;
        this.isMoving = false;
        this.game = game;
        this.movementLoop();
    }
    Player.prototype.getX = function () {
        return this.x;
    };
    Player.prototype.getY = function () {
        return this.y;
    };
    Player.prototype.setLocation = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Player.prototype.getSpeed = function () {
        return 10;
    };
    Player.prototype.setDirection = function (d) {
        this.direction = d;
    };
    Player.prototype.getDirection = function () {
        return this.direction;
    };
    Player.prototype.getIsMoving = function () {
        return this.isMoving;
    };
    Player.prototype.setIsMoving = function (b) {
        this.isMoving = b;
        console.log("Moving set to: " + b);
        this.movementLoop();
    };
    Player.prototype.movementLoop = function () {
        var _this = this;
        if (this.isMoving == false)
            return;
        if (this.direction == 0)
            this.setLocation(this.getX() - this.getSpeed(), this.getY());
        if (this.direction == 1)
            this.setLocation(this.getX() + this.getSpeed(), this.getY());
        this.game.getRenderEngine().update();
        setTimeout(function () { _this.movementLoop(); }, 0);
    };
    return Player;
}());
var RenderEngine = (function () {
    function RenderEngine(game, gameCanvas) {
        this.playerSprite = new Sprite("rimmert.svg");
        this.game = game;
        this.gameCanvas = gameCanvas;
        this.crc = this.gameCanvas.getContext("2d");
    }
    RenderEngine.prototype.drawBackground = function () {
        this.crc.fillStyle = "black";
        this.crc.fillRect(0, 0, 1280, 720);
    };
    RenderEngine.prototype.drawAnimation = function () {
        var x = 200;
        requestAnimationFrame(this.drawAnimation);
        this.crc.beginPath();
        this.crc.arc(x, 200, 30, 0, Math.PI * 2, false);
        this.crc.strokeStyle = 'blue';
        this.crc.stroke();
        x += 1;
    };
    RenderEngine.prototype.drawSprite = function (s, x, y) {
        var img = this.playerSprite.get();
        this.crc.drawImage(img, x, y);
    };
    RenderEngine.prototype.getCrc = function () {
        return this.crc;
    };
    RenderEngine.prototype.update = function () {
        this.clearCanvas();
        this.drawBackground();
        this.game.getRenderEngine().drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
    };
    RenderEngine.prototype.clearCanvas = function () {
        this.crc.clearRect(0, 0, 1280, 720);
    };
    RenderEngine.prototype.drawText = function (s, x, y) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    };
    return RenderEngine;
}());
var Sprite = (function () {
    function Sprite(src) {
        this.src = "assets/sprites/" + src;
        this.img = this.get();
    }
    Sprite.prototype.get = function () {
        var img = new Image();
        img.useMap = this.src;
        img.setAttribute('src', img.useMap);
        return img;
    };
    return Sprite;
}());
//# sourceMappingURL=main.js.map