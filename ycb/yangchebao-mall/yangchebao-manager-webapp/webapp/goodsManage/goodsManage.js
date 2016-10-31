var goodsBasicAttrFlag = false;
var goodsExtendAttrFlag = false;
var goodsSKUFlag = false;
var goodsDescriptionFlag = false;
$(document).ready(function() {
	var wraper = $('#Wraper_goodsManage_list');
	$(".details-tab:eq(0) .f-left", wraper).click(function() {
		$(".details-tab:eq(0) .tab-cur", wraper).removeClass("tab-cur");
		$(this).addClass("tab-cur");
		var rele = $(this).attr("rele");
		$(".tabReleForm", wraper).hide();
		var type = $("#basicAttr-goods").find("input[name='updateOrAdd']").val();
		var id = $("#basicAttr-goods").find("input[name='commodityId']").val();
		if (type == "update") {
			if (rele == "extendAttr-goods" && goodsExtendAttrFlag == false) {
				goodsExtendAttr(id, wraper); 
				$('#extendAttr-goods div.jrad-select-container', wraper).each(function() {
					var valueThis = $(this).attr('value');
					$(this).select('val', valueThis)
				});
				$('#extendAttr-goods div.jrad-checkbox-container', wraper).each(function() {
					var valueThis = $(this).attr('value');
					var valueThisArr = valueThis.split(',');
					if (valueThisArr != '') {
						$(this).checkbox('val', valueThisArr)
					}
				});
				$('#extendAttr-goods div.jrad-input-container', wraper).each(function() {
					var valueThis = $(this).attr('value');
					$(this).input('val', valueThis);
				});
				goodsExtendAttrFlag = true
			} else if (rele == 'goodsSKU' && goodsSKUFlag == false) {
				goodsSKU(id, wraper);
				goodsSKUFlag = true
			} else if (rele == 'goodsDescription' && goodsDescriptionFlag == false) {
				var item = $.jRadGet({
					url: '/ycbmall-manager-ws/ws/0.1/commodityCms/getCommodityDesc?commodityId=' + id
				});
				$('#goodsDescription div[name="description"]', wraper).mediaarea('val', item.description);
				goodsDescriptionFlag = true
			}
		} else {
			if (rele == 'extendAttr-goods' && goodsExtendAttrFlag == false) {
				if (id == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先设置基本属性'
					});
					return false
				}
				goodsExtendAttr(id, wraper);
				goodsExtendAttrFlag = true
			} else if (rele == 'goodsSKU' && goodsSKUFlag == false) {
				if (id == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先设置基本属性'
					});
					return false
				}
				$("#goodsSortSKU", wraper).html('<table id="Table_goodsSKU_list"></table>');
				goodsSKU(id, wraper);
				goodsExtendAttr(id, wraper);
				goodsSKUFlag = true
			} else if (rele == 'goodsDescription' && goodsDescriptionFlag == false) {
				if (id == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先设置基本属性'
					});
					return false
				}
				goodsDescriptionFlag = true
			}
		}
		$("#" + rele, wraper).show();
	});
	// $('#saveBtn',wraper).button({
	// 	click: function(){ 
	// 	 $('#basicAttr-goods .jrad-btn-primary',wraper).click(); 
	// 	 if(goodsExtendAttrFlag==true){
	// 	  $('#extendAttr-goods .jrad-btn-primary',wraper).click();
	// 	 }
	// 	 if(goodsDescriptionFlag==true){
	// 	  $('#goodsDescription .jrad-btn-primary',wraper).click();
	// 	 }
	// 	 $('.details-box:eq(0)',wraper).slideUp();
	// 	 $('.details-box:eq(0)',wraper).prev('.ui-tit').hide();
	// 	 $('.jrad-table',wraper).slideDown();   
	// 	 clearGoodsInfo(wraper);
	// 	 $(".scroll-up-btn").click();	 
	// 	 $('#Table_goods_list').flexReloadCurrentPage(); 
	// 	}
	// });

	var entityModel = {};
	var jRad = $.jRad({
		app: 'radsample-ws',
		entityModel: entityModel
	});

	var parentId = $.jRadGet({
		url: '/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentId?parentId=-1&level=1'
	});
	var parentIdArr = [];
	$.each(parentId, function(i) {
		var json = {};
		json.id = parentId[i].classificationId;
		json.name = parentId[i].name;
		parentIdArr.push(json)
	});
	parentIdArr.unshift({
		id: '',
		name: '请选择'
	});
	
	var accessoryBrandId = $.jRadGet({
		url: '/ycbmall-manager-ws/ws/0.1/accessoryBrandCms/getAccessoryBrandList'
	});
	var brandIdArr = [];
	$.each(accessoryBrandId, function(i) {
		var json = {};
		json.id = accessoryBrandId[i].accessoryBrandId;
		json.name = accessoryBrandId[i].name;
		brandIdArr.push(json)
	});
	brandIdArr.unshift({
		id: '',
		name: '请选择'
	});

	jRad.validators['name'] = [{
		msg: '商品名称不能为空',
		type: 'min',
		value: '1'
	}];
	jRad.validators['salesUnit'] = [{
		msg: '销售单位不能为空',
		type: 'min',
		value: '1'
	}];
	jRad.validators['norms'] = [{
		msg: '规格不能为空',
		type: 'min',
		value: '1'
	}];
	jRad.validators['accessoryBrandName'] = [{
		msg: '品牌不能为空',
		type: 'min',
		value: '1'
	}];
	
	// jRad.validators['firstClass']=[{msg:'一级不能为空',type:'min',value:'1'}];
	// jRad.validators['secondClass']=[{msg:'二级不能为空',type:'min',value:'1'}];

	var fields_params = {};

	fields_params['firstClass'] = {
		data: parentIdArr,
		onchange: function(val) {
			$("#basicAttr-goods p.choosedClass",wraper).html("");
			getClassificationName('2', val, wraper)
		}
	};
	fields_params['canSellNumType'] = {
		data: [{id: '1',name: '全国可卖数'}, {id: '2',name: '分城市可卖数'}],
		onclick:function(){
			var all = $('#salesCount-goodsSKU div[name="canSellNumType"]',wraper).radio('val');
            if(all == 2){
                $('.cityCount',wraper).show();
                $('.countryCount',wraper).hide();
                //salesCountSimTab(skuId);
            }else if(all == 1){
                $('.cityCount',wraper).hide();
                $('.countryCount',wraper).show();
            }
		}
	};
	fields_params['supplier'] = {
		data: [{
			id: '1',
			name: '自营'
		}, {
			id: '2',
			name: '第三方'
		}]
	};
	fields_params['isImported'] = {
		data: [{
			id: '0',
			name: '国产'
		}, {
			id: '1',
			name: '进口'
		}]
	};
	fields_params['commodityType'] = {
			data: [{
				id: '1',
				name: '普通商品'
			}, {
				id: '2',
				name: '专享商品'
			},{
				id: '3',
				name: '4S店专供'
			}]
		};
	fields_params['expressTemplate'] = {
		data: [{
			id: '1',
			name: '包邮'
		}, {
			id: '2',
			name: '按体积'
		}, {
			id: '3',
			name: '按重量'
		}]
	};
	fields_params['status'] = {
		data: [{
			id: '1',
			name: '上架'
		}, {
			id: '0',
			name: '下架'
		}, {
			id: '2',
			name: '删除'
		}]
	};
	fields_params['accessoryBrandName'] = {
			  data:brandIdArr,
		      queryParam:'name',
		      fl: 'name',
		      displayField:'name',
		      response: function(data){
		        return data;
		      }
		      
	};
	fields_params['picUpload'] = {
		url: '/ycbmall-manager-ws/ws/0.1/file/uploadThree',
		fileName: "file",
		note: '仅支持 JPG图片文件，且建议大小小于20M,宽高不能小于500*280。',
		show: false,
		success: function(data) {
			if ($.isArray(data)) {
				$.jRadAlert(data[0].message, "error");
				return false;
			} else {
				var _pDiv = $("div[name='picUpload']", wraper);
				var liArr = $(".pic-show", _pDiv).children("li");
				var len = liArr.length;
				var $tDiv = $("<div>").css('clear', 'left');
				var $sDiv = $("<div>").addClass("sequence");
				$(liArr[len - 1]).find('div.smallUrl-pic').removeClass('smallUrl-pic');
				$(liArr[len - 1]).append($tDiv.append($sDiv));
				$(liArr[len - 1]).data(data);
				$sDiv.select({
					data: [{
						id: '',
						name: '请选择排序号'
					}, {
						id: '1',
						name: '封面'
					}, {
						id: '2',
						name: '2'
					}, {
						id: '3',
						name: '3'
					}, {
						id: '4',
						name: '4'
					}, {
						id: '5',
						name: '5'
					}]
				})
			}
		},
		beforeSubmit: function(obj) {
			var re = /^.*\.(jpg|JPG)$/;
			if (re.test(obj.val())) {
				return true;
			} else {
				$.jRadAlert("只能上传jpg文件", "error");
				return false;
			}
		},
		single: false,
		horizontal: true,
		prev: 'smallUrl',
		showInfo: false
	};

	var fields = {};
	fields['description'] = {
		theme: "Full",
		resizing: false,
		grid: 18,
		height: 200,
		uploadImg: { //上传图片参数
			url: '/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			filename: 'file',
			delFunc: function(item) {
				item.list.remove();
			},
			validator: [{
				msg: "只能上传jpg文件",
				type: "regex",
				value: /^.*\.(jpg|JPG)$/
			}],
			success: function(data) {
				if (data[0] && data[0].code == "400") {
					$.jRadMessage({
						level: 'error',
						message: data[0].message
					});
				}
			},
			note: '仅支持 JPG图片文件。',
			show: true,
			showLarge: true,
			prev: 'fileUrl',
			params: {
				type: ""
			},
			single: true
		},
		CKOpt: {
			fullPage: true, //是否使用完整的html编辑模式
			basicEntities: false, //Whether to escape basic HTML entities in the document, including:  nbsp gt lt amp 
			startupMode: 'source' //载入时，以何种方式编辑 源码和所见即所得 "source"和"wysiwyg"
		}
	};

	var fields3 = {};
	fields3['status'] = {
		data: [{
			id: '1',
			name: '上架'
		}, {
			id: '0',
			name: '下架'
		}, {
			id: '2',
			name: '删除'
		}]
	};
	//可卖数
	
	$('#salesCount-goodsSKU', wraper).form({
		validators: jRad.validators,
		fields_params: fields_params,
//		item: {' ':1},
		layout: 'grid',
		autobinding: false
	});	
	$('#basicAttr-goods', wraper).form({
		validators: jRad.validators,
		fields_params: fields_params,
		layout: 'grid',
		autobinding: false
	});
	$('#goodsDescription', wraper).form({
		fields_params: fields,
		layout: 'grid',
		autobinding: false
	});

	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array();
	page_column_model.push({
		display: 'ID',
		name: 'commodityId'
	});
	page_column_model.push({
		display: '商品名称',
		name: 'name'
	});
	page_column_model.push({
		display: '商品类型', 
		name : 'commodityTypeName'
	});
	page_column_model.push({
		display: 'SKU数量',
		name: 'skuNum'
	});
	page_column_model.push({
		display: '分类',
		name: 'classificationName'
	});
	page_column_model.push({
		display: '状态',
		name: 'statusName'
	});
	page_column_model.push({
		display: '更新时间',
		name: 'updated'
	});
	page_column_model.push({
		display: '操作人',
		name: 'operator'
	});

	page_search_items.push({
		row: '1',
		type: 'jrad-input',
		display: '商品ID',
		name: 'commodityId'
	});
	page_search_items.push({
		row: '1',
		type: 'jrad-input',
		display: '商品名称',
		name: 'name'
	});
	page_search_items.push({
		row: '1',
		type: 'jrad-select',
		display: '状态',
		name: 'status',
		params: {
			data: [{
				id: '3',
				name: '未删除'
			}, {
				id: '0',
				name: '下架'
			}, {
				id: '1',
				name: '上架'
			}, {
				id: '2',
				name: '删除'
			}]
		}
	});
	page_search_items.push({
		row: '2',
		type: 'jrad-select',
		display: '商品类型',
		name: 'commodityType',
		params: {
			data: [{
				id: '',
				name: '全部'
			}, {
				id: '1',
				name: '普通商品'
			}, {
				id: '2',
				name: '专享商品'
			},{
				id: '3',
				name: '4S店专供'
			}]
		}
	});
	page_search_items.push({
		row: '2',
		type: 'jrad-select',
		display: '一级分类',
		name: 'firstClassificationId',
		params: {
			data: parentIdArr,
			onchange: function(val) {
				getClassificationNameSearch('2', val, wraper);
			}
		}
	});
	page_list_buttons.push({
		name: 'Add',
		title: '创建',
		bclass: 'add',
		onpress: function() {
			$('.details-box:eq(0)', wraper).slideDown();
			$('.details-box:eq(0)', wraper).prev('.ui-tit').html('<strong>新增SKU</strong>').show() 
			$('.jrad-table', wraper).slideUp();
			$(".scroll-up-btn").click();
			clearGoodsInfo(wraper);
		}
	});
	page_list_buttons.push({
		name: 'Edit',
		title: '编辑',
		bclass: 'edit',
		prefunc: function() {
			var checked = $('#Table_goods_list').getCheckedTrs();
			if (checked.length != 1) {
				return false;
			} else {
				return true;
			}
		},
		onpress: function() {
			var checked = $('#Table_goods_list').getCheckedTrs();
			var id = checked[0].commodityId;
			if (checked[0]) {
				updateSortView(id, wraper)
					// goodsExtendAttr(id,wraper)
			}
		}
	});

	$('#Table_goods_list').flexigrid({
		colModel: page_column_model,
		buttons: page_list_buttons,
		searchitems: page_search_items,
		queryParam: {
			'status': '3'
		},
		url: '/ycbmall-manager-ws/ws/0.1/commodityCms/queryCommodities',
		method: 'get',
		showSearch: true,
		onError: showError,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom'
		},
		overflow: true
	});
	var _span3 = $('div.searchButtons', wraper);
	var _span20 = $('<div>').addClass('span20').append(_span3);
	var _div = $('<div>').addClass('row-fluid').append(_span20);
	$('div.searchContent', wraper).append(_div);
	$('div.searchContent span.span14', wraper).remove();
	//返回按钮
	$(".details-tab:eq(0) .return", wraper).click(function() {
		$('.details-box:eq(0)', wraper).slideUp();
		$('.details-box:eq(0)', wraper).prev('.ui-tit').hide();
		$('.jrad-table', wraper).slideDown();
		clearGoodsInfo(wraper);
		$(".scroll-up-btn").click();
		$('#Table_goods_list').flexReloadCurrentPage();
	});
	// 取消
	$("#basicAttr-goods span.jrad-btn-normal,#extendAttr-goods span.jrad-btn-normal,#goodsDescription span.jrad-btn-normal", wraper).click(function() {
		$('.details-box:eq(0)', wraper).slideUp();
		$('.details-box:eq(0)', wraper).prev('.ui-tit').hide();
		$('.jrad-table', wraper).slideDown();
		clearGoodsInfo(wraper);
		$(".scroll-up-btn").click();
		$('#Table_goods_list').flexReloadCurrentPage();
	});

	$('#basicAttr-goods span.jrad-btn-primary', wraper).button({
		click: function() {
			var flag = $('#basicAttr-goods', wraper).form('validateAll');
			if (!flag) {
				return false
			}
			var json = $('#basicAttr-goods', wraper).form('getValue');
			json.operator = carsmart_config.operatorName;
			var picsArr = [];
			var _p = $("#basicAttr-goods div[name='picUpload']", wraper);
			$.each($(".pic-show", _p).children("li"), function(i) {
				var picJson = {};
				picJson.picUrl = $(this).data('fileUrl');
				if (picJson.picUrl == '' || picJson.picUrl == undefined || picJson.picUrl == null) {
					picJson.picUrl = $(this).data('picUrl')
				}
				picJson.middlePicUrl = $(this).data('middleUrl');
				if (picJson.middlePicUrl == '' || picJson.middlePicUrl == undefined || picJson.middlePicUrl == null) {
					picJson.middlePicUrl = $(this).data('middlePicUrl')
				}
				picJson.smallPicUrl = $(this).data('smallUrl');
				if (picJson.smallPicUrl == '' || picJson.smallPicUrl == undefined || picJson.smallPicUrl == null) {
					picJson.smallPicUrl = $(this).data('smallPicUrl')
				}
				picJson.sequence = $(this).find('div.sequence').select('val');
				if (picJson.sequence == 1) {
					picJson.isCover = 1
				} else {
					picJson.isCover = 0
				}
				picsArr.push(picJson);
			});
			json.pics = picsArr;
			var updateOrAdd = json.updateOrAdd;
			delete json.updateOrAdd;
			if (updateOrAdd == 'add') {

				$.jRadPost({
					url: '/ycbmall-manager-ws/ws/0.1/commodityCms/addCommodity',
					data: json,
					success: function(data) {
						$.jRadMessage({
							level: 'success',
							message: '保存成功！'
						});
						$('#basicAttr-goods', wraper).find("input[name='commodityId']").val(data.commodityId);
						$("#basicAttr-goods").find("input[name='updateOrAdd']").val('update')
					},
					error: function(data) {
						var mes = eval('(' + data.responseText + ')');
						if (mes[0].message == '分类ID为空') {
							$.jRadMessage({
								level: 'error',
								message: '分类不能为空'
							})
						} else {
							$.jRadMessage({
								level: 'error',
								message: mes[0].message
							})
						}
					}
				});
			} else {
				$.jRadPost({
					url: '/ycbmall-manager-ws/ws/0.1/commodityCms/editCommodity',
					data: json,
					success: function(data) {
						$.jRadMessage({
							level: 'success',
							message: '保存成功！'
						})
					},
					error: function(data) {
						var mes = eval('(' + data.responseText + ')');
						if (mes[0].message == '分类ID为空') {
							$.jRadMessage({
								level: 'error',
								message: '分类不能为空'
							})
						} else {
							$.jRadMessage({
								level: 'error',
								message: mes[0].message
							})
						}
					}
				});
			}
		}
	});
	$('#extendAttr-goods span.jrad-btn-primary', wraper).button({
		click: function() {
			var postData = {};
			var postItems = [];
			var flag=0;
			$('#extendAttr-goods div.row-fluid', wraper).each(function() {
				var postJson = {};
				var thisDatName=$(this).attr('data-name');
				postJson.extendedAttributeId = $(this).find('div.addTag').attr('name');
				if ($(this).find('div.addTag').hasClass('jrad-select-container')) {
					postJson.type = 1;
					postJson.optionIdStr = $(this).find('div.addTag').select('val');
					if(postJson.optionIdStr==''){
						$.jRadMessage({
							level: 'error',
							message: '请选择'+thisDatName
						});
						flag=1
					}
				} else if ($(this).find('div.addTag').hasClass('jrad-checkbox-container')) {
					postJson.type = 2;
					var vals = $(this).find('div.addTag').checkbox('val');
					if(vals==''){
						$.jRadMessage({
							level:'error',
							message:'请选择'+thisDatName
						});
						flag=1
					}
				} else if ($(this).find('div.addTag').hasClass('jrad-input-container')) {
					postJson.type = 3;
					postJson.textAnswer = $(this).find('div.addTag').input('val');
					if(postJson.textAnswer==''){
						$.jradMessage({
							level:'error',
							message:'请选择'+thisDatName
						});
						flag=1
					}
				}
				postItems.push(postJson)
			});
			if(flag){
				return false
			}
			postData.commodityId = $('#basicAttr-goods input[name="commodityId"]', wraper).val();
			postData.items = postItems;
			postData.operator = carsmart_config.operatorName;
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/comExtAttrInfoCms/editComExtAttrInfo',
				data: postData,
				success: function(data) {
					$.jRadMessage({
						level: 'success',
						message: '保存成功！'
					})
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message
					});
				}
			})
		}
	});
	$('#goodsDescription span.jrad-btn-primary', wraper).button({
		click: function() {
			var postData = $('#goodsDescription', wraper).form('getValue');
			postData.commodityId = $('#basicAttr-goods input[name="commodityId"]', wraper).val();
			postData.operator = carsmart_config.operatorName;
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/commodityCms/editCommodityDesc',
				data: postData,
				success: function(data) {
					$.jRadMessage({
						level: 'success',
						message: '保存成功！'
					})
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message
					});
				}
			})
		}
	});
//$('#salesCount-goodsSKU .pop-up-scroll').attr('style','height: 300px;')
});

function showError(xhr) {
	var errormsg = eval("(" + xhr.responseText + ")");
	var cDiv = $("#Wraper_shop_list .cDiv");
	$.jRadMessage({
		level: 'error',
		message: errormsg[0].message,
		selector: cDiv
	});
}

function goodsExtendAttr(id, wraper) {
	// $('#extendAttr-goods',wraper).form().form('destroy');
	$('#extendAttr-goods div.grid-layout-main', wraper).html('');
	var item = $.jRadGet({
		url: '/ycbmall-manager-ws/ws/0.1/comExtAttrInfoCms/getComExtAttrInfo?commodityId=' + id
	});
	if (item == '') {
		$('#extendAttr-goods', wraper).html('该商品暂无扩展属性');
		return false
	}
	var fields = {};
	var str = '';
	$.each(item, function(i) {
		if (item[i].type == '1') {
			var dataArr = [];
			var value = '';
			var dataStr = '';
			var json={};
			json.id='';
			json.name='请选择';
			dataArr.push(json);
			$.each(item[i].options, function(j) {
				json = {};
				json.id = item[i].options[j].optionId;
				json.name = item[i].options[j].optionName;
				dataArr.push(json);
				if (item[i].options[j].checked == '1') {
					value = item[i].options[j].optionId
				}
			});
			fields[item[i].extendedAttributeId] = {
				data: dataArr
			};
			dataStr = JSON.stringify(dataArr);
			str += '<div class="row-fluid" data-name="'+item[i].extendedAttributeName+'">' + '<label class="span4 grid-layout-label">' + item[i].extendedAttributeName + '：</label>' + '<div class="span8 grid-layout-content">' + '<div class="jrad-select-container addTag" name="' + item[i].extendedAttributeId + '" value="' + value + '" data=' + dataStr + '></div>' + '</div>' + '</div>';
		} else if (item[i].type == '2') {
			var dataArr = [];
			var value = [];
			var valueStr = '';
			var dataStr = '';			
			$.each(item[i].options, function(j) {
				var json={};
				json.id = item[i].options[j].optionId;
				json.name = item[i].options[j].optionName;
				dataArr.push(json);
				if (item[i].options[j].checked == '1') {
					value.push(item[i].options[j].optionId)
				}
			});
			valueStr = value.join(',');
			fields[item[i].extendedAttributeId] = {
				data: dataArr
			};
			dataStr = JSON.stringify(dataArr);
			str += '<div class="row-fluid" data-name="'+item[i].extendedAttributeName+'">' + '<label class="span4 grid-layout-label">' + item[i].extendedAttributeName + '：</label>' + '<div class="span8 grid-layout-content">' + '<div class="jrad-checkbox-container addTag" name="' + item[i].extendedAttributeId + '" value="' + valueStr + '" data=' + dataStr + '></div>' + '</div>' + '</div>';
		} else if (item[i].type == '3') {
			str += '<div class="row-fluid" data-name="'+item[i].extendedAttributeName+'">' + '<label class="span4 grid-layout-label">' + item[i].extendedAttributeName + '：</label>' + '<div class="span8 grid-layout-content">' + '<div class="jrad-input-container addTag" name="' + item[i].extendedAttributeId + '" value="' + item[i].textAnswer + '"></div>' + '</div>' + '</div>';
		}
	});
	$('#extendAttr-goods div.grid-layout-main', wraper).append(str);
	$('#extendAttr-goods div.grid-layout-main div.jrad-checkbox-container', wraper).each(function() {
		var thisData = [];
		thisData = JSON.parse($(this).attr('data'));
		$(this).checkbox({
				data: thisData
			})
			// $(this).checkbox()
	});
	$('#extendAttr-goods div.grid-layout-main div.jrad-input-container', wraper).input();
	$('#extendAttr-goods div.grid-layout-main div.jrad-select-container', wraper).each(function() {
		var thisData = [];
		thisData = JSON.parse($(this).attr('data'));
		$(this).select({
			data: thisData
		})
	});
	// $('#basicInfo-goodsSKU div.grid-layout-main',wraper).prepend(str);
	// $('#basicInfo-goodsSKU',wraper).form({
	// 	layout: 'grid',
	// 	fields_params:fields,
	// 	autobinding: false
	// });
	$('#extendAttr-goods', wraper).form({
		// fields_params:fields,
		layout: 'grid',
		autobinding: false
	})
}

function clearGoodsInfo(wraper) {
	$(".details-tab:eq(0) .f-left:first", wraper).click();
	$('#basicAttr-goods div[name="commodityType"]').select('readonly',false);
	$("#basicAttr-goods", wraper).form({
		item: {}
	});
	$("#goodsDescription", wraper).form({
		item: {}
	});
	goodsBasicAttrFlag = false;
	goodsExtendAttrFlag = false;
	goodsSKUFlag = false;
	goodsDescriptionFlag = false;
	$("#basicAttr-goods", wraper).find("input[name='updateOrAdd']").val('add');
	$("#goodsSKU", wraper).html('<table id="Table_goodsSKU_list"></table>');
	$(" div.classification", wraper).find('.second').remove();
	$('#basicAttr-goods p.choosedClass', wraper).html('');
	$('#extendAttr-goods div.grid-layout-main', wraper).html('');
}

function updateSortView(id, wraper) {
	var item = $.jRadGet({
		url: '/ycbmall-manager-ws/ws/0.1/commodityCms/getCommodity?commodityId=' + id
	});
	$('.details-box:eq(0)', wraper).prev('.ui-tit').html('<strong>修改商品</strong>').show();
	$('.jrad-table', wraper).slideUp();
	$('.details-box:eq(0)', wraper).slideDown();
	$('#basicAttr-goods', wraper).form({
		item: item
	});
	//修改的时候把商品类型置灰
	$('#basicAttr-goods div[name="commodityType"]').select('readonly',true);
//	//回显品牌的id和name
	$("#basicAttr-goods", wraper).find("div[name='accessoryBrandName']").autocombo("val",{id:item.accessoryBrandId,name:item.accessoryBrandName});
	$('#basicAttr-goods p.choosedClass', wraper).html('已选择：' + item.classificationName);
	$(".scroll-up-btn").click();
	$("#basicAttr-goods", wraper).find("input[name='updateOrAdd']").val('update');
	$("#basicAttr-goods", wraper).find("input[name='commodityId']").val(id);
	$("#basicAttr-goods div.classification", wraper).find('.second').remove();
	var _ul = $("div[name='picUpload']", wraper).children(".pic-show");
	var arr = item.pics;
	$.each(arr, function(i) {
		var $li = $("<li>").addClass("brandPicBoxli");
		var $div = $("<div>").html('<div class="pic-box"><div class="pic-content"><div class="pic-vc">' + '<img src="' + arr[i].smallPicUrl + '">' + '</div></div><span class="del-btn"></span></div>');

		$li.append($div);
		var $tDiv = $("<div>").css('clear', 'left');
		var $sDiv = $("<div>").addClass("sequence");
		$tDiv.append($sDiv);
		$li.append($tDiv);
		$sDiv.select({
			data: [{
				id: '',
				name: '请选择排序号'
			}, {
				id: '1',
				name: '封面'
			}, {
				id: '2',
				name: '2'
			}, {
				id: '3',
				name: '3'
			}, {
				id: '4',
				name: '4'
			}, {
				id: '5',
				name: '5'
			}]
		});
		$sDiv.select('val', arr[i].sequence);
		_ul.append($li);
		$li.data(arr[i]);
	});
	$(".brandPicBoxli .del-btn", wraper).click(function() {
		$(this).parents(".brandPicBoxli").remove();
	})
}

function goodsSKU(id, wraper) {
	goodsSKUTable();

	function goodsSKUTable() {
		var _str = '<div><span id="addGoods" class="jrad-btn-primary jrad-form-element ui-btn-primary" style="display:inline-block;margin-bottom:10px;"><span class="ui-btn-primary-content">新增SKU</span></span></div>'
		$("#goodsSKU", wraper).html(_str + '<table id="Table_goodsSKU_list"></table>');
		$.ajax({
			url: '/ycbmall-manager-ws/ws/0.1/skuCms/getSkuList?commodityId=' + id,
			method: 'get',
			success: function(data) {
				var str = '';
				var skuStrTh = '';
				var isUsingSkuAttrs = data.isUsingSkuAttrs;
				if (isUsingSkuAttrs == '1') {
					skuStrTh += '<th>SKU参数信息</th>'
				}
				str += '<tr><th>ID</th><th>SKU名称</th>' + skuStrTh + '<th>市场价</th><th>条形码</th><th>第三方编号</th><th>重量（kg）</th><th>体积（m³）</th><th>状态</th><th>操作</th>' + '</tr>';
				if (data.skuArray == '') {
					$('#Table_goodsSKU_list', wraper).append(str + '<tr><td colspan="10">暂无符合条件的记录</td></tr>');
					return false
				}
				$.each(data.skuArray, function(i) {
					var skuStr = '';
					var skuStrTd = '';
					if (isUsingSkuAttrs == '1') {
						$.each(data.skuArray[i].options, function(j) {
							var skuOption = data.skuArray[i].options[j];
							skuStr += '<p>' + skuOption.skuParamName + '：' + skuOption.optionName + '</p>'
						});
						skuStrTd = '<td>' + skuStr + '</td>';
					}

					str += '<tr>' + '<td class="skuId">' + data.skuArray[i].skuId + '</td>' + '<td>' + data.skuArray[i].name + '</td>' + skuStrTd + '<td>' + data.skuArray[i].marketPrice + '</td>' + '<td>' + data.skuArray[i].barcode + '</td>' + '<td>' + data.skuArray[i].thirdPartyCode + '</td>' + '<td>' + data.skuArray[i].weight + '</td>' + '<td>' + data.skuArray[i].volume + '</td>'
						//+'<td>'+data.skuArray[i].inventoryNum+'</td>'
						//+'<td>'+data/skuArray[i].limitNum+'</td>'
						+ '<td>' + data.skuArray[i].statusName + '</td>' + '<td><a href="javascript:" class="editGoodsSKU">编辑</a></td>' + '</tr>';
				});
				$('#Table_goodsSKU_list', wraper).append(str)
			}
		});

		var bindCarTypeFlag = false;
		var basicInfoGoodsSKUFlag = false;
		var salesCountFlag=false;
		var costPriceFlag = false;
		var priceGoodsSkuFlag=false;
		var statusGoodsSKUFlag=false;
		$("#Form_goodsSKU_manage .details-tab .f-left", wraper).die('click').live('click', function() {
			$("#Form_goodsSKU_manage .details-tab .tab-cur", wraper).removeClass("tab-cur");
			$(this).addClass("tab-cur");
			var rele = $(this).attr("rele");
			var skuId = $('div#Form_goodsSKU_manage div#basicInfo-goodsSKU input[name="skuId"]', wraper).val();
			var commodityId=$("#basicAttr-goods").find("input[name='commodityId']").val()
			$("#Form_goodsSKU_manage .tabReleForm", wraper).hide();
			if (rele == 'bindCarType-goodsSKU' && bindCarTypeFlag == false) {
				if (skuId == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先设置基本信息！',
						selector: $('div#Form_goodsSKU_manage div.details-box', wraper)
					});
					$("#" + rele, wraper).show();
					return false
				}
				bindCarTypeTable(skuId);
				bindCarTypeFlag = true
			}
			if (rele == 'costPrice-goodsSKU' && costPriceFlag == false) {
				if (skuId == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先设置基本信息！',
						selector: $('div#Form_goodsSKU_manage div.details-box', wraper)
					});
					$("#" + rele, wraper).show();
					return false
				}
				costPriceSkuTab(skuId);
				costPriceFlag = true
			}
			if (rele == 'salesCount-goodsSKU' && salesCountFlag == false) {
				if (skuId == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先设置基本信息！',
						selector: $('div#Form_goodsSKU_manage div.details-box', wraper)
					});
					$("#" + rele, wraper).show();
					
					return false
				}
				salesCountSimTab(skuId);
				salesCountFlag = true
			}
			if (rele == 'price-goodsSKU' && priceGoodsSkuFlag == false) {
				if (skuId == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先设置基本信息！',
						selector: $('div#Form_goodsSKU_manage div.details-box', wraper)
					});
					$("#" + rele, wraper).show();
					return false
				}
				priceSkuTab(skuId,commodityId);
				priceGoodsSkuFlag = true
			}
			if (rele == 'status-goodsSKU' && statusGoodsSKUFlag == false) {
				if (skuId == '') {
					$.jRadMessage({
						level: 'error',
						message: '请先设置基本信息！',
						selector: $('div#Form_goodsSKU_manage div.details-box', wraper)
					});
					$("#" + rele, wraper).show();
					return false
				}
				statusSkuTab(skuId);
				statusGoodsSKUFlag = true
			}
			
			$("#" + rele, wraper).show();
		});
		$('div#goodsSKU span#addGoods', wraper).unbind('click').bind('click', function() {
			$('#Form_goodsSKU_manage', wraper).form({
				title: '创建'
			}).form('open');
			clearGoodsSKU();
			getSkuParams('');
			$('div#Form_goodsSKU_manage div#basicInfo-goodsSKU input[name="updateOrAdd"]', wraper).val('add');

		});
		$('#Table_goodsSKU_list a.editGoodsSKU', wraper).die('click').live('click', function() {
			$('#Form_goodsSKU_manage', wraper).form({
				title: '编辑',
				height:500//消除两个滚动条
			}).form('open');
			clearGoodsSKU();
			var id = $(this).parents('tr').find('td.skuId').html();
			getSkuParams(id);
			
			$('div#Form_goodsSKU_manage div#basicInfo-goodsSKU input[name="skuId"]', wraper).val(id);
			$('div#Form_goodsSKU_manage div#basicInfo-goodsSKU input[name="updateOrAdd"]', wraper).val('update');
		});

		function clearGoodsSKU() {
			$('#Form_goodsSKU_manage .details-box', wraper).slideDown();
			$('#Form_goodsSKU_manage div.tabReleForm',wraper).hide();
			$('#Form_goodsSKU_manage #basicInfo-goodsSKU', wraper).show();
			$("#Form_goodsSKU_manage .details-tab .f-left:first", wraper).click();
			$('#Form_goodsSKU_manage .details-tab .tab-cur', wraper).removeClass('tab-cur');
			$("#Form_goodsSKU_manage .details-tab .f-left:first", wraper).addClass('tab-cur');
			$('#Form_goodsSKU_manage div#bindCarType-goodsSKU', wraper).html('<table id="Table_bindCarType_list"></table>');
			$('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.clearSupply',wraper).remove();
			$(".cityCount table tbody",wraper).html('');
			$("#nationPrice tbody tr td input",wraper).val('');
			$("#cityPrice table tbody",wraper).html('');
			bindCarTypeFlag = false;
			basicInfoGoodsSKUFlag = false;
			costPriceFlag=false;
			salesCountFlag=false;
			priceGoodsSkuFlag=false;
			statusGoodsSKUFlag=false;
		}
	}



	$('#Form_goodsSKU_manage a.pop-up-close', wraper).live('click', function(){
		$('#Form_goodsSKU_manage', wraper).form({}).form('close')
	});

	//创建SKU基本信息点击确定
	$('div#Form_goodsSKU_manage div#basicInfo-goodsSKU span.ui-btn-primary', wraper).unbind('click').bind('click', function() {
		var flag = $('div#Form_goodsSKU_manage div#basicInfo-goodsSKU', wraper).form('validateAll');
		if (!flag) {
			return false
		}
		var json = $('div#Form_goodsSKU_manage div#basicInfo-goodsSKU', wraper).form('getValue');
		
		json.commodityId = id;
		json.operator = carsmart_config.operatorName;
		var options = [];
		$('div#Form_goodsSKU_manage div#basicInfo-goodsSKU div.addSkuParam', wraper).each(function() {
			var optionsJson = {};
			optionsJson.skuParamId = $(this).attr('name');
			optionsJson.optionId = $(this).select('val');
			options.push(optionsJson)
		});
		json.options = options;
		var updateOrAdd = json.updateOrAdd;
		delete json.updateOrAdd;
		if (updateOrAdd == 'add') {
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/addSku',
				data: json,
				success: function(data) {
					goodsSKUTable();
					$('div#Form_goodsSKU_manage div#basicInfo-goodsSKU input[name="skuId"]', wraper).val(data.skuId);
					$.jRadMessage({
						level: 'success',
						message: '创建成功！',
						selector: $('div#Form_goodsSKU_manage div#basicInfo-goodsSKU', wraper)
					})
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message,
						selector: $('div#Form_goodsSKU_manage div#basicInfo-goodsSKU', wraper)
					});
				}
			})
		} else {
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/editSku',
				data: json,
				success: function(data) {
					goodsSKUTable();
					$.jRadMessage({
						level: 'success',
						message: '编辑成功！',
						selector: $('div#Form_goodsSKU_manage div#basicInfo-goodsSKU', wraper)
					})
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message,
						selector: $('div#Form_goodsSKU_manage div#basicInfo-goodsSKU', wraper)
					});
				}
			})
		}

	});

	function getSkuParams(skuId) {
		$('#basicInfo-goodsSKU div.grid-layout-main div.addSkus', wraper).remove();
		if (skuId == '') {
			var item = $.jRadGet({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/getSkuParams?commodityId=' + id
			});
		} else {
			var item = $.jRadGet({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/getSkuParams?commodityId=' + id + '&skuId=' + skuId
			});
			var _item = $.jRadGet({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/getSku?skuId=' + skuId
			})
		}
		var str = '';
//		var fields = {};
		var validatorsSKU = {};
//		fields['status'] = {
//			data: [{
//				id: '1',
//				name: '上架'
//			}, {
//				id: '0',
//				name: '下架'
//			}, {
//				id: '2',
//				name: '删除'
//			}]
//		};
		
		validatorsSKU['marketPrice'] = [{
			msg: '市场价不能为空',
			type: 'min',
			value: '1'
		}];
		
//		validatorsSKU['sellingPrice'] = [{
//			msg: '售价不能为空',
//			type: 'min',
//			value: '1'
//		}];
		validatorsSKU['weight'] = [{
			msg: '重量不能为空',
			type: 'min',
			value: '1'
		}];
		validatorsSKU['volume'] = [{
			msg: '体积不能为空',
			type: 'min',
			value: '1'
		}];
//		validatorsSKU['inventoryNum'] = [{
//			msg: '库存不能为空',
//			type: 'min',
//			value: '1'
//		}];
		validatorsSKU['limitNum'] = [{
			msg: '限量不能为空',
			type: 'min',
			value: '1'
		}];
		
		$('#basicInfo-goodsSKU', wraper).form({
//			fields_params: fields,
			validators: validatorsSKU,
			layout: 'grid',
			autobinding: false,
			height:500
		});
		if (skuId == '') {
			$('#Form_goodsSKU_manage', wraper).form({

				layout: 'popup',
				item: item,
				grid: 16,
				autobinding: false
			})
		} else {
			$('#Form_goodsSKU_manage', wraper).form({

				layout: 'popup',
				item: _item,
				grid: 16,
				autobinding: false
			})
		}
		$.each(item, function(i) {
			var dataArr = [];
			var value = [];
			var valueStr = '';
			var dataStr = '';
			var json={};
			json.id="";
			json.name="请选择";
			dataArr.push(json);
			$.each(item[i].options, function(j) {
				json = {};
				json.id = item[i].options[j].optionId;
				json.name = item[i].options[j].optionName;
				dataArr.push(json);
				if (item[i].options[j].checked == '1') {
					value.push(item[i].options[j].optionId)
				}
			});
			valueStr = value.join(',');
			dataStr = JSON.stringify(dataArr);
			dataStr = dataStr.replace(/\s/g, "");
//			console.log(dataStr.replace(/\s/g, ""));
			str += '<div class="row-fluid addSkus">' + '<label class="span4 grid-layout-label">' + item[i].skuParamName + '：</label>' + '<div class="span8 grid-layout-content">' + '<div class="jrad-select-container addSkuParam" name="' + item[i].skuParamId + '" value="' + valueStr + '" data=' + dataStr + '></div>' + '</div>' + '</div>'
		});
		$('#basicInfo-goodsSKU div.grid-layout-main', wraper).prepend(str);
		$('#basicInfo-goodsSKU div.grid-layout-main div.addSkuParam', wraper).each(function() {
			var selectData = JSON.parse($(this).attr('data'));
			var selectVal = $(this).attr('value');
			$(this).select({
				data: selectData
			});
			$(this).select('val',selectVal)
		})
	}
	//成本价格Tab
	function costPriceSkuTab(skuId){

		var fields_params={};
		fields_params['supplyId'] = {
				urlData:{
					url:'/ycbmall-manager-ws/ws/0.1/supplyCms/list?skuId'+skuId
				}
		}
		$('#costPrice-goodsSKU', wraper).form({
			fields_params: fields_params,
			layout: 'grid',
			autobinding: false
		});	
		
		var item = $.jRadGet({
			url: '/ycbmall-manager-ws/ws/0.1/skuCms/getCostPricesBySkuId?skuId='+skuId
		});
		
		if(item.length>1){
			for(i=1;i<item.length;i++){
				var tempStr='<div class="row-fluid supply clearSupply">'
					+'<label class="span4 grid-layout-label">供应商：</label>'
					+'<div class="span5 grid-layout-content">'
					+'<div class="jrad-select-container"></div>'
					+'</div>'
					+'<label class="span4 grid-layout-label">成本价：</label>'
					+'<div class="span7 grid-layout-content">'
					+'<div class="jrad-input-container"></div>'
					+'<span class="delsupply" style="font-weight:bold;font-size:16px;position:relative;top:3px;left:10px;cursor:pointer;">X</span>'
					+'</div>'
					+'</div>';
				$("div#Form_goodsSKU_manage div#costPrice-goodsSKU div.grid-layout-main",wraper).append(tempStr);
				
				$('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.supply .jrad-select-container',wraper).select({
					urlData:{
						url:'/ycbmall-manager-ws/ws/0.1/supplyCms/list?skuId='+skuId
					}
				});
				$('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.supply .jrad-input-container',wraper).input();
				$('span.delsupply',wraper).die('click').live('click',function(){
					$(this).parents('div.supply').remove()
				});
			}
		}
		
		if(item.costPriceArray!=''){
			$.each(item,function(i){
				$('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.supply:eq('+i+')',wraper).find('div.jrad-select-container').select('val',item[i].supplyId);
				$('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.supply:eq('+i+')',wraper).find('div.jrad-input-container').input('val',item[i].costPrice);
				
			});
		}
		
		$('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.icon-btn16',wraper).unbind('click').bind('click', function(){	
			if($('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.supply',wraper).length>=10){
				$.jRadMessage({level:'error',message:"新增的供应商不能超过10个",selector:$("#costPrice-goodsSKU",wraper)});
				return false;
			}
			var tempStr='<div class="row-fluid supply clearSupply">'
				+'<label class="span4 grid-layout-label">供应商：</label>'
				+'<div class="span5 grid-layout-content">'
				+'<div class="jrad-select-container"></div>'
				+'</div>'
				+'<label class="span4 grid-layout-label">成本价：</label>'
				+'<div class="span7 grid-layout-content">'
				+'<div class="jrad-input-container"></div>'
				+'<span class="delsupply" style="font-weight:bold;font-size:16px;position:relative;top:3px;left:10px;cursor:pointer;">X</span>'
				+'</div>'
				+'</div>';
			$("div#Form_goodsSKU_manage div#costPrice-goodsSKU div.grid-layout-main",wraper).append(tempStr);
			
			$('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.supply .jrad-select-container',wraper).select({
				urlData:{
					url:'/ycbmall-manager-ws/ws/0.1/supplyCms/list?skuId='+skuId
				}
			});
			$('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.supply .jrad-input-container',wraper).input();
			$('span.delsupply',wraper).die('click').live('click',function(){
				$(this).parents('div.supply').remove()
			});
		});
		//成本价格确定按钮
		$('div#Form_goodsSKU_manage div#costPrice-goodsSKU span.ui-btn-primary',wraper).unbind('click').bind('click', function(){
			var json={};
			json.skuId=skuId;
			json.operator = carsmart_config.operatorName;
			var costPriceArray=[];
			$($('div#Form_goodsSKU_manage div#costPrice-goodsSKU div.supply',wraper)).each(function(){
					var costPriceJson={};
					costPriceJson.supplyId=$(this).find('div.jrad-select-container',wraper).select('val');
					costPriceJson.costPrice=$(this).find('div.jrad-input-container',wraper).input('val');
					costPriceArray.push(costPriceJson);
			});
			json.costPriceArray=costPriceArray;
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/editCostPrice',
				data: json,
				success: function(data) {
					$.jRadMessage({
						level: 'success',
						message: '编辑成功！',
						selector: $('div#Form_goodsSKU_manage div#costPrice-goodsSKU', wraper)
					});
					$('#Table_sku_list',wraper).flexReloadCurrentPage();
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message,
						selector: $('div#Form_goodsSKU_manage div#costPrice-goodsSKU', wraper)
					});
				}
			})
		});
	}
	
	
	function salesCountSimTab(skuId){
		var _item=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/skuCms/getFigure?skuId='+skuId});
		var dataStr='';
		var arrayProvinces=_item.arrayProvinces;
		var canSellNumType=_item.canSellNumType;
		if(canSellNumType==1){
			$('#salesCount-goodsSKU div[name="canSellNumType"]',wraper).radio('val',1);
			$('.cityCount',wraper).hide();
            $('.countryCount',wraper).show();
		}else if(canSellNumType==2){
			$('#salesCount-goodsSKU div[name="canSellNumType"]',wraper).radio('val',2);
			$('.cityCount',wraper).show();
            $('.countryCount',wraper).hide();
		}
		$('.countryCount',wraper).find('input[name="nationCanSellNum"]').val(_item.nationCanSellNum);
		$.each(arrayProvinces,function(){
			dataStr+='<tr>'
				+'<td rowspan="'+this.cityNum+'">'
				+'<input type="hidden" value="'+this.provinceId+'" />'
				+this.provinceName+'</td>'
				$.each(this.arrayCitys,function(i){
					if(i==0){
						dataStr+='<td>'+this.areaName+'</td>'
							+'<td class="canSellNumList"><input type="text" value="'+this.canSellNum+'" class="'+this.areaCodeId+'"/></td>'
							+'</tr>'
					}else{
						dataStr+='<tr>'
							+'<td>'+this.areaName+'</td>'
							+'<td class="canSellNumList"><input type="text" value="'+this.canSellNum+'" class="'+this.areaCodeId+'" /></td>'
							+'</tr>'
					}
				});
		});
		$(".cityCount table tbody",wraper).html(dataStr);
			
	//设置可卖数点击确定 
	$('div#Form_goodsSKU_manage div#salesCount-goodsSKU span.ui-btn-primary',wraper).unbind('click').bind('click', function(){
		$('#Form_goodsSKU_manage',wraper).append('<div id="FormBackground" class="overcurtainDiv" style="z-index: 304; display: block;"></div>')
		var flag=$('div#Form_goodsSKU_manage div#salesCount-goodsSKU',wraper).form('validateAll');
		if(!flag){
			return false
		}
		var json = $('div#Form_goodsSKU_manage div#salesCount-goodsSKU', wraper).form('getValue');
		json.operator = carsmart_config.operatorName;
		json.skuId=skuId;
		var citySellArray=[];
		$("#cityCount table tbody td.canSellNumList input",wraper).each(function(){
			var areaCodeJson={};
			var areaCodeIdStr=$(this).attr("class");
			var canSellNumStr=$(this).val();
			if(canSellNumStr==''){
				areaCodeJson.canSellNum='';
			}else{
				areaCodeJson.canSellNum=parseInt(canSellNumStr);
			}
			areaCodeJson.areaCodeId=parseInt(areaCodeIdStr)
			citySellArray.push(areaCodeJson);
		});
		json.citySellArray=citySellArray;
		var messageStr='';
		messageStr+=(json.canSellNumType==1)?'确认采用全国可卖数？':'确认采用分城市可卖数？';
		$.jRadConfirm(messageStr, 'success',
		function() {
			$("#FormBackground").hide();
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/addToSellForCountry',
				data: json,
				success: function(data) {
					$.jRadMessage({
						level: 'success',
						message: '编辑成功！',
						selector: $('div#Form_goodsSKU_manage div#salesCount-goodsSKU', wraper)
					});
					
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message,
						selector: $('div#Form_goodsSKU_manage div#salesCount-goodsSKU', wraper)
					});
				}
			})
		});
	});
	}
	//sku的状态
	function statusSkuTab(skuId){
		
		var fields = {};
		fields['status'] = {
				data: [{
					id: '1',
					name: '上架'
				}, {
					id: '0',
					name: '下架'
				}, {
					id: '2',
					name: '删除'
				}]
			};
		
		$('#status-goodsSKU', wraper).form({
			fields_params: fields,
			layout: 'grid',
			autobinding: false,
			height:500
		});
		
		var _item = $.jRadGet({
			url: '/ycbmall-manager-ws/ws/0.1/skuCms/getSku?skuId=' + skuId
		})
		
		$('#Form_goodsSKU_manage div#status-goodsSKU', wraper).form({
			layout: 'popup',
			item: _item,
			grid: 16,
			autobinding: false
		});
		$('div#Form_goodsSKU_manage div#status-goodsSKU span.ui-btn-primary', wraper).unbind('click').bind('click', function() {
			
			var json = $('div#Form_goodsSKU_manage div#status-goodsSKU', wraper).form('getValue');
			json.skuId=skuId;
			json.operator = carsmart_config.operatorName;
			
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/updateSkuStatus',
				data: json,
				success: function(data) {
					goodsSKUTable();
					$.jRadMessage({
						level: 'success',
						message: '编辑成功！',
						selector: $('div#Form_goodsSKU_manage div#status-goodsSKU', wraper)
					});
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message,
						selector: $('div#Form_goodsSKU_manage div#status-goodsSKU', wraper)
					});
				}
			})
			
		});
	}
	
	
	//价格的Tab的
	function priceSkuTab(skuId,commodityId){
		var _item=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/skuCms/getPrice?skuId='+skuId});
		var nationArray = _item.nationArray;  //获取全国城市集合
		var provinceArray = _item.provinceArray; //获取省份集合
		var dataStr='';
		$("#nationPrice tbody tr td input",wraper).removeClass();
			$.each(nationArray,function(i){
				$("#nationPrice tbody tr td:eq("+(2*i)+") input",wraper).attr('class',this.skuPriceFileId);
				$("#nationPrice tbody tr td:eq("+(2*i)+") input",wraper).val(this.backPrice);
				$("#nationPrice tbody tr td:eq("+(2*i+1)+") input",wraper).val(this.frontPrice);
			});			
			$.each(provinceArray,function(i){
				dataStr+='<tr>'
					+'<td rowspan="'+this.cityPriceArray.length+'">'
					+'<input type="hidden" class="provinceId" value="'+this.provinceId+'"/>'
					+this.provinceName
					+'</td>'
				$.each(this.cityPriceArray,function(i){
					dataStr+='<td><input type="hidden" class="areaCodeId" value="'+this.areaCodeId+'"/>'+this.areaName
							+'</td>'
						if(this.areaCodePrices.length==0){
							dataStr+='<td><input  type="text" style="width:80px" class=""></td><td><input type="text" style="width:80px"></td><td><input style="width:80px" type="text" class=""></td><td><input type="text" style="width:80px"></td>'
						}else if(this.areaCodePrices.length==1){
							if(this.areaCodePrices[0].level==1){
								dataStr+='<td><input type="text" style="width:80px" value="'+this.areaCodePrices[0].backPrice+'" class="'+this.areaCodePrices[0].skuPriceFileId+'"></td>'
								   +'<td><input type="text" style="width:80px" value="'+this.areaCodePrices[0].frontPrice+'">'
								   +'</td><td><input type="text" style="width:80px" class=""></td><td><input type="text" style="width:80px"></td>'
							}else{
								dataStr+='</td><td><input type="text" style="width:80px" class=""></td><td><input type="text" style="width:80px"></td>'
								   +'<td><input type="text" style="width:80px" value="'+this.areaCodePrices[0].backPrice+'" class="'+this.areaCodePrices[0].skuPriceFileId+'"></td>'
								   +'<td><input type="text" style="width:80px" value="'+this.areaCodePrices[0].frontPrice+'">'
								   
							}
						}else{
							$.each(this.areaCodePrices,function(i){
							dataStr+='<td><input type="text" style="width:80px" value="'+this.backPrice+'" class="'+this.skuPriceFileId+'"></td>'
							   +'<td><input type="text" style="width:80px" value="'+this.frontPrice+'">'
							   +'</td>'
							})
						}
					dataStr+='</tr>'
				});
			});
			
			$("#cityPrice table tbody",wraper).html(dataStr);
		//价格档点击确定
		$('div#Form_goodsSKU_manage div#price-goodsSKU span.ui-btn-primary',wraper).unbind('click').bind('click', function(){
			var json={};
			var nationPriceArray =[];
			for (var i = 0; i <2 ; i++) {
				var nationJson={};
				//先写死后期改
				if(i==0){
					nationJson.priceName='普通价格';
					nationJson.backName='商城价';
					nationJson.level=1;
				}else{
					nationJson.priceName='VIP价格';
					nationJson.backName='VIP价格';
					nationJson.level=2;
				}
				nationJson.backPrice = $("#nationPrice tbody tr td:eq("+(i*2)+") input",wraper).val();
				nationJson.skuPriceFileId = $("#nationPrice tbody tr td:eq("+(i*2)+") input",wraper).attr("class");
				nationJson.frontPrice = $("#nationPrice tbody tr td:eq("+(i*2+1)+") input",wraper).val();
				nationPriceArray.push(nationJson);
			}
			var cityPriceArray = [];
			for(var i = 0; i<$("#cityPrice table tbody tr",wraper).length;i++){
				var cityJson ={};   
				var areaCodePrices=[]; 
				for (var j = 1; j <3 ; j++) {
					var areaCodeJson={};
					//先给写死，后期得改
					if(j==1){
						areaCodeJson.priceName='普通价格';
						areaCodeJson.backName='商城价';
						areaCodeJson.level=1;
					}else{
						areaCodeJson.priceName='VIP价格';
						areaCodeJson.backName='VIP价格';
						areaCodeJson.level=2;
					}
					if(undefined!=$("#cityPrice tbody tr:eq("+i+") td:eq(0)",wraper).attr("rowspan")){
						areaCodeJson.backPrice = $("#cityPrice tbody tr:eq("+i+") td:eq("+(j*2)+") input",wraper).val();
						areaCodeJson.skuPriceFileId = $("#cityPrice tbody tr:eq("+i+") td:eq("+(j*2)+") input",wraper).attr("class");
						areaCodeJson.frontPrice = $("#cityPrice tbody tr:eq("+i+") td:eq("+(j*2+1)+") input",wraper).val();
						areaCodePrices.push(areaCodeJson);
					}else{
						areaCodeJson.backPrice = $("#cityPrice tbody tr:eq("+i+") td:eq("+(j*2-1)+") input",wraper).val();
						areaCodeJson.skuPriceFileId = $("#cityPrice tbody tr:eq("+i+") td:eq("+(j*2-1)+") input",wraper).attr("class");
						areaCodeJson.frontPrice = $("#cityPrice tbody tr:eq("+i+") td:eq("+(j*2)+") input",wraper).val();
						areaCodePrices.push(areaCodeJson);
					}
					
				}
				//去城市的Id，取td下input中类选择器为areaCodeId的值
				if(undefined!=$("#cityPrice tbody tr:eq("+i+") td:eq(0)",wraper).attr("rowspan")){
					cityJson.areaCodeId=$("#cityPrice tbody tr:eq("+i+") td input.areaCodeId",wraper).val();
					cityJson.areaCodeName=$("#cityPrice tbody tr:eq("+i+") td:eq(1)",wraper).text();
				}else{
					cityJson.areaCodeId=$("#cityPrice tbody tr:eq("+i+") td input.areaCodeId",wraper).val();
					cityJson.areaCodeName=$("#cityPrice tbody tr:eq("+i+") td:eq(0)",wraper).text();
				}
				cityJson.areaCodePrices= areaCodePrices;
				cityPriceArray.push(cityJson);
			}
			json.cityPriceArray = cityPriceArray;
			json.nationPriceArray=nationPriceArray;
			json.commodityId=commodityId;
			json.skuId=skuId;
			json.operator = carsmart_config.operatorName;
			
			
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/saveOrUpdateSkuPrice',
				data: json,
				success: function(data) {
					$.jRadMessage({
						level: 'success',
						message: '编辑成功！',
						selector: $('div#Form_goodsSKU_manage div#price-goodsSKU', wraper)
					})
					priceSkuTab(data.skuId,data.commodityId);
				},
				error: function(data) {
					var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message,
						selector: $('div#Form_goodsSKU_manage div#price-goodsSKU', wraper)
					});
				}
			})
		});
	}
	
	
	
	function bindCarTypeTable(skuId) {
		var page_column_model_c = new Array();
		var page_list_buttons_c = new Array();


		page_column_model_c.push({
			display: '品牌',
			name: 'brandName'
		});
		page_column_model_c.push({
			display: '车厂',
			name: 'factoryName'
		});
		page_column_model_c.push({
			display: '车系',
			name: 'modelName'
		});
		page_column_model_c.push({
			display: '车型',
			name: 'styleName'
		});

		$('#Form_service_brand', wraper).form({
			title: '绑定车型选择',
			fields_params: {
				'vendor': {
					data: [{
						id: '全部',
						name: '全部'
					}]
				}
			},
			height: 500
		});


		page_list_buttons_c.push({
			name: 'edit',
			title: '编辑',
			bclass: 'edit',
			onpress: function() {
				try {
					$("#Form_service_brand .jrad-tree", wraper).tree('destroy');
				} catch (e) {}
				var treeOption = setBrandTree(wraper);
				$("#Form_service_brand .jrad-tree", wraper).tree(treeOption);
				var itemTree = $.jRadGet({
					url: '/ycbmall-manager-ws/ws/0.1/skuCms/getCarStyle?skuId=' + skuId
				});
				var data = {};
				if (itemTree.length == 1 && itemTree[0].brandId == "0") {} else {
					$.each(itemTree, function(i, json) {
						$.each(json.factories, function() {
							var factoryNode = $("#Form_service_brand .jrad-tree", wraper).tree('getNodeByParam', 'id', this.factoryId);
							$("#Form_service_brand .jrad-tree", wraper).tree('open', factoryNode, true);
							var pNode = factoryNode.getParentNode();
							$("#Form_service_brand .jrad-tree", wraper).tree('open', pNode, true);
						})
					});
				}

				if (itemTree.length == 1 && itemTree[0].brandId == '0') {
					data = {
						"vendor": "全部"
					}
				}

				$('#Form_service_brand', wraper).form({
					item: data,
					url: '/ycbmall-manager-ws/ws/0.1/skuCms/editCarStyleInfo',
					before_submit: function(json) {
						json.skuId = skuId;
						json.operator = carsmart_config.operatorName;
						var vendor = $('#Form_service_brand div[name="vendor"]', wraper).checkbox('val');
						var brandArr = [];
						if (vendor.length == 0 || vendor[0] == "") {
							var treeObj = getZtreeObj(wraper);
							var brandFilter = function(node) {
								return (node.level == 1 && node.checked == true);
							}
							var brandNodes = treeObj.getNodesByFilter(brandFilter);
							$.each(brandNodes, function() {
								var brandJson = {};
								brandJson.brandId = this.id;
								brandJson.factories = [];
								var factoryFilter = function(node) {
									return (node.level == 2 && node.checked == true && node.brandId == brandJson.brandId);
								}
								var factoryNodes = treeObj.getNodesByFilter(factoryFilter);
								$.each(factoryNodes, function(i) {
									var factoryJson = {};
									factoryJson.factoryId = factoryNodes[i].id;
									factoryJson.models = [];
									var modelFilter = function(node) {
										return (node.level == 3 && node.checked == true && node.factoryId == factoryJson.factoryId);
									}
									var modelNodes = treeObj.getNodesByFilter(modelFilter);
									$.each(modelNodes, function(j) {
										var modelJson = {};
										modelJson.modelId = modelNodes[j].id;
										var styleIdStr = '';
										var styleIdArr = [];
										var styleFilter = function(node) {
											return (node.level == 4 && node.checked == true && node.modelId == modelJson.modelId);
										};
										var styleNodes = treeObj.getNodesByFilter(styleFilter);
										$.each(styleNodes, function(k) {
											styleIdArr.push(styleNodes[k].id)
										});
										styleIdStr = styleIdArr.join(',');
										modelJson.styleIdStr = styleIdStr;
										factoryJson.models.push(modelJson)
									});
									brandJson.factories.push(factoryJson)
								});
								brandArr.push(brandJson);
							});
						} else {
							brandArr = [{
								brandId: '0',
								factories: [{
									factoryId: '0',
									models: [{
										modelId: '0',
										styleIdStr: '0'
									}]
								}]
							}]
						}
						json.brands = brandArr;
						delete json.vendor;
						return json
					},
					success_callback: function() {
						$('#Table_bindCarType_list').flexMessage('编辑成功', 'success');
						$('#Table_bindCarType_list').flexReloadCurrentPage();
					},
					error: function(xhr) {
						var errormsg = eval("(" + xhr.responseText + ")");
						$.jRadMessage({
							level: 'error',
							message: errormsg[0].message
						})
					}
				}).form('open');
				setTimeout(check, 600);

				function check() {
					if (itemTree.length == 1 && itemTree[0].brandId == '0') {} else {
						var treeObj = getZtreeObj(wraper);
						$.each(itemTree, function(i) {
							var brandId = itemTree[i].brandId;
							$.each(this.factories, function() {
								var factoryId = this.factoryId;
								$.each(this.models, function() {
									var styleIdArr = this.styleIdStr.split(',');
									var modelId = this.modelId;
									$.each(styleIdArr, function(j) {
										var styleId = styleIdArr[j];
										var styleFilter = function(node) {
											return (node.level == 4 && node.id == styleId && node.modelId == modelId);
										}
										var styeNode = treeObj.getNodesByFilter(styleFilter, true);
										treeObj.checkNode(styeNode, true, true)
									})
								})
							})
						})
					}
				};
				$('#Form_service_brand span.jrad-btn-primary,#Form_service_brand span.jrad-btn-normal,#Form_service_brand .pop-up-close', wraper).bind('click', function() {
					$('body').append('<div id="formBackground" class="overcurtainDiv" style="z-index: 303; display: block;"></div>')
				})
			}
		});
		page_list_buttons_c.push({
			name: 'delete',
			title: '删除',
			bclass: 'delete',
			prefunc: function() {
				var checked = $('#Table_bindCarType_list').getCheckedTrs();
				if (checked.length == 0) {
					return false;
				}
			},
			onpress: function() {
				var checked = $('#Table_bindCarType_list').getCheckedTrs();
				var delArr=[];
				var delStr='';
				checked.forEach(function(key,i){
					delArr.push(key.skuStyleRelId)
				});
				delStr=delArr.join(',');
				if (checked[0]) {
					$.jRadPost({
						url: '/ycbmall-manager-ws/ws/0.1/skuCms/deleteSkuStyleRels?skuStyleRelIdStr=' + delStr,
						success: function() {
							$('#Table_bindCarType_list').flexMessage('删除成功', 'success');
							$('#Table_bindCarType_list').flexReloadCurrentPage()
						},
						error: function(xhr) {
							var errormsg = eval("(" + xhr.responseText + ")");
							$.jRadMessage({
								level: 'error',
								message: errormsg[0].message
							})
						}
					})
				}
			}
		});

		$('#Table_bindCarType_list', wraper).flexigrid({
			colModel: page_column_model_c,
			buttons: page_list_buttons_c,
			searchitems: [],
			url: '/ycbmall-manager-ws/ws/0.1/skuCms/querySkuStyleRels?skuId=' + skuId,
			method: 'get',
			showSearch: true,
			onError: showError,
			pagination: {
				diaplay_pages: 5,
				align: 'bottom'
			},
			overflow: true
		});
	}
}
function getClassificationName(node, val, wraper) {
	var label = "";
	var classClass = "";
	var sc = "";
	if (node == 2) {
		label = "二级分类：";
		sc="second";
		classClass = "secondClass";
		_val=$(".jrad-table .searchContent div[name='firstClassificationId']",wraper).select('val');
		$("#basicAttr-goods div.classification", wraper).find('.second').remove();
	}
	if (val != "") {
		var item = $.jRadGetDataSources("/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentId?parentId=" + val + "&level=" + node, "classificationId", "name");
		if (item.length > 0) {
			item.unshift({
				id: '',
				name: '请选择'
			});
			var $label = $("<label>").addClass('grid-layout-label span3').addClass(sc).html(label);
			var $div = $("<div>").addClass('grid-layout-content span4 fluid-wrap').addClass(sc);
			var $select = $("<div>").attr('name', classClass).addClass('jrad-select-container addClass');
			if (classClass == "secondClass") {
				$("#basicAttr-goods div.classification", wraper).append($label).append($div.append($select));
			}
			node++;
			$select.select({
				data: item,
				unshiftData: {
					id: '',
					name: '请选择'
				},
				grid: false,
				onchange: function(val) {
					getClassificationName(node, val, wraper);
				}
			});
		}else{
		var lastVal = $("#basicAttr-goods div.addClass:last", wraper).select('val');
		$("#basicAttr-goods input[name='classificationId']", wraper).val(lastVal)
		}
	}
}

function getClassificationNameSearch(node, val, wraper) {
	var label = "";
	var classClass = "";
	var sc = "";
	var _val = "";
	if (node == 2) {
		label = "二级分类：";
		classClass = "classificationId";
		sc = "second";
		$(".jrad-table .searchContent", wraper).find('.second').remove();
	}
	if (val != "") {
		var item = $.jRadGetDataSources("/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentId?parentId=" + val + "&level=" + node, "classificationId", "name");
		if (item.length > 0) {
			item.unshift({
				id: '',
				name: '请选择'
			});
			var $label = $("<label>").addClass('grid-layout-label span3').addClass(sc).html(label);
			var $div = $("<div>").addClass('grid-layout-content span4 fluid-wrap').addClass(sc);
			var $select = $("<div>").attr('name', classClass).addClass('jrad-select-container addClass');
			if (classClass == "classificationId") {
				$(".jrad-table .searchContent", wraper).find('div.row-fluid:eq(1) .span7').remove();
				$(".jrad-table .searchContent", wraper).find('div.row-fluid:eq(1)').append($label).append($div.append($select));
			}
			node++;
			$select.select({
				data: item,
				unshiftData: {
					id: '',
					name: '请选择'
				},
				grid: false,
				onchange: function(val) {
					getClassificationNameSearch(node, val, wraper);
					if(val!=""){
						$('#Table_goods_list',wraper).flexOptions({
		 					extParam:{
		 						classificationId: val
		 					}
		 				})
					}else{
						$('#Table_goods_list',wraper).flexOptions({
		 					extParam:{}
		 				})
					}
				}
			});
			
		} 
	}else{
	 	$('#Table_goods_list',wraper).flexOptions({
		 	extParam:{}
		})
	 }
}

