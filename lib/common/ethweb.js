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
//set web3 provider
web3.setProvider(new web3.providers.HttpProvider(web3ProviderUrl));

web3.getBlockNumber = () => {
    logger.debug('trying to get block number');
    var deferred = Q.defer();
    deferred.resolve(web3.eth.blockNumber);
    return deferred.promise;
};

web3.getBlock = (blocknumber) => {
    logger.debug('trying to get block');
    var deferred = Q.defer();
    deferred.resolve(web3.eth.getBlock(blocknumber));
    return deferred.promise;
};

web3.getAccounts = () => {
    logger.debug('trying to get accounts');
    var deferred = Q.defer();
    deferred.resolve(web3.eth.accounts);
    return deferred.promise;
};

web3.getTransaction = (txhash) => {
    logger.debug('trying to get transaction');
    var deferred = Q.defer();
    deferred.resolve(web3.eth.getTransaction(txhash));
    return deferred.promise;
};

web3.unlockAccount = (address,passphrase) => {
    logger.debug('trying to unlock account');
    var deferred = Q.defer();
    deferred.resolve(web3.personal.unlockAccount(address,passphrase));
    return deferred.promise;
};

module.exports = web3;

