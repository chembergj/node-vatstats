/// <reference path='../typings/express/express.d.ts' />

import express = require('express');
import mongodbdao = require('./../lib/Copy of mongodbdao');

/*
 * GET online clients
 */

var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
    mongodbdao.getOnlineClients2(function(err, clients) {
        if (err != null) {
            res.json(500).send(err);
        }
        else {
            res.json(clients);
        }
    });
});

export = router;

