	// var num = 0;
	// function loopFun(){  
	//  if(num>15){
	//  	num=0;
	//  }else{
	//  	num+=1; 
	//  }   
	//  $(".load-bar #i0").attr("src","waiting/"+num+".png"); 
	// }
	// setInterval("loopFun()",200);  
    
    var paramJson = {},carInfoJson = {}; 
   $(document).ready(function(){ 
      var url =decodeURI(window.location.search);  
      if(url!=undefined&&url!=""){
        var paramsArr = (url.split("?")[1]).split("&"); 
        $.each(paramsArr,function(i){
         var item = paramsArr[i].split("=");
         paramJson[item[0]] = item[1];
        });    
      }    
      var date = new Date();
	  date.setDate(date.getDate()+1);	
	  date.setHours("0");
	  date.setMinutes("0");
	  date.setSeconds("0");
	  $("#firstRegDate").mobiscroll().datetime({
	      theme: "bootstrap", 
	      mode: "scroller",   
	      display: "model", 
	      lang: "zh",       
	     // minDate:date, 
	      dateFormat: 'yy-mm-dd', 
	      stepMinute: 5  
	  });  
	  $("#code").html(paramJson.code);
	  //切换tab
	  paramJson.tab = "tab1"; 
      $(".tabs label").click(function(){
      	$(".selected").removeClass("selected");
      	$(this).addClass("selected");
      	var tid = $(this).attr("tid");
      	$(".detail-wrap").hide();
      	$("#"+tid).show(); 
		paramJson.tab = tid;
      });
      $(".detail-wrap .arrow").click(function(){
      	var _this = $(this);
      	var _ul = $(this).prev();
      	 if(_this.hasClass("closeA")){
      	 	_this.removeClass("closeA");
      	 	_ul.slideUp();
      	 }else{
      	 	_this.addClass("closeA");
      	 	_ul.slideDown();
      	 }
      });
      $(".carNumberCity .close").click(function(){
          $(".carNumberCity").fadeOut();
      });       
      $(".number-first").click(function(){
          $(".carNumberCity").fadeIn();
      });  
      $(".carNumberCity span").click(function(){
          $(".carNumberCity").fadeOut();
          $(".number-first strong").html($(this).html());
      });  
      $(".load-bar").click(function(){
      	if($(this).hasClass("remove")){
      		$(this).hide().removeClass("remove");
      	}
      });
     //选择车辆信息
	$(".carCheckBtn").click(function(){
        $(".main-wrap").hide();
		$(".brand-page").show();
    }); 
     $(".brand-page .close").click(function(){
		$(".main-wrap").show();
		$(".brand-page").hide();
	});
	$(".model-page .close").click(function(){
		$(".brand-page").show();
		$(".model-page").hide();
	});
	$(".carInfo-page .close").click(function(){
		$(".model-page").show();
		$(".carInfo-page").hide();
	});
  
	//是否发起过好友助战
	var isHaveRecord = function(){
		 $.ajax({
            url: '/yangchebao-weixin-ws/ws/0.1/qunabao/isHaveRecord?openid='+paramJson.openid,
            type: 'get',
            async: false,
            contentType:'application/json;charset=utf-8',
            success:function(data){   
              if(data.isHaveRecord=="yes"){   
              	toQuery();
              }
            },error:function(xhr){  
            }
        });
	}; 
	//获取openid及用户信息
	var getUserInfo = function(){
	    $.ajax({
            url: '/yangchebao-weixin-ws/ws/0.1/common/getWxUserBaseInfo?code='+paramJson.code+'&'+(new Date()).getTime(),
            type: 'get',
            async: false,
            contentType:'application/json;charset=utf-8',
            success:function(data){   
			  paramJson.openid = data.openid;   
              paramJson.nickname = data.nickname;
              paramJson.headImgUrl = data.headimgurl; 
            },error:function(xhr){  
            }
        });
	};	
	var getUserInfoByOpenId = function(){
	    $.ajax({
            url: '/yangchebao-weixin-ws/ws/0.1/qunabao/getQunabaoFriendAssistIn?openid='+paramJson.openid+'&'+(new Date()).getTime(),
            type: 'get',
            async: false,
            contentType:'application/json;charset=utf-8',
            success:function(data){    
              if(data.nickname!=undefined&&data.nickname!=""){ 
              	 paramJson.nickname = data.nickname;
              } 
              if(data.headImgUrl!=undefined&&data.headImgUrl!=""){ 
              	  paramJson.headImgUrl = data.headImgUrl; 
              } 
              if(data.plateNumber!=undefined&&data.plateNumber!=""){
				$(".number-first strong").html(data.plateNumber.substring(0,1));
				$("#plateNo").val(data.plateNumber.substring(1,data.plateNumber.length));
				$("#plateNo").parents("li").hide();
				$("#plateNo2").parents("li").show();
				$("#plateNo2").val(data.plateNumber);
				$("#plateNo2").parent(".input-wrap").addClass("disabled");
				$("#plateNo2").attr("disabled","disabled")
			  } 
			  if(data.initialDate!=undefined&&data.initialDate!=""){ 
			  	var arr = data.initialDate.split(":"); 
				$("#firstRegDate").val(arr[0]+":"+arr[1]);
			  }
            } 
        });
	};  
	//取openid
	var openid = paramJson.openid;  
	if(openid!=undefined&&openid!=""){  
	  	if(paramJson.edit!=undefined&&paramJson.edit=="edit"){  
			getUserInfoByOpenId(); 
		}else{
			isHaveRecord();
		}
	}else{  
		getUserInfo();  
        isHaveRecord();
	}   
	var plateNoFlag = false;
    var checkPlateNo = function(){
        var plateNo = $("#plateNo").val();
        var msg = "";
        if($.trim(plateNo)==""){ 
        	alertTasat("请填写车牌号");
        	return false;
        } 
        plateNo = $(".number-first strong").html()+plateNo;
        $.ajax({
            url: '/yangchebao-weixin-ws/ws/0.1/qunabao/checkPlateNumber?plateNumber='+plateNo+'&openid='+paramJson.openid+'&'+(new Date()).getTime(),
            type: 'get', 
			async: false,
            contentType:'application/json;charset=utf-8',
            success:function(data){
             plateNoFlag = true; 
             /**if(data.stateCode=="200"){
              		 $.ajax({
			            url: '/yangchebao-weixin-ws/ws/0.1/qunabao/getPlateNumberDate?plateNumber='+plateNo+'&'+(new Date()).getTime(),
			            type: 'get', 
						async: false,
			            contentType:'application/json;charset=utf-8',
			            success:function(data){ 
			              if(data.isHaveDate=="yes"){
			              		paramJson.isHaveDate="yes";
			              		paramJson.company=data.name;
			              		paramJson.bizCharge=data.bizCharge; 
			              }
			            },error:function(xhr){
							var mes = eval('('+xhr.responseText+')');  
							alertTasat(mes[0].message);  
						} 
			        });
              }**/
            },error:function(xhr){
				var mes = eval('('+xhr.responseText+')');  
				alertTasat(mes[0].message);  
			} 
        });

    }
      
     $("#plateNo").change(function(){
    	 checkPlateNo();  
     });
     //提交车辆信息
     var saveCarInfo = function(){
     	var saveCarInfoFlag = false;
		var postData = {};
		postData.openid = paramJson.openid;
		postData.provinceId = paramJson.province;
		postData.cityId = paramJson.city;
		postData.plateNo = $(".number-first strong").html()+$.trim($("#plateNo").val()); 
	 
		postData.bwCode = carInfoJson.bwCode;
		postData.carModelName = carInfoJson.carModelName;
		postData.price = carInfoJson.price;
		postData.displacement = carInfoJson.displacement;
		postData.marketYear = carInfoJson.marketYear;
		postData.taxPrice= carInfoJson.taxPrice; 
  		postData.engineNum="DFGHUO46";
        postData.vin = "ASDFQWE35790VBCZF"; 
        postData.firstRegDate = $("#firstRegDate").val()+":00.000";   
		$.ajax({
			url:'/yangchebao-app-ws/ws/0.1/insure/car/replace',
			type:'post',
			dataType:'json',
			data:$.toJSON(postData),
			async:false,
			contentType:'application/json;charset=utf-8',
			success:function(data){
				saveCarInfoFlag = true; 
			},error:function(xhr){
				var mes = eval('('+xhr.responseText+')');  
				alertTasat(mes[0].message);  
				
			} 
		});
		return saveCarInfoFlag;
     };    
	// 行驶城市
	$('.cityCheckBtn').click(function(){
			$('.selectCity').show();
			$('.main-wrap').hide(); 
			$.ajax({
				url:'/yangchebao-app-ws/ws/0.1/insure/region/queryAll',
				type:'get',
				dataType:'json',
				contentType:'application/json;charset=utf-8', 
				success:function(data){ 
					$('div.selectCity div.selectCity-loading').hide();
					$('div.selectCity div.selectCity-main').show();
					$('div.selectCity article.allCitys-letters').show();
					if(!data.regions||data.regions.length==0) return false;
					var hotCity_str='';
					var letterCity_str='';
					// 城市首字母
					var firstLetterList={};
					'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(key,id){
						firstLetterList[key]=''
					});
					// 初始化城市列表
					function initCity(province,city,id){
						if(city.pinyin){
							var firstLetter=city.pinyin.charAt(0).toUpperCase();
						}else{
							var firstLetter=province.pinyin.charAt(0).toUpperCase();
						}
						
						firstLetterList[firstLetter]+='<p data-id='+city.id+' pro-id='+id+'>'+city.name+'</p>';
						if(city['hot']){
							hotCity_str+='<li data-id='+city.id+' pro-id='+id+'>'+city.name+'</li>';
							return false
						}
						if(province['hot']){
							hotCity_str+='<li data-id='+city.id+' pro-id='+id+'>'+city.name+'</li>';
							return false
						}
					}
					data['regions'].forEach(function(province,i){
						var proId=province.id;
						if(province['special']){
							initCity('',province,proId);
							return false
						}
						if(!province.regions||!province.regions.length) return false;
						province['regions'].forEach(function(city,j){
							initCity(province,city,proId)
						})
					});

					$.each(firstLetterList,function(key,val){
						if(val=='') return true;
						letterCity_str+='<li>'
						               +'<div class="allCitys-letter" id="'+key+'">'+key+'</div>'
						               +'<div class="allCitys-detail">'+val+'</div>'
						               +'</li>'
					});

					// 写入
					$('ul.allCitys-ul').html(letterCity_str);
					$('ul.hotCitys-ul').html(hotCity_str);

					// 滚动 点击
					var _windowHeight=window.innerHeight-$('div.selectCity-title').outerHeight();
					$('div.selectCity-main').css({'height':_windowHeight,'overflow':'auto'});
					$('div.selectCity-main').scrollTop(0);
					$('div.selectCity-title img').unbind('click').bind('click',function(){
						$('div.selectCity div.selectCity-loading').show();
						$('div.selectCity div.selectCity-main').hide();
						$('div.selectCity article.allCitys-letters').hide();
						$('div.selectCity').hide();
						$(".main-wrap").show();
					});
					$('ul.hotCitys-ul li,div.allCitys-detail p').unbind('click').bind('click',function(){
						$('.cityCheckBtn').val($(this).html()); 
						paramJson.province=$(this).attr('pro-id');
						paramJson.city=$(this).attr('data-id');
						$('div.selectCity div.selectCity-loading').show();
						$('div.selectCity div.selectCity-main').hide();
						$('div.selectCity article.allCitys-letters').hide();
						$('div.selectCity').hide();
						$(".main-wrap").show();
					});
					$('p.allCitys-letters-p span').unbind('click').bind('click',function(){
						var _id=$(this).html();
						var _top=$('div#'+_id).position().top;
						$('div.selectCity-main').scrollTop($('div#'+_id).position().top+$('article.hotCitys').outerHeight())
					})
				} 
			}); 
		});
        var submit = function(){
        	 checkPlateNo();
			 var flag = plateNoFlag;
	         if(!flag){   
	         	return false;
	         }else{ 
	            var date = $("#firstRegDate").val();
	            if(date==""){
	            	alertTasat("请填写初登日期");
	            	return false;
	            }
	            var city = $(".cityCheckBtn").val();
	            if(city==""){
	            	alertTasat("请填写行使城市");
	            	return false;
	            }
	            var carInfo = $(".carCheckBtn").val();
	            if(carInfo==""||carInfoJson.carModelName==undefined||carInfoJson.carModelName==""){
	            	alertTasat("请选择车辆信息");
	            	return false;
	            } 
	            
	         	//if(paramJson.isHaveDate=="yes"){ 
	         	//	addRecord();
	         	//}else{
	         		var saveCarInfoFlag = saveCarInfo(); 
					if(saveCarInfoFlag){
						quote();  
					}
					
	         	//}
	         }  
	     };
        $("#submit").click(function(){  
         	submit();
         }); 
         getShareInfo();  
         getBrandList();
  });
  function getShareInfo(){  
 	 //channel	1,查询车险报价页面；2，获取助战结果页面
      $.ajax({
          url: '/yangchebao-weixin-ws/ws/0.1/qunabao/genShareUrl?channel=1&'+(new Date()).getTime(),
          type: 'get', 
          async:false,
          dataType: 'json',
          success: function(data) {  
          	data.channel = 1;
			share(data);
          },error:function(xhr){  
		      var mes = eval('('+xhr.responseText+')'); 
		      alertTasat(mes[0].message);
          }
      });  
  }
//新增用户投保记录
 function addRecord(){
	var postData = {}; 
	postData.openid = paramJson.openid; 
	postData.nickname = paramJson.nickname;
	postData.headImgUrl = paramJson.headImgUrl; 
	postData.plateNumber = $(".number-first strong").html()+$.trim($("#plateNo").val());
	postData.initialDate = $("#firstRegDate").val()+":00";
	postData.style =  carInfoJson.carModelName;
	postData.inquiryQuotationCompany = paramJson.company;
	postData.autoInsuranceQuote = paramJson.bizCharge;
	$.ajax({
		url:'/yangchebao-weixin-ws/ws/0.1/qunabao/editQunabaoFriendAssistIn',
		type:'post',
		dataType:'json',
		data:$.toJSON(postData),
		async:false,
		contentType:'application/json;charset=utf-8',
		success:function(data){
			toQuery();  
		},error:function(xhr){
			var mes = eval('('+xhr.responseText+')');  
			alertTasat(mes[0].message);  
		} 
	}); 
 } 
 var queryCount = 0;
//用户获取报价接口
 function quote(){
 	//等待遮罩层
 	$(".load-bar").show();
 	$(".load-bar #i0").show();
 	$(".load-bar #wait").hide();
 	$(".load-bar p").html("需要在众多保险公司中筛选出最低价<br>请稍等......"); 
    num=0;  
	var postData = {};  
	postData.openid = paramJson.openid;
	var dealOffer = {};
	dealOffer.insArea = {"province": paramJson.province, "city": paramJson.city};
	var tab = paramJson.tab;
	if(tab=="tab1"){
		dealOffer.suite = {
		"mustInsureSameTime": true,
		"suiteDefUrl": "/suiteDef/default",
		"items": {
			ThirdPartyIns: {
				amount: 300000.0,
				ecode: "ThirdPartyIns",
				selIdx: 5
			},
			NcfThirdPartyIns: {
				amount: -1,
				ecode: "NcfThirdPartyIns",
				selIdx: 1
			},
			VehicleCompulsoryIns: {
				amount: -1,
				ecode: "VehicleCompulsoryIns",
				selIdx: 1
			},
			VehicleTax: {
				amount: -1,
				ecode: "VehicleTax",
				selIdx: 1
			}
		} 
		};
	}else if(tab=="tab2"){
		dealOffer.suite = {
		"mustInsureSameTime": true,
		"suiteDefUrl": "/suiteDef/default",
		"items": {
			VehicleDemageIns: {
			amount: -1,
			ecode: "VehicleDemageIns",
			selIdx: 1
			},
			ThirdPartyIns: {
				amount: 500000.0,
				ecode: "ThirdPartyIns",
				selIdx: 6
			},
			TheftIns: {
				amount: -1,
				ecode: "TheftIns",
				selIdx: 1
			},
			DriverIns: {
				amount: 10000.0,
				ecode: "DriverIns",
				selIdx: 2
			},
			PassengerIns: {
				amount: 10000.0,
				ecode: "PassengerIns",
				selIdx: 2
			},
			GlassIns: {
				amount: -1,
				ecode: "GlassIns",
				selIdx: 1
			},
			VehicleCompulsoryIns: {
				amount: -1,
				ecode: "VehicleCompulsoryIns",
				selIdx: 1
			},
			VehicleTax: {
				amount: -1,
				ecode: "VehicleTax",
				selIdx: 1
			},
			NcfVehicleDemageIns: {
				amount: -1,
				ecode: "NcfVehicleDemageIns",
				selIdx: 1
			},
			NcfThirdPartyIns: {
				amount: -1,
				ecode: "NcfThirdPartyIns",
				selIdx: 1
			},
			NcfTheftIns: {
				amount: -1,
				ecode: "NcfTheftIns",
				selIdx: 1
			},
			NcfDriverIns: {
				amount: -1,
				ecode: "NcfDriverIns",
				selIdx: 1
			},
			NcfPassengerIns: {
				amount: -1,
				ecode: "NcfPassengerIns",
				selIdx: 1
			} 
		} 
		};
	}else{
		dealOffer.suite = {
		"mustInsureSameTime": true,
		"suiteDefUrl": "/suiteDef/default",
		"items": {
			VehicleDemageIns: {
				amount: -1,
				ecode: "VehicleDemageIns",
				selIdx: 1
			},
			ThirdPartyIns: {
				amount: 1000000.0,
				ecode: "ThirdPartyIns",
				selIdx: 7
			},
			TheftIns: {
				amount: -1,
				ecode: "TheftIns",
				selIdx: 1
			},
			DriverIns: {
				amount: 10000.0,
				ecode: "DriverIns",
				selIdx: 2
			},
			PassengerIns: {
				amount: 10000.0,
				ecode: "PassengerIns",
				selIdx: 2
			},
			GlassIns: {
				amount: -1,
				ecode: "GlassIns",
				selIdx: 1
			},
			CombustionIns: {
				amount: -1,
				ecode: "CombustionIns",
				selIdx: 1
			},
			ScratchIns: {
				amount: 5000,
				ecode: "ScratchIns",
				selIdx: 2
			},
			WadingIns: {
				amount: -1,
				ecode: "WadingIns",
				selIdx: 1
			},
			SpecifyingPlantCla: {
				amount: -1,
				ecode: "SpecifyingPlantCla",
				selIdx: 1
			},
			VehicleCompulsoryIns: {
				amount: -1,
				ecode: "VehicleCompulsoryIns",
				selIdx: 1
			},
			VehicleTax: {
				amount: -1,
				ecode: "VehicleTax",
				selIdx: 1
			},
			NcfVehicleDemageIns: {
				amount: -1,
				ecode: "NcfVehicleDemageIns",
				selIdx: 1
			},
			NcfThirdPartyIns: {
				amount: -1,
				ecode: "NcfThirdPartyIns",
				selIdx: 1
			},
			NcfTheftIns: {
				amount: -1,
				ecode: "NcfTheftIns",
				selIdx: 1
			},
			NcfDriverIns: {
				amount: -1,
				ecode: "NcfDriverIns",
				selIdx: 1
			},
			NcfPassengerIns: {
				amount: -1,
				ecode: "NcfPassengerIns",
				selIdx: 1
			},
			NcfCombustionIns: {
				amount: -1,
				ecode: "NcfCombustionIns",
				selIdx: 1
			},
			NcfScratchIns: {
				amount: -1,
				ecode: "NcfScratchIns",
				selIdx: 1
			},
			NcfWadingIns: {
				amount: -1,
				ecode: "NcfWadingIns",
				selIdx: 1
			}

		} 
		};
	}
	dealOffer.carInfo = {
		"firstRegDate": $("#firstRegDate").val()+":00.000",
		"bwCode": carInfoJson.bwCode, 
		"price": carInfoJson.price,
		"plateNum": $(".number-first strong").html()+$.trim($("#plateNo").val()), 
		"displacement": carInfoJson.displacement,
		"carModelName": carInfoJson.carModelName,
		"engineNum": "DFGHUO46",
		"vin": "ASDFQWE35790VBCZF" 
	} ;
	dealOffer.carOwnerInfo = {"personName": "霍有胜"};
	postData.dealOffer = dealOffer;   
	$.ajax({
		url:'/yangchebao-weixin-ws/ws/0.1/qunabao/quote',
		type:'post',
		dataType:'json',
		data:$.toJSON(postData),
		async:false,
		contentType:'application/json;charset=utf-8',
		success:function(data){ 
			queryCount = 0;
		    query(data); 
		},error:function(xhr){
			var mes = eval('('+xhr.responseText+')');  
			//alertTasat(mes[0].message); 
			alert(mes[0].message);  
			 
		} 
	});  
 } 
function query(data){  
	var postData = data;
	queryCount++;
	if(queryCount>100){ 
		$(".load-bar #wait").show(); 
		$(".load-bar").addClass("remove");
		$(".load-bar #i0").hide();  
		$(".load-bar p").html("报价公司太多啦<br>请稍后再试");   
		return false;
	}
	$.ajax({
		url:'/yangchebao-weixin-ws/ws/0.1/qunabao/queryQunabaoChargeVo',
		type:'post',
		dataType:'json',
		data:$.toJSON(postData),
		async:false,
		contentType:'application/json;charset=utf-8', 
		success:function(data){
			if(data.name==undefined||data.bizCharge==undefined){
				setTimeout(function(){
					query(postData);
				},200);  
			}else{ 
				//paramJson.isHaveDate="yes";
				$(".load-bar").hide(); 
				paramJson.company=data.name;
				paramJson.bizCharge=data.bizCharge; 
				addRecord();
			}			
		} 
	}); 
} 
// 初始化品牌列表 
function getBrandList(){ 
	$.ajax({
		url:'/yangchebao-app-ws/ws/0.1/insure/carmodel/filter',
		async:false,
		type:'get',
		dataType:'json',
		contentType:'application/json;charset=utf-8',
		success:function(data){
			var brandStr='';
			var letterJson={};
			"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(function(key,i){
				letterJson[key]=''
			});
			$.each(data,function(key,val){
				letterJson[key]+='<li>'
								+'<div class="brand-letter" id="'+key+'">'+key+'</div>';
				val.forEach(function(brandName,i){
					letterJson[key]+='<div class="brand-detail">'
									+'<p>'+brandName+'</p>'
									+'</div>'
				});
				letterJson[key]+='</li>'
			});
			$.each(letterJson,function(key,val){
				brandStr+=val
			});
			$('ul.allBrands-ul').html(brandStr);
			$('article.allBrands-letters').show();
			$('article.allBrands').css({'height':window.innerHeight,'overflow':'auto'});
			$('p.allBrands-letters-p span').unbind('click').bind('click',function(){
				var _id=$(this).html();
				$('article.allBrands').scrollTop($('div#'+_id).position().top+1)
			});
			$('ul.allBrands-ul li div.brand-detail p').unbind('click').bind('click',function(){
					getModel($(this).html());
			});
		}
	}) 
} 

function getModel(brandName){
		$(".brand-page").hide();
	    $(".model-page").show();
		$('div.carModel-detail').html("");
		// 初始化车系列表
		$.ajax({
			url:'/yangchebao-app-ws/ws/0.1/insure/carmodel/getModelList?brandName='+brandName,
			type:'get',
			dataType:'json',
			asncy:false,
			contentType:'application/json;charset=utf-8',
			success:function(data){
				var modelStr='';
				data.forEach(function(key,i){
					modelStr+='<p>'+key+'</p>'
				});
				$('div.carModel-detail').html(modelStr);
				$('ul.allModels-ul li div.carModel-detail p').unbind('click').bind('click',function(){
					$(".model-page").hide();
					$(".carInfo-page").show();
					getCarInfo(brandName,$(this).html()); 
				});
			}
		});
	}
	function getCarInfo(brandName,familyName){ 
	    $(".carInfo-page .loadResult").html("");
		$(".carInfo-page .isAutoMatic").html('<p>手/自动挡</p><img src="css/images/selectModel_icon.png">');
		$(".carInfo-page .gasDisplayment").html('<p class="unSelect">排气量</p>');
		$(".carInfo-page .modelYear").html('<p class="unSelect">年款</p>');
		// 选择汽车信息
		$('div.isAutoMatic').unbind('click').bind('click',function(){
			$('div.overLay').show();
			$('article.selectItems').show();
			
			// 获取手自动挡选项，显示手自动挡
			$.ajax({
				url:'/yangchebao-app-ws/ws/0.1/insure/carmodel/getGearList?brandName='+brandName+'&familyName='+familyName,
				type:'get',
				dataType:'json',
				contentType:'application/json;charset=utf-8',
				success:function(data){
					var selectItemOne_str='';
					data.forEach(function(key,i){
						selectItemOne_str+='<li id="'+key.gearBoxType+'">'
										  +'<span class="span-wraper"><span class="span-item">'+key.gearBox+'</span></span>'
										  +'</li>'
					});
					$('div.selectItemOne ul.selectItems-ul').html(selectItemOne_str).css({'max-height':'255px','overflow':'auto'});;
					// 控制选项框在底部
					var itemHeight=$('div.selectItemOne').outerHeight();
					$('article.selectItems').css('bottom',-itemHeight);

					$('div.selectItemOne').show().siblings().hide();
					// 选项框从下向上滑出 
					$('article.selectItems').animate({'bottom':0},500,function(){
						var scrollTop=$(window).scrollTop();
						var _windowHeight=$(window).height();
						var scrollHeight=scrollTop+_windowHeight;
						window.scrollTo(0,scrollHeight);
					})
					 
					// 添加选择对勾
					$('ul.selectItems-ul').on('click','li',function(){
						if($(this).find('img').length==0){
							$(this).addClass('selectedItem').find('span.span-wraper').append('<img src="css/images/checked_img.png">');
							$(this).siblings().removeClass('selectedItem').find('img').remove()
						}
					});
				}
			}); 
			
			// 点击下一步
			$('div.selectItemOne p.nextStop').unbind('click').bind('click',function(){
					var selectLi_id1=$('div.selectItemOne ul.selectItems-ul li.selectedItem').attr('id');
					if(!selectLi_id1){
						return false
					}
					$.ajax({
						url:'/yangchebao-app-ws/ws/0.1/insure/carmodel/getDisplacementList?brandName='+brandName+'&familyName='+familyName+'&gearBox='+selectLi_id1,
						type:'get',
						async:false,
						dataType:'json',
						contentType:'application/json;charset=utf-8',
						success:function(data){
							var selectItemTwo_str='';
							data.forEach(function(key,i){
								selectItemTwo_str+='<li id="'+key+'">'
											     +'<span class="span-wraper"><span class="span-item">'+key+'</span></span>'
											     +'</li>'
							});
							$('div.selectItemTwo ul.selectItems-ul').html(selectItemTwo_str).css({'max-height':'255px','overflow':'auto'});
							$('div.selectItemTwo').show().siblings().hide()
						}
					});
					var selectedItem=$('div.selectItemOne ul.selectItems-ul li.selectedItem span.span-item').html();
					$('div.isAutoMatic img').remove();
					$('div.isAutoMatic span').remove();
					$('div.isAutoMatic').append('<span>'+selectedItem+'</span>');
					$('div.gasDisplayment p').removeClass('unSelect');
					if($('div.gasDisplayment span').length==0){
						$('div.gasDisplayment').find('img').remove();
						$('div.gasDisplayment').append('<img src="css/images/selectModel_icon.png">')
					}
					// 第二次点击下一步
					$('div.selectItemTwo p.nextStop').unbind('click').bind('click',function(){
						var selectLi_id2=$('div.selectItemTwo ul.selectItems-ul li.selectedItem').attr('id');
						if(!selectLi_id2){
							return false
						}
						$.ajax({
							url:'/yangchebao-app-ws/ws/0.1/insure/carmodel/getGroupList?brandName='+brandName+'&familyName='+familyName+'&gearBox='+selectLi_id1+'&displacement='+selectLi_id2,
							type:'get',
							async:false,
							dataType:'json',
							contentType:'application/json;charset=utf-8',
							success:function(data){
								var selectItemThree_str='';
								data.forEach(function(key,i){
									selectItemThree_str+='<li id="'+key.groupId+'">'
												     +'<span class="span-wraper"><span class="span-item">'+key.groupName+'</span></span>'
												     +'</li>'
								});
								$('div.selectItemThree ul.selectItems-ul').html(selectItemThree_str).css({'max-height':'255px','overflow':'auto'});;
								$('div.selectItemThree').show().siblings().hide()
							}
						});
						selectedItem=$('div.selectItemTwo ul.selectItems-ul li.selectedItem span.span-item').html();
						$('div.gasDisplayment img').remove();
						$('div.gasDisplayment span').remove();
						$('div.gasDisplayment').append('<span>'+selectedItem+'</span>');
						$('div.modelYear p').removeClass('unSelect');
						if($('div.modelYear span').length==0){
							$('div.modelYear').find('img').remove();
							$('div.modelYear').append('<img src="css/images/selectModel_icon.png">');
						}
						// 点击完成
						$('div.selectItemThree p.nextStop').unbind('click').bind('click',function(){
							var selectLi_id3=$('div.selectItemThree ul.selectItems-ul li.selectedItem').attr('id');
							if(!selectLi_id3){
								return false
							}
							selectedItem=$('div.selectItemThree ul.selectItems-ul li.selectedItem span.span-item').html();
							itemHeight=$('div.selectItemThree').outerHeight();
							$('div.modelYear').find('img').remove();
							$('div.modelYear').find('span').remove();
							$('div.modelYear').append('<span style="font-size:1rem;">'+selectedItem+'</span>');
							$('article.selectItems').animate({'bottom':-itemHeight},500);
							$('article.selectItems').hide();
							$('div.overLay').hide();
							$('div.carIfo-item').unbind('click');
							$('div.carIfo-item').css('cursor','default');
							
							$.ajax({
								url:'/yangchebao-app-ws/ws/0.1/insure/carmodel/getStandardList?brandName='+brandName+'&familyName='+familyName+'&gearBox='+selectLi_id1+'&displacement='+selectLi_id2+'&groupId='+selectLi_id3,
								type:'get',
								async:false,
								dataType:'json',
								contentType:'application/json;charset=utf-8',
								beforeSend:function(){ 
									$('div.loading').show(); 
								},
								success:function(data){
									var carStyle_str='<ul>';
									data.forEach(function(key,i){
										carStyle_str+='<li>'
											     	+'<img src="css/images/car_unchecked.png" class="loadResult_img">'
											     	+'<div class="carDetail">'
											     	+'<p class="carStyle" data-bwCode="'+key.vehicleCode+'" data-carModelName="'+key.standardName+'" data-price="'+key.price+'" data-displacement="'+key.displacement+'" data-marketYear="'+key.configureName+'" data-taxPrice="'+key.taxPrice+'">'+key.aliasName+' '+key.groupName+' '+key.displacementTag+' '+key.gearBoxName+' '+key.seat+'座</p>'
											     	+'<p class="carPrice">参考价：'+key.price+'元</p>'
											     	+'</div>'
											     	+'</li>'
									});
									carStyle_str+='</ul>'; 
									$('div.loading').hide();
									$('div.loadResult').html(carStyle_str).show();
									$('div.loadResult ul li img').unbind('click').bind('click',function(){
										if($(this).attr('src')=='css/images/car_unchecked.png'){
											$(this).attr('src','css/images/car_checked.png').parent().siblings().find('img').attr('src','css/images/car_unchecked.png')
										}
									});
									$('div.sureBtn').unbind('click').bind('click',function(){
										if($('div.loadResult ul li img[src="css/images/car_checked.png"]').length!=1){
											return false
										}
										var postData={};
										var $pCarstyle=$('div.loadResult ul li img[src="css/images/car_checked.png"]').closest('li').find('p.carStyle');  
										carInfoJson.bwCode = $pCarstyle.attr('data-bwCode');
										//carInfoJson.bwCode = "RCAAKD0098"; 
										carInfoJson.carModelName = $pCarstyle.attr('data-carModelName'); 
										carInfoJson.price = $pCarstyle.attr('data-price'); 
										carInfoJson.displacement = $pCarstyle.attr('data-displacement'); 
										carInfoJson.marketYear = $pCarstyle.attr('data-marketYear'); 
										carInfoJson.taxPrice = $pCarstyle.attr('data-taxPrice');   
										$(".carInfo-page").hide();
										$(".main-wrap").show();
										$(".carCheckBtn").val($pCarstyle.html());
									});
								}
							})
						});
						$('div.selectItemThree p.preStep').unbind('click').bind('click',function(){
							$('div.selectItemTwo').show().siblings().hide()
						})
					});
					//点击上一步 
					$('div.selectItemTwo p.preStep').unbind('click').bind('click',function(){
						$('div.selectItemOne').show().siblings().hide()
					});
			});
		});  
	} 
	function toQuery(){ 
		var path =  "http://"+window.location.host+"/yangchebao-weixin-ws/insurance/"; 	 
		setTimeout(function(){  
		   window.location.href = path+"query.html?openid="+paramJson.openid;
		},100); 
	}