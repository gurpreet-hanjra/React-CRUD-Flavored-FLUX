let listeners = {},
	guid = require('guid'),
    dispatcher;

dispatcher = {
	register(callback){
		let id = guid.raw();
		listeners[id] = callback;
		return id;
	},

	dispatch(payload){
		console.info('Dispatching...',payload.type);
		for (let id in listeners){
			var listener = listeners[id];
			listener(payload);
		}
	}
};
module.exports = dispatcher;
