//CPU animation
function animateWater(timestamp, waterMesh, calm_level){
  timestamp = Math.round((timestamp/100) % 10);
  for (let x = 0; x < waterMesh.geometry.vertices.length; x++) {
		let v = waterMesh.geometry.vertices[x];
    v.z = calm_level + (1.5 * Math.sin(timestamp + v.x * 10 + Math.PI / 4)) * 0.03 + (1 * Math.cos(timestamp + v.y * 5)) * 0.05;
    //(-2 * Math.sin((timestamp + (v.x * 10 )))) * 0.03 + (1 * Math.cos((timestamp + (v.y)))) * 0.05;
  }    
  
  waterMesh.geometry.computeFaceNormals();	
  waterMesh.geometry.normalsNeedUpdate = true;  
  waterMesh.geometry.verticesNeedUpdate =true;
  
}

module.exports = {
  animateWater: animateWater,
};