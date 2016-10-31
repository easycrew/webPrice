/**
 * @author Stone
 */
function mapToolV3() {
    var self = this;
    var args = arguments;
    var $div = null;
    var options = null;
    if(args.length == 1){
    	if(typeof args[0] == "string"){
    		$div = args[0];
    	}else{
    		options = args[0];
    	}
    }else if(args.lenght == 2){
    	$div = args[0];
    	options = args[1];
    }
    var mapObj, toolbar, overview, scale, mousetool, polyEditor, circleEditor;
    var infoWindow = {};
    var mapId = $div || "map";
    this.setinterval = null;
    var iconArray = {};
    var opts = null;
    var initMap = function() {
        var opt = {
            level : 13,
            center : new MMap.LngLat(116.397428, 39.90923)
        }
        if(opts){
            $.extend(opt , opts);
            
        }
        mapObj = new MMap.Map(mapId, opt);
        mapObj.plugin(["MMap.ToolBar", "MMap.OverView", "MMap.Scale", "MMap.MouseTool"], function() {
            toolbar = new MMap.ToolBar();
            toolbar.autoPosition = false;
            toolbar.offset = new MMap.Pixel(options.toolbarOffsetx, options.toolbarOffsety);
            // 加载工具条
            mapObj.addControl(toolbar);
            overview = new MMap.OverView();
            // 加载鹰眼
            mapObj.addControl(overview);
            scale = new MMap.Scale();
            // 加载比例尺
            mapObj.addControl(scale);
            mousetool = new MMap.MouseTool(mapObj);
        });
        iconArray['default'] = new MMap.Icon({
            image : './css/v01/mapStyle/marker.png',
            size : new MMap.Size(12, 17),
            imageOffset : new MMap.Pixel(-6, -17)
        });
        iconArray['defaultHover'] = new MMap.Icon({
            image : './css/v01/mapStyle/markerHover.png',
            size : new MMap.Size(12, 17),
            imageOffset : new MMap.Pixel(-6, -17)
        });
        iconArray['markercar'] = new MMap.Icon({
            image : './css/v01/mapStyle/markerCar.png',
            size : new MMap.Size(22, 31),
            imageOffset : new MMap.Pixel(-11, -31)
        });
        iconArray['markercarHover'] = new MMap.Icon({
            image : './css/v01/mapStyle/markerCarHover.png',
            size : new MMap.Size(22, 31),
            imageOffset : new MMap.Pixel(-11, -31)
        });
        iconArray['markermen'] = new MMap.Icon({
            image : './css/v01/mapStyle/markerMen.png',
            size : new MMap.Size(22, 31),
            imageOffset : new MMap.Pixel(-11, -31)
        });
        iconArray['markermenHover'] = new MMap.Icon({
            image : './css/v01/mapStyle/markerCarHover.png',
            size : new MMap.Size(22, 31),
            imageOffset : new MMap.Pixel(-11, -31)
        });
        iconArray['markerboat'] = new MMap.Icon({
            image : './css/v01/mapStyle/markerBoat.png',
            size : new MMap.Size(22, 31),
            imageOffset : new MMap.Pixel(-11, -31)
        });
        iconArray['markerboatHover'] = new MMap.Icon({
            image : './css/v01/mapStyle/markerCarHover.png',
            size : new MMap.Size(22, 31),
            imageOffset : new MMap.Pixel(-11, -31)
        });
    };
    initMap();
    /***
     * 向地图增加点
     * @param {Object} lnglat
     * @param {Object} id
     * @param {Object} opt="{content:content,custom:true,otherAttr:otherAttr,autoPan:true,width:,height:}"
     */
    this.addMarker = function(lnglat, id, option) {
        var option = option || {};
        var lng = lnglat.split(",")[0];
        var lat = lnglat.split(",")[1];
        var lnglat = new MMap.LngLat(lng, lat);
        var markerClass = option.markerClass || 'defaultMarker';
        var opt = {
            id : id, // marker id
            position : lnglat, // 位置
            content:'<div class='+markerClass+'></div>',
            offset : new MMap.Pixel(0,0), // 相对于基点的偏移量
            draggable : false, // 可拖动
            zIndex : 10, // 点的叠加顺序
            cursor : "default", // 鼠标悬停时显示的光标
            visible : true, // 可见
            autoRotation : option.autoRotation || false
        };
        var marker = new MMap.Marker(opt);
        if (option.content) {
            var infoWindow = new MMap.InfoWindow({
                autoMove : true,
                content : option.content,
                isCustom : option.custom,
                offset : new MMap.Pixel(-(option.width/2),-(option.height))
            });
            var offset = infoWindow.getOffset();
            var markerOffset = marker.offset;
            marker.info = infoWindow;
        }
        if (option.otherAttr) {
            marker.customeAttr = opt.otherAttr;
        }
        mapObj.addOverlays(marker);
        if(option.hide){
            marker.hide();
        }
        if (option.autoPan) {
            mapObj.panTo(lnglat);
        }
        return marker;
    };
    /***
     * 修改marker ICON
     * @param {String} id: overlayId
     * @param {String} icon : icon url
     */
    this.changeMarkerIcon = function(id, icon) {
        var marker = mapObj.getOverlays(id);
        if (marker) {
            marker.setIcon(icon);
        };
        mapObj.updateOverlay(marker);
    }
    /***
     * 根据overlayId新增信息窗口到全局变量infoWindow
     * @param {Object} overlayId
     * @param {Object} custome
     * @param {Object} content
     */
    this.newInfoWindow = function(overlayId, custome, content) {
        var infowindow = new MMap.InfoWindow({
            autoMove : true
        });
        infowindow.setIsCustom(custome);
        infowindow.setContent(content);
        infoWindow[ovlerayId] = infowindow;
    };

    /**
     * 用于循环添加覆盖物时绑定infoWindow
     * @param {Object} overlay
     * @param {Object} content
     */
    this.bulidWindowOverlay = function(overlay, content) {
        var infowindow = new MMap.InfowWindow({
            autoMove : true
        });
        infowindow.setContent(content);
        mapObj.bind(overlay, 'click', function(e) {
            infowindow.open(e.lnglat);
        })
    }
    /**
     * 更新图标
     * @param {Object} id 图标的ID
     * @param {Object} {imageUrl 图片地址,lnglat}
     */
    this.updateMarker = function(id, option) {
        var marker = mapObj.getOverlays(id);
        if (option.imageUrl && option.pixelX && option.pixelY) {
            //var icon = new MMap.Icon({image:option.imageUrl,imageOffset:new MMap.Pixel(option.pixelX,option.pixelY)});
            marker.setIcon(option.imageUrl);
            marker.offset = new MMap.Pixel(option.pixelX, option.pixelY);
        }
        if (option.lnglat) {
            var lng = lnglat.split(",")[0];
            var lat = lnglat.split(",")[1];
            var lnglat = new MMap.LngLat(lng, lat);
            marker.setPosition(option.lnglat);
        }
        mapObj.updateOverlay(marker);
        return marker;
    };
    /**
     *更新线段
     * @param {Object} line 线对象
     * @param {Object} lnglat 坐标对象
     */
    this.updateLine = function(line, lnglat) {
        var path = line.getPath();
        path.push(lnglat);
        line.setPath(path);
        mapObj.updateOverlay(line);
    }
    /**
     * 实时定位处理
     * @param {String} lnglat 位置坐标字符串
     * @param {String} markerId Marker ID
     * @param {String} {content:content,custom:true,otherAttr:otherAttr,autoPan:true} 信息窗口内容(可选)
     */
    this.realTimePosition = function(lngLat, markerId, option) {
        var lng = lngLat.split(",")[0];
        var lat = lngLat.split(",")[1];
        var lnglat = new MMap.LngLat(lng, lat);
        var markerArr = [];
        var marker = mapObj.getOverlays(markerId);
        var line = mapObj.getOverlays(markerId + "line");
        if (!line) {
            var polyline = new MMap.Polyline({
                id : markerId + "line",
                path : markerArr,
                strokeColor : "#F00",
                strokeOpacity : 0.4,
                strokeWeight : 3,
                strokeDasharray : [10, 5]
            });
            //自定义构造MMap.Polyline对象
            mapObj.addOverlays(polyline);
            //加载折线覆盖物
        } else {
            this.updateLine(line, lnglat);
        }
        if (!marker) {
            marker = this.addMarker(lngLat, markerId, option);
            markerArr.push();
        } else {
            marker.moveTo(lnglat, 80);
            mapObj.bind(marker, 'moving', function(e) {
                if (marker.info) {
                    marker.info.setPosition(marker.getPosition());
                }
                mapObj.panTo(marker.getPosition());
            })
        }

    };
    /**
     * 停止实时定位
     */
    this.stopRealTime = function() {
        clearInterval(this.setinterval);
    };
    /**
     * 为overlay绑定事件
     * @param {String} overlayType 覆盖物类型
     * @param {String} eventName 事件名称
     * @param {Object} func 回调函数
     */
    this.bindEvent = function(overlayType, eventName, func) {
           var type = "marker,polyline,polygon,circle";
        if (type.indexOf(overlayType.toLowerCase()) == -1) {
            var isMap = "map"
            if(isMap.indexOf(overlayType.toLocaleLowerCase()) != -1){
                mapObj.bind(mapObj,eventName,function(e){
                    func(mapObj);
                });
                
            }
            return false;
        }else{
              var overlay = mapObj.getOverlaysByType(overlayType.toLowerCase());
              mapObj.bind(overlay[0], eventName, function(e) {
                  var obj = this.obj;
                  func(obj, e);
              })
        }
    };
    /**
     * 根据ID 绑定事件
     * @param {Object} id
     * @param {Object} eventName
     * @param {Object} func
     */
    this.bindEventById = function(id, eventName, func) {
        var overlay = mapObj.getOverlays(id);
        if (overlay) {
            mapObj.bind(overlay, eventName, function(e) {
                var obj = this.obj;
                var overlay = e.overlay;
                func(obj);
            })
        } 
    };
    /**
     * 清空地图操作
     */
    this.clearMap = function() {// 清空地图
        mapObj.clearMap();
    };
    /**
     * 设置鼠标工具为移动
     */
    this.setMouseMove = function() {
        mousetool.close();
    };
    /**
     * 根据传入的类型设置鼠标工具
     * @param {String} Areatype like "Polygon"
     * @param {Object} func 鼠标绘画成功后的回调函数
     */
    this.setArea = function(Areatype, func) {
        switch (Areatype) {
            case 'Polygon':
                mousetool.polygon();
                break;
            case 'Rectangle':
                mousetool.rectangle();
                break;
            case 'Circle':
                mousetool.circle();
                break;
            case 'Polyline':
                mousetool.polyline();
                break;
            case 'Marker':
                mousetool.marker();
                break;
            case 'Ruler':
                mousetool.rule();
                break;
            default:
                mousetool.close();
        }
        mapObj.bind(mousetool, "draw", function(e) {
            mousetool.close();
            if (func) {
                var obj = this.obj;
                func(obj, e);
            }
        });
    };
    /**
     * 根据覆盖物类型清空覆盖物
     * @param {String} overlayType
     */
    this.clearByType = function(overlayType) {
        var type = "marker,polyline,polygon,circle";
        if (type.indexOf(overlayType.toLowerCase()) == -1) {
            throw new Error("叠加物类型为" + type + "中的一个");
            return false;
        }
        mapObj.clearOverlaysByType(type);
    };

    /**
     * 添加线
     * @param markerArry
     * @returns
     */
    this.addLineOverlay = function(markerArry, id) {
        var polyline = new MMap.Polyline({
            id : id,
            path : markerArry, // 线经纬度数组
            editable : false, // 是否可编辑
            strokeColor : "#fe250a", // 线颜色
            strokeOpacity : 1, // 线透明度
            strokeWeight : 3, // 线宽
            strokeDasharray : [10, 5]// 补充线样式
        });
        mapObj.addOverlays(polyline);
        mapObj.setFitView();
        return polyline;
    };
    /**
     * 历史轨迹回放
     * @param {Array} markerArry
     */
   /**
     * 历史轨迹回放
     * 
     * @param {Array}
     *            markerArry
     */
    this.traceReplay = function(markerArry) {
        var length = markerArry.length;
        var array = new Array();
        for (var i = 0; i < length; i++) {
            var lng = markerArry[i].split(",")[0];
            var lat = markerArry[i].split(",")[1];
            var marker = mapObj.getOverlays('history');
            var lnglat = new MMap.LngLat(lng, lat);
            if (!marker) {
                marker = this.addMarker(markerArry[i], "history",{
                    markerClass:'traceCar'
                });
                marker.markerArry = new Array();
            } else {
                marker.markerArry.push(lnglat);
            }

            array.push(lnglat);
        }
        var lineid = "polylineHistory";
        var lineArr = this.addLineOverlay(array, lineid);
    };
    /**
     * 显示历史轨迹
     * 
     * @param {Array}
     *            markerArry
     * @param {String}
     *            content (可选)
     */
    this.getHistroyTrace = function(markerArry) {
        var length = markerArry.length;
        var array = new Array();
        var movemarker = null;
        for (var i = 0; i < length; i++) {
            var lng = markerArry[i].split(",")[0];
            var lat = markerArry[i].split(",")[1];
            var lnglat = new MMap.LngLat(lng, lat);
            if (i == 0) {
                    movemarker = new MMap.Marker({
                        id:"history",
                        offset:new MMap.Pixel(-28.5,-25),
                        autoRotation:true,
                        position:lnglat,
                        icon:"/smb/smb/css/mapStyle/car_03.png"
                    });
                    mapObj.addOverlays(movemarker);
                    movemarker.markerArry = new Array();
            } else {
                movemarker.markerArry.push(lnglat);
            }
             array.push(lnglat);
        }
        var lineid = "polylineHistory";
        var lineArr = this.addLineOverlay(array, lineid);
    }
    /**
     * 开始移动Marker
     */
    this.startMove = function() {
        var marker = mapObj.getOverlays("history");
        var markerArry = marker.markerArry;
        // for(var i = 1 ; i < markerArry.length;i++){
        //     marker.moveTo(markerArry[i],10);
        //     marker.setPosition(markerArry[i]);

        //  }
        marker.moveAlong(markerArry,200);
//        var i = 1;
//        mapObj.bind(marker, 'moveend', function() {
//            i = i + 1;
//            if (i < markerArry.length) {
//                marker.moveTo(markerArry[i], 80);
//            }
//        });
        mapObj.bind(marker, "moving", function(e) {
            var lnglat = marker.getPosition();
             var bounds = mapObj.getBounds(); 
            if(lnglat.lng <= bounds.southwest.lng || lnglat.lng>=bounds.northeast.lng || lnglat.lat<=bounds.southwest.lat || lnglat.lat>=bounds.northeast.lat){ 
  
            } 
        });
//        marker.moveTo(markerArry[i], 80);

    };
    this.stopMove = function(){
         var marker = mapObj.getOverlays("history");
         marker.stopMove() 
    }
    /**
     * 根据覆盖物Id获取覆盖物属性
     * @param {String} id
     */
    this.getOverlayProperty = function(id) {
        var obj = mapObj.getOverlays(id);
        var overlayType = obj._type;
        switch (overlayType) {
            case "marker":
                return {
                    'id' : obj.id,
                    'type' : obj._type,
                    'lnglats' : obj.lnglat
                }
                break;
            case "polyline":
                return {
                    'id' : obj.id,
                    'type' : obj._type,
                    'lnglats' : obj.getPath()
                }
                break;
            case "polygon":
                return {
                    'id' : obj.id,
                    'type' : obj._type,
                    'lnglats' : obj.getPath()
                }
                break;
            case "circle":
                return {
                    'id' : obj.id,
                    'type' : obj._type,
                    'lnglats' : obj.getCenter()
                }
            default:
                return null;
        }
    };
    /**
     * 根据传入的覆盖物类型设置鼠标编辑功能
     * @param {String} overlayType like "cricle","polygon"
     */
    this.openEditor = function(overlayType) {
        switch (overlayType) {
            case "cricle":
                circleEditor.open();
                break;
            case "polygon":
                polyEditor.open();
                break;
        }
    };
    /**
     * 关闭鼠标编辑功能
     * @param {String} overlayType
     * @param {Object} func 关闭鼠标编辑功能后的回调函数
     */
    this.closeEditor = function(overlayType, func) {
        switch (overlayType) {
            case "cricle":
                circleEditor.close();
                func();
                break;
            case "polygon":
                polyEditor.close();
                func();
                break;
        }
    }
    /**
     * 根据覆盖物类型返回覆盖物坐标
     * @param {String} type
     */
    this.getOverlayPositionByType = function(type) {
        var type = type.toLowerCase();
        if (type == "rectangle") {
            type = "polygon";
        }
        var overlay = mapObj.getOverlaysByType(type);
        var length = overlay.length;
        if (length > 0) {
            switch (type) {
                case "marker":
                    var lnglat = overlay[length - 1].getPosition();
                    var lng = lnglat.lng;
                    var lat = lnglat.lat;
                    var array = new Array();
                    array.push(lng + "," + lat);
                    return {
                        "lnglats" : array.join(";"),
                        "type" : type
                    }
                    break;
                case "polyline":
                case "polygon":
                    var array = new Array();
                    for (var j = 0; j < length; j++) {
                        var path = overlay[j].getPath();
                        if (path.length >= 4) {
                            for (var i = 0; i < path.length; i++) {
                                lineInfor = path[i].lng + "," + path[i].lat;
                                array.push(lineInfor);
                            }
                        }
                    }
                    return {
                        "lnglats" : array.join(";"),
                        "type" : type
                    }

                    break;
                case "circle":
                    var array = new Array();
                    var center = overlay[length - 1].getCenter();
                    lineInfor = center.lng + "," + center.lat;
                    array.push(lineInfor);
                    lineInfor = overlay[length - 1].getRadius();
                    array.push(lineInfor);
                    var bounds = overlay[length - 1].getBounds();
                    var bounds = bounds.southwest + ";" + bounds.northeast;
                    array.push(bounds);
                    return {
                        "lnglats" : array.join(";"),
                        "type" : type
                    }
                    break;
            }

        }
    };
    /**
     * 添加实时交通图
     */
    this.addTrafficLayer = function() {
        mapObj.clearOverlays();
        var Trafficlay = new MMap.TileLayer({
            tileSize : 256, //图像大小
            id : "traffic",
            getTileUrl : function(x, y, z) {
                return "http://tm.mapabc.com/trafficengine/mapabc/traffictile?v=1.0&t=1&zoom=" + (17 - z) + "&x=" + x + "&y=" + y;
            }
        });
        mapObj.addLayer(Trafficlay);
    };
    /**
     * 移出实时交通图
     */
    this.removeTrafficLayer = function() {
        mapObj.removeLayer("traffic");
    }
    /**
     * 根据类型显示覆盖物,并添加infoWindow
     * @param {String} type
     * @param {String} arra
     * @param {String} content
     */
    this.showArea = function(type, arra, content) {
        switch (type.toLowerCase()) {
            case "polygon":
            case "rectangle":
                var arr = new Array();
                if (type == "Rectangle" && arra.length == 2) {
                    var lnglat = arra[0].split(",");
                    var lnglat2 = arra[1].split(",");
                    arra.length = 0;
                    arra.push(lnglat.join(","));
                    arra.push(lnglat[0] + "," + lnglat2[1]);
                    arra.push(lnglat2.join(","));
                    arra.push(lnglat2[0] + "," + lnglat[1]);
                }
                for (var i = 0; i < arra.length; i++) {
                    var lnglat = arra[i].split(",");
                    arr.push(new MMap.LngLat(lnglat[0], lnglat[1]));
                }
                var opt = {
                    id : type + "01",
                    path : arr,
                    strokeColor : "#046788",
                    strokeOpacity : 0.6,
                    strokeWeight : 3,
                    fillColor : "#046788",
                    fillOpacity : 0.2
                };
                var polygon = new MMap.Polygon(opt);
                if (content) {
                    var window = new MMap.InfoWindow({
                        content : content,
                        isCustome : true,
                        autoMove : true
                    });
                    mapObj.bind(polygon, 'click', function(e) {
                        window.open(e.lnglat);
                    });
                }
                mapObj.addOverlays(polygon);
                //mapObj.panTo(arr[Math.floor(arr.length / 2)]);
                this.fixBounds(arr);
                mapObj.plugin(['MMap.PolyEditor'], function() {
                    polyEditor = new MMap.PolyEditor(mapObj, polygon);
                });
                break;
            case "circle":
                var radius = parseFloat(arra[1]);
                var opt = ( {
                    id : "circle01",
                    center : new MMap.LngLat(arra[0].split(",")[0], arra[0].split(",")[1]),
                    radius : radius,
                    strokeColor : "#046788",
                    strokeOpacity : 0.6,
                    strokeWeight : 3,
                    fillColor : "#046788",
                    fillOpacity : 0.2
                });
                var circle = new MMap.Circle(opt);
                mapObj.addOverlays(circle);
                mapObj.panTo(circle.getCenter());
                mapObj.plugin(['MMap.CircleEditor'], function() {
                    circleEditor = new MMap.CircleEditor(mapObj, circle);
                });
                break;
            case "marker":
                var arr = new Array();
                for (var i = 0; i < arra.length; i++) {
                    var marker = this.addMarker(arra[i], 'marker' + i, {
                        autoPan : true
                    });
                }
                break;
            case "polyline":
                var arr = new Array();
                for (var i = 0; i < arra.length; i++) {
                    var lnglat = arra[i].split(",");
                    arr.push(new MMap.LngLat(lnglat[0], lnglat[1]));
                }
                var opt = {
                    id : "polyline01",
                    path : arr,
                    strokeColor : "#F00",
                    strokeOpacity : 0.4,
                    strokeWeight : 3,
                    strokeStyle : "dashed",
                    strokeDasharray : [10, 5]
                };
                var Polyline = new MMap.Polyline(opt);
                mapObj.addOverlays(Polyline);
                //mapObj.panTo(arr[Math.floor(arr.length / 2)]);
                this.fixBounds(arr);
                break;
        }

    };
    
    this.fixBounds = function(arr) {
    	var min_lat = 0;
		var max_lat = 0;
		var min_lng = 0;
		var max_lng = 0;
		$.each(arr, function(index, val) {
			if (min_lat == 0) {
				min_lat = val.lat;
			}
			if (max_lat == 0) {
				max_lat = val.lat;
			}
			if (min_lng == 0) {
				min_lng = val.lng;
			}
			if (max_lng == 0) {
				max_lng = val.lng;
			}
			if (min_lat > val.lat) {
				min_lat = val.lat;
			}
			if (max_lat < val.lat) {
				max_lat = val.lat;
			}
			if (min_lng > val.lng) {
				min_lng = val.lng;
			}
			if (max_lng < val.lng) {
				max_lng = val.lng;
			}
		});
		var southwest = new MMap.LngLat(min_lng-5,min_lat-5);
		var northeast = new MMap.LngLat(max_lng+5,max_lat+5);
    	var bounds = new MMap.Bounds(southwest,northeast);
    	mapObj.setBounds(bounds);
    };
    /**
     * 多点规划路径
     * @param {Object} array
     * @param {Object} callback
     */
    this.roueSearchMultiPoi = function(array, callback) {
        var mrs = new MMap.RouteSearch();
        opt.per = 150;
        // 抽吸函数，表示在地图上画导航路径的关键点的个数,默认为150
        opt.routeType = 0;
        // 路径计算规则,0表示速度优先（默认）
        var arr = new Array();
        for (var i = 0; i < array.length; i++) {
            var mll = new MMap.LngLat(arry[i]);
            arr.push(mll);
        }

        var callback = callback ? callback : function(data) {
            switch (data.message) {
                case "ok":
                    var coors = [];
                    var segmengList = data.segmengList;
                    var listlength = segmengList.length;
                    for (var i = 0; i < listLength; i++) {
                        var coor = segmengList[i].coor;
                        coors.push(coor);
                    }
                    var coorArray = coors.split(",");
                    var lnglatArray = [];
                    var coorlength = coorArray.length;
                    if (coorArray[coorlength - 1] == "") {
                        coorArray.slice(0, coorlength - 1);
                    }
                    for (var i = 0; i < coorlength - 2; i = i + 2) {
                        lnglatArray.push(coorArray[i] + "," + coorArray[i + 1])
                    }
            }
        }
        mrs.getNaviPath(arr, callback);
    };
    /**
     * 根据IP获取省市ajax请求
     * @param {Object} ip
     * @param {Object} call_back
     */
    var getCityByIpLocal = function(ip, call_back) {
        var cityInfo = {};
        $.ajax({
            url : '/loc/ws/0.1/ip/locate?ip=' + ip,
            type : 'GET',
            datatype : 'JSON',
            success : function(data) {
                var city = data.city;
                if (city.indexOf("省") != -1) {// 包含省字段
                    var citySplit = city.split("省");
                    if (citySplit[1] == "") {// 不包含市或区字段
                        cityInfo.city = proviceCity.getCityByProvice(citySplit[0]);
                        call_back(cityInfo);
                        return null;
                    } else {// 包含市或区字段
                        var cityinfo = citySplit[1];
                        if (cityinfo.indexOf("市") != -1) {// 判断是否为市
                            cityInfo.city = cityinfo.split("市")[0];
                            call_back(cityInfo);
                            return null;
                        } else {

                        }
                        return
                    }
                } else {
                    var cityReg = new Array('新疆', '西藏', '广西', '宁夏', '内蒙古');
                    var index;
                    if (( index = haveArray(city, cityReg)) != -1) {// 包含新疆西藏广西
                        if (index == 4) {
                            if (city.substring(3).split("市")[0].indexOf("盟") != -1) {
                                var cityName = city.substring(3).split("市")[0];
                                cityInfo.city = cityName.substring(cityName.indexOf("盟") + 1);
                            } else {
                                cityInfo.city = city.substring(3).split("市")[0]
                            }
                        } else {
                            if (city.substring(2).split("市")[0].indexOf("州") != -1) {
                                var cityName = city.substring(2).split("市")[0];
                                cityInfo.city = cityName.substring(cityName.indexOf("州") + 1);
                            } else {
                                cityInfo.city = city.substring(2).split("市")[0];
                            }
                        }

                        call_back(cityInfo);
                    } else {
                        if (city.indexOf("局域网") != -1) {
                            cityInfo.city = "北京"
                            call_back(cityInfo);
                        } else {
                            cityInfo.city = city.split("市")[0];

                            call_back(cityInfo);
                        }

                        return null;
                    }

                }

            },
            error : function(xhtr) {
            }
        });
    };
    /**
     * 根据IP设置省市
     * @param {Object} ip
     */
    this.setCurrentCityByIp = function(ip) {

        getCityByIpLocal(ip, function(cityInfo) {
            if (cityInfo.city) {
                mapObj.setCity(cityInfo.city);
                $("#cityshow").html(cityInfo.city);
                $("#cityName").val(cityInfo.city);
                // 关键字提示用
            }
        })
    };
    /**
     * 根据城市名称,区县名称,省份名称,区号进行地图定位
     * @param {String} name
     * @param {Function} callback
     */
    this.setCity = function(name, callback) {
        if (callback) {
            mapObj.setCity(name, callback);
        } else {
            mapObj.setCity(name);
        }
    };
    /**
     * 开始实时定位
     * @param {Number} cycle 时间间隔
     * @param {Object} func 回调函数
     */
    this.startRealTime = function(cycle, func) {
        mapObj.clearMap();
        var time = parseInt(cycle) * 1000
        this.setinterval = setInterval(func, time);
    };
    this.getBounds = function() {
        var bounds = mapObj.getBounds();
        return bounds.southwest.lng + "," + bounds.southwest.lat + ";" + bounds.northeast.lng + "," + bounds.northeast.lat;
    };
    /**
     * 设置工具条位置
     * @param {Number} x
     * @param {Number} y
     */
    this.setToolbarPos = function(x, y) {
        var flag = false;
        if (toolbar) {
            toolbar.setOffset(new MMap.Pixel(x, y));
            flag = true;
        }
        return flag;
    }
    /***
     *移动地图中心到图标所在位置
     * @param {Marker}
     */
    this.mapPanto = function(overlay) {
        mapObj.panTo(overlay.getPosition());
    }
    this.setCenter = function(lnglat) {
        var lnglat = new MMap.LngLat(lnglat.lng, lnglat.lat);
        mapObj.setCenter(lnglat);
    }
    this.getIcon = function(type) {
        return iconArray.type;
    }
    this.getOverlayByType = function(type) {
        var overlays = mapObj.getOverlaysByType(type);
        return overlays;
    }
    this.getOverlaysById = function(id) {
        var overlay = mapObj.getOverlays(id);
        return overlay;
    }
    this.setFitView = function() {
        mapObj.setFitView();
    }
    this.getMap = function() {
        return mapObj;
    }
}
