let $ = require('jquery');

module.exports = {
	// get restaurant data //
	getRestaurantsAndReviews(restaurantURL, reviewURL, userURL) {

		// get restaurants //
		var p1 = new Promise(function(success,error){
			$.ajax({
				url:restaurantURL,
				dataType:"json",
				success,
				error
			});
		});

		// get reviews //
		var	p2 = new Promise(function(success,error){
			$.ajax({
				url:reviewURL,
				dataType:"json",
				success,
				error
			});
		});

		// get users //
		var	p3 = new Promise(function(success,error){
			$.ajax({
				url:userURL,
				dataType:"json",
				success,
				error
			});
		});

		// return all promises //
		return Promise.all([p1, p2, p3]);
	},

	del(url){
		return new Promise(function(success,error){
			$.ajax({
				url:url,
				type:'DELETE',
				success,
				error
			})
		})
	},

	post(url,data){
		console.log('POSTING....:',data);

		return new Promise(function(success,error){
			$.ajax({
				url,
				type:'POST',
				data:JSON.stringify(data),
				headers: { 'Content-type': 'application/json' },
				success,
				error
			})
		})
	},

	patch(url,data){
		return new Promise(function(success,error){
			$.ajax({
				url,
				type:'PUT',
				data:JSON.stringify(data),
				headers: { 'Content-type': 'application/json' },
				success,
				error
			})
		})
	}
};
