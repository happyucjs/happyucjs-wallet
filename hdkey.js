const HDKey = require('hdkey')
const Wallet = require('./index.js')

function HappyUCHDKey () {
}

/*
 * Horrible wrapping.
 */
function fromHDKey (hdkey) {
  var ret = new HappyUCHDKey()
  ret._hdkey = hdkey
  return ret
}

HappyUCHDKey.fromMasterSeed = function (seedBuffer) {
  return fromHDKey(HDKey.fromMasterSeed(seedBuffer))
}

HappyUCHDKey.fromExtendedKey = function (base58key) {
  return fromHDKey(HDKey.fromExtendedKey(base58key))
}

HappyUCHDKey.prototype.privateExtendedKey = function () {
  if (!this._hdkey.privateExtendedKey) {
    throw new Error('This is a public key only wallet')
  }
  return this._hdkey.privateExtendedKey
}

HappyUCHDKey.prototype.publicExtendedKey = function () {
  return this._hdkey.publicExtendedKey
}

HappyUCHDKey.prototype.derivePath = function (path) {
  return fromHDKey(this._hdkey.derive(path))
}

HappyUCHDKey.prototype.deriveChild = function (index) {
  return fromHDKey(this._hdkey.deriveChild(index))
}

HappyUCHDKey.prototype.getWallet = function () {
  if (this._hdkey._privateKey) {
    return Wallet.fromPrivateKey(this._hdkey._privateKey)
  } else {
    return Wallet.fromPublicKey(this._hdkey._publicKey, true)
  }
}

module.exports = HappyUCHDKey
