jeDate.js
=======
jeDate除了包含 日历可以直接显示与点击显示、日期标注点、设定年月（YYYY-MM）、日期范围限制、开始日期设定、自定义日期格式、时间戳转换、当天的前后若干天返回、时分秒选择、智能响应、自动纠错、节日识别，操作等常规功能外，还拥有更多趋近完美的解决方案。您可以免费将她用于任何个人项目。但是不能去除头部信息。 QQ群：516754269 


* [点击查看详细日期API](http://www.jayui.com/jedate/) 

# 快速上手

**使用对象**

    <input class="datainp" id="indate" type="text" placeholder="请选择"  readonly>
    <input class="datainp" id="dateinfo" type="text" placeholder="请选择"  readonly>
      
**使用方法**


    <script type="text/javascript">  
 	jeDate({
		dateCell:"#indate",//isinitVal:true,
		format:"YYYY-MM-DD",
		isTime:false, //isClear:false,
		minDate:"2014-09-19 00:00:00"
	})
 	jeDate({
		dateCell:"#dateinfo",
		isinitVal:true,
		isTime:true, //isClear:false,
		minDate:"2014-09-19 00:00:00"
	}) 
    </script>

**核心方法：jeDate(options)**

    options是一个对象，它包含了以下key: '默认值'
    
dateCell:"#id",                       //目标元素。由于jedate.js封装了一个轻量级的选择器，因此dateCell还允许你传入class、tag这种方式 '#id .class'
format:"YYYY-MM-DD hh:mm:ss",         //日期格式
minDate:"1900-01-01 00:00:00",        //最小日期
maxDate:"2099-12-31 23:59:59",        //最大日期
startMin:默认今天,                     //清除日期后返回到预设的最小日期
startMax:"2099-12-31 23:59:59",       //清除日期后返回到预设的最大日期
isinitVal:false,                      //是否初始化时间，默认不初始化时间
initAddVal:[0],                       //初始化时间，加减 天 时 分
isTime:true,                          //是否开启时间选择
ishmsLimit:false,                     //时分秒限制
ishmsVal:true,                        //是否限制时分秒输入框输入，默认可以直接输入时间
isClear:true,                         //是否显示清空
clearRestore:true,                    //清空输入框，返回预设日期，输入框非空的情况下有效
festival:false,                       //是否显示节日
fixed:true,                           //是否静止定位，为true时定位在输入框，为false时居中定位
zIndex:999,                           //弹出层的层级高度
marks:null,                           //给日期做标注
choosefun:function(elem, val) {},     //选中日期后的回调, elem当前输入框ID, val当前选择的值
clearfun:function(elem, val) {},      //清除日期后的回调, elem当前输入框ID, val当前选择的值
okfun:function(elem, val) {},         //点击确定后的回调, elem当前输入框ID, val当前选择的值
success:function(elem) {},            //层弹出后的成功回调方法, elem当前输入框ID

     
============
**查看演示**

* [查看演示](http://singod.github.io/jeDate/)   

**下载**

* [jedate.js](https://github.com/singod/jeDate/blob/gh-pages/jedate/jedate.js)

============
