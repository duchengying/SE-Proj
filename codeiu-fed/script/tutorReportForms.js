/**
 * Created by lance on 2016/10/5.
 */
function dataProcess(sourceData, toType){

}
function pieFactory(data, wrapper){
  var myChart = echarts.init(wrapper);
  var option = {
    title : {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
      {
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  myChart.setOption(option);
  Utils.classNameHandler.addClass(wrapper, "ready");
}
function histogramFactory(wrapper){
  var myChart = echarts.init(wrapper);
  option = {
    title: {
      text: '坐标轴刻度与标签对齐'
    },
    color: ['#3398DB'],
    tooltip : {
      trigger: 'axis',
      axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type : 'category',
        data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',"1","2","3"],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis : [
      {
        type : 'value'
      }
    ],
    series : [
      {
        name:'直接访问',
        type:'bar',
        barWidth: '60%',
        data:[10, 52, 200, 334, 390, 330, 220, 500, 200, 100]
      }
    ]
  };
  myChart.setOption(option);
  Utils.classNameHandler.addClass(wrapper, "ready");
}
function tableFactory(data){
  return new Lance_Table(data);
}
var PanelChangeHandler = (function(){
  console.log("OK");
  var mainDisplayModel = document.querySelector(".main-display"),
    stuPanel = document.querySelector(".stu-info"),
    teamInfoPanel = document.querySelector(".team-info"),
    taskInfoPanel = document.querySelector(".tasks-info"),
    DBCPanel = document.querySelector(".console-panel");
  return{
    stuPanelInfoLoader: function(){
      var curShowPanel = document.querySelector(".cur-panel");
      if (Utils.classNameHandler.contains(curShowPanel, "stu-info"))
        return;
      Utils.classNameHandler.removeClass(curShowPanel, "cur-panel");
      Utils.classNameHandler.addClass(stuPanel, "cur-panel");

      if (stuPanel.querySelector("table"))
        return;
      console.log("No Table");

      //加载饼图等diagram
      pieFactory(null, document.querySelector(".proportion-gender"));

      //记载表格图
      var baseData = {
        "title": "学员基础数据",
        "headerList": ["姓名","学号","性别","学校","专业","年级","电话","邮箱","团队"],
        "sortAbleList": [1],
        "mobileHiddenList": [2,6,8],
        "callBackFunc": function(){
          stuPanel.appendChild(tableObj.tableDom);
          Utils.classNameHandler.addClass(tableObj.tableDom, "ready");
        },
        "wrapper": stuPanel
      };
      var tableObj = tableFactory(baseData);
      tableObj.addTableRow([["李莉","2","男","成都大学","软件工程","14","13845392356","23938419@qq.com","bb"],
        ["yui","1","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","3","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","2","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","8","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","1","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","3","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","2","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","8","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","1","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","3","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","2","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","8","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","1","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","3","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","2","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","8","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","1","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","3","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","2","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","8","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","1","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","3","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","2","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","8","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","1","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","3","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","2","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","8","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","1","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","3","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","2","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"],
        ["yui","8","女","成都大学","软件工程","14","13965245356","12638419@qq.com","bb"]]);
      console.log(tableObj.tableDom);
    },
    teamInfoPanelLoader: function(){
      var curShowPanel = document.querySelector(".cur-panel");
      if (Utils.classNameHandler.contains(curShowPanel, "team-info"))
        return;
      Utils.classNameHandler.removeClass(curShowPanel, "cur-panel");
      Utils.classNameHandler.addClass(teamInfoPanel, "cur-panel");

    },
    taskInfoPanelLoader: function(){
      var curShowPanel = document.querySelector(".cur-panel");
      if (Utils.classNameHandler.contains(curShowPanel, "tasks-info"))
        return;
      Utils.classNameHandler.removeClass(curShowPanel, "cur-panel");
      Utils.classNameHandler.addClass(taskInfoPanel, "cur-panel");
    },
    DBConsolePanelLoader: function(){
      var curShowPanel = document.querySelector(".cur-panel");
      if (Utils.classNameHandler.contains(curShowPanel, "console-panel"))
        return;
      Utils.classNameHandler.removeClass(curShowPanel, "cur-panel");
      Utils.classNameHandler.addClass(DBCPanel, "cur-panel");
    }
  };
}());
function panelChangeEventHandler(event){
  var target = event.target;
  if (target.tagName !== "A")
    return;
  switch (target.getAttribute("data-target")){
    case "stuInfo":
      PanelChangeHandler.stuPanelInfoLoader();
      break;
    case "teamInfo":
      PanelChangeHandler.teamInfoPanelLoader();
      break;
    case "tasksInfo":
      PanelChangeHandler.taskInfoPanelLoader();
      break;
    case "DBC":
      PanelChangeHandler.DBConsolePanelLoader();
      break;
  }
}
function initEveLis(){
  var nav = document.querySelector(".left-nav");
  Utils.EventUtil.addHandler(nav, "click", panelChangeEventHandler);
}
function init(){
  initEveLis();
}
init();