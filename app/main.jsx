"use strict";

let dispatcher = require('./dispatcher.js'),
	RestaurantItemList = require('./components/RestaurantItemList.jsx'),
	React = require('react'),
	ReactDOM = require('react-dom'),
	RestaurantItemStore = require('./stores/RestaurantItemStore.jsx'),
	items = RestaurantItemStore.getRestaurantItems();

// listen to the changes and re-render the components //
RestaurantItemStore.onChange(()=>{
	items = RestaurantItemStore.getRestaurantItems();
	render();
});

// render the main component //
function render(){
	ReactDOM.render(<RestaurantItemList items={items}/>,mount);
}


