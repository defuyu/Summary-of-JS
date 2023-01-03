/** 策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。 */
// 计算不同绩效员工薪资

// 策略
const strategies = {
    A: function(salary) {
        return 3 * salary
    },
    B: function(salary) {
        return 2 * salary
    },
    C: function(salary) {
        return salary
    }
}
// 执行环境
function getSalary(level, salary) {
    return strategies[level](salary)
}

//  策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
//  策略模式提供了对开放—封闭原则的完美支持，将算法封装在独立的 strategy 中，使得它
//    们易于切换，易于理解，易于扩展。
//  策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
//  在策略模式中利用组合和委托来让 Context 拥有执行算法的能力，这也是继承的一种更轻
// 便的替代方案。