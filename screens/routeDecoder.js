//Hao Wu: a simple module to decode google directions api response's polyline to array of coordinates
module.exports = {
	decode: function(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})},
	// above function transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
	inBetween: function(arr, point){
		//TODO: Need some tuning, tolerate GPS error a little maybe
		console.debug("cur loc: " + point.latitude + " " + point.longitude);
		var i;
		for(i = 0; i < arr.length - 1; i++){
			//console.debug("point1: " + arr[i].latitude + " " + arr[i].longitude + " - point2: " + arr[i+1].latitude + " " + arr[i].longitude);
			if( point.latitude <= Math.max(arr[i].latitude, arr[i+1].latitude) &&
			 	point.latitude >= Math.min(arr[i].latitude, arr[i+1].latitude) &&
			 	point.longitude <= Math.max(arr[i].longitude, arr[i+1].longitude) &&
			 	point.longitude >= Math.min(arr[i].longitude, arr[i+1].longitude) ) {
				//if a point is between 2 points, return the later point, it's our next stop
				return arr[i+1];
			}
		}
		// Receiver currently not between any points
		return null;
	},

	findHeading: function(from, to){
		var p1 = {
			x: 1,
			y: 0
		};
		var p2 = {
			x: to.latitude - from.latitude,
			y: to.longitude - from.longitude
		};
		//Return the heading in degrees, wrt the true north
		return ((Math.atan2(p2.y, p2.x) * 180 / Math.PI - Math.atan2(p1.y, p1.x) * 180 / Math.PI) + 360) % 360;
	},

	rotateVector: function(vec, ang)
	{
	    ang = -ang * (Math.PI/180);
	    var cos = Math.cos(ang);
	    var sin = Math.sin(ang);
	    return new Array(Math.round(10000*(vec[0] * cos - vec[1] * sin))/10000, Math.round(10000*(vec[0] * sin + vec[1] * cos))/10000);
	},

	distance: function(a, b){
		return Math.pow((Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2)), 0.5);
	},
};

/*Could use the returned coords array like this:
<MapView.Polyline
    coordinates={[
        {latitude: initial.latitude, longitude: initial.longitude}, // optional
        ...this.state.coords,
        {latitude: final.latitude, longitude: final.longitude}, // optional
    ]}
    strokeWidth={4}
/>
*/