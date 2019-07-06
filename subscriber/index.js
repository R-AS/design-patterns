/**
 * 发布/订阅模式
 *          Publisher
 *              |
 *              | Publish topic(event)
 *              ↓
 *  ---> Topic/Event Channel ---
 *  |                          |
 *  | Subscribe                | Fire Event
 *  |                          |
 *  -----    Subscriber   <-----
 * 订阅者(Subscriber)把自己想订阅的事件注册（Subscribe）到调度中心（Topic）,
 * 当发布者（Publisher）发布该事件（Publish topic）到调度中心，
 * 也就是该事件触发时，有调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码
 */

//定义一家猎人工会
//主要功能包括任务发布大厅（topics）, 以及订阅任务（subscribe）,发布任务（publish）
let HunterUnion = {
  type: 'hunt',
  topics: Object.create(null),
  subscribe: function (topic, fn) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    this.topics[topic].push(fn);
  },
  publish: function (topic, money) {
    if (!this.topics[topic]) return;
    for (let fn of this.topics[topic]) {
      fn(money);
    }
  }
}

//定义一个猎人类，包括姓名、级别
function Hunter(name, level) {
  this.name = name;
  this.level = level;
} 

//猎人可在猎人工会发布订阅任务
Hunter.prototype.subscribe = function (topic, fn) {
  console.log(this.level + '猎人' + this.name + '订阅了狩猎' + topic + '的任务');
  HunterUnion.subscribe(topic, fn);
}

Hunter.prototype.publish = function (topic, money) {
  console.log(this.level + '猎人' + this.name + '发布了狩猎' + topic + '的任务');
  HunterUnion.publish(topic, money);
}

//猎人工会走来了几个猎人
let hunterMing = new Hunter('小明', '黄金');
let hunterJin = new Hunter('小金', '白银');
let hunterZhang = new Hunter('小张', '黄金');
let hunterPeter = new Hunter('Peter', '青铜');

//小明、小金】小张分别订阅了狩猎tiger的任务
hunterMing.subscribe('tiger', function(money) {
  console.log('小明表示： ' + (money > 200 ? '' : '不') + '接取任务');
});

hunterJin.subscribe('tiger', function(money) {
  console.log('小金表示: 接取任务');
});

hunterZhang.subscribe('tiger', function(money) {
  console.log('小张表示: 接取任务');
});

hunterPeter.subscribe('sheep', function(money) {
  console.log('Peter表示: 接取任务');
});

//Peter发布了狩猎tiger的任务
hunterPeter.publish('tiger', 198);