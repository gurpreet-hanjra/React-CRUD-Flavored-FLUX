let dispatcher = require("./../dispatcher.js"),
	groceryAction = require("./../stores/RestaurantItemActionCreator.jsx"),
	React = require('react'),
	Utils = require('./../utils/Utils.js'),
	RestaurantItem;

RestaurantItem = React.createClass({

	handleClick: function (event, item) {
		// sets active item //
		this.props.setActiveItem(this.props.item);
	},

	render:function(){
		return (
			<tr className="restaurant-item row" onClick={this.handleClick}>
				<td>{this.props.item.name}</td>
				<td>{Utils.getAverageRating(this.props.item.reviews)}</td>
				<td>{Utils.capitalize(this.props.item.cuisine)}</td>
			</tr>
		)
	}
});

module.exports = RestaurantItem;
