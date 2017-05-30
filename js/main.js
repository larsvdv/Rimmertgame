var EventHandler = (function () {
    function EventHandler(game) {
        var _this = this;
        this.keyboardInput = function (event) {
            if (event.type == "keydown")
                _this.getInputHandler().handleKeyPress(String.fromCharCode(event.keyCode));
            if (event.type == "keyup")
                _this.getInputHandler().handleKeyRelease(String.fromCharCode(event.keyCode));
        };
        this.keyboardRelease = function (event) {
            _this.getInputHandler().handleKeyRelease(String.fromCharCode(event.keyCode));
        };
        this.addEventHandlers();
        this.game = game;
        this.inputHandler = new InputHandler(game);
    }
    EventHandler.prototype.addEventHandlers = function () {
        document.addEventListener('keydown', this.keyboardInput);
        document.addEventListener('keyup', this.keyboardRelease);
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
    FallingObject.prototype.setLocation = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return FallingObject;
}());
var Game = (function () {
    function Game() {
        this.player = new Player(this);
        this.eventHandler = new EventHandler(this);
        this.inputHandler = new InputHandler(this);
        this.fallingObjects = new Array(10);
        var canvas = document.getElementById('cnvs');
        this.renderEngine = new RenderEngine(this, canvas);
        this.startGame();
    }
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.getFallingObjects = function () {
        return this.fallingObjects;
    };
    Game.prototype.getRenderEngine = function () {
        return this.renderEngine;
    };
    Game.prototype.startGame = function () {
        for (var i = 0; i <= 0; i++) {
            this.fallingObjects[i] = new FallingObject(this);
        }
        this.moveFallingObjects();
    };
    Game.prototype.moveFallingObjects = function () {
        var _this = this;
        if (this.fallingObjects.length == 0)
            return;
        for (var i = 0; i < this.fallingObjects.length; i++) {
            this.fallingObjects[i].setLocation(this.fallingObjects[i].getX(), this.fallingObjects[i].getY() + this.fallingObjects[i].getSpeed());
        }
        this.getRenderEngine().update();
        setTimeout(function () { _this.moveFallingObjects(); }, 0);
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
        this.crc.fillStyle = "skyblue";
        this.crc.fillRect(0, 0, 1280, 720);
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
        this.drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
        this.drawFallingObjects();
    };
    RenderEngine.prototype.clearCanvas = function () {
        this.crc.clearRect(0, 0, 1280, 720);
    };
    RenderEngine.prototype.drawText = function (s, x, y) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    };
    RenderEngine.prototype.drawFallingObjects = function () {
        for (var i = 0; i < this.game.getFallingObjects().length; i++)
            this.drawSprite(new Sprite("rimmert.svg"), this.game.getFallingObjects()[i].getX(), this.game.getFallingObjects()[i].getY());
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