class ObjectCollection {

    private objects: FallingObject[]  = new Array();

     constructor() {
         //
     }

     public add(o:FallingObject): void {
        this.objects.push(o);
     }

     public remove(i:number): void {
        this.objects.splice(i, 1);
     }

     public getCollection(): FallingObject[] {
         return this.objects;
     }

     public get(i:number): FallingObject {
         return this.objects[i];
     }
}