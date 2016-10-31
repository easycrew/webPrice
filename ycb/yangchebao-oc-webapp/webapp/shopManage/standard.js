
$(document).ready(function(){
			/* 标准化服务 */
	$(".details-tab2 .f-left",wraper).click(function(){
    	$(".details-tab2 .tab-cur").removeClass("tab-cur");
		$(this).addClass("tab-cur");
		var rele = $(this).attr("rele");
		$(".tabReleForm2",wraper).hide();

		if(rele=="carwash"){
			getServiceInfo2("1","carwash",id)
		}else if(rele=="beautify"){
			getServiceInfo2("2","beautify",id)
		}else if(rele=="upkeep"){
			getServiceInfo2("3","upkeep",id)
		}else if(rele=="repair"){
			getServiceInfo2("4","repair",id)
		}
		//$('div#'+rele,wraper).show()
    });
	//getServiceInfo2("1","carwash",id);
	
	function getServiceInfo2(type,typeName,id){ 
		var serviceTable=$('#Table_settle_'+typeName);

	    var page_column_model = new Array();
	    var page_list_buttons = new Array();
		var entityModel = {};
	    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel});  

		jRad.validators['useRule'] = [{msg:"使用规则不能为空",type:'min',value:'1'}];  
		jRad.validators['sequence'] = [{msg:"排序号不能为空",type:'min',value:'1'}];
		jRad.validators['illustrate'] = [{msg:"服务说明不能为空",type:'min',value:'1'}];
		var fields_params = {};  
		fields_params['isCompensate'] = {
			data: [{id:'0',name:'否'},{id:'1',name:'是'}]
		};  
		fields_params['isSubsidy'] = {
			data: [{id:'0',name:'否'},{id:'1',name:'是'}]
		};
		fields_params['useRule'] = {
			grid:10
		};
		var getNameList = [];
	    var _result = $.jRadGet({url: '/shopmanage-ws/ws/0.1/busiStandardService/getServiceList?serviceType='+type});
	    $.each(_result,function(index, vo){
	      var __id = vo['serviceId'];
	      var __name = vo['serviceName'];
	      var __tm = {'id': __id,'name': __name};
	      getNameList.push(__tm);
	    });
	    var reserveInfoSelect = $.jRadGetDataSources('/shopmanage-ws/ws/0.1/datadictionary/dictionarylist?type=reserve_info','id','name'); 
		fields_params['reserveInfo'] = {
			grid:10,
			data:reserveInfoSelect
		};

	    fields_params['serviceId'] = {
	        data:getNameList,
	  	    onclick:function(){
			  	$('#Form_standard_service .jrad-btn-primary').button({
					click: function(){
						var flag = $('#Form_standard_service').form('validateAll');
						if(flag){
							var json = $('#Form_standard_service').form('getValue');  
							var attrOption =[];
							$('#process tbody tr').each(function(i){ 
								var att ={};
								att.shopPrice = $("#process tbody tr").eq(i).find("td input[name='shopPrice']").val();
								att.reservePrice = $("#process tbody tr").eq(i).find("td input[name='reservePrice']").val();
								att.clearingPrice = $("#process tbody tr").eq(i).find("td input[name='clearingPrice']").val();
								att.attrOptionIdList = step.optionList[i];
								attrOption.push(att)
							})
							json.attrOption = attrOption;
							json.serviceType = type;
							json.businessInfoId = id;
							json.operator = carsmart_config.operatorName;
							$.jRadPost({
								url: '/shopmanage-ws/ws/0.1/busiStandardService/addBusiService',
								data:json,
								success:function(data){ 
									var msg = $(".details-box .details-tab").find("span[name='title']").html()+"成功！";
									$.jRadMessage({ level:'success',message:msg}); 
									$('#Form_standard_service').form({}).form('close');
									serviceTable.flexReload();  
								},error:function(data){
									var mes = eval('('+data.responseText+')');
									 $.jRadMessage({level:'error', message:mes[0].message });
								}
							});
						 
						}	 
					}
				});

			  	$('#Form_standard_service .jrad-btn-normal').button({
					click: function(){ 
						$('#Form_standard_service').form({
							success_callback: function(){ 
								serviceTable.flexReload();
							}
						}).form('close');  
					}   
				});

	  	    	var urlstr = '/shopmanage-ws/ws/0.1/busiStandardService/getAttrOptionInfo'
				var fristId = $("div[name='serviceId']").select('val');
	            var flag = (fristId!=undefined&&fristId!="");
			    if(flag){ 
			 	    urlstr = '/shopmanage-ws/ws/0.1/busiStandardService/getAttrOptionInfo?serviceId='+fristId;
			    }
			 	var Data = $.jRadGet({url : urlstr});
			    var _moudle = $(".app");
			    _moudle.html("");

				$.each(Data,function(j){
			 		var info = Data[j]; 
			 		var _row = $("<div style='overflow:hidden'>").addClass('div_contentlist');
			 		var _ul = $("<ul class='Father_Title'>")
					var _li = $("<li style='float:left;width:150px;text-align:right;'>").attr("data",info.attrId).html(info.attrName +'：');
					var _div = $("<div class='divlist' style='float:left;margin-left:10px;'>");
					var _ul2 = $("<ul>").addClass("Father_Item" + j);
					var opt2 = [];
					var value2 = [];
					var _li2 = $("<li>");
					$.each(info.option,function(i){
						var param = info.option[i];
	                	var vk2 = {};
	                	vk2.id = param.optionId;
	                	vk2.name = param.optionName; 
	                	opt2.push(vk2); 
	                	value2.push(param.optionName); 
	          			var _label2 = $("<label style='margin-right:15px;float:left;'>");
			            var _input = $("<input type='checkbox' style='float:left;margin:2px 3px 0 0;'>").addClass("chcBox_Width").attr({value:param.optionName,alt:param.optionId})
			            var _span = $("<span>").addClass("li_empty").attr("contentEditable","true")
					    _li2.append(_label2.append(_input).append(param.optionName).append(_span))
					}); 

					if(info.option.length != 0){ 
						_ul2.append(_li2);
		        		_row.append(_ul.append(_li)).append(_div.append(_ul2));
		        		_moudle.append(_row);
	                }
			 	});

			 	if(_moudle.html() != ""){
			 		_moudle.append('<p class="note">您需要选择所有的扩展属性,才能组合成完整的服务信息。</p>')
			 	}
				
				$('#process').html("");

			    var step = {
			        //SKU信息组合
			        optionList:[],
			        Creat_Table: function () {
			        	var _step = this;
			            step.hebingFunction();
			            var SKUObj = $(".Father_Title");
			            //var skuCount = SKUObj.length;//
			            var arrayTile = new Array();//标题组数
			            var arrayInfor = new Array();//盛放每组选中的CheckBox值的对象
			            var arrayColumn = new Array();//指定列，用来合并哪些列
			            var attrOptionIdList = new Array();//自创添加数组
			            var bCheck = true;//是否全选
			            var columnIndex = 0;
			            $.each(SKUObj, function (i, item){
			                arrayColumn.push(columnIndex);
			                columnIndex++;
			                arrayTile.push(SKUObj.find("li").eq(i).html().replace("：", ""));
			                var itemName = "Father_Item" + i;
			                //选中的CHeckBox取值
			                var order = new Array();
			                $("." + itemName + " input[type=checkbox]:checked").each(function (){
			                    order.push($(this).val());
			                });
			                arrayInfor.push(order);

			                //选中的CHeckBox id取值
			                var data = []
			                $("." + itemName + " input[type=checkbox]:checked").each(function (){
			                	var json ={};
			                	json.attrId = $(this).parent().parent().parent().parent().prev().children().attr("data");
			                	json.optionId = $(this).attr("alt");
			                	var jsonstring = JSON.stringify(json)
			                	data.push(jsonstring)
			                });

							data.sort(getSortFun('desc', 'optionId'));
							function getSortFun(order, sortBy) {
							    var ordAlpah = (order == 'asc') ? '>' : '<';
							    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
							    return sortFun;
							}

			                attrOptionIdList.push(data)

			                if (order.join() == ""){
			                    bCheck = false;
			                } 
			            });

			            //开始创建Table表
			            if (bCheck == true) {
			                var RowsCount = 0;
			                $("#createTable").html("");
			                var table = $("<table id=\"process\" border=\"1\" cellpadding=\"1\" cellspacing=\"0\" style=\"width:80%;padding:5px;\"></table>");
			                table.appendTo($("#createTable"));
			                var thead = $("<thead></thead>");
			                thead.appendTo(table);
			                var trHead = $("<tr></tr>");
			                trHead.appendTo(thead);
			                //创建表头
			                $.each(arrayTile, function (index, item) {
			                    var td = $("<th>" + item + "</th>");
			                    td.appendTo(trHead);
			                });
			                var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th>");
			                itemColumHead.appendTo(trHead);

			                var tbody = $("<tbody></tbody>");
			                tbody.appendTo(table);
			                ////生成组合
			                var zuheDate = step.doExchange(arrayInfor);
			                var zuheDate2 = step.doExchange(attrOptionIdList);

			                var attr = [];
			                $.each(zuheDate2,function(i){
			                	attr.push($.parseJSON("[" + zuheDate2[i] + "]"));
			                	//attr.push($.parseJSON(zuheDate2[i]))
			                })
			                _step.optionList = attr;

			                if (zuheDate.length > 0) {
			                    //创建行
			                    $.each(zuheDate, function (index, item) {
			                        var td_array = item.split(",");
			                        var tr = $("<tr></tr>");
			                        tr.appendTo(tbody);
			                        $.each(td_array, function (i, values) {
			                            var td = $("<td>" + values + "</td>");
			                            td.appendTo(tr);
			                        });
			                        var td1 = $("<td ><input name=\"shopPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
			                        td1.appendTo(tr);
			                        var td2 = $("<td ><input name=\"reservePrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
			                        td2.appendTo(tr);
			                        var td3 = $("<td ><input name=\"clearingPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
			                        td3.appendTo(tr);
			                    });
			                }
			                //结束创建Table表
			                arrayColumn.pop();//删除数组中最后一项
			                //合并单元格
			                $(table).mergeCell({
			                    // 目前只有cols这么一个配置项, 用数组表示列的索引,从0开始
			                    cols: arrayColumn
			                });
			            } else{
			                //未全选中,清除表格
			                document.getElementById('createTable').innerHTML="";
			            }
			        },//合并行
			        hebingFunction: function () {
			            $.fn.mergeCell = function (options) {
			                return this.each(function () {
			                    var cols = options.cols;
			                    for (var i = cols.length - 1; cols[i] != undefined; i--) {
			                        // fixbug console调试
			                        // console.debug(cols[i]);
			                        mergeCell($(this), cols[i]);
			                    }
			                    dispose($(this));
			                });
			            };
			            function mergeCell($table, colIndex) {
			                $table.data('col-content', ''); // 存放单元格内容
			                $table.data('col-rowspan', 1); // 存放计算的rowspan值 默认为1
			                $table.data('col-td', $()); // 存放发现的第一个与前一行比较结果不同td(jQuery封装过的), 默认一个"空"的jquery对象
			                $table.data('trNum', $('tbody tr', $table).length); // 要处理表格的总行数, 用于最后一行做特殊处理时进行判断之用
			                // 进行"扫面"处理 关键是定位col-td, 和其对应的rowspan
			                $('tbody tr', $table).each(function (index) {
			                    // td:eq中的colIndex即列索引
			                    var $td = $('td:eq(' + colIndex + ')', this);
			                    // 取出单元格的当前内容
			                    var currentContent = $td.html();
			                    // 第一次时走此分支
			                    if ($table.data('col-content') == '') {
			                        $table.data('col-content', currentContent);
			                        $table.data('col-td', $td);
			                    } else {
			                        // 上一行与当前行内容相同
			                        if ($table.data('col-content') == currentContent) {
			                            // 上一行与当前行内容相同则col-rowspan累加, 保存新值
			                            var rowspan = $table.data('col-rowspan') + 1;
			                            $table.data('col-rowspan', rowspan);
			                            // 值得注意的是 如果用了$td.remove()就会对其他列的处理造成影响
			                            $td.hide();
			                            // 最后一行的情况比较特殊一点
			                            // 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的col-td里保存的td设置rowspan
			                            if (++index == $table.data('trNum'))
			                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
			                        } else { // 上一行与当前行内容不同
			                            // col-rowspan默认为1, 如果统计出的col-rowspan没有变化, 不处理
			                            if ($table.data('col-rowspan') != 1) {
			                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
			                            }
			                            // 保存第一次出现不同内容的td, 和其内容, 重置col-rowspan
			                            $table.data('col-td', $td);
			                            $table.data('col-content', $td.html());
			                            $table.data('col-rowspan', 1);
			                        }
			                    }
			                });
			            }
			            // 同样是个private函数 清理内存之用
			            function dispose($table) {
			                $table.removeData();
			            }
			        },
			        //组合数组
			        doExchange: function (doubleArrays) {
			            var len = doubleArrays.length;
			            if (len >= 2) {
			                var arr1 = doubleArrays[0];
			                var arr2 = doubleArrays[1];
			                var len1 = doubleArrays[0].length;
			                var len2 = doubleArrays[1].length;
			                var newlen = len1 * len2;
			                var temp = new Array(newlen);
			                var index = 0;
			                for (var i = 0; i < len1; i++) {
			                    for (var j = 0; j < len2; j++) {
			                        temp[index] = arr1[i] + "," + arr2[j];
			                        index++;
			                    }
			                }
			                var newArray = new Array(len - 1);
			                newArray[0] = temp;
			                if (len > 2) {
			                    var _count = 1;
			                    for (var i = 2; i < len; i++) {
			                        newArray[_count] = doubleArrays[i];
			                        _count++;
			                    }
			                }
			                //console.log(newArray);
			                return step.doExchange(newArray);
			            }
			            else {
			                return doubleArrays[0];
			            }
			        }
			    }
			    //return step;

			    $(".divlist label").bind("change", function () { 
			        step.Creat_Table(); 

			        if($('#createTable').html() != ""){
			    		$('.app .note').hide();
			    	}else{
			    		$('.app .note').show();
			    	}

			    	
			    	$('#process td a').click(function(){
				    	
				    	$('#Form_service_desc').form({
				    		item:{"serviceExplain":html}
				    	}).form('open');
				    	var html = $(this).prev().html();
				    })
			    });

	  	    } 
	    }

		page_column_model.push({display: '绑定ID', name : 'id'});
	    page_column_model.push({display: '服务详细名称', name : 'serviceName'});
	    page_column_model.push({display: '门市价', name : 'shopPrice'}); 
	    page_column_model.push({display: '预定价', name : 'reservePrice'});
	    page_column_model.push({display: '结算价', name : 'clearingPrice'});
	    page_column_model.push({display: '是否补贴', name : 'isShopSubsidy'});
	    page_column_model.push({display: '是否先行赔付', name : 'isCompensate'});   
	    page_column_model.push({display: '排列序号', name : 'sequence'}); 
	    page_column_model.push({display: '最后操作时间', name : 'updateDate'});
	    page_column_model.push({display: '最后操作人', name : 'operator'});
		 
		page_list_buttons.push({displayname:'创建',name:'add',bclass: 'add',
			onpress : function(){
				$('#Form_standard_service').form({
	                title: '标准化服务', 
					fields_params: fields_params,
					validators:jRad.validators,
					grid:20,
					item:{"reserveInfo":0,"useRule":'',"isSubsidy":0,"isCompensate":0,"sequence":'',"illustrate":''},
	                url: '/shopmanage-ws/ws/0.1/busiStandardService/addBusiService',
					before_submit:function(json){
						json.serviceType = type;
						json.businessInfoId = id;
						json.operator = carsmart_config.operatorName;
						var attrOption =[];
						$('#process tbody tr').each(function(i){ 
							var att ={};
							att.shopPrice = $("#process tbody tr").eq(i).find("td input[name='shopPrice']").val();
							att.reservePrice = $("#process tbody tr").eq(i).find("td input[name='reservePrice']").val();
							att.clearingPrice = $("#process tbody tr").eq(i).find("td input[name='clearingPrice']").val();
							att.attrOptionIdList = step.optionList[i];
							attrOption.push(att)
						})
						
						json.attrOption = attrOption;
						return json;
					},
					success_callback:function(){ 
						serviceTable.flexMessage('创建成功', 'success');
						serviceTable.flexReload();
					}
	            }).form('open');

				$('#Form_standard_service div[name="serviceId"]').select("readonly",false);
				// $('#Form_standard_service div[name="reserveInfo"]').select("val",0);
				// $('#Form_standard_service div[name="useRule"]').textarea("val",'');
				// $('#Form_standard_service div[name="isSubsidy"]').select("val",0);
				// $('#Form_standard_service div[name="isCompensate"]').select("val",0);
				// $('#Form_standard_service div[name="sequence"]').input("val",'');
				// $('#Form_standard_service div[name="illustrate"]').mediaarea("val",'');
				$('#Form_standard_service .app').show();
				var urlstr = '/shopmanage-ws/ws/0.1/busiStandardService/getAttrOptionInfo';
				var fristId = $("div[name='serviceId']").select('val');
	            var flag = (fristId!=undefined&&fristId!="");
			    if(flag){ 
			 	    urlstr = '/shopmanage-ws/ws/0.1/busiStandardService/getAttrOptionInfo?serviceId='+fristId;
			    }
			 	var Data = $.jRadGet({url : urlstr});
			    var _moudle = $(".app");
			    _moudle.html("");

				$.each(Data,function(j){
			 		var info = Data[j]; 
			 		var _row = $("<div style='overflow:hidden'>").addClass('div_contentlist');
			 		var _ul = $("<ul class='Father_Title'>")
					var _li = $("<li style='float:left;width:150px;text-align:right;'>").attr("data",info.attrId).html(info.attrName +'：');
					var _div = $("<div class='divlist' style='float:left;margin-left:10px;'>");
					var _ul2 = $("<ul>").addClass("Father_Item" + j);
					var opt2 = [];
					var value2 = [];
					var _li2 = $("<li>");
					$.each(info.option,function(i){
						var param = info.option[i];
	                	var vk2 = {};
	                	vk2.id = param.optionId;
	                	vk2.name = param.optionName; 
	                	opt2.push(vk2); 
	                	value2.push(param.optionName); 
	          			var _label2 = $("<label style='margin-right:15px;float:left;'>");
			            var _input = $("<input type='checkbox' style='float:left;margin:2px 3px 0 0;'>").addClass("chcBox_Width").attr({value:param.optionName,alt:param.optionId,explain:param.serviceExplain})
			            var _span = $("<span>").addClass("li_empty").attr("contentEditable","true")
					    _li2.append(_label2.append(_input).append(param.optionName).append(_span))
					}); 

					if(info.option.length != 0){ 
						_ul2.append(_li2);
		        		_row.append(_ul.append(_li)).append(_div.append(_ul2));
		        		_moudle.append(_row);
	                }
			 	});

			 	if(_moudle.html() != ""){
			 		_moudle.append('<p class="note">您需要选择所有的扩展属性,才能组合成完整的服务信息。</p>')
			 	}
				
				$('#process').html("");

			    $(".divlist label").bind("change", function () { 
			        step.Creat_Table(); 

			        if($('#createTable').html() != ""){
			    		$('.app .note').hide();
			    	}else{
			    		$('.app .note').show();
			    	}

			    	$('#process td a').click(function(){
				    	
				    	$('#Form_service_desc').form({

				    	}).form('open');
				    })
			    });

			    var step = {
			        optionList:[],
			        Creat_Table: function () {
			        	var _step = this;
			            step.hebingFunction();
			            var SKUObj = $(".Father_Title");
			            var arrayTile = new Array();
			            var arrayInfor = new Array();
			            var arrayColumn = new Array();
			            var attrOptionIdList = new Array();
			            var expList = new Array();
			            var bCheck = true;//是否全选
			            var columnIndex = 0;
			            $.each(SKUObj, function (i, item){
			                arrayColumn.push(columnIndex);
			                columnIndex++;
			                arrayTile.push(SKUObj.find("li").eq(i).html().replace("：", ""));
			                var itemName = "Father_Item" + i;
			                
			                var order = new Array();
			                $("." + itemName + " input[type=checkbox]:checked").each(function (){
			                    order.push($(this).val());
			                });
			                arrayInfor.push(order);

			                // var exp = new Array();
			                // $("." + itemName + " input[type=checkbox]:checked").each(function (){
			                //     exp.push($(this).attr("explain"));
			                // });
			                // expList.push(exp);

			                // console.log(expList)
			                var data = []
			                $("." + itemName + " input[type=checkbox]:checked").each(function (){
			                	var json ={};
			                	json.attrId = $(this).parent().parent().parent().parent().prev().children().attr("data");
			                	json.optionId = $(this).attr("alt");
			                	json.serviceExplain = $(this).attr("explain");
			                	var jsonstring = JSON.stringify(json)
			                	data.push(jsonstring)
			                });

							data.sort(getSortFun('desc', 'optionId'));
							function getSortFun(order, sortBy) {
							    var ordAlpah = (order == 'asc') ? '>' : '<';
							    var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
							    return sortFun;
							}

			                attrOptionIdList.push(data)

			                if (order.join() == ""){
			                    bCheck = false;
			                } 
			            });

			            //开始创建Table表
			            if (bCheck == true) {
			                var RowsCount = 0;
			                $("#createTable").html("");
			                var table = $("<table id=\"process\" border=\"1\" cellpadding=\"1\" cellspacing=\"0\" style=\"width:80%;padding:5px;\"></table>");
			                table.appendTo($("#createTable"));
			                var thead = $("<thead></thead>");
			                thead.appendTo(table);
			                var trHead = $("<tr></tr>");
			                trHead.appendTo(thead);
			                //创建表头
			                $.each(arrayTile, function (index, item) {
			                    var td = $("<th>" + item + "</th>");
			                    td.appendTo(trHead);
			                });
			                var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th><th style=\"width:50px;\">服务说明</th>");
			                itemColumHead.appendTo(trHead);

			                var tbody = $("<tbody></tbody>");
			                tbody.appendTo(table);
			                ////生成组合
			                var zuheDate = step.doExchange(arrayInfor);
			                var zuheDate2 = step.doExchange(attrOptionIdList);
							//console.log(zuheDate2)
			                var attr = [];
			                $.each(zuheDate2,function(i){
			                	attr.push($.parseJSON("[" + zuheDate2[i] + "]"));
			                })
			            
						var zuiArr = [];
						$.each(attr,function(v){
		                	var minArr = attr[v]
		                	$.each(minArr,function(z){
		                		if(minArr[z].serviceExplain){
		                			zuiArr.push(minArr[z].serviceExplain);
		                		}
								//console.log(zuiArr)
		                	})
		                	//aaa.push(zuiArr)
		                	//console.log(aaa)
		                })
						console.log(zuiArr)


			                _step.optionList = attr;

			                
			                
			                if (zuheDate.length > 0) {
			                    //创建行
			                    $.each(zuheDate, function (index, item) {

			                        var td_array = item.split(",");
			                        var tr = $("<tr></tr>");
			                        tr.appendTo(tbody);
			                        $.each(td_array, function (i, values) {
			                            var td = $("<td>" + values + "</td>");
			                            td.appendTo(tr);
			                        });
			                        var td1 = $("<td ><input name=\"shopPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
			                        td1.appendTo(tr);
			                        var td2 = $("<td ><input name=\"reservePrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
			                        td2.appendTo(tr);
			                        var td3 = $("<td ><input name=\"clearingPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
			                        td3.appendTo(tr);
			                        var td4 = $("<td align=\"center\"><a href=\"javascript:void(0);\" class=\"l-text\">编辑</a><span style=\"display:none\">"+zuiArr[index]+"</span></td>");
			                        td4.appendTo(tr);
			                    });
			                }
			                //结束创建Table表
			                arrayColumn.pop();//删除数组中最后一项
			                //合并单元格
			                $(table).mergeCell({
			                    // 目前只有cols这么一个配置项, 用数组表示列的索引,从0开始
			                    cols: arrayColumn
			                });
			            } else{
			                //未全选中,清除表格
			                document.getElementById('createTable').innerHTML="";
			            }

			        },//合并行
			        hebingFunction: function () {
			            $.fn.mergeCell = function (options) {
			                return this.each(function () {
			                    var cols = options.cols;
			                    for (var i = cols.length - 1; cols[i] != undefined; i--) {
			                        // fixbug console调试
			                        // console.debug(cols[i]);
			                        mergeCell($(this), cols[i]);
			                    }
			                    dispose($(this));
			                });
			            };
			            function mergeCell($table, colIndex) {
			                $table.data('col-content', ''); // 存放单元格内容
			                $table.data('col-rowspan', 1); // 存放计算的rowspan值 默认为1
			                $table.data('col-td', $()); // 存放发现的第一个与前一行比较结果不同td(jQuery封装过的), 默认一个"空"的jquery对象
			                $table.data('trNum', $('tbody tr', $table).length); // 要处理表格的总行数, 用于最后一行做特殊处理时进行判断之用
			                // 进行"扫面"处理 关键是定位col-td, 和其对应的rowspan
			                $('tbody tr', $table).each(function (index) {
			                    // td:eq中的colIndex即列索引
			                    var $td = $('td:eq(' + colIndex + ')', this);
			                    // 取出单元格的当前内容
			                    var currentContent = $td.html();
			                    // 第一次时走此分支
			                    if ($table.data('col-content') == '') {
			                        $table.data('col-content', currentContent);
			                        $table.data('col-td', $td);
			                    } else {
			                        // 上一行与当前行内容相同
			                        if ($table.data('col-content') == currentContent) {
			                            // 上一行与当前行内容相同则col-rowspan累加, 保存新值
			                            var rowspan = $table.data('col-rowspan') + 1;
			                            $table.data('col-rowspan', rowspan);
			                            // 值得注意的是 如果用了$td.remove()就会对其他列的处理造成影响
			                            $td.hide();
			                            // 最后一行的情况比较特殊一点
			                            // 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的col-td里保存的td设置rowspan
			                            if (++index == $table.data('trNum'))
			                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
			                        } else { // 上一行与当前行内容不同
			                            // col-rowspan默认为1, 如果统计出的col-rowspan没有变化, 不处理
			                            if ($table.data('col-rowspan') != 1) {
			                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
			                            }
			                            // 保存第一次出现不同内容的td, 和其内容, 重置col-rowspan
			                            $table.data('col-td', $td);
			                            $table.data('col-content', $td.html());
			                            $table.data('col-rowspan', 1);
			                        }
			                    }
			                });
			            }
			            // 同样是个private函数 清理内存之用
			            function dispose($table) {
			                $table.removeData();
			            }
			        },
			        //组合数组
			        doExchange: function (doubleArrays) {
			            var len = doubleArrays.length;
			            if (len >= 2) {
			                var arr1 = doubleArrays[0];
			                var arr2 = doubleArrays[1];
			                var len1 = doubleArrays[0].length;
			                var len2 = doubleArrays[1].length;
			                var newlen = len1 * len2;
			                var temp = new Array(newlen);
			                var index = 0;
			                for (var i = 0; i < len1; i++) {
			                    for (var j = 0; j < len2; j++) {
			                        temp[index] = arr1[i] + "," + arr2[j];
			                        index++;
			                    }
			                }
			                var newArray = new Array(len - 1);
			                newArray[0] = temp;
			                if (len > 2) {
			                    var _count = 1;
			                    for (var i = 2; i < len; i++) {
			                        newArray[_count] = doubleArrays[i];
			                        _count++;
			                    }
			                }
			                //console.log(newArray);
			                return step.doExchange(newArray);
			            }
			            else {
			                return doubleArrays[0];
			            }
			        }
			    }
			    //return step;
			    
	        }
	    }); 

		page_list_buttons.push({displayname: '删除',name:'delete',bclass: 'delete',
			prefunc:function(){
	            var checked = serviceTable.getCheckedTrs();
	            if (checked.length == 0){return false;}else{return true;}
	        },
	        onpress : function(){
		    	var checked = serviceTable.getCheckedTrs();
				$.jRadConfirm('确认删除吗？',1,function(){
					var postData = []; 
					$.each(checked,function(i){
					 	var postJson={};
					 	postJson.bindId=checked[i].id;
					 	postData.push(postJson)
					});
					$.jRadAjax({
					    type:'post',
						data:postData,
						url:'/shopmanage-ws/ws/0.1/busiStandardService/delService', 
						success: function(){
							serviceTable.flexMessage('删除成功!', 'success');
	           	    		serviceTable.flexReloadSearch();
						},
						error:function(xhr){
						    var errormsg = eval("(" + xhr.responseText + ")"); 
							if (errormsg != undefined) {
								serviceTable.flexMessage(errormsg[0].message, 'error');
							}
						}
					});
				});
			}
		});

		page_list_buttons.push({displayname: '修改',name:'Edit', bclass: 'edit',		
			prefunc:function(){
	            var checked = serviceTable.getCheckedTrs();
	            if (checked.length != 1) {return false;}else{return true;}
	        },
	        onpress : function(){
	            var checked = serviceTable.getCheckedTrs();
	            var _item = $.jRadGet({url : '/shopmanage-ws/ws/0.1/busiStandardService/getServiceInfo?bindId='+checked[0].id});
				$('#Form_standard_service').form({
					title: '修改',
					fields_params: fields_params,
					validators:jRad.validators,
					item:_item,
					url:'/shopmanage-ws/ws/0.1/busiStandardService/updateBusiService',
					before_submit:function(json){
						json.bindId =  checked[0].id
						json.shopPrice =  $('#Form_standard_service input[name="shopPrice"]').val();
						json.reservePrice =  $('#Form_standard_service input[name="reservePrice"]').val();
						json.clearingPrice =  $('#Form_standard_service input[name="clearingPrice"]').val();

						json.operator = carsmart_config.operatorName;
						return json;
					},
					success_callback: function(){ 
						serviceTable.flexMessage('修改成功!', 'success');
						serviceTable.flexReload();
					},
					error_callback:function(){ 
						serviceTable.flexReload();
					}
				}).form('open'); 

				$('#Form_standard_service div[name="serviceId"]').select("readonly",true);
				$('#Form_standard_service .app').hide();
				$("#createTable").html("");

	            var table = $("<table id=\"process\" border=\"1\" cellpadding=\"1\" cellspacing=\"0\" style=\"width:80%;padding:5px;\"></table>");
	            table.appendTo($("#createTable"));
	            var thead = $("<thead></thead>");
	            var tbody = $("<tbody></tbody>");
	            thead.appendTo(table);
	            tbody.appendTo(table);
	            var trHead = $("<tr></tr>");
				var trbody = $("<tr></tr>");
	            trHead.appendTo(thead);
	            trbody.appendTo(tbody);

	            var arrpor = _item.attrOptionList;
	            var headData =  [];
	            $.each(arrpor, function(i){
	            	headData.push(arrpor[i].attrName)
	            })
	            $.each(headData, function (index, item) {
	                var td = $("<th>" + item + "</th>");
	                td.appendTo(trHead);
	            });
	            var bodyData = [];
	            $.each(arrpor, function(i){
	            	bodyData.push(arrpor[i].optionName)
	            })
	            $.each(bodyData, function (index, item) {
	                var td2 = $("<td>" + item + "</td>");
	                td2.appendTo(trbody);
	            });

	            var itemColumHead = $("<th  style=\"width:70px;\">门市价</th><th style=\"width:70px;\">预定价</th><th style=\"width:70px;\">结算价</th>");
	            itemColumHead.appendTo(trHead);
	            var td1 = $("<td ><input name=\"shopPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
	            td1.appendTo(trbody);
	            var td2 = $("<td ><input name=\"reservePrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
	            td2.appendTo(trbody);
	            var td3 = $("<td ><input name=\"clearingPrice\" class=\"l-text\" type=\"text\" value=\"\"></td>");
	            td3.appendTo(trbody);
	            $('input[name="shopPrice"]').val(_item.shopPrice);
	            $('input[name="reservePrice"]').val(_item.reservePrice);
	            $('input[name="clearingPrice"]').val(_item.clearingPrice);
	        }
	    }); 


	 	page_list_buttons.push({separator: true});

		serviceTable.flexigrid({
	        reload:true,
			method:'get',
	        colModel : page_column_model,
	        buttons : page_list_buttons,
	        pagination: {
				diaplay_pages: 5,
				align: 'bottom'
			},
			showSearch:true,
	        url:'/shopmanage-ws/ws/0.1/busiStandardService/busiServicelist?serviceType='+type+'&businessInfoId='+id,
			onError:showError
	    })
	}
});