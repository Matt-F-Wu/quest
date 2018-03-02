import utils from '../../api/utils';
const THREE = require('three');

function addPixies(group){
  let pixie_gemoetry_small = new THREE.SphereGeometry( 0.001, 32, 32 );
  let pixie_gemoetry_big = new THREE.SphereGeometry( 0.002, 32, 32 );
  let pixie_material_light = new THREE.MeshBasicMaterial( {color: 0xFFFF00, transparent:true, opacity: 0.80} );
  //color is hot pink
  let pixie_material_dark = new THREE.MeshBasicMaterial( {color: 0xFF69B4, transparent:true, opacity: 0.80} );
  var i;
  for(i = 0; i < 4; i++){
    let sl = new THREE.Mesh( pixie_gemoetry_small,  pixie_material_light);
    let sd = new THREE.Mesh( pixie_gemoetry_small,  pixie_material_dark);
    let bl = new THREE.Mesh( pixie_gemoetry_big,  pixie_material_light);
    let bd = new THREE.Mesh( pixie_gemoetry_big,  pixie_material_dark);
    group.add(sl);
    group.add(sd);
    group.add(bl);
    group.add(bd);
  }
}

function alignPixies(group, anchor, left = false){
  //shuffle the pixies
  utils.shuffle(group.children);

  let h = 0.02;
  if(left){
    h = -1 * h;
  }
  let A = new THREE.Vector3(-1.0*h*Math.sin(Math.PI/6), h*Math.cos(Math.PI/6), 0);
  let T = new THREE.Vector3(h, 0, 0);
  let B = new THREE.Vector3(-1.0*h*Math.sin(Math.PI/6), -1.0 * h*Math.cos(Math.PI/6), 0);
  let topEdge = new THREE.Vector3();
  topEdge.subVectors(A, T);
  let bottomEdge = new THREE.Vector3();
  bottomEdge.subVectors(B, T);
  
  var half = Math.ceil(group.children.length/2);
  
  for(i = 0; i < half; i++){
    let tmp = T.clone();
    tmp.addScaledVector(topEdge, i/half);
    group.children[i].position.set(tmp.x, tmp.y, tmp.z);
  }
  for(i = half; i < group.children.length; i++){
    let tmp = T.clone();
    tmp.addScaledVector(bottomEdge, (i-half)/half);
    group.children[i].position.set(tmp.x, tmp.y, tmp.z);
  }

  //Look at the achor point, likely the camera position
  group.lookAt(anchor);
}

module.exports = {
  addPixies: addPixies,
  alignPixies: alignPixies,
};