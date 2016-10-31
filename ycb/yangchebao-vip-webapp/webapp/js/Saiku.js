(function($) {
    /**
     * 解析BI数据，返回各项数据总和
     */
    $.jRadEncodeSaikuData = function(data) {
        var series = data.series || [];
        var arr = new Array();
        $.each(series,function(index,it){
            var _obj = {};
            var _data = it.data;
            var _total = 0;
            $.each(_data,function(index,count){
                _total+=count;
            });
            _obj.name = it.name;
            _obj.total = _total;
            arr.push(_obj);
        });
        return arr;
    };
    $.jRadUUID = function() {
        return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, 
           function (c) {
               var r = Math.random() * 16 | 0,
               v = c == 'x' ? r : (r & 0x3 | 0x8);
               return v.toString(16);
        }).toUpperCase();
    };
    $.jRadFormData = function(options) {
        options.contentType = 'application/x-www-form-urlencoded';
        options.async = options.async!=undefined?options.async:true;
        options.cache = false;
        return $.ajax(options);
    };
    /**
     * 获取时间条件
     * @param {String} date 时间参考点
     * @param {String or Number} level 某月/某月全部天/几天
     * @param {Number or undefined} 几个月
     * @return {Array} _dates 返回格式为"[2013].[10].[1]"多条数据
     */
    $.getSaikuDate = function(date,level,num) {
        var _year = parseInt(date.split("-")[0]);
        var _month = parseInt(date.split("-")[1]);
        var _dates = [];
        try{
            switch(level) {
                case 'month':
                    _dates.push('[' + _year + '].[' + _month +']');
                    break;
                case 'monthRange':
                    for(var i = 0,j=0; i < num;i ++) {
                        if(_month - i <= 0) {
                            _dates.push('[' + (_year - 1) + '].[' + (12-j) +']');
                            j++;
                        } else {
                            _dates.push('[' + _year + '].[' + (_month-i) +']');
                        }
                    }
                    break;
                case 'day':
                    var _day = date.split("-")[2];
                    _dates.push('[' + _year + '].[' + _month +'].[' + _day + ']');
                    return _date;
                default:
                    if(typeof level == 'number') {
                        for(var i = 0;i < level;i++) {
                            var _date = moment(date).add('days',i).format('YYYY-MM-DD');
                            _year = parseInt(_date.split("-")[0]);
                            _month = parseInt(_date.split("-")[1]);
                            var _day = parseInt(_date.split("-")[2]);
                            _dates.push('[' + _year + '].[' + _month +'].[' + (_day) + ']');
                        }
                    } else {
                        var _day = date.split("-")[2];
                        _dates.push('[' + _year + '].[' + _month +'].[' + _day + ']');
                    }
            }
        }catch(e) {
        }
        return _dates;
    };
    /**
     * 合并数据
     * @param {Array} news 新增用户数据源
     * @param {Array} remains 留存用户数据源
     * @return {Array} cellset 2个数据源合并的数据
     */
    $.jRadSaikuMerge = function(news,remains) {
        news = news || [];
        remains = remains || [];
        var currentMonth = moment().format('YYYY-MM').replace('-0','-');
        var cellset = [];
        for(var i = 0;i < news.length;i++) {
            var rowNew = news[i];
            var row = [];
            var flag = false;
            for(var j = 0; j< remains.length; j++ ){
                var rowRemain = remains[j];
                if(rowRemain[0].value == rowNew[0].value || (i == 0 && j == 0)) {
                    row.push(rowNew[0]);
                    row.push(rowNew[1]);
                    if(rowRemain[1].properties.position) {
                        rowRemain[1].properties.position = "1:" + i;
                    }
                    row.push(rowRemain[1]);
                    flag = true;
                }
            }
            var emptyValue = "0";
            if(rowNew[0].value == currentMonth) {
                emptyValue = "-";
            }
            if(!flag) {
                row.push(rowNew[0]);
                row.push(rowNew[1]);
                if(i == 0) {
                    row.push({
                        value: "月留存数",
                        type: "COLUMN_HEADER",
                        properties: {
                            dimension: "Measures",
                            hierarchy: "[Measures]",
                            level: "[Measures].[MeasuresLevel]",
                            uniquename: "[Measures].[m_count]"
                        }
                    });
                } else {
                    row.push({
                        value: emptyValue,
                        type: "DATA_CELL",
                        properties: {
                            position: "1:" + i,
                            raw: emptyValue
                        }
                    });
                }
            }
            if($.isEmptyObject(row)) {
                continue;
            }
            cellset.push(row);
        }
        return cellset;
    };
    /**
     * 计算百分比 默认是除法 在原数据中追加一列
     * @method jRadSaikuScale
     * @param {Array} _cellset 需要处理的数据源
     * @param {Number} divisorIndex 除数索引
     * @param {Number} dividendIndex 被除数索引
     * @param {String} thName 列标题
     * @param {Function} scaleFunc 自定义除数 与 被除数之间的运算
     * @param {Number} _y 是否错位
     * @return {Array} cellset 返回整理好的数据
     */
    $.jRadSaikuScale = function(_cellset,divisorIndex,dividendIndex,thName,scaleFunc,_y) {
        var cellset = [],
        _y = _y || 0,
        newCell = [],
        max = (divisorIndex>dividendIndex?divisorIndex:dividendIndex) + 1;
        try{
            for(var y = 0;y < _cellset.length; y++) {
                var items = _cellset[y];
                if(y == 0) {
                    var cell = {
                        value: thName,
                        type: "COLUMN_HEADER",
                        properties: {
                            "uniquename": "[Auto].[th]",
                            "hierarchy": "[Auto]",
                            "dimension": "Auto",
                            "level": "[Auto].[th]"
                        }
                    };
                    newCell.push(cell);
                } else {
                    var cell = {
                        value: "-",
                        type: "DATA_CELL",
                        properties: {
                            position: y +":" + max,
                            raw: "-"
                        }
                    };
                    if((y-_y) <= 0 || (y-_y) > _cellset.length) {
                        newCell.push(cell);
                    } else {
                        var dividend = items[dividendIndex];
                        var divisor = _cellset[y-_y][divisorIndex];
                        if(divisor.value == "") {
                            newCell.push(cell);
                            continue;
                        }
                        if(divisor.type === 'DATA_CELL' && dividend.type === 'DATA_CELL') {
                            var scale = 0;
                            if($.isFunction(scaleFunc)) {
                                scale = scaleFunc(dividend.value,divisor.value);
                            } else {
                                if(divisor.value !== 0 && divisor.value !== '0') {
                                    scale = parseFloat((dividend.value.replace(',','')/divisor.value.replace(',','')) * 100);
                                }
                                scale = $.jRadFormatFloat(scale,2) + "%";
                            }
                            cell.value = scale;
                            cell.properties.raw = scale;
                        }
                        newCell.push(cell);
                    }
                }
            }
            for(var y = 0;y < _cellset.length; y++) {
                var items = _cellset[y];
                var _items = [];
                for(var x = 0;x < (items.length + 1);x++) {
                    if(x < max) {
                        _items.push(items[x]);
                    } else if(x == max){
                        _items.push(newCell[y]);
                    } else {
                        var item = $.extend(true,{},items[x - 1]);
                        item.properties.position = y + ":" + x;
                        _items.push(item);
                    }
                }
                cellset.push(_items);
            }
        }catch(e) {
            return cellset;
        }
        return cellset;
    };
    /**
     * 保留小数位
     * @method jRadFormatFloat
     * @param {Float} src 需要格式化的数字
     * @param {Number} pos 需要保留几位小数
     * @return {Floag}
     */
    $.jRadFormatFloat = function(src, pos){
        return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
    };
})(jQuery);