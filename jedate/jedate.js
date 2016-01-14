/**
 @Name : jeDate v2.0 日期控件
 @Author: chne guojun
 @Date: 2015-12-28
 @QQ群：516754269
 @Site：https://github.com/singod/jeDate
 */
(function(win) {
    var jeDt = {}, doc = document, Cell = "#jedatebox";
    /* (tag), (#id), (.className) ,(tag > .className) ,(tag > tag) ,(#id > tag.className) ,
	   (.className tag) ,(tag, tag, #id) ,(tag#id.className) ,(span > * > b) ,(input[name=radio]) 
	*/
    var QD = jeDt.query =function(){function r(c,g){g=g||document;if(!/^[\w\-_#]+$/.test(c)&&g.querySelectorAll)return m(g.querySelectorAll(c));if(-1<c.indexOf(",")){for(var d=c.split(/,/g),a=[],b=0,e=d.length;b<e;++b)a=a.concat(r(d[b],g));return y(a)}var d=c.match(z),a=d.pop(),e=(a.match(t)||k)[1],f=!e&&(a.match(u)||k)[1],b=!e&&(a.match(v)||k)[1],a=c.match(/\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\]/g);if(f&&!a&&!b&&g.getElementsByClassName)b=m(g.getElementsByClassName(f));else{b=!e&&m(g.getElementsByTagName(b||"*"));f&&(b=w(b,"className",RegExp("(^|\\s)"+f+"(\\s|$)")));if(e)return(d=g.getElementById(e))?[d]:[];if(a)for(e=0;e<a.length;e++)var f=(a[e].match(x)||k)[1],h=(a[e].match(x)||k)[2],h=h.replace(/\'/g,"").replace(/\-/g,"\\-").replace(/\[/g,"\\[").replace(/\]/g,"\\]"),b=w(b,f,RegExp("(^"+h+"$)"))}return d[0]&&b[0]?p(d,b):b}function m(c){try{return Array.prototype.slice.call(c)}catch(g){for(var d=[],a=0,b=c.length;a<b;++a)d[a]=c[a];return d}}function p(c,g,d){var a=c.pop();if("\x3e"===a)return p(c,g,!0);for(var b=[],e=-1,f=(a.match(t)||k)[1],h=!f&&(a.match(u)||k)[1],a=!f&&(a.match(v)||k)[1],m=-1,q,l,n,a=a&&a.toLowerCase();q=g[++m];){l=q.parentNode;do if(n=(n=(n=!a||"*"===a||a===l.nodeName.toLowerCase())&&(!f||l.id===f))&&(!h||RegExp("(^|\\s)"+h+"(\\s|$)").test(l.className)),d||n)break;while(l=l.parentNode);n&&(b[++e]=q)}return c[0]&&b[0]?p(c,b):b}function w(c,g,d){for(var a=-1,b,e=-1,f=[];b=c[++a];)d.test(b.getAttribute(g))&&(f[++e]=b);return f}var z=/(?:[\*\w\-\\.#]+)+(?:\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\])*|\*|>/gi,u=/^(?:[\w\-_]+)?\.([\w\-_]+)/,t=/^(?:[\w\-_]+)?#([\w\-_]+)/,v=/^([\w\*\-_]+)/,k=[null,null,null],x=/\[([\w\-_][^=]+)=([\'\[\]\w\-_]+)\]/,y=function(){var c=+new Date,g=function(){var d=1;return function(a){var b=a[c],e=d++;return b?!1:(a[c]=e,!0)}}();return function(d){for(var a=d.length,b=[],e=-1,f=0,h;f<a;++f)h=d[f],g(h)&&(b[++e]=h);c+=1;return b}}();return r}();
	
    jeDt.each = function(arr, fn) {
        var i = 0, len = arr.length;
        for (;i < len; i++) {
            if (fn(i, arr[i]) === false) {
                break;
            }
        }
    };
    jeDt.extend = function() {
        var _extend = function me(dest, source) {
            for (var name in dest) {
                if (dest.hasOwnProperty(name)) {
                    //当前属性是否为对象,如果为对象，则进行递归
                    if (dest[name] instanceof Object && source[name] instanceof Object) {
                        me(dest[name], source[name]);
                    }
                    //检测该属性是否存在
                    if (source.hasOwnProperty(name)) {
                        continue;
                    } else {
                        source[name] = dest[name];
                    }
                }
            }
        };
        var _result = {}, arr = arguments;
        //遍历属性，至后向前
        if (!arr.length) return {};
        for (var i = arr.length - 1; i >= 0; i--) {
            _extend(arr[i], _result);
        }
        arr[0] = _result;
        return _result;
    };
    jeDt.trim = function(str) {
        str = str || "";
        return str.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
    };
    jeDt.attr = function(elem, key, val) {
        if (typeof key === "string" && typeof val === 'undefined') {
            return elem.getAttribute(key);
        } else {
            elem.setAttribute(key, val);
        }
        return this;
    };
    jeDt.stopmp = function(e) {
        e = e || win.event;
        e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
        return this;
    };
    jeDt.getCss = function(obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        } else if (window.getComputedStyle) {
            return document.defaultView.getComputedStyle(obj)[name];
        }
        return null;
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
        elem.className = jeDt.trim(elem.className);
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
    //事件监听器
    jeDt.on = function(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            obj.attachEvent("on" + type, fn);
        } else {
            obj["on" + type] = fn;
        }
    };
    //阻断mouseup
    jeDt.stopMosup = function(evt, elem) {
        if (evt !== "mouseup") {
            jeDt.on(elem, "mouseup", function(ev) {
                jeDt.stopmp(ev);
            });
        }
    };
    jeDt.html = function(elem, value) {
        if (typeof value != "undefined" || value !== undefined && elem.nodeType === 1) {
            elem.innerHTML = value;
        } else {
            return elem.innerHTML;
        }
        return this;
    };
    jeDt.text = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            document.all ? elem.innerText = value :elem.textContent = value;
        } else {
            var emText = document.all ? elem.innerText :elem.textContent;
            return emText;
        }
        return this;
    };
    jeDt.val = function(elem, value) {
        if (value !== undefined && elem.nodeType === 1) {
            elem.value = value;
        } else {
            return elem.value;
        }
        return this;
    };
    jeDt.scroll = function(type) {
        type = type ? "scrollLeft" :"scrollTop";
        return doc.body[type] | doc.documentElement[type];
    };
    jeDt.winarea = function(type) {
        return doc.documentElement[type ? "clientWidth" :"clientHeight"];
    };
    //转换日期格式
    jeDt.parse = function(ymd, hms, format) {
        ymd = ymd.concat(hms);
        var format = format, _this = this;
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
            ymd.index = ++ymd.index | 0;
            return jeDt.digit(ymd[ymd.index]);
        });
    };
    //初始化日期
    jeDt.nowDate = function(timestamp, format) {
        var De = new Date(timestamp | 0 ? function(tamp) {
            return tamp < 864e5 ? +new Date() + tamp * 864e5 :tamp;
        }(parseInt(timestamp)) :+new Date());
        return jeDt.parse([ De.getFullYear(), De.getMonth() + 1, De.getDate() ], [ De.getHours(), De.getMinutes(), De.getSeconds() ], format);
    };
    jeDt.montharr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
    //判断元素类型
    jeDt.isValHtml = function(that) {
        return /textarea|input/.test(that.tagName.toLocaleLowerCase());
    };
    jeDt.weeks = [ "日", "一", "二", "三", "四", "五", "六" ];
    //节日
    jeDt.festival = function(md, n) {
        var str = "";
        switch (md) {
          case "01.01": str = "元旦"; break;
          case "02.14": str = "情人"; break;
          case "03.08": str = "妇女"; break;
          case "04.05": str = "清明"; break;
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
    //补齐数位
    jeDt.digit = function(num) {
        return num < 10 ? "0" + (num | 0) :num;
    };
    //显示隐藏层
    jeDt.shdeCell = function(type) {
        type ? QD(Cell)[0].style.display = "none" :QD(Cell)[0].style.display = "block";
    };

    var config = {
        dateCell:"#dateval",
        format:"YYYY-MM-DD hh:mm:ss", //日期格式
        minDate:"1900-01-01 00:00:00", //最小日期
        maxDate:"2099-12-31 23:59:59", //最大日期
        isinitVal:false, //是否初始化时间
        isTime:false, //是否开启时间选择
        isClear:true, //是否显示清空
        festival:false, //是否显示节日
        zIndex:999,  //弹出层的层级高度
        choosefun:function(val) {},  //选中日期后的回调
		clearfun:function(val) {},   //清除日期后的回调
		okfun:function(val) {}       //点击确定后的回调
    }, InitDate = function(options) {
        var that = this, newConf = JSON.parse(JSON.stringify(config));
        that.config = jeDt.extend(newConf, options);
        that.init();
    };
    var jeDate = function(options) {
        return new InitDate(options || {});
    };
    InitDate.prototype = {
        init:function() {
            var that = this, opts = that.config, self = QD(opts.dateCell)[0], elem, devt, even = window.event, target;
            var dateDiv = doc.createElement("div");
            if (!QD(Cell)[0]) {
                dateDiv.className = dateDiv.id = Cell.replace("#", "");
                dateDiv.style.zIndex = opts.zIndex;
                doc.body.appendChild(dateDiv);
            }
            try {
                target = even.target || even.srcElement || {};
            } catch (e) {
                target = {};
            }
            elem = opts.dateCell ? QD(opts.dateCell)[0] :target;
            var nowDateVal = jeDt.nowDate(null, opts.format);
            if (opts.isinitVal) {
                (jeDt.val(self) || jeDt.text(self)) == "" ? jeDt.isValHtml(self) ? jeDt.val(self, nowDateVal) :jeDt.text(self, nowDateVal) :jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);
            }
            if (even && target.tagName) {
                if (!elem || elem === jeDt.elem) return;
                jeDt.stopMosup(even.type, elem);
                jeDt.stopmp(even);
                that.setHtml(opts, self);
            } else {
                devt = opts.event || "click";
                jeDt.each((elem.length | 0) > 0 ? elem :[ elem ], function(ii, cel) {
                    jeDt.stopMosup(devt, that);
                    jeDt.on(cel, devt, function(ev) {
                        jeDt.stopmp(ev);
                        if (cel !== jeDt.elem) that.setHtml(opts, self);
                    });
                });
            }
        },
        setHtml:function(opts, self) {
            var that = this, weekHtml = "", date = new Date(), nowDateVal = jeDt.nowDate(null, opts.format), isformat = opts.format.match(/\w+|d+/g).join("-") == "YYYY-MM" ? true :false;
            var initVal = opts.isinitVal ? jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self) :(jeDt.val(self) || jeDt.text(self)) == "" ? nowDateVal :jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);
            if (jeDt.val(self) != "" || jeDt.text(self) != "") {
                var arrTime = initVal.match(/\d+/g);
            } else {
                var arrTime = [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ];
            }
            var topymSty = !isformat ? '<div class="jedateym" style="width:50%;"><i class="prev triangle yearprev"></i><span class="jedateyy" data-ym="24"><em class="jedateyear"></em><em class="pndrop"></em></span><i class="next triangle yearnext"></i></div>' + '<div class="jedateym" style="width:50%;"><i class="prev triangle monthprev"></i><span class="jedatemm" data-ym="12"><em class="jedatemonth"></em><em class="pndrop"></em></span><i class="next triangle monthnext"></i></div>' :'<div class="jedateym" style="width:100%;"><i class="prev triangle ymprev"></i><span class="jedateyy"><em class="jedateyearmonth"></em></span><i class="next triangle ymnext"></i></div>';
            var datetopStr = '<div class="jedatetop">' + topymSty + "</div>";
            var dateymList = !isformat ? '<div class="jedatetopym" style="display: none;">' + '<ul class="ymdropul"></ul><p><span class="jedateymchle">&#8592;</span><span class="jedateymchri">&#8594;</span><span class="jedateymchok">关闭</span></p>' + "</div>" :'<ul class="jedaym"></ul>';
            var dateriList = '<ol class="jedaol"></ol><ul class="jedaul"></ul>';
            var bothmsStr = !isformat ? '<ul class="botflex jedatehms"><li><em data-hms="24"></em><i>:</i></li><li><em data-hms="60"></em><i>:</i></li><li><em data-hms="60"></em></li></ul>' + '<div class="botflex jedatebtn"><span class="jedateclear" style="width:31%;">清空</span><span class="jedatetodaymonth" style="width:31%;">今天</span><span class="jedateok" style="width:31%;">确认</span></div>' :'<div class="botflex jedatebtn"><span class="jedateclear" style="width:31%;">清空</span><span class="jedatetodaymonth" style="width:31%;">本月</span><span class="jedateok" style="width:31%;">确认</span></div>';
            var datebotStr = '<div class="jedatebot">' + bothmsStr + "</div>";
            var dateHtmStr = isformat ? datetopStr + dateymList + datebotStr :datetopStr + dateymList + dateriList + datebotStr + '<div class="jedateprophms"></div>';
            jeDt.html(QD(Cell)[0], dateHtmStr);
            opts.isClear ? "" :QD(Cell + " .jedatebot .jedateclear")[0].style.display = "none";
            if (opts.isTime) {
                var dhmsArr = jeDt.val(self) != "" || jeDt.text(self) != "" ? [ arrTime[3], arrTime[4], arrTime[5] ] :[ date.getHours(), date.getMinutes() + 1, date.getSeconds() ];
                jeDt.each(QD(Cell + " .jedatebot .jedatehms em"), function(i, cls) {
                    jeDt.html(cls, jeDt.digit(dhmsArr[i]));
                });
            } else {
                if (!isformat) QD(Cell + " .jedatebot .jedatehms")[0].style.display = "none";
                QD(Cell + " .jedatebot .jedatebtn")[0].style.width = "100%";
            }
            if (!isformat) {
                for (var i = 0; i < jeDt.weeks.length; i++) {
                    weekHtml += '<li class="weeks" data-week="' + jeDt.weeks[i] + '">' + jeDt.weeks[i] + "</li>";
                }
                jeDt.html(QD(Cell + " .jedaol")[0], weekHtml);
                that.getDateStr(arrTime[0], arrTime[1], arrTime[2]);
                that.YearAndMonth(that, opts, self, arrTime);
            } else {
                jeDt.html(QD(Cell + " .jedaym")[0], that.onlyYMStr(arrTime[0], arrTime[1]));
                jeDt.text(QD(Cell + " .jedateym .jedateyearmonth")[0], arrTime[0] + "年" + jeDt.digit(arrTime[1]) + "月");
                that.onlyYMevents(that, opts, self, arrTime);
            }
            jeDt.shdeCell(false);
            that.orien(QD(Cell)[0], self);
            that.events(that, opts, self, arrTime);
        },
        onlyYMStr:function(y, m) {
            var onlyYM = "";
            jeDt.each(jeDt.montharr, function(i, val) {
                onlyYM += "<li " + (m == val ? 'class="action"' :"") + ' data-onym="' + y + "-" + jeDt.digit(val) + '">' + y + "年" + jeDt.digit(val) + "月</li>";
            });
            return onlyYM;
        },
        onlyYMevents:function(that, opts, self, arrTime) {
            var ymPre = QD(Cell + " .jedateym .ymprev")[0], ymNext = QD(Cell + " .jedateym .ymnext")[0], ony = parseInt(arrTime[0]), onm = parseInt(arrTime[1]);
            jeDt.each([ ymPre, ymNext ], function(i, cls) {
                jeDt.on(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    var ym = cls == ymPre ? ony -= 1 :ony += 1;
                    jeDt.html(QD(Cell + " .jedaym")[0], that.onlyYMStr(ym, onm));
                    that.events(that, opts, self, arrTime);
                });
            });
        },
        //方位辨别
        orien:function(obj, self, pos) {
            var tops, rect = self.getBoundingClientRect();
            obj.style.left = rect.left + (pos ? 0 :jeDt.scroll(1)) + "px";
            tops =  (rect.bottom + obj.offsetHeight / 1.5 <= jeDt.winarea()) ?
                rect.bottom - 1 : rect.top > obj.offsetHeight / 1.5 ? rect.top - obj.offsetHeight + 1 :jeDt.winarea() - obj.offsetHeight;
            obj.style.top = Math.max(tops + (pos ? 0 :jeDt.scroll()) + 1, 1) + "px";
        },
        getDateStr:function(y, m, d) {
            var that = this, opts = that.config, dayStr = "", m = jeDt.digit(m);
            jeDt.text(QD(Cell + " .jedateyear")[0], y + "年").attr(QD(Cell + " .jedateyear")[0], "data-year", y);
            jeDt.text(QD(Cell + " .jedatemonth")[0], m + "月").attr(QD(Cell + " .jedatemonth")[0], "data-month", m);
            //是否显示节日
            var isfestival = function(day, n) {
                return opts.festival ? jeDt.festival(day, n) :n;
            };
            var parseArr = function(str) {
                var timeArr = str.split(" ");
                return timeArr[0].split("-");
            };
            //先得到当前月第一天是星期几.
            var date = setMonthDays(y, m), weekday = new Date(y, parseInt(m) - 1, 1).getDay();
            //根据这个星期算前面几天的上个月最后几天.
            var pervLastDay = weekday != 0 ? weekday :weekday + 7;
            //得到上个月最后一天;
            var pervMonthlastDay = getPervMonthLastDay(y, m), currentMonthDays = getPervMonthLastDay(y, parseInt(m) + 1);
            //上月最后几天循环
            var lastdays = pervMonthlastDay - pervLastDay;
            //判断是否超出允许的日期范围	
            var startDay = 1, minArr = parseArr(opts.minDate), maxArr = parseArr(opts.maxDate), endDay = currentMonthDays, thisDate = new Date(y, m, d), firstDate = new Date(y, m, 1), lastDate = new Date(y, m, currentMonthDays), minTime = new Date(minArr[0], minArr[1], minArr[2]), maxTime = new Date(maxArr[0], maxArr[1], maxArr[2]), minDateDay = minTime.getDate();
            if (minTime > lastDate) {
                startDay = parseInt(currentMonthDays) + 1;
            } else if (minTime >= firstDate && minTime <= lastDate) {
                startDay = minDateDay;
            } else if (minTime >= firstDate) {}
            if (maxTime) {
                var maxDateDay = maxTime.getDate();
                if (maxTime < firstDate) {
                    endDay = startDay;
                } else if (maxTime >= firstDate && maxTime <= lastDate) {
                    endDay = maxDateDay;
                }
            }
            //循环上月剩余的天数
            for (var p = pervLastDay - 1; p >= 0; p--) {
                var py, pm, preCls, preDays = jeDt.digit(pervMonthlastDay - p);
                m == 1 ? (py = parseInt(y) - 1, pm = 13) :(py = y, pm = m);
                var thatpretm = parseInt(py.toString() + jeDt.digit(parseInt(pm) - 1).toString() + preDays.toString()), minpretm = parseInt(minArr[0].toString() + jeDt.digit(minArr[1]).toString() + jeDt.digit(minArr[2]).toString()), maxnexttm = parseInt(maxArr[0].toString() + jeDt.digit(maxArr[1]).toString() + jeDt.digit(maxArr[2]).toString());
                preCls = thatpretm >= minpretm && thatpretm <= maxnexttm ? "prevdate" :preCls = "disabled";
                dayStr += "<li class='" + preCls + "' data-y='" + py + "' data-m='" + (parseInt(pm) - 1) + "' data-d='" + preDays + "'>" + isfestival(parseInt(pm) - 1 + "." + preDays, preDays) + "</li>";
            }
            //循环本月的天数,将日期按允许的范围分三段拼接
            for (var i = 1; i < startDay; i++) {
                i = jeDt.digit(i);
                dayStr += '<li class="disabled" data-y="' + y + '" data-m="' + m + '" data-d="' + i + '">' + isfestival(m + "." + i, i) + "</li>";
            }
            for (var j = startDay; j <= endDay; j++) {
                var current = "";
                j = jeDt.digit(j);
                if (/*y==value.year && m==value.month+1&& */ d == j) {
                    current = "action";
                }
                dayStr += '<li class="' + current + '" data-y="' + y + '" data-m="' + m + '" data-d="' + j + '">' + isfestival(m + "." + j, j) + "</li>";
            }
            for (var k = endDay + 1; k <= currentMonthDays; k++) {
                k = jeDt.digit(k);
                dayStr += '<li class="disabled" data-y="' + y + '" data-m="' + m + '" data-d="' + k + '">' + isfestival(m + "." + k, k) + "</li>";
            }
            //循环补上下个月的开始几天
            var nextDayArr = [], nextMonthStartDays = 42 - pervLastDay - setMonthDays(y, m);
            for (var n = 1; n <= nextMonthStartDays; n++) {
                var ny, nm, nextCls;
                n = jeDt.digit(n);
                m >= 12 ? (ny = parseInt(y) + 1, nm = 0) :(ny = y, nm = m);
                var thatnexttm = parseInt(ny.toString() + jeDt.digit(parseInt(nm) + 1).toString() + jeDt.digit(n).toString()), minnexttm = parseInt(minArr[0].toString() + jeDt.digit(minArr[1]).toString() + jeDt.digit(minArr[2]).toString()), maxnexttm = parseInt(maxArr[0].toString() + jeDt.digit(maxArr[1]).toString() + jeDt.digit(maxArr[2]).toString());
                nextCls = thatnexttm <= maxnexttm && thatnexttm >= minnexttm ? "nextdate" :nextCls = "disabled";
                dayStr += "<li class='" + nextCls + "' data-y='" + ny + "' data-m='" + (parseInt(nm) + 1) + "' data-d='" + n + "'>" + isfestival(parseInt(nm) + 1 + "." + n, n) + "</li>";
            }
            jeDt.html(QD(Cell + " .jedaul")[0], dayStr);
            jeDt.attr(QD(Cell + " .monthprev")[0], "data-y", jeDt.digit(parseInt(m) - 1));
            jeDt.attr(QD(Cell + " .monthnext")[0], "data-y", jeDt.digit(parseInt(m) + 1));
            //计算某年某月有多少天,如果是二月，闰年28天否则29天
            function setMonthDays(year, month) {
                var er = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 :28;
                return [ 31, er, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][month - 1];
            }
            //得到指定月的上个月最后一天传进来按 12月算
            function getPervMonthLastDay(year, month) {
                //当月就是  yue-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
                return parseInt(new Date(year, month - 1, 0).getDate());
            }
        },
        events:function(that, opts, self, arrTime) {
            var yearPre = QD(Cell + " .yearprev")[0], yearNext = QD(Cell + " .yearnext")[0], monthPre = QD(Cell + " .monthprev")[0], monthNext = QD(Cell + " .monthnext")[0], newDate = new Date(), jedateyear = QD(Cell + " .jedateyear")[0], jedatemonth = QD(Cell + " .jedatemonth")[0], isformat = opts.format.match(/\w+|d+/g).join("-") == "YYYY-MM" ? true :false;
            if (!isformat) {
                //切换年
                jeDt.each([ yearPre, yearNext ], function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        jeDt.stopmp(ev);
                        var y = parseInt(jeDt.attr(jedateyear, "data-year")), m = parseInt(jeDt.attr(jedatemonth, "data-month"));
                        cls == yearPre ? y -= 1 :y += 1;
                        var d = newDate.toLocaleDateString() == y + "/" + m + "/" + newDate.getDate() ? arrTime[2] :1;
                        that.getDateStr(y, m, d);
                        that.clickLiDays(that, opts, self);
                    });
                });
                //切换月
                jeDt.each([ monthPre, monthNext ], function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        jeDt.stopmp(ev);
                        var y = parseInt(jeDt.attr(jedateyear, "data-year")), m = parseInt(jeDt.attr(jedatemonth, "data-month"));
                        if (cls == monthPre) {
                            m == 1 ? (y -= 1, m = 12) :m -= 1;
                        } else {
                            m == 12 ? (y += 1, m = 1) :m += 1;
                        }
                        var d = newDate.toLocaleDateString() == y + "/" + m + "/" + newDate.getDate() ? arrTime[2] :1;
                        that.getDateStr(y, m, d);
                        that.clickLiDays(that, opts, self);
                    });
                });
                //生成定位时分秒
                jeDt.each(QD(Cell + " .jedatebot .jedatehms em"), function(i, cls) {
                    jeDt.on(cls, "click", function() {
                        var hmsStr = "", acton, hmscell = QD(Cell + " .jedateprophms")[0], hmslen = jeDt.attr(cls, "data-hms"), hmsstxt = [ "小时", "分钟", "秒数" ], removeEmpty = function() {
                            jeDt.removeClass(hmscell, hmslen == 24 ? "jedateh" :"jedatems");
                            jeDt.html(hmscell, "");
                        };
                        hmsStr += '<div class="jedatehmstitle">' + hmsstxt[i] + '<div class="jedatehmsclose">&times;</div></div>';
                        for (var h = 0; h < hmslen; h++) {
                            h = jeDt.digit(h);
                            acton = jeDt.text(cls) == h ? "action" :"";
                            hmsStr += '<p class="' + acton + '">' + h + "</p>";
                        }
                        jeDt.removeClass(hmscell, hmslen == 24 ? "jedatems" :"jedateh").addClass(hmscell, hmslen == 24 ? "jedateh" :"jedatems");
                        jeDt.html(hmscell, hmsStr);
                        jeDt.each(QD(Cell + " .jedateprophms p"), function(i, p) {
                            jeDt.on(p, "click", function() {
                                jeDt.html(cls, jeDt.digit(jeDt.text(p)));
                                removeEmpty();
                            });
                        });
                        jeDt.each(QD(Cell + " .jedateprophms .jedatehmstitle"), function(i, c) {
                            jeDt.on(c, "click", function() {
                                removeEmpty();
                            });
                        });
                    });
                });
                //今天
                jeDt.on(QD(Cell + " .jedatebot .jedatetodaymonth")[0], "click", function() {
                    var toTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ];
                    var gettoDate = jeDt.parse([ toTime[0], toTime[1], toTime[2] ], [ toTime[3], toTime[4], toTime[5] ], opts.format);
                    that.getDateStr(toTime[0], toTime[1], toTime[2]);
                    jeDt.isValHtml(self) ? jeDt.val(self, gettoDate) :jeDt.text(self, gettoDate);
                    jeDt.html(QD(Cell)[0], "");
                    jeDt.shdeCell(true);
                    if (opts.choosefun === "function" || opts.choosefun != null) opts.choosefun(gettoDate);
                });
            } else {
                jeDt.each(QD(Cell + " .jedaym li"), function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        jeDt.stopmp(ev);
                        var atYM = jeDt.attr(cls, "data-onym").match(/\w+|d+/g);
                        var getYMDate = jeDt.parse([ atYM[0], atYM[1], 1 ], [ 0, 0, 0 ], opts.format);
                        jeDt.isValHtml(self) ? jeDt.val(self, getYMDate) :jeDt.text(self, getYMDate);
                        jeDt.html(QD(Cell)[0], "");
                        jeDt.shdeCell(true);
                    });
                });
                //本月
                jeDt.on(QD(Cell + " .jedatebot .jedatetodaymonth")[0], "click", function() {
                    var ymTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()], 
					thisYMDate = jeDt.parse([ ymTime[0], ymTime[1], 0 ], [ 0, 0, 0 ], opts.format);
                    jeDt.isValHtml(self) ? jeDt.val(self, thisYMDate) :jeDt.text(self, thisYMDate);
                    jeDt.html(QD(Cell)[0], "");
                    jeDt.shdeCell(true);
                    if (opts.choosefun === "function" || opts.choosefun != null) opts.choosefun(thisYMDate);
                });
            }
            //清空
            jeDt.on(QD(Cell + " .jedatebot .jedateclear")[0], "click", function() {
				var clearVal = jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);
                jeDt.isValHtml(self) ? jeDt.val(self, "") :jeDt.text(self, "");
                jeDt.html(QD(Cell)[0], "");
                jeDt.shdeCell(true);
				if(clearVal != ""){
				    if (opts.clearfun === "function" || opts.clearfun != null) opts.clearfun(clearVal);
				}
            });
            //确认
            jeDt.on(QD(Cell + " .jedatebot .jedateok")[0], "click", function(ev) {
                jeDt.stopmp(ev);
				var jedCell = isformat ? QD(Cell + " .jedaym li") :QD(Cell + " .jedaul li")
                if (!isformat) {
                    var okTimeArr = [], okTime = [ parseInt(jeDt.attr(jedateyear, "data-year")), parseInt(jeDt.attr(jedatemonth, "data-month")), arrTime[2] ];
                    jeDt.each(QD(Cell + " .jedatehms em"), function(l, tval) {
                        okTimeArr.push(jeDt.text(tval));
                    });
                    var okVal = jeDt.val(self) != "" || jeDt.text(self) != "" ? jeDt.parse([ okTime[0], okTime[1], okTime[2] ], [ okTimeArr[0], okTimeArr[1], okTimeArr[2] ], opts.format) :"";
                    that.getDateStr(okTime[0], okTime[1], okTime[2]);
                }else{
				    var jedYM = jeDt.val(self) != "" || jeDt.text(self) != "" ? jeDt.attr(QD(Cell + " .jedaym .action")[0], "data-onym").match(/\w+|d+/g) :"", 
				    okVal = jeDt.val(self) != "" || jeDt.text(self) != "" ? jeDt.parse([ jedYM[0], jedYM[1], 1 ], [ 0, 0, 0 ], opts.format) :""
				}
                jeDt.each(jedCell, function(i, cls) {
                    if (jeDt.attr(cls, "class") == "action") {
                        jeDt.isValHtml(self) ? jeDt.val(self, okVal) :jeDt.text(self, okVal);
                    }
                });
                jeDt.html(QD(Cell)[0], "");
                jeDt.shdeCell(true);
				if(okVal != ""){
				    if (opts.okfun === "function" || opts.okfun != null) opts.okfun(okVal);
				}
            });
            //点击空白处隐藏
            jeDt.on(document, "click", function() {
                jeDt.shdeCell(true);
                jeDt.html(QD(Cell)[0], "");
            });
            jeDt.on(QD(Cell)[0], "click", function(ev) {
                jeDt.stopmp(ev);
            });
            that.clickLiDays(that, opts, self);
        },
        //下拉选择年和月
        YearAndMonth:function(that, opts, self, arrTime) {
            var jetopym = QD(Cell + " .jedatetopym")[0], jedateyy = QD(Cell + " .jedateyy")[0], jedatemm = QD(Cell + " .jedatemm")[0], jedateyear = QD(Cell + " .jedateyy .jedateyear")[0], jedatemonth = QD(Cell + " .jedatemm .jedatemonth")[0], mchri = QD(Cell + " .jedateymchri")[0], mchle = QD(Cell + " .jedateymchle")[0];
            function eachYears(YY) {
                var eachStr = "";
                jeDt.each(new Array(15), function(i) {
                    if (i === 7) {
                        var getyear = jeDt.attr(jedateyear, "data-year");
                        eachStr += "<li " + (getyear == YY ? 'class="action"' :"") + ' data-y="' + YY + '">' + YY + "年</li>";
                    } else {
                        eachStr += '<li data-y="' + (YY - 7 + i) + '">' + (YY - 7 + i) + "年</li>";
                    }
                });
                return eachStr;
            }
            function setYearMonth(YY, ymlen) {
                var ymStr = "";
                if (ymlen == 12) {
                    jeDt.each(jeDt.montharr, function(i, val) {
                        var getmonth = jeDt.attr(jedatemonth, "data-month"), val = jeDt.digit(val);
                        ymStr += "<li " + (getmonth == val ? 'class="action"' :"") + ' data-m="' + val + '">' + val + "月</li>";
                    });
                    jeDt.each([ mchri, mchle ], function(c, cls) {
                        cls.style.display = "none";
                    });
                } else {
                    ymStr = eachYears(YY);
                    jeDt.each([ mchri, mchle ], function(c, cls) {
                        cls.style.display = "block";
                    });
                }
                jeDt.removeClass(jetopym, ymlen == 12 ? "jedatesety" :"jedatesetm").addClass(jetopym, ymlen == 12 ? "jedatesetm" :"jedatesety");
                jeDt.html(QD(Cell + " .jedatetopym .ymdropul")[0], ymStr);
                jetopym.style.display = "block";
            }
            function clickLiYears(year) {
                jeDt.each(QD(Cell + " .ymdropul li"), function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        var Years = jeDt.attr(this, "data-y"), Months = jeDt.attr(jedatemonth, "data-month");
                        jeDt.attr(year, "data-year", Years);
                        jeDt.html(year, Years);
                        jetopym.style.display = "none";
                        that.getDateStr(Years, Months, arrTime[2]);
                        that.clickLiDays(that, opts, self);
                    });
                });
            }
            //下拉选择年
            jeDt.on(jedateyy, "click", function() {
                var YMlen = parseInt(jeDt.attr(jedateyy, "data-ym")), yearAttr = parseInt(jeDt.attr(jedateyear, "data-year"));
                setYearMonth(yearAttr, YMlen);
                clickLiYears(jedateyear);
            });
            //下拉选择月
            jeDt.on(jedatemm, "click", function() {
                var YMlen = parseInt(jeDt.attr(jedatemm, "data-ym")), yearAttr = parseInt(jeDt.attr(jedateyear, "data-year"));
                setYearMonth(yearAttr, YMlen);
                jeDt.each(QD(Cell + " .ymdropul li"), function(i, cls) {
                    jeDt.on(cls, "click", function(ev) {
                        var Years = jeDt.attr(jedateyear, "data-year"), Months = jeDt.attr(this, "data-m");
                        jeDt.attr(jedatemonth, "data-month", Months);
                        jeDt.html(jedatemonth, Months);
                        jetopym.style.display = "none";
                        that.getDateStr(Years, Months, arrTime[2]);
                        that.clickLiDays(that, opts, self);
                    });
                });
            });
            //关闭下拉选择
            jeDt.on(QD(Cell + " .jedateymchok")[0], "click", function(ev) {
                jeDt.stopmp(ev);
                jetopym.style.display = "none";
            });
            var yearMch = parseInt(jeDt.attr(jedateyear, "data-year"));
            jeDt.each([ mchle, mchri ], function(lr, cls) {
                jeDt.on(cls, "click", function(ev) {
                    jeDt.stopmp(ev);
                    lr == 0 ? yearMch -= 15 :yearMch += 15;
                    var mchStr = eachYears(yearMch);
                    jeDt.html(QD(Cell + " .jedatetopym .ymdropul")[0], mchStr);
                    clickLiYears(jedateyear);
                });
            });
        },
        //选择日
        clickLiDays:function(that, opts, self) {
            jeDt.each(QD(Cell + " .jedaul li"), function(i, cls) {
                jeDt.on(cls, "click", function(ev) {
                    if (jeDt.hasClass(cls, "disabled")) return;
                    jeDt.stopmp(ev);
                    var liTms = [];
                    jeDt.each(QD(Cell + " .jedatehms em"), function(l, tval) {
                        liTms.push(jeDt.text(tval));
                    });
                    var aty = parseInt(jeDt.attr(cls, "data-y")) | 0, atm = parseInt(jeDt.attr(cls, "data-m")) | 0, atd = parseInt(jeDt.attr(cls, "data-d")) | 0;
                    var getParDate = jeDt.parse([ aty, atm, atd ], [ liTms[0], liTms[1], liTms[2] ], opts.format);
                    that.getDateStr(aty, atm, atd);
                    jeDt.isValHtml(self) ? jeDt.val(self, getParDate) :jeDt.text(self, getParDate);
                    jeDt.html(QD(Cell)[0], "");
                    jeDt.shdeCell(true);
                    if (opts.choosefun === "function" || opts.choosefun != null) {
                        opts.choosefun(getParDate);
                    }
                });
            });
        }
    };
	jeDt.getPath = (function(){
		var js = document.scripts, jsPath = js[js.length - 1].src;
		return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
	}());
	jeDt.creatlink = function(lib){
		var link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = jeDt.getPath +'skin/'+ lib + '.css';
		link.id = 'jeDateSkin';
		QD('head')[0].appendChild(link);
		link = null;
	};
	jeDt.creatlink('jedate');
	jeDate.skin = function(lib){
		QD('#jeDateSkin')[0].parentNode.removeChild(QD('#jeDateSkin')[0]);
		jeDt.creatlink(lib);
	};
    //返回指定日期
    jeDate.now = function(num) {
        var dd = new Date();
        dd.setDate(dd.getDate() + num);
        var y = dd.getFullYear(), m = dd.getMonth() + 1, d = dd.getDate();
        return y + "-" + m + "-" + d;
    };
    "function" === typeof define ? define(function() {
        return jeDate;
    }) :window.jeDate = jeDate;
})(window);
