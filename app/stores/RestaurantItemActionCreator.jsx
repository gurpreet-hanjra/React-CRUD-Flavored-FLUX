var dispatcher = require("./../dispatcher.js");

module.exports = {
	add:function(item){
		dispatcher.dispatch({
			type:"restaurant-item:add",
			payload:item
		})
	},
	update:function(item){
		dispatcher.dispatch({
			type:"restaurant-item:update",
			payload:item
		})
	},
	delete:function(item){
		dispatcher.dispatch({
			type:"restaurant-item:delete",
			payload:item
		});
	},
	details:function(item){
		dispatcher.dispatch({
			type:"restaurant-item:details",
			payload:item
		});
	}

};
