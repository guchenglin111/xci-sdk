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

/**
 *  @swagger
 *  models:
 *    CommitXciDataRequest:
 *      id: CommitXciDataRequest
 *      properties:
 *        address:
 *          type: string
 *        passphrase:
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
  let passphrase = req.body.passphrase;
  let ipfsEndpoint = req.body.ipfsEndpoint;
  let did = req.body.did;
  let data = req.body.data;
  return web3.commitXciData(address,passphrase,ipfsEndpoint,did,data).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
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
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: CommitXciDataRequest
 *         description: 
 *         required: true
 */
router.post('/commitNewOwnerData', function(req, res){
  let address = req.body.address;
  let passphrase = req.body.passphrase;
  let ipfsEndpoint = req.body.ipfsEndpoint;
  let did = req.body.did;
  let data = req.body.data;
  return web3.commitNewOwnerData(address,passphrase,ipfsEndpoint,did,data).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
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
 *        passphrase:
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
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: DeleteXciDataRequest
 *         description: 
 *         required: true
 */
router.post('/deletePreOwnerData', function(req, res){
  let address = req.body.address;
  let passphrase = req.body.passphrase;
  let did = req.body.did;
  return web3.deletePreOwnerData(address,passphrase,did).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
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
 *        passphrase:
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
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: TransferDidOwnerRequest
 *         description: 
 *         required: true
 */
router.post('/transferDidOwner', function(req, res){
  let address = req.body.address;
  let passphrase = req.body.passphrase;
  let did = req.body.did;
  let to = req.body.to;
  return web3.transferDidOwner(address,passphrase,did,to).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
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
 *        passphrase:
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
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: AuthorizeXcdataRequest
 *         description: 
 *         required: true
 */
router.post('/authorizeXcdata', function(req, res){
  let address = req.body.address;
  let passphrase = req.body.passphrase;
  let publicKey = req.body.publicKey;
  let did = req.body.did;
  let to = req.body.index;
  return web3.authorizeXcdata(address,passphrase,publicKey,did,index).then((txhash)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": txhash
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
 *        passphrase:
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
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: GetXciDataRequest
 *         description: 
 *         required: true
 */
router.post('/getXciData', function(req, res){
  let address = req.body.address;
  let passphrase = req.body.passphrase;
  let ipfsEndpoint = req.body.ipfsEndpoint;
  let did = req.body.did;
  let index = req.body.index;
  return web3.getXciData(address,passphrase,ipfsEndpoint,did,index).then((data)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": data
          });
    });
});

/**
 * @swagger
 * path: /xcare/getXciDataTimestamp
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
    });
});

/**
 * @swagger
 * path: /xcare/getAutherizedDataLength/{address}
 * operations:
 *   - httpMethod: GET
 *     nickname: getAutherizedDataLength
 *     summary: get xci data length
 *     parameters:
 *       - name: address
 *         paramType: path
 *         dataType: string
 *         description: 
 *         required: true
 */
router.get('/getAutherizedDataLength/:address', function(req, res){
  let address= req.params.address;
  return web3.getAutherizedDataLength(address).then((length)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": length
          });
    });
});

/**
 * @swagger
 * path: /xcare/getAutherizedAESKeyByHash/{address}/{ipfsHash}
 * operations:
 *   - httpMethod: GET
 *     nickname: getAutherizedAESKeyByHash
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
router.get('/getAutherizedAESKeyByHash/:address/:ipfsHash', function(req, res){
  let address = req.params.address;
  let ipfsHash = req.params.ipfsHash;
  return web3.getAutherizedAESKeyByHash(address,ipfsHash).then((key)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": key
          });
    });
});

/**
 *  @swagger
 *  models:
 *    GetAutherizedDataRequest:
 *      id: GetAutherizedDataRequest
 *      properties:
 *        address:
 *          type: string
 *        passphrase:
 *          type: string
 *        ipfsEndpoint:
 *          type: string
 *        ipfsHash:
 *          type: string
 */

/**
 * @swagger
 * path: /xcare/getAutherizedData
 * operations:
 *   - httpMethod: POST
 *     nickname: getAutherizedData
 *     summary: get autherized data
 *     parameters:
 *       - name: args
 *         paramType: body
 *         dataType: GetAutherizedDataRequest
 *         description: 
 *         required: true
 */
router.post('/getAutherizedData', function(req, res){
  let address = req.body.address;
  let passphrase = req.body.passphrase;
  let ipfsEndpoint = req.body.ipfsEndpoint;
  let ipfsHash= req.body.ipfsHash;
  return web3.getAutherizedData(address,passphrase,ipfsEndpoint,ipfsHash).then((data)=>{
        res.json({
              "result": "success",
              "errorMsg": null,
              "errorCode": null,
              "content": data
          });
    });
});

module.exports = router;
