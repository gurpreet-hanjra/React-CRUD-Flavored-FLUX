let groceryAction = require("./../stores/RestaurantItemActionCreator.jsx"),
	React = require('react'),
	$ = require('jquery'),
	Utils = require('./../utils/Utils.js'),
	ReviewItem;

ReviewItem = React.createClass({

	// delete the selected item //
	delete:function(e){
		e.preventDefault();
		groceryAction.delete(this.props.item);
	},

	// update the item with data //
	update: function (e) {

		this.toggleEditables(e.target, false);
		this.props.item.stars = $(e.target).closest('.review-item').find('.stars_elem').text();
		this.props.item.text = $(e.target).closest('.review-item').find('.text_elem').text();

		// perform action update //
		groceryAction.update(this.props.item);
	},

	// toggle buttons //
	toggleEditables: function (e, bool) {

		$(e).closest('.review-item').find('.edit_enable')
			.prop('contenteditable',bool)
			.toggleClass('editable');

		// set focus of first input element
		$(e).closest('.review-item').find('.edit_enable')[0].focus();

		$(e).closest('.review-item').find('.update_btn').toggleClass('hide');
		$(e).closest('.review-item').find('.edit_btn').toggleClass('hide');

	},

	// edit //
	edit:function(e){
		this.toggleEditables(e.target, true);
	},

	render:function(){

		return (

			<div className="review-item row">
				<div className="col s8 user primary-color">{this.props.item.username}</div>
				<div className="col s2">
					<a className="btn waves-effect waves-light edit_btn" onClick={this.edit}>
						<i className="tiny material-icons">edit</i>
					</a>
					<a  className="btn waves-effect waves-light update_btn hide" onClick={this.update}>
						<i className="tiny material-icons">save</i>
					</a>
				</div>
				<div className="col s2">
					<a className="btn waves-effect waves-light red" onClick={this.delete}>
						<i className="tiny material-icons">delete</i>
					</a>
				</div>
				<div className="stars_elem edit_enable col s12">
					<b>{this.props.item.stars}</b>
				</div>
				<div className="text_elem edit_enable col s12">
					{this.props.item.text}
				</div>
				<div className="col s12">
					<hr className="hr-review-list" />
				</div>
			 </div>
		)
	}
});


module.exports = ReviewItem;


