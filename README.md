jeDate.js
=======
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

============
**查看演示**

* [查看演示](http://singod.github.io/jeDate/)   

**下载**

* [jeDate.js](https://github.com/singod/jeDate/blob/gh-pages/js/jeDate.js)

============
