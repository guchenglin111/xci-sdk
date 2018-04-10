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
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.commitXciData(address,ipfsEndpoint,did,data));
    return deferred.promise;
};

web3.commitNewOwnerData = (address,ipfsEndpoint,did,data) => {
    logger.debug('trying to commmit new owner data');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.commitNewOwnerData(address,ipfsEndpoint,did,data));
    return deferred.promise;
};

web3.deletePreOwnerData = (address,did) => {
    logger.debug("trying to delete pre own xci data")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.deletePreOwnerData(address,did));
    return deferred.promise;
}

web3.transferDidOwner = (address,did,to) => {
    logger.debug('trying to transfer did owner');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.transferDidOwner(address,did,to));
    return deferred.promise;
};

web3.authorizeXcdata = (address,publicKey,did,index) => {
    logger.debug('trying to authorize data to other people');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.authorizeXcdata(address,publicKey,did,index));
    return deferred.promise;
};

web3.getXciDataLength = (did) => {
    logger.debug("trying to get xci data length for specific did")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getXciDataLength(did));
    return deferred.promise;
}

web3.getXciData = (address,ipfsEndpoint,did,index) => {
    logger.debug("trying to get xci data")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getXciData(address,ipfsEndpoint,did,index));
    return deferred.promise;
}

web3.getXciDataTimestamp = (did,index) => {
    logger.debug("trying to get xci data timestamp")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getXciDataTimestamp(did,index));
    return deferred.promise;
}

web3.getAuthorizedDataLength = (address) => {
    logger.debug("trying to get xci data length")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getAuthorizedDataLength(address));
    return deferred.promise;
}

web3.getAuthorizedAESKeyByHash = (address,ipfsHash) => {
    logger.debug("trying to get AES key by ipfsHash")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getAuthorizedAESKeyByHash(address,ipfsHash));
    return deferred.promise;
}

web3.getAuthorizedData = (address,ipfsEndpoint,ipfsHash) => {
    logger.debug("trying to get authorized data")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getAuthorizedData(address,ipfsEndpoint,ipfsHash));
    return deferred.promise;
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

