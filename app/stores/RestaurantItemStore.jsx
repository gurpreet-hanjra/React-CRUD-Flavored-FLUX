"use strict";
let dispatcher = require("./../dispatcher.js"),
	config = require('./../appConfig'),
	{getRestaurantsAndReviews,post,del,patch,} = require("./../RestHelper.js"),
	$ = require('jquery'),
	Utils = require('./../utils/Utils.js');

function RestaurantItemStore(){

	let changeListeners = [],
		restaurants = [],
		reviews = [],
		users = [],
		restaurantList = [];

	function triggerListeners(){
		changeListeners.forEach(function(listener){
			listener(restaurantList)	;
		})
	}

	// get all restaurant data - restaurants, reviews, users //
	getRestaurantsAndReviews(config.host + config.appName + '/restaurant',
							 config.host + config.appName + '/review',
							 config.host + config.appName + '/user')
	.then(function (data, reviewsData) {
			console.log('restaurants', data);

			restaurants = data[0];
			reviews = data[1];
			users = data[2];

			// collate reviews and user data //
			for(let y in reviews) {
				let index = users.findIndex(x => x._id===reviews[y].user);
				reviews[y].username = users[index].name;
			}

			// collate restaurants and its respective reviews //
			for (let j in restaurants) {
				var reviewList = [];
				for (let i in reviews) {
					var revObject = {};
					if (reviews[i].restaurant === restaurants[j]._id) {
						revObject.id = reviews[i]._id;
						revObject.stars = reviews[i].stars;
						revObject.text = reviews[i].text;
						revObject.restaurant = reviews[i].restaurant;
						revObject.username = reviews[i].username;
						revObject.user = reviews[i].user;
						reviewList.push(revObject)
					}
				}

				restaurants[j].reviews = reviewList;
				restaurantList.push(restaurants[j])
			}

			console.log('combined array', restaurantList);
			triggerListeners();
		});

	// remove review item //
	function removeReviewItem(item){
		let restaurantIndex = restaurantList.findIndex(x => x._id===item.restaurant),
			reviewIndex = restaurantList[restaurantIndex].reviews.findIndex(x => x.id===item.id),
			removedItem = restaurantList[restaurantIndex].reviews.splice(reviewIndex,1)[0];

		del(config.host + config.appName + `/review/${item.id}`)
			.then(()=>{
				triggerListeners();
				Materialize.toast('Review deleted.', 4000);
			})
			.catch(()=>{
				restaurantList[restaurantIndex].reviews.splice(reviewIndex,0,removedItem);
				triggerListeners();
				Materialize.toast('Something went wrong. Review not deleted.', 4000);
			})
	}

	// add new review item //
	function addReviewItem(item){

		let i,
			itemIndex,
			localItem;

		// to set user name in recently added item //
		localItem = $.extend({}, item);

		// find the item and push in main array //
		for(let a in restaurantList) {
			if (item.restaurant === restaurantList[a]._id) {
				localItem.username = Utils.getDefaultUser().username;
				i = restaurantList[a].reviews.push(localItem);
				itemIndex = a;
			}
		}

		triggerListeners();

		// post the item //
		post(config.host + config.appName + '/review/',item)
			.then((g)=>{
				item._id = g._id;
					Materialize.toast('Review added.', 4000);
			})
			.catch(()=>{
					restaurantList[itemIndex].reviews.splice(restaurantList[itemIndex].reviews.length-1,1);
					triggerListeners();
					Materialize.toast('Something went wrong. Review not added.', 4000)
			})
	}

	// update review //
	function updateReview(item){

		// object to send //
		let obj = {
			date: new Date(),
			text: item.text,
			stars: Number(item.stars),
			restaurant: item.restaurant,
			user: item.user
		};

		triggerListeners();

		patch(config.host + config.appName +  `/review/${item.id}`,obj);

		Materialize.toast('Review updated.', 4000);
	}

	// get all the items //
	function getRestaurantItems(){
		return restaurantList;
	}

	// listen to the changes in data //
	function onChange(listener){
		changeListeners.push(listener);
	}

	// get the event and call method accordingly //
	dispatcher.register(function(event){
		let split = event.type.split(':');
		if (split[0]==='restaurant-item'){
			switch(split[1]) {
				case "add":
					addReviewItem(event.payload);
					break;
				case "delete":
					removeReviewItem(event.payload);
					break;
				case "update":
					updateReview(event.payload);
					break;
			}
		}
	});

	return {
		getRestaurantItems:getRestaurantItems,
		onChange:onChange
	}
}

module.exports = new RestaurantItemStore();
