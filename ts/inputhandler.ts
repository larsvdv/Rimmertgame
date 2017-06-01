class InputHandler {
    
    constructor(game:Game) {
        this.game = game;
    }

    private game:Game;

    handleKeyPress(char:string){

        let player = this.game.getPlayer();
        let x = this.game.getPlayer().getX();
        let y = this.game.getPlayer().getY();

        switch(char)
        {
            /*case "LETTER":
            *CODE*
            break;*/

           /*case "W":
                player.setLocation(player.getX(),player.getY()-player.getSpeed());
            break;*/
            case "A":
                if (!player.getIsMoving()) {
                player.setDirection(0);
                player.setIsMoving(true);
                } else {
                    player.setDirection(0);
                }
            break;
            /*case "S":
                player.setLocation(player.getX(),player.getY()+player.getSpeed());
            break;*/
            case "D":
                if (!player.getIsMoving()) {
                player.setDirection(1);
                player.setIsMoving(true);
                } else {
                    player.setDirection(1);
                }
            break;
        }
            
    }

    handleKeyRelease(char:string){

        let player = this.game.getPlayer();
        let x = this.game.getPlayer().getX();
        let y = this.game.getPlayer().getY();

        switch(char)
        {
            case "A":
            case "D":
                player.setIsMoving(false);
            break;
        }
            
    }

}