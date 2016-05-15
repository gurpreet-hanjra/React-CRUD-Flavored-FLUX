"use strict";

let RestaurantItem = require('./RestaurantItem.jsx'),
	Details = require('./Details.jsx'),
	React = require('react'),
	RestaurantItemList;

RestaurantItemList = React.createClass({

	getInitialState: function() {
		return {
			activeItem: this.props.items[0]
		};
	},

	childContextTypes: {
		activeItem: React.PropTypes.any
	},

	getChildContext: function () {
		if(this.state) {
			return {
				activeItem: this.state.activeItem
			};
		}
	},

	setActiveItem: function (item) {
		this.setState({activeItem: item});
	},

	render:function(){

		return (
			<div className="parent">
				<div className="list-container" >

					<table className="bordered highlight">
						<thead>
						<tr>
							<th data-field="id">Restaurant</th>
							<th data-field="name">Rating</th>
							<th data-field="price">Cuisine</th>
						</tr>
						</thead>
						<tbody>

					{this.props.items.map((item,index)=>{
						return (
							<RestaurantItem setActiveItem={this.setActiveItem} item={item} key={"item"+index} />
						)
					})}
						</tbody>
					</table>

				</div>

				<div className="details-container">
					<Details items={this.props.items }/>
				</div>
			</div>

		)
	}
});

module.exports = RestaurantItemList
