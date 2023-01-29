const ChainHandle = function (fn) {
    this.fn = fn
    this.successor = null
}
ChainHandle.prototype.setNextSuccessor = function (successor) {
    return this.successor = successor
}
ChainHandle.prototype.passRequest = function () {
    var ret = this.fn.apply(this, arguments)
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments)
    }
    return ret
}
ChainHandle.prototype.next = function () {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}