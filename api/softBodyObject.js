const THREE = require('three');
// References & sample code
// https://threejs.org/examples/webgl_animation_cloth.html
// https://threejs.org/examples/js/Cloth.js
// http://freespace.virgin.net/hugo.elias/models/m_cloth.htm
// http://cg.alexandra.dk/tag/spring-mass-system/

/*
 * Cloth Simulation using a relaxed constrains solver
 */
const DAMPING = 0.03;
const DRAG = 1 - DAMPING;
const MASS = .3;
const restDistance = 0.005;


const xSegs = 60; //
const ySegs = 60; //

const GRAVITY = 9.81 * 2; // 
const gravity = new THREE.Vector3( 0, - GRAVITY, 0 ).multiplyScalar( MASS );
const TIMESTEP = 18 / 1000;
const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

const wind = true;
const windStrength = 8;
const windForce = new THREE.Vector3( 0, 0, 0 );

const tmpForce = new THREE.Vector3();
const faceBump = 0.15;

clothFunction = (u, v) => {
		
		var x = ( u - 0.5 ) * restDistance * xSegs;
		var y = -1.0 * ( v - 0.5 ) * restDistance * ySegs;
		var z = 0;

		return new THREE.Vector3( x, y, z );
};

class Particle{

		constructor( x, y, z, mass, clothFunction){
			this.position = clothFunction( x, y ); // position
			//console.debug(this.position);
			this.previous = clothFunction( x, y ); // previous
			this.original = clothFunction( x, y ); 
			this.a = new THREE.Vector3( 0, 0, 0 ); // acceleration
			this.mass = mass;
			this.invMass = 1 / mass;
			this.tmp = new THREE.Vector3();
			this.tmp2 = new THREE.Vector3();
		}

		addForce = function( force ) {
			// Force -> Acceleration
			this.a.add(
				this.tmp2.copy( force ).multiplyScalar( this.invMass )
			);

		};

		integrate = function( timesq ) {
			// Performs verlet integration
			var newPos = this.tmp.subVectors( this.position, this.previous );
			newPos.multiplyScalar( DRAG ).add( this.position );
			newPos.add( this.a.multiplyScalar( timesq ) );

			this.tmp = this.previous;
			this.previous = this.position;
			this.position = newPos;

			this.a.set( 0, 0, 0 );

		};

	}

export default class softBodyObject {
	
	cloth = new this.Cloth( xSegs, ySegs );
	
	pins = [];

	lastTime;

	clothGeometry;
	
	object;

	diff = new THREE.Vector3();

	satisifyConstrains( p1, p2, distance ) {

		this.diff.subVectors( p2.position, p1.position );
		var currentDist = this.diff.length();
		if ( currentDist == 0 ) return; // prevents division by 0
		var correction = this.diff.multiplyScalar( 1 - distance / currentDist );
		var correctionHalf = correction.multiplyScalar( 0.5 );
		p1.position.add( correctionHalf );
		p2.position.sub( correctionHalf );

	}


	Cloth( w, h ) {

		w = w || 10;
		h = h || 10;
		this.w = w;
		this.h = h;

		var particles = [];
		var constrains = [];

		var u, v;

		// Create particles
		for ( v = 0; v <= h; v ++ ) {

			for ( u = 0; u <= w; u ++ ) {

				particles.push(
					new Particle( u / w, v / h, 0, MASS, clothFunction)
				);

			}

		}

		// Structural

		for ( v = 0; v < h; v ++ ) {

			for ( u = 0; u < w; u ++ ) {

				constrains.push( [
					particles[ index( u, v ) ],
					particles[ index( u, v + 1 ) ],
					restDistance
				] );

				constrains.push( [
					particles[ index( u, v ) ],
					particles[ index( u + 1, v ) ],
					restDistance
				] );

			}

		}

		for ( u = w, v = 0; v < h; v ++ ) {

			constrains.push( [
				particles[ index( u, v ) ],
				particles[ index( u, v + 1 ) ],
				restDistance

			] );

		}

		for ( v = h, u = 0; u < w; u ++ ) {

			constrains.push( [
				particles[ index( u, v ) ],
				particles[ index( u + 1, v ) ],
				restDistance
			] );

		}

		this.particles = particles;
		this.constrains = constrains;

		function index( u, v ) {

			return u + v * ( w + 1 );

		}

		this.index = index;
	}

	simulate( time ) {

		if ( ! this.lastTime ) {

			this.lastTime = time;
			return;

		}
		
		var i, il, particles, particle, pt, constrains, constrain;

		// Aerodynamics forces
		if ( wind ) {

			var face, faces = this.clothGeometry.faces, normal;

			particles = this.cloth.particles;

			for ( i = 0, il = faces.length; i < il; i ++ ) {

				face = faces[ i ];
				normal = face.normal;

				tmpForce.copy( normal ).normalize().multiplyScalar( normal.dot( windForce ) );
				particles[ face.a ].addForce( tmpForce );
				particles[ face.b ].addForce( tmpForce );
				particles[ face.c ].addForce( tmpForce );

			}

		}
		
		for ( particles = this.cloth.particles, i = 0, il = particles.length
				; i < il; i ++ ) {

			particle = particles[ i ];
			particle.addForce( gravity );

			particle.integrate( TIMESTEP_SQ );

		}

		// Start Constrains

		constrains = this.cloth.constrains,
		il = constrains.length;
		for ( i = 0; i < il; i ++ ) {

			constrain = constrains[ i ];
			this.satisifyConstrains( constrain[ 0 ], constrain[ 1 ], constrain[ 2 ] );

		}

		// Pin Constrains
		for ( i = 0, il = this.pins.length; i < il; i ++ ) {

			var xy = this.pins[ i ];
			var p = particles[ xy ];
			p.position.copy( p.original );
			p.previous.copy( p.original );

		}
	}

	init(clothTexture) {
		// cloth geometry
		this.clothGeometry = new THREE.PlaneGeometry( restDistance * xSegs, restDistance * ySegs, xSegs, ySegs );
		this.clothGeometry.dynamic = true;
		//console.debug("Length: " + this.clothGeometry.vertices.length);
		//console.log(this.clothGeometry.vertices);
		/*clothTexture.anisotropy = 16;
		var clothMaterial = new THREE.MeshPhongMaterial( {
	        specular: 0x030303,
	        emissive: 0x111111,
	        map: clothTexture,
	        side: THREE.DoubleSide,
	        alphaTest: 0.5
      	} );
      	*/

      	//Hao: find points that constitutes a filled circle
		var i, j, x, y, xx, idx, bump, p = this.cloth.particles, bmax=0, i_set = new Set();
		for(i = -90; i < 90; i += 5){
			x = (xSegs/2 + Math.round(Math.cos(Math.radians(i)) * (xSegs / 5)))
			y = (ySegs/2 - Math.round(Math.sin(Math.radians(i)) * (ySegs / 5)))
			xx = xSegs - x;
			for(j = xx; j < x + 1; j++){
				idx = Math.round(j + y * (xSegs + 1));
				if(i_set.has(idx)){
					//duplicate pin
					continue;
				}
				i_set.add(idx);
				bump = Math.max((xSegs/5) ** 2 - ((j - xSegs/2) ** 2 + (y - ySegs/2) ** 2), 0) ** 0.5 * 0.2 / (xSegs/5);
				if (isNaN(bump)) {
					//numerical stability check
					console.debug("Unstable");
					bump = 0;
				}
				//console.debug("original: " + p[idx].original + "  bump: " + bump);
				p[idx].original.z += bump;
			}
			//will have duplicates, but might not be worth cleaning up
		}

		this.pins = Array.from(i_set);

      	var clothMaterial = new THREE.MeshBasicMaterial({map: clothTexture});

		// cloth mesh
		this.object = new THREE.Mesh( this.clothGeometry, clothMaterial );
		this.object.castShadow = true;
		console.debug("Adding the cloth...");
		/*
		this.object.customDepthMaterial = new THREE.MeshStandardMaterial( {
			map: clothTexture,
			alphaTest: 0.5
		} );
		*/
	}

	animate(scene, initialPosition) {
		this.object.position.set( initialPosition.x, initialPosition.y, initialPosition.z );
		scene.add( this.object );
		var time = Date.now();

		windStrength = Math.abs(Math.cos(time / 7000)*8);
		windForce.set( Math.cos(time / 7000)*0.5, Math.sin(time / 7000)*0.5 , -1.0 ).normalize().multiplyScalar( windStrength );

		this.simulate(time);
		this.render();
	}

	render() {

	  var p = this.cloth.particles;

	  for ( var i = 0, il = p.length; i < il; i ++ ) {

	    this.clothGeometry.vertices[ i ].copy( p[ i ].position );

	  }
	  this.clothGeometry.computeFaceNormals();
	  
	  this.clothGeometry.computeVertexNormals();

	  this.clothGeometry.normalsNeedUpdate = true;
	  this.clothGeometry.verticesNeedUpdate = true;
	}
}
// degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};