import utils from '../../api/utils';
const THREE = require('three');

function addArrows(group, anchor, angle, size=0.02){
	let base_geometry = new THREE.PlaneGeometry(size, size*4, 1, 4);
	if(angle < 0 || angle > Math.PI){
		//arrow point to left
		base_geometry.vertices[2].x -= size/2;
		base_geometry.vertices[3].x -= size/2;
		base_geometry.vertices[4].x -= size;
		base_geometry.vertices[5].x -= size;
		base_geometry.vertices[6].x -= size/2;
		base_geometry.vertices[7].x -= size/2;
	}else{
		base_geometry.vertices[2].x += size/2;
		base_geometry.vertices[3].x += size/2;
		base_geometry.vertices[4].x += size;
		base_geometry.vertices[5].x += size;
		base_geometry.vertices[6].x += size/2;
		base_geometry.vertices[7].x += size/2;
	}
	// Find the circumference segment for which arrows populate
	// The space between the arrows are half the size
	let numArrows = Math.floor((angle * 0.2) / (1.5*size));
	let pixie_material_light = new THREE.MeshBasicMaterial( {color: 0xFFFF00, transparent:true, opacity: 0.80} );
	//color is hot pink
	let pixie_material_dark = new THREE.MeshBasicMaterial( {color: 0xFF69B4, transparent:true, opacity: 0.80} );
	var i;
	for(i = 0; i < Math.floor(numArrows / 2); i++){
		let sl = new THREE.Mesh( base_geometry,  pixie_material_light);
		let sd = new THREE.Mesh( base_geometry,  pixie_material_dark);
		group.add(sl);
		group.add(sd);
	}
	alignArrows(group, angle);
	group.added = true;
}

function alignArrows(group, angle){
	let numArrows = group.children.length;
	for(i = 0; i < numArrows; i++){
		group.children[i].position.set(Math.sin(i*angle/numArrows), 0, -Math.cos(i*angle/numArrows));
		group.children[i].lookAt(new THREE.Vector3(0, 0, 0));
	}
}

module.exports = {
  addArrows: addArrows,
  alignArrows: alignArrows,
};