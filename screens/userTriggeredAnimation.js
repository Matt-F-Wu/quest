export default class userTriggeredAnimation{
    
    constructor(obj, bcbk, fcbk){
        this.obj = obj;
        //begin callback
        this.born = bcbk;
        //callback when object reaches destination/end state
        this.death = fcbk;

        // live function is initialized to be 
        this.live = function(){
            console.debug("Live function raw!");
        };
    }

    /* Hao Wu:
        This is a function factory, since translating in space is common
        A move object animation, from point "origin", in "direction", travel "distance"
    */
    moveObject(origin, direction, distance, step_size){
        // start at the origin, going to end_point
        var steps = distance / step_size;
        //console.debug("Origin: " + origin.x + " " + origin.y + " " + origin.z);
        return function(s){
            if(steps != 0){
              s.obj.position.x += (direction.x * step_size);
              s.obj.position.y += (direction.y * step_size);
              s.obj.position.z += (direction.z * step_size);
              //console.debug("steps left: " + steps + " x: " + s.obj.position.x + " y: " + s.obj.position.y + " z: " + s.obj.position.z);
              steps --;
              if (steps <= 0){
                //console.debug("Killing...");
                s.death(s);
                return false;
              }
            }
            return true;
        }
    }
}        