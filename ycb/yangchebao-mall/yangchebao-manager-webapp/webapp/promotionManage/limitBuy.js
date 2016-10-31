$(document).ready(function(){
    var wraper = $('#Wraper_limit_bug');
    var page_column_model = new Array();
    var page_list_buttons = new Array();
	var page_search_items = new Array();
	  var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 

    //jRad.validators['name']=[{msg:'请填写商品名称',type:'min',value:'1'}];
    //jRad.validators['sukId']=[{msg:'请填写skuId',type:'min',value:'1'}];
    //jRad.validators['sequence']=[{msg:'请填写排序号',type:'min',value:'1'},{msg:'请输入数字',type:'regex',value:/^\d*$/}];

    var fields_params={};
    var _form=$('#Form_limit_bug',wraper);
    fields_params['status'] = {
      data: [{id:'1',name:'上线'},{id:'0',name:'下线'},{id:'2',name:'删除'}] 
    };
    fields_params['isImported'] = {
      data: [{id:'1',name:'是'},{id:'0',name:'否'}] 
    };

    fields_params['brandLogo'] = {
      url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
      delFunc: function(item){
         item.list.remove();
         $("input[name='picUrl']",_form).val("");
         $("input[name='middlePicUrl']",_form).val("");
         $("input[name='smallPicUrl']",_form).val("");
      },
      fileName:"file",
      note: '仅支持 JPG图片文件。图片尺寸建议500*500以上，长宽比例1:1左右，内存500k以下。',
      show: false,
      params: {type:""},
      success: function(data){ 
         if(data[0]&&data[0].code=="400"){
           $.jRadMessage({level:'error',message:data[0].message});
         }else{
         $("input[name='picUrl']",_form).val(data.fileUrl);
         $("input[name='middlePicUrl']",_form).val(data.middleUrl);
         $("input[name='smallPicUrl']",_form).val(data.smallUrl); 
         }
      },
       beforeSubmit: function(obj){
        var re = /^.*\.(jpg|JPG)$/;
        if(re.test(obj.val())){
        return true;
        }else{  
        $.jRadAlert("只能上传jpg文件", "error");
        $("div[name='brandLogo']",_form).find("input[type='file']").val('');
        return false;
        }
      },
      single: true,
      showInfo:false,
      prev:'smallUrl'
    };

    $('#Form_limit_bug').form({
      grid:10,
      validators:jRad.validators,
      fields_params:fields_params,
      fluid: true,
      autobinding:true 
    });
    page_column_model.push({display: '序号', name : 'limitedPurchasingId'}); 
	  page_column_model.push({display: '操作', name : '',width:120,diy:function($row,$div){
      $div.html('<a href="javascript:" class="edit">编辑</a>'+'&minus;'+'<a href="javascript:" class="linedown">下线</a>');

      $('a.edit',$div).unbind('click').bind('click',function(){
      	setTimeout(function(){
	        var checked = $('#Table_limit_bug').getCheckedTrs();
	        if(checked[0]){
	            var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/limitedPurchasingCms/getLimitedPurchasing?limitedPurchasingId='+checked[0].limitedPurchasingId});
	            var priceTypeData =$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/skuCms/getPriceType?skuId='+item.skuId});
                fields_params['priceType'] = {
                		data:priceTypeData
                };
	            $('#Form_limit_bug',wraper).form({
	              url:'/ycbmall-manager-ws/ws/0.1/limitedPurchasingCms/editLimitedPurchasing',
	              item:item,
	              fields_params:fields_params,
	              before_submit:function(json){
	                json.limitedPurchasingId=checked[0].limitedPurchasingId;
	                json.operator=carsmart_config.operatorName;
	                return json
	              },
	              success_callback:function(){ 
	                $('#Table_limit_bug').flexMessage('编辑成功', 'success'); 
	                $('#Table_limit_bug').flexReloadCurrentPage();
	              }
	            }).form('open');
	            var _ul = $("div[name='brandLogo']",wraper).children(".pic-show"); 
	            var src = item.smallPicUrl;
	            if(src!=undefined&&src!=""){ 
	              var _li = '<li name="" class="adPicBoxli"><div class="smallUrl-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
	                  +'<img src="'+src+'">'
	                  +'</div></div><span name="smallUrl" class="del-btn"></span></div></div></li>'
	              _ul.html(_li); 
	              $(".del-btn",wraper).click(function(){
	                var small = $(this).prev(".pic-content").find("img").attr("src");
	                  $(this).parents(".adPicBoxli").remove(); 
	                  $("input[name='picUrl']",wraper).val("");
	                  $("input[name='middlePicUrl']",wraper).val("");
	                  $("input[name='smallPicUrl']",wraper).val("");  
	              });
	            } 
	            $('#Form_limit_bug .pop-up-close',wraper).click(function(){
	            	fields_params['priceType'] = {data:[]};
	                $('#Form_limit_bug').form('close')
	            })
	        }
	        $('#Form_limit_bug div[name="skuId"]').input('readonly',true);
      	},10);
      })

      $('a.linedown',$div).unbind('click').bind('click',function(){
        var checked = $('#Table_limit_bug').getCheckedTrs();
        if(checked[0]){
            var postData={};
            postData.limitedPurchasingId=checked[0].limitedPurchasingId;
            postData.name = checked[0].name;
            postData.status=0;
            postData.operator=carsmart_config.operatorName;
            $.jRadConfirm('确认下线吗？',1,function(){
              $.jRadAjax({
                type:'post',
                data:postData,
                url:'/ycbmall-manager-ws/ws/0.1/limitedPurchasingCms/offline',
                success: function(){
                  $('#Table_limit_bug').flexMessage('下线成功!', 'success');
                  $('#Table_limit_bug').flexReload();
                },
                error:function(xhr){
                  var errormsg = eval("(" + xhr.responseText + ")"); 
                  if (errormsg != undefined) {
                    $('#Table_limit_bug').flexMessage(errormsg[0].message, 'error');
                  }
                }
              });
            });
        }
      })
    }}); 

    page_column_model.push({display: '图片', name : 'smallPicUrl',width:80,diy:function($row,$div){
        var imgUrl = $row.smallPicUrl;
        if(imgUrl!=undefined&&imgUrl!=""){
        var $img = $('<img width="50" height="50" src="'+imgUrl+'" />');
        $div.height(50);
        $div.append($img);
        }
    }});
    page_column_model.push({display: '限量购名称', name : 'name'});
    page_column_model.push({display: '开始时间', name : 'startTimeStr',sortable : true}); 
    page_column_model.push({display: '结束时间', name : 'endTimeStr',sortable : true}); 
    page_column_model.push({display: '前台排序', name : 'sequence'});
    page_column_model.push({display: '限量件数', name : 'limitNum'}); 
//  page_column_model.push({display: '剩余数量', name : 'inventoryNum'}); 
    page_column_model.push({display: '卖出数量', name : 'salesNum'});
    page_column_model.push({display: '特卖价格', name : 'priceType'}); 
    page_column_model.push({display: '介绍', name : 'introduce'}); 
    page_column_model.push({display: '状态', name : 'statusName'}); 
	
	page_search_items.push({row:'1',type:'jrad-input',display:'限量购名称',name:'name'});
	page_search_items.push({row:'1',type:'jrad-select',display:'限量购状态',name:'status',params:{
		data:[
			{id:'1',name:'上线'},
			{id:'0',name:'下线'},
			{id:'2',name:'删除'},
			{id:'',name:'全部'}
		]
	}
	});
	
    page_list_buttons.push({title:'创建',name:'Add',bclass: 'add',onpress : function(){
    		fields_params['priceType'] = {data:[]};
    		$('#Form_limit_bug div[name="priceType"]').select("destroy");
    		
            $('#Form_limit_bug').form({
              title: '创建', 
              item:{},
              validators:jRad.validators,
              fields_params:fields_params,
              url:'/ycbmall-manager-ws/ws/0.1/limitedPurchasingCms/addLimitedPurchasing',
              before_submit:function(json){
                json.operator=carsmart_config.operatorName;
                json.status=1;
                return json
              },
              success_callback:function(){ 
                $('#Table_limit_bug').flexMessage('创建成功', 'success');
                $('#Table_limit_bug').flexReloadCurrentPage();
              },
              error_callback:function(data){
                var mes = eval('('+data.responseText+')');
                $.jRadMessage({level:'error',message:mes[0].message,selector:$('#Form_limit_bug',wraper)});
              }
            }).form('open');
            $('#Form_limit_bug div[name="skuId"]').input('readonly',false);
            $('#btn',wraper).unbind('click').click(function(){
                var skuId = $("#Form_limit_bug div[name='skuId']",wraper).input('val');
                var item;
                $.ajax({
                	type:"get",
                	url:'/ycbmall-manager-ws/ws/0.1/skuCms/getLimitedPurchasingBySkuId?skuId='+skuId,
                	async:false,
                	dataType:'json',
                	success:function(data){
                		item=data;
                	}
                });
                if(skuId == ''||skuId =='undefined'){
                	$.jRadMessage({level:'error',message:'skuID不能为空',selector:$('#Form_limit_bug',wraper)});
                  //return false;
                }
                else{
                     $.ajax({
                       url:'/ycbmall-manager-ws/ws/0.1/skuCms/getLimitedPurchasingBySkuId?skuId='+skuId,
                       type:'get',
                       asnyc:false,
                       dataType:'json',
                       success:function(data){
                   			item=data;
                       },
                       error:function(data){
                          var mes = eval('('+data.responseText+')');
                            $.jRadMessage({level:'error',message:mes[0].message,selector:$('#Form_limit_bug',wraper)});
                       }
                     });
                     var priceTypeData =$.jRadGet({url:'/ycbmall-manager-ws/ws/0.1/skuCms/getPriceType?skuId='+skuId});
                     fields_params['priceType'] = {data:priceTypeData};
                     $('#Form_limit_bug').form({
                       item:item,
                       validators:jRad.validators,
                       success_callback:function(){ 
                         $('#Table_limit_bug').flexMessage('创建成功', 'success');
                         $('#Table_limit_bug').flexReloadCurrentPage();
                         $('#Form_limit_bug').form('close');
                       },
                          error_callback:function(data){
                            var mes = eval('('+data.responseText+')');
                            $.jRadMessage({level:'error',message:mes[0].message,selector:$('#Form_limit_bug',wraper)});
                          }
                     });
                   $('#Form_limit_bug .pop-up-close',wraper).click(function(){
                	   fields_params['priceType'] = {data:[]};
                	   $('#Form_limit_bug').form('close');
             	  });
                     
                }
            });
        }
    });

    page_list_buttons.push({separator: true});
    
    $('#Table_limit_bug').flexigrid({
            reload:true,
      			method:'get',
            colModel : page_column_model,
            buttons : page_list_buttons,
    		searchitems: page_search_items,
    		queryParam:{'status':'1'},
            pagination: {
      				diaplay_pages: 5,
      				align: 'bottom' 
      			},
      			showSearch:true,  
            overflow:true,
            url:'/ycbmall-manager-ws/ws/0.1/limitedPurchasingCms/queryLimitedPurchasings', 
      			onError:showError, 
      			checkBoxType:'single'
    });

	  function showError(xhr){
		  var errormsg = eval("(" + xhr.responseText + ")"); 
		  $.jRadMessage({level:'error',message:errormsg[0].message});
		}
});