"use strict";

let React = require('react'),
	ReviewItemList = require('./ReviewItemList.jsx'),
	activeItem,
	Details;

Details = React.createClass({

	contextTypes: {
		activeItem: React.PropTypes.any
	},

	render:function(){
		//set active item to display //
		activeItem = this.context.activeItem;

		return (

			<div>
				<h5 className="primary-color">{activeItem.name}</h5>
				<div className="ellipsis">{activeItem.description}</div>
				<div>{activeItem.address}</div>
				<hr/>
				<ReviewItemList items={activeItem}/>
			</div>
		)
	}
});

module.exports = Details;
