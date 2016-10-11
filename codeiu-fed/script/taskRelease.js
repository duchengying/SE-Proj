/**
 * Created by lance on 2016/9/29.
 */
var formControlHandlerModel = (function(){
  var mainWrapper = document.querySelector("#main-container");
  function addANormalIn(target, basicInfo){
    var fragment = document.createDocumentFragment(),
      input = document.createElement("input"),
      label = document.createElement("label");
    input.type = "text";
    input.name = basicInfo;
    fragment.appendChild(document.createElement("br"));
    fragment.appendChild(label);
    fragment.appendChild(input);
    target.parentNode.insertBefore(fragment, target);
  }
  function addALinkIn(target, basicInfo){
    var fragment = document.createDocumentFragment(),
      nameInput = document.createElement("input"),
      linkInput = document.createElement("input"),
      label = document.createElement("label");
    nameInput.type = "text";
    nameInput.name = "task-referLink-name";
    nameInput.placeholder = "链接文字";
    linkInput.type = "text";
    linkInput.name = "task-referLink-link";
    linkInput.placeholder = "链接地址";
    fragment.appendChild(document.createElement("br"));
    fragment.appendChild(label);
    fragment.appendChild(nameInput);
    fragment.appendChild(linkInput);
    target.parentNode.insertBefore(fragment, target);
  }
  function clickHandler(event){
    console.log("OK");
    var target = event.target;
    if (target.tagName !== "A")
      return;
    var taskBasicInfo = target.parentNode.getAttribute("data-basicInfo");
    if(taskBasicInfo === "task-referLink")
      addALinkIn(target, taskBasicInfo);
    else
      addANormalIn(target, taskBasicInfo);
  }
  function initEventLis(){
    Utils.EventUtil.addHandler(mainWrapper, "click", clickHandler);
  }
  return {
    init: function(){
      initEventLis();
    }
  }
}());
var formContentUpdateModel = (function(){
  var form = document.querySelector("form");
  function nameContains(){

  }
  function getTextEditValue(){

  }
  function formCheck(){
    var flag = true;
    [].forEach.call(form, function(ele){
      if (!ele.name.includes("task") || ele.tagName === "SELECT")
        return;
      var targetInName,
        text = ele.parentNode.previousElementSibling.lastElementChild.innerText;
      //截止日期选择表单元素
      /*
       ele.parentNode.previousElementSibling.lastElementChild.innerText = "不能为空"
       */

      if(ele.id === "task-deadline"){
        if (ele.value !== "" && ele.value.split("-").length === 1){
          console.log(ele.value.split("-"));
          ele.parentNode.previousElementSibling.lastElementChild.innerText = "截止日期不能小于当前日期";
          flag = false;
          return;
        }else{
          ele.parentNode.previousElementSibling.lastElementChild.innerText = text.replace("截止日期不能小于当前日期","");
        }
      }
      targetInName = ele.previousElementSibling.innerText;
      if (Utils.classNameHandler.contains(ele.parentNode,"referLink"))
        targetInName = "参考链接";
      if (ele.value === ""){
        ele.parentNode.previousElementSibling.lastElementChild.innerText = targetInName.slice(0,4) + "不能为空!";
        flag = false;
      }else
        ele.parentNode.previousElementSibling.lastElementChild.innerText = text.replace(targetInName.slice(0,4) + "不能为空!","");;
    });
    return flag;
  }
  function readyFormSubmit(event){
    event.preventDefault();
    if(formCheck()){
      console.log("---------------------------------------------------------");
      event.target.submit();
    }
  }
  function initEveLis(){
    Utils.EventUtil.addHandler(form, "submit", readyFormSubmit);
  }
  return {
    init: function(){
      initEveLis();
    }
  }
}());
var formCalendarInModel = (function(){
  var dateIn = document.querySelector("#task-deadline");
  //第二个位可选的强制值 可选
  function displayOrDisappear(ele, value) {
    console.log("get");
    if (!value) {
      if (ele.style.display === "block" || !ele.style.display) {
        value = "none";
      }else{
        value = "block";
      }
    }
    ele.style.display = value;
  }
  //数据过滤函数 可选
  /**
   * param date {} year,month,day all can selected
   */
  function dataFilter(date) {
    var curDate = new Date();
    if (date.year && date.month) {
      if (date.year < curDate.getFullYear()){
        return false;
      }
      if (date.year === curDate.getFullYear() && date.month < (curDate.getMonth()+1)){
        return false;
      }
      if (date.day && date.month === (curDate.getMonth()+1) && date.day < curDate.getDate()){
        return false;
      }
    }
    return true;
  }
  //错误输入回调函数
  function errorCallBack(){
    dateIn.value = "截止日期小于当前日期";
  }
  return {
    init: function(){
      var wrapper = document.querySelector(".calenderWrapper");
      var calenderCtr = document.querySelector("#calenderControl");
      console.log(dataFilter.errorCallBack);
      var calender = new CalendarModule(dateIn, dataFilter, errorCallBack, function () {
        console.log("callBack Func");
      });
      calender.dom.style.display = "none";
      calender.insertBefore(wrapper);
      calenderCtr.addEventListener("click",function (event) {
        console.log(event.target);
        displayOrDisappear(calender.dom);
      });
      dateIn.addEventListener("focus",function (event) {
        displayOrDisappear(calender.dom, "block");
      });
    }
  }
}());
function init(){
  formCalendarInModel.init();
  formControlHandlerModel.init();
  formContentUpdateModel.init();
}
init();