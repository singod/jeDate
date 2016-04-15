jeDate.js
=======
jeDate除了包含 日历可以直接显示与点击显示、日期标注点、设定年月（YYYY-MM）、日期范围限制、开始日期设定、自定义日期格式、时间戳转换、当天的前后若干天返回、时分秒选择、智能响应、自动纠错、节日识别，操作等常规功能外，还拥有更多趋近完美的解决方案。您可以免费将她用于任何个人项目。但是不能去除头部信息。


* [详细日期API](http://www.jayui.com/jedate/) 

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
	dateCell:"#id",                 //目标元素。由于jedate.js封装了一个轻量级的选择器，因此dateCell还允许你传入class、tag这种方式 '#id .class'  
	isDisplay:false,                //是否直接显示日期层，false不直接显示，true直接显示需要displayCell配合
	displayCell:"#id",              //直接显示日期层的容器，可以是ID  CLASS
	format:"YYYY-MM-DD hh:mm:ss",   //日期格式
	minDate:"1900-01-01 00:00:00",  //最小日期
	maxDate:"2099-12-31 23:59:59",  //最大日期
	isinitVal:false,                //是否初始化时间
	isTime:false,                   //是否开启时间选择
	ishmsLimit:false,               //时分秒限制
	isClear:false,                  //是否显示清空
	festival:false,                 //是否显示节日
	zIndex:999,                     //弹出层的层级高度
	marks:null,                     //给日期做标注
	choosefun:function(val) {},     //选中日期后的回调
	clearfun:function(val) {},      //清除日期后的回调
	okfun:function(val) {}          //点击确定后的回

     
============
**查看演示**

* [查看演示](http://singod.github.io/jeDate/)   

**下载**

* [jeDate.js](https://github.com/singod/jeDate/blob/gh-pages/js/jeDate.js)

============
