'use strict'

const inherits = require('util').inherits
const HookedWalletIrcTxSubprovider = require('webu-provider-engine/subproviders/hooked-wallet-irctx')

module.exports = WalletSubprovider

inherits(WalletSubprovider, HookedWalletIrcTxSubprovider)

function WalletSubprovider (wallet, opts) {
  opts.getAccounts = function (cb) {
    cb(null, [ wallet.getAddressString() ])
  }

  opts.getPrivateKey = function (address, cb) {
    if (address !== wallet.getAddressString()) {
      cb(new Error('Account not found'))
    } else {
      cb(null, wallet.getPrivateKey())
    }
  }

  WalletSubprovider.super_.call(this, opts)
}
