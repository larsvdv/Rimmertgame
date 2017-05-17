/*
* @Author Mitch
*/
class EventHandler {

    constructor(game:Game){
        this.addEventHandlers();
        this.game = game;
        this.inputHandler = new InputHandler(game);
    }

    private inputHandler:InputHandler;
    private game:Game;
    
        addEventHandlers() {
            document.addEventListener('keydown', this.keyboardInput);
        }

        keyboardInput = (event: KeyboardEvent):void => {
                this.getInputHandler().handleKeyPress(String.fromCharCode(event.keyCode));
        }

        getInputHandler() : InputHandler {
            return this.inputHandler;
        }
}