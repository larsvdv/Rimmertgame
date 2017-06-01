class Collision{

    constructor(){

    }

    enum COLLIDER{
       CIRCLE,
       RECTANGLE,
       ROTRECTANGLE,
       LINE,
       POLYGON 
    }

    interface iCollider {
        hitTest(obj: iCollider): boolean;
        colliderType: COLLIDER;
        position: cVector;
    }
}