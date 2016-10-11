/**
 * Created by lance on 2016/9/28.
 */
var pushedTaskAndViewsShowModel = (function(){
  var showModels = {
    taskListContainer: document.querySelector("#taskListWrapper"),
    reviewListContainer: document.querySelector("#reviewListWrapper")
  };
  function toggleLoadingModel(){

  }
  function getPushedOrReviewListContent(){

  }
  function renderContent(){

  }
  function contentLoadAndRender(){
    console.log("no content");
  }
  function publishedTaskAndReviewModelTrans(target){
    if(Utils.classNameHandler.contains(target,"cur-block"))
      return;
    console.log("get");
    var otherSpan = target.previousElementSibling?target.previousElementSibling:target.nextElementSibling,
      targetShowModel = showModels[target.getAttribute("data-target")],
      targetHiddenModel = targetShowModel.previousElementSibling?targetShowModel.previousElementSibling:targetShowModel.nextElementSibling;
    console.log(targetShowModel);
    console.log(targetHiddenModel);
    Utils.classNameHandler.removeClass(otherSpan, "cur-block");
    Utils.classNameHandler.addClass(target, "cur-block");
    Utils.classNameHandler.removeClass(targetHiddenModel,"cur-list-wrapper");
    Utils.classNameHandler.addClass(targetShowModel,"cur-list-wrapper");
    if (!targetShowModel.firstElementChild)
      contentLoadAndRender();
  }
  return {
    init: function(){
      var infoNav = document.querySelector(".activity-info-nav");
      Utils.EventUtil.addHandler(infoNav, "click", function(event){
        var target = event.target;
        if (target.tagName === "SPAN")
          publishedTaskAndReviewModelTrans(target);
        if (target.tagName === "EM")
          publishedTaskAndReviewModelTrans(target.parentNode);

      });
    }
  }
}());
function pushedTasksListInitLoad(){

}
function init(){
  pushedTaskAndViewsShowModel.init();
  pushedTasksListInitLoad();
}
init();