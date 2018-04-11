/**
 * @swagger
 * resourcePath: /xcare
 * description: XCI blockchain xcare API
 */
var express = require('express');
var router = express.Router();
var logger = require('../lib/common/winstonlog.js');
const web3 = require('../lib/common/xcare.js');
const VError = require('verror');
const Q = require('q');
//const toInt = ((n)=> typeof n === 'number'? n : parseInt(n));
/**
 *  @swagger
 *  models:
 *    CommitXciDataRequest:
 *      id: CommitXciDataRequest
 *      properties:
 *        address:
 *          type: string
 *        ipfsEndpoint:
 *          type: string
 *        did:
 *          type: string
 *        data:
 *          type: string
 */

/**
 * @swagger
 * path: /xcare/commitXciData
 * operations:
 *   - httpMethod: POST
 *     nickname: commitXciData
 *     summary: commit xci data
 *     notes: parameter example 
 *                      {
 *                              "address":"0x6b5feec1fe9498347c9175998807a51292e8c29b",
 *                              "ipfsEndpoint":"127.0.0.1:50001:51094:2:3",
 *                              "did":"did-123456",
 *                              "data":"MTIzNDU2Nw=="
 *                      }
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: CommitXciDataRequest
 *         schema: CommitXciDataRequest
 *         description: 
 *         required: true
 */
router.post('/commitXciData', function(req, res){
  let address = req.body.address;
  let ipfsEndpoint = req.body.ipfsEndpoint;
  let did = req.body.did;
  let data = req.body.data;
  return web3.commitXciData(address,ipfsEndpoint,did,data).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
          });
    }).fail((err)=>{
        console.log(VError.info(err).errno);
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 * @swagger
 * path: /xcare/commitNewOwnerData
 * operations:
 *   - httpMethod: POST
 *     nickname: commitNewOwnerData
 *     summary: commmit new owner data
 *     notes: parameter example
 *                      {
 *                              "address":"0x6b5feec1fe9498347c9175998807a51292e8c29b",
 *                              "ipfsEndpoint":"127.0.0.1:50001:51094:2:3",
 *                              "did":"did-123456",
 *                              "data":"MTIzNDU2Nw=="
 *                      }
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: CommitXciDataRequest
 *         description: 
 *         required: true
 */
router.post('/commitNewOwnerData', function(req, res){
  let address = req.body.address;
  let ipfsEndpoint = req.body.ipfsEndpoint;
  let did = req.body.did;
  let data = req.body.data;
  return web3.commitNewOwnerData(address,ipfsEndpoint,did,data).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 *  @swagger
 *  models:
 *    DeleteXciDataRequest:
 *      id: DeleteXciDataRequest
 *      properties:
 *        address:
 *          type: string
 *        did:
 *          type: string
 */

/**
 * @swagger
 * path: /xcare/deletePreOwnerData
 * operations:
 *   - httpMethod: POST
 *     nickname: deletePreOwnerData
 *     summary: delete pre own xci data
 *     notes: parameter example
 *                      {
 *                              "address":"0x6b5feec1fe9498347c9175998807a51292e8c29b",
 *                              "did":"did-123456"
 *                      }
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: DeleteXciDataRequest
 *         description: 
 *         required: true
 */
router.post('/deletePreOwnerData', function(req, res){
  let address = req.body.address;
  let did = req.body.did;
  return web3.deletePreOwnerData(address,did).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 *  @swagger
 *  models:
 *    TransferDidOwnerRequest:
 *      id: TransferDidOwnerRequest
 *      properties:
 *        address:
 *          type: string
 *        did:
 *          type: string
 *        to:
 *          type: string
 */

/**
 * @swagger
 * path: /xcare/transferDidOwner
 * operations:
 *   - httpMethod: POST
 *     nickname: transferDidOwner
 *     summary: transfer did owner
 *     notes: parameter example
 *                      {
 *                              "address":"0x6b5feec1fe9498347c9175998807a51292e8c29b",
 *                              "did":"did-123456",
 *                              "to":"0x4f95b208a08ed2eae8f5124664dc170308521d5e"
 *                      }
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: TransferDidOwnerRequest
 *         description: 
 *         required: true
 */
router.post('/transferDidOwner', function(req, res){
  let address = req.body.address;
  let did = req.body.did;
  let to = req.body.to;
  return web3.transferDidOwner(address,did,to).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 *  @swagger
 *  models:
 *    AuthorizeXcdataRequest:
 *      id: AuthorizeXcdataRequest
 *      properties:
 *        address:
 *          type: string
 *        publicKey:
 *          type: string
 *        did:
 *          type: string
 *        index:
 *          type: int
 */

/**
 * @swagger
 * path: /xcare/authorizeXcdata
 * operations:
 *   - httpMethod: POST
 *     nickname: authorizeXcdata
 *     summary: authorize data to other people
 *     notes: parameter example
 *                      {
 *                              "address":"0x6b5feec1fe9498347c9175998807a51292e8c29b",
 *                              "publicKey":"046c0ddb39d1a298f15544ab3c2437cd9f514e07fa1a41cf4b39f723c82ed6905921073d5524c50483bf4d1ed544203e74f1b9a6d121a3879486c6d64c35d568dc",
 *                              "did":"did-123456",
 *                              "index":0
 *                      }
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: AuthorizeXcdataRequest
 *         description: 
 *         required: true
 */
router.post('/authorizeXcdata', function(req, res){
  let address = req.body.address;
  let publicKey = req.body.publicKey;
  let did = req.body.did;
  let index = req.body.index;
  return web3.authorizeXcdata(address,publicKey,did,index).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 * @swagger
 * path: /xcare/getXciDataLength/{did}
 * operations:
 *   - httpMethod: GET
 *     nickname: getXciDataLength
 *     summary: get xci data length for the specific did
 *     parameters:
 *       - name: did
 *         paramType: path
 *         dataType: string
 *         description: 
 *         required: true
 */
router.get('/getXciDataLength/:did', function(req, res){
  let did = req.params.did;
  return web3.getXciDataLength(did).then((length)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": length
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 *  @swagger
 *  models:
 *    GetXciDataRequest:
 *      id: GetXciDataRequest
 *      properties:
 *        address:
 *          type: string
 *        ipfsEndpoint:
 *          type: string
 *        did:
 *          type: string
 *        index:
 *          type: int
 */

/**
 * @swagger
 * path: /xcare/getXciData
 * operations:
 *   - httpMethod: POST
 *     nickname: getXciData
 *     summary: get xci data
 *     notes: parameter example
 *                      {
 *                              "address":"0x6b5feec1fe9498347c9175998807a51292e8c29b",
 *                              "ipfsEndpoint":"127.0.0.1:50001",
 *                              "did":"did-123456",
 *                              "index":0
 *                      }
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: GetXciDataRequest
 *         description: 
 *         required: true
 */
router.post('/getXciData', function(req, res){
  let address = req.body.address;
  let ipfsEndpoint = req.body.ipfsEndpoint;
  let did = req.body.did;
  let index = req.body.index;
  return web3.getXciData(address,ipfsEndpoint,did,index).then((data)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": data
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 * @swagger
 * path: /xcare/getXciDataTimestamp/{did}/{index}
 * operations:
 *   - httpMethod: GET
 *     nickname: getXciDataTimestamp
 *     summary: get xci data timestamp
 *     parameters:
 *       - name: did
 *         paramType: path
 *         dataType: string
 *         description: 
 *         required: true
 *       - name: index
 *         paramType: path
 *         dataType: int
 *         description: 
 *         required: true
 */
router.get('/getXciDataTimestamp/:did/:index', function(req, res){
  let did = req.params.did;
  let index = req.params.index;
  return web3.getXciDataTimestamp(did,index).then((data)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": data
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 * @swagger
 * path: /xcare/getAuthorizedDataLength/{address}
 * operations:
 *   - httpMethod: GET
 *     nickname: getAuthorizedDataLength
 *     summary: get xci data length
 *     parameters:
 *       - name: address
 *         paramType: path
 *         dataType: string
 *         description: 
 *         required: true
 */
router.get('/getAuthorizedDataLength/:address', function(req, res){
  let address= req.params.address;
  return web3.getAuthorizedDataLength(address).then((length)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": length
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 * @swagger
 * path: /xcare/getAuthorizedAESKeyByHash/{address}/{ipfsHash}
 * operations:
 *   - httpMethod: GET
 *     nickname: getAuthorizedAESKeyByHash
 *     summary: get AES key by ipfsHash
 *     parameters:
 *       - name: address
 *         paramType: path
 *         dataType: string
 *         description: 
 *         required: true
 *       - name: ipfsHash
 *         paramType: path
 *         dataType: string
 *         description: 
 *         required: true
 */
router.get('/getAuthorizedAESKeyByHash/:address/:ipfsHash', function(req, res){
  let address = req.params.address;
  let ipfsHash = req.params.ipfsHash;
  return web3.getAuthorizedAESKeyByHash(address,ipfsHash).then((key)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": key
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 *  @swagger
 *  models:
 *    GetAuthorizedDataRequest:
 *      id: GetAuthorizedDataRequest
 *      properties:
 *        address:
 *          type: string
 *        ipfsEndpoint:
 *          type: string
 *        ipfsHash:
 *          type: string
 */

/**
 * @swagger
 * path: /xcare/getAuthorizedData
 * operations:
 *   - httpMethod: POST
 *     nickname: getAuthorizedData
 *     summary: get authorized data
 *     notes: parameter example
 *                      {
 *                              "address":"0x02f6b9afc3bac1d0a2bbdfc4c43f2dc863973288",
 *                              "ipfsEndpoint":"127.0.0.1:50001",
 *                              "ipfsHash":"QmRArwgbVvoEJdfATmCcBXLGMoR8SK4s7a44KTZsyQ3N5m"
 *                      }
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: GetAuthorizedDataRequest
 *         description: 
 *         required: true
 */
router.post('/getAuthorizedData', function(req, res){
  let address = req.body.address;
  let ipfsEndpoint = req.body.ipfsEndpoint;
  let ipfsHash= req.body.ipfsHash;
  return web3.getAuthorizedData(address,ipfsEndpoint,ipfsHash).then((data)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": data
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 * @swagger
 * path: /xcare/getAuthorizeEvent/{to}/{fromBlockNumber}/{toBlockNumber}
 * operations:
 *   - httpMethod: GET
 *     nickname: getAuthorizeEvent
 *     summary: get xci data length
 *     parameters:
 *       - name: to
 *         paramType: path
 *         dataType: string
 *         description:
 *         required: true
 *       - name: fromBlockNumber
 *         paramType: path
 *         dataType: int
 *         description:
 *         required: true
 *       - name: toBlockNumber
 *         paramType: path
 *         dataType: int
 *         description:
 *         required: true

 */
router.get('/getAuthorizeEvent/:to/:fromBlockNumber/:toBlockNumber', function(req, res){
  let to= req.params.to;
  let fromBlockNumber = req.params.fromBlockNumber;
  let toBlockNumber = req.params.toBlockNumber
  return web3.getXcdataAuthorizeEvent(fromBlockNumber,toBlockNumber,to).then((eventList)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": eventList
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});

/**
 * @swagger
 * path: /xcare/getCommitEvent/{from}/{fromBlockNumber}/{toBlockNumber}
 * operations:
 *   - httpMethod: GET
 *     nickname: getCommitEvent
 *     summary: get xci data length
 *     parameters:
 *       - name: from
 *         paramType: path
 *         dataType: string
 *         description:
 *         required: true
 *       - name: fromBlockNumber
 *         paramType: path
 *         dataType: int
 *         description:
 *         required: true
 *       - name: toBlockNumber
 *         paramType: path
 *         dataType: int
 *         description:
 *         required: true

 */
router.get('/getCommitEvent/:from/:fromBlockNumber/:toBlockNumber', function(req, res){
  let from= req.params.from;
  let fromBlockNumber = req.params.fromBlockNumber;
  let toBlockNumber = req.params.toBlockNumber
  return web3.getXcdataCommitEvent(fromBlockNumber,toBlockNumber,from).then((eventList)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": eventList
          });
    }).fail((err)=>{
        res.json({
              "result": "failed",
              "errorMsg": err.message,
              "errorCode": VError.info(err).errno
          });
    });
});


module.exports = router;
