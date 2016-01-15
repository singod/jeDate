jeDate.js
=======
# [详细日期API](http://www.jayui.com/jedate/) 
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
        dateCell:"#id", //需显示日期的元素选择器
        format:"YYYY-MM-DD hh:mm:ss",   //日期格式
        minDate:"1900-01-01 00:00:00",   //最小日期
        maxDate:"2099-12-31 23:59:59",  //最大日期
        isinitVal:false,   //是否初始化时间
        isTime:false,     //是否开启时间选择
        isClear: true,    //是否显示清空
        festival:false,   //是否显示节日
        zIndex:999,   //弹出层的层级高度
        choose:function(val) {}  //选择时间之后的回调函


**【自定义日期格式】**

    <div id="test1" class="jedate-icon"></div>
    <script>
    jeDate({
        dateCell: '#test1',
        format: 'YYYY/MM', // 分隔符可以任意定义，该例子表示只显示年月
        festival: true, //显示节日
        choose: function(datas){ //选择日期完毕的回调
            alert('得到：'+datas);
        }
    });
    </script>


**【日期范围限定在昨天到明天】**

    <div id="hello3" class="jedate-icon"></div>
    <script>
    jeDate({
        dateCell: '#hello3',
        minDate: jeDate.now(-1), //0代表今天，-1代表昨天，-2代表前天，以此类推
        maxDate: jeDate.now(1) //1代表明天，2代表后天，以此类推
    });
    </script>
    
    
**【图标或其他按钮触发日期】**

    <input class="datainp" id="datebut" type="text" placeholder="请选择"  readonly>
    <input type="button" onClick="jeDate({dateCell:'#datebut',isTime:true,format:'YYYY-MM-DD hh:mm:ss'})" value="打开">   

     
============
**查看演示**

* [查看演示](http://singod.github.io/jeDate/)   

**下载**

* [jeDate.js](https://github.com/singod/jeDate/blob/gh-pages/js/jeDate.js)

============
