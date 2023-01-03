/** 类实例单例 */
// 必须知道特定getInstance获取单例
let Singleton = function (name) {
    this.name = name
}
Singleton.getInstance = (function () {
    let instance = null
    return function (name) {
        if (instance) {
            return instance
        }
        return instance = new Singleton(name)
    }
})()
const obj1 = Singleton.getInstance('name')

// 透明单例，直接通过构造函数使用
let CreateSingleton = (function () {
    let instance = null
    return function () {
        if (instance) {
            return instance
        }
        // 随着类的原型方法增多而变大
        function CreateFn(name) {
            this.name = name
            return instance = this
        }
        return CreateFn
    }
})()
const obj2 = new CreateSingleton('name')

// 代理创建，将类与创建单例独立组织，单一职责清晰
let Singleton2 = function (name) {
    this.name = name
}
let ProxySingletonCreate = (function () {
    let instance = null
    return function () {
        if (instance) {
            return instance
        }
        return instance = new fn(...args)
    }
})(fn, ...args)
const ProxySingletonCreateName = function (...args) {
    ProxySingletonCreate(Singleton2, ...args)
}
const obj3 = ProxySingletonCreateName('name')

/** 对象实例单例 */
// 动态创建命名空间
const MyApp = {}
MyApp.namespace = function (names) {
    const pairNames = names.split('.')
    let current = MyApp
    for (let pair of pairNames) {
        if (!current[pair]) {
            current[pair] = {}
        }
        current = current[pair]
    }
}
MyApp.namespace('event')
MyApp.namespace('dom.style')
// // 输出
// var MyApp = {
//     event: {},
//     dom: {
//         style: {}
//     }
// };

// 惰性单例对象
// 方法执行结果存入一个单例对象中
let getSingle = function (fn) {
    var result
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
};
var createLoginLayer = function () {
    var div = document.createElement('div')
    div.innerHTML = '我是登录浮窗'
    div.style.display = 'none'
    document.body.appendChild(div)
    return div
};
var createSingleLoginLayer = getSingle(createLoginLayer)
document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleLoginLayer()
    loginLayer.style.display = 'block'
};
