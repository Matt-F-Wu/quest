export default class MovableObject{
    
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
    static moveObject(origin, direction, distance, step_size, faceCamera=false){
        // start at the origin, going to end_point
        var steps = distance / step_size;
        //console.debug("Origin: " + origin.x + " " + origin.y + " " + origin.z);
        return function(s){
            if(steps != 0){
              s.obj.position.x += (direction.x * step_size);
              s.obj.position.y += (direction.y * step_size);
              s.obj.position.z += (direction.z * step_size);
              if(faceCamera){
                s.obj.lookAt(origin);
              }
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

    static circleUser(radius = 2.5, interval = 2000, normalizer = 12){
        return function(s, cp, cd){
            //console.debug("Got here");
            var time = Date.now();
            let nx = s.obj.position.x + Math.cos(time / interval) / normalizer * radius;
            if(nx < cp.x - radius || nx > cp.x + radius){
                //stay put
                nx = s.obj.position.x;
            }
            s.obj.position.x = nx;

            let ny = s.obj.position.y + Math.sin(time / interval) / normalizer * radius;
            if(ny < cp.y - radius || ny > cp.y + radius){
                //stay put
                ny = s.obj.position.y;
            }
            s.obj.position.y = ny;

            let nz = s.obj.position.z + Math.sin(time / interval) / normalizer * radius;
            if(nz < cp.z - radius || nz > cp.z + radius){
                //stay put
                nz = s.obj.position.z;
            }
            s.obj.position.z = nz;
            s.obj.lookAt(cp);
            return true;
        }
    }

    static oscillate(offset = {x: 0, y: 0, z: 0}, radius = 0.02){
        return function(s, cp, cd){
            var time = Date.now();
            //TODO:            

        }
    }
}        