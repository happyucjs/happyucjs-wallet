'use strict'

const inherits = require('util').inherits
const HookedWalletHucTxSubprovider = require('webu-provider-engine/subproviders/hooked-wallet-ethtx')

module.exports = WalletSubprovider

inherits(WalletSubprovider, HookedWalletHucTxSubprovider)

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
