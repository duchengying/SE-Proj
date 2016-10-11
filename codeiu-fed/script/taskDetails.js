/**
 * Created by lance on 2016/9/23.
 */

//处理分页问题
function initPageDivide(){
  var wrapper = document.querySelector(".pageNavWrapper");
  var curPageNum = parseInt(document.querySelector(".curPageNum").getAttribute("data-pageNum"));
  function renderDom(){

  }
  function requestData(pageNum){
    console.log(pageNum);
    if (pageNum === curPageNum)
      return;

    console.log(pageNum);

    renderDom();
  }
  function pageDivideHandler(event){
    var target = event.target, targetPage,targetPageNum;
    if (target.tagName !== "A")
      return;
    targetPage = target.innerText;
    targetPageNum = parseInt(target.innerText);
    console.log(targetPage);
    if (isNaN(targetPageNum)){
      //pre or next
      switch (targetPage){
        case "«":
          targetPageNum = curPageNum === 1?1:curPageNum-1;
          break;
        case "»":
          targetPageNum = curPageNum === 10?10:curPageNum+1;
          break;
      }
    }
    //ajax请求
    requestData(targetPageNum);
  }
  Utils.EventUtil.addHandler(wrapper, "click", pageDivideHandler);
  console.log("OK");
}
function init(){
  initPageDivide();
}
init();