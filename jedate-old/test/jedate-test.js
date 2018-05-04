/**
 * jeDate 演示
 */
$(function () {
    //常规选择
    $("#test01").jeDate({
        format: "YYYY"
    });
    $("#test02").jeDate({
        format: "YYYY-MM"
    });
    $("#test03").jeDate({
        format: "YYYY-MM-DD"
    });
    $("#test04").jeDate({
        format: "YYYY-MM-DD hh:mm:ss"
    });
    $("#test05").jeDate({
        format: "hh:mm:ss"
    });
    //区域范围选择
    $("#test06").jeDate({
        format: "YYYY",
        range:" ~ "
    });
    $("#test07").jeDate({
        format: "YYYY-MM",
        range:" To "
    });
    $("#test08").jeDate({
        format: "YYYY-MM-DD",
        range:" 至 "
    });
    //区域范围双面板选择
    $("#test09").jeDate({
        format: "YYYY",
        multiPane:false,
        range:" ~ "
    });
    $("#test10").jeDate({
        format: "YYYY-MM",
        multiPane:false,
        range:" To "
    });
    $("#test11").jeDate({
        format: "YYYY-MM-DD",
        multiPane:false,
        range:" 至 "
    });
    //自定义格式选择
    $("#test12").jeDate({
        format: "YYYY年MM月DD日"
    });
    $("#test13").jeDate({
        format: "MM-DD-YYYY"
    });
    $("#test14").jeDate({
        format: "DD/MM/YYYY"
    });
    //一次绑定多个选择
    $(".moredate").each(function(){
        var mat = $(this).attr("placeholder");
        $(this).jeDate({
            format: mat
        });
    });
    //其它功能展示选择
    $("#test15").jeDate({
        format: "YYYY-MM-DD",
        isinitVal: true
    });
    $("#test16").jeDate({
        format: "YYYY-MM-DD",
        okfun:function (elem,value) {
            alert('你选择的日期是：' + value)
        }
    });
    $("#test17").jeDate({
        format: "YYYY-MM-DD",
        toggle:function (elem,value,date) {
            alert('你选择的日期是：' + value + '\n\n获得的对象是' + JSON.stringify(date));
        }
    });
    $("#test18").jeDate({
        trigger:"dblclick",
        format: "YYYY-MM-DD"
    });
    var custom = $("#test19").jeDate({
        format: "YYYY-MM-DD"
    });
    custom.setValue("2017-09-01");
    //有效、无效日期限制
    $("#test20").jeDate({
        valiDate:["0[4-7]$,1[1-5]$,2[58]$",true],
        format: "YYYY年MM月DD日"
    });
    $("#test21").jeDate({
        valiDate:["0[4-7]$,1[1-5]$,2[58]$",false],
        format: "YYYY年MM月DD日"
    });
    $("#test22").jeDate({
        valiDate:["1$,3$,6$,9$",true],
        format: "YYYY年MM月DD日"
    });
    $("#test23").jeDate({
        valiDate:["1$,3$,6$,9$",false],
        format: "YYYY年MM月DD日"
    });
    $("#test24").jeDate({
        valiDate:["%1,%3,%6,%9,%12,%15,%25",true],
        format: "YYYY年MM月DD日"
    });
    $("#test25").jeDate({
        valiDate:["%1,%3,%6,%9,%12,%15,%25",false],
        format: "YYYY年MM月DD日"
    });
    //直接展示日历
    $("#show01").jeDate({
        isShow:false,
        format: "YYYY-MM-DD"
    });
    $("#show02").jeDate({
        isShow:false,
        format: "YYYY-MM"
    });
    $("#show03").jeDate({
        isShow:false,
        format: "YYYY"
    });
    $("#show04").jeDate({
        isShow:false,
        format: "hh:mm:ss"
    });
});