(function(win) {
	 var jeDt = {}, doc = document, Cell = "#jedatebox";
	/* (tag), (#id), (.className) ,(tag > .className) ,(tag > tag) ,(#id > tag.className) ,
	   (.className tag) ,(tag, tag, #id) ,(tag#id.className) ,(span > * > b) ,(input[name=radio]) 
	*/ 
     var Q=jeDt.query=function(){function r(c,g){g=g||document;if(!/^[\w\-_#]+$/.test(c)&&g.querySelectorAll)return m(g.querySelectorAll(c));if(-1<c.indexOf(",")){for(var d=c.split(/,/g),a=[],b=0,e=d.length;b<e;++b)a=a.concat(r(d[b],g));return y(a)}var d=c.match(z),a=d.pop(),e=(a.match(t)||k)[1],f=!e&&(a.match(u)||k)[1],b=!e&&(a.match(v)||k)[1],a=c.match(/\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\]/g);if(f&&!a&&!b&&g.getElementsByClassName)b=m(g.getElementsByClassName(f));else{b=!e&&m(g.getElementsByTagName(b||"*"));f&&(b=w(b,"className",RegExp("(^|\\s)"+f+"(\\s|$)")));if(e)return(d=g.getElementById(e))?[d]:[];if(a)for(e=0;e<a.length;e++)var f=(a[e].match(x)||k)[1],h=(a[e].match(x)||k)[2],h=h.replace(/\'/g,"").replace(/\-/g,"\\-").replace(/\[/g,"\\[").replace(/\]/g,"\\]"),b=w(b,f,RegExp("(^"+h+"$)"))}return d[0]&&b[0]?p(d,b):b}function m(c){try{return Array.prototype.slice.call(c)}catch(g){for(var d=[],a=0,b=c.length;a<b;++a)d[a]=c[a];return d}}function p(c,g,d){var a=c.pop();if("\x3e"===a)return p(c,g,!0);for(var b=[],e=-1,f=(a.match(t)||k)[1],h=!f&&(a.match(u)||k)[1],a=!f&&(a.match(v)||k)[1],m=-1,q,l,n,a=a&&a.toLowerCase();q=g[++m];){l=q.parentNode;do if(n=(n=(n=!a||"*"===a||a===l.nodeName.toLowerCase())&&(!f||l.id===f))&&(!h||RegExp("(^|\\s)"+h+"(\\s|$)").test(l.className)),d||n)break;while(l=l.parentNode);n&&(b[++e]=q)}return c[0]&&b[0]?p(c,b):b}function w(c,g,d){for(var a=-1,b,e=-1,f=[];b=c[++a];)d.test(b.getAttribute(g))&&(f[++e]=b);return f}var z=/(?:[\*\w\-\\.#]+)+(?:\[(?:[\w\-_][^=]+)=(?:[\'\[\]\w\-_]+)\])*|\*|>/gi,u=/^(?:[\w\-_]+)?\.([\w\-_]+)/,t=/^(?:[\w\-_]+)?#([\w\-_]+)/,v=/^([\w\*\-_]+)/,k=[null,null,null],x=/\[([\w\-_][^=]+)=([\'\[\]\w\-_]+)\]/,y=function(){var c=+new Date,g=function(){var d=1;return function(a){var b=a[c],e=d++;return b?!1:(a[c]=e,!0)}}();return function(d){for(var a=d.length,b=[],e=-1,f=0,h;f<a;++f)h=d[f],g(h)&&(b[++e]=h);c+=1;return b}}();return r}();

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
	jeDt.trim = function(str){
		str = str || '';
		return str.replace(/^\s|\s$/g, '').replace(/\s+/g, ' ');
	};
    jeDt.attr = function() {
        // @returns {string|object} attr(obj, props, value);
        var arg = arguments, i = 0, len = arg.length, obj = arg[0], props = arg[1], value = arg[2];
        if (len == 2) {
			if (typeof props === "string") {
				if (props.length != 0) {
					return obj.getAttribute(props);
				}
			} else if (typeof props === "object") {
				if (len == 2) {
					for (var j in props) {
						obj.setAttribute(j, props[j]);
					}
				}
			}
        } else if (len == 3 && typeof props === "string") {
            obj.setAttribute(props, value);
        }
		return this;
    };  
    jeDt.stopmp = function(e) {
        e = e || win.event;
        e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
        return this;
    };
	jeDt.getCss = function(obj,name) {
		if (obj.currentStyle) { 
		     return obj.currentStyle[name]; 
		} else if (window.getComputedStyle) { 
		     return document.defaultView.getComputedStyle(obj)[name]; 
		}; return null;
	};
	//查询样式是否存在
	jeDt.hasClass = function(elem, cls){
		elem = elem || {};
		return new RegExp('\\b' + cls +'\\b').test(elem.className);
	};
	
	jeDt.addClass = function(elem, cls){
		elem = elem || {};
		jeDt.hasClass(elem, cls) || (elem.className += ' ' + cls);
		elem.className = jeDt.trim(elem.className);
		return this;
	};
	
	jeDt.removeClass = function(elem, cls) {
		elem = elem || {};
		if (jeDt.hasClass(elem, cls)) {
			elem.className = elem.className.replace(new RegExp('(\\s|^)' + cls +'(\\s|$)'), '');
		}
		return this;
	};
    //事件监听器
    jeDt.on = function(elem, even, fn) {
        elem.attachEvent ? elem.attachEvent("on" + even, function() {
            fn.call(elem, win.even);
        }) : elem.addEventListener(even, fn, false);
        return jeDt;
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
			document.all ? elem.innerText = value : elem.textContent = value;
        } else {
			var emText = document.all ? elem.innerText : elem.textContent
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
	jeDt.scroll = function(type){
		type = type ? 'scrollLeft' : 'scrollTop';
		return doc.body[type] | doc.documentElement[type];
	};
	
	jeDt.winarea = function(type){
		return doc.documentElement[type ? 'clientWidth' : 'clientHeight']
	};
    var Mods = {
        isValHtml:function(that) {
            return /textarea|input/.test(that.tagName.toLocaleLowerCase());
        },
        weeks:[ "日", "一", "二", "三", "四", "五", "六" ],
        //补齐数位
        digit:function(num) {
            return num < 10 ? "0" + (num | 0) :num;
        },
        //计算某月1号是星期几
        getWeekInMonth:function(year, month) {
            return new Date(year, month, 1).getDay();
        },
        getMonths:function(m) {
            return [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ][m];
        },
        //计算某年某月有多少天,如果是二月，闰年28天否则29天
        getLastDayInMonth:function(year, month) {
			var days = '';
			if (month != 2) {
				days = (month == 4 || month == 6 || month == 9 || month == 11) ?  30 : 31;
			} else {
				days = (((year % 4) == 0 && (year % 100) != 0) || (year % 400) == 0) ? 29 : 28;
			}
			return days
		},

        //转换日期格式
        parse:function(ymd, hms, format) {
            ymd = ymd.concat(hms);
            var format = format, _this = this;
            return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
                ymd.index = ++ymd.index | 0;
                return _this.digit(ymd[ymd.index]);
            });
        },
        nowDate:function(timestamp, format) {
            var De = new Date(timestamp | 0 ? function(tamp) {
                return tamp < 864e5 ? +new Date() + tamp * 864e5 :tamp;
            }(parseInt(timestamp)) :+new Date());
            return this.parse([ De.getFullYear(), De.getMonth() + 1, De.getDate() ], [ De.getHours(), De.getMinutes(), De.getSeconds() ], format);
        },
        //是否为闰年
        isLeap:function(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },
		// 关闭展开层
        dateShdeCell:function(type) {
           // type ? jeDt.removeClass(Q(Cell)[0], "dateshow") :jeDt.addClass(Q(Cell)[0], "dateshow");
			type ? Q(Cell)[0].style.display = "none" : Q(Cell)[0].style.display = "block";
        }
    };
    var config = {
        dateCell:"#dateval",
        format:"YYYY-MM-DD hh:mm:ss",   //日期格式
        maxDate:"2099-12-31 23:59:59",  //最大日期
        minDate:"1900-01-01 00:00:00",   //最小日期
        isinitVal:false,   //是否初始化时间
        isTime:false,     //是否开启时间选择
		isClear: true,    //是否显示清空
        zIndex:999,   //弹出层的层级高度
        choose:function(i) {}  //选择时间之后的回调函数
    }, DateBox = function(options) {
        var that = this, newConf = JSON.parse(JSON.stringify(config));
        that.config = jeDt.extend(newConf, options);
        that.initDate();
    };
	DateBox.prototype = {
        initDate:function() {
            var that = this, opts = that.config, self = Q(opts.dateCell)[0], elem, devt, even = Cell.event, target;
            var dateDiv = doc.createElement("div");
			if(!Q(Cell)[0]){
				jeDt.each([ dateDiv ], function(i, cls) {				
					cls.className = cls.id = Cell.replace("#", "");
					cls.style.zIndex = opts.zIndex + (i == 0 ? 5 :0);				
					doc.body.appendChild(cls);   				
				});
			}
            try {
                target = even.target || even.srcElement || {};
            } catch (e) {
                target = {};
            }
            elem = opts.dateCell ? Q(opts.dateCell)[0] :target;
			var nowDateVal = Mods.nowDate(null, opts.format);
            if (opts.isinitVal) {                
                (jeDt.val(self) || jeDt.text(self)) == "" ? Mods.isValHtml(self) ? jeDt.val(self, nowDateVal) :jeDt.text(self, nowDateVal) :Mods.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);
            }
            if (even && target.tagName) {
                if (!elem || elem === jeDt.elem) return;
                jeDt.stopmp(even);
                that.setHtml(opts, self);
            } else {
                devt = opts.event || "click";
                jeDt.each((elem.length | 0) > 0 ? elem :[ elem ], function(ii, cel) {
                    jeDt.on(cel, devt, function(ev) {
                        jeDt.stopmp(ev);
                        if (cel !== jeDt.elem) {	
                            that.setHtml(opts, self);
                        }
                    });
                });
            }
        },
        setHtml:function(opts, self) {
            var that = this, weekHtml = "", date = new Date(), nowDateVal = Mods.nowDate(null, opts.format);
            if (opts.isinitVal) {
                var initVal = Mods.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);    
            } else {
                var initVal = (jeDt.val(self) || jeDt.text(self)) == "" ? nowDateVal : Mods.isValHtml(self) ? jeDt.val(self) :jeDt.text(self);
            }
			if(jeDt.val(self) != ''){
                var arrTime = initVal.match(/\d+/g);
			}else{
				var arrTime = [date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(), date.getMinutes(), date.getSeconds()];
			}
            var dateHtmStr = '<div class="jedatetop">' + 
			'<div class="jedateym"><i class="prev triangle yearprev"></i><span class="jedateyy" data-ym="24"><em class="jedateyear"></em><em>年</em></span><i class="next triangle yearnext"></i></div>' + 
			'<div class="jedateym"><i class="prev triangle monthprev"></i><span class="jedatemm" data-ym="12"><em class="jedatemonth"></em><em>月</em></span><i class="next triangle monthnext"></i></div>' + 
			'</div><div class="jedatetopym" style="display: none;"></div>' + 
			'<ol class="jedaol"></ol>' + 
			'<ul class="jedaul"></ul>'+
			'<div class="jedatebot">'+
				'<ul class="botflex jedatehms">'+
				  '<li><em data-hms="24"></em><i>:</i></li>'+
				  '<li><em data-hms="60"></em><i>:</i></li>'+
				  '<li><em data-hms="60"></em></li>'+
				'</ul>'+         
				'<div class="botflex jedatebtn">'+
				  '<span class="jedateclear">清空</span>'+
				  '<span class="jedatetoday">今天</span>'+
				  '<span class="jedateok">关闭</span>'+
				'</div>'+
			'</div><div class="jedateprophms"></div>';
            jeDt.html(Q(Cell)[0], dateHtmStr);
			opts.isClear ? "" : Q(Cell+" .jedatebot .jedateclear")[0].style.display = "none";
            for (var i = 0; i < Mods.weeks.length; i++) {
                weekHtml += '<li class="weeks" data-week="' + Mods.weeks[i] + '">' + Mods.weeks[i] + "</li>";
            }
            jeDt.html(Q(Cell+" .jedaol")[0], weekHtml);
            that.getDateStr(arrTime[0], arrTime[1], arrTime[2]);
			if(opts.isTime){
				var dhms = [date.getHours(), date.getMinutes()+1, date.getSeconds()]
				jeDt.each(Q(Cell+" .jedatebot .jedatehms em"), function(i, cls) {
				   jeDt.html(cls, Mods.digit(dhms[i]));
				})
			}else{
				Q(Cell+" .jedatebot .jedatehms")[0].style.display = "none";
				Q(Cell+" .jedatebot .jedatebtn")[0].style.width = "100%";
			}
            Mods.dateShdeCell(false);
			that.orien(Q(Cell)[0], self);
            that.events(that, opts, self, arrTime);
			that.YearAndMonth(that, opts, self, arrTime);
        },
		//方位辨别
		orien : function(obj,self, pos){
			var tops, rect = self.getBoundingClientRect();
			obj.style.left = rect.left + (pos ? 0 : jeDt.scroll(1)) + 'px';
			if(rect.bottom + obj.offsetHeight/1.5 <= jeDt.winarea()){
				tops = rect.bottom - 1;         
			} else {
				tops = rect.top > obj.offsetHeight/1.5 ? rect.top - obj.offsetHeight + 1 : jeDt.winarea() - obj.offsetHeight;
			}
			obj.style.top = Math.max(tops + (pos ? 0 : jeDt.scroll()) + 2,1) + 'px';
		},
		getDateStr:function(y, m, d) {
			var that = this, opts = that.config, dayStr = "";
			jeDt.text(Q(Cell+" .jedateyear")[0], Mods.digit(y)).attr(Q(Cell+" .jedateyear")[0], "data-year", y);
            jeDt.text(Q(Cell+" .jedatemonth")[0], Mods.digit(m)).attr(Q(Cell+" .jedatemonth")[0], "data-month", m);
			//先得到当前月第一天是星期几.
			var date = setMonthDays(y, m);
			var weekday = new Date(y, m-1, 1).getDay();
			//根据这个星期算前面几天的上个月最后几天.
			var pervLastDay = weekday != 0 ? weekday : weekday + 7;
			//得到上个月最后一天;
			var pervMonthlastDay = getPervMonthLastDay(y, m);
			var currentMonthDays = getPervMonthLastDay(y, m+1);
			//上月最后几天循环
			var lastdays = pervMonthlastDay - pervLastDay;
			for(var p = pervLastDay - 1; p >= 0; p--){
                if (m == 1) {
                    var py = y - 1, pm = 13;
                } else {
                    var py = y, pm = m;
                }
				dayStr +="<li class='prevdate' data-y='" + py + "' data-m='" + (parseInt(pm)-1) + "' data-d='" + (pervMonthlastDay - p) + "'>"+ (pervMonthlastDay - p) +"</li>";
			}
            //判断是否超出允许的日期范围	
            var startDay = 1, 
				endDay = currentMonthDays, 
				thisDate = new Date(y, m, d), 
				firstDate = new Date(y, m, 1), 
				lastDate = new Date(y, m, currentMonthDays),
				minTime = new Date(opts.minDate), 
				maxTime = new Date(opts.maxDate), 
				minDateDay = minTime.getDate();
            if (minTime > lastDate) {
                startDay = currentMonthDays + 1;
            } else if (minTime >= firstDate && minTime <= lastDate) {
                startDay = minDateDay;
            }
            if (maxTime) {
                var maxDateDay = maxTime.getDate();
                if (maxTime < firstDate) {
                    endDay = startDay - 1;
                } else if (maxTime >= firstDate && maxTime <= lastDate) {
                    endDay = maxDateDay;
                }
            }
			//循环本月的天数,将日期按允许的范围分三段拼接
            for (var i = 1; i < startDay; i++) {
                dayStr += '<li class="disabled" data-y="' + y + '" data-m="' + m + '" data-d="' + i + '">' + i + "</li>";
            }
            for (var j = startDay; j <= endDay; j++) {
                var current = "";
                if (/*y==value.year && m==value.month+1&& */ d == j) {
                    current = "action";
                }
                dayStr += '<li class="' + current + '" data-y="' + y + '" data-m="' + m + '" data-d="' + j + '">' + j + "</li>";
            }
            for (var k = endDay + 1; k <= currentMonthDays; k++) {
                dayStr += '<li class="disabled" data-y="' + y + '" data-m="' + m + '" data-d="' + k + '">' + k + "</li>";
            }
			//再补上下个月的开始几天
			var nextDayArr = [],nextMonthStartDays = 42 - pervLastDay - setMonthDays(y, m);
			for (var n = 1; n <= nextMonthStartDays; n++) {
                if (m >= 12) {
                    var ny = y + 1, nm = 0;
                } else {
                    var ny = y, nm = m;
                }
				dayStr +="<li class='nextdate' data-y='" + ny + "' data-m='" + (parseInt(nm)+1) + "' data-d='" + n + "'>"+ n +"</li>";
			}
			jeDt.html(Q(Cell+" .jedaul")[0], dayStr);
			jeDt.attr(Q(Cell+" .monthprev")[0],"data-y",parseInt(m)-1);
			jeDt.attr(Q(Cell+" .monthnext")[0],"data-y",parseInt(m)+1);
			//创建date对象并赋值
			function setMonthDays(year, month) {
				var er = (((year % 4) == 0 && (year % 100) != 0) || (year % 400) == 0) ? 29 : 28;
				return [31, er, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
			}
			//得到指定月的上个月最后一天传进来按 12月算
			function getPervMonthLastDay(year, month) {
				//当月就是  yue-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
				return parseInt(new Date(year, month - 1, 0).getDate());
			}
		},
		events:function(that, opts, self, arrTime) {			
			var yearPre = Q(Cell+" .yearprev")[0], yearNext = Q(Cell+" .yearnext")[0], 
			    monthPre = Q(Cell+" .monthprev")[0], monthNext = Q(Cell+" .monthnext")[0], newDate = new Date(),
			    jedateyear = Q(Cell+" .jedateyear")[0], jedatemonth = Q(Cell+" .jedatemonth")[0];
			//切换年
			jeDt.each([ yearPre, yearNext ], function(i, cls) {
				jeDt.on(cls, "click", function(ev) {
					jeDt.stopmp(ev);
					if (cls == yearPre) {
						var y = parseInt(jeDt.attr(jedateyear, "data-year")), 
						    m = parseInt(jeDt.attr(jedatemonth, "data-month")); 
							y -= 1;
						var d = "01";
						that.getDateStr(y, m,d);
						that.clickLiDays(that, opts, self, arrTime);	
					}else{
						var y = parseInt(jeDt.attr(jedateyear, "data-year")), 
						    m = parseInt(jeDt.attr(jedatemonth, "data-month"));
							y += 1;
						var d = "01";
						that.getDateStr(y, m,d);
						that.clickLiDays(that, opts, self, arrTime);
					}
				});
            });
			//切换月
			jeDt.each([ monthPre, monthNext ], function(i, cls) {
				jeDt.on(cls, "click", function(ev) {
					jeDt.stopmp(ev);
					if (cls == monthPre) {
						var y = parseInt(jeDt.attr(jedateyear, "data-year")), 
						    m = parseInt(jeDt.attr(jedatemonth, "data-month")); 
						if(m == 1){
							y -= 1;
							m = 12;
						} else {
							m -= 1;
						}
						var d = newDate.toLocaleDateString() == (y +'/'+ m +'/'+newDate.getDate()) ? arrTime[2] : 1;
						that.getDateStr(y, m,d);
						that.clickLiDays(that, opts, self, arrTime);	
					}else{
						var y = parseInt(jeDt.attr(jedateyear, "data-year")), 
						    m = parseInt(jeDt.attr(jedatemonth, "data-month"));
						if(m == 12){
							y += 1;
							m = 1;
						} else {
							m += 1;
						}    
						var d = newDate.toLocaleDateString() == (y +'/'+ m +'/'+newDate.getDate()) ? arrTime[2] : 1;
						that.getDateStr(y, m,d);
						that.clickLiDays(that, opts, self, arrTime);	
					}
				});
            });
			//生成定位时分秒
			jeDt.each(Q(Cell+" .jedatebot .jedatehms em"), function(i, cls) {				
				jeDt.on(cls, "click", function() {
					var hmsStr = "",acton, hmscell = Q(Cell+" .jedateprophms")[0],  hmslen = jeDt.attr(this, "data-hms"), hmsstxt = ['小时', '分钟', '秒数'];
					hmsStr += '<div class="jedatehmstitle">' + hmsstxt[i] + '<div class="jedatehmsclose">&times;</div></div>';
					for (var h = 0; h < hmslen; h++) {
					    acton = jeDt.text(this) == h ? "action":""; 
                        hmsStr += '<p class="' + acton + '">' + h + '</p>';
                    } 
					jeDt.removeClass(hmscell,hmslen == 24 ? "jedatems" : "jedateh").addClass(hmscell, hmslen == 24 ? "jedateh" : "jedatems");
					jeDt.html(hmscell, hmsStr);
					jeDt.each(Q(Cell+" .jedateprophms p"), function(i, p) {	
						jeDt.on(p, "click", function() {
							jeDt.html(cls, Mods.digit(jeDt.text(this)));
							jeDt.removeClass(hmscell, hmslen == 24 ? "jedateh" : "jedatems");
							jeDt.html(hmscell, '');
						});
					}); 
					jeDt.each(Q(Cell+" .jedateprophms .jedatehmstitle"), function(i, c) {	
						jeDt.on(c, "click", function() {
							jeDt.removeClass(hmscell, hmslen == 24 ? "jedateh" : "jedatems");
							jeDt.html(hmscell, '');
						})
					})
				})
			});
			//清空
			jeDt.on(Q(Cell+" .jedatebot .jedateclear")[0], "click", function() {
				jeDt.val(self,'');
				jeDt.html(Q(Cell)[0], '');
                Mods.dateShdeCell(true);  
			});
			//今天
			jeDt.on(Q(Cell+" .jedatebot .jedatetoday")[0], "click", function() {
				var toTime = [newDate.getFullYear(),newDate.getMonth()+1,newDate.getDate(),newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
				var gettoDate = Mods.parse([ toTime[0],toTime[1],toTime[2] ], [ toTime[3], toTime[4], toTime[5] ], opts.format);
				that.getDateStr( toTime[0],toTime[1],toTime[2]);
				Mods.isValHtml(self) ? jeDt.val(self, gettoDate) :jeDt.text(self, gettoDate);
                jeDt.html(Q(Cell)[0], '');  Mods.dateShdeCell(true);  
				if (opts.choose === "function" || opts.choose != null) {
                    opts.choose(gettoDate);
                }
			});
			//确认
			jeDt.on(Q(Cell+" .jedatebot .jedateok")[0], "click", function() {
				jeDt.html(Q(Cell)[0], '');
                Mods.dateShdeCell(true);  
			});
			//点击空白处隐藏
			jeDt.on(document, "click", function() {  
                Mods.dateShdeCell(true);
			})
			jeDt.on(Q(Cell)[0], "click", function(ev) { 
				jeDt.stopmp(ev); 
			})
			that.clickLiDays(that, opts, self, arrTime);
		},
		//下拉选择年和月
		YearAndMonth : function(that, opts, self, arrTime){
			var jetopym = Q(Cell+" .jedatetopym")[0], jedateyy = Q(Cell+" .jedateyy")[0], jedatemm = Q(Cell+" .jedatemm")[0],
			jedateyear = Q(Cell+" .jedateyy .jedateyear")[0], jedatemonth = Q(Cell+" .jedatemm .jedatemonth")[0];	
			function setYearMonth(YY,ymlen){
				var ymStr = "";	
				if(ymlen == 12){	
				    jeDt.each([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ], function(i,val){
						var getmonth = jeDt.attr(jedatemonth, "data-month");
						ymStr += '<p '+ (getmonth == val ? 'class="action"' : '') +' data-m="'+ val +'">'+ val +'月</p>';
					});		
				}else{
					jeDt.each(new Array(18), function(i){
						if(i === 7) {   
							var getyear = jeDt.attr(jedateyear, "data-year");
							ymStr += '<p '+ (getyear == YY ? 'class="action"' : '') +' data-y="'+ YY +'">'+ YY +'年</p>';
						} else {
							ymStr += '<p data-y="'+ (YY-7+i) +'">'+ (YY-7+i) +'年</p>';
						}
					});  
				}
				if(jeDt.getCss(jetopym,'display') == "none"){
					jetopym.style.display = "block";
				}else{
					jetopym.style.display = "none";
				}
				jeDt.removeClass(jetopym,ymlen == 12 ? "jedatesety" : "jedatesetm").addClass(jetopym, ymlen == 12 ? "jedatesetm" : "jedatesety");
			    jeDt.html(jetopym,ymStr);

			}
			//下拉选择年
			jeDt.on(jedateyy, "click", function() {
				var chYMlen = parseInt(jeDt.attr(this, "data-ym")), yearAttr = parseInt(jeDt.attr(jedateyear,"data-year"));
				setYearMonth(yearAttr,chYMlen);
				jeDt.each(Q(Cell+" .jedatetopym p"), function(i, cls) {
					jeDt.on(cls, "click", function(ev) {
						 var thatYear = jeDt.attr(this, "data-y"), thatMonth = jeDt.attr(jedatemonth, "data-month");
						 jeDt.attr(jedateyear,"data-year",thatYear);
						 jeDt.html(jedateyear, thatYear);
						 jetopym.style.display = "none";
						 that.getDateStr(thatYear, thatMonth, arrTime[2]);
					     that.clickLiDays(that, opts, self, arrTime);
					})
				})
			})
			//下拉选择月
			jeDt.on(jedatemm, "click", function() {
				var chYMlen = parseInt(jeDt.attr(this, "data-ym")), yearAttr = parseInt(jeDt.attr(jedateyear,"data-year"));
				setYearMonth(yearAttr,chYMlen);
				jeDt.each(Q(Cell+" .jedatetopym p"), function(i, cls) {
					jeDt.on(cls, "click", function(ev) {
						 var thatYear = jeDt.attr(jedateyear, "data-year"), thatMonth = jeDt.attr(this, "data-m");
						 jeDt.attr(jedatemonth,"data-month",thatMonth);
						 jeDt.html(jedatemonth, thatMonth);
						 jetopym.style.display = "none";
						 that.getDateStr(thatYear, thatMonth, arrTime[2]);
					     that.clickLiDays(that, opts, self, arrTime);
					})
				})
			})
		},
		//选择日
		clickLiDays : function(that, opts, self, arrTime){
            jeDt.each(Q(Cell+" .jedaul li"), function(i, cls) {
                jeDt.on(cls, "click", function(ev) {
					if(jeDt.hasClass(this,'disabled')){ return;}
					jeDt.stopmp(ev);
					var aty = jeDt.attr(this, "data-y") | 0, atm = jeDt.attr(this, "data-m") | 0, atd = jeDt.attr(this, "data-d") | 0;
					var getParDate = Mods.parse([ aty, atm, atd ], [ arrTime[3], arrTime[4], arrTime[5] ], opts.format);
					that.getDateStr(aty, atm, atd);
					Mods.isValHtml(self) ? jeDt.val(self, getParDate) :jeDt.text(self, getParDate);
					jeDt.html(Q(Cell)[0], '');   Mods.dateShdeCell(true);  
					if (opts.choose === "function" || opts.choose != null) {
						opts.choose(getParDate);
					}
                });
            });
		}
	};

    var jeDate = function(options) {
        //核心方法
        return new DateBox(options || {});
    };
    "function" === typeof define ? define(function() {
        return jeDate;
    }) :window.jeDate = jeDate;
})(window);
