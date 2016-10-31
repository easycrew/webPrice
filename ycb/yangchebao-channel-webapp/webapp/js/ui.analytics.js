(function($, undefined) {
	$.widget("bi.analytics", {
		options : {
			uuid: null,
			demision:[],
			page: true,
			amount:{'flag':false},
			config:{connection:'',catalog:'',schema:'',cube:'',formatter:'flattened',type:'QM',file:''},
			metaData: undefined,
			initCallbackFn:false,
			columnPosition:0,
			rowPosition:0,
			filterPositon:0, 
			tOptions: null
		},
		initPromise : undefined,
		columnDefer : null,
		rowDefer : null,
		filterDefer : null, 
		_create : function() {
			this.columnDefer = [];
			this.rowDefer = [];
			this.filterDefer = [];
			if(sessionStorage) {
				var file = this.options.config.file;
				var key = file.substring(file.lastIndexOf('/') + 1,file.indexOf('.'));
				var uuid = sessionStorage.getItem(key);
				if(uuid && uuid !== '') {
					this.options.uuid = uuid;
				} else {
					if(this.options.uuid == undefined) {
						this.options.uuid = $.jRadUUID();
					}
					sessionStorage.setItem(key,this.options.uuid);
				}
			} else {
				if(this.options.uuid == undefined) {
					this.options.uuid = $.jRadUUID();
				}
			}
		},
		/**
		 * 初始化数据
		 */
		_init : function() { 
			var uuid = this.options.uuid;
			var options = this.options;
			var _initConfig = {};
			if(this.options.config.file == ''){
				$.each(options.config,function(property,value){
					if(property == 'file'){
					}else{
						_initConfig[property] = value;
					}
				});
			}else{
				_initConfig['file'] = options.config.file;
				_initConfig['type'] = options.config.type;
			}
			 this.initPromise = $
			.jRadFormData({
				beforeSend : this._beforeSend,
				url : '/pentaho/plugin/saiku/api/anonymous/query/'
						+ uuid,
				type : 'POST',
				dataType : 'JSON', 
				data : _initConfig
			});
			this.initPromise
			.done(options.initCallbackFn);  
		},
		/**
		 * @title 登录验证
		 * @private
		 * @method _beforeSend
		 */
		_beforeSend:function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic QWRtaW46cGFzc3dvcmQ=");
		},
		/**
		 * @title 添加一列
		 * @method addColumn
		 * @param {Object} dimesion
		 */
		addColumn:function(dimesion){
			var self = this; 
			var length = self.columnDefer.length; 
			var uuid = self.options.uuid;
			var formData = {position:self.options.columnPosition};
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/COLUMNS/dimension/';
			if(dimesion&&typeof dimesion ==="object"){
			if(dimesion.member){
				url = url +'0/member/0';
			}else if(dimesion.hierarchy){
				url = url +'0/hierarchy/0/0';
				}
				formData = $.extend(formData,dimesion);
			}else if(dimesion && typeof dimesion==="string"){
				url = url +dimesion;
			}
			var _initColumnDeferred = function(){
				$.jRadFormData({
				beforeSend:self._beforeSend,
				url:url,
				type:'POST',
				dataType:'text',
				data:formData 
				}).done(function(){   
				   self.columnDefer[length].resolve();
				}).fail(function(response){   
				   self.columnDefer[length].reject(); 
				});
				self.options.columnPosition++;
			};
			var deferred = $.Deferred(); 
			self.columnDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.columnDefer[length-1]).done(function(){
					_initColumnDeferred();
				});  
			}else{ 
				self.initPromise.done(_initColumnDeferred);  
			} 
		},
		/**
		 * @title 列筛选
		 * @method addColumnCondition
		 * @param {Object} dimesion
		 * @param {Object} formData 筛选条件
		 */
	   addColumnCondition:function(dimesion,formData){
			var self = this;
			var length = self.columnDefer.length; 
			var uuid = self.options.uuid;
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/COLUMNS/dimension/'+dimesion;
			var _initColumnDeferred = function(){
				$.jRadFormData({
					url:url,
					type:'PUT',
					dataType:'text',
					beforeSend:self._beforeSend,
					data:formData
				}).done(function(){   
				   self.columnDefer[length].resolve();
				}).fail(function(response){   
				   self.columnDefer[length].reject(); 
				});
			};
			var deferred = $.Deferred(); 
			self.columnDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.columnDefer[length-1]).done(function(){
					_initColumnDeferred();
				});  
			}else{ 
				self.initPromise.done(_initColumnDeferred);  
			} 
		},
		/**
		 * @title 添加一行
		 * @method addRow
		 * @param {Object} dimesion
		 */
		addRow:function(dimesion){ 
			var self = this; 
			var length = self.rowDefer.length; 
			var uuid = self.options.uuid;
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/ROWS/dimension/';
			var formData = {position:self.options.rowPosition};
			if(dimesion&&typeof dimesion ==="object"){
				if(dimesion.member){
					url = url +'0/member/0';
				}else if(dimesion.hierarchy){
					url = url +'0/hierarchy/0/0';
				}
				formData = $.extend(formData,dimesion);
			}else if(dimesion && typeof dimesion==="string"){
				url = url +dimesion;
			}
		   var _initRowDeferred = function(){ 
				$.jRadFormData({
				url:url,
				type:'POST',
				dataType:'text',
				beforeSend:self._beforeSend,
				data:formData 
				}).done(function(){   
				   self.rowDefer[length].resolve();
				}).fail(function(response){   
				   self.rowDefer[length].reject(); 
				});    
			self.options.rowPosition++;
		   }; 
			var deferred = $.Deferred(); 
			self.rowDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.rowDefer[length-1]).done(function(){
					_initRowDeferred();
				});  
			}else{ 
				self.initPromise.done(_initRowDeferred);  
			} 
		},
		
		/**
		 * @title 行筛选
		 * @method addRowCondition
		 * @param {Object} dimesion
		 * @param {Object} formData 筛选条件
		 */
		addRowCondition:function(dimesion,formData){
			var self = this;
			var length = self.rowDefer.length; 
			var uuid = self.options.uuid;
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/ROWS/dimension/'+dimesion; 
			var _initRowDeferred = function(){
			   	 $.jRadFormData({
					url:url,
					type:'PUT',
					dataType:'text',
					beforeSend:self._beforeSend,
					data:formData 
				}).done(function(){   
				   self.rowDefer[length].resolve();
				}).fail(function(response){   
				   self.rowDefer[length].reject(); 
				});  
			   };
			var deferred = $.Deferred(); 
			self.rowDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.rowDefer[length-1]).done(function(){
					_initRowDeferred();
				});  
			}else{ 
				self.initPromise.done(_initRowDeferred);  
			} 
		},
		/**
		 * @title 删除行
		 * @method deleteRow
		 * @param {Object} dimesion
		 */
		deleteRow:function(dimesion){
			var self = this;
			var length = self.rowDefer.length;
			var uuid = self.options.uuid;
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/ROWS/dimension/'+dimesion;
			var _initRowDeferred = function(){  
				$.jRadFormData({
				url:url,
				type:'delete' 
				}).done(function(){   
				   self.rowDefer[length].resolve();
				}).fail(function(response){   
				   self.rowDefer[length].reject(); 
				}); 
				self.options.rowPosition--;
			};
			var deferred = $.Deferred(); 
			self.rowDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.rowDefer[length-1]).done(function(){
					_initRowDeferred();
				});  
			}else{ 
				self.initPromise.done(_initRowDeferred);  
			} 
		},
		/**
		 * @title 倒序
		 * @method descRow
		 * @param {Object} dimesion
		 */
		descRow:function(dimesion){
			this.sortRow(dimesion,'BDESC');
		},
		/**
		 * @title 正序
		 * @method ascRow
		 * @param {Object} dimesion
		 */
		ascRow:function(dimesion){
			this.sortRow(dimesion,'BASC');
		},
		/**
		 * @title 排序
		 * @method sortRow
		 * @param {Object} dimesion
		 * @param {String} flag  倒序 BDESC;正序 BASC
		 */
		sortRow:function(dimesion,flag){
			var self = this;
			var length = self.rowDefer.length; 
			var uuid = self.options.uuid;
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/ROWS/sort/0/0';
			var formData = {sortorder: flag,sortliteral: dimesion};
			var _initRowDeferred = function(){  
			$.jRadFormData({
				url:url,
				type:'post',
				data: formData,
				beforeSend:this._beforeSend
			}).done(function(){   
			   self.rowDefer[length].resolve();
			}).fail(function(response){   
			   self.rowDefer[length].reject(); 
			}); 
			};
			var deferred = $.Deferred(); 
			self.rowDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.rowDefer[length-1]).done(function(){
					_initRowDeferred();
				});  
			}else{ 
				self.initPromise.done(_initRowDeferred);  
			} 
		},
		/**
		 * @title 删除过滤
		 * @method deleteFilter
		 * @param {Object} dimesion
		 */
		deleteFilter:function(dimesion){
			var self = this;
			var length = self.filterDefer.length;  
			var uuid = self.options.uuid;  
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/FILTER/dimension/';
			var formData = {position: self.options.filterPositon};
			if(dimesion&&typeof dimesion ==="object"){
				if(dimesion.member){
					url = url +'0/member/0';
				}else if(dimesion.hierarchy){
					url = url +'0/hierarchy/0/0';
				}
				formData = $.extend(formData,dimesion);
			}else if(dimesion && typeof dimesion==="string"){
				url = url +dimesion;
			}
			var _initFilterDeferred = function(){
				$.jRadFormData({
				url:url,
				type:'DELETE',
				data:formData 
				}).done(function(){   
				   self.filterDefer[length].resolve();
				}).fail(function(response){   
				   self.filterDefer[length].reject(); 
				}); 
				self.options.filterPositon--;
			}; 
			var deferred = $.Deferred(); 
			self.filterDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.filterDefer[length-1]).done(function(){
					_initFilterDeferred();
				});  
			}else{ 
				self.initPromise.done(_initFilterDeferred);  
			} 
		},
		/**
		 * @title 添加过滤器
		 * @method addFilter
		 * @param {Object} dimesion
		 */
		addFilter:function(dimesion){
			var self = this; 
			var length = self.filterDefer.length;
			var uuid = self.options.uuid;
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/FILTER/dimension/';
			var formData = {position: self.options.filterPositon};
			if(dimesion&&typeof dimesion ==="object"){
				if(dimesion.member){
					url = url +'0/member/0';
				}else if(dimesion.hierarchy){
					url = url +'0/hierarchy/0/0';
				}
			
				formData = $.extend(formData,dimesion);
			}else if(dimesion && typeof dimesion==="string"){
				url = url +dimesion;
			}
			var _initFilterDeferred = function(){
			    $.jRadFormData({
					url:url,
					type:'POST',
					dataType:'text',
					beforeSend:self._beforeSend,
					data:{
						position: 0
					}, 
					data:formData
				}).done(function(){   
				   self.filterDefer[length].resolve();
				}).fail(function(response){   
				   self.filterDefer[length].reject(); 
				}); 
				self.options.filterPositon++;
			}; 
			var deferred = $.Deferred(); 
			self.filterDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.filterDefer[length-1]).done(function(){
					_initFilterDeferred();
				});  
			}else{ 
				self.initPromise.done(_initFilterDeferred);  
			} 
		},
		/**
		 * @title 修改过滤器
		 * @method changeFilter
		 * @param {Object} dimesion
		 * @param {Object} formData 过滤条件
		 */
		changeFilter: function(dimesion, formData){
			var self = this;
			var length = self.filterDefer.length; 
			var uuid = self.options.uuid;
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid+'/axis/FILTER/dimension/'+dimesion;
			var _initFilterDeferred = function(){  
				$.jRadFormData({
				url: url,
				type:'PUT',
				dataType:'text',
				beforeSend:self._beforeSend,
				data: formData
				}).done(function(){   
				   self.filterDefer[length].resolve();
				}).fail(function(response){   
				   self.filterDefer[length].reject(); 
				});  
			};
			var deferred = $.Deferred(); 
			self.filterDefer.push(deferred);
			if(length >= 1){ 
				$.when(self.filterDefer[length-1]).done(function(){
					_initFilterDeferred();
				});  
			}else{ 
				self.initPromise.done(_initFilterDeferred);  
			} 
		},
		/**
		 * @title 查询
		 * @method query
		 * @param {Function} callback 回调函数
		 */
		query: function(callback) {
			var self = this; 
			self.loading(); 
			var arr = [];
			$.merge(arr,self.columnDefer);
			$.merge(arr,self.rowDefer);
			$.merge(arr,self.filterDefer);
			
			$.when.apply(this,arr).done(function(){
				// init deferred 对象  
				self.columnDefer = [];
				self.rowDefer = [];
				self.filterDefer = []; 
				var formatter = self.options.config.formatter || 'flat';
				var uuid = self.options.uuid;
				self.loading(); 
				self.options.metaData = $.jRadGet({
					url : '/pentaho/plugin/saiku/api/anonymous/query/' + uuid + '/result/' + formatter + '?limit=0',
					beforeSend : self._beforeSend,
					error : function(data) {
						$.jRadMessage({message : '获取数据异常',level : 'error'});
					}
				});
				if($.isFunction(callback)) {
					callback();
				}
				self.loaded();  
			}).fail(function(){
			    console.log("query error");
			});
		},
		/**
		 * @title 开始加载，显示加载图层
		 * @method loading
		 */
		loading:function(){
			var self = this;
			if (!self.element.hasClass("position-relative")) {
				self.element.addClass("position-relative");
			}
			self.element.append('<div class="widget-box-layer"><i class="icon-spinner icon-spin icon-2x white"></i></div>');
		},
		/**
		 * @title 加载结束取消加载图层
		 * @method loaded
		 */
		loaded:function(){
			this.element.find(".widget-box-layer").remove();
			this.element.removeClass("position-relative");
		},
		/**
		 * @title 数据格式化，转化成jqDataTable格式
		 * @author zhouminghua@che08.com
		 * @private
		 * @method _converter
		 */
		_converter:function(){
			var _saikuData = this.options.metaData,// 元数据
			aaData = [],
			aoColumns = [],
			rowGroups = [],
			table,
			colSpan,
			isHeaderLowestLvl,
			firstColumn,
			isLastColumn,
			nextHeader;
			table = _saikuData.cellset;
			if(!table) {
				return;
			}
			for (var row = 0; row < table.length; row++) {
				colSpan = 1;
				isHeaderLowestLvl = false;
				isLastColumn = false;
				var rowData = [];
				for (var col = 0; col < table[row].length; col++) {
					var header = table[row][col];
					// If the cell is a column header and is null (top left of table)
					if (header.type === "COLUMN_HEADER" && header.value === "null" && (firstColumn == null || col < firstColumn)) {
						
					} // If the cell is a column header and isn't null (column header of table)
					else if (header.type === "COLUMN_HEADER") {
						if (firstColumn == null) {
							firstColumn = col;
						}
						if (table[row].length == col + 1) isLastColumn = true;
						else nextHeader = table[row][col + 1];
						var _sWidth = $.isArray(this.options.sWidth) && col < this.options.sWidth.length?this.options.sWidth[col]:null;
                        var _sType = $.isArray(this.options.sType) && col < this.options.sType.length?this.options.sType[col]:'numeric-comma';
                        var _sClass = $.isArray(this.options.sClass) && col < this.options.sClass.length?this.options.sClass[col]:'center';
						if (isLastColumn) {
							// Last column in a row...
							if (header.value == "null") {
							} else {
								var _value = header.value;
                                if($.isArray(this.options.quota) && this.options.quota[col]) {
                                    _value += '<i class="icon-question-sign" data-content="'+this.options.quota[col]+'"></i>';
                                }
                                aoColumns.push({
                                    "sTitle": _value,
                                    "sWidth": _sWidth,
                                    "sClass": "col " + _sClass,
                                    "sType": _sType,
                                    "bSearchable": false
                                });
							}
						} else {
							// All the rest...
							var groupChange = (col > 1 && row > 1 && !isHeaderLowestLvl && col > firstColumn) ? table[row - 1][col + 1].value != table[row - 1][col].value: false;
							var maxColspan = colSpan > 999 ? true: false;
							if (header.value != nextHeader.value || isHeaderLowestLvl || groupChange || maxColspan) {
								if (header.value == "null") {
								} else {
									var _value = header.value;
                                    if($.isArray(this.options.quota) && this.options.quota[col]) {
                                        _value += '<i class="icon-question-sign" data-content="'+this.options.quota[col]+'"></i>';
                                    }
                                    aoColumns.push({
                                        "sTitle": _value,
                                        "sWidth": _sWidth,
                                        "sClass": _sClass + " " + (colSpan == 0 ? 1 : colSpan),
                                        "sType": _sType,
                                        "bSearchable": false
                                    });
								}
								colSpan = 1;
							} else {
								colSpan++;
							}
						}
					} // If the cell is a row header and is null (grouped row header)
					else if (header.type === "ROW_HEADER" && header.value === "null") {
						rowData.push('');
					} // If the cell is a row header and isn't null (last row header)
					else if (header.type === "ROW_HEADER") {
						if (lowestRowLvl == col) isHeaderLowestLvl = true;
						else nextHeader = table[row][col + 1];
						var previousRow = table[row - 1];
						var same = !isHeaderLowestLvl && (col == 0 || previousRow[col - 1].value == table[row][col - 1].value) && header.value === previousRow[col].value;
						var value = (same ? "": header.value);
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
						rowData.push(value);
					} else if (header.type === "ROW_HEADER_HEADER") {
						var _value = header.value;
                        if($.isArray(this.options.quota) && this.options.quota[col]) {
                            _value += '<i class="icon-question-sign" data-content="'+this.options.quota[col]+'"></i>';
                        }
                        var _sWidth = $.isArray(this.options.sWidth) && col < this.options.sWidth.length?this.options.sWidth[col]:null;
                        var _sType = $.isArray(this.options.sType) && col < this.options.sType.length?this.options.sType[col]:'numeric-comma';
                        var _sClass = $.isArray(this.options.sClass) && col < this.options.sClass.length?this.options.sClass[col]:'center';
                        aoColumns.push({
                            "bVisible": true,
                            "sTitle": _value,
                            "sWidth": _sWidth,
                            "sClass": _sClass,
                            "sType": _sType
                        });
						isHeaderLowestLvl = true;
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
						var val = header.value;
						var arrow = "";
						if (header.properties.hasOwnProperty('image')) {
							var img_height = header.properties.hasOwnProperty('image_height') ? " height='" + header.properties.image_height + "'": "";
							var img_width = header.properties.hasOwnProperty('image_width') ? " width='" + header.properties.image_width + "'": "";
							val = "<img " + img_height + " " + img_width + " style='padding-left: 5px' src='" + header.properties.image + "' border='0'>";
						}
						if (header.properties.hasOwnProperty('link')) {
							val = "<a target='__blank' href='" + header.properties.link + "'>" + val + "</a>";
						}
						if (header.properties.hasOwnProperty('arrow')) {
							arrow = "<img height='10' width='10' style='padding-left: 5px' src='/images/arrow-" + header.properties.arrow + ".gif' border='0'>";
						}
						rowData.push(val + arrow);
					}
				}
				if(rowData.length != 0) {
					aaData.push(rowData);
				}
			}
			this.options.dataTable = {
				aaData: aaData,
				aoColumns: aoColumns,
				"sPaginationType": "full_numbers",
				oLanguage: {
					"sInfoFiltered": "",
					"sZeroRecords": '没有匹配的数据',
					"sSearch": '检索：',
					"sInfo": "显示 _START_ 至 _END_ 共 _TOTAL_ 条",
					"oPaginate": {
						"sFirst": '首页',
						"sLast": '尾页',
						"sPrevious": '上一页',
						"sNext": '下一页'
					},
					"sEmptyTable": '无数据',
					"sInfoEmpty": "显示 0 至 0 共 0 条",
					"sLengthMenu": '<span>展示</span> <select>'+
							 '<option value="10">10</option>'+
							 '<option value="20">20</option>'+
							 '<option value="30">30</option>'+
							 '<option value="40">40</option>'+
							 '<option value="50">50</option>'+
							 '<option value="-1">全部</option>'+
							 '</select> <span>条</span>'
				}
			};
			if(this.options.tOptions != undefined && this.options.tOptions) {
				$.extend(true,this.options.dataTable,this.options.tOptions);
			}
		},
		/**
		 * @title 渲染表格
		 * @method renderTable
		 */
	   renderTable:function(){
            var options = this.options;
            if (!options.metaData || !options.metaData.cellset || options.metaData.cellset.length == 0) {
                var oTable = $('<table>');
                oTable.html('<tr><td class="no-data-msg"><div>暂无数据</div></td></tr>');
                this.element.find('.jrad-dimensiontable').html(oTable);
                delete this._oTable;
            } else { 
                var self = this;
                try{
                    this.loading();
                    this._converter();
                    var oTable = this._oTable;
                    var scrollBody;
                    var dataLength = this.options.dataTable.aaData.length;
                    if(!oTable) {
                        if(dataLength>options.showRow){
                            options.dataTable.sScrollY = (30*options.showRow + 2)+"px"; 
                        }else{
                            options.dataTable.sScrollY = (30*dataLength + 2) +"px";
                        }
                        oTable = $('<table>');
                        this.element.find('.jrad-dimensiontable').html(oTable);
                        oTable = oTable.dataTable(this.options.dataTable); 
                        scrollBody = oTable.parents('.dataTables_wrapper').find('.dataTables_scrollBody');
                        if(options.dataTable.sScrollY!=""){
                            oTable.parents(".dataTables_scroll").children(".dataTables_scrollHead").css("background",'url("css/images/table-th.png") repeat-x scroll 0 bottom #F7F7F7')
                        }
                        if(options.filterCondition) {
                            var filterDiv = $('<div>').addClass('filter-condition');
                            var $a = $('<a>').text('筛选').addClass('filter-op');
                            $a.append('<i class="icon-angle-down"></i>');
                            filterDiv.append($a);
                            var filterList = $('<div>').addClass('filter-list');
                            filterList.append('<span class="arrow"></span>');
                            var ul = $('<ul>');
                            $.each(this.options.dataTable.aoColumns,function(index,column){
                                if(column.bVisible) {
                                    return;
                                }
                                // 列不做筛选
                                var selectClass = "selected";
                                var sTitle = column.sTitle;
                                var $li = '<li><div data-index="'+index+'" class="ui-checkbox '+selectClass+'"><input type="checkbox" value="0" /><label>'+sTitle+'</label></div></li>';
                                ul.append($li);
                            });
                            filterList.append(ul);
                            filterDiv.append(filterList);
                            oTable.parents('.dataTables_wrapper').prepend(filterDiv);
                            filterDiv.find('a').click(function(event){
                                filterList.toggle();
                                $.jRadCancelPop(event);
                            });
                            filterList.find('.ui-checkbox').click(function(event){
                                var self = $(this);
                                var options = self.options;
                                var index = self.data('index');
                                self.toggleClass('selected');
                                oTable.fnSetColumnVis( index, self.hasClass('selected') );
                                $.jRadCancelPop(event);
                            });
                            filterDiv.bind('mouseleave',function(){
                                filterList.hide();
                            });
                            oTable.parents('.dataTables_wrapper').find('.dataTables_length').css('right',85);
                        }
                        oTable.on('page',function(event,oSettings){
                            if(oSettings._iDisplayStart + oSettings._iDisplayLength > oSettings.fnRecordsDisplay()) {
                                var length = oSettings.fnRecordsDisplay()-oSettings._iDisplayStart;
                                if(length>options.showRow){
                                    scrollBody.height((30*options.showRow + 2));
                                } else {
                                    scrollBody.height((30*length + 2));
                                }
                            } else {
                                if(dataLength>options.showRow){
                                    scrollBody.height((30*options.showRow + 2));
                                } else {
                                    scrollBody.height('auto');
                                }
                            }
                        });
                        oTable.on('filter',function(event,oSettings){
                            var length = oSettings.aiDisplay.length;
                            if(length > options.showRow) {
                                scrollBody.height((30*options.showRow + 2));
                            } else {
                                scrollBody.height('auto');
                            }
                        });
                    } else {
                        scrollBody = oTable.parents('.dataTables_wrapper').find('.dataTables_scrollBody');
                        if(dataLength>options.showRow){
                            oTable.fnSettings().oScroll.sY = (30*options.showRow + 2)+"px";
                            scrollBody.height((30*options.showRow + 2));
                        }else{
                            delete options.dataTable.sScrollY;
                            scrollBody.height('auto');
                        }
                        oTable.fnClearTable();
                        oTable.fnAddData( this.options.dataTable.aaData, true );
                        //oTable = oTable.dataTable(this.options.dataTable);
                    }
                    if($.isArray(this.options.quota)) {
                        oTable.parents('.dataTables_wrapper').find('th i.icon-question-sign').each(function(){
                            var _content = $(this).data('content');
                            $(this).popover({
                                html: true,
                                content: _content,
                                placement: 'mouse',
                                container: 'body',
                                trigger: 'hover'
                            });
                        });
                    }
                    self.loaded();
                    this._oTable = oTable;
                }catch(e){
                    self.loaded();
                }
            }
        },
		clearTable: function() {
			if(this._oTable != undefined) {
				/**this._oTable.fnClearTable();**/
				 var oTable = $('<table>');
				 oTable.html('<tr><td class="no-data-msg"><div>暂无数据</div></td></tr>');
                 this.element.find('.jrad-dimensiontable').html(oTable);
                 delete this._oTable;
			}
		},
		/**
		 * @title 渲染图表
		 * @renderChart
		 */
		renderChart:function(){
		},
		remove:function(){
			var uuid = this.options.uuid;
			var formData = this.options.config;
			var url = '/pentaho/plugin/saiku/api/anonymous/query/'+uuid;
			$.jRadFormData({
				url:url,
				type:'DELETE',
				dataType:'text',
				beforeSend:this._beforeSend,
				data:formData
			});
		},
		/**
		 * @title 获取/设置 数据
		 * @method data
		 * @param {undefined or Object}
		 */
		data: function(metaData) {
			if(metaData != undefined) {
				this.options.metaData = metaData;
			} else {
				return this.options.metaData;
			}
		},
		/**
		 * @title 销毁
		 * @method destory
		 */
		destory: function() {
			this.remove();
			$.Widget.prototype.destroy.call(this);
		}
	});
	
	/**
	 * @title 自定义jqDataTable排序功能 正序
	 * @author zhouminghua@che08.com
	 */
	$.fn.dataTableExt.oSort['numeric-comma-asc']  = function(a,b) {
		var x,y;
		if(typeof a === 'string' && a.indexOf('%') != -1){
			x = a.indexOf('%') != -1 ? a.substring(0,a.indexOf('%')) : -1;
		} else {
			x = (a == "-" || a == "" || a == "null") ? -1 : a.replace(",", "." );
		}
		if(typeof b === 'string' && b.indexOf('%') != -1) {
			y = b.indexOf('%') != -1 ? b.substring(0,b.indexOf('%')) : -1;
		} else {
			y = (b == "-" || b == "" || b == "null") ? -1 : b.replace( ",", "." );
		}
		x = parseFloat( x );
		y = parseFloat( y );
		return ((x < y) ? -1 : ((x > y) ?  1 : 0));
	};
	/**
	 * @title 自定义jqDataTable排序功能 倒序
	 * @author zhouminghua@che08.com
	 */
	$.fn.dataTableExt.oSort['numeric-comma-desc'] = function(a,b) {
		var x,y;
		if(typeof a === 'string' && a.indexOf('%') != -1){
			x = a.indexOf('%') != -1 ? a.substring(0,a.indexOf('%')) : -1;
		} else {
			x = (a == "-" || a == "" || a == "null") ? -1 : a.replace(",", "." );
		}
		if(typeof b === 'string' && b.indexOf('%') != -1) {
			y = b.indexOf('%') != -1 ? b.substring(0,b.indexOf('%')) : -1;
		} else {
			y = (b == "-" || b == "" || b == "null") ? -1 : b.replace( ",", "." );
		}
		x = parseFloat( x );
		y = parseFloat( y );
		return ((x < y) ?  1 : ((x > y) ? -1 : 0));
	};
	$.fn.dataTableExt.oSort['date-pre'] = function(a) {
		var x;
		if(typeof a == 'string') {
			x = moment(a,'YYYY-M-D').valueOf();
		} else if(typeof a == 'number') {
			x = moment(a).valueOf();
		}
		if ( isNaN(x) || x==="" )
		{
			x = Date.parse( "01/01/1970 00:00:00" );
		}
		return x;
	};
	$.fn.dataTableExt.oSort['date-asc'] = function(a, b) {
		var num = moment(a).diff(moment(b));
		return num < 0 ? -1 : (num > 0 ? 1 : 0);
	};
	$.fn.dataTableExt.oSort['date-desc'] = function(a, b) {
		var num = moment(a).diff(moment(b));
		return num < 0 ? 1 : (num > 0 ? -1 : 0);
	};
	$.fn.dataTableExt.oSort['week-asc'] = function(a, b) {
		var num = moment(a,'YYYY-ww').diff(moment(b,'YYYY-ww'));
		return num < 0 ? -1 : (num > 0 ? 1 : 0);
	};
	$.fn.dataTableExt.oSort['week-desc'] = function(a, b) {
		var num = moment(a,'YYYY-ww').diff(moment(b,'YYYY-ww'));
		return num < 0 ? 1 : (num > 0 ? -1 : 0);
	};
}(jQuery));