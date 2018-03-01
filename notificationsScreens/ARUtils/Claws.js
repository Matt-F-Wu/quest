const THREE = require('three');

module.exports = {
	createClaw: function(color=0x4B0082){
		//Create claw gemetry from vertices
		let A = new THREE.Vector3(0, 0.06, -0.02);
		let B = new THREE.Vector3(-0.01, 0.05, -0.01); 
		let C = new THREE.Vector3(-0.01, 0.01, 0.0);
		let D = new THREE.Vector3(-0.05, 0.01, -0.01);
		let E = new THREE.Vector3(-0.06, 0, -0.02);
		let F = new THREE.Vector3(-0.05, -0.01, -0.01);
		let G = new THREE.Vector3(-0.01, -0.01, -0.01);
		let H = new THREE.Vector3(-0.01, -0.05, -0.01);
		let I = new THREE.Vector3(0, -0.06, -0.02);
		let J = new THREE.Vector3(0.01, -0.05, 0.0);
		let K = new THREE.Vector3(0.01, -0.01, 0.0);
		let L = new THREE.Vector3(0.05, -0.01, -0.01);
		let M = new THREE.Vector3(0.06, 0, -0.02);
		let N = new THREE.Vector3(0.05, 0.01, -0.01);
		let O = new THREE.Vector3(0.01, 0.01, 0.0);
		let P = new THREE.Vector3(0.01, 0.05, -0.01);

		let geometry = new THREE.Geometry();
		geometry.vertices.push(A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P);
		geometry.faces.push( 
			new THREE.Face3( 0, 1, 15 ), 
			new THREE.Face3( 1, 14, 15 ),
			new THREE.Face3( 1, 2, 15 ),
			new THREE.Face3( 3, 4, 5 ),
			new THREE.Face3( 3, 5, 6 ),
			new THREE.Face3( 2, 3, 6 ),
			new THREE.Face3( 2, 10, 14 ),
			new THREE.Face3( 11, 12, 13 ),
			new THREE.Face3( 11, 13, 14 ),
			new THREE.Face3( 10, 11, 14 ),
			new THREE.Face3( 7, 8, 9 ),
			new THREE.Face3( 6, 7, 9 ),
			new THREE.Face3( 6, 9, 10 ),
			new THREE.Face3( 2, 6, 10 ));

		//geometry.computeBoundingSphere();

		//color is indigo
		let material = new THREE.MeshBasicMaterial( { color: color } );
		return (new THREE.Mesh(geometry, material));
	},
};