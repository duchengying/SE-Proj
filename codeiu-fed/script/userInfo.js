/**
 * Created by lance on 2016/9/24.
 */

var infoSetHandler = (function(){
  var wrapper = document.querySelector(".info-details");
  //调用ajax进行上传 接收callback函数
  function fileUploadHandler(file){

  }
  function triggerFileUpload(){
    var fileInput = wrapper.querySelector("input[type='file']");
    fileInput.click();
  }
  function editVerifyAndUploader(formEle, value, callback){
    var span = formEle.parentNode.nextElementSibling;
    if (value === formEle.getAttribute("placeholder") || "" === value)
      return;
    if(Utils.FormVerificationModel.verify(formEle, value)){
      Utils.classNameHandler.removeClass(span,"error-in");
      //执行修改 ajax 上传

      callback();
      //span.firstElementChild.innerText = "网络异常";
      return true;
    }else{
      Utils.classNameHandler.addClass(span,"error-in");
      return false;
    }
  }
  function startEdit(target, tagName){
    var cancelBtn,li=target.parentNode.parentNode;
    if (tagName === "INPUT"){
      cancelBtn = target.parentNode.nextElementSibling.lastElementChild;
    }else{
      cancelBtn = target;
    }
    cancelBtn.innerText = "取消";
    //分为input和textarea
    try {
      li.querySelector("input").focus();
    }catch(error){
      try {
        li.querySelector("textarea").focus();
      }catch(error2){
        li.querySelector("select").focus();
      }
    }
    //console.log(cancelBtn);
    Utils.classNameHandler.addClass(cancelBtn,"cancel-edit");
    Utils.classNameHandler.addClass(target.parentNode.parentNode,"cur-edit");
  }
  function uploadEdit(target){
    var li = target.parentNode.parentNode, inputEle;
    inputEle = li.querySelector("input");
    inputEle = inputEle ? inputEle : li.querySelector("textarea");
    inputEle = inputEle ? inputEle : li.querySelector("select");
    //下面的调用的最后一个参数为一切处理顺利之后的success回调函数
    editVerifyAndUploader(inputEle, inputEle.value, function(){
      target.nextElementSibling.innerText = "编辑";
      Utils.classNameHandler.removeClass(target.nextElementSibling, "cancel-edit");
      Utils.classNameHandler.removeClass(target.parentNode.parentNode, "cur-edit");
    });
  }
  function cancelEdit(target){
    target.innerText = "编辑";
    var input = target.parentNode.previousElementSibling.firstElementChild;
    if (input.tagName === "INPUT"){
      input.value = "";
    }else{
      input.selectedIndex = input.getAttribute("data-defaultIndex");
    }
    Utils.classNameHandler.removeClass(target, "cancel-edit");
    Utils.classNameHandler.removeClass(target.parentNode.parentNode, "cur-edit");
    Utils.classNameHandler.removeClass(target.parentNode,"error-in");
  }
  function createTeam(target){
    //创建成功直接显示  创建的名字,构造url
    var inEle = target.parentNode.firstElementChild;
    //此处根据server端返回的值配置相应处理函数  team名已存在 成功  网络异常
  }
  function joinTeam(target){
    //添加发送完成显示join-for-answer模块
    var inEle = target.parentNode.firstElementChild;
    //此处根据server端返回的值配置相应处理函数  team名不存在 成功  网络异常
    console.log(inEle);
  }
  return {
    initEveLis: function(){
      //信息修改相应事件总调度
      Utils.EventUtil.addHandler(wrapper, "click", function(event){
        var target = event.target;
        var tagName = target.tagName;
        //不是目标
        if(tagName !== "INPUT" && tagName !== "A")
          return;
        //文件上传时间触发源
        if(Utils.classNameHandler.contains(target, "file-upload-btn")) {
          triggerFileUpload();
          return;
        }
        //文件被动上传事件处理
        if (target.getAttribute("type")==="file")
          return;

        //如果是编辑btn
        if(target.innerText === "编辑" || tagName === "INPUT"){
          startEdit(target, tagName);
          return;
        }
        //如果是取消btn
        if (target.innerText === "取消"){
          cancelEdit(target);
          return;
        }
        //如果是保存btn
        if (target.innerText === "保存")
          uploadEdit(target);


        if(Utils.classNameHandler.contains(target, "t-create"))
          createTeam(target);
        if(Utils.classNameHandler.contains(target, "t-join"))
          joinTeam(target);

        event.stopPropagation();
        event.preventDefault();
      });
      Utils.EventUtil.addHandler(wrapper.querySelector("#file-uploader"),"change", function(event){
          fileUploadHandler(this.files[0]);
      });
    }
  }
}());
function initSelect(){
  var selects = document.querySelectorAll("select");
  [].forEach.call(selects, function(ele){
    ele.selectedIndex = ele.getAttribute("data-defaultIndex");
  });
}
function init(){
  initSelect();
  infoSetHandler.initEveLis();
}
init();