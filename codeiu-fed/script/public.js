/**
 * Created by lance on 16/9/18.
 */

//此文件装载项目相关公用组件:  回到顶部,顶部用户消息显示


//用户信息toggle显示部分
(function (){
  var toggleBtn = document.querySelector("a.click-toggle");
  var showHiddenModel = toggleBtn.nextElementSibling;
  var isShow = false;
  function documentLis(){
    Utils.EventUtil.addHandler(document,"click",function(event){
      if(isShow){
        showHiddenModel.style.visibility = "hidden";
        isShow = !isShow;
      }
    });
  }
  function eventLisInit(){
    Utils.EventUtil.addHandler(toggleBtn.parentNode,"click",function(event){
      if(!isShow){
        showHiddenModel.style.visibility = "visible";
        isShow = !isShow;
        event.stopPropagation();
        documentLis();
      }
    });
  }
  function init(){
    eventLisInit();
  }
  init();
})();

//mobile下拉框显示部分
(function(){
  var navBar = document.querySelector(".nav-bar");
  var mobileNav = document.querySelector(".mobile-nav");
  var isOpen = false;
  function showNav(event){
    if (isOpen){
      mobileNav.style.height = "0";
    }else{
      mobileNav.style.height = "150px";
    }
    isOpen = !isOpen;
    event.stopPropagation();
    Utils.EventUtil.addHandler(document,"click",showNavByDoc);
  }
  function showNavByDoc(){
    if (isOpen){
      mobileNav.style.height = "0";
      isOpen = !isOpen;
    }
  }
  function eventLisInit(){
    Utils.EventUtil.addHandler(navBar,"click",showNav);
  }
  eventLisInit();
})();
function popupFactory(){
  var popupModel, formEle, dialogFra, submitInfo;
  function closePopup(){
    Utils.classNameHandler.removeClass(popupModel, "popupShow");
    Utils.classNameHandler.removeClass(dialogFra, "dialog-show");
    document.body.style.overflowY = "auto";
  }
  function initPupop(htmlCode, closeBtnsClassName, submitBtn){  //init the popup dom ele(single)
    function initDom(){
      var fragmentEle = document.createElement("div");
      document.body.appendChild(fragmentEle);
      fragmentEle.innerHTML = htmlCode;
      popupModel = fragmentEle.firstElementChild;
      formEle = popupModel.querySelector("form");
      dialogFra = popupModel.firstElementChild;
    }
    function formSubmit(){
      //by ajax

      //closePopup
      closePopup();
    }
    function initEveLis(){
      [].forEach.call(popupModel.parentNode.querySelectorAll(closeBtnsClassName),function(ele){
        console.log(ele);
        Utils.EventUtil.addHandler(ele, "click", closePopup);
      });
      //reviewDialog层事件阻止传播
      Utils.EventUtil.addHandler(dialogFra, "click", function(event){
        event.stopPropagation();
      });

      Utils.EventUtil.addHandler(popupModel.querySelector(submitBtn), "click", formSubmit);
    }
    initDom();
    initEveLis();
  }
  return {
    /*
     * @param1: the HTML code String
     * @param2: the close button class/id [String,String]
     * @param3: the init action value of form
     * */
    init: function(htmlCode, closeBtnsClassName, submitBtn){
      initPupop(htmlCode, closeBtnsClassName, submitBtn);
      this.self = popupModel;
    },
    setSubmitInfo: function(submitInfo){
      formEle.setAttribute("action",submitInfo);
    },
    secTitle: function(title){
      popupModel.querySelector(".prHeader").firstElementChild.innerHTML = title;
    },
    popup: function(){
      Utils.classNameHandler.addClass(popupModel, "popupShow");
      Utils.classNameHandler.addClass(dialogFra, "dialog-show");
      document.body.style.overflowY = "hidden";
    },
    self: popupModel
  }
}
//回到顶部功能模块
(function (){
  var btn = document.querySelector(".backToTop");
  function toTop(){
    var top = window.scrollY;
    var timer = setTimeout(function(){
      top = top - 25;
      window.scrollTo(0, top);
      if(top <= 0){
        clearTimeout(timer);
        initEleDis();
      }else{
        timer = setTimeout(arguments.callee,1);
      }
    },1);
  }
  function wheelHandler(event){
    var curTop = window.scrollY;
    if (curTop > 130){
      btn.style.visibility = "visible";
    }else{
      btn.style.visibility = "hidden";
    }
  }
  function eventLisInit(){
    Utils.EventUtil.addHandler(document, "wheel", wheelHandler);
    Utils.EventUtil.addHandler(document, "touchmove", wheelHandler);
    Utils.EventUtil.addHandler(btn, "click", toTop);
  }
  function initEleDis(){
    btn.style.visibility = "hidden";
    if (window.scrollY > 130){
      btn.style.visibility = "visible";
    }
  }
  function init(){
    if (!btn)
      return;
    initEleDis();
    eventLisInit();
  }
  init();
}());
