/**
 * @swagger
 * resourcePath: /admin
 * description: XCI blockchain admin API
 */ 
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlog.js');
const web3 = require('../lib/common/ethweb.js');
const VError = require('verror');
const Q = require('q');

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.json({"key":"for test"});
});

/**
 * @swagger
 * path: /admin/unlockAccount/{address}/{passphrase}/{period}
 * operations:
 *   - httpMethod: GET
 *     nickname: unlockAccount
 *     summary: unlock account, then we can use this account to commit and authorize data
 *     parameters:
 *       - name: address
 *         paramType: path
 *         dataType: string
 *         description: XCI address
 *         required: true
 *       - name: passphrase
 *         paramType: path
 *         dataType: string
 *         description: account password
 *         required: true
 *       - name: period
 *         paramType: path
 *         dataType: int
 *         description: specify how long the account will be unlocked, unit is second.
 *         required: true
 */
router.get('/unlockAccount/:address/:passphrase/:period', function(req, res){
  let address = req.params.address;
  let passphrase = req.params.passphrase;
  let period = parseInt(req.params.period);
  return web3.unlockAccount(address,passphrase,period).then((result)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": result
          });
    });
});


/**
 * @swagger
 * path: /admin/getBlockNumber
 * operations:
 *   - httpMethod: GET
 *     nickname: getBlockNumber
 *     summary: get the block number of the blockchain
 */
router.get('/getBlockNumber', function(req, res){
  return web3.getBlockNumber().then((blockNumber)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": blockNumber
          });
    });
});

/**
 * @swagger
 * path: /admin/getBlock/{blocknumber}
 * operations:
 *   - httpMethod: GET
 *     nickname: getBlock
 *     summary: get detailed block info for specific block number
 *     parameters:
 *       - name: blockNumber
 *         paramType: path
 *         dataType: int
 *         description: block number
 *         required: true
 */
router.get('/getBlock/:blocknumber', function(req, res){
  let no = req.params.blocknumber;
  return web3.getBlock(no).then((block)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": block
          });
    });
});

/**
 * @swagger
 * path: /admin/getAccounts
 * operations:
 *   - httpMethod: GET
 *     nickname: getAccountsList
 *     summary: list all accounts
 */
router.get('/getAccounts', function(req, res){
  return web3.getAccounts().then((accounts)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": accounts
          });
    });
});

/**
 * @swagger
 * path: /admin/getTransaction/{txhash}
 * operations:
 *   - httpMethod: GET
 *     nickname: getTransaction
 *     summary: get detailed transaction info for specific txhash
 *     parameters:
 *       - name: txhash
 *         paramType: path
 *         dataType: string
 *         description: transaction hash
 *         required: true
 */
router.get('/getTransaction/:txhash', function(req, res){
  let txhash = req.params.txhash;
  return web3.getTransaction(txhash).then((tx)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": tx
          });
    });
});

module.exports = router;
