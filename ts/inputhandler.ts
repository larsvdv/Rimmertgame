/*
* @Author Mitch
*/
class InputHandler {
    
    constructor(game:Game) {
        this.game = game;
    }

    private game:Game;

    handleKeyPress(char:string){

        let player =  this.game.getPlayer();
        let x = this.game.getPlayer().getX();
        let y = this.game.getPlayer().getY();
        this.game.getRenderEngine().getCrc().clearRect(x, y,x+72,y+96)

        switch(char)
        {
            /*case "LETTER":
            *CODE*
            break;*/

            case "W":
                player.setLocation(player.getX(),player.getY()-player.getSpeed());
            break;
            case "A":
                player.setLocation(player.getX()-player.getSpeed(),player.getY());
            break;
            case "S":
                player.setLocation(player.getX(),player.getY()+player.getSpeed());
            break;
            case "D":
                player.setLocation(player.getX()+player.getSpeed(),player.getY());
            break;

            
        }
            this.game.getRenderEngine().drawRimmert();
    }
}