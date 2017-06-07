class SuperEnemy extends FallingObject{
    
    protected speed:number=4;
    protected sprite:Sprite = new Sprite('windows.svg');
    private e:SuperEnemy;
    public collides(x1:number,y1:number,w1:number,h1:number,x2:number,y2:number,w2:number,h2:number) : boolean {
        
        let left1=x1;
        let right1=x1+w1;
        let top1=y1;
        let bottom1=y1+h1;

        let left2=x2;
        let right2=x2+w2;
        let top2=y2;
        let bottom2=y2+h2;

        return !(left2 > right1 ||
        right2 < left1 ||
        top2 > bottom1 ||
        bottom2 < top1);
    }
}