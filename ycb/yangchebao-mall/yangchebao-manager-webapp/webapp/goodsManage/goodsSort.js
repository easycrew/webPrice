var basicAttrFlag=false;
var extendAttrFlag=false;
var SKUFlag=false;
var ralatedBrandFlag=false;
var skuStr='';
	skuStr+='<div id="Form_goodsSortSKU">'
		   +'<div class="jrad-form">'
		   +'<div class="grid-layout-main"><div class="row-fluid">'
		   +'<label class="span3 grid-layout-label"><span class="ui-form-required">*</span>SKU参数是否使用：</label>'
		   +'<div class="span3 grid-layout-content">'
		   +'<div name="isUsingSkuAttrs" class="jrad-select-container"></div>'
		   +'</div>'
		   +'<button class="btn btn-big btn-primary" id="submit" style="width:100px;">确定</button>'
		   +'</div></div></div></div>';
$(document).ready(function(){ 
	var wraper = $('#Wraper_goodsSort_manage');
	$(".details-tab .f-left",wraper).click(function(){
		$('.details-tab .tab-cur',wraper).removeClass('tab-cur');
		$('.tabReleForm',wraper).hide();
		$(this).addClass('tab-cur');
		var rele=$(this).attr('rele');
		$(".tabReleForm",wraper).hide(); 
		var type = $("#basicAttr-goodsSort").find("input[name='addOrUpdate']").val();
		var id = $("#basicAttr-goodsSort").find("input[name='classificationId']").val();
		if(type=='update'){
			
			if(rele=="relatedBrand" && ralatedBrandFlag==false){
				relatedBrand(id,wraper);
				ralatedBrandFlag=true
			}else if(rele=='extendAttr-goodsSort'){
				extendAttr(id,wraper)
			}else if(rele=='goodsSortSKU'){
				goodsSortSKU(id,wraper)
			}
		}else{
			if(rele=='extendAttr-goodsSort' && extendAttrFlag==false){
				if(id==''){
					$.jRadMessage({
		    			 level:'error', 
	    				 message:'请先设置基本属性' 
		    		 });
					return false
				}
				$("#extendAttr-goodsSort",wraper).html('<table id="Table_extendAttr_goodsSort"></table>');
				extendAttr(id,wraper);
				extendAttrFlag==true
			}else if(rele=='goodsSortSKU' && SKUFlag==false){
				if(id==''){
					$.jRadMessage({
		    			 level:'error', 
	    				 message:'请先设置基本属性' 
		    		 });
					return false
				}
				$("#goodsSortSKU",wraper).html(skuStr+'<table id="Table_SKU_goodsSort"></table>');
				$('#Form_goodsSortSKU',wraper).form({
					layout: 'grid', 
					fields_params:fields2,
					autobinding: false
				 });
				goodsSortSKU(id,wraper);
				SKUFlag=true
			}else if(rele=='relatedBrand' && ralatedBrandFlag==false){
				if(id==''){
					$.jRadMessage({
		    			 level:'error', 
	    				 message:'请先设置基本属性' 
		    		 });
					return false
				};
				relatedBrand(id,wraper);
				ralatedBrandFlag=true
			}
		}
		$('#'+rele,wraper).show()
	});
	// $('#saveBtn',wraper).button({
	// 	click: function(){ 
	// 		 $('#basicAttr-goodsSort .jrad-btn-primary',wraper).click(); 
	// 		 if(ralatedBrandFlag==true){
	// 		  $('#relatedBrand .jrad-btn-primary',wraper).click();
	// 		 }
	// 		 $('.details-box',wraper).slideUp();
	// 		 $('.details-box',wraper).prev('.ui-tit').hide();
	// 		 $('.jrad-table',wraper).slideDown(); 
	// 		 $(".scroll-up-btn").click();	 
	// 		 clearSortInfo(wraper);
	// 		 $('#Table_goodsSort_manage',wraper).flexReloadCurrentPage();  
			
	// 	}
	// });
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	 	
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
    var parentId=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentId?parentId=-1&level=1'});
    var parentIdArr=[];
    var parentIdArr2=[];
    $.each(parentId,function(i){
    	var json={};
    	json.id=parentId[i].classificationId;
    	json.name=parentId[i].name;
    	parentIdArr.push(json);
    	parentIdArr2.push(json)
    });
    parentIdArr.unshift({id:'',name:'--'});
    parentIdArr2.unshift({id:'',name:'全部'});
    jRad.params['parentId']={data:parentIdArr2}; 
    jRad.validators['name'] = [{"msg":"分类名不能为空","type":"min","value":"1"}]; 
	jRad.validators['sequence'] = [{"msg":"排序号不能为空","type":"min","value":"1"},{msg:'请填写正整数',type:'regex',value:/^[0-9]*[1-9][0-9]*$/}]; 
	jRad.validators['parentId'] = [{"msg":"母分类不能为空","type":"min","value":"1"}]; 
	jRad.validators['imgFile'] = [{"msg":"图片不能为空","type":"min","value":"1"}]; 
	var fields_params = {};  
	fields_params['parentId'] = {data:parentIdArr}; 
	fields_params['isShow'] = {data:[{id:'1',name:'是'},{id:'0',name:'否'}]}; 
	fields_params['status'] ={ data:[ 
		{"id":"1",name:"上线"},
		{"id":"0",name:"下线"},
		{"id":"2",name:"删除"}
	]}; 	
	fields_params['imgFile'] = { 
				url: '/ycbmall-manager-ws/ws/0.1/file/uploadThree',
				fileName: 'file', 
				delFunc: function(item) { 
					item.list.remove(); 
					$("#basicAttr-goodsSort",wraper).find("input[name='picUrl']").val("");  
					$("#basicAttr-goodsSort",wraper).find("input[name='middlePicUrl']").val("");  
				    $("#basicAttr-goodsSort",wraper).find("input[name='smallPicUrl']").val("");
				}, 
				validator : [{
					msg : "只能上传jpg文件",
					type : "regex",
					value : /^.*\.(jpg|JPG)$/
				}], 
				success: function(data){ 
					   if(data[0]&&data[0].code=="400"){
						 $.jRadMessage({level:'error',message:data[0].message});
					   }else{  
						 $("#basicAttr-goodsSort",wraper).find("input[name='picUrl']").val(data.fileUrl);  
						 $("#basicAttr-goodsSort",wraper).find("input[name='middlePicUrl']").val(data.middleUrl);  
						 $("#basicAttr-goodsSort",wraper).find("input[name='smallPicUrl']").val(data.smallUrl);
					   }  
					},
				note: '仅支持JPG图片文件。',
				show:true,
				showLarge:true, 
				prev:'smallUrl', 
				single: true 
			 
 	}; 
 	var validators={};
 	validators['name']=[{msg:'属性名不能为空',type:'min',value:'1'}];
 	validators['sequence']=[{msg:'排序不能为空',type:'min',value:'1'}];
 	var fields={};
 	fields['isShow'] = {data:[{id:'1',name:'是'},{id:'0',name:'否'}]}; 
 	fields['type'] = {data:[{id:'1',name:'单选'},{id:'2',name:'多选'},{id:'3',name:'输入'}]}; 
 	fields['isSearchCriteria'] = {data:[{id:'1',name:'是'},{id:'0',name:'否'}]}; 
 	var fields2={};
 	fields2['isUsingSkuAttrs']={data:[{id:'1',name:'是'},{id:'0',name:'否'}]};
 	$('#basicAttr-goodsSort',wraper).form({
		validators: validators,
		fields_params:fields_params,
		layout: 'grid', 
		autobinding: false
	 }); 
	$('#relatedBrand',wraper).form({
		layout: 'grid', 
		autobinding: false
	 }); 
	$('#Form_goodsSortSKU',wraper).form({
		layout: 'grid', 
		fields_params:fields2,
		autobinding: false
	 }); 
	 $('#Form_extendAttr_goodsSort',wraper).form({
		validators: validators,
		fields_params:fields,
		layout: 'popup', 
		grid:12,
		fluid: true,
		autobinding: true
	 });

	page_column_model.push({display: 'ID', name : 'classificationId'});
    page_column_model.push({display: '分类', name : 'name'});
    page_column_model.push({display: '母分类', name : 'parentName'}); 
	page_column_model.push({display: '状态', name : 'statusName'});
    
	page_search_items.push({row:'1',type:'jrad-input',display:'分类名',name:'name'});
	page_search_items.push({row:'1',type:'jrad-select',display:'母分类',name:'parentId',params:jRad.params['parentId']});   

    $('div.details-content .jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box',wraper).slideUp();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
			clearSortInfo(wraper);
		}
	});
	
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',
		onpress : function(){
			$('.details-box',wraper).prev('.ui-tit').html('<strong>新增分类</strong>').show();
			$('.jrad-table',wraper).slideUp();
			$('.details-box',wraper).slideDown();
			$(".scroll-up-btn").click();
			clearSortInfo(wraper);
        }
    });
	page_list_buttons.push({title: '编辑',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#Table_goodsSort_manage').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#Table_goodsSort_manage').getCheckedTrs(); 
            var id=checked[0].classificationId;
            if(checked[0]) {
			    updateSortView(id,wraper);
			    
            }
        }
    }); 
	 
    page_list_buttons.push({separator: true});
    
    $('#Table_goodsSort_manage').flexigrid({
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
			checkBoxType:'single',
            url:'/ycbmall-manager-ws/ws/0.1/classificationCms/queryClassifications',
			onError:showSortError,
			overflow:true
    }); 
	$(".details-tab .return",wraper).click(function(){
		$('.details-box',wraper).slideUp();
		$('.jrad-table',wraper).slideDown(); 
		$(".scroll-up-btn").click();
		clearSortInfo(wraper);
		$('#Table_goodsSort_manage').flexReloadCurrentPage(); 
	});
	function updateSortView(id,wraper){
		var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/classificationCms/getClassification?classificationId='+id});
		$('.details-box',wraper).prev('.ui-tit').html('<strong>修改分类</strong>').show(); 
		$('.jrad-table',wraper).slideUp();
		$('.details-box',wraper).slideDown();  
		$('#basicAttr-goodsSort',wraper).form({item:item});  
		$('#Form_goodsSortSKU',wraper).form({item:item});
		$(".scroll-up-btn").click();
		var _ul = $("div[name='imgFile']",wraper).children(".pic-show"); 
	    var src = $("input[name='smallPicUrl']",wraper).val();
	    if(src!=""){ 
		  var _li = '<li name="" class="sortPicBoxli"><div class="large-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
					+'<img src="'+src+'">'
					+'</div></div><span name="small" class="del-btn"></span></div></div></li>'
		  _ul.html(_li); 
		$(".sortPicBoxli .del-btn").click(function(){
				var small = $(this).prev(".pic-content").find("img").attr("src");
				$(this).parents(".sortPicBoxli").remove(); 
			   $("input[name='picUrl']",wraper).val("");
			   $("input[name='middlePicUrl']",wraper).val("");
			   $("input[name='smallPicUrl']",wraper).val("");
			   
		  });	  
		 };
		 $('#basicAttr-goodsSort input[name="addOrUpdate"]',wraper).val('update');

	};
	$('#basicAttr-goodsSort .jrad-btn-primary',wraper).button({
		click:function(){
			var flag=$('#basicAttr-goodsSort',wraper).form('validateAll');
			if(!flag){
				return false
			}
			var json=$('#basicAttr-goodsSort',wraper).form('getValue');
			json.operator=carsmart_config.operatorName;
			var addOrUpdate = json.addOrUpdate;
			delete json.addOrUpdate;
			if(addOrUpdate=='add'){
				$.jRadPost({
					url:'/ycbmall-manager-ws/ws/0.1/classificationCms/addClassification',
					data:json,
					success:function(data){
						$.jRadMessage({
			    			level:'success', 
		    				message:'保存成功！' 
			    		}); 
						$('#basicAttr-goodsSort',wraper).find("input[name='classificationId']").val(data.classificationId);
						$('#basicAttr-goodsSort input[name="addOrUpdate"]',wraper).val('update')
					},
					error:function(data){
						 var mes = eval('('+data.responseText+')');
			    		 $.jRadMessage({
			    			 level:'error', 
		    				 message:mes[0].message 
			    		 });
					}
				});
			}else{
				$.jRadPost({
					url:'/ycbmall-manager-ws/ws/0.1/classificationCms/editClassification',
					data:json,
					success:function(data){
						$.jRadMessage({
			    			level:'success', 
		    				message:'保存成功！' 
			    		})
					},
					error:function(data){
						 var mes = eval('('+data.responseText+')');
			    		 $.jRadMessage({
			    			 level:'error', 
		    				 message:mes[0].message 
			    		 });
					}
				});
			}
			
		}
	});
	$('#relatedBrand .jrad-btn-primary',wraper).button({
		click:function(){
			var postData={};
			postData.classificationId=$('#basicAttr-goodsSort',wraper).find("input[name='classificationId']").val();
			postData.operator=carsmart_config.operatorName;
			var brandIdArr=[];
			var brandIdStr='';
			$('select[name="liOptionms2side__dx[]"] option',wraper).each(function(index){
				brandIdArr.push($(this).attr('value'))
			});
			brandIdStr=brandIdArr.join(',');
			postData.brandIdStr=brandIdStr;
			$.jRadPost({
				url:'/ycbmall-manager-ws/ws/0.1/classificationCms/setClassificationBrandRel',
				data:postData,
				success:function(data){
					$.jRadMessage({
		    			level:'success', 
	    				message:'保存成功！' 
		    		})
				},
				error:function(data){
					 var mes = eval('('+data.responseText+')');
		    		 $.jRadMessage({
		    			 level:'error', 
	    				 message:mes[0].message 
		    		 });
				}
			})
		}
	});
	$('#swaitSubmit',wraper).button({
		click:function(){
			var selectCon=$.trim($('div[name="waitForSelect"]',wraper).input('val'));
			$('select[title="待选区"] option',wraper).each(function(){
				var theCon=$(this).html();
				if(selectCon==''){
					$(this).show()
				}else{
					if(theCon.indexOf(selectCon)<0){
						$(this).hide()
					}else{
						$(this).show()
					}
				}
			})
		}
	});
	$('#hasSubmit',wraper).button({
		click:function(){
			var selectCon=$.trim($('div[name="hasSelected"]',wraper).input('val'));
			$('select[title="已选区"] option',wraper).each(function(){
				var theCon=$(this).html();
				if(selectCon==''){
					$(this).show()
				}else{
					if(theCon.indexOf(selectCon)<0){
						$(this).hide()
					}else{
						$(this).show()
					}
				}
			})
		}
	});
	function relatedBrand(id,wraper){
		$('div.ms2side__div',wraper).remove();
		$('#liOption',wraper).html('');
		$('select[name="liOptionms2side__dx[]"]',wraper).html('');
		var item=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationBrandRel?classificationId='+id});
		var BrandList=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/accessoryBrandCms/getAccessoryBrandList'});
		if(item==''){
			var str='';
			$.each(BrandList,function(i){
				str+='<option value="'+BrandList[i].accessoryBrandId+'"">'+BrandList[i].name+'</option>'
			});
			$('#liOption',wraper).append(str);
			$("#liOption",wraper).multiselect2side({
			    selectedPosition: 'right',
			    moveOptions: false,
				labelsx: '待选区',
				labeldx: '已选区'
		    });
		}else{
			var str='';
			var _str='';
			var itemArr=[];
			var BrandListArr=[];
			
			$.each(item,function(i){
				var accessoryBrandId=item[i].accessoryBrandId;
				itemArr.push(accessoryBrandId);
				_str+='<option value="'+item[i].accessoryBrandId+'"">'+item[i].name+'</option>'
			});
			$.each(BrandList,function(i){
				var accessoryBrandId=BrandList[i].accessoryBrandId;
				BrandListArr.push(accessoryBrandId);
				if($.inArray(BrandListArr[i],itemArr)<0){
					str+='<option value="'+BrandList[i].accessoryBrandId+'"">'+BrandList[i].name+'</option>'
				}
			});
			$('#liOption',wraper).append(str);
			$("#liOption",wraper).multiselect2side({
			    selectedPosition: 'right',
			    moveOptions: false,
				labelsx: '待选区',
				labeldx: '已选区'
		    });
		    $('select[name="liOptionms2side__dx[]"]',wraper).append(_str)
		}
	};
	function clearSortInfo(wraper){
	   $(".details-tab .f-left:first",wraper).click();
	   $('.details-tab .tab-cur',wraper).removeClass('tab-cur');
	   $(".details-tab .f-left:first",wraper).addClass('tab-cur');
	   var _ul = $("div[name='imgFile']",wraper).children(".pic-show"); 
	   _ul.html("<ul class='pic-show'></ul>");
	   $("#basicAttr-goodsSort",wraper).form({item:{}}); 
	   $('div.ms2side__div',wraper).remove(); 
	   var BrandList=$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/accessoryBrandCms/getAccessoryBrandList'});
		var str='';
		$.each(BrandList,function(i){
			str+='<option value="'+BrandList[i].accessoryBrandId+'"">'+BrandList[i].name+'</option>'
		});
		$('#liOption',wraper).html('');
		$('#liOption',wraper).append(str);
		$("#liOption",wraper).multiselect2side({
		    selectedPosition: 'right',
		    moveOptions: false,
			labelsx: '待选区',
			labeldx: '已选区'
	    });
	    basicAttrFlag=false;
		extendAttrFlag=false;
		SKUFlag=false;
		ralatedBrandFlag=false;
	   $("#basicAttr-goodsSort",wraper).find("input[name='addOrUpdate']").val('add'); 
	   $("#extendAttr-goodsSort",wraper).html('<table id="Table_extendAttr_goodsSort"></table>');
	   $("#goodsSortSKU",wraper).html(skuStr+'<table id="Table_SKU_goodsSort"></table>');
	   $('#Form_goodsSortSKU',wraper).form({
			layout: 'grid', 
			fields_params:fields2,
			autobinding: false
		 });
	}
	function extendAttr(id,wraper){
		var page_column_model_b = new Array();
	    var page_list_buttons_b = new Array(); 

	    page_column_model_b.push({display: 'ID', name : 'extendedAttributeId'}); 
		page_column_model_b.push({display: '属性名', name : 'name'});
		page_column_model_b.push({display: '输入类型', name : 'typeName'});
		page_column_model_b.push({display: '排序', name : 'sequence'});
	    page_column_model_b.push({display: '可选值', name : 'optionNames'}); 
	    page_column_model_b.push({display: '是否显示', name : 'isShowName',diy:function(item,$div){
	    	if(item.isShow == '1'){
	    		$div.html('是')
	    	}else{
	    		$div.html('否')
	    	}
	    }});

	    var optionNames=$('#Form_extendAttr_goodsSort div.optionNames',wraper); 
	     
	    $('#Form_extendAttr_goodsSort div[name="type"]',wraper).select({
	    	onchange:function(val){
	    		if(val=='1' || val=='2'){
	    			optionNames.show()
	    		}else{
	    			optionNames.hide()
	    		}
	    	}
	    });

	    page_list_buttons_b.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){ 
				$('#Form_extendAttr_goodsSort').form({
	                title: '创建',
	                item:{},
	                url:'/ycbmall-manager-ws/ws/0.1/extAttributeCms/addExtendedAttribute', 
					before_submit:function(json){
						json.classificationId=$('#basicAttr-goodsSort input[name="classificationId"]',wraper).val();
						json.operator=carsmart_config.operatorName;
						return json
					},
					success_callback:function(){ 
	                    $('#Table_extendAttr_goodsSort').flexMessage('创建成功', 'success');
	                    $('#Table_extendAttr_goodsSort').flexReload();
	                } 
	            }).form('open');
				$('#Form_extendAttr_goodsSort div[name="optionNames"]',wraper).textarea('readonly',false);
				$('#Form_extendAttr_goodsSort div[name="type"]',wraper).select('readonly',false);
				$('#Form_extendAttr_goodsSort span#addOption',wraper).hide();
				$('#Form_extendAttr_goodsSort div.addOption',wraper).remove()
	        }
	    }); 
		
		page_list_buttons_b.push({name:'edit',bclass: 'edit',prefunc:function(){
	            var _checked = $('#Table_extendAttr_goodsSort').getCheckedTrs();
	            if (_checked.length != 1) {return false;}else{return true;}
	        },onpress : function(){
	        	var _checked=$("#Table_extendAttr_goodsSort",wraper).getCheckedTrs();
					$('#Form_extendAttr_goodsSort',wraper).form({
		                title: '编辑', 
		                url:'/ycbmall-manager-ws/ws/0.1/extAttributeCms/editExtendedAttribute', 
		                item:_checked[0],
		                before_submit:function(json){
		                	json.classificationId=_checked[0].classificationId;
		                	json.extendedAttributeId=_checked[0].extendedAttributeId;
		                	if($('#Form_extendAttr_goodsSort div[name="optionNames_add"]',wraper).length>0){
		                		json.optionNames=$('#Form_extendAttr_goodsSort div[name="optionNames"]',wraper).textarea('val')+','+$('#Form_extendAttr_goodsSort div[name="optionNames_add"]',wraper).textarea('val')
		                	}
		                	json.operator=carsmart_config.operatorName;
							return json
		                },
						success_callback:function(){ 
		                    $('#Table_extendAttr_goodsSort').flexMessage('编辑成功', 'success');
		                    $('#Table_extendAttr_goodsSort').flexReload();
		                } 
		            }).form('open');
		            $('#Form_extendAttr_goodsSort div.addOption',wraper).remove();
		            $('#Form_extendAttr_goodsSort div[name="type"]',wraper).select('readonly',true);
		            if($('#Form_extendAttr_goodsSort div[name="type"]',wraper).select('val')!=3){
		            	optionNames.show();
		            	$('#Form_extendAttr_goodsSort div[name="optionNames"]',wraper).textarea('readonly',true);
		            	$('span#addOption',optionNames).show();
		            	var addStr='';
		            	    addStr+='<div class="row addOption">'
						           +'<label class="span3 grid-layout-label"></label>'
						           +'<div class="span5 grid-layout-content fluid-wrap">'
						           +'<div class="jrad-textarea-container" name="optionNames_add"></div>'
						           +'</div>'
						           +'<span id="delOption" style="font-weight: bold;font-size: 16px;position:relative;top:3px;left:10px;cursor:pointer;">-</span>'
						           +'</div>';
				        $('span#addOption',optionNames).unbind('click').bind('click',function(){
				        	$('#Form_extendAttr_goodsSort .jrad-form',wraper).append(addStr);
				        	$('#Form_extendAttr_goodsSort div[name="optionNames_add"]',wraper).textarea(); 
				        	$('#Form_extendAttr_goodsSort div.addOption div.textarea-content',wraper).removeClass('span4');
				        	$(this).hide();
				        	$('#Form_extendAttr_goodsSort span#delOption',wraper).click(function(){
					        	$(this).parents('div.row').remove();
					        	$('span#addOption',optionNames).show()
					        })
				        })
		            }else{
		            	optionNames.hide();
		            }
			}
		});
		page_list_buttons_b.push({name:'delete',bclass: 'delete',prefunc:function(){
	            var _checked = $('#Table_extendAttr_goodsSort').getCheckedTrs();
	            if (_checked.length != 1) {return false;}else{return true;}
	        },onpress : function(){
		    	var _checked = $('#Table_extendAttr_goodsSort').getCheckedTrs();  
				$.jRadConfirm('确认删除吗？',1,function(){
					$.jRadPost({
						url:'/ycbmall-manager-ws/ws/0.1/extAttributeCms/deleteExtendedAttribute?operator='+carsmart_config.operatorName+'&extendedAttributeId='+_checked[0].extendedAttributeId,
						success:function(){
							$('#Table_extendAttr_goodsSort').flexMessage('已删除', 'success');
	                        $('#Table_extendAttr_goodsSort').flexReload();
						}
					})
				}) 
			}
		});   
	    page_list_buttons_b.push({separator: true});

	   
	    $('#Table_extendAttr_goodsSort').flexigrid({
	            reload:true,
				method:'get',
	            colModel : page_column_model_b,
	            buttons : page_list_buttons_b,
	            searchitems :[],
	            checkBoxType:'single',
	            pagination: {
					diaplay_pages: 5,
					align: 'bottom' 
				}, 
				showSearch:true,
	            url:'/ycbmall-manager-ws/ws/0.1/extAttributeCms/queryExtendedAttributes?classificationId='+id, 
	            overflow:true,
				onError:showError
	    });
		function showError(xhr){
		  var errormsg = eval("(" + xhr.responseText + ")"); 
		  $.jRadMessage({level:'error',message:errormsg[0].message});
		} 
	}; 
	function goodsSortSKU(id,wraper){
	    var page_column_model_c = new Array();
	    var page_list_buttons_c = new Array();
	    var validators3={};
	 	validators3['name']=[{msg:'参数名不能为空',type:'min',value:'1'}];
	 	validators3['optionNames']=[{msg:'可选值不能为空',type:'min',value:'1'}];
	 	validators3['sequence']=[{msg:'排序号不能为空',type:'min',value:'1'},{msg:'请填写正整数',type:'regex',value:/^[0-9]*[1-9][0-9]*$/}];

	 	$('#Form_SKU_goodsSorts',wraper).form({
			validators: validators3,
			layout: 'popup', 
			fluid: true,
			autobinding: true
		 });

		page_column_model_c.push({display: 'ID', name : 'skuParamId'}); 
		page_column_model_c.push({display: '参数名', name : 'name'});
	    page_column_model_c.push({display: '可选值', name : 'optionNames'}); 
	    page_column_model_c.push({display: '排序', name : 'sequence'});

	    var _optionNames=$('#Form_SKU_goodsSorts div.optionNames',wraper);
	    page_list_buttons_c.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){ 
				$('#Form_SKU_goodsSorts').form({
	                title: '创建',
	                item:{},
	                url:'/ycbmall-manager-ws/ws/0.1/skuParamCms/addSkuParam', 
					before_submit:function(json){
						json.classificationId=$('#basicAttr-goodsSort input[name="classificationId"]',wraper).val();
						json.operator=carsmart_config.operatorName;
						return json
					},
					success_callback:function(){ 
	                    $('#Table_SKU_goodsSort').flexMessage('创建成功', 'success');
	                    $('#Table_SKU_goodsSort').flexReload();
	                } 
	            }).form('open');
				$('#Form_SKU_goodsSorts div[name="optionNames"]',wraper).textarea('readonly',false);
				$('#Form_SKU_goodsSorts span#_addOption',wraper).hide();
				$('#Form_SKU_goodsSorts div._addOption',wraper).remove()
	        }
	    }); 
		
		page_list_buttons_c.push({name:'edit',bclass: 'edit',prefunc:function(){
	            var _checked = $('#Table_SKU_goodsSort').getCheckedTrs();
	            if (_checked.length != 1) {return false;}else{return true;}
	        },onpress : function(){
	        	var _checked=$("#Table_SKU_goodsSort",wraper).getCheckedTrs();
					$('#Form_SKU_goodsSorts').form({
		                title: '编辑', 
		                url:'/ycbmall-manager-ws/ws/0.1/skuParamCms/editSkuParam', 
		                item:_checked[0],
		                before_submit:function(json){
		                	json.classificationId=_checked[0].classificationId;
		                	json.skuParamId=_checked[0].skuParamId;
		                	if($('#Form_SKU_goodsSorts div[name="optionNames_add"]',wraper).length>0){
		                		json.optionNames=$('#Form_SKU_goodsSorts div[name="optionNames"]',wraper).textarea('val')+','+$('#Form_SKU_goodsSorts div[name="optionNames_add"]',wraper).textarea('val')
		                	}
		                	json.operator=carsmart_config.operatorName;
							return json
		                },
						success_callback:function(){ 
		                    $('#Table_SKU_goodsSort').flexMessage('编辑成功', 'success');
		                    $('#Table_SKU_goodsSort').flexReload();
		                } 
		            }).form('open')
					$('#Form_SKU_goodsSorts div._addOption',wraper).remove();
	            	$('#Form_SKU_goodsSorts div[name="optionNames"]',wraper).textarea('readonly',true);
	            	$('span#_addOption',_optionNames).show();
	            	var addStr='';
	            	    addStr+='<div class="row _addOption">'
					           +'<label class="span3 grid-layout-label"></label>'
					           +'<div class="span5 grid-layout-content fluid-wrap">'
					           +'<div class="jrad-textarea-container" name="optionNames_add"></div>'
					           +'</div>'
					           +'<span id="_delOption" style="font-weight: bold;font-size: 16px;position:relative;top:3px;left:10px;cursor:pointer;">-</span>'
					           +'</div>';
			        $('span#_addOption',_optionNames).unbind('click').bind('click',function(){
			        	$('#Form_SKU_goodsSorts .jrad-form',wraper).append(addStr);
			        	$('#Form_SKU_goodsSorts div[name="optionNames_add"]',wraper).textarea();
			        	$('#Form_SKU_goodsSorts div._addOption div.textarea-content',wraper).removeClass('span4');
			        	$(this).hide();
			        	$('#Form_SKU_goodsSorts span#_delOption',wraper).click(function(){
				        	$(this).parents('div.row').remove();
				        	$('span#_addOption',_optionNames).show()
				        })
			        })
			}
		});
		page_list_buttons_c.push({name:'delete',bclass: 'delete',prefunc:function(){
	            var _checked = $('#Table_SKU_goodsSort').getCheckedTrs();
	            if (_checked.length != 1) {return false;}else{return true;}
	        },onpress : function(){
		    	var _checked = $('#Table_SKU_goodsSort').getCheckedTrs(); 
				$.jRadConfirm('确认删除吗？',1,function(){
					$.jRadPost({
						url:'/ycbmall-manager-ws/ws/0.1/skuParamCms/deleteSkuParam?operator='+carsmart_config.operatorName+'&skuParamId='+_checked[0].skuParamId,
						success:function(){
							$('#Table_SKU_goodsSort').flexMessage('已删除', 'success');
	                        $('#Table_SKU_goodsSort').flexReload();
						}
					})
				}) 
			}
		});   
	    page_list_buttons_c.push({separator: true});
	    
	    $('#Form_goodsSortSKU #submit',wraper).click(function(){
	    	var json=$('#Form_goodsSortSKU').form('getValue');
	    	json.classificationId=$('#basicAttr-goodsSort input[name="classificationId"]',wraper).val();
	    	json.operator=carsmart_config.operatorName;
	    	$.jRadPost({
	    		url:'/ycbmall-manager-ws/ws/0.1/classificationCms/setClassificationSwitch',
	    		data:json,
	    		success:function(data){
					$.jRadMessage({
		    			level:'success', 
	    				message:'设置成功！' 
		    		})
				},
				error:function(data){
					 var mes = eval('('+data.responseText+')');
		    		 $.jRadMessage({
		    			 level:'error', 
	    				 message:mes[0].message 
		    		 });
				}
	    	})
	    });
	    $('#Table_SKU_goodsSort').flexigrid({
	            reload:true,
				method:'get',
	            colModel : page_column_model_c,
	            buttons : page_list_buttons_c,
	            searchitems :[],
	            checkBoxType:'single',
	            pagination: {
					diaplay_pages: 5,
					align: 'bottom' 
				}, 
				showSearch:true,
	            url:'/ycbmall-manager-ws/ws/0.1/skuParamCms/querySkuParams?classificationId='+id, 
	            overflow:true,
				onError:showError
	    });
		function showError(xhr){
		  var errormsg = eval("(" + xhr.responseText + ")"); 
		  $.jRadMessage({level:'error',message:errormsg[0].message});
		} 
	}
	
}); 

function showSortError(xhr){
  var errormsg = eval("(" + xhr.responseText + ")");
  var cDiv = $("#Wraper_goodsSort_manage .cDiv");
  $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
}

