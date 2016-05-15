let React = require('react'),
	$ = require('jquery'),
	groceryAction = require("./../stores/RestaurantItemActionCreator.jsx"),
	Utils = require('./../utils/Utils.js'),
	ReviewListAddItem;

ReviewListAddItem = React.createClass({

	addItem:function(e){
		e.preventDefault();

		let reviewTextElem = $('#reviewAddForm #reviewText'),
			reviewStarsElem = $('#reviewAddForm #reviewStars');

		// perform add action //
		groceryAction.add({
			date: (new Date()).toString(),
			text: reviewTextElem.val(),
			stars: Number(reviewStarsElem.val()),
			restaurant: this.context.activeItem._id,
			user: Utils.getDefaultUser().id
		});

		// clear out the fields //
		reviewTextElem.val('');
		reviewStarsElem.val('');
	},

	contextTypes: {
		activeItem: React.PropTypes.any
	},

	render:function(){

		return (
		 <div className="review-addItem mar-bottom-20">
			<form id="reviewAddForm" onSubmit={this.addItem}>
					<input
						name="reviewStars"
						id="reviewStars"
						type="number"
						min="1"
						max="5"
						required
					/>
					<input
						name="reviewText"
						id="reviewText"
						type="text"
						required
						/>
				<button className="btn waves-effect waves-light fl-right">Add Review</button>
			</form>
			</div>
		)
	}

});

module.exports = ReviewListAddItem;
