"use strict";

let React = require('react'),
	ReviewItem = require('./ReviewItem.jsx'),
	ReviewListAddItem = require('./ReviewListAddItem.jsx'),
	ReviewItemList;

ReviewItemList =  React.createClass({

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

	render:function(){

		return (
			<div className="parent">
				<div className="col s12">
					<h5>Reviews</h5>
					<div className="col s12 mar-bottom-20"><hr/></div>
				</div>
				<div>
					{this.props.items.reviews.map((item,index)=>{
						return (
							<ReviewItem setActiveItem={this.setActiveItem} item={item} key={"item"+index} />
						)
					})}

					<ReviewListAddItem />
				</div>
			</div>
		)
	}
});

module.exports = ReviewItemList;
