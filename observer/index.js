/**
 * 观察者模式
 *          ----> Subject ----
 *          |                 |
 *          |Subscribe        |Fire Event
 *          |                 |
 *          |                 |
 *          ---- Observer <----
 * 观察者（Observer）直接订阅（Subscribe）主题（Subject）
 * 当主题被激活的时候，会触发（Fire Event）观察者里的事件。
 */

/**
 * 有一家猎人工会，其中每个猎人都有发布任务（publish）,订阅任务（subscribe）的功能
 * 他们都有一个订阅列表来记录谁订阅了自己
 * 定义一个猎人类，包括姓名、级别、订阅列表
 */
function Hunter(name, level) {
  this.name = name;
  this.level = level;
  this.list = [];
}

Hunter.prototype.publish = function(money) {
  console.log(this.level + '猎人' + this.name + '寻求帮助');
  this.list.forEach(function(item) {
      item(money);
  });
}

Hunter.prototype.subscribe = function(target, fn) {
  console.log(this.level + '猎人' + this.name + '订阅了' + target.name);
  target.list.push(fn);
}

//猎人工会来了几个猎人
let hunterMing = new Hunter('小明', '黄金');
let hunterJin = new Hunter('小金', '白银');
let hunterZhang = new Hunter('小张', '黄金');
let hunterPeter = new Hunter('Peter', '青铜');

//Peter等级较低，可能需要帮助，所以小明、小金、小张都订阅了Peter
hunterMing.subscribe(hunterPeter, function(money) {
  console.log('小明表示：' + (money > 200 ? '' : '暂时很忙，不能' + '给予帮助。'));
});

hunterJin.subscribe(hunterPeter, function() {
  console.log('小金表示：给予帮助。');
});

hunterZhang.subscribe(hunterPeter, function() {
  console.log('小张表示：给予帮助。');
});

//Peter遇到困难，赏金198寻求帮助
hunterPeter.publish(198);