module.exports = {
	scaleLongestSideToSize: (mesh, size) => {
	  const { x: width, y: height, z: depth } =
	    new THREE.Box3().setFromObject(mesh).size();
	  const longest = Math.max(width, Math.max(height, depth));
	  const scale = size / longest;
	  mesh.scale.set(scale, scale, scale);
	}
}