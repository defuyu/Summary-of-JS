// 函数柯里化

// 参数个数固定
function currying(fn, ...args) {
  if (fn.length <= args.length) {
    return fn.apply(null, args);
  }
  return function (...innerArgs) {
    return currying(fn, ...args, ...innerArgs);
  }
}

// 参数个数不定, 实现函数
// sum(1, 2)(3)(4).count() // 10
// sum(1, 2, 3)(4)(5, 6).count() // 21

function sum(...args) {
  const allArgs = [].concat(args);
  function _sum(...args2) {
    allArgs.push(...args2);
    return _sum;
  }
  _sum.count = function () {
    const sum = allArgs.reduce((a, b) => (a + b));
    return sum;
  }
  return _sum;
}

console.log(sum(1, 2)(3)(4).count())
console.log(sum(1, 2, 3)(4)(5, 6).count())
