/**
 * 中介者模式
 * 通过一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，而不是相互引用，
 * 当其中的一个对象发生改变时，只需要通知中介者对象即可。
 * 通过中介者模式可以解除对象与对象之间的紧耦合关系。
 * 适用场景：例如购物车需求，存在商品选择表单、颜色选择表单、购买数量表单等等，
 * 都会触发change事件，那么可以通过中介者来转发处理这些事件，实现各个事件间的解耦，仅仅维护中介者对象即可。
 */
//手机库存
var goods = {
  red: [{memory: '32', num: 3}, {memory: '64', num: 1}],
  blue: [{memory: '32', num: 7}, {memory: '64', num: 6}]
}

var colorSelect = document.getElementById('color');
var memorySelect = document.getElementById('memory');
var hint = document.getElementById('hint');

//中介者
var mediator = (function() {
  return {
    changed: function(obj) {
      switch(obj) {
        case colorSelect:
          hint.textContent = goods[obj.value].map(item => {
            return `${item.memory}G ${item.num}台`
          });
          break;
        case memorySelect:
            hint.textContent = goods[colorSelect.value].map(item => {
              if (item.memory === obj.value)
                return `${obj.value}G ${item.num}台`
            });
          break;
      }
    }
  }
})();

colorSelect.onchange = function() {
  mediator.changed(this);
};
memorySelect.onchange = function() {
  mediator.changed(this);
};
