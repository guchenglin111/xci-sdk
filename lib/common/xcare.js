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
    deferred.resolve(web3.xcare.DeletePreOwnerData(address,passphrase,did));
    return deferred.promise;
}

web3.transferDidOwner = (address,passphrase,did,to) => {
    logger.debug('trying to transfer did owner');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.TransferDidOwner(address,passphrase,did,to));
    return deferred.promise;
};

web3.authorizeXcdata = (address,passphrase,publicKey,did,index) => {
    logger.debug('trying to authorize data to other people');
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.AuthorizeXcdata(address,passphrase,publicKey,did,index));
    return deferred.promise;
};

web3.getXciDataLength = (did) => {
    logger.debug("trying to get xci data length for specific did")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.GetXciDataLength(did));
    return deferred.promise;
}

web3.getXciData = (address,passphrase,ipfsEndpoint,did,index) => {
    logger.debug("trying to get xci data")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.GetXciData(address,passphrase,ipfsEndpoint,did,index));
    return deferred.promise;
}

web3.getXciDataTimestamp = (did,index) => {
    logger.debug("trying to get xci data timestamp")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.GetXciDataTimestamp(did,index));
    return deferred.promise;
}

web3.getAutherizedDataLength = (address) => {
    logger.debug("trying to get xci data length")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.GetAutherizedDataLength(address));
    return deferred.promise;
}

web3.getAutherizedAESKeyByHash = (address,ipfsHash) => {
    logger.debug("trying to get AES key by ipfsHash")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.GetAutherizedAESKeyByHash(address,ipfsHash));
    return deferred.promise;
}

web3.getAutherizedData = (address,passphrase,ipfsEndpoint,ipfsHash) => {
    logger.debug("trying to get autherized data")
    var deferred = Q.defer();
    deferred.resolve(web3.xcare.GetAutherizedData(address,passphrase,ipfsEndpoint,ipfsHash));
    return deferred.promise;
}

module.exports = web3;

