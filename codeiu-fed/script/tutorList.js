/**
 * Created by lance on 2016/10/3.
 */
var tutorInfoDisplayModel = (function(){
  var container = document.querySelector(".mainWrapper");
  function closeTheTutorDisplayed(curUnwindBar){
    curUnwindBar.style.width = "3%";
    Utils.classNameHandler.removeClass(curUnwindBar, "unwind");
  }
  function unCloseTheTutorDisplay(targetTutor){
    var width = 100 - 3*(targetTutor.parentNode.children.length-1);
    targetTutor.style.width = width + "%";
    Utils.classNameHandler.addClass(targetTutor, "unwind");
  }
  function clickHandler(event){
    console.log("OK");
    var target = event.target;
    if (target.innerText !== "点击展开")
      return;
    var targetTutor = target.parentNode.parentNode.parentNode;
    if (Utils.classNameHandler.contains(targetTutor, "unwind"))
      return;
    var curUnwindBar = targetTutor.parentNode.querySelector(".unwind");
    closeTheTutorDisplayed(curUnwindBar);
    unCloseTheTutorDisplay(targetTutor);
  }
  function initEventLis(){
    Utils.EventUtil.addHandler(container, "click", clickHandler);
  }
  function initBarWidth(){
    var fields = document.querySelectorAll(".field-tutors");
    [].forEach.call(fields, function(ele){
      var children = ele.children;
      var length = children.length;
      var unWindWidth = 100 - 3*(length-1);
      [].forEach.call(children, function(aTutorEle){
        if (Utils.classNameHandler.contains(aTutorEle, "unwind"))
          aTutorEle.style.width = unWindWidth + "%";
        else
          aTutorEle.style.width = "3%";
      });
    });
  }
  return {
    init: function(){
      initBarWidth();
      initEventLis();
    }
  }
}());
var tutorFieldNavModel = (function(){
  var nav = document.querySelector(".mf-nav");
  var isAttachToHeader = true;
  function attachToWin(){
    nav.id = "attachToWin";
  }
  function attachToHeader(){
    nav.id = "";
  }
  function wheelHandler(event){
    var curTop = window.scrollY;
    if (isAttachToHeader && curTop >= 55){
      attachToWin();
      isAttachToHeader = !isAttachToHeader;
    }
    if (!isAttachToHeader && curTop <= 55) {
      attachToHeader();
      isAttachToHeader = !isAttachToHeader;
    }
  }
  function initEventLis(){
    Utils.EventUtil.addHandler(document, "wheel", wheelHandler);
    Utils.EventUtil.addHandler(document, "touchmove", wheelHandler);
  }
  return {
    init: function(){
      initEventLis();
    }
  }
}());
function init(){
  tutorFieldNavModel.init();
  tutorInfoDisplayModel.init();
}
init();