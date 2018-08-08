const HDKey = require('hdkey')
const Wallet = require('./index.js')

function IrChainHDKey () {}

/*
 * Horrible wrapping.
 */
function fromHDKey (hdkey) {
  var ret = new IrChainHDKey()
  ret._hdkey = hdkey
  return ret
}

IrChainHDKey.fromMasterSeed = function (seedBuffer) {
  return fromHDKey(HDKey.fromMasterSeed(seedBuffer))
}

IrChainHDKey.fromExtendedKey = function (base58key) {
  return fromHDKey(HDKey.fromExtendedKey(base58key))
}

IrChainHDKey.prototype.privateExtendedKey = function () {
  if (!this._hdkey.privateExtendedKey) {
    throw new Error('This is a public key only wallet')
  }
  return this._hdkey.privateExtendedKey
}

IrChainHDKey.prototype.publicExtendedKey = function () {
  return this._hdkey.publicExtendedKey
}

IrChainHDKey.prototype.derivePath = function (path) {
  return fromHDKey(this._hdkey.derive(path))
}

IrChainHDKey.prototype.deriveChild = function (index) {
  return fromHDKey(this._hdkey.deriveChild(index))
}

IrChainHDKey.prototype.getWallet = function () {
  if (this._hdkey._privateKey) {
    return Wallet.fromPrivateKey(this._hdkey._privateKey)
  } else {
    return Wallet.fromPublicKey(this._hdkey._publicKey, true)
  }
}

module.exports = IrChainHDKey
