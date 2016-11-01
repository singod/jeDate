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

**查看演示**

* [查看演示](http://singod.github.io/jeDate/)   

**下载**

* [jedate.js](https://github.com/singod/jeDate/blob/gh-pages/jedate/jedate.js)

============
