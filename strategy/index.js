/**
 * 策略模式
 * 目的: 将算法的使用,算法的实现分离开来
 * 步骤: 
 *  1. 策略类(可变), 封装具体的算法,并负责具体的计算过程;
 *  2. 环境类(不变), 接受客户的请求,将请求委托给某一个策略类.
 */

/*策略类*/
var levelObj = {
  'A': function (money) {
    return money * 4;
  },
  'B': function (money) {
    return money * 3;
  },
  'C': function (money) {
    return money * 2;
  }
}

/*环境类*/
var calculateBouns = function (level, money) {
  return levelObj[level](money);
}

console.log(calculateBouns('A',1000));