/**
 * used to configure web3
 * */
const config = require('config');
const logger = require('./winstonlog.js');

const Q = require('q');
logger.debug('init xcare API');
//This module is based on ethweb.js
var web3 = require('./ethweb.js');
//ABI of native contract xcdata
const xcDataAbi = config.get('app.xcdataContractAbi');
//Address of native contract xcdata
const xcDataContractAddress = config.get('app.xcdataContractAddress');

web3.commitXciData = (address,ipfsEndpoint,did,data) => {
    logger.debug('trying to commit xci data');
    let qCommit = Q.nbind(web3.xcare.commitXciData);
    return qCommit(address,ipfsEndpoint,did,data);
};

web3.commitNewOwnerData = (address,ipfsEndpoint,did,data) => {
    logger.debug('trying to commmit new owner data');
    let qCommitNew = Q.nbind(web3.xcare.commitNewOwnerData);
    return qCommitNew(address,ipfsEndpoint,did,data);
};

web3.deletePreOwnerData = (address,did) => {
    logger.debug("trying to delete pre own xci data")
    let qDelete = Q.nbind(web3.xcare.deletePreOwnerData);
    return qDelete(address,did);
}

web3.transferDidOwner = (address,did,to) => {
    logger.debug('trying to transfer did owner');
    let qTransfer = Q.nbind(web3.xcare.transferDidOwner);
    return qTransfer(address,did,to);
};

web3.authorizeXcdata = (address,publicKey,did,index) => {
    logger.debug('trying to authorize data to other people');
    let qAuthorize = Q.nbind(web3.xcare.authorizeXcdata);
    return qAuthorize(address,publicKey,did,index);
};

web3.getXciDataLength = (did) => {
    logger.debug("trying to get xci data length for specific did")
    let qGetXciDataLength = Q.nbind(web3.xcare.getXciDataLength);
    return qGetXciDataLength(did);
}

web3.getXciData = (address,ipfsEndpoint,did,index) => {
    logger.debug("trying to get xci data")
    let qGetXciData = Q.nbind(web3.xcare.getXciData);
    return qGetXciData(address,ipfsEndpoint,did,index);
}

web3.getXciDataTimestamp = (did,index) => {
    logger.debug("trying to get xci data timestamp")
    let qGetXciDataTimestamp = Q.nbind(web3.xcare.getXciDataTimestamp);
    return qGetXciDataTimestamp(did,index);
}

web3.getAuthorizedDataLength = (address) => {
    logger.debug("trying to get xci data length")
    let qGetAuthorizedDataLength = Q.nbind(web3.xcare.getAuthorizedDataLength);
    return qGetAuthorizedDataLength(address);
}

web3.getAuthorizedAESKeyByHash = (address,ipfsHash) => {
    logger.debug("trying to get AES key by ipfsHash")
    let qGetAuthorizedAESKeyByHash = Q.nbind(web3.xcare.getAuthorizedAESKeyByHash);
    return qGetAuthorizedAESKeyByHash(address,ipfsHash);
}

web3.getAuthorizedData = (address,ipfsEndpoint,ipfsHash) => {
    logger.debug("trying to get authorized data")
    let qGetAuthorizedData = Q.nbind(web3.xcare.getAuthorizedData);
    return qGetAuthorizedData(address,ipfsEndpoint,ipfsHash);
}
//get authorize event
web3.getXcdataAuthorizeEvent = (fromBlockNumber,toBlockNumber,to) => {
   logger.debug("trying to get authorize event")
   var deferred = Q.defer();
   var xcDataContract = web3.eth.contract(xcDataAbi);
   var contract = xcDataContract.at(xcDataContractAddress);

   var authorizeEvent = contract.Authorize({to:to},{fromBlock: fromBlockNumber, toBlock: toBlockNumber});
   var myResults = authorizeEvent.get(function(error, logs) {
                 if (!error) {
                   deferred.resolve(logs);
                 } else {
                   deferred.resolve("Encounter error: "+error)
                 }
              });
   return deferred.promise;
}
//get commitNewData event
web3.getXcdataCommitEvent = (fromBlockNumber,toBlockNumber,from) => {
   logger.debug("trying to get commit event")
   var deferred = Q.defer();
   var xcDataContract = web3.eth.contract(xcDataAbi);
   var contract = xcDataContract.at(xcDataContractAddress);

   var commitEvent = contract.NewCommitData({from:from},{fromBlock: fromBlockNumber, toBlock: toBlockNumber});
   var myResults = commitEvent.get(function(error, logs) {
                 if (!error) {
                   deferred.resolve(logs);
                 } else {
                   deferred.resolve("Encounter error: "+error)
                 }
              });
   return deferred.promise;
}

logger.info("Init xcare finished");

module.exports = web3;

