var AnimationEngine = (function () {
    function AnimationEngine(game, gameCanvas) {
        this.running = false;
        this.game = game;
        this.gameCanvas = gameCanvas;
        this.crc = this.gameCanvas.getContext("2d");
    }
    AnimationEngine.prototype.drawAnimation = function () {
        var x = 200;
        requestAnimationFrame(this.drawAnimation);
        this.crc.beginPath();
        this.crc.arc(x, 200, 30, 0, Math.PI * 2, false);
        this.crc.strokeStyle = 'blue';
        this.crc.stroke();
        x += 1;
    };
    return AnimationEngine;
}());
var EventHandler = (function () {
    function EventHandler(game) {
        var _this = this;
        this.keyboardInput = function (event) {
            _this.getInputHandler().handleKeyPress(String.fromCharCode(event.keyCode));
        };
        this.addEventHandlers();
        this.game = game;
        this.inputHandler = new InputHandler(game);
    }
    EventHandler.prototype.addEventHandlers = function () {
        document.addEventListener('keydown', this.keyboardInput);
    };
    EventHandler.prototype.getInputHandler = function () {
        return this.inputHandler;
    };
    return EventHandler;
}());
var Game = (function () {
    function Game() {
        this.player = new Player();
        this.eventHandler = new EventHandler(this);
        this.inputHandler = new InputHandler(this);
        var canvas = document.getElementById('cnvs');
        this.renderEngine = new RenderEngine(this, canvas);
    }
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.getRenderEngine = function () {
        return this.renderEngine;
    };
    Game.prototype.getAnimationEngine = function () {
        return this.animationEngine;
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
        this.game.getRenderEngine().update();
        switch (char) {
            case "W":
                player.setLocation(player.getX(), player.getY() - player.getSpeed());
                break;
            case "A":
                player.setLocation(player.getX() - player.getSpeed(), player.getY());
                break;
            case "S":
                player.setLocation(player.getX(), player.getY() + player.getSpeed());
                break;
            case "D":
                player.setLocation(player.getX() + player.getSpeed(), player.getY());
                break;
        }
        this.game.getRenderEngine().drawRimmert();
    };
    return InputHandler;
}());
var Player = (function () {
    function Player() {
        this.x = 0;
        this.y = 0;
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
        console.log("your location is now " + x + " " + y);
    };
    Player.prototype.getSpeed = function () {
        return 10;
    };
    return Player;
}());
var RenderEngine = (function () {
    function RenderEngine(game, gameCanvas) {
        this.running = false;
        this.game = game;
        this.gameCanvas = gameCanvas;
        this.crc = this.gameCanvas.getContext("2d");
    }
    RenderEngine.prototype.startRendering = function () {
        this.running = true;
        this.renderLoop();
    };
    RenderEngine.prototype.stopRendering = function () {
        this.running = false;
    };
    RenderEngine.prototype.renderLoop = function () {
        if (this.running == false)
            return;
        this.drawBackground();
        this.drawRimmert();
        this.renderLoop();
    };
    RenderEngine.prototype.drawBackground = function () {
        this.crc.fillStyle = "black";
        this.crc.fillRect(0, 0, 1280, 720);
    };
    RenderEngine.prototype.drawRimmert = function () {
        var img = document.getElementById("testimg");
        this.crc.drawImage(img, this.game.getPlayer().getX(), this.game.getPlayer().getY());
    };
    RenderEngine.prototype.getCrc = function () {
        return this.crc;
    };
    RenderEngine.prototype.update = function () {
        this.clearCanvas();
        this.drawBackground();
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
//# sourceMappingURL=main.js.map