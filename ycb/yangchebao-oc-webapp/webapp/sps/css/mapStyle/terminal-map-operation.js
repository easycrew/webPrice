$(document).ready(function() {
	$('.spanBtn').click();
    var windowHeight = $(window).height();
    $('.mapArea').height(windowHeight - 230);
    var divWraper = $('#terminal-position-wraper');
    var rightContent = $('.mapRightContent:visible',divWraper);
    var leftContent = $('.mapLeftContent:visible',divWraper);
    rightContent.height(windowHeight * 1/2);
    leftContent.parents('.urlContentWraper').css('height','');
    leftContent.height(windowHeight-160);
    $('.listContent').height(windowHeight - 355);
    var mapTool = new mapToolV3();
    mapTool.setToolbarPos(370, 10);
    var markerArea = null;
    var appkey = "560920733";
    var clusterMarker = null;
    var areaCode = "";
    var clientId = "";
    var errorCallback = function(xhr) {
        var status = xhr.status;
        if (status == 408) {
            $.carsmart.common.message.alert('请求超时请稍后再试', 'error');
        };
        if (status == 502) {
            $.carsmart.common.message.alert('网关超时请稍后再试', 'error');
        } else {
            var response = xhr.responseText;
            try {
                response = eval('(' + response + ')');
                $.carsmart.common.message.alert(response[0].message, 'error');
            } catch(e) {
                $.carsmart.common.message.alert('请求错误', 'error');
            }
        };
        $('.mapPositionNumber').hide();
        $('.overcurtainDiv').hide();
    }
   
    //获取卡终端列表
    function getSimInfo(queryParam, successFunc) {
        var queryParam = queryParam || [];
        //获取部门
        var department = $('.departmentSelect:visible',divWraper);
        var departmentId = department.attr("id");
        var departmentName = department.attr('name');
        if (departmentId) {
            queryParam.push(departmentName + "=" + departmentId);
        }
        //获取类型
        var bindTypeSelect = $('.bindTypeSelect:visible');
        var name = bindTypeSelect.attr('name');
        var value = bindTypeSelect.attr('value');
        if (name) {
            queryParam.push(name + "=" + value);
        }

        //获取在线与否
        var onlineState = $('.onlineState:visible input[type=checkbox]:checked');
        if (onlineState.length > 0) {
            var name = onlineState.attr('name');
            queryParam.push(name + "=" + "1");
        }
        //获取文本输入框值
        var value = $('.searchInput input').val();
        if (value) {
            var name = "inputStr";
            queryParam.push(name + "=" + value);
        }
        queryParam.push("areaCode="+areaCode)
        var url = "/client-ws/ws/0.1/clientBinding/getSimInfo?" + queryParam.join('&') + "&clientId=" + clientId;
        var success = function(data) {
            if (successFunc) {
                successFunc(data);
            } else {
                showSimList(data);
            }
        };

        getMethodRequest(url, success, errorCallback, false);
    };
    var getTraceHistory = function(id, pageIndex) {
        var id = id;
        var startTime = $('#startTime').val();
        var endTime = $('#endTime').val();
        var data = {
            pageindex : pageIndex,
            pagesize : 20,
            bean : {
                simNumber : id,
                startTime : startTime,
                stopTime : endTime
            }
        };
        var url = "/datatransform-ws/ws/0.1/locuRelation/page";
        var success = function(data) {
            var page = data.page + 1;
            var totalPage = data.totalPages;
            var items = data.items;
            var length = items.length;
            var i = 0;
            var htmlWraper = [];
            if (length > 0) {
                for (i; i < length; i++) {
                    var item = items[i];
                    var startTime = item.startTimeStr;
                    var endTime = item.stopTimeStr;
                    var coordinates = item.coordinates;
                    var pointsLen = coordinates.length;
                    var j = 0;
                    var pointArr = [];
                    for (j; j < pointsLen; j++) {
                        var point = coordinates[j];
                        pointArr.push(point.longitude + "," + point.latitude);
                    }
                    var simNumber = item.simNumber;
                    var className = "";
                    if (i % 2 == 0) {
                        className = "evenRow";
                    }
                    var html = '<tr coordinate="' + pointArr.join(";") + '" class="' + className + '"><td>' + simNumber + '</td><td>' + startTime + '到' + endTime + '</td></tr>';
                    htmlWraper.push(html);
                }
                $('#traceList tbody',divWraper).html(htmlWraper.join(''));
                $('.pageShow', rightContent).html(page);
                $('.totalPage', rightContent).html("-" + totalPage);
                $('.prePage', rightContent).unbind('click').click(function() {
                    var page = $('.pageShow', rightContent).html();
                    page = parseInt(page);
                    if (page == 1) {
                        return false;
                    } else {
                        var type = $('input[name=fence]:checked',divWraper).val();
                        $('.pageShow', rightContent).html(page - 1);
                        getTraceHistory(id, page - 2);
                    }

                });
                $('.nextPage', rightContent).unbind('click').click(function() {
                    var page = $('.pageShow', rightContent).html();
                    var total = $('.totalPage', rightContent).html();
                    page = parseInt(page) + 1;
                    if (page <= Math.abs(parseInt(total))) {
                        getTraceHistory(id, page - 1);
                    };
                });
                $('#traceList tbody tr',divWraper).click(function() {
                    var self = $(this);
                    $('#traceList tbody tr',divWraper).removeClass('trSelect');
                    self.addClass('trSelect');
                    var coordinate = self.attr('coordinate');
                    var coordinates = coordinate.split(";");
                    mapTool.clearMap();
                    mapTool.getHostroyTrace(coordinates);
                    mapTool.startMove();
                });
            } else {
                $('.pageShow', rightContent).html(0);
                $('.totalPage', rightContent).html("-" + 0);
            }

        }
        postMethodRequestWithData(url, data, success, errorCallback, true);
    }
    //创建轨迹回放方法
    var bulidTraceHtml = function(id,title) {
        var content = $('.rightcontent', rightContent);
        var mainContent = $('.maincontent', rightContent);
        var footer = $('.footer',rightContent);
        content.html('');
        footer.html('');
        mainContent.html('');
        $('.title', rightContent).html(title);
        content.append('<div class="dateWrap"><div class="mg10"><span>开始时间:</span><input type="text" class="Wdate commonInput" id="startTime" onfocus="WdatePicker({startDate:\'%y-%M-%d\',skin:\'ext\',dateFmt:\'yyyy-MM-dd\',maxDate:\'#F{$dp.$D(\\\'endTime\\\')}\',alwaysUseStartDate:true})"></div><div class="mg10"><span>结束时间:</span><input type="text" class="Wdate commonInput" id="endTime" onfocus="WdatePicker({startDate:\'%y-%M-%d\',skin:\'ext\',dateFmt:\'yyyy-MM-dd\',minDate:\'#F{$dp.$D(\\\'startTime\\\')}\',alwaysUseStartDate:true})"></div><div style="text-align:center"><input type="button" value="轨迹查询" id="getHistoryPosition"></div><div class="clear"></div></div>');
        content.append('<table id="traceList" class="tableNoneBorder"><thead> <tr class="theadBg"><th>SIM卡号</th><th>定位时间段</th> </tr></thead><tbody></tbody></table>');
        content.append('<div class="footerContent mg10"><p class="pageShow">0</p><p class="totalPage">-0</p><span class="smallLeftBtn prePage" title="上一页"> </span><span class="smallRightBtn nextPage" title="下一页"> </span></div>')
        $('#getHistoryPosition',divWraper).unbind().click(function() {
            getTraceHistory(id, 0);
        });
    };
    var terminalInfo = function(name,phone,id,locateTime,address){
        var html = [];
        html.push('<tr>');
        html.push('<td>名称</td>');
        html.push('<td><span>' + name+ '</span></td>');
        html.push('</tr>');
        html.push('<tr>');
        html.push('<td>电话</td>');
        html.push('<td><span>' + (phone || "") + '</span></td>');
        html.push('</tr>');
        html.push('<tr>');
        html.push('<td>北斗卡ID</td>');
        html.push('<td><span>' + id + '</span></td>');
        html.push('</tr>');
        html.push('<tr>');
        html.push('<td>定位时间</td>');
        html.push('<td><span>' + locateTime + '</span></td>');
        html.push('</tr>');
        if(address){
            html.push('<tr>');
            html.push('<td>地点</td>');
            html.push('<td><span>' + address + '</span></td>');
            html.push('</tr>');
        }
        return html;
    }
    //创建结果显示
    function bulidListHtml(json){
    	var htmlText = [];
    	var statesClassName = "Offline";
        var favoriteClass = "favorited"
        var title = "取消关注";
        var id = json.simNumber;
        var online = json.isOnline;
        var isAttention = json.isAttention;
        var phone = json.bindPhone || "";
        var name = json.bindName;
        var dpName = json.dpName;
        var type = json.bindType;
        var typeName = getMarkerType(type);
        var locateTime = json.locateTime;
        var position = json.position;
        htmlText.push('<li id="' + id + '">');
        if (online == "1") {
            statesClassName = "Online"
        }
        if (isAttention == "0") {
            favoriteClass = "unfavorited";
            title = "关注"
        }
        var markerState = typeName + statesClassName + "Icon";
        htmlText.push('<input type="checkbox" class="fl mt10" id="' + id + '" />')
        htmlText.push('<div class="fl ' + markerState + '"></div>');
        htmlText.push('<div class="fl">');
        htmlText.push('<p>名称:<b class="bindName">' + name + '</b></p>');
        htmlText.push('<p>时间:<label class="locateTime">' + locateTime + '</label></p>')
        if(dpName){
        	 htmlText.push('<p>部门:' + dpName + '</p>');
        }
        if(phone){
        	htmlText.push('<p>电话:<b class="bindPhone">' + phone + '</b></p>')
        }
        htmlText.push('</div>');
        htmlText.push('<div class="clear"> </div>');
        htmlText.push(' <p class="terminalOperation"><span class="mr10 spanAnchor favorImg" name="favorite" status="' + favoriteClass + '" title="' + title + '"></span><span class="mr10 spanAnchor positionImg" name="getPosition" title="定位"></span><span class="mr10 spanAnchor traceImg" name="getTrace" title="轨迹回放"></span><span class="mr10 spanAnchor settingImg" name="warningSet" title="告警设置"></span><span class="mr10 spanAnchor messageImg" name="sendMessage" title="发短报文"></span><div class="clear"></div><div class="clear"> </div></p>');
        htmlText.push('</li>');
        return htmlText;
    }
    //处理分页按钮
    function bulidFooter(jsons,callfunc){
    	 var page = jsons.page;
         var totalPages = jsons.totalPages;
        $('.footerContent .pageShow', leftContent).html(page + 1);
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
    //创建marker
    function bulidMarker(data,hide){
        var position = data.position;
        var id = data.simNumber;
        var name = data.bindName;
        var phone = data.bindPhone;
        var locateTime = data.locateTime;
        var type = data.bindType;
        var address = data.address;
        var isAttention = data.isAttention;
        var markerClass = getBindTypeByCode(type);
        var html = terminalInfo(name,phone,id,locateTime,address);
        var favoriteClass = "favorited"
        var title = "取消关注";
        if (isAttention == "0") {
            favoriteClass = "unfavorited";
            title = "关注"
        }
        html.push('<tr>');
        html.push('<td colspan="2"><div style="margin: 0 auto; width: 300px;" class="terminalOperation">');
        html.push('<div class="button-left fl"><span class="favoriteOperation" status= "'+favoriteClass+'"  name="favorite" title="'+title+'"></span></div>');
        html.push('<div class="button-middle  fl"><span class="positionOperation" title="定位" name="message"></span></div>');
        html.push('<div class="button-middle  fl"><span class="traceOperation" title="轨迹回放" name="trace"></span></div>');
        html.push('<div class="button-right fl"><span class="messageOperation" title="短报文" name="shortMessage"></span></div><div class="clear"></div></div></td>')
        html.push('</tr>');
        var mapPop = bulidMapPop(id,html);
        var info = $(mapPop)
        info.find(".favoriteOperation").click(function(){
            var self = $(this);
            var status = self.attr('status');
            if (status == "favorited") {
                cacedlAttention(id);
            } else {
                setAttention(id);
            }
        });
        info.find(".positionOperation").click(function(){
            bulidPositionHtml(data);
        });
        info.find(".traceOperation").click(function(){
            var title = '轨迹查询'+'  '+name;
            bulidTraceHtml(id,title);
            showArea(rightContent, 'right');
        });
        info.find(".messageOperation").click(function(){
            showEnterMessage(id,phone);
        });
       var marker =  mapTool.addMarker(position,id,{
            markerClass:markerClass,
            autoPan:true,
            content: info[0],
            width : 100,
            height : 100,
            custom:true,
            hide:hide
        });
        mapTool.bindEventById(id,'mouseover',function(obj){
            obj.info.open(mapTool.getMap(), obj.getPosition());
            var height = $('#marker_'+id).height()+25;
            var width = $('#marker_'+id).width();
            obj.info.setOffset(new MMap.Pixel(-width/2,-height));
            $('#marker_'+id).show();
        });
        return marker;
    }
    //显示卡终端列表
    function showSimList(data) {
        var jsons = data;
        if ( typeof data == "string") {
            jsons = eval("(" + data + ")");
        };
        var htmlText = [];
        $(".terminalList:visible",divWraper).empty();
        if (jsons.count > 0) {
            var i = 0;
            for (; i < jsons.count; i++) {
                var json = jsons.items[i];
                htmlText.push(bulidListHtml(json).join(''));
                try{
                    bulidMarker(json);
                }catch(e){
                    
                }
               
            }
            mapTool.setFitView();
            bulidFooter(jsons,function(page){
                var queryParm = [];
                var  functionChose = $('.functionChose-sel',divWraper);
                var name = functionChose.attr('name');
                if (name == "favorite") {
                    queryParm.push('isAttention=1');
                };
                queryParm.push("pageindex="+page)
                queryParm.push("pagesize=10");
                getSimInfo(queryParm);
            });
            $(".terminalList:visible",divWraper).html(htmlText.join(''));
            $(".terminalList:visible li").each(function(index){
                var self = $(this);
                $.data(self[0],'values',jsons.items[index]);
            })
            $(".terminalList:visible li",divWraper).unbind().click(function(){
                var self = $(this);
                var data = $.data(self[0],'values');
                mapTool.clearMap();
                bulidMarker(data);
            });
        } else {
        	$('.footerContent',leftContent).hide();
            $('.footerContent .pageShow', leftContent).html("0");
            $('.footerContent .totalPage', leftContent).html("- 0");
        }

    };
    //获取部门
    var getDepartmentByClientId = function() {
        var url = "/client-ws/ws/0.1/clientDepartment/example";
        var data = {
            clientId : clientId
        };
        var success = function(data) {
            var length = data.length;
            var i = 0;
            var dl = $('.departmentContainer dl',divWraper).html('');
            if (length > 0) {
                for (; i < length; i++) {
                    var item = data[i];
                    var name = item.name;
                    var id = item.id;
                    var parentId = item.parentId;
                    if (parentId == null) {
                        var dt = $('#dt_' + id);
                        if (dt.length == 0) {
                            var html = '<dt id="dt_' + id + '"><span class="spanAnchor" name="departmentId" id="' + id + '">' + name + '</span></dt><dd id="dd_' + id + '"></dd><div class="clear"></div>';
                            dl.append(html);
                        } else {
                            $('span', dt).html(name);
                        }
                    } else {
                        var dt = $('#dt_' + parentId);
                        if (dt.length == 0) {
                            var html = '<dt id="dt_' + parentId + '"><span class="spanAnchor" name="departmentId" id="' + parentId + '"></span></dt><dd id="dd_' + parentId + '"><div class="spanAnchor" name="departmentId" id="' + id + '">' + name + '</div></dd><div class="clear"></div>';
                            dl.append(html);
                        } else {
                            var dd = $('#dd_' + parentId);
                            dd.append('<div class="spanAnchor" name="departmentId" id="' + id + '">' + name + '</div>');
                        }
                    }
                }
            }
        };
        postMethodRequestWithData(url, data, success, errorCallback, true);
    }
    //区域查询
    var getSimByOverlay = function(type,callfunc,extentParm) {
        var url = "/client-ws/ws/0.1/clientBinding/getSimInfo/byOverlay/nopaging";
        var paraData = {
            "clientId" : clientId,
            "areatype" : getCodeByType(type),
            "areacoordinates" : mapTool.getOverlayPositionByType(type).lnglats
        };
        $.extend(paraData,extentParm);
        var success = function(data) {
            var items = data.items;
            var length = items.length;
            var idArray = [];
            var i = 0;
            var phoneArray = [];
            var htmlText = [];
            $('.footerContent',leftContent).hide();
            for (; i < length; i++) {
                var item = items[i];
                if(i < 10){
                	 htmlText.push(bulidListHtml(item).join(''));
                };
                var bindPhone = item.bindPhone || "";
                $('.footerContent',leftContent).hide();
                var id = item.simNumber;
                idArray.push(id);
                phoneArray.push(bindPhone);
                bulidMarker(item);
            }
            $(".terminalList:visible").html(htmlText.join(''));
            $(".terminalList:visible li").each(function(index){
                var self = $(this);
                $.data(self[0],'values',items[index]);
            })
            if(callfunc){
            	if(items.length > 0){
            		callfunc(idArray,phoneArray);
            	}
            	
            }
        };
        postMethodRequestWithData(url, paraData, success, errorCallback, true);
    }
    //根据城市查询终端
    var getTerminalByCity = function(cityCode) {
        var code = cityCode;
        mapTool.setCity(code);
        var url = "/client-ws/ws/0.1/clientBinding/getSimInfo/byAreaCode?areaCode=" + code;
        $.ajax({
            url : url,
            dataType : 'json',
            type : 'get',
            success : function(data) {
            	 var items = data.items;
                 var length = items.length;
                 var i = 0;
                 var markers = [];
                 var htmlText = [];
                 var marker = null;
                 for (i; i < length; i++) {
                	 var item = items[i];
                     var id = item.simNumber;
                     var position = item.position;
                     var lnglat = position.split(",");
                     var pt = new MMap.LngLat(lnglat[0],lnglat[1]);
                     var bindType = getBindTypeByCode(item.bindType);
                     var bindName = item.bindName;
                     if(i < 10){
                         htmlText.push(bulidListHtml(item).join(''));
                         marker = bulidMarker(item);
                         markers.push(marker);
                     }else{
                         marker = bulidMarker(item,true)
                         markers.push(marker);
                     }
                 };
                 $(".terminalList:visible",divWraper).empty();
                 $(".terminalList:visible",divWraper).html(htmlText.join(''));
                 $(".terminalList:visible li").each(function(index){
                     var self = $(this);
                     $.data(self[0],'values',items[index]);
                 })
                 $('.terminalList:visible li',divWraper).unbind().click(function(){
                	 	var self = $(this);
                	 	var data = $.data(self[0],'values');
                        bulidMarker(data);
                 });
                 $('.footerContent', leftContent).hide();
                 clusterMarker =  new MarkerClusterer(mapTool.getMap(), markers);
            }
        });
    };
    
  //根据地图范围查询终端
    var getTerminalByBounds = function() {
            var area = mapTool.getBounds();
            var url = "/client-ws/ws/0.1/clientBinding/getSimInfo/byOverlay/nopaging"
            var data = {
                areaCoordinates : area,
                areatype:0
            }
            var success = function(data) {
             var items = data.items;
             var length = items.length;
             var i = 0;
             var markers = [];
             for (i; i < length; i++) {
                 var item = items[i];
                 var id = item.simNumber;
                 var position = item.position;
                 var lnglat = position.split(",");
                 var pt = new MMap.LngLat(lnglat[0],lnglat[1]);
                 var markerClass = getBindTypeByCode(type);
                 var marker = new MMap.Marker({position:pt, content:'<div class='+markerClass+'></div>',offset : new MMap.Pixel(-6,-17)});
                 markers.push(marker);
             }
             var map = mapTool.getMap();
            
             if(!clusterMarker){
                 clusterMarker =  new MarkerClusterer(map, markers);
             }else{
                 clusterMarker.addMarkers(markers);
             }
            };
           $.ajax({
                url : url,
                type : 'post',
                data : $.toJSON(data),
                contentType : 'application/json ;charset=utf-8',
                dataType : 'json',
                success : success,
                error : function(xhr) {
                    $.carsmart.common.message.alert('发送失败', 'error');
                }
            });
        };

    //获取围栏
    var getFence = function(url, callback) {
        var url = url+"&appkey="+appkey;
        $.ajax({
            url : url,
            dataType : 'json',
            async : false,
            cache:false,
            success : function(data) {
                if (callback) {
                    callback(data)
                } else {
                    var page = data.page + 1;
                    var totalPage = data.totalPages;
                    var items = data.items;
                    var length = data.items.length;
                    var i = 0;
                    var listHtml = new Array();
                    if (totalPage > 0) {
                        for (; i < length; i++) {
                            var item = items[i];
                            var id = item.id;
                            var efTypeName = item.efTypeName;
                            var efType = item.efType;
                            var efArea = item.efArea;
                            var efName = item.efName;
                            listHtml.push('<tr><td><input type="radio" name="fence" id="' + id + '" area="' + efArea + '" efType="' + efType + '"></td><td name="efName">' + efName + '</td></tr>');
                        }
                        $('.pageShow', rightContent).html(page);
                        $('.totalPage', rightContent).html("-" + totalPage);
                        $('#fenceList tbody',divWraper).html(listHtml.join(""));
                    } else {
                        $('#fenceList tbody',divWraper).html("");
                        $('.footerContnet',divWraper).hide();
                    }
                }

            }
        })
    };
    //动态创建告警右侧显示内容
    var bulidWarningContent = function(warningName) {
        var content = $('.maincontent', rightContent);
        var footer = $('.footer', rightContent);
        content.html('');
        if (warningName == "围栏告警") {
            content.append('<div class="mg10"><input type="radio" name="efType"  value="1">圆形<input type="radio" name="efType" value="0" checked="checked">矩形<input type="radio" name="efType" value="2">多边形</div>');
            content.append('<table id="fenceList" class="tableNoneBorder"><thead><tr class="theadBg"><th></th><th>围栏名称</th></tr></thead><tbody></tbody>');
            $('input[name=efType]').click(function() {
                var self = $(this);
                var value = self.val();
                var url = "/datatransform-ws/ws/0.1/overlay/query?efType=" + value + "&pageindex=0&pagesize=10&clientId=" + clientId;
                getFence(url);
            })
        } else {
            content.append('<table id="fenceList" class="tableNoneBorder"><thead><tr class="theadBg"><th></th><th>围栏名称</th></tr></thead><tbody></tbody>');
        }
        content.append('<div class="footerContnet mg10" style="text-align:right"><p class="pageShow">0</p><p class="totalPage">-0</p><span class="smallLeftBtn prePage mr10 ml10" title="上一页"></span><span class="smallRightBtn nextPage" title="下一页"></span></div>')
        $('.prePage', content).unbind('click').click(function() {
            var page = $('.pageShow', content).html();
            page = parseInt(page);
            if (page == 1) {
                return false;
            } else {
                var type = $('input[name=fence]:checked').val();
                $('.pageShow', content).html(page - 1);
                var url = "/datatransform-ws/ws/0.1/overlay/query?efType=" + type + "&pageindex=" + (page - 2) + "&pagesize=10&clientId=" + clientId;
                getFence(url);
            }

        });
        $('.nextPage', content).unbind('click').click(function() {
            var page = $('.pageShow', content).html();
            var total = $('.totalPage', content).html();
            page = parseInt(page) + 1;
            if (page <= Math.abs(parseInt(total))) {
                var type = $('input[name=fence]:checked').val();
                $('.pageShow', content).html(page);
                if (warningName == "移位告警") {
                    type = 4;
                }
                if (warningName == "偏航告警") {
                    type = 3;
                }
                var url = "/datatransform-ws/ws/0.1/overlay/query?efType=" + type + "&pageindex=" + (page - 1) + "&pagesize=10&clientId=" + clientId;
                getFence(url);
            };
        });
        footer.html('');
        if (warningName == "围栏告警") {
            footer.html('<div class="mt10 mb10">告警类型:<input type="radio" name="valveArea" value="0">进入 <input type="radio" name="alertType" value="1">离开</div>');
        }
        footer.append('<div class="mt10 mb10">告警次数:<input type="text" class="commonInput" id="alertCount" title="设置告警次数"></div>');
        footer.append('<div class="mt10 mb10">触发次数:<input type="text" class="commonInput" id="valueCount" title="设置满足告警条件的触发次数"></div>');
        if (warningName == "移位告警" || warningName == "偏航告警") {
            footer.append('<div class="mt10 mb10">报警范围:<input type="text" class="commonInput" id="valueLength" title="设置满足告警条件的最远距离 "></div>');
        }

        footer.append('<div style="text-align:center"><div class="orangeSubmit">提交</div></div>')
    };

    //点击发送短报文按钮
    var showEnterMessage = function(id,bindPhone) {
        var content = $('.rightcontent', rightContent);
        var mainContent = $('.maincontent', rightContent);
        var footer = $('.footer',rightContent);
        content.html('');
        footer.html('');
        mainContent.html('');
        var ul = $('.mapRightContent .rightcontent',divWraper);
        var footer = $('.mapRightContent .footer',divWraper).html("");
        $('.mapRightContent .title',divWraper).html('发送短报文');
        var id = id;
        var bindPhone = bindPhone;
        ul.html('<div><input type="radio" value="0" checked="true" name="messageTypeTerminal">发送短报文<input type="radio" value="1" name="messageTypeTerminal">发送短信</div><div class="mt10"><p style="margin:5px;float:left">收件人:</p><input type="text" value="" class="commonInput" id="contactTerminal"></div><div class="mt10"><p style="margin:5px;float:left">内容:</p><textarea style="width:290px;height:100px;margin:0px" id="shortContentTerminal"></textarea></div><div style="text-align:center"><input type="button" value="发送" id="sendShortMessageTerminal"></div>')
        $('#contactTerminal',divWraper).val(id);
        showArea(rightContent, 'right');
        $('input[name=messageTypeTerminal]',divWraper).click(function(){
        	var value = $(this).val();
        	if(value == "1"){
        		$('#contactTerminal').val(bindPhone);
        	}else{
        		$('#contactTerminal').val(id);
        	}
        });
        //发送短报文
        $('#sendShortMessageTerminal').click(function() {
            var receiver = $('#contactTerminal').val();
            var sendDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            var content = $('#shortContentTerminal').val();
            var messageType = $('input[name=messageTypeTerminal]:checked').val();
            if(messageType == "0"){
            	sendMessageBrach(receiver, sendDate, content);
            }else{
            	sendTextBrach(receiver,content);
            }
            
        });
        return true;

    };
    //发动短信
    var sendTextBrach = function(receiver, content) {
        var url = "/beidou-ws/ws/0.1/sms/dispatchToSend";
        var postData = {
        		to  : receiver,
            content : content,
            clientId :clientId
        }
        $.ajax({
            url : url,
            type : 'post',
            data : $.toJSON(postData),
            contentType : 'application/json ;charset=utf-8',
            dataType : 'json',
            success : function(data) {
                $.carsmart.common.message.alert('发送成功', 'success');
                hideArea(rightContent, 'right');
                showArea(leftContent, 'left');
            },
            error : function(xhr) {
                $.carsmart.common.message.alert('发送失败', 'error');
            }
        });
    };
    //发动短报文
    var sendMessageBrach = function(receiver, sendDate, content) {
        var url = "/datatransform-ws/ws/0.1/datatransform/sendMessageBatch";
        var postData = {
            receiver : receiver,
            content : content,
            sendDate : sendDate
        }
        $.ajax({
            url : url,
            type : 'post',
            data : $.toJSON(postData),
            contentType : 'application/json ;charset=utf-8',
            dataType : 'json',
            success : function(data) {
                $.carsmart.common.message.alert('发送成功', 'success');
                hideArea(rightContent, 'right');
                showArea(leftContent, 'left');
            },
            error : function(xhr) {
                $.carsmart.common.message.alert('发送失败', 'error');
            }
        });
    };
   

    //获取位置
    var getPosition = function(id) {
        var url = "/datatransform-ws/ws/0.1/datatransform/applyLocateData?simNumber=" + id;
        var success = function(data) {
            var lnglat = data.longitude + "," + data.latitude;
            var locatetime = data.locatetime;
            mapTool.addMarker(lnglat, id, {
                autoPan : true
            });
            markerArea = lnglat;
            $('.overcurtainDiv').hide();
            $('.loadingWrap').hide();

        };
        $('.overcurtainDiv').show().css({
            'z-index' : 308,
            height : document.body.scrollHeight,
            opacity:0
        });
        $('.mapPositionNumber').show();
        hideArea(leftContent, 'left',function(){
            showHide.removeClass("smallLeftBtn").addClass("smallRightBtn");
            $('.citySet').css('left', '40px');
            $('.map_popup').css('left', '40px');
            mapTool.setToolbarPos(10, 10)
        });
        $.ajax({
            url : url,
            timeout : '240000',
            success : success,
            error : errorCallback
        });
    }
    //视野内搜索终端
    var getTerminalByView = function(terminalType,extentParm) {
        var area = mapTool.getBounds();
        var url = "/client-ws/ws/0.1/clientBinding/getSimInfo/byOverlay/nopaging"
        var data = {
            bindType : terminalType,
            areaCoordinates : area,
            areatype:0,
            clientId : clientId
        }
        $.extend(data,extentParm)
        var success = function(data) {
            showSimList(data);
            var items = data.items;
            var length = items.length;
            var i = 0;
            mapTool.clearMap();
            var htmlText = [];
            for (; i < length; i++) {
                var item = items[i];
                var id = item.simNumber;
                var bindName = item.bindName;
                var bindPhone = item.bindPhone || "";
                var position = item.position;
                var locateTime = item.locateTime;
                var address = item.address;
                if(i <  10){
                	 htmlText.push(bulidListHtml(item).join(''));
                }
                if (position) {
                    bulidMarker(item);
                }
                mapTool.setFitView();

            }
            $(".terminalList:visible").html(htmlText.join(''));
            $(".terminalList:visible li").each(function(index){
                var self = $(this);
                $.data(self[0],'values',items[index]);
            })
//            bulidFooter(data,function(page){
//            	var innerType = terminalType;
//            	var extentParm = {
//            			pageindex:page
//            	}
//            	getTerminalByView(innerType,extentParm);
//            })
            $('.footerContent',leftContent).hide();
        }
        postMethodRequestWithData(url, data, success, errorCallback);
    };
    var getCurrentPosition = function(id,liData){
        var url = "/datatransform-ws/ws/0.1/datatransform/applyNewLocate?simNumber="+id;
        var success = function(data){
            var longitude = data.longitude ;
            var latitude  = data.latitude ;
            var position = longitude + "," + latitude;
            data['position'] = position;
            $.extend(liData,data);
            if(longitude && latitude){
                mapTool.clearMap();
                bulidMarker(liData)
                mapTool.bindEventById(id,'mouseover',function(obj){
                    obj.info.open(mapTool.getMap(), obj.getPosition());
                    $('#marker_'+id).show();
                });
            }else{
                $.carsmart.common.message.alert('未查询到最新位置','error');
            }
            
        }
        $.ajax({
            url:url,
            dataType:'json',
            success:success
        })
    }
    var initWarningSetButton = function(liData){
        $('.title', rightContent).html('告警设置');
        var content = $('.rightcontent', rightContent);
        var mainContent = $('.maincontent', rightContent);
        var footer = $('.footer',rightContent);
        var html = '<div class="buttonArea"><div class="fl leewayWarning button-left">偏航告警</div>' + '<div class="fl shiftWarning button-middle">移位告警</div><div class="fl fenceWarning button-right">围栏告警</div><div class="clear"></div></div>';
        content.html('');
        mainContent.html('');
        footer.html('');
        content.html(html);
        showArea(rightContent, 'right');
        var id = liData.simNumber;
        //监听buttonArea按钮事件
        $('.leewayWarning',divWraper).unbind().click( function() {//偏航告警
            var self = $(this);
            self.addClass('button-left-select');
            var warningName = self.html();
            bulidWarningContent(warningName, id);
            $('.maincontent',rightContent).show();
            var url = "/datatransform-ws/ws/0.1/overlay/query?efType=3&pageindex=0&pagesize=10&clientId=" + clientId;
            getFence(url);
            var footer = $('.footer', rightContent);
            $('.orangeSubmit', footer).unbind('click');
            $('.orangeSubmit', footer).click(function() {
                var alertType = 2;
                var valueCount = $('#valueCount', footer).val();
                var alertCount = $('#alertCount', footer).val();
                var valueLength = $('#valueLength', footer).val();
                var checkradio = $('input[name=fence]:checked');
                if (checkradio.length == 0) {
                    $.carsmart.common.message.alert('请选择围栏', 'error');
                    return false;
                }
                var area = $(checkradio[0]).attr('area');
                var url = "/loctrace-ws/ws/0.1/terminalAlert/terminalAlertAdd";
                var data = {
                    alertType : alertType,
                    valveAlertDelayBuf : parseInt(valueCount, 10),
                    valveNoticeLimit : parseInt(alertCount, 10),
                    overlayType : 3,
                    valveLength : parseInt(valueLength, 10),
                    overlayPoints : area,
                    terminalId : id,
                    appId : appkey
                };
                var success = function() {
                    hideArea(rightContent, 'right');
                    showArea(leftContent, 'left');
                    mapTool.clearMap();
                };
                postMethodRequestWithData(url, data, success, errorCallback);
            });
            $('.shiftWarning').removeClass('button-middle-select');
            $('.fenceWarning').removeClass('button-right-select');
            showArea(rightContent, 'right');
            hideArea(leftContent, 'left',function(){
                showHide.removeClass("smallLeftBtn").addClass("smallRightBtn");
                $('.citySet').css('left', '40px');
                $('.map_popup').css('left', '40px');
                mapTool.setToolbarPos(10, 10)
            });
        });
        //移位告警
        $('.shiftWarning',divWraper).unbind().click( function() {
            var self = $(this);
            self.addClass('button-middle-select');
            $('.leewayWarning').removeClass('button-left-select');
            $('.fenceWarning').removeClass('button-right-select');
            getCurrentPosition(id,liData)
            var warningName = self.html();
            bulidWarningContent(warningName);
            $('.maincontent',rightContent).hide();
            var footer = $('.footer', rightContent);
            $('.orangeSubmit', footer).unbind('click');
            $('.orangeSubmit', footer).click(function() {
                var alertType = 2;
                var valveCount = $('#valveCount', footer).val();
                var alertCount = $('#alertCount', footer).val();
                var valueLength = $('#valueLength', footer).val();
                var url = "/datatransform-ws/ws/0.1/alertstrategy/add";
                var data = {
                    alertType : alertType,
                    valveAlertDelayBuf : parseInt(valueCount),
                    valveNoticeLimit : parseInt(alertCount),
                    overlayType : 4,
                    valveLength : parseInt(valueLength),
                    overlayPoints : area,
                    terminalId : id,
                    appId : appkey
                };
                var success = function() {
                    hideArea(rightContent, 'right');
                    showArea(leftContent, 'left');
                    mapTool.clearMap();
                };
                postMethodRequestWithData(url, data, success);
            });
            showArea(rightContent, 'right');
            hideArea(leftContent, 'left',function(){
                showHide.removeClass("smallLeftBtn").addClass("smallRightBtn");
                $('.citySet').css('left', '40px');
                $('.map_popup').css('left', '40px');
                mapTool.setToolbarPos(10, 10)
            });
        });
        //围栏告警
        $('.fenceWarning',divWraper).unbind().click( function() {
            var self = $(this);
            self.addClass('button-right-select');
            $('.leewayWarning').removeClass('button-left-select');
            $('.shiftWarning').removeClass('button-middle-select');
            var warningName = self.html();
            var footer = $('.footer', rightContent);
            bulidWarningContent(warningName);
            $('.maincontent',rightContent).show();
            var url = "/datatransform-ws/ws/0.1/overlay/query?efType=0&pageindex=0&pagesize=10&clientId=" + clientId;
            getFence(url);
            $('.orangeSubmit', footer).unbind('click');
            $('.orangeSubmit', footer).click(function() {
                var valueArea = $('input[name=valveArea]:checked', footer).val();
                var efType = $('input[name=efType]:checked', rightContent).val();
                var valveCount = $('#valueCount', footer).val();
                var alertCount = $('#alertCount', footer).val();
                var checkradio = $('input[name=fence]:checked');
                if (checkradio.length == 0) {
                    $.carsmart.common.message.alrt('请选择围栏', 'error');
                    return false;
                }
                var area = $(checkradio[0]).attr('area');
                var data = {
                    valveArea : parseInt(valueArea),
                    valveAlertDelayBuf : parseInt(valveCount),
                    alertType : 1,
                    overlayType : efType,
                    overlayPoints : area,
                    terminalId : id,
                    appId : appkey,
                    valveNoticeLimit : alertCount
                };
                var url = "/loctrace-ws/ws/0.1/terminalAlert/terminalAlertAdd";
                var success = function() {
                    hideArea(rightContent, 'right');
                    showArea(leftContent, 'left');
                    mapTool.clearMap();
                };
                postMethodRequestWithData(url, data, success, errorCallback)
            });
            showArea(rightContent, 'right');
            hideArea(leftContent, 'left',function(){
                showHide.removeClass("smallLeftBtn").addClass("smallRightBtn");
                $('.citySet').css('left', '40px');
                $('.map_popup').css('left', '40px');
                mapTool.setToolbarPos(10, 10)
            });
        });
    };
    var bulidPositionHtml = function(liData){
        $('.title', rightContent).html('发送定位');
        var content = $('.rightcontent', rightContent);
        var mainContent = $('.maincontent', rightContent);
        var id = liData.simNumber;
        var type = liData.bindType;
        var name = liData.name;
        var phone = liData.phone;
        var markerClass = getBindTypeByCode(type);
        var footer = $('.footer',rightContent);
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
                $.carsmart.common.message.alert('请输入定位次数', 'error');
                return false;
            };
            if (posTime == "" || posTime == null) {
                $.carsmart.common.message.alert('请输入定位时间间隔', 'error');
                return false;
            };
            if (parseInt(posNumber) > 1 && parseInt(posTime) < 50) {
                $.carsmart.common.message.alert('多次定位时间间隔不能小于50秒', 'error');
                return false;
            }
            posTime = parseInt(posTime);
            posNumber = parseInt(posNumber);
            var currentLngLat = "";
            var getRealPositoin = function() {
                $('.mapPositionNumber').html('正在进行第' +( i + 1) + '次定位').show();
                $.ajax({
                    url : "/datatransform-ws/ws/0.1/datatransform/applyLocateData?simNumber=" + id,
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
                        var html = terminalInfo(name,phone,id,locatetime);
                        var mapPop = bulidMapPop(id,html);
                        var position = {
                                content :mapPop,
                                autoPan:true,
                                width : 384,
                                height : 350,
                                custom:false,
                                markerClass:markerClass
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
            }
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
    }
    //根据点击按钮触发不同事件
    $('.terminalList .spanAnchor',divWraper).live('click', function() {
        var self = $(this);
        var name = self.attr('name');
        var width = leftContent.width();
        var parentLi = self.parents('li');
        var liData = $.data(parentLi[0],'values');
        var id = liData.simNumber;
        var bindPhone = liData.bindPhone;
        var content = $('.rightcontent', rightContent);
        var mainContent = $('.maincontent', rightContent);
        var footer = $('.footer',rightContent);
        if (name == "warningSet") {
            initWarningSetButton(liData);
        } else if (name == "sendMessage") {
            showEnterMessage(id,bindPhone);
        } else if (name == "getTrace") {
            var bindName = parentLi.find('.bindName').html();
            var title = '轨迹查询'+'  '+bindName;
            bulidTraceHtml(id,title);
            showArea(rightContent, 'right');
        } else if (name == "getPosition") {
            bulidPositionHtml(liData);

        } else if (name == "favorite") {
            var status = self.attr('status');
            if (status == "favorited") {
                cacedlAttention(id);
            } else {
                setAttention(id);
            }
        }

    });
  

    var efencType = {
        "0" : 'rectangle',
        "1" : 'circle',
        '2' : 'polygon',
        '3' : 'polyline',
        '4' : 'marker'
    };
    $('#fenceList input[name=fence]',divWraper).live('click', function() {
        var self = $(this);
        if (this.checked) {
            var area = self.attr('area');
            var efType = self.attr('efType') + "";
            efType = efencType[efType];
            mapTool.clearMap();
            mapTool.showArea(efType, area.split(";"));
        }

    });
    $(window).resize(function() {
    	var height = $(window).height();
    	leftContent.height(height - 200);
        $('.mapArea').height(height - 253);
        rightContent.height(height * 2 / 3);
        leftContent.height(windowHeight-160);
        $('.listContent').height(height - 355);
    });
    //设置鼠标工具
    $('.choosePanel',divWraper).find('li').click(function() {
        var self = $(this);
        var name = self.attr('name');
        mapTool.clearMap();
        mapTool.setArea(name, function(obj, e) {
            getSimByOverlay(name,function(data,phone){
            	showEnterMessage(data.join(","),phone.join(","))
            });
            
        });

    });
    $('.drawPanel',divWraper).find('li').click(function() {
        var self = $(this);
        var name = self.attr('name');
        mapTool.clearMap();
        mapTool.setArea(name);
    });
    $('.mapTools li',divWraper).click(function() {
        var self = $(this);
        var name = self.attr('name');
        if (name == "choose") {
            $('.choosePanel').show();
        } else if (name == "draw") {
            $('.drawPanel').show();
        } else {
            mapTool.setArea('Ruler');
        }
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
    //选择左侧Tab
    $('.functionChose',divWraper).click(function() {
        var queryParam = [];
        var self = $(this);
        var name = self.attr('name');
        if (!self.hasClass('noSelect')) {
            $('.functionChose-sel',divWraper).removeClass('functionChose-sel');
            self.addClass('functionChose-sel');
        };
        if (name == "allCategory") {
            getSimInfo();
        };
        if (name == "favorite") {
            queryParam.push('isAttention=1');
            getSimInfo(queryParam);
            $('.searchContent ',leftContent).slideUp();
        };
        if (name == "elementFence") {
        	 $('.searchContent ',leftContent).slideUp();
            var showElementFence = function(data) {

                var jsons = data;
                if ( typeof data == "string") {
                    jsons = eval("(" + data + ")");
                }
                var page = jsons.page;
                var totalPages = jsons.totalPages;
                var htmlText = [];
                $(".terminalList:visible",divWraper).empty();
                if (jsons.count > 0) {
                    var i = 0;
                    for (; i < jsons.count; i++) {
                        var json = jsons.items[i];
                        var id = json.id;
                        var efName = json.efName;
                        var efTypeName = json.efTypeName;
                        var area = json.efArea;
                        var efType = json.efType;
                        var type = getTypeByCode(efType);
                        htmlText.push('<li id="' + id + '" area="' + area + '" efType="' + efType + '">');
                        htmlText.push('<div class="fl">');
                        htmlText.push('<div><span class="'+type+'Img"></span><b>' + efName + '</b></div>');
                        htmlText.push('</div>');
                        htmlText.push('<div class="clear"> </div>');
                        htmlText.push('</li>');
                    }
                    $(".terminalList:visible",divWraper).html(htmlText.join(''));
                    $('.footerContent .pageShow', leftContent).html(page + 1);
                    $('.footerContent .totalPage', leftContent).html("-" + totalPages);
                    $('.prePage', leftContent).unbind('click').click(function() {
                        var page = $('.pageShow', leftContent).html();
                        page = parseInt(page);
                        if (page == 1) {
                            return false;
                        } else {
                            var type = $('input[name=fence]:checked').val();
                            $('.pageShow', leftContent).html(page - 1);
                            var url = "/datatransform-ws/ws/0.1/overlay/query?pageindex=" + (page - 2) + "&pagesize=10&clientId=" + clientId;
                            getFence(url, showElementFence);
                        }

                    });
                    $('.nextPage', leftContent).unbind('click').click(function() {
                        var page = $('.pageShow', leftContent).html();
                        var total = $('.totalPage', leftContent).html();
                        page = parseInt(page) + 1;
                        if (page <= Math.abs(parseInt(total))) {
                            var url = "/datatransform-ws/ws/0.1/overlay/query?pageindex=" + (page - 1) + "&pagesize=10&clientId=" + clientId;
                            getFence(url, showElementFence);
                        };
                    });
                    $(".terminalList:visible li",divWraper).unbind().click(function() {
                        var self = $(this);
                        var eftype = self.attr('efType');
                        eftype = getTypeByCode(eftype);
                        var area = self.attr('area');
                        mapTool.clearMap();
                        mapTool.showArea(eftype, area.split(";"));
                    });
                } else {
                    $('.footerContent .pageShow', leftContent).html("0");
                    $('.footerContent .totalPage', leftContent).html("- 0");
                }
            }
            var url = "/datatransform-ws/ws/0.1/overlay/query?pageindex=0&pagesize=10&region=1&clientId=" + clientId;
            getFence(url, showElementFence);
        }
    });
    //监听视野范围搜索
    $('.menCarBoat span',divWraper).click(function() {
        var self = $(this);
        var type = self.attr('value');
        $('.functionChose-sel:visible',divWraper).removeClass('functionChose-sel');
        $('.functionChose[name=allCategory]:visible',divWraper).addClass('functionChose-sel');
        $('.terminalList:visible',divWraper).html('');
        getTerminalByView(type);
    });
    //按照终端所属类型查询
    $('.buttonIcon:visible',divWraper).live('click',function() {
        var self = $(this);
        var siblings = self.siblings();
        var value = self.attr('value');
        var name = self.attr('name');
        $(siblings).each(function() {
            var className = $(this).attr('class');
            if (className.indexOf('select') != -1) {
                $(this).removeClass(className).addClass(className.split("-")[0]).removeClass('bindTypeSelect');
            }
        });
        var className = self.attr('class');
        if (className.indexOf('select') != -1) {
            return false;
        } else {
            self.removeClass(className).addClass(className + "-select").addClass('bindTypeSelect');
        };
        getSimInfo();
    });
    //打开视野内搜索
    $('.viewSearch:visible',divWraper).click(function() {
        var self = $(this);
        $('.menCarBoat', self).toggle();
    });
    //监听选中在线状态
    $('.onlineState input[type=checkbox]',divWraper).unbind().click(function() {
        getSimInfo();
    });
    //显示隐藏搜索区域
    $('.showSearchContent:visible',divWraper).click(function() {
        $('.searchContent').slideToggle();
    });
    //监听部门选择
    $('.departmentContainer:visible .spanAnchor',divWraper).die().live('click', function() {
        var self = $(this);
        $('.departmentContainer .spanAnchor',divWraper).removeClass('departmentSelect');
        self.addClass('departmentSelect');
        getSimInfo();
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
    //城市区划显示
    $('.citySet:visible',divWraper).click(function() {
        var self = $(this);
        var left = self.position().left;
        var top = self.position().top;
        mapTool.clearMap();
        $('.map_popup').css({
            left : left,
            top : top + 50
        });
    });
    //监听选中checkbox
    $('.terminalList:visible input[type=checkbox]',divWraper).live('click', function() {
        var self = $(this);
        var checked = $('.terminalList:visible input[type=checkbox]:checked');
        if (checked.length > 1) {
            $('.sendMessageBat').slideDown();
        } else if (checked.length == 0) {
            $('.sendMessageBat').slideUp();
        }
    });
    //监听点击批量发送按钮
    $('.sendMessageBat input[type=button]',divWraper).click(function() {
        var checked = $('.terminalList:visible input[type=checkbox]:checked');
        var $li = checked.parents('li');
        var length = $li.length;
        var i = 0;
        var id = [];
        var phoneArray = [];
        $li.each(function() {
            id.push($(this).attr("id"));
            var phone = $(this).find('.bindPhone').html();
            phoneArray.push(phone)
        });
        showEnterMessage(id.join(","),phoneArray.join(','));
    });
    //最大化地图
    $('.mapMaxZoom',divWraper).unbind().click(function() {
        $('span[name=slideHide]',divWraper).click();
        hideArea(rightContent, 'right');
        $('.spanBtn',divWraper).click();
    });
    //监听地图层级改变
    mapTool.bindEvent('map','zoomchange',function(mapObj){
    	var zoom = mapObj.getZoom();
    	if(zoom < 5){
    		getTerminalCount();
    	}
    });
    getSimInfo();
    getProvice();
    $('span[name=showLeft]',divWraper).click();
    $('.getTerminalCount',divWraper).live('click',function(){
    	getTerminalCount();
    	$('#cityList').hide();
    });
    $('.corporationList',divWraper).change(function(){
    	
    });
    var clientIdList = getClientId();
    $('#terminal_corpration_select',divWraper).customSelect(clientIdList);
    $('#terminal_corpration_select',divWraper).changeClick(function(value){
    	clientId = value;
    	if(value != ""){
    		$('.departmentContainer dl',divWraper).html('')
    		getDepartmentByClientId();
    	}else{
    		$('.departmentContainer:visible',divWraper).find('dl').html('');
    	}
    	getSimInfo();
    	
    });
    $('#_script_bmaplib_citylist_').remove();
  //创建CityList对象，并放在citylist_container节点内
    var myCl = new BMapLib.CityList({
    	container : "citylist_container"
    });
    // 给城市点击时，添加相关操作
    myCl.addEventListener("cityclick", function(e) {
    	var center = e.center;
    	mapTool.setCenter({lng:center.lat,lat:center.lng});
    	var name = e.name;
    	var code = city.ctn2c(name);
    	getTerminalByCity(code);
    	// 点击后隐藏城市列表
    	document.getElementById("cityList").style.display = "none";
    });
    // 给“更换城市”链接添加点击操作
    document.getElementById("curCityText").onclick = function() {
    	var cl = document.getElementById("cityList");
    	if (cl.style.display == "none") {
    		cl.style.display = "";
    	} else {
    		cl.style.display = "none";
    	}
    };
    // 给城市列表上的关闭按钮添加点击操作
    document.getElementById("popup_close").onclick = function() {
    	var cl = document.getElementById("cityList");
    	if (cl.style.display == "none") {
    		cl.style.display = "";
    	} else {
    		cl.style.display = "none";
    	}
    };
});

