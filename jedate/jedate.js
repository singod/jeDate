/**
 @Name : jeDate v3.0 日期控件
 @Author: chen guojun
 @Date: 2016-8-1
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
            return emText;
        }
        return this;
    };
    //获取与设置value
    jeDt.val = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            elem.value = value;
        } else {
            return elem.value;
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
    //补齐数位
    jeDt.digit = function(num) {
        return num < 10 ? "0" + (num | 0) :num;
    };
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
        var dateArr = date.match(/\w+|d+/g);
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
    //初始化日期
    jeDt.nowDate = function(timestamp, format) {
        var De = new Date(timestamp | 0 ? function(tamp) {
            return tamp < 864e5 ? +new Date() + tamp * 864e5 :tamp;
        }(parseInt(timestamp)) :+new Date());
        return jeDt.parse([ De.getFullYear(), De.getMonth() + 1, De.getDate() ], [ De.getHours(), De.getMinutes(), De.getSeconds() ], format);
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
            case "01.01": str = "元旦"; break;
            case "02.14": str = "情人"; break;
            case "03.08": str = "妇女"; break;
            case "05.01": str = "劳动"; break;
            case "06.01": str = "儿童"; break;
            case "08.01": str = "建军"; break;
            case "09.10": str = "教师"; break;
            case "10.01": str = "国庆"; break;
            case "12.24": str = "平安"; break;
            case "12.25": str = "圣诞"; break;
            default: str = n; break;
        }
        return str;
    };
    var config = {
        format:"YYYY-MM-DD hh:mm:ss", //日期格式
        minDate:"1900-01-01 00:00:00", //最小日期
        maxDate:"2099-12-31 23:59:59" //最大日期
    };
    jeDt.index = Math.floor(Math.random() * 9e3);
    jeDt.boxCell = "#jedatebox";
    jeDt.find = function(tagName){
        return QD(jeDt.boxCell + " " +tagName);
    };
    jeDt.isBool = function(obj){  return (obj == undefined || obj == true ?  true : false); };
    //初始化控件
    jeDt.initDate = function(opts) {
        var even = jeDt.event, target, isinitVal = (opts.isinitVal == undefined || opts.isinitVal == false) ? false : true;
        try {
            target = even.target || even.srcElement || {};
        } catch (e) {
            target = {};
        }
        //创建控件骨架外层
        var createDiv = function(disCell, self, dis) {
            if (QD(self)[0]) return;
            jeDt.opts = opts, jeDt.format = opts.format || config.format, minTime = jeDt.opts.minDate || config.minDate, maxTime = jeDt.opts.maxDate || config.maxDate;
            if(/\YYYY-MM-DD/.test(jeDt.checkFormat(jeDt.format))){
                jeDt.checkDate(minTime) ? jeDt.minDate = minTime : alert("最小日期不合法");
                jeDt.checkDate(maxTime) ? jeDt.maxDate = maxTime : alert("最大日期不合法");
            }else{
                jeDt.minDate = minTime, jeDt.maxDate = maxTime;
            }
            var dateDiv = doc.createElement("div"), zIndex = opts.zIndex == undefined ? 999 : opts.zIndex;
            dateDiv.className = "jedatebox";
            dateDiv.id = jeDt.boxCell.replace(/\#/g,"");
            if(opts.isDisplay) jeDt.attr(dateDiv, "date", true);
            dateDiv.style.cssText = (dis == true ? "" : "z-index:" + zIndex) + ";position:" + (dis == true ? "relative" :"absolute") + ";display:block;";
            disCell.appendChild(dateDiv);
        }, initVals = function(elem) {
            var nowDateVal = jeDt.nowDate(null, opts.format || config.format);
            (jeDt.val(elem) || jeDt.text(elem)) == "" ? jeDt.isValHtml(elem) ? jeDt.val(elem, nowDateVal) :jeDt.text(elem, nowDateVal) :jeDt.isValHtml(elem) ? jeDt.val(elem) :jeDt.text(elem);
        };

        if (isinitVal) {
            jeDt.each(QD("body "+ opts.dateCell), function(i, elem) {
                initVals(elem);
            });
        }

        if (even && target.tagName) {
            jeDt.stopmp(even);
            createDiv(doc.body, jeDt.boxCell, false);
            jeDt.elemCell = typeof (opts.dateCell) == "string" ? QD(opts.dateCell)[0] : opts.dateCell;
            jeDt.setHtml();
        } else {
            jeDt.bind(QD(opts.dateCell), "click", function (ev) {
                jeDt.stopmp(ev);
                createDiv(doc.body, jeDt.boxCell, false);
                jeDt.elemCell = this;
                jeDt.setHtml();
            });
        }
    };
    //方位辨别
    jeDt.orien = function(obj, self, pos) {
        var tops, ris, rect = self.getBoundingClientRect();
        leris = rect.right + obj.offsetWidth / 1.5 >= jeDt.winarea(1) ? rect.right - obj.offsetWidth :rect.left + (pos ? 0 :jeDt.docScroll(1));
        tops = rect.bottom + obj.offsetHeight / 1 <= jeDt.winarea() ? rect.bottom - 1 :rect.top > obj.offsetHeight / 1.5 ? rect.top - obj.offsetHeight - 1 :jeDt.winarea() - obj.offsetHeight;
        obj.style.left = leris + "px";
        obj.style.top = Math.max(tops + (pos ? 0 :jeDt.docScroll()) + 1, 1) + "px";
    };
    //布局控件骨架
    jeDt.setHtml = function() {
        var weekHtml = "", tmsArr = "", date = new Date(), nowDateVal = jeDt.nowDate(null, jeDt.format),   dateFormat = jeDt.checkFormat(jeDt.format),
            isYYMM = dateFormat == "YYYY-MM" ? true :false,  ishhmm = dateFormat.substring(0, 5) == "hh-mm" ? true :false,
            initVal = jeDt.opts.isinitVal ? jeDt.isValHtml(jeDt.elemCell) ? jeDt.val(jeDt.elemCell) :jeDt.text(jeDt.elemCell) :(jeDt.val(jeDt.elemCell) || jeDt.text(jeDt.elemCell)) == "" ? nowDateVal :jeDt.isValHtml(jeDt.elemCell) ? jeDt.val(jeDt.elemCell) :jeDt.text(jeDt.elemCell);
        if ((jeDt.val(jeDt.elemCell) || jeDt.text(jeDt.elemCell)) == "") {
            jeDt.currDate = date;
            tmsArr = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ];
            jeDt.ymdDate = tmsArr[0] + "-" + jeDt.digit(tmsArr[1]) + "-" + jeDt.digit(tmsArr[2]);
        } else {
            var inVals = initVal.match(ymdMacth);
            if(ishhmm){
                tmsArr = dateFormat == "hh-mm" ? [ inVals[0], inVals[1], date.getSeconds() ] :[ inVals[0], inVals[1], inVals[2] ];
                jeDt.currDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }else{
                tmsArr = [ inVals[0], inVals[1], inVals[2], inVals[3], inVals[4], inVals[5] == undefined ? date.getSeconds() :inVals[5] ];
                jeDt.currDate = new Date(inVals[0], inVals[1], inVals[2]);
                jeDt.ymdDate = tmsArr[0] + "-" + jeDt.digit(tmsArr[1]) + "-" + jeDt.digit(tmsArr[2]);
            }
        }
        if(!ishhmm) jeDt.currMonth = (jeDt.val(jeDt.elemCell) || jeDt.text(jeDt.elemCell)) == "" ? jeDt.currDate.getMonth() : jeDt.currDate.getMonth() - 1;
        //控件HMTL模板
        var datetopStr = '<div class="jedatetop">' + (!isYYMM ? '<div class="jedateym" style="width:50%;"><i class="prev triangle yearprev"></i><span class="jedateyy" ym="24"><em class="jedateyear"></em><em class="pndrop"></em></span><i class="next triangle yearnext"></i></div>' + '<div class="jedateym" style="width:50%;"><i class="prev triangle monthprev"></i><span class="jedatemm" ym="12"><em class="jedatemonth"></em><em class="pndrop"></em></span><i class="next triangle monthnext"></i></div>' :'<div class="jedateym" style="width:100%;"><i class="prev triangle ymprev"></i><span class="jedateyy"><em class="jedateyearmonth"></em></span><i class="next triangle ymnext"></i></div>') + "</div>";
        var dateymList = !isYYMM ? '<div class="jedatetopym" style="display: none;">' + '<ul class="ymdropul"></ul><p><span class="jedateymchle">&#8592;</span><span class="jedateymchri">&#8594;</span><span class="jedateymchok">关闭</span></p>' + "</div>" :'<ul class="jedaym"></ul>';
        var dateriList = '<ol class="jedaol"></ol><ul class="jedaul"></ul>';
        var bothmsStr = !isYYMM ? '<div class="botflex jedatehmsshde"><ul class="jedatehms"><li><input type="text" /></li><i>:</i><li><input type="text" /></li><i>:</i><li><input type="text" /></li></ul></div>' + '<div class="botflex jedatebtn"><span class="jedateok">确认</span><span class="jedatetodaymonth">今天</span><span class="jedateclear">清空</span></div>' :'<div class="botflex jedatebtn"><span class="jedateok">确认</span><span class="jedatetodaymonth">本月</span><span class="jedateclear">清空</span></div>';
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
            jeDt.getDateStr(jeDt.currDate.getFullYear(), jeDt.currMonth);
            jeDt.chooseYM();
        };
        if(isYYMM){
            jeDt.html(jeDt.find(".jedaym")[0], jeDt.onlyYMStr(tmsArr[0], tmsArr[1]));
            jeDt.text(jeDt.find(".jedateym .jedateyearmonth")[0], tmsArr[0] + "年" + jeDt.digit(tmsArr[1]) + "月");
            jeDt.onlyYMevents(tmsArr);
        }
        jeDt.orien(QD(jeDt.boxCell)[0], jeDt.elemCell);
        jeDt.events(tmsArr);
    };
    //仅年月（YYYY-MM）
    jeDt.onlyYMStr = function(y, m) {
        var onlyYM = "";
        jeDt.each(jeDt.montharr, function(i, val) {
            var minArr = jeDt.parseMatch(jeDt.minDate), maxArr = jeDt.parseMatch(jeDt.maxDate),
                thisDate = new Date(y, jeDt.digit(val), "01"), minTime = new Date(minArr[0], minArr[1], minArr[2]), maxTime = new Date(maxArr[0], maxArr[1], maxArr[2]);
            if (thisDate < minTime || thisDate > maxTime) {
                onlyYM += "<li class='disabled' " + (m == val ? 'class="action"' :"") + ' data-onym="' + y + "-" + jeDt.digit(val) + '">' + y + "年" + jeDt.digit(val) + "月</li>";
            } else {
                onlyYM += "<li " + (m == val ? 'class="action"' :"") + ' data-onym="' + y + "-" + jeDt.digit(val) + '">' + y + "年" + jeDt.digit(val) + "月</li>";
            }
        });
        return onlyYM;
    };
    //仅年月情况下的点击
    jeDt.onlyYMevents = function(tmsArr) {
        var ymPre = jeDt.find(".jedateym .ymprev"), ymNext = jeDt.find(".jedateym .ymnext"), ony = parseInt(tmsArr[0]), onm = parseFloat(tmsArr[1]);
        jeDt.each([ ymPre, ymNext ], function(i, cls) {
            jeDt.bind(cls, "click", function(ev) {
                if (jeDt.hasClass(cls, "disabled")) return;
                jeDt.stopmp(ev);
                var ym = cls == ymPre ? ony -= 1 :ony += 1;
                jeDt.html(jeDt.find(".jedaym")[0], jeDt.onlyYMStr(ym, onm));
                jeDt.events(tmsArr);
            });
        });
    };
    //循环生成日历
    jeDt.getDateStr = function(y, m) {
        var minArr = jeDt.minDate.match(/\w+|d+/g), minNum = minArr[0] + minArr[1] + minArr[2], maxArr = jeDt.maxDate.match(/\w+|d+/g), maxNum = maxArr[0] + maxArr[1] + maxArr[2];
        jeDt.html(jeDt.find(".jedaul")[0], ""); //切忌一定要把这个内容去掉，要不然会点一次翻页都在日历下面依次显示出来
        var activeDate = new Date(y, m, 1); //外面传进来的不断变化的日期对象
        var year = activeDate.getFullYear(), month = activeDate.getMonth(); //把当前的月份保存下来只是为了给title获取月份
        jeDt.attr(jeDt.find(".jedateyear")[0], "year", month > 11 ? year + 1 : year), jeDt.text(jeDt.find(".jedateyear")[0], (month > 11 ? year + 1 : year) + '年');
        jeDt.attr(jeDt.find(".jedatemonth")[0], "month", jeDt.digit(month + 1)), jeDt.text(jeDt.find(".jedatemonth")[0], jeDt.digit(month + 1) + '月');
        //设置时间标注
        var mark = function (my, mm, md) {
            var Marks = jeDt.opts.marks, contains = function(arr, obj) {
                var len = arr.length;
                while (len--) {
                    if (arr[len] === obj) return true;
                }
                return false;
            };
            return jeDt.isType(Marks, "array") && Marks.length > 0 && contains(Marks, my + "-" + mm + "-" + md) ? '<i class="marks"></i>' :"";
        }
        //是否显示节日
        var isfestival = function(day, n) {
            return jeDt.opts.festival ? jeDt.festival(day, n) :n;
        };
        //创建日历上面的日期行数
        var line = 1 - activeDate.getDay();
        if (line == 1) line = -6; //为了日历更友好的显示三个月，让用户看的更明白。
        activeDate.setDate(line); //如果n为负数，则减少月份.在用这个月最后一天减去这个值就可以获得日历从哪天开始的。
        for (var i = 0; i < 42; i++) {
            var cLis = document.createElement('li');
            var actYear = activeDate.getFullYear(), actMonth = activeDate.getMonth(), actDays = activeDate.getDate(), //返回日期1-31号
                newMonth = month > actMonth ? 0 == actMonth ? 1 : month : actMonth == month ? month + 1 : 11 == actMonth ? 12 : month + 2,
                newYear = actYear == year ? year : actYear > year ? year + 1 : year - 1;
            jeDt.find(".jedaul")[0].appendChild(cLis);
            jeDt.html(cLis, isfestival(jeDt.digit(newMonth) + "." + jeDt.digit(actDays), jeDt.digit(actDays)) + mark(newYear,jeDt.digit(newMonth),jeDt.digit(actDays)));
            jeDt.attr(cLis, "year", newYear).attr(cLis, "month", jeDt.digit(newMonth)).attr(cLis, "day", jeDt.digit(actDays));
            //这里必须是 actMonth + 1 ，不能用m+1。因为这个是一直变化的。要不然日历不管点哪天都是属于当前月份的。
            cLis.dateVals = year + "-" + jeDt.digit(actMonth + 1) + "-" + jeDt.digit(actDays);
            var thatNum = (newYear + "-" + jeDt.digit(newMonth) + "-" + jeDt.digit(actDays)).replace(/\-/g, ''),
                newOne = newYear + "-" + jeDt.digit(newMonth) + "-" + jeDt.digit(1), actOne = year + "-" + jeDt.digit(actMonth + 1) + "-" + jeDt.digit(1);
            if (actMonth != month) {
                jeDt.addClass(cLis, "other"); //不是本月的天数颜色变成浅色
            }
            //判断是否在限制的日期之中，如果在限制中可以选择
            if (parseInt(thatNum) >= parseInt(minNum) && parseInt(thatNum) <= parseInt(maxNum) && actMonth == month) {
                if ((jeDt.val(jeDt.elemCell) || jeDt.text(jeDt.elemCell)) == "") {
                    var thatOne = jeDt.currDate.getFullYear() + "-" + jeDt.digit(jeDt.currDate.getMonth() + 1) + "-" + jeDt.digit(1);
                    if (jeDt.ymdDate == cLis.dateVals && (jeDt.currDate.getMonth() + 1 == actMonth + 1)) {
                        jeDt.addClass(cLis, "action");
                    } else if (thatOne != actOne) {
                        if (newOne == cLis.dateVals) jeDt.addClass(cLis, "action");
                    }
                } else {
                    var thisOne = jeDt.currDate.getFullYear() + "-" + jeDt.digit(jeDt.currDate.getMonth()) + "-" + jeDt.digit(1);
                    if (jeDt.ymdDate == cLis.dateVals && (jeDt.currDate.getMonth() == actMonth + 1)) {
                        jeDt.addClass(cLis, "action");
                    } else if (thisOne != actOne) {
                        if (newOne == cLis.dateVals) jeDt.addClass(cLis, "action");
                    }
                }
            }
            if (parseInt(minNum) > parseInt(thatNum) || parseInt(maxNum) < parseInt(thatNum)) {
                jeDt.addClass(cLis, "disabled");
            }
            //切忌下面这个增加天数语句，一定要判断完上面是不是本月的天数，然后在添加这条增加语句，要不然会出现错误。
            activeDate.setDate(actDays + 1); //如果超出该月份应有的天数则增加月份
        };
        jeDt.chooseDays();
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
                hmschoseW = jeDt.getStyle(proptextCls[0],'width').replace(/\px|em|rem/g,''), hmslival = Math.round(parseInt(hmsliWidth) + parseInt(hmsliWidth)/2 + parseInt(hmsiW)/2 +1);
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
                        readCls.style.display = "none";
                        readCls.previousSibling.style.display = "none";
                        proptextCls[i].style.display = propconCls[i].style.display = "none";
                    }
                }
                hmsStr += '<p class="' + hmsCls + '">' + h + "</p>";
            }
            hmsArr.push(hmsStr);
        });
        return hmsArr;
    };
    //关闭层
    jeDt.dateClose = function() {
        doc.body.removeChild(QD(jeDt.boxCell)[0]);
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
                    ymStr += "<li " + (getmonth == val ? 'class="action"' :"") + ' mm="' + val + '">' + val + "月</li>";
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
                var Years = jeDt.attr(this, "yy"), Months = parseInt(jeDt.attr(jedatemonth[0], "month")) - 1;
                jeDt.attr(year, "year", Years);
                jeDt.html(year, Years + '年');
                jeDt.isShow(jetopym[0], false);
                jeDt.getDateStr(Years, Months);
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
                var Years = jeDt.attr(jedateyear[0], "year"), Months = parseInt(jeDt.attr(this, "mm")) - 1;
                jeDt.attr(jedatemonth[0], "month", Months);
                jeDt.html(jedatemonth[0], Months + '月');
                jeDt.isShow(jetopym[0], false);
                jeDt.getDateStr(Years, Months);
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
    //各种事件绑定
    jeDt.events = function(tmsArr) {
        var newDate = new Date(), yPre = jeDt.find(".yearprev"), yNext = jeDt.find(".yearnext"),
            mPre = jeDt.find(".monthprev"), mNext = jeDt.find(".monthnext"),
            jedateyear = jeDt.find(".jedateyear"), jedatemonth = jeDt.find(".jedatemonth"),
            isYYMM = jeDt.checkFormat(jeDt.format) == "YYYY-MM" ? true :false,
            ishhmmss = jeDt.checkFormat(jeDt.format).substring(0, 5) == "hh-mm" ? true :false;
        if (!isYYMM) {
            //切换年
            !ishhmmss && jeDt.each([ yPre, yNext ], function(i, cls) {
                jeDt.bind(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    var year = parseInt(jeDt.attr(jeDt.find(".jedateyear")[0], "year"));
                    cls == yPre ? jeDt.getDateStr(--year, jeDt.currMonth) : jeDt.getDateStr(++year, jeDt.currMonth);
                });
            });
            //切换月
            !ishhmmss && jeDt.each([ mPre, mNext ], function(i, cls) {
                jeDt.bind(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    cls == mPre ?jeDt.getDateStr(jeDt.currDate.getFullYear(), --jeDt.currMonth) : jeDt.getDateStr(jeDt.currDate.getFullYear(), ++jeDt.currMonth);
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
            //今天
            jeDt.bind(jeDt.find(".jedatebot .jedatetodaymonth"), "click", function() {
                var toTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ],
                    gettoDate = jeDt.parse([ toTime[0], toTime[1], toTime[2] ], [ toTime[3], toTime[4], toTime[5] ], jeDt.format),
                    valcell = jeDt.elemCell;
                jeDt.getDateStr(toTime[0], toTime[1], toTime[2]);
                jeDt.isValHtml(valcell) ? jeDt.val(valcell, gettoDate) :jeDt.text(valcell, gettoDate);
                jeDt.dateClose();
                if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell,gettoDate);
                if (!isYYMM) jeDt.chooseDays();
            });
        }else{
            var valcell = jeDt.elemCell;
            //选择年月
            jeDt.bind(jeDt.find(".jedaym li"), "click", function(ev) {
                var that = this;
                if (jeDt.hasClass(that, "disabled")) return;
                jeDt.stopmp(ev);
                var atYM = jeDt.attr(this, "data-onym").match(/\w+|d+/g),
                    getYMDate = jeDt.parse([ atYM[0], atYM[1], 1 ], [ 0, 0, 0 ], jeDt.format);
                jeDt.isValHtml(valcell) ? jeDt.val(valcell, getYMDate) :jeDt.text(valcell, getYMDate);
                jeDt.dateClose();
                if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell,getYMDate);
            });
            //本月
            jeDt.bind(jeDt.find(".jedatebot .jedatetodaymonth"), "click", function(ev) {
                jeDt.stopmp(ev);
                var ymTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate() ],
                    YMDate = jeDt.parse([ ymTime[0], ymTime[1], 0 ], [ 0, 0, 0 ], jeDt.format);
                jeDt.isValHtml(valcell) ? jeDt.val(valcell, YMDate) :jeDt.text(valcell, YMDate);
                jeDt.dateClose();
                if (jeDt.isType(jeDt.opts.choosefun, "function") || jeDt.opts.choosefun != null) jeDt.opts.choosefun(jeDt.elemCell,YMDate);
            });
        };
        //检查时间输入值，并对应到相应位置
        jeDt.bind(jeDt.find(".jedatehms input"), "keyup", function() {
            var that = this, thatval = that.value, hmsVal = parseInt(jeDt.attr(that, "numval")), thatitem = parseInt(jeDt.attr(that, "item"));
            jeDt.val(that, thatval.replace(/\D/g,""));
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
        })
        //清空
        jeDt.bind(jeDt.find(".jedatebot .jedateclear"), "click", function(ev) {
            jeDt.stopmp(ev);
            var valcell = jeDt.elemCell, clearVal = jeDt.isValHtml(valcell) ? jeDt.val(valcell) :jeDt.text(valcell);
            jeDt.isValHtml(valcell) ? jeDt.val(valcell, "") :jeDt.text(valcell, "");
            jeDt.dateClose();
            if (clearVal != "") {
                if (jeDt.isType(jeDt.opts.clearfun, "function") || jeDt.opts.clearfun != null) jeDt.opts.clearfun(jeDt.elemCell[0],clearVal);
            }
        });
        //确认
        jeDt.bind(jeDt.find(".jedatebot .jedateok"), "click", function(ev) {
            jeDt.stopmp(ev);
            var valcell = jeDt.elemCell, isValtext = (jeDt.val(valcell) || jeDt.text(valcell)) != "",
                eachhmsem = function() {
                    var hmsArr = [];
                    jeDt.each(jeDt.find(".jedatehms input"), function(l, emval) {
                        hmsArr.push(jeDt.val(emval));
                    });
                    return hmsArr;
                };
            if (isValtext) {
                var jedCell = isYYMM ? jeDt.find(".jedaym li") : jeDt.find(".jedaul li"),
                    btnokVal = jeDt.isValHtml(valcell) ? jeDt.val(valcell) :jeDt.text(valcell),
                    oktms = btnokVal.match(/\w+|d+/g);
                if (!isYYMM) {
                    var okTimeArr = eachhmsem(), okTime = [ parseInt(jeDt.attr(jedateyear[0], "year")), parseInt(jeDt.attr(jedatemonth[0], "month")), oktms[2] ];
                    var okVal = isValtext ? jeDt.parse([ okTime[0], okTime[1], okTime[2] ], [ okTimeArr[0], okTimeArr[1], okTimeArr[2] ], jeDt.format) :"";
                    if(!ishhmmss)jeDt.getDateStr(okTime[0], okTime[1]);
                } else {
                    var jedYM = isValtext ? jeDt.attr(jeDt.find(".jedaym .action")[0], "data-onym").match(/\w+|d+/g) :"",
                        okVal = isValtext ? jeDt.parse([ jedYM[0], jedYM[1], 1 ], [ 0, 0, 0 ], jeDt.format) :"";
                }
                if (ishhmmss) {
                    jeDt.isValHtml(valcell) ? jeDt.val(valcell, okVal) :jeDt.text(valcell, okVal);
                } else {
                    jeDt.each(jedCell, function(i, cls) {
                        if (jeDt.attr(cls, "class") == "action") {
                            jeDt.isValHtml(valcell) ? jeDt.val(valcell, okVal) :jeDt.text(valcell, okVal);
                        }
                    });
                }
                jeDt.dateClose();
                if (okVal != "") {
                    if (jeDt.isType(jeDt.opts.okfun, "function") || jeDt.opts.okfun != null) jeDt.opts.okfun(jeDt.elemCell,okVal);
                }
                if (!isYYMM) jeDt.chooseDays();
            } else {
                var okArr = eachhmsem(), okVal = "";
                if (ishhmmss) {
                    okVal = jeDt.parse([ tmsArr[0], tmsArr[1], tmsArr[2] ], [ okArr[0], okArr[1], okArr[2] ], jeDt.format);
                } else {
                    var okDate = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), okArr[0], okArr[1], okArr[2] ],
                        okVal = jeDt.parse([ okDate[0], okDate[1], okDate[2] ], [ okDate[3], okDate[4], okDate[5] ], jeDt.format);
                }
                jeDt.isValHtml(valcell) ? jeDt.val(valcell, okVal) :jeDt.text(valcell, okVal);
                jeDt.dateClose();
            }
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
    };

    //核心部分
    var jeDate = function(options) {
        try {
            jeDt.event = window.event ? window.event :jeDate.caller.arguments[0];
        } catch (e) {}
        return new jeDt.initDate(options || {});
    };
    //版本
    jeDate.version = "3.0";
    //返回指定日期
    jeDate.now = function(num) {
        if(typeof num === "string"){
            var newDate = new Date(parseInt(num) * 1e3);
        }else{
            num = num | 0;
            var newDate = new Date(), todayTime = newDate.getTime() + 1000*60*60*24*num;
            newDate.setTime(todayTime);
        }
        var years = newDate.getFullYear(), months = newDate.getMonth() + 1, days = newDate.getDate(), hh = newDate.getHours(), mm = newDate.getMinutes(), ss = newDate.getSeconds();
        return years+"-"+jeDt.digit(months)+"-"+jeDt.digit(days)+" "+jeDt.digit(hh)+":"+jeDt.digit(mm)+":"+jeDt.digit(ss);
    };
    //为当前获取到的日期加减天数，这里只能控制到天数，不能控制时分秒加减
    jeDate.addDate = function(time,num,type) {
        num = num | 0;   type = type || "DD";
        var tarr = time.match(ymdMacth), date = new Date(), addNum,
            tm0 = parseInt(tarr[0]),  tm1 = tarr[1] == undefined ? date.getMonth() + 1 : parseInt(tarr[1]), tm2 = tarr[2] == undefined ? date.getDate() : parseInt(tarr[2]),
            tm3 = tarr[3] == undefined ? date.getHours() : parseInt(tarr[3]), tm4 = tarr[4] == undefined ? date.getMinutes() : parseInt(tarr[4]), tm5 = tarr[5] == undefined ? date.getMinutes() : parseInt(tarr[5]),
            newDate = new Date(tm0,jeDt.digit(tm1),jeDt.digit(tm2),jeDt.digit(tm3),jeDt.digit(tm4),jeDt.digit(tm5));
        switch (type){
            case "DD": addNum = 1000*60*60*24*num; break;
            case "hh": addNum = 1000*60*60*num; break;
            case "mm": addNum = 1000*60*num; break;
        }
        newDate.setTime(newDate.getTime() + addNum);
        return jeDt.parse([ newDate.getFullYear(), newDate.getMonth(), newDate.getDate() ], [ newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ], jeDt.format);
    };
    return jeDate;
});
