/**
 * used to configure web3
 * */
const config = require('config');
const ethereumConfig = config.get('app.ethereum');
const logger = require('./winstonlog.js');

const Q = require('q');
logger.debug('init ethereum.js');

var Web3 = require('xciweb3');
var web3 = new Web3();
const web3ProviderUrl = ethereumConfig.url;
logger.info('Web3 provider url', web3ProviderUrl);
web3.setProvider(new web3.providers.HttpProvider(web3ProviderUrl));

web3.commitXciData = (address,passphrase,ipfsEndpoint,did,data) => {
    logger.debug('trying to commit xci data');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.commitXciData(address,passphrase,ipfsEndpoint,did,data));
    return deferred.promise;
};

web3.commitNewOwnerData = (address,passphrase,ipfsEndpoint,did,data) => {
    logger.debug('trying to commmit new owner data');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.commitNewOwnerData(address,passphrase,ipfsEndpoint,did,data));
    return deferred.promise;
};

web3.deletePreOwnerData = (address,passphrase,did) => {
    logger.debug("trying to delete pre own xci data")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.deletePreOwnerData(address,passphrase,did));
    return deferred.promise;
}

web3.transferDidOwner = (address,passphrase,did,to) => {
    logger.debug('trying to transfer did owner');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.transferDidOwner(address,passphrase,did,to));
    return deferred.promise;
};

web3.authorizeXcdata = (address,passphrase,publicKey,did,index) => {
    logger.debug('trying to authorize data to other people');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.authorizeXcdata(address,passphrase,publicKey,did,index));
    return deferred.promise;
};

web3.getXciDataLength = (did) => {
    logger.debug("trying to get xci data length for specific did")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getXciDataLength(did));
    return deferred.promise;
}

web3.getXciData = (address,passphrase,ipfsEndpoint,did,index) => {
    logger.debug("trying to get xci data")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getXciData(address,passphrase,ipfsEndpoint,did,index));
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

web3.getAuthorizedData = (address,passphrase,ipfsEndpoint,ipfsHash) => {
    logger.debug("trying to get authorized data")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.getAuthorizedData(address,passphrase,ipfsEndpoint,ipfsHash));
    return deferred.promise;
}

logger.info("Init xcare finished");

module.exports = web3;

