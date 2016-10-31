$(document).ready(function(){ 
    var wraper = $('#Wraper_columns_manage');
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
 
	var fields_params = {};
	
	fields_params['name'] = {grid: 9}; 

	fields_params['status'] ={ data:[ 
		{id:'1',name:'有效'},
		{id:'0',name:'无效'}
	]};     
	var _form = $("#Form_columns_manage",wraper);
	fields_params['columnPicFile'] = {
		url:'/ycbmall-manager-ws/ws/0.1/file/uploadThree',
		delFunc: function(item){
		   item.list.remove();
		   $("input[name='picUrl']",_form).val("");
		   $("input[name='middleUrl']",_form).val("");
		   $("input[name='smallUrl']",_form).val(""); 
		},
		fileName:"file",
		note: '仅支持 JPG和PNG图片文件,图片大小640*150',
		show: false,
		params: {type:""},
		success: function(data){ 
		   if(data[0]&&data[0].code=="400"){
		     $.jRadMessage({level:'error',message:data[0].message});
		   }else{
		   $("input[name='picUrl']",_form).val(data.fileUrl);
		   $("input[name='middleUrl']",_form).val(data.middleUrl);
		   $("input[name='smallUrl']",_form).val(data.smallUrl); 
		   }
		},
	   beforeSubmit: function(obj){
		  var re = /^.*\.(jpg|JPG|png|PNG)$/;
		  if(re.test(obj.val())){
			return true;
		  }else{  
			$.jRadAlert("只能上传jpg和PNG文件", "error");
			$("div[name='columnPicFile']",_form).find("input[type='file']").val('');
			return false;
		  }
		},
		single: true,
		showInfo:false,
		prev:'fileUrl'
	};

    page_column_model.push({display: '栏目名称', name : 'name'}); 
	page_column_model.push({display: '栏目图片', name : 'smallPicUrl',width:100,diy:function($row,$div){
			var imgUrl = $row.smallPicUrl;
			if(imgUrl!=undefined&&imgUrl!=""){
			var $img = $('<img width="50" height="50" src="'+imgUrl+'" />');
			$div.height(50);
			$div.append($img);
			}
		}});  
	page_column_model.push({display: '栏目排序', name : 'sequence'});
	page_column_model.push({display: '状态', name : 'statusName'});
	page_column_model.push({display: '操作时间', name : 'updated'});
	page_column_model.push({display: '操作人', name : 'operator'});
    
	page_search_items.push({row:'1',type:'jrad-input',display:'栏目名称',name:'name'});
	page_search_items.push({row:'1',type:'jrad-select',display:'栏目状态',name:'status',params:{
		  data:[
		    {id:'',name:'全部'},
		    {"id":"0",name:"无效"},
			{"id":"1",name:"有效"} 
		  ]
		}}); 

    $('#Form_columns_manage .jrad-btn-normal',wraper).button({
		click: function(){
			$('.details-box',wraper).slideUp();
			$('.jrad-table',wraper).slideDown(); 
			$(".scroll-up-btn").click();
		}
	});  
	$('#Form_columns_manage .jrad-btn-primary',wraper).button({
		click: function(){
			var flag = $('#Form_columns_manage',wraper).form('validateAll');
			var json = $('#Form_columns_manage',wraper).form('getValue');
			
			if(!flag) {
			   return;
			}  
		
			json.operator = carsmart_config.operatorName;
			json.classifies = []; 
			var classifies = $("div[name='classifies']",wraper).data("classList");
			if(classifies.length==0){
			 $.jRadMessage({level:'error',message:"请选择要绑定的分类。"});
			 return;
			}else{
			$.each(classifies,function(){
			  var classifile = {};
			  classifile.firstClassificationId = this.firstClassificationId+""; 
			  var secondClassificationId = [];
			  var classList = this.classList;
			  for(var i=0;i<classList.length;i++){
				  secondClassificationId.push(classList[i].secondClassificationId);
			  }
			  classifile.secondClassificationId = secondClassificationId.join(",");
			  json.classifies.push(classifile);
			});
			}
			delete json.columnPicFile;

			if($(".details-box .details-tab",wraper).find("span[name='title']").html()=="4S店专供页栏目创建"){
			$.jRadPost({
				    	url:'/ycbmall-manager-ws/ws/0.1/exclusiveColumnCms/addExclusiveColumns',
				    	data:json,
				    	success:function(){
				    		$('.details-box',wraper).slideUp();
							$('.jrad-table',wraper).slideDown();  
							$(".scroll-up-btn").click();
							$('#Table_columns_manage').flexMessage('创建成功', 'success');
							$('#Table_columns_manage').flexReload();
				    	},error:function(data){
				    		var mes = eval('('+data.responseText+')');
				    			$.jRadMessage({
					    			 level:'error', 
				    				 message:mes[0].message 
					    		 })
				    	}
				    });
		 }else{
			$.jRadPost({
				    	url:'/ycbmall-manager-ws/ws/0.1/exclusiveColumnCms/editExclusiveColumns',
				    	data:json,
				    	success:function(){
				    		$('.details-box',wraper).slideUp();
							$('.jrad-table',wraper).slideDown();  
							$(".scroll-up-btn").click();
							$('#Table_columns_manage').flexMessage('修改成功', 'success');
							$('#Table_columns_manage').flexReload();
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
	$('#Form_columns_manage',wraper).form({
		fields_params:fields_params,
		layout: 'grid', 
		autobinding: false
	 }); 
	
	page_list_buttons.push({title: '创建',name:'Add', bclass: 'add',onpress : function(){
			initClassInfo(wraper); 
			 $('#Form_columns_manage',wraper).form({item:{'adTurnType':'0'}}); 
			 $(".details-box .details-tab",wraper).find("span[name='title']").html("4S店专供页栏目创建");
			 $('.jrad-table',wraper).slideUp();
			 $('.details-box',wraper).slideDown();
			 $(".scroll-up-btn").click();  
        }
    });
	 
	page_list_buttons.push({title: '修改',name:'Edit', bclass: 'edit',prefunc:function(){
            var checked = $('#Table_columns_manage').getCheckedTrs();
            if (checked.length != 1) {return false;}else{return true;}
        },onpress : function(){
            var checked = $('#Table_columns_manage').getCheckedTrs(); 
            if(checked[0]) {
			     var id = checked[0].id;
                 updateColumnView(id,wraper);
            }
        }
    }); 
  

	 
    page_list_buttons.push({separator: true}); 
	$('#Table_columns_manage').flexigrid({
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
			url:'/ycbmall-manager-ws/ws/0.1/exclusiveColumnCms/queryExclusiveColumns',
			onError:showColError,
			overflow:true
	});   
	
	var _span3 = $('div.searchButtons', wraper);
	var _span20 = $('<div>').addClass('span20').append(_span3);
	var _div = $('<div>').addClass('row-fluid').append(_span20);
	$('div.searchContent', wraper).append(_div);
	$('div.searchContent span.span14', wraper).remove();
	
	$(".details-tab .return",wraper).click(function(){
		$('.details-box',wraper).slideUp();
		$('.jrad-table',wraper).slideDown(); 
		$(".scroll-up-btn").click();
	});    
	//分类选择 
    var class_fields_params = {};
    class_fields_params['firstClassificationId'] = {
			urlData:{
				url:'/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentIdV2?parentId=-1&level=1'
			},
			unshiftData: {id:'0',name:'请选择'},
		onchange: function(){
			var firstClassificationId = $('#Form_class div[name=firstClassificationId]',wraper).select('val');
			if(firstClassificationId=='0'){
				$("#Form_class div[name='secondClassificationId']",wraper).select({
					urlData:{url:''},
					data:[{id:'0',name:'请选择'}],
					val:'0'});
			}else{
			$('#Form_class div[name=secondClassificationId]',wraper).select('readonly',false);
			$('#Form_class div[name=secondClassificationId]',wraper).select("val","0");
			$('#Form_class div[name=secondClassificationId]',wraper).select({
				urlData:{
					url:'/ycbmall-manager-ws/ws/0.1/classificationCms/getClassificationsByParentIdV2?parentId='+firstClassificationId+'&level=2'
				},
				unshiftData: {id:'0',name:'请选择'}
			});
			}
		}
	}
	class_fields_params['secondClassificationId'] = {
			data: [{id:'0',name:'请选择'}]
		};
	$('#Form_class',wraper).form({
	        title:"分类", 
			fields_params:class_fields_params,
			item:{"firstClassificationId":"0","secondClassificationId":"0"},
			submit:function(){
				var json = {};
				json.firstClassificationId = $("#Form_class div[name='firstClassificationId']",wraper).select('val');
				json.firstClassificationName = $("#Form_class div[name='firstClassificationId']",wraper).select('text');
				json.classList = [];
				json.classList[0] = {};
				json.classList[0].secondClassificationId = $("#Form_class div[name='secondClassificationId']",wraper).select('val');
				json.classList[0].secondClassificationName = $("#Form_class div[name='secondClassificationId']",wraper).select('text');  
				var array = $("div[name='classifies']",wraper).data("classList"); 
				var fId = json.firstClassificationId; 
				var sId = json.classList[0].secondClassificationId;
				
				if(sId=="0"){
					$.jRadMessage({level:'error',message:'必须选择二级分类',selector:$('#Form_class',wraper)});
					return 
				}
				if(fId=="0"){
					array = []; 
					array.push(json);
				}else{
				    if(array.length==1&&array[0].firstClassificationId=="0"){
					array = []; 
					array.push(json);
					}else{
						var flag = true;
						$.each(array,function(){
							if(this.firstClassificationId == fId){
							  flag = false;
							  var classList = this.classList;
							  if(sId=="0"){
									this.classList = json.classList;
							  }else{ 
									var secondflag = true;
									for(var i=0;i<classList.length;i++){
									if(classList[i].secondClassificationId==0){
										secondflag = false;
									this.classList = json.classList;
									break;
									}
									if(classList[i].secondClassificationId==sId){ 
										secondflag = false;
									$.jRadMessage({level:'error',message:"该分类已经选择",selector:$("#Form_class",wraper)});
									return;
									}
									}
									if(secondflag){
									this.classList.push(json.classList[0]);
									}
							  }
							}
						});
						if(flag){  
						  array.push(json);
						}  
					}
				}
				addClassList(array,wraper); 
				$("div[name='classifies']",wraper).data("classList",array);
				$("#Form_class",wraper).form("close");
			}
			});
	$("#jrad-button-class",wraper).button({
		click : function() {
			$("#Form_class div[name='secondClassificationId']",wraper).select({
				urlData:{url:''},
				data:[{id:'0',name:'请选择'}],
				val:'0'});
			$('#Form_class',wraper).form({ 
			fields_params:class_fields_params,
			item:{"firstClassificationId":"0","secondClassificationId":"0"},
			}).form('open');
		}
	});
	//删除分类
	$("#class_check_string .delClass",wraper).live('click',function(){
		var info = $(this).data('info'); 
		var arr = $("div[name='classifies']",wraper).data("classList");
		$.each(arr,function(i){
			var json = this;
			if(json.firstClassificationId==info.firstClassificationId){
				if(info.secondClassificationId=="0"){
					arr.splice(i,1);
				}else if(json.classList.length==1){
					arr.splice(i,1);
				}else{
					$.each(json.classList,function(j){
					var area = this;
					if(area.secondClassificationId==info.secondClassificationId){ 
					json.classList.splice(j,1); 
					}
					});
				}
			}
		}); 
		$(this).parent('.classSpan').remove();
	});
	});

function initClassInfo(wraper){
	   //栏目图
	   var _ul = $("div[name='columnPicFile']",wraper).children(".pic-show"); 
	   _ul.html(""); 
	  //分类
	   $("#Form_columns_manage div[name='classifies']",wraper).data("classList",[]); 
	   
	   $("#Form_columns_manage #class_check_string",wraper).html("");   
}
//修改时赋值
function Form_class_manageVal(wraper,item){ 
//   $("#serviceNames",wraper).html(item.serviceName);
   var _ul = $("div[name='columnPicFile']",wraper).children(".pic-show"); 
   var src = item.smallUrl;
   var srcBig = item.picUrl;
   if(src!=undefined&&src!=""){ 
	  var _li = '<li name="" class="classPicBoxli"><div class="fileUrl-pic"><div class="pic-box"><div class="pic-content"><div class="pic-vc">'
				+'<a class="file cboxElement"  title="" href="'+srcBig+'" ><img src="'+src+'"></a>'
				+'</div></div><span name="small" class="del-btn"></span></div></div></li>'
	  _ul.html(_li); 
	  $(".file",wraper).colorbox({rel: 'file',close:'x',maxWidth: '70%',maxHeight: '70%',previous:'<i class="icon-font-arrow-left"></i>',next:'<i class="icon-font-arrow-right"></i>'});
	  $(".classPicBoxli .del-btn").click(function(){
			var small = $(this).prev(".pic-content").find("img").attr("src");
			$(this).parents(".classPicBoxli").remove(); 
		    $("input[name='picUrl']",wraper).val("");
		    $("input[name='middleUrl']",wraper).val("");
		    $("input[name='smallUrl']",wraper).val("");  
	  });
	 } 
   //分类
   var classList = item.classifies; 
   $.each(classList,function(i){
       if(classList[i].classList.length==0){
    	   classList[i].classList=[{"classList":"0"}];
	   }
   });
   $("#Form_columns_manage div[name='classifies']",wraper).data('classList',classList); 
   addClassList(classList,wraper);
}

//编辑页面打开
function updateColumnView(id,wraper){ 
	 var item = $.jRadGet({url : '/ycbmall-manager-ws/ws/0.1/exclusiveColumnCms/detailExclusiveColumns?id='+id}); 	 
	 $(".details-box .details-tab",wraper).find("span[name='title']").html("4S店专供页栏目修改"); 
	 initClassInfo(wraper);  
	 $('.jrad-table',wraper).slideUp();
	 $('.details-box',wraper).slideDown(); 
	 $(".scroll-up-btn").click();
	 item.id = id;
	 $('#Form_columns_manage',wraper).form({item: item});  
	 Form_class_manageVal(wraper,item); 
} 
function showColError(xhr){
	 var errormsg = eval("(" + xhr.responseText + ")");
	  var cDiv = $("#Wraper_columns_manage .cDiv");
	  $.jRadMessage({level:'error',message:errormsg[0].message,selector:cDiv});
} 

function addClassList(array,wraper){  
    $("#class_check_string",wraper).html(""); 
	  if(array.length==1&&array[0].secondClassificationId=="0"){
		 var info = {"firstClassificationId":"0","secondClassificationId":"0"};  
		 var _div = $("<div>").addClass("classSpan").html("全部");
		 var _span = $("<span>").addClass("delspan delClass").html("X").attr("title","移除").data("info",info);
		 $("#class_check_string",wraper).append(_div.append(_span));
	  }else{ 
	  $.each(array,function(){
	      var json = this.classList;
		  var firstClassificationId = this.firstClassificationId;
		  var firstClassificationName = this.firstClassificationName;
		  if(json.length==1&&json[0].secondClassificationId==0){ 
		  var showClass = firstClassificationName; 
		  var showId = firstClassificationId;
		  var info = {"firstClassificationId":showId,"secondClassificationId":"0"};  
		  var _div = $("<div>").addClass("classSpan").html(showClass);
		  var _span = $("<span>").addClass("delspan delClass").html("X").attr("title","移除").data("info",info);
		  $("#class_check_string",wraper).append(_div.append(_span));
		  }else{ 
		  for(var i=0;i<json.length;i++){ 
		  var showClass = json[i].secondClassificationName;
		  var showId = json[i].secondClassificationId;
		  var info = {"firstClassificationId":firstClassificationId,"secondClassificationId":showId};  
		  var _div = $("<div>").addClass("classSpan").html(showClass);
		  var _span = $("<span>").addClass("delspan delClass").html("X").attr("title","移除").data("info",info);
		  $("#class_check_string",wraper).append(_div.append(_span));
		  }
		  }
	  });   
	  }
}
