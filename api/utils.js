module.exports = {
	shuffle: function (a) {
	    var j, x, i;
	    for (i = a.length - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	        x = a[i];
	        a[i] = a[j];
	        a[j] = x;
	    }
	},

	horizontalAngleBetween: function (a, b){
		//returns the horizontal agle between a and b, clock wise
		return Math.atan2(-a.z, a.x) - Math.atan2(-b.z, b.x);
	},
}