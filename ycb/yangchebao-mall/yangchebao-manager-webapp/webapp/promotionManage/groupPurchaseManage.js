var groupPurchaseBasicAttrFlag=false;
var groupPurchaseDesFlag=false;
var groupPurchaseRuleFlag=false;
var commonQuestionFlag=false;
$(document).ready(function(){
	var wraper=$("#Wraper_groupPurchase_manage");
	$(".details-tab:eq(0) .f-left", wraper).click(function() {
		$(".details-tab:eq(0) .tab-cur",wraper).removeClass("tab-cur");
		$(this).addClass("tab-cur");
		var rele = $(this).attr("rele");
		$(".tabReleForm", wraper).hide();
		$("#"+rele,wraper).show();
		var type = $("#groupPurchaseAttr").find("input[name='updateOrAdd']").val();
		var id = $("#groupPurchaseAttr").find("input[name='groupPurchasingId']").val();
		if(type=="update"){
			if(rele=="groupPurchaseDes" &&groupPurchaseDesFlag==false ){
				var item=$.jRadGet({
					url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/getAuxInfo?groupPurchasingId='+id
				});
				groupPurchaseDesFlag=true
				$("#groupPurchaseDes div[name='introduce']",wraper).mediaarea('val',item.introduce);
			}
			if(rele="groupPurchaseRule"&&groupPurchaseRuleFlag==false){
				var item=$.jRadGet({
					url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/getAuxInfo?groupPurchasingId='+id
				});
				groupPurchaseRuleFlag=true
				$("#groupPurchaseRule div[name='rule']",wraper).mediaarea('val',item.rule);
			}
			if(rele="commonQuestion"&&commonQuestionFlag==false){
				var item=$.jRadGet({
					url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/getAuxInfo?groupPurchasingId='+id
				});
				commonQuestionFlag=true
				$("#commonQuestion div[name='commonProblems']",wraper).mediaarea('val',item.commonProblems);
			}
		}
		else{
			if(rele=="groupPurchaseDes"&&groupPurchaseDesFlag==false){
				if(id==''){
					$.jRadMessage({
						level:'error',
						message:'请先设置基本信息'
					});
					return false
				}
				groupPurchaseDesFlag= true
			}
			else if(rele="groupPurchaseRule"&&groupPurchaseRuleFlag==false){
				if(id=""){
					$.jRadMessage({
						level:'error',
						message:'请先设置基本信息'
					});
					return false
				}
				groupPurchaseRuleFlag=true
			}
			else if(rele="commonQuestion"&&commonQuestionFlag==false){
				if(id=""){
					$.jRadMessage({
						level:'error',
						message:'请先设置基本信息'
					});
					return false
				}
				commonQuestionFlag=true
			}
		}
		//$("#"+rele,wraper).show();
	});

	var page_column_model = new Array();
	var page_search_items = new Array();
	var page_list_buttons = new Array();
	
	var entityModel = {};
	var jRad = $.jRad({app: 'radsample-ws',entityModel: entityModel});
	jRad.validators['name']=[{"msg":"请填写团购名称","type":"min","value":"1"}];
	jRad.validators['subTitle']=[{"msg":"请填写团购子标题","type":"min","value":"1"}];
	jRad.validators['beginNum']=[{"msg":"请填写成团最小数量","type":"min","value":"1"}];
	jRad.validators['unit']=[{"msg":"请填写商品单位 ","type":"min","value":"1"}];
	jRad.validators['ratio']=[{"msg":"请填写违约金比例","type":"min","value":"1"}];
	
	var fields_params = {};
	var _form=$('#groupPurchaseAttr',wraper);
	//团购列表页图片
	fields_params['groupListImg']={
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			delFunc:function(item){
				item.list.remove();
				$("input[name='picUrl']",_form).val("");
				$("input[name='middlePicUrl']",_form).val("");
				$("input[name='smallPicUrl']",_form).val("");
			},
			fileName:'file',
			note:'仅支持JPG图片文件。',
			show:false,
			success:function(data){
				if(data[0]&&data[0].code=="400"){
					$.jRadMessage({level:'error',message:data[0].message});
				}else{
					$("input[name='picUrl']",_form).val(data.fileUrl);
					$("input[name='middlePicUrl']",_form).val(data.middleUrl);
					$("input[name='smallPicUrl']",_form).val(data.smallUrl);
				}
			},
			validator:[{
				msg:"只能上传jpg文件",
				type:"regex",
				value: /^.*\.(jpg|JPG)$/
			}],
			beforeSubmit: function(obj){
		      	var re = /^.*\.(jpg|JPG)$/;
		      	if(re.test(obj.val())){
		     		return true;
		     	}else{  
		     		$.jRadAlert("只能上传jpg文件", "error");
		     		return false;
		     	}
		    },
			showInfo:false,
			prev:'smallUrl',
			single:true
	};
	//团购活动页图片
	fields_params['groupActionImg']={
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			delFunc:function(item){
				item.list.remove();
				$("input[name='activePicUrl']",_form).val("");
				$("input[name='activeMiddlePicUrl']",_form).val("");
				$("input[name='activeSmallPicUrl']",_form).val("");
			},
			fileName:'file',
			note:'仅支持JPG图片文件。',
			show:false, 
			success:function(data){
				if(data[0]&&data[0].code=="400"){
					$.jRadMessage({level:'error',message:data[0].message});
				}else{
					$("input[name='activePicUrl']",_form).val(data.fileUrl);
					$("input[name='activeMiddlePicUrl']",_form).val(data.middleUrl);
					$("input[name='activeSmallPicUrl']",_form).val(data.smallUrl);
				}
			},
			validator:[{
				msg:"只能上传jpg文件",
				type:"regex",
				value: /^.*\.(jpg|JPG)$/
			}],
			beforeSubmit: function(obj){
		      	var re = /^.*\.(jpg|JPG)$/;
		      	if(re.test(obj.val())){
		     		return true;
		     	}else{  
		     		$.jRadAlert("只能上传jpg文件", "error");
		     		return false;
		     	}
		    }, 
			showInfo:false,
			prev:'smallUrl',
			single:true
	};
	
	//APP团购活动页图片
	fields_params['appGroupActionImg']={
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			delFunc:function(item){
				item.list.remove();
				$("input[name='appActivePicUrl']",_form).val("");
				$("input[name='appActiveMiddlePicUrl']",_form).val("");
				$("input[name='appActiveSmallPicUrl']",_form).val("");
			},
			fileName:'file',
			note:'仅支持JPG图片文件，图片大小640*260',
			show:false, 
			success:function(data){
				if(data[0]&&data[0].code=="400"){
					$.jRadMessage({level:'error',message:data[0].message});
				}else{
					$("input[name='appActivePicUrl']",_form).val(data.fileUrl);
					$("input[name='appActiveMiddlePicUrl']",_form).val(data.middleUrl);
					$("input[name='appActiveSmallPicUrl']",_form).val(data.smallUrl);
				}
			},
			validator:[{
				msg:"只能上传jpg文件",
				type:"regex",
				value: /^.*\.(jpg|JPG)$/
			}],
			beforeSubmit: function(obj){
		      	var re = /^.*\.(jpg|JPG)$/;
		      	if(re.test(obj.val())){
		     		return true;
		     	}else{  
		     		$.jRadAlert("只能上传jpg文件", "error");
		     		return false;
		     	}
		    }, 
			showInfo:false,
			prev:'smallUrl',
			single:true
	};
	
	//团购介绍
	fields_params['introduce']={
		theme:"Full",
		resizing:false,
		grid:18,
		height:200,
		uploadImg:{
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			filename:'file',
			delFunc:function(item){
				item.list.remove();
			},
			validator:[{
				mag:"只能上传JPG文件",
				type:"regex",
				value:/^.*\.(jpg|JPG)$/
			}],
			success:function(data){
				if(data[0]&&data[0].code=="400"){
          	 		$.jRadMessage({level:'error',message:data[0].message});
           		}
			},
			note: '仅支持 JPG图片文件。',
      		show:true,
      		showLarge:true, 
      		prev:'fileUrl', 
      		params: {type:""}, 
      		single: true 
		},
		CKOpt:{
      		fullPage:true,//是否使用完整的html编辑模式
      		basicEntities:false, //Whether to escape basic HTML entities in the document, including:  nbsp gt lt amp 
      		startupMode:'source' //载入时，以何种方式编辑 源码和所见即所得 "source"和"wysiwyg"
    	}
	};
	//团购规则
	fields_params['rule']={
		theme:"Full",
		resizing:false,
		grid:18,
		height:200,
		uploadImg:{
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			filename:'file',
			delFunc:function(item){
				item.list.remove();
			},
			validator:[{
				mag:"只能上传JPG文件",
				type:"regex",
				value:/^.*\.(jpg|JPG)$/
			}],
			success:function(data){
				if(data[0]&&data[0].code=="400"){
          	 		$.jRadMessage({level:'error',message:data[0].message});
           		}
			},
			note: '仅支持 JPG图片文件。',
      		show:true,
      		showLarge:true, 
      		prev:'fileUrl', 
      		params: {type:""}, 
      		single: true 
		},
		CKOpt:{
      		fullPage:true,//是否使用完整的html编辑模式
      		basicEntities:false, //Whether to escape basic HTML entities in the document, including:  nbsp gt lt amp 
      		startupMode:'source' //载入时，以何种方式编辑 源码和所见即所得 "source"和"wysiwyg"
    	}
	};
	//常见问题
	fields_params['commonProblems']={
		theme:"Full",
		resizing:false,
		grid:18,
		height:200,
		uploadImg:{
			url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
			filename:'file',
			delFunc:function(item){
				item.list.remove();
			},
			validator:[{
				mag:"只能上传JPG文件",
				type:"regex",
				value:/^.*\.(jpg|JPG)$/
			}],
			success:function(data){
				if(data[0]&&data[0].code=="400"){
          	 		$.jRadMessage({level:'error',message:data[0].message});
           		}
			},
			note: '仅支持 JPG图片文件。',
      		show:true,
      		showLarge:true, 
      		prev:'fileUrl', 
      		params: {type:""}, 
      		single: true 
		},
		CKOpt:{
      		fullPage:true,//是否使用完整的html编辑模式
      		basicEntities:false, //Whether to escape basic HTML entities in the document, including:  nbsp gt lt amp 
      		startupMode:'source' //载入时，以何种方式编辑 源码和所见即所得 "source"和"wysiwyg"
    	}
	};
	
	page_column_model.push({display:'团购信息ID',name:'groupPurchasingId'});
	page_column_model.push({display:'操作    ',diy:function(item,$div){
		var status=item.status;
		var isHot=item.isHot;
		if(status=='1'){
			$div.html('<a href="javascript:" class="operate">删除</a>')
		}
		if(status=='0'||status=='1'||status=='3'||status=='4'){
			$div.html('<a href="javascript:" class="operate">下线</a>')
		}
		if(status=='2'&& !isHot){
			$div.html('<a href="javascript:" class="operate">设置为热门</a>')
		}
		if(isHot){
			$div.html('<a href="javascript:" class="operate">取消热门</a>')
		}
	//}
		//团购商品操作
		$('a.operate',$div).unbind('click').bind('click',function(){
			var thisELem=$(this);
			setTimeout(function(){
				var checked = $('#Table_groupPurchase_manage').getCheckedTrs();
				//if(checked[0]){
				var operateVal=thisELem.html();
					var postData={};
					postData.groupPurchasingId = checked[0].groupPurchasingId;
					postData.operator=carsmart_config.operatorName;
					if(operateVal=='下线'){
						postData.status=5;
						postData.isHot=checked[0].isHot;
					}else if(operateVal=='删除'){
						postData.status=6;
						postData.isHot=checked[0].isHot;
					}else if(operateVal=='设置为热门'){
						postData.isHot=1;
						postData.status=checked[0].status;
					}else if(operateVal=='取消热门'){
						postData.isHot=0;
						postData.status=checked[0].status;
					}
					$.jRadConfirm('确认此次操作吗？',1,function(){
	              	$.jRadAjax({
	                	type:'post',
	                	data:postData,
	               		url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/editOperationInfo',
	                	success: function(){
	                  		$('#Table_groupPurchase_manage').flexMessage('操作成功!', 'success');
	                  		$('#Table_groupPurchase_manage').flexReload();
	                	},
	                	error:function(xhr){
	                  		var errormsg = eval("(" + xhr.responseText + ")"); 
	                  		if (errormsg != undefined) {
	                    		$('#Table_groupPurchase_manage').flexMessage(errormsg[0].message, 'error');
	                  		}
	                	}
	              	});
	            	});
				// }
			},10);
			//clearTimeout(t);
		});
	}
	});
	page_column_model.push({display:'团购名称',name:'name'});
	page_column_model.push({display:'开始时间',name:'startTime'});
	page_column_model.push({display:'结束时间',name:'endTime'});
	page_column_model.push({display:'团购状态',name:'statusName'});
	page_column_model.push({display:'最小成团目标值',name:'minNum'});
	page_column_model.push({display:'已下单商品总数',name:'cumulativeNum'});
	page_column_model.push({display:'完成程度',name:'completionRate'});
	
	
	page_search_items.push({row:'1',type:'jrad-input',display:'团购名称',name:'name'});
	page_search_items.push({row:'1',type:'jrad-input',display:'商品名称',name:'skuName'});
	page_search_items.push({row:'1',type:'jrad-select',display:'团购状态',name:'status',params:{
		data:[
			{id:'',name:'全部'},
			{id:'0',name:'待上线'},
			{id:'1',name:'预展中'},
			{id:'2',name:'进行中'},
			{id:'3',name:'已成功'},
			{id:'4',name:'已失败'},
			{id:'5',name:'已下线'}
		]
	}
	});
 	page_search_items.push({row:'2',type:'jrad-dateinput',display:'开始时间',name:'startTimeTop'});
 	page_search_items.push({row:'2',type:'jrad-dateinput',display:'至',name:'startTimeBottom'});
	page_search_items.push({row:'3',type:'jrad-dateinput',display:'结束时间',name:'endTimeTop'});
	page_search_items.push({row:'3',type:'jrad-dateinput',display:'至',name:'endTimeBottom'});
	
	page_list_buttons.push({name:'Add',title:'创建',bclass:'add',onpress:function(){
			$(".details-box:eq(0)",wraper).prev('.ui-tit').html('<strong>商家新增</strong>').show()
			initGoodInfo(wraper);
			$("#groupPurchaseAttr",wraper).form({
				item:{'operator':carsmart_config.operatorName},
				fields_params:fields_params,
				validator:jRad.validators,
				layout:'grid',
				autobinding:false
			});
			$(".details-box",wraper).slideDown();
			$(".jrad-table",wraper).slideUp();
			$(".scroll-up-btn").click();
			clearGroupPurchaseInfo(wraper);
		}
	});
	//点击编辑
	page_list_buttons.push({name:'Edit',title:'编辑',bclass:'edit',prefunc:function(){
			var checked=$("#Table_groupPurchase_manage").getCheckedTrs();
			if(checked.length!=1){return false;}else{return true;}
		},
		onpress:function(){
			var checked=$("#Table_groupPurchase_manage").getCheckedTrs();
			if(checked[0]){
				var id=checked[0].groupPurchasingId;
				var item=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/getBasicInfo?groupPurchasingId='+id});
				var _item=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/getAuxInfo?groupPurchasingId='+id});
				var skuInfo=item.skuInfo;
				$("#groupPurchaseAttr",wraper).form({
					url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/editBasicInfo',
					item:item,
					fields_params:fields_params,
					autobinding:false,
					layout:'block',
					before_submit:function(json){
						json.groupPurchasingId=checked[0].groupPurchasingId;
						json.operator=carsmart_config.operatorName;
						return json
					},
					success_callback:function(){
 						$("#Table_groupPurchase_manage").flexMessage('修改成功','success');
						$("#Table_groupPurchase_manage").flexReload()
					}
				});
				updateGroupView(id,wraper,item,_item);
				groupPurchaseVal(skuInfo);
			}
		}
	});
	//删除操作
//	 page_list_buttons.push({title:'删除',name:'delete',bclass: 'delete',prefunc:function(){
//	 	var checked=$("#Table_groupPurchase_manage").getCheckedTrs();
//	 	if (checked.length != 1) {return false;}else{return true;}
//      },onpress : function(){
//      	var checked=$("#Table_groupPurchase_manage").getCheckedTrs();
//      	var postData={};
//      	postData.groupPurchasingId=checked[0].id;
//      	postData.operator=carsmart_config.operatorName;
//      	$.jRadConfirm('确认删除吗？',1,function(){
//        		var id =  checked[0].groupPurchasingId; 
//        		$.jRadAjax({
//          	type:'post',
//          	data:postData,
//          	url:'',
//          	success: function(){
//            		$('#Table_groupPurchase_manage').flexMessage('删除成功!', 'success');
//              	$('#Table_groupPurchase_manage').flexReload();
//          	},
//          	error:function(xhr){
//            		var errormsg = eval("(" + xhr.responseText + ")"); 
//            		if (errormsg != undefined) {
//              		$('#Table_groupPurchase_manage').flexMessage(errormsg[0].message, 'error');
//            		}
//          	}
//        		});
//      	});
//	 }
//	 });
	$("#Table_groupPurchase_manage").flexigrid({

		colModel:page_column_model, 
		buttons:page_list_buttons,
		searchitems:page_search_items,
		queryParam:{'status':''},
		url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/queryGroupPurchasings',
		method:'get',
		showSearch:true,
		onError:showError,
		pagination:{diaplay_pages:5,align:'bottom'},
		overflow:true,
	});
	
	//返回按钮
	$(".details-tab:eq(0) .return", wraper).click(function(){
		$(".details-box",wraper).slideUp();
		$(".jrad-table",wraper).slideDown();
		$(".scroll-up-btn").click();
		clearGroupPurchaseInfo(wraper);
		$('#Table_groupPurchase_manage').flexReloadCurrentPage();
	});
	
	$("div.details-content span.jrad-btn-normal",wraper).button({
		click:function(){
			$(".details-box",wraper).slideUp();
			$(".jrad-table",wraper).slideDown();
			$(".scroll-up-btn").click();
			clearGroupPurchaseInfo(wraper);
			$('#Table_groupPurchase_manage').flexReloadCurrentPage(); 
		}
	});
	//确定提交 
	$("#groupPurchaseAttr span.jrad-btn-primary",wraper).button({
		click:function(){
			var flag=$("#groupPurchaseAttr",wraper).form('validateAll');
			if(!flag){
				return false
			}
			var json=$("#groupPurchaseAttr",wraper).form('getValue');
			json.groupPurchasingId=$("#groupPurchaseAttr",wraper).find("input[name='groupPurchasingId']").val();
			var updateOrAdd=json.updateOrAdd;
			delete json.updateOrAdd;
			json.operator=carsmart_config.operatorName;
			var skuInfo=[];
			$("#groupPurchaseGoods tbody tr").each(function(i){
				var thisNum=i;
				var _json={};
				_json.skuId=$(this).find("input[name='skuId']").val();
				_json.singleAccuLimit=$(this).find("input[name='singleAccuLimit']").val();
				_json.sequence=$(this).find("input[name='sequence']").val();
				var priceEchelons=[];
				$("#groupPurchasePrice tbody tr:eq("+thisNum+")").find("td:gt(0)").each(function(j){
					var _json2={};
					_json2.startNum=$(this).find("input[name='startNum']").val();
					_json2.endNum=$(this).find("input[name='endNum']").val();
					_json2.echelon=parseInt($(this).attr("class"));
					_json2.sellingPrice=$(this).find("input[name='sellingPrice']").val();
					priceEchelons.push(_json2);
					});
				_json.priceEchelons=priceEchelons;
				skuInfo.push(_json);
			});
			json.skuInfo=skuInfo;  
			if(updateOrAdd=='add'){
				$.jRadPost({
					url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/addBasicInfo',
					data:json,
					success:function(data){
						$.jRadMessage({
							level:'success',
							message:'保存成功!'
						});
						$("#groupPurchaseAttr",wraper).find("input[name='groupPurchasingId']").val(data.groupPurchasingId);
						$("#groupPurchaseAttr").find("input[name='updateOrAdd']").val('update')
					},
					error:function(data){
						var mes=eval('(' + data.responseText + ')');
						$.jRadMessage({
							level:'error',
							message:mes[0].message
						})
					}
				})
			}else if(updateOrAdd=='update'){
				//修改成功
				$.jRadPost({
					url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/editBasicInfo',
					data:json,
					success:function(data){
						$.jRadMessage({
							level:'success',
							message:'编辑成功!'
						});
					},
					error:function(data){
						var mes=eval('(' + data.responseText + ')');
						$.jRadMessage({
							level:'error',
							message:mes[0].message
						})
					}
				})
			}
			
		}
	});
	

	$("#groupPurchaseDes span.jrad-btn-primary",wraper).button({
		click:function(){
			var postData={};
			postData.introduce=$("#groupPurchaseDes",wraper).form('getValue').introduce;
			postData.rule=$("#groupPurchaseRule",wraper).form('getValue').rule;
			postData.commonProblems=$("#commonQuestion",wraper).form('getValue').commonProblems;
			postData.groupPurchasingId=$("#groupPurchaseAttr",wraper).find("input[name='groupPurchasingId']").val();
			postData.operator=carsmart_config.operatorName;
			$.jRadPost({
				url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/editAuxInfo',
				data:postData,
				success:function(data){
					$.jRadMessage({
						level:'success',
						message:'保存成功!'
					})
				},
				error:function(data){
					var mes=eval('(' + data.responseText + ')');
					$.jRadMessage({
						level:'error',
						message:mes[0].message
					})
				}
			})
		}
	});
	$("#groupPurchaseRule span.jrad-btn-primary",wraper).button({
		click:function(){
			var postData={};
			postData.introduce=$("#groupPurchaseDes",wraper).form('getValue').introduce;
			postData.rule=$("#groupPurchaseRule",wraper).form('getValue').rule;
			postData.commonProblems=$("#commonQuestion",wraper).form('getValue').commonProblems;
			postData.groupPurchasingId=$("#groupPurchaseAttr",wraper).find("input[name='groupPurchasingId']").val();
			postData.operator=carsmart_config.operatorName;
			$.jRadPost({
				url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/editAuxInfo',
				data:postData,
				success:function(data){
					$.jRadMessage({
						level:'success',
						message:'保存成功!'
					})
				},
				error:function(data){
					var mes=eval('(' + data.responseText + ')');
					$.jRadMessage({
						level:'error',
						message:mes[0].message
					})
				}
			})
		}
	});
	$("#commonQuestion span.jrad-btn-primary",wraper).button({
		click:function(){
			var postData={};
			postData.introduce=$("#groupPurchaseDes",wraper).form('getValue').introduce;
			postData.rule=$("#groupPurchaseRule",wraper).form('getValue').rule;
			postData.commonProblems=$("#commonQuestion",wraper).form('getValue').commonProblems;
			postData.groupPurchasingId=$("#groupPurchaseAttr",wraper).find("input[name='groupPurchasingId']").val();
			postData.operator=carsmart_config.operatorName;
			$.jRadPost({
				url:'/ycbmall-manager-ws/ws/0.1/groupPurchasingCms/editAuxInfo',
				data:postData,
				success:function(data){
					$.jRadMessage({
						level:'success',
						message:'保存成功!'
					})
				},
				error:function(data){
					var mes=eval('(' + data.responseText + ')');
					$.jRadMessage({
						level:'error',
						message:mes[0].message
					})
				}
			})
		}
	});
	$('#groupPurchaseAttr', wraper).form({
		validators: jRad.validators,
		fields_params: fields_params,
		layout: 'grid',
		autobinding: false
	});
	$('#groupPurchaseDes', wraper).form({
		fields_params: fields_params,
		layout: 'grid',
		autobinding: false
	});
	$('#groupPurchaseRule', wraper).form({
		fields_params: fields_params,
		layout: 'grid',
		autobinding: false
	});
	$('#commonQuestion', wraper).form({
		fields_params: fields_params,
		layout: 'grid',
		autobinding: false
	});
	$('#formGroupPurchaseSku',wraper).form({
		validators:{'id':[{msg:"SKU-ID不能为空",type:'min',value:"1"}]}, 
		title:'增加团品',
		submit: creatGroupPurchaseSku 
	 }); 
	 //点击图案品添加
	$("#groupPurchaseButton",wraper).button({
		click : function() {  
			$('#formGroupPurchaseSku',wraper).form({
			item:{}
			}).form('open');
		}
	});  
	$("#btn").click(function(){
	 	$('#formGroupPurchaseSku').form({
          // creatGroupPurchaseSku 
        })
	})
	 $("#addGroupSku .deleteButton",wraper).live('click',function(){ 
		$(this).parent('.areaSpan').remove();
		//档位也相应的减少sku商品
	});
	//全部SKU设置相同数量区间
	$("#commonBtn").click(function(){
		var modelNum=[];
		var td=$("#groupPurchasePrice tbody").find("tr:eq(0)").find("td:gt(0)");
		td.each(function(){
			var startNum=$(this).find("input[name='startNum']").val();
			var endNum=$(this).find("input[name='endNum']").val();
			modelNum.push(startNum);
			modelNum.push(endNum);
		});
		$("#groupPurchasePrice tbody").find("tr:gt(0)").each(function(){
			$(this).find("td:gt(0)").each(function(i){
				$(this).find("input[name='startNum']").val(modelNum[i*2]);
				$(this).find("input[name='endNum']").val(modelNum[i*2+1]);
			});
		});
	});
});
function showError(xhr) {
	var errormsg = eval("(" + xhr.responseText + ")");
	var cDiv = $("#Table_groupPurchase_manage .cDiv");
	$.jRadMessage({
		level: 'error',
		message: errormsg[0].message,
		selector: cDiv
	});
}

//初始化
function initGoodInfo(wraper){
	var _ul=$("div[name='groupListImg']",wraper).children(".pic-show");
	_ul.html("");
	var _ul4=$("div[name='groupActionImg']",wraper).children(".pic-show");
	_ul4.html("");
	var _ul7=$("div[name='appGroupActionImg']",wraper).children(".pic-show");
	_ul7.html("");
}
function clearGroupPurchaseInfo(wraper){
	$(".details-tab:eq(0) .f-left:first",wraper).click();
	$("#groupPurchaseAttr",wraper).form({item:{}});
	$("#groupPurchaseDes",wraper).form({item:{}});
	$("#groupPurchaseRule",wraper).form({item:{}});
	$("#commonQuestion",wraper).form({item:{}});
	$("#addGroupSku",wraper).find("tbody").html('');
	$("#groupPurchasePrice",wraper).find("tbody").html('');
	$("#groupPurchasePrice").hide();
	$("#addGroupSku").hide();
	groupPurchaseBasicAttrFlag=false;
	groupPurchaseDesFlag=false;
	groupPurchaseRuleFlag=false;
	commonQuestionFlag=false;
	$("#groupPurchaseAttr",wraper).find("input[name='updateOrAdd']").val('add');
}
//修改时赋值
function  FormManageVal(wraper,item){
	var _ul=$("div[name='groupListImg']",wraper).children(".pic-show"); 
	var _ul2=$("div[name='groupActionImg']",wraper).children(".pic-show");
	var _ul3=$("div[name='appGroupActionImg']",wraper).children(".pic-show");
	var src=item.smallPicUrl;
	var src2=item.activeSmallPicUrl;
	var src3=item.appActiveSmallPicUrl;
	if(src!=undefined&&src!=""){
		var _li='<li name="" class="adPicBoxli"><div class="smallUrl-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
			+'<img src="'+src+'">'
            +'</div></div><span name="smallUrl" class="del-btn adDel"></span></div></div></li>'
        _ul.html(_li);
        $(".adDel",wraper).click(function(){
        	var small = $(this).prev(".pic-content").find("img").attr("src");
            $(this).parents(".adPicBoxli").remove(); 
            $("input[name='picUrl']",wraper).val("");
		    $("input[name='middlePicUrl']",wraper).val("");
		    $("input[name='smallPicUrl']",wraper).val(""); 
        });
	}
	if(src2!=undefined&&src2!=""){ 
    	var _li2 = '<li name="" class="activePicBoxli"><div class="smallUrl-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
          	+'<img src="'+src2+'">'
          	+'</div></div><span name="smallUrl" class="del-btn activeDel"></span></div></div></li>'
      	_ul2.html(_li2); 
      	$(".activeDel",wraper).click(function(){
        	var small = $(this).prev(".pic-content").find("img").attr("src");
        	$(this).parents(".activePicBoxli").remove();
        	$("input[name='activePicUrl']",wraper).val("");
 		    $("input[name='activeMiddlePicUrl']",wraper).val("");
 		    $("input[name='activeSmallPicUrl']",wraper).val(""); 
      	});
    }
	if(src3!=undefined&&src3!=""){ 
    	var _li3 = '<li name="" class="appPicBoxli"><div class="smallUrl-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
          	+'<img src="'+src3+'">'
          	+'</div></div><span name="smallUrl" class="del-btn appDel"></span></div></div></li>'
      	_ul3.html(_li3); 
      	$(".appDel",wraper).click(function(){
        	var small = $(this).prev(".pic-content").find("img").attr("src");
        	$(this).parents(".appPicBoxli").remove();
        	$("input[name='appActivePicUrl']",wraper).val("");
 		    $("input[name='appActiveMiddlePicUrl']",wraper).val("");
 		    $("input[name='appActiveSmallPicUrl']",wraper).val(""); 
      	});
    }
}
//建团回填数据
function groupPurchaseVal(skuInfo){
	var managerStr="";
	var managerPrice="";
	$.each(skuInfo, function(i){
		var skuId=this.skuId;
		managerStr+='<tr style="padding:5px 0">'
				+'<td>'+skuId
				+'<input type="hidden" value="'+skuId+'" name="skuId" />'
				+'</td>'
				+'<td><img src="'+this.smallPicUrl+'" width="50" height="50"></td>'
				+'<td>'+this.name+'</td>'
				if(this.singleAccuLimit==undefined){
					managerStr+='<td><input type="text" class="span1" name="singleAccuLimit" value=""></td>'
				}else{
					managerStr+='<td><input type="text" class="span1" name="singleAccuLimit" value="'+this.singleAccuLimit+'"></td>'
				}
				if(this.sequence==undefined){
					managerStr+='<td><input class="span1" type="text" name="sequence" value=""></td>'
				}else{
					managerStr+='<td><input class="span1" type="text" name="sequence" value="'+this.sequence+'"></td>'
				}
				managerStr+='<td class="deleteButton" onclick="deleteSkuId('+skuId+')">X</td>'
				+'</tr>'
		managerPrice+='<tr>'
					+'<td class="skuId">'+skuId+'</td>'
				var priceEchelons=this.priceEchelons;
				var PriceEchelonslength=priceEchelons.length;
				var thisNUm=PriceEchelonslength+1;
				$.each(priceEchelons,function(j){
						managerPrice+='<td class="'+this.echelon+'"><p>数量<input type="text" class="span1" name="startNum" value="'+this.startNum+'"/>至<input type="text" class="span1" name="endNum" value="'+this.endNum+'"/></p><p>价格<input type="text" class="span1" name="sellingPrice" value="'+this.sellingPrice+'"/></p></td>'
				});
				while(thisNUm<=5){
					managerPrice+='<td class="'+thisNUm+'"><p>数量<input type="text" class="span1" name="startNum" />至<input type="text" class="span1" name="endNum" /></p><p>价格<input type="text" class="span1" name="sellingPrice" /></p></td>'
					thisNUm++;					
				}
		managerPrice+='</tr>'
	});
	$("#addGroupSku").show();
	$("#groupPurchasePrice").show();
	$("#addGroupSku").find("tbody").html(managerStr);
	$("#groupPurchasePrice").find("tbody").html(managerPrice);
}
function updateGroupView(id,wraper,item,_item){
	$(".details-box:eq(0)",wraper).prev('.ui-tit').html('<strong>修改团购信息</strong>').show();
	initGoodInfo(wraper);
	$(".jrad-table",wraper).slideUp();
	$(".details-box:eq(0)",wraper).slideDown();
	$(".scroll-up-btn").click();
	item:operator=carsmart_config.operatorName;
	item.groupPurchasingId = id;
	$("#groupPurchaseAttr",wraper).form({item:item});
	$("#groupPurchaseDes",wraper).form({item:_item.introduce});
	$("#groupPurchaseRule",wraper).form({item:_item.rule});
	$("#commonQuestion",wraper).form({item:_item.commonProblems});
	$(".scroll-up-btn").click();
	$("#groupPurchaseAttr",wraper).find("input[name='updateOrAdd']").val('update');  
	FormManageVal(wraper,item); 
}
function creatGroupPurchaseSku(){
	var wraper=$("#groupPurchaseAttr");
	var _form=$("#formGroupPurchaseSku");
	var id=_form.find("input[name='id']").val();
	var flag=_form.form('validateAll');
	if(!flag){
		return false;
	}
	if(id!=''){
		var newId=[];
		var arryId=id.split(",");
		var preId=[];
		$.each(arryId, function(i){
			var flag=0;
			$("#addGroupSku tbody tr").each(function(j){
				preId[j]=$(this).children("td:first").children("input[name='skuId']").val();
				if(arryId[i]==preId[j]){
					flag=1;
				}
			});
			if(!flag){
				newId.push(arryId[i]);
			}
		});
		id=newId.join(",");
		if(id==''){
			_form.form('message',"SKU-ID已存在",'error');
			return false;
		}
	}
	
	var data=$.jRadGet({
		url:'/ycbmall-manager-ws/ws/0.1/skuCms/getSkuInfoListByIds?skuIdStr='+id,
		success:function(data){
			_form.form('close');
			$("#addGroupSku",wraper).show();
			$("#groupPurchasePrice",wraper).show();
			var managerStr='';
			var managerPrice='';
			$.each(data, function(i){
			var skuId=this.skuId;
			managerStr+='<tr style="padding:5px 0">'
					+'<td>'+skuId
					+'<input type="hidden" value="'+skuId+'" name="skuId" />'
					+'</td>' 
					+'<td><img src="'+this.smallPicUrl+'" width="50" height="50"></td>'
					+'<td>'+this.name+'</td>'
					+'<td><input type="text" class="span1" name="singleAccuLimit" value="'+this.singleAccuLimit+'"></td>'
					+'<td><input class="span1" type="text" name="sequence"></td>'
					+'<td class="deleteButton" onclick="deleteSkuId('+skuId+')">X</td>'
					+'</tr>'
			managerPrice+='<tr>'
						+'<td class="skuId">'+skuId+'</td>'
						+'<td class="1"><p>数量<input type="text" class="span1" name="startNum"/>至<input type="text" class="span1" name="endNum"/></p><p>价格<input type="text" class="span1" name="sellingPrice"/></p></td>'
						+'<td class="2"><p>数量<input type="text" class="span1" name="startNum"/>至<input type="text" class="span1" name="endNum"/></p><p>价格<input type="text" class="span1" name="sellingPrice"/></p></td>'
						+'<td class="3"><p>数量<input type="text" class="span1" name="startNum"/>至<input type="text" class="span1" name="endNum"/></p><p>价格<input type="text" class="span1" name="sellingPrice"/></p></td>'
						+'<td class="4"><p>数量<input type="text" class="span1" name="startNum"/>至<input type="text" class="span1" name="endNum"/></p><p>价格<input type="text" class="span1" name="sellingPrice"/></p></td>'
						+'<td class="5"><p>数量<input type="text" class="span1" name="startNum"/>至<input type="text" class="span1" name="endNum"/></p><p>价格<input type="text" class="span1" name="sellingPrice"/></p></td>'
						+'</tr>'
			});
			$("#addGroupSku",wraper).find("tbody").append(managerStr);
			$("#groupPurchasePrice",wraper).find("tbody").append(managerPrice);
		},error:function(xhr){
			var errormsg = eval("(" + xhr.responseText + ")"); 
      		if (errormsg != undefined) {
         		_form.form('message',errormsg[0].message,'error');
      		}
    	}
	})
}
//删除skuID  X  点击差号
function deleteSkuId(skuId){
	$("#addGroupSku tbody tr").each(function(){
		var skuIdSku=$(this).find("input[name='skuId']").val();
		if(skuId==skuIdSku){
			$(this).remove();
			return false;
		}
	})
	$(this).parent('tr').remove();
	$("#groupPurchasePrice tbody td.skuId").each(function(){
		var skuIdPrice=$(this).html();
		if(skuId==skuIdPrice){
			$(this).parent('tr').remove();
			return false;
		}
	})
}



























