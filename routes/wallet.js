/**
 * @swagger
 * resourcePath: /wallet
 * description: Wallet API
 */ 
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlog.js');
const walletapi = require('../lib/walletapi.js');
const wif = require('../lib/common/wif.js');
const bip = require('../lib/common/bip.js');
const VError = require('verror');
const Q = require('q');
//const cache = require('memory-cache');
const dao = require('../dao/accountDAO.js')

/**
 * @swagger
 * path: /wallet/getBalance/{address}
 * operations:
 *   - httpMethod: GET
 *     nickname: getBalance
 *     summary: get balance of specific address
 *     parameters:
 *       - name: address
 *         paramType: path
 *         dataType: string
 *         description: XCI address
 *         required: true
 */
router.get('/getBalance/:address', function(req, res){
  let address = req.params.address;

  return walletapi.getBalance(address).then((balance)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": balance
          });
    });
});

/**
 * @swagger
 * path: /wallet/newAccount/{password}
 * operations:
 *   - httpMethod: GET
 *     nickname: newAccount
 *     summary: create new account
 *     parameters:
 *       - name: password
 *         paramType: path
 *         dataType: string
 *         description: keystore password
 *         required: true
 */
router.get('/newAccount/:password', function(req, res){
  let pwd = req.params.password;

  return walletapi.newAccount(pwd).then((address)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": address
          });
    });
});

/**
 * @swagger
 * path: /wallet/encodePriKey/{privateKey}/{token}
 * operations:
 *   - httpMethod: GET
 *     nickname: encodePriKey
 *     summary: encode private key
 *     parameters:
 *       - name: privateKey
 *         paramType: path
 *         dataType: string
 *         description: private key hex string
 *         required: true
 *       - name: token
 *         paramType: path
 *         dataType: string
 *         description: token type, such as BTC, ETH, QTUM
 *         required: true
 */
router.get('/encodePriKey/:privateKey/:token', function(req, res){
    let privateKey = req.params.privateKey;
    let token = req.params.token;
    var encodePriKey = wif.encodePriKey(privateKey, token);

	res.json({
	      "result": "success",
	      "errorMsg": null,
	      "errorCode": null,
	      "content": encodePriKey
	});
});

/**
 * @swagger
 * path: /wallet/importRawKey
 * operations:
 *   - httpMethod: POST
 *     nickname: importRawKey
 *     summary: 
 *     parameters:
 *       - name: args
 *         paramType: body 
 *         dataType: accountDAO
 *         description: account private key and password
 *         required: true
 */
router.post('/importRawKey', function(req, res){
  let pri = req.body.pri;
  let pwd = req.body.pwd;

  return walletapi.importRawKey(pri, pwd).then((address)=>{
  		  //cache.put(pri, address);
        return dao.add(pri, address);
    }).then((result)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": result
          });
    }).catch((error) => {
       res.json({
              "result": "failed",
              "errorMsg": error.message,
              "errorCode": null,
              "content": null
          });
     });
});


router.get('/getAddress/:pri', function(req, res){
  let pri = req.params.pri;

  return dao.query(pri).then((address)=>{
    res.json({
      "result": "success",
      "errorMsg": null,
      "errorCode": null,
      "content": address
    });
  }).catch((error) => {
     res.json({
            "result": "failed",
            "errorMsg": error.message,
            "errorCode": null,
            "content": null
        });
   });
});

router.get('/privateKeyToAccount/:pri', function(req, res){
  let pri = req.params.pri;

	res.json({
	  "result": "success",
	  "errorMsg": null,
	  "errorCode": null,
	  "content": walletapi.privateKeyToAccount(pri)
	});
});

router.get('/entropyToMnemonic/:privateKey', function(req, res){
    let privateKey = req.params.privateKey;
    var mnemonic = bip.getMnemonic(privateKey);

	res.json({
	      "result": "success",
	      "errorMsg": null,
	      "errorCode": null,
	      "content": mnemonic
	});
});

router.get('/mnemonicToEntropy/:mnemonic', function(req, res){
    let mnemonic = req.params.mnemonic;
    var privateKey = bip.getEntropy(mnemonic);

	res.json({
	      "result": "success",
	      "errorMsg": null,
	      "errorCode": null,
	      "content": privateKey
	});
});

module.exports = router;
