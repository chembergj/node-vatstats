/// <reference path='../typings/express/express.d.ts' />

import express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'vatstat-api' });
});

export = router;
