/**
 * Handle Routes for Tumblr interaction
 * @author Dylan Harness 2014
 *
 * @param app express application
 * @param {AbstractChannelHandler} handler handler for processing third-party channel requests
 */
module.exports = function(app, handler) {

	app.post('/tumblr/post', function(req, res) {
		console.log('Here')
		res.send('200, ok')
	});
}