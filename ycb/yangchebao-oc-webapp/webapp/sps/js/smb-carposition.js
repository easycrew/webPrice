$(document).ready(function(){
	 var GLOBAL_APPKEY = "carsmart1234512345";
    var windowHeight = $(window).height();
    $('.mapArea').height(windowHeight - 230);
    var divWraper = $('#terminal-position-wraper');
    var rightContent = $('.mapRightContent:visible',divWraper);
    var leftContent = $('.mapLeftContent:visible',divWraper);
    var satusObj = {"0":'空闲',"1":'在用'};
    var monitorObj = {"0":'关闭',"1":'开启'};
    rightContent.height(windowHeight * 1/2);
    leftContent.parents('.urlContentWraper').css('height','');
    leftContent.height(windowHeight-160);
    $('.listContent').height(windowHeight - 300);
    var mapTool = new mapToolV3({
    	toolbarOffsetx : 370,
    	toolbarOffsety : 10
    });
    var vehicleList = {};
    var markerArea = [];
	  var errorCallback = function(xhr) {
        var status = xhr.status;
        if (status == 408) {
            $.jRadAlert('请求超时请稍后再试', 'error',null,1500);
        };
        if (status == 502) {
            $.jRadAlert('网关超时请稍后再试', 'error',null,1500);
        } else {
            var response = xhr.responseText;
            try {
                response = eval('(' + response + ')');
                $.jRadAlert(response[0].message, 'error',null,1500);
            } catch(e) {
                $.jRadAlert('请求错误', 'error',null,1500);
            }
        };
        $('.mapPositionNumber').hide();
    };
    var getPositionById = function(id,licensePlate,autoPan){
        var url = "/carpervisor-ws/ws/0.1/runningstate/"+id;
        var success = function(data){
                     $('.mapPositionNumber').hide();
                    var html = [];
                    var id = data.vehicleId;
                    if(data.adaptedLongitude){
                        var position = data.adaptedLongitude +','+data.adaptedLatitude;
                        html.push('<tr>');
                        html.push('<td>车牌</td>');
                        html.push('<td><span>' +licensePlate + '</span></td>');
                        html.push('</tr>');
                        html.push('<tr>');
                        html.push('<td>时间</td>');
                        html.push('<td><span>' + data.receivedTime + '</span></td>');
                        html.push('</tr>');
                        html.push('<tr>');
                        html.push('<td>车速</td>');
                        html.push('<td><span>' + data.speed + '公里/小时</span></td>');
                        html.push('</tr>');
                        var mapPop = bulidMapPop(id,html);
                        var marker = mapTool.addMarker(position,id,{
                            content:mapPop,
                            width : 384,
                            height : 190,
                            custom:true,
                            markerClass:'markerCar',
                            autoPan:autoPan || false
                        });
                        markerArea.push(new MMap.LngLat(data.adaptedLongitude , data.adaptedLatitude));
                        mapTool.bindEventById(id,'mouseover',function(obj){
                            obj.info.open(mapTool.getMap(), obj.getPosition());
                        });
                         mapTool.bindEventById(id, 'click',
                            function(obj) {
                                mapTool.setFitView(obj);
                            });
                    }
                    
        };
        $.jRadGet({
            url:url,
            success:success,
            async: autoPan || false
        })
        
    };
        //处理分页按钮
    function bulidFooter(jsons,callfunc){
    	 var page = jsons.page;
         var totalPages = jsons.totalPages;
        $('.footerContent .pageShow', leftContent).html(page);
        $('.footerContent .totalPage', leftContent).html("-" + totalPages);
        $('.prePage', leftContent).unbind('click').click(function() {
            var page = $('.pageShow', leftContent).html();
            page = parseInt(page);
            if (page == 1) {
                return false;
            } else {
                var type = $('input[name=fence]:checked').val();
                $('.pageShow', leftContent).html(page - 1);
                var queryParam = [];
                var page = page - 2;
                callfunc(page);
            }

        });
        $('.nextPage', leftContent).unbind('click').click(function() {
            var page = $('.pageShow', leftContent).html();
            var total = $('.totalPage', leftContent).html();
            page = parseInt(page) + 1;
            if (page <= Math.abs(parseInt(total))) {
                var queryParam = [];
                var page =  page - 1;
                callfunc(page);
            };
        });
        $('.footerContent',leftContent).show();
    }
    //显示车辆列表
    var showCarList = function(data){
    		var htmlText = [];
    		var carStatus = data.lend_status;//车辆状态 
    		var carLicensePlate = data.license_plate;//车牌号码
    		var terminalId = data.terminal_id;//终端Id
    		var monitorStauts = data.monitored;//监控状态
    		var id = vehicleList[carLicensePlate];
    		htmlText.push('<li id="'+terminalId+'">');
    		htmlText.push('<div class="fl">');
            htmlText.push('<p>车牌号码:<b class="bindName">' + carLicensePlate + '</b></p>');
            htmlText.push('<p>车辆状态:<label class="locateTime">' + (satusObj[carStatus] || "空间") + '</label></p>');
            htmlText.push('<p>防盗状态:' + (monitorObj[monitorStauts] || "关闭")+ '</p>');
            htmlText.push('</div>');
            htmlText.push('<div class="clear"></div>');
            htmlText.push(' <div style="text-align:right"><button class="mr10 spanAnchor" name="getPosition" title="定位">定位</button><button class="mr10 spanAnchor traceImg" name="getTrace" title="轨迹回放">轨迹回放</button></div>');
    		htmlText.push('</li>');
    		getPositionById(id,carLicensePlate);
    		return htmlText.join(''); 
    };
    //获取车辆列表
    var getCarList = function(pageindex){
                mapTool.clearMap();
    			var carStatus = $('#carStatusSelect').select('val')+"";
    			var carId = $('#carIdAutoCompelte').autocomplete('val');
    			var data = {};
    			if(carId == "" || carId == null){
    			    data.license_plate = "";
    			}else{
    			    data.license_plate = carId+",eq";
    			}
    			if(carStatus == "" || carStatus == null){
                    data.lend_status = "";
                }else{
                    data.lend_status = carStatus+",eq";
                }
                data.pagesize = 10;
                data.pageindex = pageindex||0;
                markerArea.length = 0;
	    		var url = "/smb-ws/ws/0.1/smb/monitors";
	    		var result = $.jRadPost({
	    				url:url,
	    				error:errorCallback,
	    				data:data,
	    				contentType:'application/json;charset=utf-8',
	    				dataType:'json'
	    			});
	    			if(result){
	    				 var items = result.items;
			    		  var itemsLen = items.length;
			    		  var htmlText = new Array();
			    			if(itemsLen > 0){
			    			  		var i = 0 ;
			    			  		for(i ; i < itemsLen ; i++){
			    			  				var item = items[i];
			    			  				htmlText.push(showCarList(item));
			    			  			}
			    			  		$(".terminalList:visible",divWraper).html(htmlText.join(''));
						          $(".terminalList:visible li").each(function(index){
						                var self = $(this);
						                $.data(self[0],'values',result.items[index]);
						            });
						            bulidFooter(result,getCarList);
                                    if(markerArea.length > 0){
                                        mapTool.setFitView(markerArea);
                                    }
                                    
			    			  }
			    		
			    		
			    		
	    			}
    		 
    			
    };
    var getTraceHistory = function(id){
        var startTime = $('#startTime').val();
        var endTime =$('#endTime').val();
        var reciveTime = startTime+",GT;"+endTime+" 23:59:59,LT";
         $('.loadingWrap').html('正在查询轨迹');
        $('.mapPositionNumber').show();
        var url = "/carpervisor-ws/ws/0.1/rad/GpsDatas?include=vehicleId,vehicleId;receivedTime,time;adaptedLatitude,lat;adaptedLongitude,lng;speed&sortby=received_time&speed=1,GE&status=1,EQ&vehicleId="+id+"&receivedTime="+reciveTime;
        $.jRadGet({
            url : url,
            success:function(data){
                var i = 0;
                var length = data.length;
                var markerArray = [];
                 $('.mapPositionNumber').hide();
                if(length == 0){
                    $.jRadAlert('未查询到数据','error',null,1500);
                    return false;
                }
                for(i ; i < length ; i++){
                    var item = data[i];
                    var lng = item.lng;
                    var lat = item.lat;
                    markerArray.push(lng+","+lat);
                }
                 mapTool.getHistroyTrace(markerArray);
                 
            },
            async:true
        });
    };
   //创建轨迹回放方法
    var bulidTraceHtml = function(id,title) {
        var content = $('.rightcontent', rightContent);
        var mainContent = $('.maincontent', rightContent);
        var footer = $('.footer',rightContent);
        content.html('');
        footer.html('');
        mainContent.html('');
        $('.title', rightContent).html(title);
        content.append('<div class="dateWrap"><div class="mg10"><span>开始时间:</span><input type="text" class="Wdate" id="startTime" onfocus="WdatePicker({startDate:\'%y-%M-%d\',skin:\'ext\',dateFmt:\'yyyy-MM-dd\',maxDate:\'#F{$dp.$D(\\\'endTime\\\')}\',alwaysUseStartDate:true})"></div><div class="mg10"><span>结束时间:</span><input type="text" class="Wdate" id="endTime" onfocus="WdatePicker({startDate:\'%y-%M-%d\',skin:\'ext\',dateFmt:\'yyyy-MM-dd\',minDate:\'#F{$dp.$D(\\\'startTime\\\')}\',alwaysUseStartDate:true})"></div><div style="text-align:center"><input type="button" value="轨迹查询" id="getHistoryPosition"><input type="button" value="开始移动" id="getTraceStart"><input type="button" value="停止移动" id="stopTrace"></div><div class="clear"></div></div>');
        $('#getHistoryPosition',divWraper).unbind().click(function() {
            getTraceHistory(id);
        });
        $('#getTraceStart').click(function(){
            mapTool.startMove();
        });
        $('#stopTrace').click(function(){
            mapTool.stopMove();
        });
    };
    //创建定位html
    var bulidPositionHtml = function(liData){
        $('.title', rightContent).html('发送定位');
        var content = $('.rightcontent', rightContent);
        var mainContent = $('.maincontent', rightContent);
        var markerClass = "markerCar";
        var footer = $('.footer',rightContent);
        var carLicensePlate = liData.license_plate;//车牌号码
        var id = vehicleList[carLicensePlate];
        content.html('');
        mainContent.html('');
        footer.html('');
        content.html('<div class="dateWrap"><div class="mg10"><span>定位次数</span> <input type="text" placeholder="次数不能小于1" class="commonInput" id="posNumber"></div><div class="mg10"><span>定位频率 </span><input type="text" value="" placeholder="秒数不能小于50" class="commonInput" id="posTime"></div><div style="text-align: center;"><input type="button" id="getCurrentPosition" value="最近位置"><input type="button" id="getDynamicPosition" value="单次定位"></div></div></div>');
        showArea(rightContent, 'right');
        $('#getCurrentPosition').click(function(){
            getCurrentPosition(id,liData);
        });
        $('#getDynamicPosition').click(function() {
            var posNumber = $('#posNumber').val();
            var posTime = $('#posTime').val();
            var i = 0;
            if (posNumber == "" || posNumber == null || parseInt(posNumber) == 0) {
                $.jRadAlert('请输入定位次数', 'error',null,1500);
                return false;
            };
            if (posTime == "" || posTime == null) {
                $.jRadAlert('请输入定位时间间隔', 'error',null,1500);
                return false;
            };
            if (parseInt(posNumber) > 1 && parseInt(posTime) < 50) {
                $.jRadAlert('多次定位时间间隔不能小于50秒', 'error',null,1500);
                return false;
            }
            posTime = parseInt(posTime);
            posNumber = parseInt(posNumber);
            var currentLngLat = "";
            var getRealPositoin = function() {
                $('.mapPositionNumber').html('正在进行第' +( i + 1) + '次定位').show();
                $.ajax({
                    url : "/carpervisor-ws/ws/0.1/runningstate/" + id,
                    dataType : 'json',
                    success : function(data) {
                        var lng = data.longitude;
                        var lat = data.latitude;
                        var simNumber = data.simNumber;
                        var locatetime = data.locatetime;
                        var lnglat = [];
                        var lngLat = lng + "," + lat;
                        lnglat.push(lngLat);
                        if (i == 0) {
                            currentLngLat = lngLat;
                        } else {
                            if (currentLngLat == lngLat) {
                                return false;
                            }
                        }
                        i++;
                        
                        var position = {
                                autoPan:true,                              
                                markerClass:"markerCar"
                        }
                        if (lng) {
                            mapTool.realTimePosition(lngLat, simNumber, position);
                        };
                        if (i+1 >= posNumber) {
                            mapTool.stopRealTime();
                            $('.mapPositionNumber').hide();
                            return false;
                        };
                    },
                    error:errorCallback
                });
            };
            if (posNumber > 1) {
                getRealPositoin();
                mapTool.startRealTime(posTime, function() {
                    if (i > posNumber) {
                        mapTool.stopRealTime();
                        $('.mapPositionNumber').hide();
                        return false;

                        };
                        getRealPositoin()
                    });
                } else {
                    getPosition(id);
                }

        });
    };
   //根据点击按钮触发不同事件
    $('.terminalList .spanAnchor',divWraper).live('click', function(event) {
        var self = $(this);
        var name = self.attr('name');
        var width = leftContent.width();
        var parentLi = self.parents('li');
        var liData = $.data(parentLi[0],'values');
        var carStatus = liData.lend_status;//车辆状态 
    	var carLicensePlate = liData.license_plate;//车牌号码
    	var licenseId = vehicleList[carLicensePlate];
    	var terminalId = liData.terminalId;//终端Id
    	var monitorStauts = liData.monitored;//监控状态
        var content = $('.rightcontent', rightContent);
        var mainContent = $('.maincontent', rightContent);
        var footer = $('.footer',rightContent);
        mapTool.clearMap();
        if (name == "getTrace") {
            var bindName = parentLi.find('.bindName').html();
            var title = '轨迹查询'+'  '+carLicensePlate;
            bulidTraceHtml(licenseId,title);
            showArea(rightContent, 'right');
            hideArea(leftContent,'left');
        } else if (name == "getPosition") {
            $('.loadingWrap').html('正在定位');
            $('.mapPositionNumber').show();
            getPositionById(licenseId,carLicensePlate,true);
        } 
        $.jRadCancelPop(event);
    });
     //隐藏侧边栏
    $('span[name=slideHide]',divWraper).unbind().click(function() {
        var width = leftContent.width() + 5;
        leftContent.animate({
            "left" : -width
        }, 'slow', function() {
            $('.citySet').css('left', '40px');
            $('.map_popup').css('left', '40px');
            mapTool.setToolbarPos(10, 10);
        });
    });
    //显示侧边栏
    $('span[name=showLeft]',divWraper).unbind().click(function() {
        var width = leftContent.width() + 5;
        leftContent.animate({
            "left" : "0px"
        }, 'slow', function() {
            $('.citySet').css('left', '370px');
            $('.map_popup').css('left', '370px');
            mapTool.setToolbarPos(370, 10);
        });
        hideArea(rightContent, 'right');
    });
     //显示隐藏搜索区域
    $('.showSearchContent:visible',divWraper).click(function() {
        $('.searchContent').slideToggle();
    });
    //打开搜索输入框
    $('.magnifierIcon:visible',divWraper).live('click', function() {
        var searchInput = $('.searchInput');
        var parentDiv = $(this).parent('div');
        var left = searchInput.css('marginLeft').split('px')[0];
        if (left < 0) {
            searchInput.animate({
                'marginLeft' : 0
            }, 500, function() {
                parentDiv.css({
                    'marginLeft' : "-24px"
                })
                $('input', searchInput).focus();
            });
        } else {
            parentDiv.css({
                'marginLeft' : "0px"
            })
            searchInput.animate({
                'marginLeft' : -400
            }, 500);
        }
    });
    //监听搜索事件
    $('.searchInput input',divWraper).keydown(function(e) {
        if (e.keyCode == 13) {
            var self = $(this);
            var value = self.val();
            var queryParam = [];
            if (value == "" || value == null) {
                $.carsmart.common.message.alert('请输入查询条件', 'error');
                return false;
            } else {
                queryParam.push('inputStr=' + value);
                getSimInfo(queryParam);
            }
        }

    });
    //初始化车辆状态下拉框
    $('#carStatusSelect').select({data:[{id:'',name:'全部'},{id:0,name:'空闲'},{id:1,name:'在用'}]});
    $('#carIdAutoCompelte').autocomplete({
    		url:'/carpervisor-ws/ws/0.1/select/vehicle',
    		fl:'licensePlate',
    		displayField:'licensePlate',
    		valueField:'licensePlate',
    		query:$.fn.query_vehicle,
    		blur:function(){
    		    $('#carIdAutoCompelte').val('');
    		}
    	});
    $('#searchButton').button({
    		click:function(){
    		            $(".terminalList:visible",divWraper).html('');
    					getCarList();
    			}
    	});
    var getVehicleList = function(){
        var url = "/auto-ws/ws/0.1/auto/vehicle/list?domainId="+GLOBAL_APPKEY;
        var success = function(data){
            var i = 0 ;
            var len = data.length;
            for(i = 0 ; i < len ; i++){
                vehicleList[data[i].licensePlate] = data[i].id;
            };
            getCarList();
        };
        $.jRadGet({
                url:url,
                success:success,
                async:true
            })
    };
        getVehicleList();
});
