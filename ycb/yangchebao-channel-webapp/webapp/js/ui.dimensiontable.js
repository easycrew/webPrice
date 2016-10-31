/**
 * 多维表格
 */
(function($, undefined) {
    $.widget("jrad.dimtable", {
        options: {
            url: false,
            data: false,
            page: true,
			callback:null
        },
        _pager: null,
        _renderPager: function() {
            var self = this;
            this.element.footer.html('');
            var $page = $("<div></div>").appendTo(this.element.footer);
            $page.page({
                display_entries: 3,
                pageindex: self._pager.current,
                pagesize: self._pager.rp,
                totalCount: self._pager.total,
                totalPages: self._pager.totalPages,
                align: 'right',
                callback: function(pageIndex) {
                    if(self.element.pageindex != pageIndex) {
                        self._pager.current = pageIndex;
                        self._dataFalling();
						if($.isFunction(self.options.callback)){
							self.options.callback();
						}
                    }
                }
            });
        },
		_amount: function() {
            var self = this;
			var position = this.options.amount.position.split(",");//'x,y' 第x行 第y列
			var x = parseInt(position[0]); 
			var y = parseInt(position[1]); 
			var _table = this.element.table;
			var _trs = _table.find("tr");
			if(this.options.amount.x){ 
			  for(var r=0;r<x-2;r++){
			    var _th = $("<th>").addClass('all_null').html('<div></div>');
				$(_trs[r]).append(_th);
			  }
			  var _th = $("<th>").addClass('col').css('text-align','center').html('<div>总计</div>');
			  $(_trs[x-2]).append(_th);
			  $.each(_trs,function(i){
				var _tr = $(_trs[i]); 
				if(i+1>=x){ 
				   var _tds =  _tr.children('.data');
				   var amountX = 0
				   $.each(_tds,function(y){ 
					 var data = $(_tds[y]).children('div').html();
					 if (data==""){
						$(_tds[y]).children('div').html("0");
						data = 0;
					 }
				     var val = parseFloat(data);  
					 amountX += val;  
				   });
				   _tr.append('<td class="data"><div>'+amountX+'</div></td>'); 
				}
			  });
			}
			if(this.options.amount.y){ 
			    var _addtr = $("<tr>");
				for(var n=1;n<y-1;n++){
					_addtr.append('<th class="row_null"><div>&nbsp;</div></th>');
				}
				_addtr.append('<th class="row_content"><div>总计</div></th>');
			    var length = $(_trs[x-1]).children('.data').length; 
				for(var i=0;i<length;i++){ 
					var index = i+y-1; 
					var amountY = 0; 
				  	$.each(_trs,function(j){ 
					 if(j+1>=x){
					    var _tr = $(_trs[j]); 
						var data = $(_tr.children()[index]).children().html();
						if (data==""){
							$(_tr.children()[index]).children().html("0");
							data = 0;
						}
					    var val = parseFloat(data);  
					    amountY += val;   
					 }   
				  });
				  _addtr.append('<td class="data"><div>'+amountY+'</div></td>'); 
				}  
				_table.append(_addtr);
			//<tr><th class="row_content"><div rel="1:0">车行</div></th><td class="data"><div alt="5.0" rel="0:0">5</div></td></tr>
			}
            //this.element.table.append();  
        },
        resize: function() {
            this._resize();
        },
        _resize: function() {},
        dataFalling: function(data) {
            this._dataFalling(data);
        },
        _dataFalling: function(data) {
            var contents = "",
            table = data ? data : (this.options.data && this.options.data.cellset ? this.options.data.cellset : []),
            isBody = false,
            processedRowHeader = false,
            lowestRowLvl = 0,
            rowGroups = [],
            headerIndex = 0,
            dataIndex = 0,
            endIndex = 0,
            colSpan,colValue,isHeaderLowestLvl,firstColumn,isLastColumn, isLastRow,nextHeader;
            if(table == undefined || table.length == 0) {
                this.element.table.html('<tr><td class="no-data-msg"><div>暂无数据</div></td></tr>');
                if(this.options.page) {
                    this._renderPager();
                }
                return;
            }
            if(this.options.page) {
                // headerIndex为th的行数
                $.each(table,function(i,cells){
                    var flag = true;
                    $.each(cells,function(k,cell){
                        if(cell.type === 'DATA_CELL') {
                            headerIndex = i;
                            flag = false;
                            return flag;
                        }
                    });
                    return flag;
                });
                this._pager.total = table.length - headerIndex;
                this._pager.totalPages = this._pager.total%this._pager.rp != 0 ? (parseInt(this._pager.total/this._pager.rp) + 1):parseInt(this._pager.total/this._pager.rp);
                dataIndex = this._pager.current * this._pager.rp;// 起始index
                endIndex = (this._pager.current+1)*this._pager.rp;
            }
            for (var i = 0; i < table.length; i++) {
                var row;
                if(i < headerIndex || !this.options.page) {
                    row = i;
                } else {
                    row = dataIndex + i;
                    if(row >= table.length||row>endIndex) {
                        break;
                    }
                }
                colSpan = 1;
                colValue = "";
                isHeaderLowestLvl = false;
                isLastColumn = false;
                isLastRow = false;
                contents += "<tr>";
                for (var col = 0; col < table[row].length; col++) {
                    var header = table[row][col];
                    // If the cell is a column header and is null (top left of table)
                    if (header.type === "COLUMN_HEADER" && header.value === "null" && (firstColumn == null || col < firstColumn)) {
                        contents += '<th class="all_null"><div>&nbsp;</div></th>';
                    } // If the cell is a column header and isn't null (column header of table)
                    else if (header.type === "COLUMN_HEADER") {
                        if (firstColumn == null) {
                            firstColumn = col;
                        }
                        if (table[row].length == col + 1) isLastColumn = true;
                        else nextHeader = table[row][col + 1];

                        if (isLastColumn) {
                            // Last column in a row...
                            if (header.value == "null") {
                                contents += '<th class="col_null"><div>&nbsp;</div></th>';
                            } else {
                                contents += '<th class="col" style="text-align: center;" colspan="' + colSpan + '" title="' + header.value + '"><div rel="' + row + ":" + col + '">' + header.value + '</div></th>';
                            }
                        } else {
                            // All the rest...
                            var groupChange = (col > 1 && row > 1 && !isHeaderLowestLvl && col > firstColumn) ? table[row - 1][col + 1].value != table[row - 1][col].value: false;
                            var maxColspan = colSpan > 999 ? true: false;
                            if (header.value != nextHeader.value || isHeaderLowestLvl || groupChange || maxColspan) {
                                if (header.value == "null") {
                                    contents += '<th class="col_null" colspan="' + colSpan + '"><div>&nbsp;</div></th>';
                                } else {
                                    contents += '<th class="col" style="text-align: center;" colspan="' + (colSpan == 0 ? 1 : colSpan) + '" title="' + header.value + '"><div rel="' + row + ":" + col + '">' + header.value + '</div></th>';
                                }
                                colSpan = 1;
                            } else {
                                colSpan++;
                            }
                        }
                    } // If the cell is a row header and is null (grouped row header)
                    else if (header.type === "ROW_HEADER" && header.value === "null") {
                        contents += '<th class="row_null"><div>&nbsp;</div></th>';
                    } // If the cell is a row header and isn't null (last row header)
                    else if (header.type === "ROW_HEADER") {
                        if (lowestRowLvl == col) isHeaderLowestLvl = true;
                        else nextHeader = table[row][col + 1];
                        var previousRow = table[row - 1];
                        var same = !isHeaderLowestLvl && (col == 0 || previousRow[col - 1].value == table[row][col - 1].value) && header.value === previousRow[col].value;
                        var value = (same ? "<div>&nbsp;</div>": '<div rel="' + row + ":" + col + '">' + header.value + '</div>');
                        var tipsy = "";
                        var cssclass = (same ? "row_null": "row_content");
                        var colspan = 0;
                        if (!isHeaderLowestLvl && (typeof nextHeader == "undefined" || nextHeader.value === "null")) {
                            colspan = 1;
                            var group = header.properties.dimension;
                            var level = header.properties.level;
                            var groupWidth = (group in rowGroups ? rowGroups[group].length - rowGroups[group].indexOf(level) : 1);
                            for (var k = col + 1; colspan < groupWidth && k <= (lowestRowLvl + 1) && table[row][k] !== "null"; k++) {
                                colspan = k - col;
                            }
                            col = col + colspan - 1;
                        }
                        contents += '<th class="' + cssclass + '" ' + (colspan > 0 ? ' colspan="' + colspan + '"': "") + tipsy + '>' + value + '</th>';
                    } else if (header.type === "ROW_HEADER_HEADER") {
                        contents += '<th class="row_header"><div>' + header.value + '</div></th>';
                        isHeaderLowestLvl = true;
                        processedRowHeader = true;
                        lowestRowLvl = col;
                        if (header.properties.hasOwnProperty("dimension")) {
                            var group = header.properties.dimension;
                            if (! (group in rowGroups)) {
                                rowGroups[group] = [];
                            }
                            rowGroups[group].push(header.properties.level);
                        }
                    } // If the cell is a normal data cell
                    else if (header.type === "DATA_CELL") {
                        var color = "";
                        var val = header.value;
                        var arrow = "";
                        if (header.properties.hasOwnProperty('image')) {
                            var img_height = header.properties.hasOwnProperty('image_height') ? " height='" + header.properties.image_height + "'": "";
                            var img_width = header.properties.hasOwnProperty('image_width') ? " width='" + header.properties.image_width + "'": "";
                            val = "<img " + img_height + " " + img_width + " style='padding-left: 5px' src='" + header.properties.image + "' border='0'>";
                        }
                        if (header.properties.hasOwnProperty('style')) {
                            color = " style='background-color: " + header.properties.style + "' ";
                        }
                        if (header.properties.hasOwnProperty('link')) {
                            val = "<a target='__blank' href='" + header.properties.link + "'>" + val + "</a>";
                        }
                        if (header.properties.hasOwnProperty('arrow')) {
                            arrow = "<img height='10' width='10' style='padding-left: 5px' src='/images/arrow-" + header.properties.arrow + ".gif' border='0'>";
                        }
                        contents += '<td class="data" ' + color + '><div alt="' + header.properties.raw + '" rel="' + header.properties.position + '">' + val + arrow + '</div></td>';
                    }
                }
                contents += "</tr>";
            }
            this.element.table.html(contents);
            if(this.options.page) {
                this._renderPager();
            }
			if(this.options.amount.flag) { 
                this._amount();
            }
        },
        loadData: function() {
            this._loadData();
        },
        _loadData: function() {
            var self = this;
            $.jRad__ajax(self.options.type?self.options.type:'get',{
                url : self.options.url,
                async : self.options.async?self.options.async:false,
                success: function(data) {
                    if($.isFunction(self.options.preProcessdata)){
                        var _data = self.options.preProcessdata(data);
                        data = _data || data;
                    }
                    if(data && data.cellset) {
                        self.options.data = data;
                        self.dataFalling(data.cellset);
                    }
                    if($.isFunction(self.options.success)) {
                        self.options.success(data);
                    }
                },
                error: self.options.error
            });
        },
        reload: function() {
            this._loadData();
        },
        _init: function() {
            this._initElement();
            this._initEvent();
            if (this.options.data) {
                this.dataFalling();
            } else {
                this.loadData();
            }
        },
        _create: function() {
            this.element.addClass('ui-dimtable');
            var $table = $('<table>').appendTo(this.element);
            this.element.table = $table;
            if(this.options.page) {
                var $footer = $('<div>').addClass('table-footer').appendTo(this.element);
                this.element.footer = $footer;
            }
        },
        _initElement: function() {
            this._pager = {
                current: 0,
                total: 0,
                totalPages: 0,
                rp: 10
            };
        },
        _initEvent: function() {},
        destroy: function() {
            this.element.html('');
            this.element.removeClass('ui-dimtable');
            $.Widget.prototype.destroy.call(this);
        }
    });
} (jQuery));