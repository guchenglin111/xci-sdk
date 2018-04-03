'use strict';
const config = require('config');
const fs = require('fs');
const Q = require('q');
const logger = require('../lib/common/winstonlog.js');
const web3 = require('../lib/common/ethweb.js');
const util = require('../lib/common/util.js');

logger.info('web3 init-ed');

var walletapi = {};

walletapi.getBalance = (address) => {
    logger.debug('walletapi.getBalance: try to getBalance, address =', address);
    var deferred = Q.defer();
    deferred.resolve(web3.eth.getBalance(address));
    return deferred.promise;
};

walletapi.newAccount = (pwd) => {
    logger.debug('walletapi.newAccount: try to newAccount, pwd =', pwd);  
    var deferred = Q.defer();
    deferred.resolve(web3.personal.newAccount(pwd));
    return deferred.promise;
};

walletapi.importRawKey = (pri, pwd) => {
    logger.debug('walletapi.importRawKey: try to importRawKey');
    var deferred = Q.defer();
    deferred.resolve(web3.personal.importRawKey(pri, pwd));
    return deferred.promise;
};

walletapi.privateKeyToAccount = (pri) => {
    logger.debug('walletapi.privateKeyToAccount');
    if (pri[0] != '0' || pri[1] != 'x') {
    	pri = '0x' + pri;
    }
    var deferred = Q.defer();
    deferred.resolve(web3.eth.accounts.privateKeyToAccount(pri)['address'])
    return deferred.promise;
};

logger.info('walletapi finished loading');

module.exports = walletapi;
