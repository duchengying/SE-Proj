/**
 * Created by lance on 16/8/9.
 */

//http://www.cnblogs.com/hustskyking/p/how-to-achieve-loading-module.html

//决定welcome界面的显示情况   完善信息->选择导师->查看任务
(function () {
  var welcomeM = document.querySelector(".welcome-m");
  var anchors = welcomeM.querySelectorAll("a");
  var divC12 = welcomeM.querySelectorAll("div.col-sm-12");
  if (anchors.length === 2){
    divC12[0].parentNode.removeChild(divC12[0]);
    divC12[1].className = "col-sm-12 col-md-5";
    divC12[2].className = "col-sm-12 col-md-5";
  }
}());

var scrollLoader = (function(){
  var document = null;
  var loadTarget = [];
  var viewPortHeight = window.innerHeight - 50;   //设施缓冲距离,不要一达到值就触发
  function eleShow(ele){
    //  scrollLoad-leftToRight   scrollLoad-bottomToTop   scrollLoad-rightToLeft
    console.log(ele.className);
    ele.className.replace(/(scrollLoad\-leftToRight|scrollLoad\-bottomToTop|scrollLoad\-rightToLeft)/g,function(match){
      console.log(match);
      Utils.classNameHandler.replaceClass(ele, match, match+"-show");
      ele.style.opacity = "1";
      ele.style.filter = "opacity(1)";
    });
  }
  function wheelHandler(){
    console.log("OK");
    for (var i in loadTarget){
      var loadEle = loadTarget[i];
      var top = loadEle.getBoundingClientRect().top;
      if (top < viewPortHeight){
        eleShow(loadEle);
        loadTarget.splice(loadTarget.indexOf(loadEle),1);
        i--;
        if (loadTarget.length === 0){
          console.log("000");
          Utils.EventUtil.removeHandler(document, "wheel",wheelHandler);
        }
      }
    }
  }
  function hideLoader(){
    for (var i = 0; i < loadTarget.length; i++){
      loadTarget[i].style.opacity = "0";
      loadTarget[i].style.filter = "opacity(0)";
    }
  }
  function initEventLis(){
    Utils.EventUtil.addHandler(document, "wheel", wheelHandler);
    Utils.EventUtil.addHandler(document, "touchmove", wheelHandler);
  }
  function pageLoadShow(){   //检测是否有页面一加载就显示在视口的元素
    for (var i in loadTarget){
      var loadEle = loadTarget[i];
      var top = loadEle.getBoundingClientRect().top;
      if (top < viewPortHeight){
        eleShow(loadEle);
        loadTarget.splice(loadTarget.indexOf(loadEle),1);
        i--;
      }
    }
  }
  function init(doc, loadEles){
    document = doc;
    loadTarget = loadEles;
    hideLoader();
    setTimeout(function(){
      pageLoadShow();
      initEventLis();
    },1000);
  }

  var scrollLoader = {};
  scrollLoader.init = init;
  return scrollLoader;
}());
function introModelTransHandler(event){
  if (event.target.tagName !== "A")
    return;
  var target = event.target;
  var curShowModel = document.querySelector(".curShow");
  Utils.classNameHandler.addClass(curShowModel, "curShowToHidden");
  Utils.classNameHandler.removeClass(curShowModel, "curHiddenToShow");
  var timer = setTimeout(function(){
    Utils.classNameHandler.removeClass(curShowModel, "curShow");
    if (target.id === "loginBtn"){
      var model = document.querySelector(".login-m");
      Utils.classNameHandler.addClass(model, "curShow");
    }else{
      var model = document.querySelector(".register-m");
      Utils.classNameHandler.addClass(model, "curShow");
    }
    Utils.classNameHandler.addClass(model, "curHiddenToShow");
    clearTimeout(timer);
  },1000);
}
function regMethodHandler(event){
  var target = event.target;
  if (target.tagName !== "SPAN" || target.className.indexOf("cur") >= 0)
    return;
  var inWraper = target.parentNode.parentNode;
  var form = inWraper.querySelector("form");
  var label = form.querySelector("label");
  if (target.className.indexOf("stu")>=0){
    Utils.classNameHandler.removeClass(target.nextElementSibling, "cur");
    form.setAttribute("action", form.getAttribute("data-server").split("|")[0]);
    label.innerText = "学号 :";
    label.setAttribute("data-confirm","学号格式不正确");
  }else{
    console.log(target.previousElementSibling);
    Utils.classNameHandler.removeClass(target.previousElementSibling, "cur");
    form.setAttribute("action", form.getAttribute("data-server").split("|")[1]);
    label.innerText = "邀请号 :";
    label.setAttribute("data-confirm","无效的邀请码");
  }
  Utils.classNameHandler.addClass(target, "cur");
}
function regAndLoginHandler(){

}
function initEventLis(){
  //处理登录,注册模块跳转相关事宜
  var introModel = document.querySelector(".intro-m");
  Utils.EventUtil.addHandler(introModel, "click", introModelTransHandler);
  //注册方法
  var regMethods = document.querySelector("#reg-method");
  Utils.EventUtil.addHandler(regMethods, "click", regMethodHandler);
  //注册
  var reg = document.querySelector("#register");
  //登录
  var login = document.querySelector("#login");
  Utils.EventUtil.addHandler(reg, "click", regAndLoginHandler);
  Utils.EventUtil.addHandler(login, "click", regAndLoginHandler);

}
function initScrollLoadHandler(){
  var loadEles = [];
  var classKinds = ["scrollLoad-leftToRight","scrollLoad-bottomToTop","scrollLoad-rightToLeft"];
  //scrollLoad-leftToRight   scrollLoad-bottomToTop   scrollLoad-rightToLeft
  for(var i = 0; i < classKinds.length; i++){
    var eles = document.querySelectorAll("."+classKinds[i]);
    for (var j = 0; j < eles.length; j++)
      loadEles = loadEles.concat(eles[j]);
  }
  scrollLoader.init(document, loadEles);
}
function init(){
  initScrollLoadHandler();
  initEventLis();
}
init();
