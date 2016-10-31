
$(document).ready(function(){ 
	
	var wraper = $('#Wraper_createCard_manage');
	
    var page_column_model = new Array();
    var page_search_items = new Array();
    var page_list_buttons = new Array();
    
    page_column_model.push({display: '序号', name : 'sequence'});
    page_column_model.push({display: '客户名称', name : 'userName'}); 
    page_column_model.push({display: '手机号', name : 'mobile'});
    page_column_model.push({display: '消费次数', name : 'serviceCnt'});
    page_column_model.push({display: '总计消费金额', name : 'totalUserPay'});
   
    page_search_items.push({row:'1',type:'jrad-input',display:'用户手机',name:'mobile'});

    page_list_buttons.push({title: '创建客户',displayname:'创建客户',name:'Add', bclass: 'icon-plus',onpress : function(){
    		
    	$('#Form_customer_add_userCar',wraper).form({}).form('close')
        $('#Form_customer_add',wraper).form({
            title: '创建客户',
            submit:function(){
//                var flag = $('#Form_customer_add',wraper).form('validateAll');
//                if(flag){
                    var json = $('#Form_customer_add',wraper).form('getValue'); 
                    json.businessInfoId = carsmart_config.businessInfoId; 
                    $.jRadPost({
                        url:'/vip-ws/ws/0.1/userManager/addUser',
                        data:json,
                        success:function(data){
                        	var str = $('#Form_customer_add input[name="mobile"]').val();
                            $('#Form_customer_add',wraper).form('close');
                            
                            var field_params={};  
                            field_params['isUsed']={data:[{id:'2',name:'不确定'},{id:'0',name:'否'},{id:'1',name:'是'}]};
                            field_params['color']={data:[{id:'黑',name:'黑'},{id:'白',name:'白'},{id:'红',name:'红'},{id:'粉',name:'粉'},{id:'绿',name:'绿'},{id:'黄',name:'黄'},{id:'灰',name:'灰'},{id:'银',name:'银'},{id:'蓝',name:'蓝'},{id:'棕',name:'棕'},{id:'其他',name:'其他'}]};
                            field_params['interiorStyle']={data:[{id:'0',name:'普通'},{id:'1',name:'简约'},{id:'2',name:'豪华'},{id:'3',name:'其他'}]};
                            field_params['percentNew']={data:[{id:' ',name:'不确定'},{id:'1',name:'1'},{id:'2',name:'2'},{id:'3',name:'3'},{id:'4',name:'4'},{id:'5',name:'5'},{id:'6',name:'6'},{id:'7',name:'7'},{id:'8',name:'8'},{id:'9',name:'9'},{id:'10',name:'10'}]};
                            field_params['isRefit']={data:[{id:'2',name:'不确定'},{id:'0',name:'否'},{id:'1',name:'是'}]};
                           
                            $('#Form_customer_add_userCar',wraper).form({
                                title: '创建车辆',
                                fields:field_params,
                                item:{mobile:str},
                                url:'/vip-ws/ws/0.1/userManager/addCarInfo',
                                preSubmit:function(json){
                                    json.businessInfoId = carsmart_config.businessInfoId;
                                    json.userInfoId = data.userInfoId;
                                    json.ownerName = data.ownerName;
                                    json.seriesId = $('.last span',wraper).attr("id");
                                    json.buyDate = $('#startDate',wraper).val()
                                    return json;
                                },
                                success: function(data) {
                                    $('#Table_vipCard_list',wraper).flexMessage('创建成功', 'success','3');
                                    $('#Table_vipCard_list',wraper).flexReload();
                                    $(".car-style",wraper).val(data.seriesId);
                                    $(".car-plateNumber",wraper).val(data.plateNumber);
                                    $(".car-vinNumber",wraper).val(data.vinNumber);
                                    $(".car-machineNumber",wraper).val(data.machineNumber);
                                    $(".carInfoId",wraper).attr("carInfoId",data.carInfoid)
                                }
                            }).form('open');                            
                            $('#startDate',wraper).val("");
                            $(".car-mobile",wraper).attr("userInfoId",data.userInfoId)
                            $(".car-name",wraper).val(data.ownerName);
                            $("#Form_customer_add_userCar input[name='plateNumber']",wraper).attr("maxlength","10")
                            $("#Form_customer_add_userCar input[name='machineNumber']",wraper).attr("maxlength","30")
                            $("#Form_customer_add_userCar input[name='vinNumber']",wraper).attr("maxlength","30")
                            $("#Form_customer_add_userCar input[name='chassisNumber']",wraper).attr("maxlength","30")
                            $('.last',wraper).hide()
                            $('.ul-letters',wraper).show();
                            $('.condition-title',wraper).show();
                            brandFn()
                            $('.car-list',wraper).show().html('');
                            $("#Form_customer_add_userCar .pop-up-close",wraper).click(function(){
                                $(".car-mobile",wraper).val("");
                            })
                        },
                        error:function(data){
                            var mes = eval('('+data.responseText+')');
                            $.jRadMessage({level:'error', message:mes[0].message,selector:$("#Form_customer_add .pop-up-middle",wraper)});
                            return false
                        }
                    });
                }    
//            }
        }).form('open');
    	
    	
		}
	});	
    
    //表格初始化
	$('#Table_vipCard_list',wraper).flexigrid({
		method:'get',
		colModel : page_column_model,
		buttons : page_list_buttons,
		searchitems :page_search_items,
		pagination: {
			diaplay_pages: 5,
			align: 'bottom' 
		},
		showSearch:true, 
		url:'/vip-ws/ws/0.1/userManager/getUserList',
		onError:showError,
		showCheckbox: true,
		checkBoxType: 'single',
		overflow:true,
		extParam:{'businessInfoId':carsmart_config.businessInfoId,status:2}
	});
	
	$('.vdiv .tDiv',wraper).before('<span style="margin:0 20px 0 14px;font-size:15px;float:left;line-height:60px;">客户信息</span>');
	
	 var cardData = $.jRadGet({url: '/vip-ws/ws/0.1/card/queryAllCardList?businessInfoId='+carsmart_config.businessInfoId+'&status=2'});
	 var arr = [];
     $.each(cardData,function(i){
         var json = {};
         json.id = cardData[i].id;
         json.name = cardData[i].name;
         arr.push(json);
     });
     
	var fields={};
	fields['cardId'] = {
		data:arr,
		onchange:function(val){
			$.each(cardData,function(){
				if(val==this.id){
					$("#cardInfo input[name='sellingPrice']",wraper).val(this.sellingPrice);
				}
			});
        }
	}
	
	$('#cardInfo',wraper).form({
		layout: 'grid',
		fields: fields, 
		autobinding: false
//		preSubmit: function() {},
//		success: function(data) {
//		},
//		error: function(xhr) {} //提交失败后回调函数
	});
	
	var cardTypeId = $("#cardInfo div[name='cardId']",wraper).select('val');
	
	$.each(cardData,function(){
		if(cardTypeId==this.id){
			$("#cardInfo div[name='sellingPrice']",wraper).input('val',this.sellingPrice);
		}
	});
	$("#cardInfo div[name='sellingPrice']",wraper).input('readonly',true);
	$('#cardInfo button.jrad-btn-primary', wraper).click(function(){
		var json = $('#cardInfo', wraper).form('getValue');
		var checked = $('#Table_vipCard_list').getCheckedTrs();
		if(checked.length==0){
			$.jRadMessage({
				level: 'error',
				message: '请选中一条会员记录进行办理'
			});
		}
		json.userInfoId=checked[0].userInfoId;
		json.businessInfoId=carsmart_config.businessInfoId;
		json.memberPhone=checked[0].mobile;
		json.operator=carsmart_config.operatorName;
		
		$.jRadPost({
			url: '/vip-ws/ws/0.1/memberCard/addMemberCard',
			data: json,
			success: function(data) {
				$.jRadMessage({
					level: 'success',
					message: '办理成功！'
				});
			},
			error: function(data) {
				var mes = eval('(' + data.responseText + ')');
					$.jRadMessage({
						level: 'error',
						message: mes[0].message
					});
			}
		});
		
		
	});
	
});


function brandFn(){
        var brandList = $.ajax({url:"/shopmanage-ws/ws/0.1/support/brand/list",async:false});
        var msg = eval("(" + brandList.responseText + ")");
        var A_Z="";
        for(var i=65;i<91;i++){
            if(i == 69 || i== 73 || i == 85 || i == 86){
                A_Z+="";
            }else{  
                A_Z+="<li  class='uperCase uperCasess' data-num="+i+">"+String.fromCharCode(i)+"</li>";
            }
        };
        $("#searchBox .ul-letters").html(A_Z);

        $('.ul-letters li').on('click',function(){
            var str = $(this).html();
            var data = eval('msg.'+str)
            var _li = '';
            $('.car-list').html("");
            $.each(data,function(i){
                var item = data[i]
                _li += '<li data-id='+item.id+'>'+item.name+'</li>'
            })
            $('.car-list').append(_li);

            $('.car-list li').on('click',function(){
                var str = $(this).attr("data-id")
                //http://10.23.31.151/shopmanage-ws/ws/0.1/modelCms/factory/list?brandId=84&_=1449651904401
                var modelList = $.ajax({url:'/shopmanage-ws/ws/0.1/support/model/list?brandId='+str,async:false})
                var data2 = eval("(" + modelList.responseText + ")");
                $('.car-list').html("");
                var _li2 = '';
                $.each(data2,function(i){
                    var item2 = data2[i]
                    _li2 += '<li data-id='+item2.id+'>'+item2.name+'</li>'
                })
                $('.car-list').append(_li2);

                $('.car-list li').on('click',function(){
                    $('.car-list').html("");
                    var str = $(this).attr("data-id")
                    var modelList2 = $.ajax({url:'/shopmanage-ws/ws/0.1/modelCms/model/list?factoryId='+str,async:false})
                    var data3 = eval("(" + modelList2.responseText + ")");
                    $('.car-list').html("");
                    var _li3 = '';
                    $.each(data3,function(i){
                        var item3 = data3[i]
                        _li3 += '<li data-id='+item3.modelId+'>'+item3.modelName+'</li>'
                    })
                    $('.car-list').append(_li3);
                    
                    $('.car-list li').on('click',function(){
                        var str = $(this).attr("data-id")
                        $('.ul-letters').hide();
                        $('.car-list').hide();
                        $('.condition-title').hide();
                        $('.last').show().html('<span id='+str+'>'+$(this).html()+'</span><a href="javascript:void(0)">X</a>');

                        $('.last a').on('click',function(){
                            $('.last').hide();
                            $('.ul-letters').show();
                            $('.condition-title').show();
                            $('.uperCase').removeClass("active");
                            $('.car-list').show().html('');
                        })
                    })

                })

                
            })
        });

        $("body").on("click","#searchBox .uperCasess", function(){
            $(this).siblings(".uperCase").removeClass("active").end().addClass("active");
        })
}

function showError(xhr){
	var errormsg = eval("(" + xhr.responseText + ")");
    var ydiv = $("#Wraper_createCard_manage .vdiv");
    $.jRadMessage({level:'error',message:errormsg[0].message,selector:ydiv});
}