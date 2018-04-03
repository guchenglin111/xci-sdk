/**
 * @swagger
 * resourcePath: /xcare
 * description: XCI blockchain xcare API
 */
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlog.js');
const web3 = require('../lib/common/ethweb.js');
const VError = require('verror');
const Q = require('q');


module.exports = router;
