/**
 * 代理模式: 为一个对象提供代用品或占位符,以便控制对它的访问
 * 图片懒加载的方式：先通过一张loading图占位，然后通过异步的方式加载图片，
 * 等图片加载好了再把完成的图片加载到img标签里面。
 */
var imgFunc = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {                              
      imgNode.src = src;
    }
  }
})();

var proxyImage = (function () {
  var img = new Image();
  img.onload = function () {
    imgFunc.setSrc(this.src);         //图片加载时,更换图片
  }
  return {
    setSrc: function (src) {
      imgFunc.setSrc('./loading.jpg');  //先显示加载图片
      img.src = src;
    }
  }
})();

proxyImage.setSrc('./pic.jpg');