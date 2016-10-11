/**
 * Created by lance on 16/9/20.
 */

//阻止页面鼠标滑动默认事件处理 即鼠标滚动而页面不滚动   by: overflow
/*
* 单例模式-》弹出层这个DOM init
* 事件监听-》属于整个模块
* 模块参数传递:  弹出层HTML, 关闭按钮s, 初始化上传链接
*
* */
function reviewPopupGradeHandler(popupModel){
  var gradeCtl = popupModel.querySelectorAll(".gradeCtl");
  [].forEach.call(gradeCtl, function(ele){
    Utils.EventUtil.addHandler(ele, "click", function(event){
      var target = event.target,
        input,
        value;
      if (input = target.nextElementSibling){ //如果是第一个减
        value = input.value;
        if(value > 0)
          value = parseInt(input.value) - 1;
      }else{
        input = target.previousElementSibling;
        value = input.value;
        if(value < 10)
          value = parseInt(input.value) + 1;
      }
      if(isNaN(value)){
        alert("分数必须为整数");
        input.value = "5";
      }else{
        input.value = value + "";
      }
    });
  });

}
//初始化各弹出框
function initPupop(){
  var reviewReleaseBtn = document.querySelector("#releaseReview"),
    selfEditBtn = document.querySelector("#self-edit"),
    commentBtns = document.querySelectorAll(".comment-btn");
  var html = ["<section class=\"popupReview click-close-pr\">",
    "    <div class=\"reviewDialog\">",
    "        <div class=\"prHeader\">",
    "            <span>发表 review</span>",
    "            <button class=\"close-popup click-close-pr\">×</button>",
    "        </div>",
    "        <div class=\"prContent\">",
    "            <form action=\"#\">",
    "                <label for=\"reviewContent\">评论：</label>",
    "                <textarea name=\"reviewContent\" id=\"reviewContent\" cols=\"30\" rows=\"10\" placeholder=\"review 评论\"></textarea>",
    "                <label for=\"reviewGrade\">打分：</label>",
    "                <span class=\"gradeCtl\">-</span><input type=\"text\" id=\"reviewGrade\" placeholder=\"\" value=\"5\"><span class=\"gradeCtl\">+</span>",
    "            </form>",
    "            <ul class=\"gradeStatement\">",
    "                打分说明",
    "                <li><em>0:</em>并没有做</li>",
    "                <li><em>1:</em>和没有做差不多，但看得出有努力</li>",
    "                <li><em>2:</em>完成了少部分题目需求，但还有大部分未完成</li>",
    "                <li><em>3:</em>完成了大部分题目需求，但还有一些未完成</li>",
    "                <li><em>4:</em>完成了题目的需求，但是实现细节和技术方法非常差</li>",
    "                <li><em>5:</em>完成了题目的需求，但实现细节和技术方法不好，不符合预期，有较多需要改进</li>",
    "                <li><em>6:</em>完成了题目的需求，实现细节和技术方法基本符合预期，但还有很多改进空间</li>",
    "                <li><em>7:</em>完成了题目的需求，实现细节和技术方法很好，部分值得赞扬和大家学习，还有一些需要改善</li>",
    "                <li><em>8:</em>完成了题目的需求，实现细节和技术方法很好，大部分值得大家学习，小部分地方还值得改善</li>",
    "                <li><em>9:</em>非常完美，需要鸡蛋里挑骨头</li>",
    "                <li><em>10:</em>任何方面都完美无瑕，堪称经典</li>",
    "            </ul>",
    "        </div>",
    "        <div class=\"prBtns\">",
    "            <a href=\"javascript:void (0)\" class=\"btn cancel click-close-pr\">取消</a>",
    "            <a href=\"javascript:void (0)\" class=\"btn submit-pr\">提交</a>",
    "        </div>",
    "    </div>",
    "</section>"].join(""),
    commentHtml = "<section class=\"popupReview click-close-pr\">"+
    "    <div class=\"reviewDialog\">"+
    "        <div class=\"prHeader\">"+
    "            回复 review"+
    "            <button class=\"close-popup click-close-pr\">×</button>"+
    "        </div>"+
    "        <div class=\"prContent\">"+
    "            <form action=\"#\">"+
    "                <label for=\"reviewContent\">评论：</label>"+
    "                <textarea name=\"reviewContent\" id=\"reviewContent\" cols=\"30\" rows=\"10\" placeholder=\"输入要回复的评论内容\"></textarea>"+
    "            </form>"+
    "        </div>"+
    "        <div class=\"prBtns\">"+
    "            <a href=\"javascript:void (0)\" class=\"btn cancel click-close-pr\">取消</a>"+
    "            <a href=\"javascript:void (0)\" class=\"btn submit-pr\">提交</a>"+
    "        </div>"+
    "    </div>"+
    "</section>";
  //------------------------------------------------------------
  var popupReviewModel = popupFactory();
  popupReviewModel.init(html, ".click-close-pr", ".submit-pr");
  console.log(popupReviewModel);
  if (reviewReleaseBtn){
    Utils.EventUtil.addHandler(reviewReleaseBtn, "click", function(){
      popupReviewModel.setSubmitInfo();  //设置提交相关信息
      popupReviewModel.popup();
    });
  }
  if(selfEditBtn){
    popupReviewModel.setSubmitInfo();  //设置提交相关信息
    popupReviewModel.secTitle("更新 review");
    Utils.EventUtil.addHandler(selfEditBtn, "click", function(){
      popupReviewModel.popup();
    });
  }

  //评分弹出层分数计算
  reviewPopupGradeHandler(popupReviewModel.self);

  //评论弹出框相关
  if(commentBtns){
    var popupCommentModel = popupFactory();
    popupCommentModel.init(commentHtml, ".click-close-pr", ".submit-pr");
    [].forEach.call(commentBtns, function(ele){

      Utils.EventUtil.addHandler(ele, "click", function(event){
        //获取提交(ajax)所需的相关的信息   by event

        //设置提交相关信息

        //弹出
        popupCommentModel.popup();
      });
    });
  }

}

function init(){
  initPupop();
}

init();
