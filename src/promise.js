const PromiseStatus = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected'
}

class MyPromise {
  promiseValue;
  status = PromiseStatus.pending;
  onResolveFuncs = [];
  onRejectFuncs = [];
  constructor(exec) {
    const resolve = (value) => {
      if (this.status === PromiseStatus.pending) {
        this.promiseValue = value;
        this.onResolveFuncs.forEach(f => f());
        if (value instanceof MyPromise || value instanceof Promise) {
          value.then(data => {
            this.status = PromiseStatus.fulfilled;
            resolve(data);
          }).catch(e => {
            this.status = PromiseStatus.rejected;
            reject(e)
          });
        } else {
          this.status = PromiseStatus.fulfilled;
        }
      }
    };
    const reject = (value) => {
      if (this.status === PromiseStatus.pending) {
        this.status = PromiseStatus.rejected;
        this.promiseValue = value;
        this.onRejectFuncs.forEach(f => f());
      }
    };
    try {
      exec(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onResolve, onReject = () => {}) {
    if (this.status === PromiseStatus.fulfilled) {
      return new MyPromise(_resolve => {
        const res = onResolve(this.promiseValue)
        _resolve(res);
      })
    } else if (this.status === PromiseStatus.rejected) {
      return new MyPromise((_resolve, _reject) => {
        const res = onReject(this.promiseValue)
        _reject(res);
      })
    } else if (this.status === PromiseStatus.pending) {
      return new MyPromise((_resolve, _reject) => {
        this.onResolveFuncs.push(() => {
          const res = onResolve(this.promiseValue);
          _resolve(res);
        })
        this.onRejectFuncs.push(() => {
          const res = onReject(this.promiseValue);
          _reject(res);
        })
      })
    }
  }
}

// 测试
// const p = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('666')
//   }, 1000);
// });
// p.then(data => {
//   console.log(data);
//   return 1;
// }, () => {}).then(data => console.log(data))


const b = new MyPromise((res, rej) => {
  res(new MyPromise((_, _rej) => _rej(111)))
}).then(data => console.log('data', data))