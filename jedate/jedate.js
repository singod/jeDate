/**
 @Name : jeDate v3.4 日期控件
 @Author: chen guojun
 @Date: 2016-9-6
 @QQ群：516754269
 @官网：http://www.jayui.com/jedate/ 或 https://github.com/singod/jeDate
 */
window.console && (console = console || {log : function(){return;}});
;(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "jeDate" ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jeDate"));
    } else {
        root.jeDate = factory(root.jeDate);
    }
})(this, function(jeDate) {
    var jeDt = {}, doc = document, ymdMacth = /\w+|d+/g;
    var parseInt = function (n) { return window.parseInt(n, 10); };
    // (tag), (#id), (.className) ,(tag > .className) ,(tag > tag) ,(#id > tag.className) , (.className tag) ,(tag, tag, #id) ,(tag#id.className) ,(span > * > b) ,(input[name=radio])
    var QD=function(){function r(c,g){g=g||document;if(!/^[\w\-_#]+$/.test(c)&&g.querySelectorAll)return m(g.querySelectorAll(c));if(-1<c.indexOf(",")){for(var d=c.split(/,/g),a=[],b=0,e=d.length;b<e;++b)a=a.concat(r(d[b],g));return y(a)}var d=c.match(z),a=d.pop(),e=(a.match(t)||k)[1],f=!e&&(a.match(u)||k)[1],b=!e&&(a.match(v)||k)[1],a=c.match(/\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\]/g);if(f&&!a&&!b&&g.getElementsByClassName)b=m(g.getElementsByClassName(f));else{b=!e&&m(g.getElementsByTagName(b||"*"));f&&(b=w(b,"className",RegExp("(^|\\s)"+f+"(\\s|$)")));if(e)return(d=g.getElementById(e))?[d]:[];if(a)for(e=0;e<a.length;e++)var f=(a[e].match(x)||k)[1],h=(a[e].match(x)||k)[2],h=h.replace(/\'/g,"").replace(/\-/g,"\\-").replace(/\[/g,"\\[").replace(/\]/g,"\\]"),b=w(b,f,RegExp("(^"+h+"$)"))}return d[0]&&b[0]?p(d,b):b}function m(c){try{return Array.prototype.slice.call(c)}catch(g){for(var d=[],a=0,b=c.length;a<b;++a)d[a]=c[a];return d}}function p(c,g,d){var a=c.pop();if("\x3e"===a)return p(c,g,!0);for(var b=[],e=-1,f=(a.match(t)||k)[1],h=!f&&(a.match(u)||k)[1],a=!f&&(a.match(v)||k)[1],m=-1,q,l,n,a=a&&a.toLowerCase();q=g[++m];){l=q.parentNode;do if(n=(n=(n=!a||"*"===a||a===l.nodeName.toLowerCase())&&(!f||l.id===f))&&(!h||RegExp("(^|\\s)"+h+"(\\s|$)").test(l.className)),d||n)break;while(l=l.parentNode);n&&(b[++e]=q)}return c[0]&&b[0]?p(c,b):b}function w(c,g,d){for(var a=-1,b,e=-1,f=[];b=c[++a];)d.test(b.getAttribute(g))&&(f[++e]=b);return f}var z=/(?:[\*\w\-\\.#]+)+(?:\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\])*|\*|>/gi,u=/^(?:[\w\-_]+)?\.([\w\-_]+)/,t=/^(?:[\w\-_]+)?#([\w\-_]+)/,v=/^([\w\*\-_]+)/,k=[null,null,null],x=/\[([\w\-_][^=]+)=([\'\[\]\w\-_]+)\]/,y=function(){var c=+new Date,g=function(){var d=1;return function(a){var b=a[c],e=d++;return b?!1:(a[c]=e,!0)}}();return function(d){for(var a=d.length,b=[],e=-1,f=0,h;f<a;++f)h=d[f],g(h)&&(b[++e]=h);c+=1;return b}}();return r}();
    //判断类型
    jeDt.isType = function(obj, type) {
        type = type.replace(/\b(\w)|\s(\w)/g, function(m) {
            return m.toUpperCase();
        });
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
    };
    //循环
    jeDt.each = function(obj, fn) {
        if (jeDt.isType(obj, "array")) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (fn.call(obj[i], i, obj[i]) === false) break;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (fn.call(obj[key], key, obj[key]) === false) break;
                }
            }
        }
    };
    //获取与设置自定义属性
    jeDt.attr = function(elem, key, val) {
        if (typeof key === "string" && typeof val === "undefined") {
            return elem.getAttribute(key);
        } else {
            elem.setAttribute(key, val);
        }
        return this;
    };
    jeDt.stopmp = function(e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
        return this;
    };
    //查询样式是否存在
    jeDt.hasClass = function(elem, cls) {
        elem = elem || {};
        return new RegExp("\\b" + cls + "\\b").test(elem.className);
    };
    //添加样式
    jeDt.addClass = function(elem, cls) {
        elem = elem || {};
        jeDt.hasClass(elem, cls) || (elem.className += " " + cls);
        elem.className = elem.className.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
        return this;
    };
    //删除样式
    jeDt.removeClass = function(elem, cls) {
        elem = elem || {};
        if (jeDt.hasClass(elem, cls)) {
            elem.className = elem.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"), "");
        }
        return this;
    };
    //获取样式
    jeDt.getStyle = function(elem, style) {
        var cssVal = document.defaultView ? window.getComputedStyle(elem, null)[style] : elem.currentStyle[style];
        return cssVal;
    }
    jeDt.isShow = function(elem, bool) {
        elem.style.display = bool != true ? "none" :"block";
    };
    //获取与设置HTML
    jeDt.html = function(elem, value) {
        if (typeof value != "undefined" || value !== undefined && elem.nodeType === 1) {
            elem.innerHTML = value;
        } else {
            return elem.innerHTML;
        }
        return this;
    };
    //获取与设置文本
    jeDt.text = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            document.all ? elem.innerText = value :elem.textContent = value;
        } else {
            var emText = document.all ? elem.innerText :elem.textContent;
            return jeDt.trim(emText);
        }
        return this;
    };
    //获取与设置value
    jeDt.val = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            elem.value = value;
        } else {
            return jeDt.trim(elem.value);
        }
        return this;
    };
    jeDt.bind = function(elObj, type, fn) {
        type = type.toLowerCase();
        var bindevent = function (elem) {
            elem.attachEvent ? elem.attachEvent("on" + type, function() {
                fn.call(elem, window.type);
            }) :elem.addEventListener(type, fn, false);
        }
        return elObj == document ? bindevent(document) :jeDt.each(elObj, function(i, elem) {
            bindevent(elem);
        });
    };
    jeDt.docScroll = function(type) {
        type = type ? "scrollLeft" :"scrollTop";
        return doc.body[type] | doc.documentElement[type];
    };
    jeDt.winarea = function(type) {
        return doc.documentElement[type ? "clientWidth" :"clientHeight"];
    };
    //判断是否闰年
    jeDt.isLeap = function(y) {
        return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
    }
    //获取本月的总天数
    jeDt.getDaysNum = function(y, m) {
        var num = 31;
        switch (parseInt(m)) {
            case 2:
                num = jeDt.isLeap(y) ? 29 : 28; break;
            case 4: case 6: case 9: case 11:
            num = 30; break;
        }
        return num;
    }
    //获取月与年
    jeDt.getYM = function(y, m, n) {
        var nd = new Date(y, m - 1);
        nd.setMonth(m - 1 + n);
        return {
            y: nd.getFullYear(),
            m: nd.getMonth() + 1
        };
    }
    //获取上个月
    jeDt.getPrevMonth = function(y, m, n) {
        return  jeDt.getYM(y, m, 0 - (n || 1));
    }
    //获取下个月
    jeDt.getNextMonth = function(y, m, n) {
        return jeDt.getYM(y, m, n || 1);
    }
    //补齐数位
    jeDt.digit = function(num) {
        return num < 10 ? "0" + (num | 0) :num;
    };
    //判断是否为数字
    jeDt.IsNum = function(str){
        return (str!=null && str!="") ? !isNaN(str) : false;
    }
    //转换日期格式
    jeDt.parse = function(ymd, hms, format) {
        ymd = ymd.concat(hms);
        var hmsCheck = jeDt.parseCheck(format, false).substring(0, 5) == "hh:mm", num = 2;
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
            var idx = hmsCheck ? ++num :ymd.index = ++ymd.index | 0;
            return jeDt.digit(ymd[idx]);
        });
    };
    jeDt.parseCheck = function(format, bool) {
        var ymdhms = [];
        format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
            ymdhms.push(str);
        });
        return ymdhms.join(bool == true ? "-" :":");
    };
    jeDt.checkFormat = function(format) {
        var ymdhms = [];
        format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
            ymdhms.push(str);
        });
        return ymdhms.join("-");
    };
    jeDt.parseMatch = function(str) {
        var timeArr = str.split(" ");
        return timeArr[0].match(ymdMacth);
    };
    //验证日期
    jeDt.checkDate = function (date) {
        var dateArr = date.match(ymdMacth);
        if (isNaN(dateArr[0]) || isNaN(dateArr[1]) || isNaN(dateArr[2])) return false;
        if (dateArr[1] > 12 || dateArr[1] < 1) return false;
        if (dateArr[2] < 1 || dateArr[2] > 31) return false;
        if ((dateArr[1] == 4 || dateArr[1] == 6 || dateArr[1] == 9 || dateArr[1] == 11) && dateArr[2] > 30) return false;
        if (dateArr[1] == 2) {
            if (dateArr[2] > 29) return false;
            if ((dateArr[0] % 100 == 0 && dateArr[0] % 400 != 0 || dateArr[0] % 4 != 0) && dateArr[2] > 28) return false;
        }
        return true;
    }
    jeDt.trim = function(text) {
        return text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
    //初始化日期
    jeDt.nowDate = function(num, format) {
        format = format || 'YYYY-MM-DD hh:mm:ss';
        if(typeof num === "string"){
            var newDate = new Date(parseInt(num) * 1e3);
        }else{
            num = num | 0;
            var newDate = new Date(), todayTime = newDate.getTime() + 1000*60*60*24*num;
            newDate.setTime(todayTime);
        }
        var years = newDate.getFullYear(), months = newDate.getMonth() + 1, days = newDate.getDate(), hh = newDate.getHours(), mm = newDate.getMinutes(), ss = newDate.getSeconds();
        return jeDt.parse([ years, jeDt.digit(months), jeDt.digit(days) ], [ jeDt.digit(hh), jeDt.digit(mm), jeDt.digit(ss) ], format);
    };
    jeDt.montharr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    jeDt.weeks = [ "日", "一", "二", "三", "四", "五", "六" ];
    //判断元素类型
    jeDt.isValHtml = function(that) {
        return /textarea|input/.test(that.tagName.toLocaleLowerCase());
    };
    //节日
    jeDt.festival = function(md, n) {
        var str = "";
        switch (md) {
            case "1.1": str = "元旦"; break;
            case "2.14": str = "情人"; break;
            case "3.8": str = "妇女"; break;
            case "5.1": str = "劳动"; break;
            case "6.1": str = "儿童"; break;
            case "8.1": str = "建军"; break;
            case "9.10": str = "教师"; break;
            case "10.1": str = "国庆"; break;
            case "12.24": str = "平安"; break;
            case "12.25": str = "圣诞"; break;
            default: str = n; break;
        }
        return str;
    };
    var config = {
        skinCell:"jedateblue",
        initAddVal:[0],
        format:"YYYY-MM-DD hh:mm:ss", //日期格式
        minDate:"1900-01-01 00:00:00", //最小日期
        maxDate:"2099-12-31 23:59:59", //最大日期
        startMin:"", //清除日期后返回到预设的最小日期
        startMax:""  //清除日期后返回到预设的最大日期
    };
    jeDt.index = Math.floor(Math.random() * 9e3);
    jeDt.boxCell = "#jedatebox";
    jeDt.find = function(tagName){ return QD(jeDt.boxCell + " " +tagName); };
    jeDt.isBool = function(obj){  return (obj == undefined || obj == true ?  true : false); };
    jeDt.addDateTime = function(time,num,type,format){
        var ishhmm = jeDt.checkFormat(format).substring(0, 5) == "hh-mm" ? true :false;
        var nocharDate = ishhmm ? time.replace(/^(\d{2})(?=\d)/g,"$1,") : time.substr(0,4).replace(/^(\d{4})/g,"$1,") + time.substr(4).replace(/^(\d{2})(?=\d)/g,"$1,");
        var tarr = jeDt.IsNum(time) ? nocharDate.match(ymdMacth) : time.match(ymdMacth), date = new Date(),
            tm0 = parseInt(tarr[0]),  tm1 = tarr[1] == undefined ? date.getMonth() + 1 : parseInt(tarr[1]), tm2 = tarr[2] == undefined ? date.getDate() : parseInt(tarr[2]),
            tm3 = tarr[3] == undefined ? date.getHours() : parseInt(tarr[3]), tm4 = tarr[4] == undefined ? date.getMinutes() : parseInt(tarr[4]), tm5 = tarr[5] == undefined ? date.getMinutes() : parseInt(tarr[5]);
        var newDate = new Date(tm0,jeDt.digit(tm1)-1,(type == "DD" ? tm2 + num : tm2),(type == "hh" ? tm3 + num : tm3),(type == "mm" ? tm4 + num : tm4),jeDt.digit(tm5));
        return jeDt.parse([ newDate.getFullYear(), newDate.getMonth()+1, newDate.getDate() ], [ newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ], format);
    }
    //初始化控件
    jeDt.initDate = function(opts) {
        var even = jeDt.event? jeDt.event: window.event, target, isinitVal = (opts.isinitVal == undefined || opts.isinitVal == false) ? false : true;
        //创建控件骨架外层
        var createDiv = function(disCell, self) {
            if (QD(self)[0]) return;
            jeDt.opts = opts, jeDt.format = opts.format || config.format, minTime = jeDt.opts.minDate || config.minDate, maxTime = jeDt.opts.maxDate || config.maxDate;
            jeDt.fixed = jeDt.isBool(opts.fixed);
            if(/\YYYY-MM-DD/.test(jeDt.checkFormat(jeDt.format))){
                jeDt.checkDate(minTime) ? jeDt.minDate = minTime : alert("最小日期不合法");
                jeDt.checkDate(maxTime) ? jeDt.maxDate = maxTime : alert("最大日期不合法");
            }else{
                jeDt.minDate = minTime, jeDt.maxDate = maxTime;
            }
            var dateDiv = doc.createElement("div"), zIndex = opts.zIndex == undefined ? 2099 : opts.zIndex;
            dateDiv.className = "jedatebox "+(jeDt.opts.skinCell || config.skinCell);
            dateDiv.id = jeDt.boxCell.replace(/\#/g,"");
            jeDt.attr(dateDiv, "author","chen guojun--www.jayui.com--version:"+jeDate.version+"");
            if(opts.isDisplay) jeDt.attr(dateDiv, "date", true);
            dateDiv.style.cssText = "z-index:" + zIndex + ";position:" + (jeDt.fixed == true ? "absolute" :"fixed") + ";display:block;";
            disCell.appendChild(dateDiv);
        }, initVals = function(elem) {
            var jeformat = opts.format || config.format, inaddVal = opts.initAddVal || config.initAddVal, num, type;
            if(inaddVal.length == 1){
                num = inaddVal[0], type = "DD";
            }else{
                num = inaddVal[0], type = inaddVal[1];
            }
            var nowDateVal = jeDt.nowDate(0, jeformat), jeaddDate = jeDt.addDateTime(nowDateVal, num, type, jeformat);
            (jeDt.val(elem) || jeDt.text(elem)) == "" ? jeDt.isValHtml(elem) ? jeDt.val(elem, jeaddDate) :jeDt.text(elem, jeaddDate) :jeDt.isValHtml(elem) ? jeDt.val(elem) : jeDt.text(elem);
        };
        //为开启初始化的时间设置值
        if (isinitVal) {
            jeDt.each(QD("body "+ opts.dateCell), function(i, elem) {
                initVals(elem);
            });
        }
        if (even) {
            jeDt.stopmp(even);
            createDiv(doc.body, jeDt.boxCell);
            jeDt.elemCell = typeof (opts.dateCell) == "string" ? QD(opts.dateCell)[0] : opts.dateCell;
            jeDt.setHtml();
        } else {
            jeDt.bind(QD(opts.dateCell), "click", function (ev) {
                jeDt.stopmp(ev);
                createDiv(doc.body, jeDt.boxCell);
                jeDt.elemCell = this;
                jeDt.setHtml();
            });
        };
    };
    //方位辨别
    jeDt.orien = function(obj, self, pos) {
        var tops, leris, ortop, orleri, rect = jeDt.fixed ? self.getBoundingClientRect() : obj.getBoundingClientRect();
        if(jeDt.fixed) {
            leris = rect.right + obj.offsetWidth / 1.5 >= jeDt.winarea(1) ? rect.right - obj.offsetWidth : rect.left + (pos ? 0 : jeDt.docScroll(1));
            tops = rect.bottom + obj.offsetHeight / 1 <= jeDt.winarea() ? rect.bottom - 1 : rect.top > obj.offsetHeight / 1.5 ? rect.top - obj.offsetHeight - 1 : jeDt.winarea() - obj.offsetHeight;
            ortop = Math.max(tops + (pos ? 0 :jeDt.docScroll()) + 1, 1) + "px", orleri = leris + "px";
        }else{
            ortop = "50%", orleri = "50%";
            obj.style.marginTop = -(rect.height / 2) + "px";
            obj.style.marginLeft = -(rect.width / 2) + "px";
        }
        obj.style.top = ortop;
        obj.style.left = orleri;
    };
    //关闭层
    jeDt.dateClose = function() {
        doc.body.removeChild(QD(jeDt.boxCell)[0]);
    };
    //布局控件骨架
    jeDt.setHtml = function(){   //console.log("20160906".substr(4))   //console.log("20160906".replace(/^(\d{2})(?=\d)/g,"$1,"))
        var weekHtml = "", tmsArr = "", date = new Date(),  dateFormat = jeDt.checkFormat(jeDt.format),
            isYYMM = (dateFormat == "YYYY-MM" || dateFormat == "YYYY") ? true :false,  ishhmm = dateFormat.substring(0, 5) == "hh-mm" ? true :false;
        if ((jeDt.val(jeDt.elemCell) || jeDt.text(jeDt.elemCell)) == "") {
            tmsArr = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ];
            jeDt.currDate = new Date(tmsArr[0], parseInt(tmsArr[1])-1, tmsArr[2], tmsArr[3], tmsArr[4], tmsArr[5]);
            jeDt.ymdDate = tmsArr[0] + "-" + jeDt.digit(tmsArr[1]) + "-" + jeDt.digit(tmsArr[2]);
        } else {
            var initVal = jeDt.isValHtml(jeDt.elemCell) ? jeDt.val(jeDt.elemCell) : jeDt.text(jeDt.elemCell);
            //对获取到日期的进行替换
            var nocharDate = ishhmm ? initVal.replace(/^(\d{2})(?=\d)/g,"$1,") : initVal.substr(0,4).replace(/^(\d{4})/g,"$1,") + initVal.substr(4).replace(/^(\d{2})(?=\d)/g,"$1,");
            //判断是否为数字类型，并分割
            var inVals = jeDt.IsNum(initVal) ? nocharDate.match(ymdMacth) : initVal.match(ymdMacth);
            if(ishhmm){
                tmsArr = dateFormat == "hh-mm" ? [ inVals[0], inVals[1], date.getSeconds() ] :[ inVals[0], inVals[1], inVals[2] ];
                jeDt.currDate = new Date(date.getFullYear(), date.getMonth()-1, date.getDate());
            }else{
                tmsArr = [ inVals[0], inVals[1], inVals[2], inVals[3] == undefined ? date.getHours() : inVals[3], inVals[4] == undefined ? date.getMinutes() : inVals[4], inVals[5] == undefined ? date.getSeconds() :inVals[5] ];
                jeDt.currDate = new Date(tmsArr[0], parseInt(tmsArr[1])-1,  tmsArr[2], tmsArr[3], tmsArr[4], tmsArr[5]);
                jeDt.ymdDate = tmsArr[0] + "-" + jeDt.digit(tmsArr[1]) + "-" + jeDt.digit(tmsArr[2]);
            }
        }
        jeDt.currMonth = tmsArr[1], jeDt.currDays = tmsArr[2];
        //控件HMTL模板
        var datetopStr = '<div class="jedatetop">' + (!isYYMM ? '<div class="jedateym" style="width:50%;"><i class="prev triangle yearprev"></i><span class="jedateyy" ym="24"><em class="jedateyear"></em><em class="pndrop"></em></span><i class="next triangle yearnext"></i></div>' + '<div class="jedateym" style="width:50%;"><i class="prev triangle monthprev"></i><span class="jedatemm" ym="12"><em class="jedatemonth"></em><em class="pndrop"></em></span><i class="next triangle monthnext"></i></div>' :'<div class="jedateym" style="width:100%;"><i class="prev triangle ymprev"></i><span class="jedateyy"><em class="jedateyearmonth"></em></span><i class="next triangle ymnext"></i></div>') + "</div>";
        var dateymList = !isYYMM ? '<div class="jedatetopym" style="display: none;">' + '<ul class="ymdropul"></ul><p><span class="jedateymchle">&lt;&lt;</span><span class="jedateymchri">&gt;&gt;</span><span class="jedateymchok">关闭</span></p>' + "</div>" :(dateFormat == "YYYY" ? '<ul class="jedayy"></ul>' :　'<ul class="jedaym"></ul>');
        var dateriList = '<ol class="jedaol"></ol><ul class="jedaul"></ul>';
        var bothmsStr = !isYYMM ? '<div class="botflex jedatehmsshde"><ul class="jedatehms"><li><input type="text" /></li><i>:</i><li><input type="text" /></li><i>:</i><li><input type="text" /></li></ul></div>' + '<div class="botflex jedatebtn"><span class="jedateok">确认</span><span class="jedatetodaymonth">今天</span><span class="jedateclear">清空</span></div>' :(dateFormat == "YYYY" ? '<div class="botflex jedatebtn"><span class="jedateok" style="width:47.8%">确认</span><span class="jedateclear" style="width:47.8%">清空</span></div>' : '<div class="botflex jedatebtn"><span class="jedateok">确认</span><span class="jedatetodaymonth">本月</span><span class="jedateclear">清空</span></div>');
        var datebotStr = '<div class="jedatebot">' + bothmsStr + "</div>";
        var datehmschoose = '<div class="jedateprophms ' + (ishhmm ? "jedatepropfix" :"jedateproppos") + '"><div class="jedatepropcon"><div class="jedatehmstitle">时间选择<div class="jedatehmsclose">&times;</div></div><div class="jedateproptext">小时</div><div class="jedateproptext">分钟</div><div class="jedateproptext">秒数</div><div class="jedatehmscon jedateprophours"></div><div class="jedatehmscon jedatepropminutes"></div><div class="jedatehmscon jedatepropseconds"></div></div></div>';
        var dateHtmStr = isYYMM ? datetopStr + dateymList + datebotStr :ishhmm ? datetopStr + datehmschoose + datebotStr :datetopStr + dateymList + dateriList + datehmschoose + datebotStr;
        jeDt.html(QD(jeDt.boxCell)[0], dateHtmStr);
        //是否显示清除按钮
        jeDt.isBool(jeDt.opts.isClear) ? "" : jeDt.isShow(jeDt.find(".jedatebot .jedateclear")[0], false);
        //是否显示今天按钮
        if(!isYYMM){
            jeDt.isBool(jeDt.opts.isToday) ? "" : jeDt.isShow(jeDt.find(".jedatebot .jedatetodaymonth")[0], false);
        };
        //判断是否有时分秒
        if(/\hh-mm/.test(dateFormat)){
            var isTimehms = function(bool) {
                if(jeDt.val(jeDt.elemCell) != "" || jeDt.text(jeDt.elemCell) != "") {
                    var hmsArrs = bool ? [ tmsArr[0], tmsArr[1], tmsArr[2] ] : [ tmsArr[3], tmsArr[4], tmsArr[5] ];
                }else{
                    var hmsArrs =  [ jeDt.currDate.getHours(), jeDt.currDate.getMinutes(), jeDt.currDate.getSeconds() ];
                }
                jeDt.each(jeDt.find(".jedatebot .jedatehms input"), function(i, cls) {
                    jeDt.val(cls, jeDt.digit(hmsArrs[i]));
                    jeDt.isBool(jeDt.opts.ishmsVal) ? "" : jeDt.attr(cls, "readOnly",'true');
                });
            };
            if(ishhmm){
                isTimehms(true);
                jeDt.text(jeDt.find(".jedateyear")[0], jeDt.currDate.getFullYear() + '年').text(jeDt.find(".jedatemonth")[0], jeDt.digit(jeDt.currDate.getMonth() + 1) + '月');
            }else{
                if(jeDt.isBool(jeDt.opts.isTime)){
                    isTimehms(false);
                }else{
                    jeDt.isShow(jeDt.find(".jedatebot .jedatehmsshde")[0], false);
                    jeDt.find(".jedatebot .jedatebtn")[0].style.width = "100%";
                }
            }
        }else{
            if (!isYYMM) jeDt.isShow(jeDt.find(".jedatebot .jedatehmsshde")[0], false);
            jeDt.find(".jedatebot .jedatebtn")[0].style.width = "100%";
        };
        //判断是否为年月类型
        if(/\YYYY-MM-DD/.test(dateFormat)){
            jeDt.each(jeDt.weeks, function(i, week) {
                weekHtml += '<li class="weeks" data-week="' + week + '">' + week + "</li>";
            });
            jeDt.each(jeDt.find(".jedaol"), function(i, elem) {
                jeDt.html(elem, weekHtml);
            });
            jeDt.createDaysHtml(jeDt.currDate.getFullYear(), jeDt.currDate.getMonth()+1);
            jeDt.chooseYM();
        };
        if(isYYMM){
            var monthCls = jeDt.find(".jedateym .jedateyearmonth")[0];
            if(dateFormat == "YYYY"){
                jeDt.attr(monthCls, "data-onyy",tmsArr[0]);
                jeDt.text(monthCls, tmsArr[0] + "年");
                jeDt.html(jeDt.find(".jedayy")[0], jeDt.onlyYear(tmsArr[0]));
            }else{
                jeDt.attr(monthCls, "data-onym",tmsArr[0]+"-"+jeDt.digit(tmsArr[1]));
                jeDt.text(monthCls, tmsArr[0] + "年" + parseInt(tmsArr[1]) + "月");
                jeDt.html(jeDt.find(".jedaym")[0], jeDt.onlyYMStr(tmsArr[0], parseInt(tmsArr[1])));
            }
            jeDt.onlyYMevents(tmsArr);
        }
        jeDt.orien(QD(jeDt.boxCell)[0], jeDt.elemCell);
        setTimeout(function () {
            jeDt.opts.success && jeDt.opts.success(jeDt.elemCell);
        }, 2);
        jeDt.events(tmsArr);
    }
    //循环生成日历
    jeDt.createDaysHtml = function(ys, ms){
        var year = parseInt(ys), month = parseInt(ms), dateHtml = "",count = 0;
        var minArr = jeDt.minDate.match(ymdMacth), minNum = minArr[0] + minArr[1] + minArr[2],
            maxArr = jeDt.maxDate.match(ymdMacth), maxNum = maxArr[0] + maxArr[1] + maxArr[2];
        jeDt.html(jeDt.find(".jedaul")[0], ""); //切忌一定要把这个内容去掉，要不然会点一次翻页都在日历下面依次显示出来
        var firstWeek = new Date(year, month - 1, 1).getDay() || 7,
            daysNum = jeDt.getDaysNum(year, month), prevM = jeDt.getPrevMonth(year, month),
            prevDaysNum = jeDt.getDaysNum(year, prevM.m), nextM = jeDt.getNextMonth(year, month),
            currOne = jeDt.currDate.getFullYear() + "-" + jeDt.digit(jeDt.currDate.getMonth() + 1) + "-" + jeDt.digit(1),
            thisOne = year + "-" + jeDt.digit(month) + "-" + jeDt.digit(1);
        jeDt.attr(jeDt.find(".jedateyear")[0], "year", year), jeDt.text(jeDt.find(".jedateyear")[0], year + '年');
        jeDt.attr(jeDt.find(".jedatemonth")[0], "month", month), jeDt.text(jeDt.find(".jedatemonth")[0], month + '月');
        //设置时间标注
        var mark = function (my, mm, md) {
            var Marks = jeDt.opts.marks, contains = function(arr, obj) {
                var len = arr.length;
                while (len--) {
                    if (arr[len] === obj) return true;
                }
                return false;
            };
            return jeDt.isType(Marks, "array") && Marks.length > 0 && contains(Marks, my + "-" + jeDt.digit(mm) + "-" + jeDt.digit(md)) ? '<i class="marks"></i>' :"";
        }
        //是否显示节日
        var isfestival = function(fmd, fd) {
            return jeDt.opts.festival ? jeDt.festival(fmd, fd) : fd;
        };
        //判断是否在限制的日期之中
        var dateOfLimit = function(Y, M, D, isMonth){
            var thatNum = (Y + "-" + jeDt.digit(M) + "-" + jeDt.digit(D)).replace(/\-/g, '');
            if(isMonth){
                if (parseInt(thatNum) >= parseInt(minNum) && parseInt(thatNum) <= parseInt(maxNum)) return true;
            }else {
                if (parseInt(minNum) > parseInt(thatNum) || parseInt(maxNum) < parseInt(thatNum)) return true;
            }
        }
        //上一月剩余天数
        for (var p = prevDaysNum - firstWeek + 1; p <= prevDaysNum; p++, count++) {
            var pmark = mark(prevM.y,prevM.m,p), pCls = dateOfLimit(prevM.y, prevM.m, p, false) ? "disabled" : "other";
            dateHtml += '<li year="'+prevM.y+'" month="'+prevM.m+'" day="'+p+'" class='+pCls+'>'+(isfestival(prevM.m+"."+p,p) + pmark)+'</li>';
        }
        //本月的天数
        for(var b = 1; b <= daysNum; b++, count++){
            var bCls = "", bmark = mark(year,month,b),
                thisDate = (year + "-" + jeDt.digit(month) + "-" + jeDt.digit(b)); //本月当前日期
            if(dateOfLimit(year, month, b, true)){
                bCls = jeDt.ymdDate == thisDate ? "action" : (currOne != thisOne && thisOne == thisDate ? "action" : "")
            }else{
                bCls = "disabled";
            }
            dateHtml += '<li year="'+year+'" month="'+month+'" day="'+b+'" '+(bCls != "" ? "class="+bCls+"" : "")+'>'+(isfestival(month+"."+b,b) + bmark)+'</li>';
        }
        //下一月开始天数
        for(var n = 1, nlen = 42 - count; n <= nlen; n++){
            var nmark = mark(nextM.y,nextM.m,n), nCls = dateOfLimit(nextM.y, nextM.m, n, false) ? "disabled" : "other";
            dateHtml += '<li year="'+nextM.y+'" month="'+nextM.m+'" day="'+n+'" class='+nCls+'>'+(isfestival(nextM.m+"."+n,n) + nmark)+'</li>';
        }
        //把日期拼接起来并插入
        jeDt.html(jeDt.find(".jedaul")[0],dateHtml);
        jeDt.chooseDays();
    }
    //循环生成年月（YYYY-MM）
    jeDt.onlyYMStr = function(y, m) {
        var onlyYM = "";
        jeDt.each(jeDt.montharr, function(i, val) {
            var minArr = jeDt.parseMatch(jeDt.minDate), maxArr = jeDt.parseMatch(jeDt.maxDate),
                thisDate = new Date(y, jeDt.digit(val), "01"), minTime = new Date(minArr[0], minArr[1], minArr[2]), maxTime = new Date(maxArr[0], maxArr[1], maxArr[2]);
            if (thisDate < minTime || thisDate > maxTime) {
                onlyYM += "<li class='disabled' ym='" + y + "-" + jeDt.digit(val) + "'>" + y + "年" + jeDt.digit(val) + "月</li>";
            } else {
                onlyYM += "<li " + (m == val ? 'class="action"' :"") + ' ym="' + y + "-" + jeDt.digit(val) + '">' + y + "年" + jeDt.digit(val) + "月</li>";
            }
        });
        return onlyYM;
    };
    //循环生成年（YYYY）
    jeDt.onlyYear = function(YY) {
        var onlyStr = "";   jeDt.yearArr = new Array(15);
        jeDt.each(jeDt.yearArr, function(i) {
            var minArr = jeDt.parseMatch(jeDt.minDate), maxArr = jeDt.parseMatch(jeDt.maxDate),
                minY = minArr[0], maxY = maxArr[0], yyi = YY - 7 + i,
                getyear = jeDt.attr(jeDt.find(".jedateym .jedateyearmonth")[0], "data-onyy");
            if (yyi < minY || yyi > maxY) {
                onlyStr += "<li class='disabled' yy='" + yyi + "'>" + yyi + "年</li>";
            } else {
                onlyStr += "<li "+(getyear == yyi ? 'class="action"' : "")+" yy='" + yyi + "'>" + yyi + "年</li>";
            }
        });
        return onlyStr;
    };
    //生成定位时分秒
    jeDt.setStrhms = function() {
        var parseFormat = jeDt.format, hmsArr = [], hmsliCls = jeDt.find(".jedatehms li"),
            proptextCls = jeDt.find(".jedatepropcon .jedateproptext"), propconCls = jeDt.find(".jedatepropcon .jedatehmscon");
        var parsehms = function(str) {
            var ymdstr = str.match(ymdMacth).join("-"), timeArr = ymdstr == "YYYY-MM-DD-hh-mm" ? str.split(" ") : ymdstr,
                isHMtime = ymdstr == "YYYY-MM-DD-hh-mm" ? timeArr[1] :timeArr;
            return isHMtime.match(ymdMacth).join("-");
        };
        var parmathm = parsehms(parseFormat) == "hh-mm";
        if(parmathm){
            var hmsliWidth = jeDt.getStyle(hmsliCls[0],'width').replace(/\px|em|rem/g,''), hmsiW = jeDt.getStyle(jeDt.find(".jedatehms i")[0],'width').replace(/\px|em|rem/g,''),
                hmschoseW = jeDt.getStyle(proptextCls[0],'width').replace(/\px|em|rem/g,''), hmslival = Math.round(parseInt(hmsliWidth) + parseInt(hmsliWidth)/2 + parseInt(hmsiW)/2);
            hmsliCls[0].style.width = hmsliCls[1].style.width = hmslival + "px";
            proptextCls[0].style.width = proptextCls[1].style.width = propconCls[0].style.width = propconCls[1].style.width = Math.round(parseInt(hmschoseW) + parseInt(hmschoseW)/2 + 2) + "px";
        }
        //生成时分秒
        jeDt.each([ 24, 60, 60 ], function(i, len) {
            var hmsStr = "", hmsCls = "", inputCls = jeDt.find(".jedatehms input"), textem = jeDt.val(inputCls[i]);
            jeDt.attr(inputCls[i],"maxlength",2).attr(inputCls[i],"numval",len-1).attr(inputCls[i],"item",i);
            for (var h = 0; h < len; h++) {
                h = jeDt.digit(h);
                if (jeDt.opts.ishmsLimit) {
                    hmsCls = h < textem ? "disabled" :h == textem ? "action" :"";
                } else {
                    hmsCls = parmathm && i == 2 ? textem == h ? "disabled action" :"disabled" :textem == h ? "action" :"";
                    if(parmathm && i == 2){
                        var readCls = hmsliCls[2];
                        readCls.style.display = readCls.previousSibling.style.display = "none";
                        proptextCls[i].style.display = propconCls[i].style.display = "none";
                    }
                }
                hmsStr += '<p class="' + hmsCls + '">' + h + "</p>";
            }
            hmsArr.push(hmsStr);
        });
        return hmsArr;
    };
    //仅年月情况下的点击
    jeDt.onlyYMevents = function(tmsArr) {
        var ymVal, ymPre = jeDt.find(".jedateym .ymprev"), ymNext = jeDt.find(".jedateym .ymnext"), ony = parseInt(tmsArr[0]), onm = parseFloat(tmsArr[1]);
        jeDt.each([ ymPre, ymNext ], function(i, cls) {
            jeDt.bind(cls, "click", function(ev) {
                jeDt.stopmp(ev);
                if(jeDt.checkFormat(jeDt.format) == "YYYY"){
                    ymVal = cls == ymPre ? jeDt.attr(jeDt.find(".jedayy li")[0], "yy") : jeDt.attr(jeDt.find(".jedayy li")[jeDt.yearArr.length-1], "yy");
                    jeDt.html(jeDt.find(".jedayy")[0], jeDt.onlyYear(parseInt(ymVal)));
                }else{
                    ymVal = cls == ymPre ? ony -= 1 :ony += 1;
                    jeDt.html(jeDt.find(".jedaym")[0], jeDt.onlyYMStr(ymVal, onm));
                }
                jeDt.ymPremNextEvents();
            });
        });
    };
    //选择日期
    jeDt.chooseDays = function() {
        jeDt.bind(jeDt.find(".jedaul li"), "click", function(ev) {
            var that = this, liTms = [], valcell = jeDt.elemCell;
            if (jeDt.hasClass(that, "disabled")) return;
            jeDt.stopmp(ev);
            jeDt.each(jeDt.find(".jedatehms input"), function(i, val) {
                liTms.push(jeDt.val(val));
            });
            var aty = parseInt(jeDt.attr(that, "year")), atm = parseFloat(jeDt.attr(that, "month")), atd = parseFloat(jeDt.attr(that, "day")),
                getDateVal = jeDt.parse([ aty, atm, atd ], [ liTms[0], liTms[1], liTms[2] ], jeDt.format);
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, getDateVal) :jeDt.text(valcell, getDateVal);
            jeDt.dateClose();
            if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun&&jeDt.opts.choosefun(jeDt.elemCell,getDateVal);
        });
    };
    //下拉选择年和月
    jeDt.chooseYM = function() {
        var jetopym = jeDt.find(".jedatetopym"), jedateyy = jeDt.find(".jedateyy"), jedatemm = jeDt.find(".jedatemm"), jedateyear = jeDt.find(".jedateyy .jedateyear"),
            jedatemonth = jeDt.find(".jedatemm .jedatemonth"), mchri = jeDt.find(".jedateymchri"), mchle = jeDt.find(".jedateymchle"),
            ishhmmss = jeDt.checkFormat(jeDt.format).substring(0, 5) == "hh-mm" ? true :false;
        //循环生成年
        function eachYears(YY) {
            var eachStr = "";
            jeDt.each(new Array(15), function(i) {
                if (i === 7) {
                    var getyear = jeDt.attr(jedateyear[0], "year");
                    eachStr += "<li " + (getyear == YY ? 'class="action"' :"") + ' yy="' + YY + '">' + YY + "年</li>";
                } else {
                    eachStr += '<li yy="' + (YY - 7 + i) + '">' + (YY - 7 + i) + "年</li>";
                }
            });
            return eachStr;
        }
        //循环生成月
        function eachYearMonth(YY, ymlen) {
            var ymStr = "";
            if (ymlen == 12) {
                jeDt.each(jeDt.montharr, function(i, val) {
                    var getmonth = jeDt.attr(jedatemonth[0], "month"), val = jeDt.digit(val);
                    ymStr += "<li " + (jeDt.digit(getmonth) == val ? 'class="action"' :"") + ' mm="' + val + '">' + val + "月</li>";
                });
                jeDt.each([ mchri, mchle ], function(c, cls) {
                    jeDt.isShow(cls[0], false);
                });
            } else {
                ymStr = eachYears(YY);
                jeDt.each([ mchri, mchle ], function(c, cls) {
                    jeDt.isShow(cls[0], true);
                });
            }
            jeDt.removeClass(jetopym[0], ymlen == 12 ? "jedatesety" :"jedatesetm").addClass(jetopym[0], ymlen == 12 ? "jedatesetm" :"jedatesety");
            jeDt.html(jeDt.find(".jedatetopym .ymdropul")[0], ymStr);
            jeDt.isShow(jetopym[0], true);
        }
        function clickLiYears(year) {
            jeDt.bind(jeDt.find(".ymdropul li"), "click", function(ev) {
                var Years = jeDt.attr(this, "yy"), Months = parseInt(jeDt.attr(jedatemonth[0], "month"));
                jeDt.attr(year, "year", Years);
                jeDt.html(year, Years + '年');
                jeDt.isShow(jetopym[0], false);
                jeDt.createDaysHtml(Years, Months);
            });
        }
        //下拉选择年
        !ishhmmss && jeDt.bind(jedateyy, "click", function() {
            var YMlen = parseInt(jeDt.attr(this, "ym")), yearAttr = parseInt(jeDt.attr(jedateyear[0], "year"));
            eachYearMonth(yearAttr, YMlen);
            clickLiYears(jedateyear[0]);
        });
        //下拉选择月
        !ishhmmss && jeDt.bind(jedatemm, "click", function() {
            var YMlen = parseInt(jeDt.attr(this, "ym")), yearAttr = parseInt(jeDt.attr(jedateyear[0], "year"));
            eachYearMonth(yearAttr, YMlen);
            jeDt.bind(jeDt.find(".ymdropul li"), "click", function(ev) {
                var Years = jeDt.attr(jedateyear[0], "year"), Months = parseInt(jeDt.attr(this, "mm"));
                jeDt.attr(jedatemonth[0], "month", Months);
                jeDt.html(jedatemonth[0], Months + '月');
                jeDt.isShow(jetopym[0], false);
                jeDt.createDaysHtml(Years, Months);
            });
        });
        //关闭下拉选择
        jeDt.bind(jeDt.find(".jedateymchok"), "click", function(ev) {
            jeDt.stopmp(ev);
            jeDt.isShow(jetopym[0], false);
        });
        var yearMch = parseInt(jeDt.attr(jedateyear[0], "year"));
        jeDt.each([ mchle, mchri ], function(d, cls) {
            jeDt.bind(cls, "click", function(ev) {
                jeDt.stopmp(ev);
                d == 0 ? yearMch -= 15 :yearMch += 15;
                var mchStr = eachYears(yearMch);
                jeDt.html(jeDt.find(".jedatetopym .ymdropul")[0], mchStr);
                clickLiYears(jedateyear[0]);
            });
        });
    };
    //年月情况下的事件绑定
    jeDt.ymPremNextEvents = function(){
        var newDate = new Date(), valcell = jeDt.elemCell, isYY = (jeDt.checkFormat(jeDt.format) == "YYYY"), ymCls = isYY ? jeDt.find(".jedayy li") : jeDt.find(".jedaym li");
        //选择年月
        jeDt.bind(ymCls, "click", function (ev) {
            var that = this;
            if (jeDt.hasClass(that, "disabled")) return;    //判断是否为禁选状态
            jeDt.stopmp(ev);
            var atYM =  isYY ? jeDt.attr(that, "yy").match(ymdMacth) : jeDt.attr(that, "ym").match(ymdMacth),
                getYMDate = isYY ? jeDt.parse([atYM[0], newDate.getMonth() + 1, 1], [0, 0, 0], jeDt.format) : jeDt.parse([atYM[0], atYM[1], 1], [0, 0, 0], jeDt.format);
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, getYMDate) : jeDt.text(valcell, getYMDate);
            jeDt.dateClose();
            if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell, getYMDate);
        });
    }
    //各种事件绑定
    jeDt.events = function(tmsArr) {
        var newDate = new Date(), yPre = jeDt.find(".yearprev"), yNext = jeDt.find(".yearnext"),
            mPre = jeDt.find(".monthprev"), mNext = jeDt.find(".monthnext"),
            jedateyear = jeDt.find(".jedateyear"), jedatemonth = jeDt.find(".jedatemonth"),
            isYYMM = (jeDt.checkFormat(jeDt.format) == "YYYY-MM" || jeDt.checkFormat(jeDt.format) == "YYYY") ? true :false,
            ishhmmss = jeDt.checkFormat(jeDt.format).substring(0, 5) == "hh-mm" ? true :false;
        if (!isYYMM) {
            //切换年
            !ishhmmss && jeDt.each([ yPre, yNext ], function(i, cls) {
                jeDt.bind(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    var year = parseInt(jeDt.attr(jedateyear[0], "year")), month = parseInt(jeDt.attr(jedatemonth[0], "month")),
                        pnYear = cls == yPre ? --year : ++year, PrevYM = jeDt.getPrevMonth(pnYear, month), NextYM = jeDt.getNextMonth(pnYear, month);
                    cls == yPre ? jeDt.createDaysHtml(PrevYM.y, month) : jeDt.createDaysHtml(NextYM.y, month);
                });
            });
            //切换月
            !ishhmmss && jeDt.each([ mPre, mNext ], function(i, cls) {
                jeDt.bind(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    var year = parseInt(jeDt.attr(jedateyear[0], "year")), month = parseInt(jeDt.attr(jedatemonth[0], "month")),
                        PrevYM = jeDt.getPrevMonth(year, month), NextYM = jeDt.getNextMonth(year, month);
                    cls == mPre ? jeDt.createDaysHtml(PrevYM.y, PrevYM.m) : jeDt.createDaysHtml(NextYM.y, NextYM.m);
                });
            });
            //时分秒事件绑定
            var hmsStr = jeDt.setStrhms(), hmsevents = function(hmsArr) {
                jeDt.each(hmsArr, function(i, hmsCls) {
                    if (jeDt.html(hmsCls[0]) == "") jeDt.html(hmsCls[0], hmsStr[i]);
                });
                if (ishhmmss) {
                    jeDt.isShow(jeDt.find(".jedatehmsclose")[0], false);
                    jeDt.isShow(jeDt.find(".jedatetodaymonth")[0], false);
                } else {
                    jeDt.isShow(jeDt.find(".jedateprophms")[0], true);
                }
                //计算当前时分秒的位置
                jeDt.each([ "hours", "minutes", "seconds" ], function(i, hms) {
                    var hmsCls = jeDt.find(".jedateprop" + hms), achmsCls = jeDt.find(".jedateprop"+hms+" .action");
                    hmsCls[0].scrollTop = achmsCls[0].offsetTop - 118;
                    var onhmsPCls = jeDt.find(".jedateprop" + hms + " p");
                    jeDt.bind(onhmsPCls, "click", function() {
                        var that = this;
                        if (jeDt.hasClass(that, "disabled")) return;
                        jeDt.each(onhmsPCls, function(j, cls) {
                            jeDt.removeClass(cls, "action");
                        })
                        jeDt.addClass(that, "action");
                        jeDt.val(jeDt.find(".jedatebot .jedatehms input")[i], jeDt.digit(jeDt.text(that)));
                        if (!ishhmmss) jeDt.isShow(jeDt.find(".jedateprophms")[0], false);
                    });
                });
            };
            var hs = jeDt.find(".jedateprophours"), ms = jeDt.find(".jedatepropminutes"), ss = jeDt.find(".jedatepropseconds");
            if (ishhmmss) {
                hmsevents([ hs, ms, ss ]);
            } else {
                jeDt.bind(jeDt.find(".jedatehms"), "click", function() {
                    if (jeDt.find(".jedateprophms")[0].style.display !== "block") hmsevents([ hs, ms, ss ]);
                    //关闭时分秒层
                    jeDt.bind(jeDt.find(".jedateprophms .jedatehmsclose"), "click", function() {
                        jeDt.isShow(jeDt.find(".jedateprophms")[0], false);
                    });
                });
            }
            //今天按钮设置日期时间
            jeDt.bind(jeDt.find(".jedatebot .jedatetodaymonth"), "click", function() {
                var toTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ],
                    gettoDate = jeDt.parse([ toTime[0], toTime[1], toTime[2] ], [ toTime[3], toTime[4], toTime[5] ], jeDt.format),
                    valcell = jeDt.elemCell;
                jeDt.createDaysHtml(toTime[0], toTime[1]);
                jeDt.isValHtml(valcell) ? jeDt.val(valcell, gettoDate) :jeDt.text(valcell, gettoDate);
                jeDt.dateClose();
                if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell,gettoDate);
                if (!isYYMM) jeDt.chooseDays();
            });
        }else{
            var valcell = jeDt.elemCell;
            jeDt.ymPremNextEvents();
            //本月按钮设置日期时间
            jeDt.bind(jeDt.find(".jedatebot .jedatetodaymonth"), "click", function(ev) {
                jeDt.stopmp(ev);
                var ymTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate() ],
                    YMDate = jeDt.parse([ ymTime[0], ymTime[1], 0 ], [ 0, 0, 0 ], jeDt.format);
                jeDt.isValHtml(valcell) ? jeDt.val(valcell, YMDate) :jeDt.text(valcell, YMDate);
                jeDt.dateClose();
                if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell,YMDate);
            });
        }
        //检查时间输入值，并对应到相应位置
        jeDt.bind(jeDt.find(".jedatehms input"), "keyup", function() {
            var that = this, thatval = that.value, hmsVal = parseInt(jeDt.attr(that, "numval")), thatitem = parseInt(jeDt.attr(that, "item"));
            jeDt.val(that, thatval.replace(/\D/g,""));
            //判断输入值是否大于所设值
            if(that.value > hmsVal){
                jeDt.val(that, hmsVal);
                alert("输入值不能大于"+hmsVal);
            }
            if(this.value == "") jeDt.val(that, "00");
            jeDt.each(jeDt.find(".jedatehmscon")[thatitem].childNodes,function(i,cls){
                jeDt.removeClass(cls,"action");
            })
            jeDt.addClass(jeDt.find(".jedatehmscon")[thatitem].childNodes[parseInt(that.value.replace(/^0/g,''))],"action");
            jeDt.each([ "hours", "minutes", "seconds" ], function(i, hms) {
                var hmsCls = jeDt.find(".jedateprop" + hms), achmsCls = jeDt.find(".jedateprop" + hms + " .action");
                hmsCls[0].scrollTop = achmsCls[0].offsetTop - 118;
            });
        });
        //清空按钮清空日期时间
        jeDt.bind(jeDt.find(".jedatebot .jedateclear"), "click", function(ev) {
            jeDt.stopmp(ev);
            var valcell = jeDt.elemCell, clearVal = jeDt.isValHtml(valcell) ? jeDt.val(valcell) :jeDt.text(valcell);
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, "") :jeDt.text(valcell, "");
            jeDt.dateClose();
            if (clearVal != "") {
                if (jeDt.isBool(jeDt.opts.clearRestore)){
                    jeDt.opts.minDate = jeDt.opts.startMin || config.startMin;
                    jeDt.opts.maxDate = jeDt.opts.startMax || config.startMax;
                }
                if (jeDt.isType(jeDt.opts.clearfun, "function") || jeDt.opts.clearfun != null) jeDt.opts.clearfun(jeDt.elemCell,clearVal);
            }
        });
        //确认按钮设置日期时间
        jeDt.bind(jeDt.find(".jedatebot .jedateok"), "click", function(ev) {
            jeDt.stopmp(ev);
            var valcell = jeDt.elemCell, isValtext = (jeDt.val(valcell) || jeDt.text(valcell)) != "", isYYYY = jeDt.checkFormat(jeDt.format) == "YYYY", okVal = "",
            //获取时分秒的数组
                eachhmsem = function() {
                    var hmsArr = [];
                    jeDt.each(jeDt.find(".jedatehms input"), function(l, emval) {
                        hmsArr.push(jeDt.val(emval));
                    });
                    return hmsArr;
                };
            if (isValtext) {
                var btnokVal = jeDt.isValHtml(valcell) ? jeDt.val(valcell) :jeDt.text(valcell), oktms = btnokVal.match(ymdMacth);
                if (!isYYMM) {
                    var okTimeArr = eachhmsem(), okTime = [ parseInt(jeDt.attr(jedateyear[0], "year")), parseInt(jeDt.attr(jedatemonth[0], "month")), oktms[2] ];
                    okVal = isValtext ? jeDt.parse([ okTime[0], okTime[1], okTime[2] ], [ okTimeArr[0], okTimeArr[1], okTimeArr[2] ], jeDt.format) :"";
                    if(!ishhmmss)jeDt.createDaysHtml(okTime[0], okTime[1]);
                    jeDt.chooseDays();
                } else {
                    var ymactCls = isYYYY ? jeDt.find(".jedayy .action")[0] : jeDt.find(".jedaym .action")[0];
                    //判断是否为（YYYY或YYYY-MM）类型
                    if(isYYYY){
                        var okDate = ymactCls ? jeDt.attr(ymactCls, "yy").match(ymdMacth) : oktms;
                        okVal = jeDt.parse([parseInt(okDate[0]), newDate.getMonth() + 1, 1], [0, 0, 0], jeDt.format);
                    }else {
                        var jedYM = ymactCls ? jeDt.attr(ymactCls, "ym").match(ymdMacth) : oktms;
                        okVal = jeDt.parse([parseInt(jedYM[0]), parseInt(jedYM[1]), 1], [0, 0, 0], jeDt.format);
                    }
                }
            } else {
                var okArr = eachhmsem(), monthCls = jeDt.find(".jedateyearmonth")[0], okDate = "";
                if (ishhmmss) {
                    okVal = jeDt.parse([ tmsArr[0], tmsArr[1], tmsArr[2] ], [ okArr[0], okArr[1], okArr[2] ], jeDt.format);
                } else {
                    if(isYYMM){
                        okDate = jeDt.checkFormat(jeDt.format) == "YYYY" ? jeDt.attr(monthCls, "data-onyy").match(ymdMacth) : jeDt.attr(monthCls, "data-onym").match(ymdMacth);
                    }else{
                        okDate = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];
                    }
                    okVal = isYYYY ? jeDt.parse([parseInt(okDate[0]), newDate.getMonth() + 1, 1], [0, 0, 0], jeDt.format) :
                        jeDt.parse([parseInt(okDate[0]), parseInt(okDate[1]), newDate.getDate()], [okArr[0], okArr[1], okArr[2]], jeDt.format);
                }
            }
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, okVal) :jeDt.text(valcell, okVal);
            jeDt.dateClose();
            if (jeDt.isType(jeDt.opts.okfun, "function") || jeDt.opts.okfun != null) jeDt.opts.okfun(jeDt.elemCell,okVal);
        });
        //点击空白处隐藏
        jeDt.bind(document, "mouseup", function(ev) {
            jeDt.stopmp(ev);
            var box = QD(jeDt.boxCell)[0];
            if (box && box.style.display !== "none")  doc.body.removeChild(box);
        });
        jeDt.bind(QD(jeDt.boxCell), "mouseup", function(ev) {
            jeDt.stopmp(ev);
        });
    }
    //核心部分
    var jeDate = function(options) {
        try {
            jeDt.event = window.event ? window.event :jeDate.caller.arguments[0];
        } catch (e) {}
        return new jeDt.initDate(options || {});
    };
    //版本
    jeDate.version = "3.4";
    //返回指定日期
    jeDate.now = function(num) {
        return jeDt.nowDate(num);
    };
    //为当前获取到的日期加减天数，这里只能控制到天数，不能控制时分秒加减
    jeDate.addDate = function(time,num,type) {
        num = num | 0;   type = type || "DD";
        return jeDt.addDateTime(time,num,type,jeDt.format);
    };
    return jeDate;
});
