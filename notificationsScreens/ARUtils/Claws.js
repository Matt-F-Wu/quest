const THREE = require('three');

module.exports = {
	createClaw: function (color=0x4B0082){
		//Create claw gemetry from vertices
		let A = new THREE.Vector3(0, 0.06, -0.02);
		let B = new THREE.Vector3(-0.01, 0.05, -0.01); 
		let C = new THREE.Vector3(-0.01, 0.01, 0);
		let D = new THREE.Vector3(-0.05, 0.01, -0.01);
		let E = new THREE.Vector3(-0.06, 0, -0.02);
		let F = new THREE.Vector3(-0.05, -0.01, -0.01);
		let G = new THREE.Vector3(-0.01, -0.01, 0);
		let H = new THREE.Vector3(-0.01, -0.05, -0.01);
		let I = new THREE.Vector3(0, -0.06, -0.02);
		let J = new THREE.Vector3(0.01, -0.05, -0.01);
		let K = new THREE.Vector3(0.01, -0.01, 0);
		let L = new THREE.Vector3(0.05, -0.01, -0.01);
		let M = new THREE.Vector3(0.06, 0, -0.02);
		let N = new THREE.Vector3(0.05, 0.01, -0.01);
		let O = new THREE.Vector3(0.01, 0.01, 0);
		let P = new THREE.Vector3(0.01, 0.05, -0.01);

		let A2 = new THREE.Vector3(0, 0.06, -0.038);
		let B2 = new THREE.Vector3(-0.01, 0.05, -0.028); 
		let C2 = new THREE.Vector3(-0.01, 0.01, -0.018);
		let D2 = new THREE.Vector3(-0.05, 0.01, -0.028);
		let E2 = new THREE.Vector3(-0.06, 0, -0.038);
		let F2 = new THREE.Vector3(-0.05, -0.01, -0.028);
		let G2 = new THREE.Vector3(-0.01, -0.01, -0.018);
		let H2 = new THREE.Vector3(-0.01, -0.05, -0.028);
		let I2 = new THREE.Vector3(0, -0.06, -0.038);
		let J2 = new THREE.Vector3(0.01, -0.05, -0.028);
		let K2 = new THREE.Vector3(0.01, -0.01, -0.018);
		let L2 = new THREE.Vector3(0.05, -0.01, -0.028);
		let M2 = new THREE.Vector3(0.06, 0, -0.038);
		let N2 = new THREE.Vector3(0.05, 0.01, -0.028);
		let O2 = new THREE.Vector3(0.01, 0.01, -0.018);
		let P2 = new THREE.Vector3(0.01, 0.05, -0.028);

		let geometry = new THREE.Geometry();
		geometry.vertices.push(A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, A2, B2, C2, D2, E2, F2, G2, H2, I2, J2, K2, L2, M2, N2, O2, P2);

		geometry.faces.push( 
		new THREE.Face3( 0, 1, 15 ), 
		new THREE.Face3( 1, 2, 15 ),
		new THREE.Face3( 2, 14, 15 ),
		new THREE.Face3( 3, 4, 5 ),
		new THREE.Face3( 2, 3, 5 ),
		new THREE.Face3( 2, 5, 6 ),
		new THREE.Face3( 2, 6, 14 ),
		new THREE.Face3( 6, 10, 14 ),
		new THREE.Face3( 10, 13, 14 ),
		new THREE.Face3( 10, 11, 13 ),
		new THREE.Face3( 11, 12, 13 ),
		new THREE.Face3( 7, 9, 10 ),
		new THREE.Face3( 6, 7, 10 ),
		new THREE.Face3( 7, 8, 9 ),
		new THREE.Face3( 0+16, 1+16, 15+16 ),
		new THREE.Face3( 1+16, 14+16, 15+16 ),
		new THREE.Face3( 1+16, 2+16, 15+16 ),
		new THREE.Face3( 3+16, 4+16, 5+16 ),
		new THREE.Face3( 3+16, 5+16, 6+16 ),
		new THREE.Face3( 2+16, 3+16, 6+16 ),
		new THREE.Face3( 2+16, 10+16, 14+16 ),
		new THREE.Face3( 11+16, 12+16, 13+16 ),
		new THREE.Face3( 11+16, 13+16, 14+16 ),
		new THREE.Face3( 10+16, 11+16, 14+16 ),
		new THREE.Face3( 7+16, 8+16, 9+16 ),
		new THREE.Face3( 6+16, 7+16, 9+16 ),
		new THREE.Face3( 6+16, 9+16, 10+16 ),
		new THREE.Face3( 2+16, 6+16, 10+16 ),
		new THREE.Face3(0, 16, 17),
		new THREE.Face3(1, 0, 17),
		new THREE.Face3(1, 17, 18),
		new THREE.Face3(2, 1, 18),
		new THREE.Face3(2, 18, 19),
		new THREE.Face3(3, 2, 19),
		new THREE.Face3(3, 19, 20),
		new THREE.Face3(4, 3, 20),
		new THREE.Face3(4, 20, 21),
		new THREE.Face3(5, 4, 21),
		new THREE.Face3(5, 21, 22),
		new THREE.Face3(6, 5, 22),
		new THREE.Face3(6, 22, 23),
		new THREE.Face3(7, 6, 23),
		new THREE.Face3(7, 23, 24),
		new THREE.Face3(8, 7, 24),
		new THREE.Face3(8, 24, 25),
		new THREE.Face3(9, 8, 25),
		new THREE.Face3(9, 25, 26),
		new THREE.Face3(10, 9, 26),
		new THREE.Face3(10, 26, 27),
		new THREE.Face3(11, 10, 27),
		new THREE.Face3(11, 27, 28),
		new THREE.Face3(12, 11, 28),
		new THREE.Face3(12, 28, 29),
		new THREE.Face3(13, 12, 29),
		new THREE.Face3(13, 29, 30),
		new THREE.Face3(14, 13, 30),
		new THREE.Face3(14, 30, 31),
		new THREE.Face3(15, 14, 31)
		);
				

		//geometry.computeBoundingSphere();

		//color is indigo
		let material = new THREE.MeshBasicMaterial( { color: color } );
		return (new THREE.Mesh(geometry, material));
	},
};