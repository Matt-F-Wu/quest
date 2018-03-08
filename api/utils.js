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

	timeDiffOutput: function(a, b){
		//a and b are times in milliseconds
		let diff = a - b;
		if(diff < 60000){
			//received less than a minute ago
			return "Just now";
		}else if(diff < 60 * 60 * 1000){
			return Math.floor(diff/(60*1000)) + " minutes ago";
		}else if(diff < 24 * 60 * 60 * 1000){
			return Math.floor(diff/(60 * 60 * 1000)) + " hours ago";
		}else{
			return Math.floor(diff/(24 * 60 * 60 * 1000)) + " days ago";
		}
	},
}