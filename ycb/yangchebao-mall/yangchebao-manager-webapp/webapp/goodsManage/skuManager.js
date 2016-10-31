$(document).ready(function(){ 
	//定义wraper
    var wraper = $('#Wraper_skuMannager_list');
    
    //定义三个集合，用于存放操作按钮,搜索条件,数据展示
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	
    
    
    //操作按钮
	page_list_buttons.push({
		name: 'Edit',
		title: '编辑',
		bclass: 'edit',
		prefunc: function() {
			var checked = $('#Table_sku_list').getCheckedTrs();
			if (checked.length != 1) {
				return false;
			} else {
				return true;
			}
		},
		onpress: function() {
			var checked = $('#Table_sku_list').getCheckedTrs();
			var id = checked[0].commondityId;
			var skuId = checked[0].skuId;
			if (checked[0]) {
				updateSkuView(id,skuId,wraper);
			}
		}
	});
    page_list_buttons.push({separator: true});
    //初始化组件数据
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
    
    //搜索框
    page_search_items.push({row:'1',type:'jrad-input',display:'skuID',name:'skuId'});
	page_search_items.push({row:'1',type:'jrad-input',display:'sku名称',name:'name'});
	page_search_items.push({
		row: '1',
		type: 'jrad-select',
		display: '状态',
		name: 'status',
		params: {
			data: [{
				id: '1',
				name: '上架'
			},{
				id: '0',
				name: '下架'
			},{
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
	
	//grid展示
	 page_column_model.push({display: '商品ID', name : 'commondityId'});
	 page_column_model.push({display: 'SKU ID', name : 'skuId'});
     page_column_model.push({display: 'SKU名称', name : 'name'});
     page_column_model.push({display: '商品类型', name : 'commodityTypeName'});
	 page_column_model.push({display: '可卖数', name : 'canSell',width:150,diy:function($row,$div){
		 var canSellArray = $row.canSell;
		 if(canSellArray.length>3){
			 for(var i =0;i<3;i++){
				 var $label = $('<label>'+canSellArray[i].cityName+'</label>:<label>'+canSellArray[i].canSellNum+'</label><br>');
				 $div.append($label);
			 }
			 $div.append('<labe>...</label>');
		 }else{
			 for(var i =0;i<canSellArray.length;i++){
				
					 var $label = '<label>'+canSellArray[i].cityName+'</label>:';
					 if(canSellArray[i].canSellNum!=undefined){ 
					 $label+='<label>'+canSellArray[i].canSellNum+'</label><br>';
					 }
					 $div.append($label);
				 
			 }
		 }
		 
	 }});
	 page_column_model.push({display: '价格(￥)', name : 'price',width:150,diy:function($row,$div){
		 var priceArray = $row.price;
		 if(priceArray != undefined){
		 if(priceArray.length>3){
			 for(var i =0;i<3;i++){
				 var $label = $('<label>'+priceArray[i].cityName+'</label>:<label>'+priceArray[i].backPrice+'</label><br>');
				 $div.append($label);
			 }
			 $div.append('<labe>...</label>');
		 }else{
			 for(var i =0;i<priceArray.length;i++){
				 var $label = $('<label>'+priceArray[i].cityName+'</label>:<label>'+priceArray[i].backPrice+'</label><br>');
				 $div.append($label);
			 }
		 }
		}
	 }});
	 page_column_model.push({display: '状态', name : 'statusName'});
	 page_column_model.push({display: '更新时间', name : 'updated'});
	 page_column_model.push({display: '操作人', name : 'operator'});
	    
	
	
	
	$('#Table_sku_list').flexigrid({
		reload:true,
		method:'get',
		colModel : page_column_model,
		buttons : page_list_buttons,
		searchitems :page_search_items,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true, 
		url:'/ycbmall-manager-ws/ws/0.1/skuParamCms/querySkuInfos',
		overflow:true
	});
	var _span3 = $('div.searchButtons', wraper);
	var _span20 = $('<div>').addClass('span20').append(_span3);
	var _div = $('<div>').addClass('row-fluid').append(_span20);
	$('div.searchContent', wraper).append(_div);
	$('div.searchContent span.span14', wraper).remove();
});
//二级分类
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
						$('#Table_sku_list',wraper).flexOptions({
		 					extParam:{
		 						classificationId: val
		 					}
		 				})
					}else{
						$('#Table_sku_list',wraper).flexOptions({
		 					extParam:{}
		 				})
					}
				}
			});
			
		} 
	}else{
	 	$('#Table_sku_list',wraper).flexOptions({
		 	extParam:{}
		})
	 }
}
//编辑按钮操作
function updateSkuView(id,skuId,wraper){
	$("#Form_goodsSKU_manage .details-tab .f-left", wraper).die('click').live('click', function() {
		$("#Form_goodsSKU_manage .details-tab .tab-cur", wraper).removeClass("tab-cur");
		$(this).addClass("tab-cur");
		var rele = $(this).attr("rele");
		$("#Form_goodsSKU_manage .tabReleForm", wraper).hide();
		if (rele == 'bindCarType-goodsSKU') {
			bindCarTypeTable(skuId);
		}
		if(rele == 'costPrice-goodsSKU'){
			costPriceSkuTab(skuId);
		}
		if (rele == 'salesCount-goodsSKU') {
			salesCountSimTab(skuId);
		}
		if (rele == 'price-goodsSKU') {
			priceSkuTab(skuId,id);
		}
		if (rele == 'status-goodsSKU') {
			statusSkuTab(skuId);
		}
		$("#" + rele, wraper).show();
	});
	$('#Form_goodsSKU_manage', wraper).form({
		title:'编辑',
		height:500
	}).form('open');
	
	clearGoodSKU();
	getSkuParams(id,skuId,wraper);
	
	$('div#Form_goodsSKU_manage div#basicInfo-goodsSKU input[name="skuId"]', wraper).val(skuId);
	
	$('#Form_goodsSKU_manage a.pop-up-close', wraper).live('click', function(){
		$('#Form_goodsSKU_manage', wraper).form({}).form('close')
	});
	
	function clearGoodSKU(){
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
	}
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
			$.jRadPost({
				url: '/ycbmall-manager-ws/ws/0.1/skuCms/editSku',
				data: json,
				success: function(data) {
					$.jRadMessage({
						level: 'success',
						message: '编辑成功！',
						selector: $('div#Form_goodsSKU_manage div#basicInfo-goodsSKU', wraper)
					});
					$('#Table_sku_list').flexReloadCurrentPage();
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
	});
	
function getSkuParams(id,skuId,wraper){
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
	var validatorsSKU = {};
	
	validatorsSKU['marketPrice'] = [{
		msg: '市场价不能为空',
		type: 'min',
		value: '1'
	}];
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
	validatorsSKU['limitNum'] = [{
		msg: '限量不能为空',
		type: 'min',
		value: '1'
	}];
	
	$('#basicInfo-goodsSKU', wraper).form({
		validators: validatorsSKU,
		layout: 'grid',
		autobinding: false
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
				url:'/ycbmall-manager-ws/ws/0.1/supplyCms/list?skuId='+skuId
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
				$('#Table_sku_list').flexReloadCurrentPage();
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
	var fields_params={};
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

	$('#salesCount-goodsSKU', wraper).form({
		fields_params: fields_params,
		layout: 'grid',
		autobinding: false
	});	
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
		$("#FormBackground",wraper).hide();
		$.jRadPost({
			url: '/ycbmall-manager-ws/ws/0.1/skuCms/addToSellForCountry',
			data: json,
			success: function(data) {
				$.jRadMessage({
					level: 'success',
					message: '编辑成功！',
					selector: $('div#Form_goodsSKU_manage div#salesCount-goodsSKU', wraper)
				});
				$('#Table_sku_list').flexReloadCurrentPage();
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
	},
	function() {
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
		autobinding: false
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
				$.jRadMessage({
					level: 'success',
					message: '编辑成功！',
					selector: $('div#Form_goodsSKU_manage div#status-goodsSKU', wraper)
				});
				$('#Table_sku_list').flexReloadCurrentPage();
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
				$('#Table_sku_list').flexReloadCurrentPage();
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
function showError(xhr) {
	var errormsg = eval("(" + xhr.responseText + ")");
	var cDiv = $("#Wraper_shop_list .cDiv");
	$.jRadMessage({
		level: 'error',
		message: errormsg[0].message,
		selector: cDiv
	});
}