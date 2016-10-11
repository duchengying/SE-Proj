/**
 * Created by lance on 2016/9/26.
 */
var userInfoShow_basicAndUniInfoTransform = (function(){
  var mainWrapper = document.querySelector("div.main-info-display"),
  blocks = {
    "basic": mainWrapper.querySelector(".basic-info-show"),
    "university": mainWrapper.querySelector(".university-info-show")
  };
  function showAndHidden(target, showTarget){
    target.previousElementSibling ? Utils.classNameHandler.removeClass(target.previousElementSibling,"cur-label") : Utils.classNameHandler.removeClass(target.nextElementSibling,"cur-label");
    Utils.classNameHandler.addClass(target, "cur-label");
    for(var key in blocks){
      if (key === showTarget) {
        blocks[key].id = "show";
      }
      else {
        blocks[key].id = "hidden";
      }
    }
  }
  function initEveLis(){
    Utils.EventUtil.addHandler(mainWrapper, "click", function(event){
      var target = event.target;
      console.log(target);
      if(!Utils.classNameHandler.contains(target,"label") || Utils.classNameHandler.contains(target,"cur-label"))
        return;
      showAndHidden(target, target.getAttribute("data-target"));
    });
  }
  return {
    init: function(){
      initEveLis();
    }
  }
}());
function init(){
  userInfoShow_basicAndUniInfoTransform.init();
}
init();