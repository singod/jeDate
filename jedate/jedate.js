/**
 @Name : jeDate v2.6 日期控件
 @Author: chen guojun
 @Date: 2016-5-12
 @QQ群：516754269
 @官网：http://www.jayui.com/jedate/ 或 https://github.com/singod/jeDate
 */
(function(window) {
    var jeDt = {}, doc = document, dtCell = ["jedatebox"], ymdMacth = /\w+|d+|[\u4E00-\u9FA5\uF900-\uFA2D]|[\uFF00-\uFFEF]/g;
	/* (tag), (#id), (.className) ,(tag > .className) ,(tag > tag) ,(#id > tag.className) ,
	   (.className tag) ,(tag, tag, #id) ,(tag#id.className) ,(span > * > b) ,(input[name=radio]) 
	*/
	var QD=function(){function r(c,g){g=g||document;if(!/^[\w\-_#]+$/.test(c)&&g.querySelectorAll)return m(g.querySelectorAll(c));if(-1<c.indexOf(",")){for(var d=c.split(/,/g),a=[],b=0,e=d.length;b<e;++b)a=a.concat(r(d[b],g));return y(a)}var d=c.match(z),a=d.pop(),e=(a.match(t)||k)[1],f=!e&&(a.match(u)||k)[1],b=!e&&(a.match(v)||k)[1],a=c.match(/\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\]/g);if(f&&!a&&!b&&g.getElementsByClassName)b=m(g.getElementsByClassName(f));else{b=!e&&m(g.getElementsByTagName(b||"*"));f&&(b=w(b,"className",RegExp("(^|\\s)"+f+"(\\s|$)")));if(e)return(d=g.getElementById(e))?[d]:[];if(a)for(e=0;e<a.length;e++)var f=(a[e].match(x)||k)[1],h=(a[e].match(x)||k)[2],h=h.replace(/\'/g,"").replace(/\-/g,"\\-").replace(/\[/g,"\\[").replace(/\]/g,"\\]"),b=w(b,f,RegExp("(^"+h+"$)"))}return d[0]&&b[0]?p(d,b):b}function m(c){try{return Array.prototype.slice.call(c)}catch(g){for(var d=[],a=0,b=c.length;a<b;++a)d[a]=c[a];return d}}function p(c,g,d){var a=c.pop();if("\x3e"===a)return p(c,g,!0);for(var b=[],e=-1,f=(a.match(t)||k)[1],h=!f&&(a.match(u)||k)[1],a=!f&&(a.match(v)||k)[1],m=-1,q,l,n,a=a&&a.toLowerCase();q=g[++m];){l=q.parentNode;do if(n=(n=(n=!a||"*"===a||a===l.nodeName.toLowerCase())&&(!f||l.id===f))&&(!h||RegExp("(^|\\s)"+h+"(\\s|$)").test(l.className)),d||n)break;while(l=l.parentNode);n&&(b[++e]=q)}return c[0]&&b[0]?p(c,b):b}function w(c,g,d){for(var a=-1,b,e=-1,f=[];b=c[++a];)d.test(b.getAttribute(g))&&(f[++e]=b);return f}var z=/(?:[\*\w\-\\.#]+)+(?:\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\])*|\*|>/gi,u=/^(?:[\w\-_]+)?\.([\w\-_]+)/,t=/^(?:[\w\-_]+)?#([\w\-_]+)/,v=/^([\w\*\-_]+)/,k=[null,null,null],x=/\[([\w\-_][^=]+)=([\'\[\]\w\-_]+)\]/,y=function(){var c=+new Date,g=function(){var d=1;return function(a){var b=a[c],e=d++;return b?!1:(a[c]=e,!0)}}();return function(d){for(var a=d.length,b=[],e=-1,f=0,h;f<a;++f)h=d[f],g(h)&&(b[++e]=h);c+=1;return b}}();return r}();
    jeDt.each = function(arr, fn) {
        var i = 0, len = arr.length;
        for (;i < len; i++) {
            if (fn(i, arr[i]) === false) {
                break;
            }
        }
    };
    jeDt.extend = function(opt, source, override) {
		if (override === undefined) override = true;
		for (var p in source) {
			if (override || !(p in opt)) opt[p] = source[p];
		}
		return opt;
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
	jeDt.isShow = function(elem, bool) {
		elem.style.display = bool != true ? "none" : "block";
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
	jeDt.bind = function(elObj, type, fn) {
		function bindevent(elem){
			elem.attachEvent ? elem.attachEvent("on" + type, function() {
				fn.call(elem, window.type);
			}) :elem.addEventListener(type, fn, false);
		}
		return (elObj == document) ? bindevent(document) : jeDt.each(elObj, function(i, elem) { bindevent(elem); });
	}
    jeDt.docScroll = function(type) {
        type = type ? "scrollLeft" :"scrollTop";
        return doc.body[type] | doc.documentElement[type];
    };
    jeDt.winarea = function(type) {
        return doc.documentElement[type ? "clientWidth" :"clientHeight"];
    };
	jeDt.isType = function (obj, type) {
		type = type.replace(/\b(\w)|\s(\w)/g,function(m){return m.toUpperCase()});
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
	};
	//补齐数位
    jeDt.digit = function(num) {
        return num < 10 ? "0" + (num | 0) :num;
    };
    //转换日期格式
    jeDt.parse = function(ymd, hms, format) {
        ymd = ymd.concat(hms);
        var format = format, hmsCheck = jeDt.parseCheck(format,false) == "hh:mm:ss", num = 2;
        return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
			var idx = hmsCheck ? ++num : ymd.index = ++ymd.index|0; 
            return jeDt.digit(ymd[idx]);
        });
    };
	jeDt.parseCheck = function(format,bool) {
		var ymdhms = [];
		format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
		    ymdhms.push(str)
	    });
		return ymdhms.join(bool == true ? "-":":");
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
        maxDate:"2099-12-31 23:59:59", //最大日期
    };
    jeDt.index = Math.floor(Math.random() * 9e3);
	jeDt.initDate = function(opts){
		var even = jeDt.event, target;
		try {
			target = even.target || even.srcElement || {};
		} catch(e){
			target = {};
		}
		var createDiv = function (disCell, self, dis){
			if(QD("#"+ self)[0]) return;
			var dateDiv = doc.createElement("div");
			dateDiv.className = dtCell[0];
			dateDiv.id = self;
			dateDiv.style.cssText = "z-index:"+(dis == true ? "" : opts.zIndex || 999)+";position:"+(dis == true ? "relative" : "absolute")+";display:block;";
			disCell.appendChild(dateDiv);
		},
		initVals = function (elem){
			var nowDateVal = jeDt.nowDate(null, opts.format||config.format);
			(jeDt.val(elem) || jeDt.text(elem)) == "" ? jeDt.isValHtml(elem) ? jeDt.val(elem, nowDateVal) :jeDt.text(elem, nowDateVal) :jeDt.isValHtml(elem) ? jeDt.val(elem) :jeDt.text(elem);
		},
		valcell = QD(opts.dateCell);
		
		if(opts.isDisplay){
			jeDt.each(valcell,function(i,elem){
                jeDt.addClass(elem, "jedate"+(jeDt.index+i));
				createDiv(QD(opts.displayCell)[i],"jedate"+(jeDt.index+i),true);
				jeDt.setHtml(opts, elem, "#jedate"+(jeDt.index+i));
				if (opts.isinitVal) initVals(elem); 
			});
		}else{
			if (opts.isinitVal) {
				jeDt.each(valcell,function(i,elem){
			        initVals(elem);
				})
            };
			if(even && target.tagName){
				jeDt.stopmp(even);
				createDiv(doc.body,dtCell[0],false);
				jeDt.setHtml(opts, valcell[0], "#"+dtCell[0]);
			}else{
				jeDt.bind(valcell,"click",function(ev){
					jeDt.stopmp(ev);
					createDiv(doc.body,dtCell[0],false);
					jeDt.setHtml(opts, this, "#"+dtCell[0]);
				});
			}
		};		
	};
	jeDt.setHtml = function(opts, self, lyerCell) {
		var that = this, weekHtml = "", date = new Date(), nowDateVal = jeDt.nowDate(null, opts.format||config.format), isYYMM = jeDt.parseCheck(opts.format||config.format,true) == "YYYY-MM" ? true :false,
		    ishhmmss = jeDt.parseCheck(opts.format||config.format,false) == "hh:mm:ss" ? true :false, isTimeFormat = !isYYMM ? true : false, isTime = opts.isTime,
		    initVal = (opts.isinitVal) ? jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self) :(jeDt.val(self) || jeDt.text(self)) == "" ? nowDateVal :jeDt.isValHtml(self) ? jeDt.val(self) :jeDt.text(self); 
		var tms = (jeDt.val(self) || jeDt.text(self)) != "" ? initVal.match(/\d+/g) : [ date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds() ];
		//控件HMTL模板
		var datetopStr = '<div class="jedatetop">' + (!isYYMM ? '<div class="jedateym" style="width:50%;"><i class="prev triangle yearprev"></i><span class="jedateyy" data-ym="24"><em class="jedateyear"></em><em class="pndrop"></em></span><i class="next triangle yearnext"></i></div>' + '<div class="jedateym" style="width:50%;"><i class="prev triangle monthprev"></i><span class="jedatemm" data-ym="12"><em class="jedatemonth"></em><em class="pndrop"></em></span><i class="next triangle monthnext"></i></div>' :'<div class="jedateym" style="width:100%;"><i class="prev triangle ymprev"></i><span class="jedateyy"><em class="jedateyearmonth"></em></span><i class="next triangle ymnext"></i></div>') + '</div>';
		var dateymList = !isYYMM ? '<div class="jedatetopym" style="display: none;">' + '<ul class="ymdropul"></ul><p><span class="jedateymchle">&#8592;</span><span class="jedateymchri">&#8594;</span><span class="jedateymchok">关闭</span></p>' + "</div>" :'<ul class="jedaym"></ul>';
		var dateriList = '<ol class="jedaol"></ol><ul class="jedaul"></ul>';
		var bothmsStr = !isYYMM ? '<div class="botflex jedatehmsshde"><ul class="jedatehms"><li><em></em><i>:</i></li><li><em></em><i>:</i></li><li><em></em></li></ul></div>' + '<div class="botflex jedatebtn"><span class="jedateok">确认</span><span class="jedatetodaymonth">今天</span><span class="jedateclear">清空</span></div>' :'<div class="botflex jedatebtn"><span class="jedateok">确认</span><span class="jedatetodaymonth">本月</span><span class="jedateclear">清空</span></div>';
		var datebotStr = '<div class="jedatebot">' + bothmsStr + "</div>";
		var datehmschoose = '<div class="jedateprophms '+(ishhmmss ? "jedatepropfix" : "jedateproppos")+'" prop="true"><div class="jedatepropcon"><div class="jedatehmstitle">时分秒选择<div class="jedatehmsclose">&times;</div></div><div class="jedateproptext">小时</div><div class="jedateproptext">分钟</div><div class="jedateproptext">秒数</div><div class="jedatehmscon jedateprophours"></div><div class="jedatehmscon jedatepropminutes"></div><div class="jedatehmscon jedatepropseconds"></div></div></div>';
		
		var dateHtmStr = isYYMM ? datetopStr + dateymList + datebotStr : (ishhmmss ? datetopStr + datehmschoose + datebotStr : datetopStr + dateymList + dateriList + datehmschoose + datebotStr);  
		jeDt.html(QD(lyerCell)[0], dateHtmStr);
		jeDt.each(QD(lyerCell + " .jedatebot .jedateclear"),function(i,elem){
		    opts.isClear ? jeDt.isShow(elem,false) : ""; 
		});
		if (isTimeFormat) {
			var isTimehms = function(bool){
				var dhmsArr = jeDt.val(self) != "" || jeDt.text(self) != "" ? (bool ? [ tms[0], tms[1], tms[2] ] : [ tms[3], tms[4], tms[5] ]) :[ date.getHours(), date.getMinutes(), date.getSeconds() ];
				jeDt.each(QD(lyerCell + " .jedatebot .jedatehms em"), function(i, cls) {
					jeDt.html(cls, jeDt.digit(dhmsArr[i]));
				});
			}
			if(ishhmmss){
				isTimehms(true);
			}else{
				if (isTime) {
					isTimehms(false);
				}else{
					jeDt.isShow(QD(lyerCell + " .jedatebot .jedatehmsshde")[0],false);
					QD(lyerCell + " .jedatebot .jedatebtn")[0].style.width = "100%";
				}
			}
		} else {
			if (!isYYMM) jeDt.isShow(QD(lyerCell + " .jedatebot .jedatehmsshde")[0],false);
			QD(lyerCell + " .jedatebot .jedatebtn")[0].style.width = "100%";
		}
		//判断是否为年月类型
		if (!isYYMM) {
			for (var i = 0; i < jeDt.weeks.length; i++) {
				weekHtml += '<li class="weeks" data-week="' + jeDt.weeks[i] + '">' + jeDt.weeks[i] + "</li>";
			}
			jeDt.each(QD(lyerCell + " .jedaol"),function(i,elem){
			    jeDt.html(elem, weekHtml);
			})
			ishhmmss ? jeDt.getDateStr(opts, lyerCell, date.getFullYear(), date.getMonth() + 1, date.getDate()) : jeDt.getDateStr(opts, lyerCell, tms[0], tms[1], tms[2]);   
			jeDt.chooseYM(opts, self, lyerCell, tms);
		} else {
			jeDt.html(QD(lyerCell + " .jedaym")[0], jeDt.onlyYMStr(tms[0], tms[1]));
			jeDt.text(QD(lyerCell + " .jedateym .jedateyearmonth")[0], tms[0] + "年" + jeDt.digit(tms[1]) + "月");
			jeDt.onlyYMevents(opts, self, lyerCell, tms);
		}
		if(!(opts.isDisplay)){jeDt.orien(QD(lyerCell)[0], self)};
		jeDt.events(opts, self, lyerCell, tms);

	};
	//仅年月（YYYY-MM）
	jeDt.onlyYMStr = function(y, m) {
		var onlyYM = "";
		jeDt.each(jeDt.montharr, function(i, val) {
			onlyYM += "<li " + (m == val ? 'class="action"' :"") + ' data-onym="' + y + "-" + jeDt.digit(val) + '">' + y + "年" + jeDt.digit(val) + "月</li>";
		});
		return onlyYM;
	};
	jeDt.onlyYMevents = function(opts, self, lyerCell, tms) {
		var ymPre = QD(lyerCell + " .jedateym .ymprev"), ymNext = QD(lyerCell + " .jedateym .ymnext"), 
		    ony = parseInt(tms[0]), onm = parseFloat(tms[1]);
		jeDt.each([ ymPre, ymNext ], function(i, cls) {
			jeDt.bind(cls, "click", function(ev) {
				jeDt.stopmp(ev);
				var ym = cls == ymPre ? ony -= 1 :ony += 1;
				jeDt.html(QD(lyerCell + " .jedaym")[0], jeDt.onlyYMStr(ym, onm));
				jeDt.events(opts, self, lyerCell,tms);
			});
		});
	};
	//方位辨别
	jeDt.orien = function(obj, self, pos) {
		var tops,ris, rect = self.getBoundingClientRect();
		leris = (rect.right + obj.offsetWidth / 1.5 >= jeDt.winarea(1)) ?  rect.right - obj.offsetWidth : rect.left + (pos ? 0 :jeDt.docScroll(1));
		tops = (rect.bottom + obj.offsetHeight / 1.5 <= jeDt.winarea()) ?
			rect.bottom - 1 : rect.top > obj.offsetHeight / 1.5 ? rect.top - obj.offsetHeight + 1 :jeDt.winarea() - obj.offsetHeight;
		obj.style.left = leris + "px";
		obj.style.top = Math.max(tops + (pos ? 0 :jeDt.docScroll()) + 1, 1) + "px";
	};
	//循环生成日历
	jeDt.getDateStr = function(opts, lyerCell, y, m, d) {
		var dayStr = "", m = jeDt.digit(m), newDate = new Date(), nY = newDate.getFullYear(), nM = newDate.getMonth() + 1; 
		//设置时间标注
		function mks(y,m,d){
			var Marks = opts.marks, contains = function(arr, obj) {  
				var len = arr.length;  
				while (len--) {  
					if (arr[len] === obj) return true;   
				}  
				return false;  
			}
			return jeDt.isType(Marks,"array") && Marks.length > 0 && contains(Marks, y+'-'+m+'-'+d) ? '<i class="marks"></i>' : '';
		}
		//是否显示节日
		var isfestival = function(day, n) {
			return opts.festival ? jeDt.festival(day, n) :n;
		};
		var parseArr = function(str) {
			var timeArr = str.split(" ");
			return timeArr[0].match(ymdMacth);
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
        var startDay = 1, minArr = parseArr(opts.minDate||config.minDate), maxArr = parseArr(opts.maxDate||config.maxDate), endDay = currentMonthDays, 
			thisDate = new Date(y, m, d), firstDate = new Date(y, m, 1), lastDate = new Date(y, m, currentMonthDays), 
		    minTime = new Date(minArr[0], minArr[1], minArr[2]), maxTime = new Date(maxArr[0], maxArr[1], maxArr[2]), minDateDay = minTime.getDate();
		if (minTime > lastDate) {
			startDay = parseInt(currentMonthDays) + 1;
		} else if (minTime >= firstDate && minTime <= lastDate) {
			startDay = minDateDay;
		}
		if (maxTime) {
			var maxDateDay = maxTime.getDate();
			if (maxTime < firstDate) {
				endDay = 0;    //endDay = startDay;
			} else if (maxTime >= firstDate && maxTime <= lastDate) {
				endDay = maxDateDay;
			}
		}
		//循环上月剩余的天数
		for (var p = pervLastDay - 1; p >= 0; p--) {
			var py, pm, preCls, preDays = jeDt.digit(pervMonthlastDay - p);
			m == 1 ? (py = parseInt(y) - 1, pm = 13) :(py = y, pm = m);
			var thatpretm = parseInt(py.toString() + jeDt.digit(parseInt(pm) - 1).toString() + preDays.toString()), 
			    minpretm = parseInt(minArr[0].toString() + jeDt.digit(minArr[1]).toString() + jeDt.digit(minArr[2]).toString()), 
			    maxnexttm = parseInt(maxArr[0].toString() + jeDt.digit(maxArr[1]).toString() + jeDt.digit(maxArr[2]).toString());
			preCls = thatpretm >= minpretm && thatpretm <= maxnexttm ? "prevdate" : "disabled";
			dayStr += "<li class='" + preCls + "' data-y='" + py + "' data-m='" + (jeDt.digit(parseInt(pm) - 1)) + "' data-d='" + preDays + "'>" + isfestival(jeDt.digit(parseInt(pm) - 1) + "." + preDays, preDays) + mks(py,(parseInt(pm) - 1),preDays) + "</li>";
		}
		//循环本月的天数,将日期按允许的范围分三段拼接
		for (var i = 1; i < startDay; i++) {
			i = jeDt.digit(i);
			dayStr += '<li class="disabled" data-y="' + y + '" data-m="' + m + '" data-d="' + i + '">' + isfestival(m + "." + i, i) + mks(y,m,i) + "</li>";
		}
		for (var j = startDay; j <= endDay; j++) {
			j = jeDt.digit(j);
			var current = (/*y==nY && m==nM && */d == j)? "action" : "";
			dayStr += '<li class="' + current + '" data-y="' + y + '" data-m="' + m + '" data-d="' + j + '">' + isfestival(m + "." + j, j) + mks(y,m,j) + "</li>";
		}
		for (var k = endDay + 1; k <= currentMonthDays; k++) {
			k = jeDt.digit(k);
			dayStr += '<li class="disabled" data-y="' + y + '" data-m="' + m + '" data-d="' + k + '">' + isfestival(m + "." + k, k) + mks(y,m,k) + "</li>";
		}
		//循环补上下个月的开始几天
		var nextDayArr = [], nextMonthStartDays = 42 - pervLastDay - setMonthDays(y, m);
		for (var n = 1; n <= nextMonthStartDays; n++) {
			var ny, nm, nextCls;
			n = jeDt.digit(n);
			m >= 12 ? (ny = parseInt(y) + 1, nm = 0) :(ny = y, nm = m);
			var thatnexttm = parseInt(ny.toString() + jeDt.digit(parseInt(nm) + 1).toString() + jeDt.digit(n).toString()), 
			    minnexttm = parseInt(minArr[0].toString() + jeDt.digit(minArr[1]).toString() + jeDt.digit(minArr[2]).toString()), 
			    maxnexttm = parseInt(maxArr[0].toString() + jeDt.digit(maxArr[1]).toString() + jeDt.digit(maxArr[2]).toString());
			nextCls = thatnexttm <= maxnexttm && thatnexttm >= minnexttm ? "nextdate" :nextCls = "disabled";
			dayStr += "<li class='" + nextCls + "' data-y='" + ny + "' data-m='" + (jeDt.digit(parseInt(nm) + 1)) + "' data-d='" + n + "'>" + isfestival(jeDt.digit(parseInt(nm) + 1) + "." + n, n) + mks(ny,(parseInt(nm) + 1),n) + "</li>";
		}
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
		jeDt.each(QD(lyerCell + " .jedateyear"),function(i,elem){
			jeDt.text(elem, y + "年").attr(elem, "data-year", y);
		})
		jeDt.each(QD(lyerCell + " .jedatemonth"),function(i,elem){
			jeDt.text(elem, m + "月").attr(elem, "data-month", m);
		})
		jeDt.each(QD(lyerCell + " .jedaul"),function(i,elem){
			jeDt.html(elem, dayStr);
		})
		jeDt.each(QD(lyerCell + " .monthprev"),function(i,elem){
			jeDt.attr(elem, "data-y", jeDt.digit(parseInt(m) - 1));
		})
		jeDt.each(QD(lyerCell + " .monthnext"),function(i,elem){
			jeDt.attr(elem, "data-y", jeDt.digit(parseInt(m) + 1));
		})
	    
	};
	//生成定位时分秒
	jeDt.getStrhms = function(opts, lyerCell, hmsArr){
		var hmsArr = [];
		jeDt.each([24,60,60], function(i, len) {
			var hmsStr = "", hmsCls = "", textem = jeDt.text(QD(lyerCell + " .jedatehms em")[i]);;
			for (var h = 0; h < len; h++) {
				h = jeDt.digit(h);   
				hmsCls = opts.ishmsLimit ? ((h < textem) ? "disabled" : (h == textem) ? "action" : "") : (textem == h ? "action" :"");
				hmsStr += '<p class="' + hmsCls + '">' + h + "</p>";
			}  
			hmsArr.push(hmsStr);	
		});
		return hmsArr;
	}
	//关闭层
	jeDt.dateClose = function(opts, lyerCell){
		if(!(opts.isDisplay)) doc.body.removeChild(QD(lyerCell)[0]);
	};
	//各种事件绑定
	jeDt.events = function(opts, self, lyerCell, tms){
		var newDate = new Date(), yPre = QD(lyerCell + " .yearprev"), yNext = QD(lyerCell + " .yearnext"), 
		    mPre = QD(lyerCell + " .monthprev"), mNext = QD(lyerCell + " .monthnext"), 
		    jedateyear = QD(lyerCell + " .jedateyear"), jedatemonth = QD(lyerCell + " .jedatemonth"), 
			isYYMM = jeDt.parseCheck(opts.format||config.format,true) == "YYYY-MM" ? true :false,
			ishhmmss = jeDt.parseCheck(opts.format||config.format,false) == "hh:mm:ss" ? true :false;
		if (!isYYMM) {
			//切换年
			!ishhmmss && jeDt.each([yPre,yNext], function(i, cls) {
				jeDt.bind(cls, "click", function(ev) {
					jeDt.stopmp(ev);
					var y = parseInt(jeDt.attr(jedateyear[0], "data-year")), m = parseInt(jeDt.attr(jedatemonth[0], "data-month"));
					cls == yPre ? y -= 1 :y += 1;
					var d = newDate.toLocaleDateString() == y + "/" + m + "/" + newDate.getDate() ? tms[2] :1;
					jeDt.getDateStr(opts, lyerCell, y, m, d);
					jeDt.chooseDays(opts, self, lyerCell);
				});
			});
			//切换月
			!ishhmmss && jeDt.each([ mPre, mNext ], function(i, cls) {
				jeDt.bind(cls, "click", function(ev) {
					jeDt.stopmp(ev);
					var y = parseInt(jeDt.attr(jedateyear[0], "data-year")), m = parseInt(jeDt.attr(jedatemonth[0], "data-month"));
					if (cls == mPre) {
						m == 1 ? (y -= 1, m = 12) :m -= 1;
					} else {
						m == 12 ? (y += 1, m = 1) :m += 1;
					}
					var d = newDate.toLocaleDateString() == y + "/" + m + "/" + newDate.getDate() ? tms[2] :1;
					jeDt.getDateStr(opts, lyerCell, y, m, d);
					jeDt.chooseDays(opts, self, lyerCell);
				});
			});
			//时分秒事件绑定
			var hmsStr = jeDt.getStrhms(opts, lyerCell),
			hmsevents = function (hmsArr){
				jeDt.each(hmsArr, function(i, hmsCls) {
					if (jeDt.html(hmsCls[0]) == "") jeDt.html(hmsCls[0], hmsStr[i]);
				}); 
				if(ishhmmss){
					jeDt.isShow(QD(lyerCell + " .jedatehmsclose")[0],false);
				    jeDt.isShow(QD(lyerCell + " .jedatetodaymonth")[0],false);
				}else{
					jeDt.isShow(QD(lyerCell + " .jedateprophms")[0],true);
				} 
				//计算当前时分秒的位置
				jeDt.each(["hours","minutes","seconds"], function(i, hms) {
					var hmsCls = QD(lyerCell + " .jedateprop" + hms), achmsCls = QD(lyerCell + " .jedateprop"+hms+" .action");
					hmsCls[0].scrollTop = achmsCls[0].offsetTop-157;

					var onhmsPCls = QD(lyerCell + " .jedateprop"+hms+" p");
					jeDt.bind(onhmsPCls, "click", function() {
						var that = this;
						if (jeDt.hasClass(that, "disabled")) return;
						for (var j = 0; j < onhmsPCls.length; j++) {
							jeDt.removeClass(onhmsPCls[j], "action");
						}
						jeDt.addClass(that, "action");  
						jeDt.html(QD(lyerCell + " .jedatebot .jedatehms em")[i], jeDt.digit(jeDt.text(that)));
					})
				});
			};
			var hs = QD(lyerCell + " .jedateprophours"), ms = QD(lyerCell + " .jedatepropminutes"), ss = QD(lyerCell + " .jedatepropseconds");		
			if(ishhmmss){							    
                hmsevents([hs,ms,ss]);
			}else{
				jeDt.bind(QD(lyerCell + " .jedatehms"), "click", function() {
					if(QD(lyerCell + " .jedateprophms")[0].style.display !== "block") hmsevents([hs,ms,ss]);					
					//关闭时分秒层
					jeDt.bind(QD(lyerCell + " .jedateprophms .jedatehmsclose"), "click", function() {
						jeDt.isShow(QD(lyerCell + " .jedateprophms")[0],false);
					});
				})
			}

			//今天
			jeDt.bind(QD(lyerCell + " .jedatebot .jedatetodaymonth"), "click", function() {
				var toTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate(), newDate.getHours(), newDate.getMinutes(), newDate.getSeconds() ],
				    gettoDate = jeDt.parse([ toTime[0], toTime[1], toTime[2] ], [ toTime[3], toTime[4], toTime[5] ], opts.format||config.format),
				    valcell = (opts.isDisplay) ? QD("body "+lyerCell.replace(/\#/g,"."))[0] : self;
				jeDt.getDateStr(opts, lyerCell, toTime[0], toTime[1], toTime[2]);
				jeDt.isValHtml(valcell) ? jeDt.val(valcell, gettoDate) :jeDt.text(valcell, gettoDate);
				jeDt.dateClose(opts, lyerCell);
				if (jeDt.isType(opts.choosefun,"function") || opts.choosefun != null) opts.choosefun(gettoDate);
				if (!isYYMM) jeDt.chooseDays(opts, self, lyerCell);
			});
		}else{
			var valcell = (opts.isDisplay) ? QD("body "+lyerCell.replace(/\#/g,"."))[0] : self;
			//选择年
			jeDt.bind(QD(lyerCell + " .jedaym li"), "click", function(ev) {
				jeDt.stopmp(ev);
				var atYM = jeDt.attr(this, "data-onym").match(/\w+|d+/g),
				    getYMDate = jeDt.parse([ atYM[0], atYM[1], 1 ], [ 0, 0, 0 ], opts.format||config.format);
				jeDt.isValHtml(valcell) ? jeDt.val(valcell, getYMDate) :jeDt.text(valcell, getYMDate);
				jeDt.dateClose(opts, lyerCell);
				if (jeDt.isType(opts.choosefun,"function") || opts.choosefun != null) opts.choosefun(getYMDate);
				jeDt.initDate(opts);
			});
			//本月
			jeDt.bind(QD(lyerCell + " .jedatebot .jedatetodaymonth"), "click", function() {
				var ymTime = [ newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()], 
				    YMDate = jeDt.parse([ ymTime[0], ymTime[1], 0 ], [ 0, 0, 0 ], opts.format||config.format);
				jeDt.isValHtml(valcell) ? jeDt.val(valcell, YMDate) :jeDt.text(valcell, YMDate);
				jeDt.dateClose(opts, lyerCell);
				if (jeDt.isType(opts.choosefun,"function") || opts.choosefun != null) opts.choosefun(YMDate);
				jeDt.initDate(opts);
			});	
		}
		//清空
		jeDt.bind(QD(lyerCell + " .jedatebot .jedateclear"), "click", function() {
			var valcell = (opts.isDisplay) ? QD("body "+lyerCell.replace(/\#/g,"."))[0] : self,
			    clearVal = jeDt.isValHtml(valcell) ? jeDt.val(valcell) :jeDt.text(valcell);
			jeDt.isValHtml(valcell) ? jeDt.val(valcell, "") :jeDt.text(valcell, "");
			jeDt.dateClose(opts, lyerCell);
			if(clearVal != ""){
				if (jeDt.isType(opts.clearfun,"function") || opts.clearfun != null) opts.clearfun(clearVal);
			}
		});
		//确认
		jeDt.bind(QD(lyerCell + " .jedatebot .jedateok"), "click", function(ev) {   
			jeDt.stopmp(ev);
			var valcell = (opts.isDisplay) ? QD("body "+lyerCell.replace(/\#/g,"."))[0] : self, isValtext = (jeDt.val(valcell) || jeDt.text(valcell)) != "",
			eachhmsem = function(okArr){
				jeDt.each(QD(lyerCell + " .jedatehms em"), function(l, emval) {
					okArr.push(jeDt.text(emval));
				});	
			}
			if(isValtext){
				var jedCell = isYYMM ? QD(lyerCell + " .jedaym li") :QD(lyerCell + " .jedaul li"), nowDateVal = jeDt.nowDate(null, opts.format||config.format),
					btnokVal = jeDt.isValHtml(valcell) ? jeDt.val(valcell) :jeDt.text(valcell), oktms = btnokVal.match(/\w+|d+/g);
				if (!isYYMM) {
					var okTimeArr = [], okTime = [ parseInt(jeDt.attr(jedateyear[0], "data-year")), parseInt(jeDt.attr(jedatemonth[0], "data-month")), oktms[2] ];
                    eachhmsem(okTimeArr);
					var okVal = isValtext ? jeDt.parse([ okTime[0], okTime[1], okTime[2] ], [ okTimeArr[0], okTimeArr[1], okTimeArr[2] ], opts.format||config.format) :"";
					jeDt.getDateStr(opts, lyerCell, okTime[0], okTime[1], okTime[2]);
				}else{
					var jedYM = isValtext ? jeDt.attr(QD(lyerCell + " .jedaym .action")[0], "data-onym").match(/\w+|d+/g) :"", 
					    okVal = isValtext ? jeDt.parse([ jedYM[0], jedYM[1], 1 ], [ 0, 0, 0 ], opts.format||config.format) :"";
				}
				if(ishhmmss){
					jeDt.isValHtml(valcell) ? jeDt.val(valcell, okVal) :jeDt.text(valcell, okVal);
				}else{
					jeDt.each(jedCell, function(i, cls) {
						if (jeDt.attr(cls, "class") == "action") {
							jeDt.isValHtml(valcell) ? jeDt.val(valcell, okVal) :jeDt.text(valcell, okVal);
						}
					});
				}
				jeDt.dateClose(opts, lyerCell);
				if(okVal != ""){
					if (jeDt.isType(opts.okfun,"function") || opts.okfun != null) opts.okfun(okVal);
				}
				if (!isYYMM) jeDt.chooseDays(opts, self, lyerCell);
			}else{
				if(ishhmmss){
					var okhmsArr = [],okhmsVal = "";
					eachhmsem(okhmsArr);
					okhmsVal = jeDt.parse([ tms[0], tms[1], tms[2] ], [ okhmsArr[0], okhmsArr[1], okhmsArr[2] ], opts.format||config.format);
					jeDt.isValHtml(valcell) ? jeDt.val(valcell, okhmsVal) :jeDt.text(valcell, okhmsVal);
					jeDt.dateClose(opts, lyerCell);
				}
			}
		});
		//点击空白处隐藏
        if(!(opts.isDisplay)){
			jeDt.bind(document,"mouseup",function(ev){ 
			    jeDt.stopmp(ev);
			    var box = QD("#"+dtCell[0])[0];
				if(box && box.style.display !== 'none'){
				    doc.body.removeChild(QD(lyerCell)[0]);
				}
			});
			jeDt.bind(QD("#"+dtCell[0]), "mouseup", function(ev) {
				jeDt.stopmp(ev);
			});
		};
		if (!isYYMM) !ishhmmss && jeDt.chooseDays(opts, self, lyerCell);
	};
	//下拉选择年和月
	jeDt.chooseYM = function(opts, self, lyerCell, tms){
		var jetopym = QD(lyerCell + " .jedatetopym"), jedateyy = QD(lyerCell + " .jedateyy"), jedatemm = QD(lyerCell + " .jedatemm"), 
		    jedateyear = QD(lyerCell + " .jedateyy .jedateyear"), jedatemonth = QD(lyerCell + " .jedatemm .jedatemonth"), 
		    mchri = QD(lyerCell + " .jedateymchri"), mchle = QD(lyerCell + " .jedateymchle"),
			ishhmmss = jeDt.parseCheck(opts.format||config.format,false) == "hh:mm:ss" ? true :false;
		//循环生成年
		function eachYears(YY) {
			var eachStr = "";
			jeDt.each(new Array(15), function(i) {
				if (i === 7) {
					var getyear = jeDt.attr(jedateyear[0], "data-year");
					eachStr += "<li " + (getyear == YY ? 'class="action"' :"") + ' data-y="' + YY + '">' + YY + "年</li>";
				} else {
					eachStr += '<li data-y="' + (YY - 7 + i) + '">' + (YY - 7 + i) + "年</li>";
				}
			});
			return eachStr;
		}
		//循环生成月
		function setYearMonth(YY, ymlen) {
			var ymStr = "";
			if (ymlen == 12) {
				jeDt.each(jeDt.montharr, function(i, val) {
					var getmonth = jeDt.attr(jedatemonth[0], "data-month"), val = jeDt.digit(val);
					ymStr += "<li " + (getmonth == val ? 'class="action"' :"") + ' data-m="' + val + '">' + val + "月</li>";
				});
				jeDt.each([ mchri, mchle ], function(c, cls) {
					jeDt.isShow(cls[0],false);
				});
			} else {
				ymStr = eachYears(YY);
				jeDt.each([ mchri, mchle ], function(c, cls) {
					jeDt.isShow(cls[0],true);
				});
			}
			jeDt.removeClass(jetopym[0], ymlen == 12 ? "jedatesety" :"jedatesetm").addClass(jetopym[0], ymlen == 12 ? "jedatesetm" :"jedatesety");
			jeDt.html(QD(lyerCell + " .jedatetopym .ymdropul")[0], ymStr);
			jeDt.isShow(jetopym[0],true);
		}
		function clickLiYears(year) {
			jeDt.bind(QD(lyerCell + " .ymdropul li"), "click", function(ev) {
				var Years = jeDt.attr(this, "data-y"), Months = jeDt.attr(jedatemonth[0], "data-month");
				jeDt.attr(year, "data-year", Years);
				jeDt.html(year, Years);
				jeDt.isShow(jetopym[0],false);
				jeDt.getDateStr(opts, lyerCell, Years, Months, tms[2]);
				jeDt.chooseDays(opts, self, lyerCell);
			});
		}
		//下拉选择年
		!ishhmmss && jeDt.bind(jedateyy, "click", function() {
			var YMlen = parseInt(jeDt.attr(this, "data-ym")), yearAttr = parseInt(jeDt.attr(jedateyear[0], "data-year"));
			setYearMonth(yearAttr, YMlen);
			clickLiYears(jedateyear[0]);
		});
		//下拉选择月
		!ishhmmss && jeDt.bind(jedatemm, "click", function() {
			var YMlen = parseInt(jeDt.attr(this, "data-ym")), yearAttr = parseInt(jeDt.attr(jedateyear[0], "data-year"));
			setYearMonth(yearAttr, YMlen);
			jeDt.bind(QD(lyerCell + " .ymdropul li"), "click", function(ev) {
				var Years = jeDt.attr(jedateyear[0], "data-year"), Months = jeDt.attr(this, "data-m");
				jeDt.attr(jedatemonth[0], "data-month", Months);
				jeDt.html(jedatemonth[0], Months);
				jeDt.isShow(jetopym[0],false);
				jeDt.getDateStr(opts, lyerCell, Years, Months, tms[2]);
				jeDt.chooseDays(opts, self, lyerCell);
			});
		});
		//关闭下拉选择
		jeDt.bind(QD(lyerCell + " .jedateymchok"), "click", function(ev) {
			jeDt.stopmp(ev);
			jeDt.isShow(jetopym[0],false);
		});
		var yearMch = parseInt(jeDt.attr(jedateyear[0], "data-year"));
		jeDt.each([ mchle, mchri ], function(d, cls) {
			jeDt.bind(cls, "click", function(ev) {
				jeDt.stopmp(ev);
				d == 0 ? yearMch -= 15 :yearMch += 15;
				var mchStr = eachYears(yearMch);
				jeDt.html(QD(lyerCell + " .jedatetopym .ymdropul")[0], mchStr);
				clickLiYears(jedateyear[0]);
			});
		});
	};
	//选择日
	jeDt.chooseDays = function(opts, self, lyerCell) {
		jeDt.bind(QD(lyerCell + " .jedaul li"), "click", function(ev) { 
			var that = this, liTms = [], valcell = (opts.isDisplay) ? QD("body "+lyerCell.replace(/\#/g,"."))[0] : self;
			if (jeDt.hasClass(that, "disabled")) return;
			jeDt.stopmp(ev);
			jeDt.each(QD(lyerCell + " .jedatehms em"), function(l, tval) {
				liTms.push(jeDt.text(tval));
			});
			var aty = parseInt(jeDt.attr(that, "data-y")), atm = parseFloat(jeDt.attr(that, "data-m")), atd = parseFloat(jeDt.attr(that, "data-d")),
			    getParDate = jeDt.parse([ aty, atm, atd ], [ liTms[0], liTms[1], liTms[2] ], opts.format||config.format);
			jeDt.getDateStr(opts, lyerCell, aty, atm, atd);
			jeDt.isValHtml(valcell) ? jeDt.val(valcell, getParDate) :jeDt.text(valcell, getParDate);
			jeDt.dateClose(opts, lyerCell);
			if (jeDt.isType(opts.choosefun,"function") || opts.choosefun != null) opts.choosefun(getParDate);
			jeDt.chooseDays(opts, self, lyerCell);
		});
	};
    //核心部分
	var jeDate = function(options) {
		try{ jeDt.event = window.event ? window.event : jeDate.caller.arguments[0]; } catch(e){};
        return new jeDt.initDate(options || {});
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
	//版本
	jeDate.version = "2.6";
	//更换控件风格
	jeDate.skin = function(lib){
		QD('#jeDateSkin')[0].parentNode.removeChild(QD('#jeDateSkin')[0]);
		jeDt.creatlink(lib);
	};
	//返回指定日期
    jeDate.now = function(num) {
        var De = new Date((num|0) ? function(tamp){
			return tamp < 86400000 ? (+new Date + tamp*86400000) : tamp;
		}(parseInt(num)) : +new Date), newDate = new Date();
		var Zeros = function (value, length) {
			var result = "00" + value.toString();
			return result.substr(result.length - length);
		}
		function getLocalTime(dateNum) {
			var Den = new Date(dateNum * 1000);			
			return Den.getFullYear() + "-" + Zeros(Den.getMonth() + 1, 2) + "-" + Zeros(Den.getDate(), 2) + " " + Zeros(Den.getHours(), 2) + ":" + Zeros(Den.getMinutes(), 2) + ":" + Zeros(Den.getSeconds(), 2);
		}
        var y = De.getFullYear(), m = De.getMonth() + 1, d = De.getDate();
		var localTime = (typeof num === "string") ? getLocalTime(num) : y + "-" + Zeros(m, 2) + "-" + Zeros(d, 2) + " "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds() ; 
        return localTime;
    };
    // 多环境支持
	"function" === typeof define ? define(function () { 
	    return jeDate; 
	}) : ("object" === typeof module && "object" === typeof module.exports) ?  module.exports = jeDate : window.jeDate = jeDate;
})(window);
