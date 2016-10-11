/**
 * Created by lance on 16/8/9.
 */
//project utils use model(class)
var Utils = {};
Utils.EventUtil = {
  addHandler: function (element, type, handler, isCatch) {
    //加工事件捕获机制
    isCatch = isCatch ? isCatch : false;
    if(element.addEventListener){
      element.addEventListener(type,handler,isCatch);
    }else if(element.attachEvent){
      if (isCatch){
        elementToDrag.setCapture();
      }
      element.attachEvent("on"+type, handler);
    }
  },
  removeHandler: function (element,type,handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type,handler,false);
    }else if (element.detachEvent) {
      element.detachEvent("on"+type,handler);
    }
  }
};
Utils.TypeCheck = {
  isHtmlElement: function(ele){
    return {}.toString.call(ele).indexOf("object") >= 0 && {}.toString.call(ele).indexOf("HTML") > 0 &&
      {}.toString.call(ele).indexOf("Element") > 0;
  }
};
Utils.classNameHandler = {
  addClass: function(ele, className){
    //console.log({}.toString.call(ele));
    //if (Object.toString.call(ele));
    //防重复添加
    if (ele.className.indexOf(className) >= 0)
      return;
    ele.className = ele.className.length>0? ele.className+" "+className : className;
  },
  replaceClass: function(ele, oldClassName, newClassName){
    ele.className = ele.className.replace(oldClassName, newClassName);
  },
  removeClass: function(ele, className){
    className = ele.className.indexOf(className) > 0 ? " "+className : className;
    ele.className = ele.className.replace(className, "");
  },
  contains: function(ele, className){
    return ele.className.indexOf(className) >= 0;
  }
};
//表单验证控件
Utils.FormVerificationModel = (function(){
  function phoneVerify(value){
    return /^1[34578][0-9]{9}$/.test(value);
  }
  function emailVerify(value){
    return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/.test(value);
  }
  function stuNoVerify(value){
    return /^[1-2](\d){11}$/.test(value);
  }
  return{
    verify: function(ele, value){
      var type = ele.getAttribute("name");
      //经历综合筛选

      //经历分支筛选
      switch(type){
        case "email":
          return emailVerify(value);
          break;
        case "phone":
          return phoneVerify(value);
          break;
        case "stuNo":
          return stuNoVerify(value);
      }
      return true;
    }
  }
}());
/*构建ajax处理函数,传参数
* @param1: url String
* @param2: method String
* @param3: handler Object{}
*
* */
Utils.ajaxModel = (function(){

})();