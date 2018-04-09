/**
 * used to configure web3
 * */
const config = require('config');
const logger = require('./winstonlog.js');

const Q = require('q');
logger.debug('init ethereum.js');

var web3 = require('./ethweb.js');

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

var xcDataAbi = [{"constant":false,"inputs":[{"name":"did","type":"string"},{"name":"datahash","type":"string"},{"name":"encryptedAESKey","type":"bytes"}],"name":"commitNewOwnerData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getAuthorizedDataLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"did","type":"string"},{"name":"index","type":"uint256"}],"name":"getData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"datahash","type":"string"}],"name":"getAuthorizedAESKeyByHash","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"did","type":"string"}],"name":"deletePreOwnerData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"did","type":"string"},{"name":"datahash","type":"string"},{"name":"encryptedAESKey","type":"bytes"}],"name":"commitData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"did","type":"string"},{"name":"index","type":"uint256"},{"name":"encryptedAESKey","type":"bytes"}],"name":"authorizeData","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"did","type":"string"},{"name":"to","type":"address"}],"name":"transferDidOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"did","type":"string"}],"name":"getDataLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"did","type":"string"},{"indexed":false,"name":"datahash","type":"string"}],"name":"NewCommitData","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"datahash","type":"string"}],"name":"Authorize","type":"event"}];

var xcDataContractAddress = "0x2d06568d53bb8fb5d26057b1c706fc38afdab06e";

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

