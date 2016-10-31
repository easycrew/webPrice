/**
 * 图表组件 用于展示柱状图、饼图、线形图
 * @module widget
 * @class charting
 * @author liuxiaoyan@che08.com
 * 
 */
(function($, undefined) {
    $.widget("jrad.charts", {
        options: {
            url: null,
            type: 'spline',
            data: false,
            scroll: false,
            preProcess: false,
            showType: false,
            recursion: null,
			tooltip:null,
			yAxis:null,
			series:null,
			xAxis:null
        },
        _chart: null,
        resize: function(){
            if(this._chart) {
                this._chart.setSize(this.element.offsetWidth - 20, this.element.offsetHeight - 20, false);
            }
        },
        _buildCharting: function(data) {
            var options = this.options;
            // 去掉highcharts的logo
            data.credits = {
                enabled: false
            };
			data.tooltip = options.tooltip==null?{}:options.tooltip;
            var _type = options.type?options.type:this.element.typeList.val();
            if(options.type && options.type.indexOf('_') != -1) {
                data.plotOptions = {
                    series: {
                        stacking: options.type.split('_')[1]
                    }
                };
                _type = options.type.split('_')[0];
            } 
            data.chart = $.extend(true, {
                type: _type,
                renderTo: this.element.chart[0]
            }, data.chart);
            // 通过数据判断是否需要添加滚动条
            if(data.series[0].data.length > 20 || this.options.scroll) {
                data.scrollbar = $.extend({
                    enabled : true,
                    height: 20,
                    liveRedraw: false
                },data.scrollbar);
                data.xAxis.min = 0;
                data.xAxis.max = (this.options.scroll && this.options.scroll.max) ? this.options.scroll.max : 10;
                data.xAxis.title = {
                    text: ''
                };
            }
            data.title = $.extend(true,{
                text: '',
                style: {
                    font: 'bolder 14px "微软雅黑","宋体",Arial',
                    color: '#3d4249'
                }
            },data.title);
            if(options.series!==null){
				$.each(data.series,function(i){
					data.series[i] = $.extend(true,options.series[i],data.series[i]);
				});
			}
			// if(options.yAxis!==null){
			// 	data.yAxis = options.yAxis; 
			// 	data.series[0].yAxis = 1; 
			// }else{
			// 	data.yAxis = $.extend(true, {
			// 		title: {
			// 			text: ''
			// 		},
			// 		labels: {
			// 			formatter: function(){
			// 				return this.value;
			// 			},
			// 			style: {
			// 				font: 'normal 12px "微软雅黑","宋体",Arial'
			// 			}
			// 		}
			// 	},data.yAxis); 
			// }
            this._chart = new Highcharts.Chart(data);
        },
        _changeType: function(newType) {
            try {
                var stacking = '';
                if(newType.indexOf('_') != -1) {
                    stacking = newType.split('_')[1];
                    newType = newType.split('_')[0];
                }
                for(var i = 0;i<this._chart.series.length;i++) {
                    this._chart.series[i].update({
                        type: newType,
                        stacking: stacking
                    });
                }
            }catch(e) {
                if (window.console && window.console.log) {
                    window.console.log(newType & ': ' & e);
                } else if (window.opera && window.opera.postError) {
                    window.opera.postError(newType & ': ' & e);
                }
            }
        },
        _initURLData: function() {
            var options = this.options;
            var self = this;
            if (options.url) {
                $.ajax({
                    url: options.url,
                    dataType: 'json',
                    cache: false,
                    success: function(data) {
                        if($.isFunction(options.preProcess)) {
                            data = options.preProcess(data);
                        } else {
                            data = $.fn.analyticalData(data,options.recursion);
                        }
                        self._buildCharting(data);
                    }
                });
            } else if(options.data){
                var data = options.data;
                if($.isFunction(options.preProcess)) {
                    data = options.preProcess(options.data);
                } else {
                    data = $.fn.analyticalData(options.data,options.recursion);
                }
                self._buildCharting(data);
            }
        },
        _create: function() {
            var self = this;
            this.element.resizable({
                resize: self.resize
            });
            this.element.find('.ui-resizable-handle').remove();
            var $type = $('<div>').addClass('ui-charts-types');
            var $typeList = $('<select>');
            $typeList.append('<option value="line">折线图</option>');
            $typeList.append('<option value="spline">曲线图</option>');
            $typeList.append('<option value="area">面积图</option>');
            $typeList.append('<option value="column">柱状图</option>');
            $typeList.append('<option value="column_normal">柱状图（叠加）</option>');
            $type.append($typeList);
            $typeList.on('change',function(){
                var newType = $typeList.val();
                self._changeType(newType);
            }).val(self.options.type);
            if(this.options.showType) {
                this.element.append($type);
            }
            var $chart = $('<div>').appendTo(this.element);
            this.element.chart = $chart;
            this.element.typeList =$typeList;
        },
        _init: function() {
            var self = this;
            $LAB.script("extra/highcharts.js","extra/grouped-categories.js").wait(function() {
                if (self.options.colorArray && self.options.colorArray.length > 0) {
                    self._setColor(self.options.colorArray);
                }
                self._initURLData();
            });
        },
        destroy: function() {
            this.element.html('');
            $.Widget.prototype.destroy.call(this);
        }
    });
    
    /**
     * 解析BI返回数据
     */
    $.fn.analyticalData = function(json,recursion) {
		var options = {},
        cellset = json.cellset,
        cIndex = 0,
        rIndex = 0,
        cLength = 0,
        yMin = 0;
		$.each(cellset, function(y, items) {
            var flag = true;
			cLength = items.length;
			$.each(items, function(x, item) {
				if (item.type === "DATA_CELL") {
					rIndex = y;
					cIndex = x;
					return flag = false;
				}
			});
            if(!flag) { 
                return false;
            }
		}); 
        // X轴初始化
        options.xAxis = {};
        options.xAxis.categories = [];
        // 递归方法初始categories
        var initRecursionCategories = function(_rIndex, _cIndex, _length) {
            var categories = [];
            var _y = _rIndex;
            var _x = _cIndex;
            while(_y < _length) {
                if(_x == (cIndex-1)) {
                    categories.push(cellset[_y][_x].value);
                    _y++;
                } else {
                    var l = 1;
                    while(_y+l < cellset.length && (cellset[_y+l][_x].value == "null" || cellset[_y+l][_x].value == undefined || cellset[_y+l][_x].value == "")) {
                        l++;
                    }
                    if(cellset[_y][_x].value == "null" || cellset[_y][_x].value == undefined || cellset[_y][_x].value == "") {
                        y++;
                        continue;
                    }
                    var _obj = {};
                    _obj.name = cellset[_y][_x].value;
                    _obj.categories = initRecursionCategories(_y,_x+1, _y+l);
                    _y+=l;
                    categories.push(_obj);
                }
            }
            return categories;
        };
        var initCategories = function(categories, _rIndex, _cIndex, _length, higher) {
            var _y = _rIndex;
            var _x = _cIndex;
            while(_y < _length) {
                if(_x == (cIndex-1)) {
                    categories.push(higher + " " + cellset[_y][_x].value);
                    _y++;
                } else {
                    var l = 1;
                    while(_y+l < cellset.length && (cellset[_y+l][_x].value == "null" || cellset[_y+l][_x].value == undefined || cellset[_y+l][_x].value == "")) {
                        l++;
                    }
                    if(cellset[_y][_x].value == "null" || cellset[_y][_x].value == undefined || cellset[_y][_x].value == "") {
                        y++;
                        continue;
                    }
                    higher = higher + " " + cellset[_y][_x].value;
                    initCategories(categories, _y, _x+1, _y+l,higher);
                    _y+=l;
                }
            }
            return categories;
        };
        if(recursion || recursion == undefined) {
            options.xAxis.categories = initRecursionCategories(rIndex,0,cellset.length);
        } else {
            options.xAxis.categories = initCategories([],rIndex,0,cellset.length,'');
        }
        // 数据
		options.series = [];
		for (var x = cIndex; x < cLength; x++) {
            var obj = {},data = new Array();
            for(var y = rIndex;y < cellset.length;y++) {
                try{
                    var value = parseFloat(cellset[y][x].value.replace(/,/g,''))||0;
                    if(value < yMin) {
                        yMin = value;
                    }
                    data.push(value);
                } catch(e){}
            }
            obj.name = cellset[rIndex - 1][x].value;
            obj.data = data;
            options.series.push(obj);
		}
        options.yAxis = {
            min: yMin
        }; 
		return options;
	};
} (jQuery));
