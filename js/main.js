var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        this.sprite = new Sprite('apple.svg');
        this.x = Math.random() * 1280;
        this.y = -120;
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
    FallingObject.prototype.getSprite = function () {
        return this.sprite;
    };
    FallingObject.prototype.setLocation = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return FallingObject;
}());
var Game = (function () {
    function Game() {
        this.objectCollection = new ObjectCollection();
        this.spawnDelay = 200;
        this.score = 0;
        this.player = new Player(this);
        this.eventHandler = new EventHandler(this);
        this.inputHandler = new InputHandler(this);
        var canvas = document.getElementById('cnvs');
        this.renderEngine = new RenderEngine(this, canvas);
        this.startGame();
    }
    Game.prototype.collides = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        var left1 = x1;
        var right1 = x1 + w1;
        var top1 = y1;
        var bottom1 = y1 + h1;
        var left2 = x2;
        var right2 = x2 + w2;
        var top2 = y2;
        var bottom2 = y2 + h2;
        return !(left2 > right1 ||
            right2 < left1 ||
            top2 > bottom1 ||
            bottom2 < top1);
    };
    Game.prototype.getObjectCollection = function () {
        return this.objectCollection;
    };
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.getRenderEngine = function () {
        return this.renderEngine;
    };
    Game.prototype.getScore = function () {
        return this.score;
    };
    Game.prototype.startGame = function () {
        this.spawnObjects();
        this.moveFallingObjects();
    };
    Game.prototype.spawnObjects = function () {
        var _this = this;
        this.objectCollection.add(this.spawnRandomObject());
        setTimeout(function () { _this.spawnObjects(); }, 2000);
    };
    Game.prototype.spawnRandomObject = function () {
        console.log(this.getObjectCollection());
        if ((Math.random()) >= 0.7) {
            return new FallingObject(this);
        }
        else {
            return new SuperEnemy(this);
        }
    };
    Game.prototype.endGame = function () {
        this.getRenderEngine().clearCanvas();
        this.getRenderEngine().crc.font = "60px Comic Sans MS";
        this.getRenderEngine().crc.fillStyle = "black";
        this.getRenderEngine().crc.fillText("GAMEOVER!!", 450, 400);
    };
    Game.prototype.moveFallingObjects = function () {
        var _this = this;
        var col = this.objectCollection.getCollection();
        for (var i = 0; i < col.length; i++) {
            var object = this.objectCollection.get(i);
            object.setLocation(object.getX(), object.getY() + object.getSpeed());
            if (this.collides(this.getPlayer().getX(), this.getPlayer().getY(), 76, 92, object.getX(), object.getY(), 69, 69)) {
                if (object instanceof SuperEnemy) {
                    return this.endGame();
                }
                if (!(object instanceof SuperEnemy)) {
                    this.score++;
                }
                this.objectCollection.remove(i);
            }
            if (object.getY() > 900) {
                this.objectCollection.remove(i);
            }
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
var ObjectCollection = (function () {
    function ObjectCollection() {
        this.objects = new Array();
    }
    ObjectCollection.prototype.add = function (o) {
        this.objects.push(o);
    };
    ObjectCollection.prototype.remove = function (i) {
        this.objects.splice(i, 1);
    };
    ObjectCollection.prototype.getCollection = function () {
        return this.objects;
    };
    ObjectCollection.prototype.get = function (i) {
        return this.objects[i];
    };
    return ObjectCollection;
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
    Player.prototype.setLocation = function (x) {
        this.x = x;
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
            this.setLocation(this.getX() - this.getSpeed());
        if (this.direction == 1)
            this.setLocation(this.getX() + this.getSpeed());
        setTimeout(function () { _this.movementLoop(); }, 0);
    };
    return Player;
}());
var RenderEngine = (function () {
    function RenderEngine(game, gameCanvas) {
        this.playerSprite = new Sprite("rimmert.svg");
        this.backgroundSprite = new Sprite("desktop.svg");
        this.score = 0;
        this.game = game;
        this.gameCanvas = gameCanvas;
        this.crc = this.gameCanvas.getContext("2d");
    }
    RenderEngine.prototype.drawBackground = function () {
        this.drawSprite(this.backgroundSprite, 0, 0);
    };
    RenderEngine.prototype.drawSprite = function (s, x, y) {
        var img = s.get();
        this.crc.drawImage(img, x, y);
    };
    RenderEngine.prototype.getCrc = function () {
        return this.crc;
    };
    RenderEngine.prototype.update = function () {
        this.clearCanvas();
        this.drawBackground();
        this.drawFallingObjects();
        this.drawScore();
        this.drawSprite(new Sprite("rimmert.svg"), this.game.getPlayer().getX(), this.game.getPlayer().getY());
    };
    RenderEngine.prototype.clearCanvas = function () {
        this.crc.clearRect(0, 0, 1280, 720);
    };
    RenderEngine.prototype.drawScore = function () {
        this.crc.font = "32px Comic Sans MS";
        this.crc.fillStyle = "red";
        this.crc.fillText("Score: " + this.game.getScore(), 1100, 40);
    };
    RenderEngine.prototype.drawText = function (s, x, y) {
        this.crc.fillStyle = "white";
        this.crc.fillText(s, x, y);
    };
    RenderEngine.prototype.drawFallingObjects = function () {
        for (var i = 0; i < this.game.getObjectCollection().getCollection().length; i++) {
            var object = this.game.getObjectCollection().get(i);
            this.drawSprite(object.getSprite(), object.getX(), object.getY());
        }
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
var SuperEnemy = (function (_super) {
    __extends(SuperEnemy, _super);
    function SuperEnemy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 4;
        _this.sprite = new Sprite('windows.svg');
        return _this;
    }
    return SuperEnemy;
}(FallingObject));
//# sourceMappingURL=main.js.map