class EventHandler {

    private inputHandler:InputHandler;
    private game:Game;

    constructor(game:Game){
        this.addEventHandlers();
        this.game = game;
        this.inputHandler = new InputHandler(game);
    }
    
    addEventHandlers() {
        document.addEventListener('keydown', this.keyboardInput);
        document.addEventListener('keyup', this.keyboardRelease);
    }

     keyboardInput = (event: KeyboardEvent):void => {
        if (event.type == "keydown")
            this.getInputHandler().handleKeyPress(String.fromCharCode(event.keyCode));

        if (event.type == "keyup")
            this.getInputHandler().handleKeyRelease(String.fromCharCode(event.keyCode));
        }

    keyboardRelease = (event: KeyboardEvent):void => {
        this.getInputHandler().handleKeyRelease(String.fromCharCode(event.keyCode));
    }

    getInputHandler() : InputHandler {
        return this.inputHandler;
    }
}   