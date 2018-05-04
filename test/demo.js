/**
 * jeDate 演示
 */
    var enLang = {                            
        name  : "en",
        month : ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
        weeks : [ "SUN","MON","TUR","WED","THU","FRI","SAT" ],
        times : ["Hour","Minute","Second"],
        timetxt: ["Time","Start Time","End Time"],
        backtxt:"Back",
        clear : "Clear",
        today : "Now",
        yes   : "Confirm",
        close : "Close"
    }
    //常规选择
    jeDate("#test01",{
        //festival:true,
        //multiPane:false,
        format: "YYYY"
    });

    jeDate("#test02",{
        format: "YYYY-MM"
    });
    
    jeDate("#test03",{
        //onClose:false,
        
        format: "MM-DD-YYYY"
    });
    jeDate("#test04",{
        festival:true,
        minDate:"1900-01-01",              //最小日期
        maxDate:"2099-12-31",              //最大日期
        method:{
            choose:function (params) {
                
            }
        },
        format: "YYYY-MM-DD hh:mm:ss"
    });  
    var jds = jeDate("#test05",{
        minDate:"01:02:08",              //最小日期
        maxDate:"15:25:35",              //最大日期
        format: "hh:mm:ss"
    });
    console.log(jds)
    //英文语言
    jeDate("#enYMD",{
        language:enLang,
        format: "YYYY-MM-DD"
    });
    jeDate("#enYMDhms",{
        language:enLang,
        format: "YYYY-MM-DD hh:mm:ss"
    });
    jeDate("#enhms",{
        language:enLang,
        format: "hh:mm:ss"
    });

    //自定义主题色
    jeDate("#testblue",{
        theme:{bgcolor:"#00A1CB",pnColor:"#00CCFF"},
        multiPane:false,
        range:" ~ ",
        format: "YYYY-MM-DD hh:mm:ss"
    });
    jeDate("#testgray",{
        theme:{bgcolor:"#00A680",pnColor:"#00DDAA"},
        multiPane:false,
        range:" ~ ",
        format: "YYYY-MM-DD hh:mm:ss"
    });
    jeDate("#testred",{
        theme:{bgcolor:"#D91600",pnColor:"#FF6653"},
        multiPane:false,
        range:" ~ ",
        format: "YYYY-MM-DD hh:mm:ss"
    });
    
    //区域范围选择
    jeDate("#test06",{
        format: "YYYY",
        range:" ~ "
    });
    jeDate("#test07",{
        format: "YYYY-MM",
        range:" To "
    });
    jeDate("#test08",{
        format: "YYYY-MM-DD",
        range:" 至 "
    });
    
    
    //区域范围双面板选择
    var jd = jeDate("#test09",{
        format: "YYYY",
        multiPane:false,
        range:" ~ "
    });
    jeDate("#test10",{
        format: "YYYY-MM",
        multiPane:false,
        range:" To "
    });
    jeDate("#test11",{
        format: "YYYY-MM-DD",
        multiPane:false,
        range:" 至 "
    });
    jeDate("#test11A",{
        format: "YYYY-MM-DD hh:mm:ss",
        multiPane:false,
        range:" 至 "
    });
    jeDate("#test11B",{
        minDate:"03:02:04",              //最小日期
        maxDate:"14:30:45", 
        format: "hh:mm:ss",
        multiPane:false,
        range:" 至 "
    });
    jeDate("#test11C",{
        format: "hh:mm",
        multiPane:false,
        range:" 至 "
    });

    //自定义格式选择
    jeDate("#test12",{
        format: "YYYY年MM月DD日"
    });
    jeDate("#test13",{
        format: "MM-DD-YYYY"
    });
    jeDate("#test14",{
        format: "DD/MM/YYYY"
    });

    //一次绑定多个选择
    var jel = document.querySelectorAll(".moredate");
    for(var j=0;j<jel.length;j++){
        var mat = jel[j].getAttribute("placeholder");
        jeDate(jel[j],{
            format: mat
        });
    }

    //一次绑定多个选择DIV类型
    var divel = document.querySelectorAll(".divmore");
    for(var j=0;j<divel.length;j++){
        var divmat = divel[j].getAttribute("placeholder");
        jeDate(divel[j],{
            format: divmat
        });
    }

    //左边多类选择
    jeDate("#short",{
        format:"YYYY-MM-DD",
        shortcut:[
            {name:"一周",val:{DD:7}},
            {name:"一个月",val:{DD:30}},
            {name:"二个月",val:{MM:2}},
            {name:"三个月",val:{MM:3}},
            {name:"一年",val:{DD:365}}
        ],
        donefun:function (obj) {
            //alert(jeDate.getLunar(obj.date[0]).cW);
        }
    });
    jeDate("#shortboth",{
        format:"YYYY-MM-DD",
        isinitVal: true,
        range:" TO ",
        multiPane:false,
        shortcut:[
            {name:"一周",val:{DD:7}},
            {name:"一个月",val:{DD:30}},
            {name:"二个月",val:{MM:2}},
            {name:"三个月",val:{MM:3}},
            {name:"一年",val:{DD:365}}
        ],
        donefun:function (obj) {
            //var bs = {yy:123,dd:789}
            console.log(jeDate.extend({yy:123,dd:789},{yy:"you",aa:456}))
            //alert(jeDate.getLunar(obj.date[0]).cW);
        }
    });

    //YYYYMMDD格式
    jeDate("#dateymd",{
        format: "YYYYMMDD"
    });
    jeDate("#dateymdboth",{
        format: "YYYYMMDD",
        multiPane:false,
        range:" 至 "
    });
    
    
    //其它功能展示选择
    jeDate("#test15",{
        format: "YYYY-MM-DD",
        isinitVal: true
    });
    jeDate("#test16",{
        format: "YYYY-MM-DD",
        donefun:function (obj) {
            alert('你选择的日期是：' + obj.val)
        }
    }); 
    jeDate("#test17",{
        format: "YYYY-MM-DD",
        toggle:function (obj) {
            alert('你选择的日期是：' + obj.val + '\n\n获得的对象是' + JSON.stringify(obj.date));
        }
    });
    jeDate("#test18",{
        trigger:"dblclick",
        format: "YYYY-MM-DD"
    });
    var custom = jeDate("#test19",{
        format: "YYYY-MM-DD"
    }).setValue("2018-09-01");
    //或者 custom.setValue("2018-09-01");
    
    //有效、无效日期限制
    jeDate("#test20",{
        valiDate:["0[4-7]$,1[1-5]$,2[58]$",true],
        format: "YYYY年MM月DD日"
    });
    jeDate("#test21",{
        valiDate:["0[4-7]$,1[1-5]$,2[58]$",false],
        format: "YYYY年MM月DD日"
    });
    jeDate("#test22",{
        valiDate:["1$,3$,6$,9$",true],
        format: "YYYY年MM月DD日"
    });
    jeDate("#test23",{
        valiDate:["1$,3$,6$,9$",false],
        format: "YYYY年MM月DD日"
    });
    jeDate("#test24",{
        valiDate:["%1,%3,%6,%9,%12,%15,%25",true],
        format: "YYYY年MM月DD日"
    });
    jeDate("#test25",{
        valiDate:["%1,%3,%6,%9,%12,%15,%25",false],
        format: "YYYY年MM月DD日"
    });

    //直接展示日历
    jeDate("#show01",{
        isShow:false,
        format: "YYYY-MM-DD hh:mm:ss"
    });
    jeDate("#show02",{
        isShow:false,
        format: "YYYY-MM"
    });
    jeDate("#show03",{
        isShow:false,
        format: "YYYY"
    });
    jeDate("#show04",{
        isShow:false,
        format: "hh:mm:ss"
    });

    
    