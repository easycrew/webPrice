$(document).ready(function(){
    $(".all-work-info").click(function(){
        var menuId = $("#tabs").attr("menuId")
        var data = $.jRadGet({url:'/shopmanage-ws/ws/0.1/remark/getMenuRemark?menuId='+menuId})
        $("#Form_explain_eg91").form({
            title:'页面说明',
            item:data,
            url:'/shopmanage-ws/ws/0.1/remark/updateMenuRemark',
            before_submit:function(json){ 
                json.operator = carsmart_config.operatorName;
                json.menuName = $("#tabs").attr("menuName");
                json.menuId = $("#tabs").attr("menuId");
                return json;
            },
            success_callback:function(){ 
                $('#Table_user').flexMessage('设置成功', 'success');
                $('#Table_user').flexReloadCurrentPage();
            }
        }).form('open')
        $("#Form_explain_eg91 .textarea-content").removeClass("span4").addClass("span12")
    })
	var pathJson = $.jRadGet({url:'/shopmanage-ws/ws/0.1/file/downFileDemo?type=2'});  
	
    var wraper = $('#Wraper_system_message');
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
	 	
	var entityModel = {};
    var jRad = $.jRad({app:'radsample-ws',entityModel:entityModel}); 
    jRad.validators['shopid'] = [{msg:"商家id只能是数字",type:'regex',value:/^\d+$/}];
    jRad.validators['title'] = [{"msg":"标题不能为空","type":"min","value":"1"},{"msg":"标题超长","type":"max","value":"128"}];
	jRad.validators['remarks'] = [{"msg":"内容不能为空","type":"min","value":"1"},{"msg":"内容超长","type":"max","value":"2000"}];
	jRad.validators['sendDate'] = [{"msg":"发送时间不能为空","type":"min","value":"1"}];
	jRad.validators['users'] = [{msg:"只能上传txt文件",type:'regex',value:/^.*\.txt$/}];
	jRad.validators['startVersion'] = [{msg:"格式不正确",type:'regex',value:/^\d+(\.\d{1,2})*$/}];
	jRad.validators['endVersion'] = [{msg:"格式不正确",type:'regex',value:/^\d+(\.\d{1,2})*$/}];
	jRad.validators['usersId'] = [{msg:"格式不正确",type:'regex',value:/^\d+(,\d+)*$/}];
	// jRad.validators['pushContent'] = [{msg:"push内容不得超过35字",type:'max',value:'35'}];
	jRad.params['provinceCodeSearch'] = {
			urlData:{
				url:'/shopmanage-ws/ws/0.1/userInfoCms/provinceAll'
			},
			unshiftData: {id:'',name:'请选择'},
			onchange: function(){
				var provinceCode = $('.searchContent div[name=provinceId]',wraper).select('val'); 
				if(provinceCode==''){ 
					$('.searchContent div[name=areaCodeId]',wraper).select({
																	urlData:{url:''},
																	data:[{id:'',name:'请选择'}],
																	val:''});
				}else{	
				$('.searchContent div[name=areaCodeId]',wraper).select({
				urlData:{
					url:'/shopmanage-ws/ws/0.1/userInfoCms/municipalities?provinceId=' + provinceCode
				},
				unshiftData: {id:'',name:'请选择'},
				}).select('val','');
				}
			}
		}; 
		jRad.params['areaCodeSearchId'] = {
				data: [{id:'',name:'请选择'}]
			};
		
	
	
	var fields_params = {}; 
	fields_params['title'] = {grid: 9};
	fields_params['url'] = {grid: 9};
	fields_params['remarks'] = {grid: 9};   
//	fields_params['pushPage'] = {grid: 9};  
	fields_params['messageUrl'] = {grid: 9};  
	//{"id":"0",name:"商家消息"},先去掉，后期听产品再说
	fields_params['infoType'] ={data:[{"id":"1",name:"运营消息"},{"id":"2",name:"通知消息"}]};
	fields_params['messageLevel'] = { data:[{"id":"0",name:"否"},{"id":"1",name:"是"}]};      
	fields_params['status'] = {data:[{"id":"0",name:"发送"},{"id":"1",name:"保存"}]};   
	fields_params['iosPushStatus'] = { data:[{"id":"0",name:"否"},{"id":"1",name:"是"}]};   
	fields_params['iosMsgStatus'] = { data:[{"id":"0",name:"否"},{"id":"1",name:"是"}]};   
	fields_params['androidPushStatus'] = { data:[{"id":"0",name:"否"},{"id":"1",name:"是"}]};   
	fields_params['androidMsgStatus'] = { data:[{"id":"0",name:"否"},{"id":"1",name:"是"}]};
	fields_params['pushJumpType'] = {
			urlData:{
				url:'/shopmanage-ws/ws/0.1/datadictionary/dictionarylist?type=push_jump_type' 
			},
			onchange: function(){
				var pushJumpType = $('#Form_system_message div[name=pushJumpType]',wraper).select('val');
				$("#Form_system_message .jumpTypeShow",wraper).remove();
				switch (pushJumpType) {
				//网页页面
				case 'u':
					var row = '<div class="row-fluid jumpTypeShow">'
						+'<label class="span3 grid-layout-label">活动URL：</label>'
						+'<div class="span5 grid-layout-content">'
						+'<div name="pushPage" class="jrad-input-container"></div>'
						+'</div>'
						+'</div>';
					$("#Form_system_message div[name='pushJumpType']",wraper).parents(".row-fluid").after(row); 
					$("#Form_system_message div[name='pushPage']",wraper).input();
					break;
				//商家详情
				case 'n':
					var row = '<div class="row-fluid jumpTypeShow">'
						+'<label class="span3 grid-layout-label">商家ID：</label>'
						+'<div class="span5 grid-layout-content">'
						+'<div name="shopid" class="jrad-input-container"></div>'
						+'<p class="ui-note">如不知道商家ID，请在商家管理界面选择商家并通过“系统消息-快捷”功能为商家添加系统消息</p>'
						+'<p class="nameTips"></p>'
						+'</div>'
						+'</div>';
					$("#Form_system_message div[name='pushJumpType']",wraper).parents(".row-fluid").after(row);
					$("#Form_system_message div[name='shopid']",wraper).input();
					break;
				//服务详情
				case 'i':
					var row = '<div class="row-fluid jumpTypeShow">'
						+'<label class="span3 grid-layout-label">商家ID：</label>'
						+'<div class="span5 grid-layout-content">'
						+'<div name="shopid" class="jrad-input-container"></div>'
						+'<p class="ui-note">如不知道商家ID，请在商家管理界面选择商家并通过“系统消息-快捷”功能为商家添加系统消息</p>'
						+'<p class="nameTips"></p>'
						+'</div>'
						+'<label class="span3 grid-layout-label">商家服务绑定ID：</label>'
						+'<div class="span5 grid-layout-content">'
						+'<div name="busiServiceRelId" class="jrad-input-container"></div>'
						+'</div>'
						+'</div>';
					$("#Form_system_message div[name='pushJumpType']",wraper).parents(".row-fluid").after(row);
					$("#Form_system_message div[name='shopid']",wraper).input();
					$("#Form_system_message div[name='busiServiceRelId']",wraper).input();
					break;
				//套餐详情
				case 'p':
					var row = '<div class="row-fluid jumpTypeShow">'
						+'<label class="span3 grid-layout-label">商家ID：</label>'
						+'<div class="span5 grid-layout-content">'
						+'<div name="shopid" class="jrad-input-container"></div>'
						+'<p class="ui-note">如不知道商家ID，请在商家管理界面选择商家并通过“系统消息-快捷”功能为商家添加系统消息</p>'
						+'<p class="nameTips"></p>'
						+'</div>'
						+'<label class="span3 grid-layout-label">商家套餐绑定ID：</label>'
						+'<div class="span5 grid-layout-content">'
						+'<div name="busiDinnerRelId" class="jrad-input-container"></div>'
						+'</div>'
						+'</div>';
					$("#Form_system_message div[name='pushJumpType']",wraper).parents(".row-fluid").after(row);
					$("#Form_system_message div[name='shopid']",wraper).input();
					$("#Form_system_message div[name='busiDinnerRelId']",wraper).input();
					break;
				default:
					
					break;
				}
				getNameTips();
			}
		}
	fields_params['users'] = {
		url:'/shopmanage-ws/ws/0.1/messages',
        autocomplete:false,
		success: function(data) {   
			if (data != undefined&&data[0]!=undefined&&data[0].message!="") {
				$.jRadAlert(data[0].message,"error");  
			}else{
				$('.details-box',wraper).slideUp();
				$('.jrad-table',wraper).slideDown();  
				$(".scroll-up-btn",wraper).click();
				$('#Table_system_message').flexMessage('创建成功', 'success');
				$('#Table_system_message').flexReload();
			} 
		}
	};
	fields_params['sendDate'] = {
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	}; 
    page_column_model.push({display: '消息标题', name : 'title',  sortable : true,diy:function(item,$div){
	   var json = $.toJSON(item);
	   $div.html("<a class='messageLink' data-item='"+json+"' title='"+item.title+"'>"+item.title+"</a>");
	}});
    page_column_model.push({display: '商家简称', name : 'businessRegName',  sortable : true});
    page_column_model.push({display: '类型', name : 'infoTypeDesc'});
	page_column_model.push({display: '发送时间', name : 'sendDate',  sortable : true});
    page_column_model.push({display: 'IOS_PUSH', name : 'iosPushStatusDesc'});
    page_column_model.push({display: '安卓PUSH', name : 'androidPushStatusDesc'});
    page_column_model.push({display: 'IOS消息', name : 'iosMsgStatusDesc'});
    page_column_model.push({display: '安卓消息', name : 'androidMsgStatusDesc'}); 
	page_column_model.push({display: '创建时间', name : 'created',  sortable : true});
	page_column_model.push({display: '开始版本', name : 'startVersion'});
	page_column_model.push({display: '结束版本', name : 'endVersion'});
	page_column_model.push({display: '重要消息', name : 'messageLevel',datasource:[{id:'0',name:'否'},{id:'1',name:'是'}]});
	page_column_model.push({display: '推送区域', name : 'regionName'});
	page_column_model.push({display: '状态', name : 'status',  sortable : true, datasource:fields_params['status'].data});
    
    page_search_items.push({row:'1',type:'jrad-select',display:'类型',name:'infoType',params:{
	  data:[
	    {"id":"",name:"全部"},
//	    {"id":"0",name:"商家消息"},
		{"id":"1",name:"运营消息"},
		{"id":"2",name:"通知消息"}
	  ]
	}}); 
	page_search_items.push({row:'1',type:'jrad-input',display:'商家简称',name:'businessRegName'}); 
	page_search_items.push({row:'1',type:'jrad-input',display:'消息标题',name:'title'}); 
	
	page_search_items.push({row:'2',type:'jrad-select',display:'IOS系统PUSH',name:'iosPushStatus',params:{
	  data:[
	    {"id":"",name:"全部"},
	    {"id":"0",name:"否"},
		{"id":"1",name:"是"}
	  ]
	}}); 
	
	page_search_items.push({row:'2',type:'jrad-select',display:'IOS系统消息',name:'iosMsgStatus',params:{
	  data:[
	    {"id":"",name:"全部"},
	    {"id":"0",name:"否"},
		{"id":"1",name:"是"}
	  ]
	}}); 
	page_search_items.push({row:'2',type:'jrad-select',display:'状态',name:'status',params:{
	  data:[
	    {"id":"",name:"全部"},
	    {"id":"0",name:"发送"},
		{"id":"1",name:"保存"}
	  ]
	}});
	page_search_items.push({row:'3',type:'jrad-select',display:'安卓系统PUSH',name:'androidPushStatus',params:{
	  data:[
	    {"id":"",name:"全部"},
	    {"id":"0",name:"否"},
		{"id":"1",name:"是"}
	  ]
	}}); 
	page_search_items.push({row:'3',type:'jrad-select',display:'安卓系统消息',name:'androidMsgStatus',params:{
	  data:[
	    {"id":"",name:"全部"},
	    {"id":"0",name:"否"},
		{"id":"1",name:"是"}
	  ]
	}});  
	page_search_items.push({row:'3',type:'jrad-select',display:'省',name:'provinceId',params:jRad.params['provinceCodeSearch']});  
	
	//var startId = 'jrad-birthday'+$.jRandomChar(13);,params:{id:startId,maxId: endId}
	//var endId = 'jrad-birthday'+$.jRandomChar(13);,params:{id:endId,minId: startId}
	page_search_items.push({row:'4',type:'jrad-dateinput',display:'发送开始时间',name:'sendStartDate',params:{
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	}});
	page_search_items.push({row:'4',type:'jrad-dateinput',display:'发送结束时间',name:'sendEndDate',params:{
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	}});
	page_search_items.push({row:'4',type:'jrad-select',display:'市',name:'areaCodeId',params:jRad.params['areaCodeSearchId']});
	
    page_search_items.push({row:'5',type:'jrad-dateinput',display:'创建开始时间',name:'createStartDate',params:{
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	}});
	page_search_items.push({row:'5',type:'jrad-dateinput',display:'创建结束时间',name:'createEndDate',params:{
			grid:4,
	    	dateFmt:'yyyy-MM-dd HH:mm:ss',
	}});
	page_search_items.push({row:'5',type:'jrad-select',display:'重要信息',name:'messageLevel',params:{
		  data:[
		    {"id":"",name:"请选择"},
		    {"id":"0",name:"否"},
			{"id":"1",name:"是"}
		  ]
	}});
	
    $('#Form_system_message').form({
        validators: jRad.validators,
        fields_params: fields_params,
		layout: 'grid', 
		autobinding: false 
    });
	
	var readonlyFields2 = {};
	readonlyFields2['users'] = false; 
	readonlyFields2['usersId'] = false;
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
			initMessageInfo(wraper);
			$('#Form_system_message').form({
        		validators: jRad.validators,
            	fields_params: fields_params,
            	item:{"iosPushStatus":"0","iosMsgStatus":"0","androidPushStatus":"0","androidMsgStatus":"0","infoType":"0","status":"0","messageLevel":"0"}, 
            	readonlyFields: readonlyFields2
        	});
			$(".details-box .details-tab",wraper).find("span[name='title']").html("系统信息管理添加");
		 	$('.jrad-table',wraper).slideUp();
		 	$('.details-box',wraper).slideDown();
		 	$(".scroll-up-btn",wraper).click();
			$("#Form_system_message span[name='pushLen']").html('0');

            var myDate=new Date();
            var month=myDate.getMonth()+1;
            $('#Form_system_message div[name="sendDate"]').dateinput('val',myDate.getFullYear()+'-'+month+'-'+myDate.getDate()+' '+myDate.getHours()+':'+myDate.getMinutes()+':'+myDate.getSeconds());
			$("#Form_system_message .nameTips").html("");
			$('#Form_system_message div[name="startVersion"]').input('val','0.0.0');
			$('#Form_system_message div[name="endVersion"]').input('val','99.99.99');
			$('#Form_system_message #download').show();
            $('#Form_system_message div[name="usersId"] textarea').focusout(function(){
            	if($(this).val()!=''){
            		$('#Form_system_message div[name="users"]').upload('readonly',true);
            		$('#Form_system_message #download').hide()
            	}else{
            		$('#Form_system_message div[name="users"]').upload('readonly',false);
            		$('#Form_system_message #download').show()
            	}
            });
            $('#Form_system_message div[name="users"]').focusout(function(){
            	if($(this).upload('val')!=''){
            		$('#Form_system_message div[name="usersId"]').textarea('readonly',true);
            		$('.icon-font-remove').click(function(){
            			$('#Form_system_message div[name="usersId"]').textarea('readonly',false)
            		})
            	}else{
            		$('#Form_system_message div[name="usersId"]').textarea('readonly',false)
            	}
            });
//			getNameTips();
			msgEvent();
        }
    });
	var readonlyFields = {};
	readonlyFields['users'] = true; 
	readonlyFields['usersId'] = true;
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#Table_system_message').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#Table_system_message').getCheckedTrs(); 
            if(checked[0]) {
			     var messageId = checked[0].messageId; 
                 updateMessageView(messageId,wraper,fields_params); 
            }
        }
    }); 
  
	page_list_buttons.push({name:'delete',bclass: 'delete',prefunc:function(){
            var checked = $('#Table_system_message').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
	    	var checked = $('#Table_system_message').getCheckedTrs();
			$.jRadConfirm('确认删除吗？',1,function(){
				var id =  checked[0].messageId; 
				$.jRadAjax({
				    type:'delete',
					url:'/shopmanage-ws/ws/0.1/messages/'+id, 
					success: function(){
						$('#Table_system_message').flexMessage('删除成功!', 'success');
           	    		$('#Table_system_message').flexReload();
					},
					error:function(xhr){
					    var errormsg = eval("(" + xhr.responseText + ")"); 
						if (errormsg != undefined) {
							$('#Table_system_message').flexMessage(errormsg[0].message, 'error');
						}
					}
				});
			});
		}
	});
    page_list_buttons.push({separator: true});
    
    $('#Table_system_message').flexigrid({
            reload:true,
			method:'get',
            colModel : page_column_model,
            buttons : page_list_buttons,
            searchitems :page_search_items,
            showBtnText:true,
            pagination: {
				diaplay_pages: 5,
				align: 'bottom' 
			},
			showSearch:true,
            url:'/shopmanage-ws/ws/0.1/messages',
			onError:showMessageError,
			overflow:true
    }); 
    $('#Form_system_message .jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box',wraper).slideUp();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn",wraper).click();
		}
	});  
    
	$('#Form_system_message .jrad-btn-primary',wraper).button({
		click: function(){
			var _form = $("#Form_system_message",wraper);
			var flag = $('#Form_system_message',wraper).form('validateAll');
			var json = $('#Form_system_message',wraper).form('getValue'); 
//			   if(json.infoType==0&&json.busiId==""){
//			        $("div[name='busiId']",_form).parent().find(".ui-field-msg").html("商家ID不能为空");
//					$("div[name='busiId']",_form).parent().children(".ui-field-error").css('display','inline-block');
//					return false;
//			   }
				if(!flag) {
					   return;
					}
			   if($(".nameTips",_form).html()=="查询商家不存在！"){
			      return false;
			   }
			   
			    json.regions = []; 

				var regions = $("div[name='regions']",wraper).data("areaList");
				if(regions.length==0){
				 	$.jRadMessage({level:'error',message:"请选择要绑定的地域。"});
				 	return;
				}else{
					$.each(regions,function(){
					  	var region = {};
					  	region.provinceId = this.provinceId+""; 
					  	var areaCodeId = [];
					  	var areaList = this.areaList;
					  	for(var i=0;i<areaList.length;i++){
					  		areaCodeId.push(areaList[i].areaCodeId);
					  	}
					  	region.areaCodeId = areaCodeId.join(",");
					  	json.regions.push(region);
					});
				}

				if($(".over .areaSpan").length > 0){
					$(".over .areaSpan").each(function(i){
						var region = {}
						region.provinceId = $(this).parent().attr("provinceid");
						region.areaCodeId = $(this).attr("id")
						json.regions.push(region);
					})
					json.regions.shift();
				}
				
				json.regions=JSON.stringify(json.regions);
				var pushJumpType = $('#Form_system_message div[name=pushJumpType]',wraper).select('val');
				switch (pushJumpType) {
				//网页页面
				case 'u':
					json.pushPage=$("#Form_system_message div[name='pushPage']",wraper).input('val');
					break;
				//商家详情
				case 'n':
					json.shopid=$("#Form_system_message div[name='shopid']",wraper).input('val');
					break;
				//服务详情
				case 'i':
					json.shopid=$("#Form_system_message div[name='shopid']",wraper).input('val');
					json.busiServiceRelId=$("#Form_system_message div[name='busiServiceRelId']",wraper).input('val');
					break;
				//套餐详情
				case 'p':
					json.shopid=$("#Form_system_message div[name='shopid']",wraper).input('val');
					json.busiDinnerRelId=$("#Form_system_message div[name='busiDinnerRelId']",wraper).input('val');
					break;
				default:					
					break;
				}
			   delete json.users;
			if($(".details-box .details-tab",wraper).find("span[name='title']").html()=="系统信息管理添加"){
				   $('div[name=users]',wraper).upload({
						params: json,
						error:function(data){
							var mes = eval('('+data.responseText+')');
			    			$.jRadMessage({
				    			 level:'error', 
			    				 message:mes[0].message 
				    		 });
						}
				   }).upload('upload'); 
		 }else{
			$.jRadPost({
				    	url:'/shopmanage-ws/ws/0.1/messages/'+json.messageId,
				    	data:json,
				    	success:function(){
				    		$('.details-box',wraper).slideUp();
							$('.jrad-table',wraper).slideDown();  
							$(".scroll-up-btn",wraper).click();
							$('#Table_system_message',wraper).flexMessage('修改成功', 'success');
							$('#Table_system_message',wraper).flexReload();
				    	},error:function(data){
				    		var mes = eval('('+data.responseText+')');
				    			$.jRadMessage({
					    			 level:'error', 
				    				 message:mes[0].message 
					    		 })
				    	}
				    });
		 		}
			}	 
	}); 
	
	
	//地区选择
    var area_fields_params = {};	
	area_fields_params['provinceId'] = {
		urlData:{
			url:'/shopmanage-ws/ws/0.1/userInfoCms/provinceAll' 
		},
		unshiftData: {id:'0',name:'全部'},
		onchange: function(){
			var provinceCode = $('#Form_area div[name=provinceId]',wraper).select('val');
			if(provinceCode=='0'){
				$('#Form_area div[name=areaCodeId]',wraper).select({data:[{id:'0',name:'全部'}]});
			}else{
				$('#Form_area div[name=areaCodeId]',wraper).select("val","0");
				$('#Form_area div[name=areaCodeId]',wraper).select({
					urlData:{
						url: '/shopmanage-ws/ws/0.1/userInfoCms/municipalities?provinceId=' + provinceCode 
					},
					unshiftData: {id:'0',name:'全部'}
				});
			}
		}
	}
	area_fields_params['areaCodeId'] = {
		data: [{id:'0',name:'全部'}]
	};

	$('#Form_area',wraper).form({
        title:"地区", 
		fields_params:area_fields_params,
		item:{"provinceId":"0","areaCodeId":"0"},
		submit:function(){  
			var json = {};
			json.provinceId = $("#Form_area div[name='provinceId']",wraper).select('val');
			json.provinceName = $("#Form_area div[name='provinceId']",wraper).select('text');
			json.areaList = [];
			json.areaList[0] = {};
			json.areaList[0].areaCodeId = $("#Form_area div[name='areaCodeId']",wraper).select('val');
			json.areaList[0].areaCodeName = $("#Form_area div[name='areaCodeId']",wraper).select('text');  
			var array = $("div[name='regions']",wraper).data("areaList");
			var pId = json.provinceId; 
			var aId = json.areaList[0].areaCodeId;
			if(pId=="0"){
				array = []; 
				array.push(json);
			}else{
			    if(array.length==1&&array[0].provinceId=="0"){
					array = []; 
					array.push(json);
				}else{
					var flag = true;
					$.each(array,function(){
						if(this.provinceId == pId){
						  	flag = false;
						  	var areaList = this.areaList;
						  	if(aId=="0"){
								this.areaList = json.areaList;
						  	}else{ 
								var areaflag = true;
								for(var i=0;i<areaList.length;i++){
									if(areaList[i].areaCodeId==0){
										areaflag = false;
										this.areaList = json.areaList;
										break;
									}
									if(areaList[i].areaCodeId==aId){ 
										areaflag = false;
										$.jRadMessage({level:'error',message:"该地区已经选择",selector:$("#Form_area",wraper)});
										return;
									}
								}
								if(areaflag){
									this.areaList.push(json.areaList[0]);
								}
							}
						}
					});
					if(flag){  
					  array.push(json);
					}  
				}
			}
			addAreaList(array,wraper); 

			var _allSpan_ads = $('<span class="ycbOpen_ads" style="margin:6px 10px;display:inline-block;cursor:pointer;">展开全部城市(用于地区返选)</span>')

			if($(".areaSpan",wraper).html().substring(0,2) == "全部"){
				$(".brand_ads",wraper).append(_allSpan_ads)
			}

			$(".ycbOpen_ads",wraper).click(function(){
				$(".brand_ads div",wraper).eq(0).hide();
				$(".ycbOpen_ads",wraper).hide();
				var arrproid = [];
				var arrarea = [];
				var postdata = $.jRadGet({url:'/shopmanage-ws/ws/0.1/userInfoCms/provinceAll'})
				$.each(postdata,function(i){
					var item = postdata[i];
					arrproid.push(item.id);
					arrarea.push(item.name);
				})
				$.each(arrproid,function(i){
					var areaArr = $.jRadGet({url:'/shopmanage-ws/ws/0.1/userInfoCms/municipalities?provinceId='+arrproid[i]})
					var areaid = [];
					var _da1 = $("<div style='overflow:hidden;position:relative;padding-left:140px;' class='over' areaName='"+arrarea[i]+"' provinceId='"+arrproid[i]+"'><div class='sheng'>"+arrarea[i]+"<span class='delspan delArea3' style='float:none;'>X</span></div></div>");
					//var proArea = $('<div class="sheng"></div>')
					$.each(areaArr,function(k){
						var item = areaArr[k];
						var _ycbdiv = $('<div id="'+item.id+'" name="'+item.name+'" class="areaSpan">'+item.name+'<span class="delspan delArea2" title="移除">X</span></div>')
						$(".brand_ads",wraper).append(_da1.append(_ycbdiv))
					})
				})
				$(".delArea2",wraper).click(function(){
					$(this).parent('.areaSpan').remove();
				})
				$(".delArea3",wraper).click(function(){
					$(this).parent().parent().remove();
				})
			})
			$("div[name='regions']",wraper).data("areaList",array);
			// $("#Form_area div[name='areaCodeId']",wraper).select('destroy');
			$("#Form_area",wraper).form("close");
		}
	});

	$("#jrad-button-area",wraper).button({
		click : function() {  
			$('#Form_area',wraper).form({ 
				fields_params:area_fields_params,
				item:{"provinceId":"0","areaCodeId":"0"},
			}).form('open');
		}
	});
	
	//删除地区
	$("#area_check_string .delArea",wraper).live('click',function(){
		$(".ycbOpen_ads",wraper).hide();
		var info = $(this).data('info'); 
		var arr = $("div[name='regions']",wraper).data("areaList");
		$.each(arr,function(i){
			var json = this;
			if(json.provinceId==info.provinceId){
				if(info.areaId=="0"){
					arr.splice(i,1);
				}else if(json.areaList.length==1){
					arr.splice(i,1);
				}else{
					$.each(json.areaList,function(j){
						var area = this;
						if(area.areaCodeId==info.areaId){ 
							json.areaList.splice(j,1); 
						}
					});
				}
			}
		}); 
		$(this).parent('.areaSpan').remove();
	});

	$(".details-tab .return",wraper).click(function(){
		$('.details-box',wraper).slideUp();
		$('.jrad-table',wraper).slideDown(); 
		$(".scroll-up-btn").click();
	}); 
	
	if($(document).data('messageShopId')!=undefined&$(document).data('messageShopId')!=''){
		 var id =  $(document).data('messageShopId');
		 $('#Form_system_message').form({
                validators: jRad.validators,
                fields_params: fields_params,
                item:{'busiId':id}, 
				readonlyFields: readonlyFields2
            });
		 $(".details-box .details-tab",wraper).find("span[name='title']").html("系统信息管理添加");
		 $('.jrad-table',wraper).slideUp();
		 $('.details-box',wraper).slideDown();
		 $(".scroll-up-btn",wraper).click();
		 msgEvent();		 
		 $(document).removeData('messageShopId');
		  var json = $.jRadGet({url:'/shopmanage-ws/ws/0.1/shopmanage/shop/name?id='+id});
		  $("#Form_system_message .nameTips").html(json.businessName);
		 
	} 
	$("#download",wraper).click(function(){ 
		//	$.jRadGet({url:'/shopmanage-ws/ws/0.1/file/downFile?url='+pathJson.url});
		$(".download",wraper).attr("href",'/shopmanage-ws/ws/0.1/file/downFile?url='+pathJson.url);
	});
	
	function getNameTips(){
		$("#Form_system_message .nameTips").html("");
		$("#Form_system_message div[name='shopid']").focusout(function(){ 
		 var flag = $("#Form_system_message div[name='shopid']").input('validate',jRad.validators["shopid"]);
		 if($("#Form_system_message div[name='shopid']").input('val')==""){
		    flag=false;
		 }
		 if(flag){
		   var id = $(this).input("val");
		   var _tip = $(this).parent().children(".nameTips");
		   var json = $.jRadGet({
					url:'/shopmanage-ws/ws/0.1/shopmanage/shop/name?id='+id, 
					success: function(data){ 
						_tip.html(data.businessName).css("color","#1F2228"); 
					},
					error:function(){ 
						_tip.html("查询商家不存在！").css("color","#BB4B47"); 
					}
				});
		   
		 }else{
		   $(this).parent().children(".nameTips").html("");
		 }
	}); 
	}
	function updateMessageView(messageId,wraper,fields_params){	 
		 $(".details-box .details-tab",wraper).find("span[name='title']").html("系统信息管理修改"); 
		 var item = $.jRadGet({url : '/shopmanage-ws/ws/0.1/messages/get?messageId='+messageId}); 	 
		 initMessageInfo(wraper);  
		 $('.jrad-table',wraper).slideUp();
		 $('.details-box',wraper).slideDown(); 
		 $(".scroll-up-btn").click();  
		 $('#Form_system_message',wraper).form({
			 fields_params: fields_params,
	         validators: jRad.validators, 
			 item: item,
			 readonlyFields: readonlyFields,
			 }); 
	   	var _str = $("#Form_system_message div[name='pushContent']").textarea('val');
	   	$("#Form_system_message span[name='pushLen']").html(lenFor(_str));
	   	$('#Form_system_message #download').hide();
		msgEvent();
		Form_system_message_manageVal(item,wraper);

	}
	$(".messageLink",wraper).live('click',function(){
		var item = $(this).data("item");
		updateMessageView(item.messageId,wraper,fields_params);
	});
	function msgEvent(){
		var _area = $("#Form_system_message div[name='pushContent']");
		_area.keyup(function(){
			var str = _area.textarea('val');
			$("#Form_system_message span[name='pushLen']").html(lenFor(str));
			var curStr = '';
			for(var i=0;i<str.length;i++){
				curStr += str.charAt(i);
				if(lenFor(curStr)>105){
					_area.textarea('val',str.substring(0,i));
					var change = lenFor(str) - 105;
					$("#Form_system_message span[name='pushLen']").html(lenFor(str)-change);
					return false
				}
			}
		});
	} 
	var lenFor = function(str){
		var byteLen=0,len=str.length;
		if(str){
			for(var i=0; i<len; i++){
				if(str.charCodeAt(i)>255){
				byteLen += 3;
				}else{
				byteLen++;
				}
			}
			return byteLen;
		}else{
			return 0;
		}
	}
	//回显地区一些信息
	function Form_system_message_manageVal(item,wraper){
		//地区
	 	var areaList = item.regions; 
	   	$.each(areaList,function(i){
	       	if(areaList[i].areaList.length==0){
		    	areaList[i].areaList=[{"areaCodeId":"0"}];
		   	}
	   	});

	   	$("#Form_system_message div[name='regions']",wraper).data('areaList',areaList); 
	   	addAreaList(areaList,wraper);
	   	//推送页面类型
		switch (item.pushJumpType) {
		//网页页面
		case 'u':
			$("#Form_system_message div[name='pushPage']",wraper).input('val',item.pushPage);
			break;
		//商家详情
		case 'n':
			$("#Form_system_message div[name='shopid']",wraper).input('val',item.shopid);
			break;
		//服务详情
		case 'i':
			$("#Form_system_message div[name='shopid']",wraper).input('val',item.shopid);
			$("#Form_system_message div[name='busiServiceRelId']",wraper).input('val',item.busiServiceRelId);
			break;
		//套餐详情
		case 'p':
			$("#Form_system_message div[name='shopid']",wraper).input('val',item.shopid);
			$("#Form_system_message div[name='busiDinnerRelId']",wraper).input('val',item.busiDinnerRelId);
			break;
		default:
			break;
		}
		
	}
	
}); 

function initMessageInfo(wraper){
	//地区
	$("#Form_system_message div[name='regions']",wraper).data("areaList",[]); 
	$("#Form_system_message #area_check_string",wraper).html("");
}

function showMessageError(xhr){
	 var errormsg = eval("(" + xhr.responseText + ")");
	 var cDiv = $("#Wraper_system_message .cDiv");
	 $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
}