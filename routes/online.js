var mongodbdao = require('./../lib/mongodbdao.js').mongodbdao;
/*
 * GET online clients
 */


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
	mongodbdao.getOnlineClients(function(err, clients) {
		if(err != null) {
			res.json(500).send(err);
		}
		else {
			res.json(clients);
		}
	});
});

module.exports = router;

