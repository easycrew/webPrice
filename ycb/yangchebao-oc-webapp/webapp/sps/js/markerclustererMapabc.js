//markercluster 2011/3  参考:
//http://hi.baidu.com/liongg/blog/item/23d381cbe88d17f752664f0e.html
//http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/
//http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/

//标记聚合器 类及其相关接口
function MarkerClusterer(map, opt_markers, opt_options) {
    this.map = map;

    this.markers = [];
    //所有marker数组
    this.clusters = [];
    //所有集合数组

    var options = opt_options || {};
    this.gridSize = options["gridSize"] || 60;
    this.minClusterSize = options["minClusterSize"] || 2;
    this.maxZoom = options["maxZoom"] || 13;
    this.averageCenter = false;
    if (options['averageCenter'] != undefined) {
        this.averageCenter = options['averageCenter'];
    }

    this.styles = options["styles"] || [];

    var that = this;
    this.map.bind(this.map, 'zoomchange', function() {
    	var zoom = that.map.getZoom();
    	if(zoom > 5){
    	        that._clearLastClusters();
                that._createClusters();
    	}
       
    })
    this.map.bind(this.map, "mapmove", function() {//监听地图移动
        that._clearLastClusters();
        that._createClusters();
    });

    if (opt_markers && opt_markers.length) {
        this.addMarkers(opt_markers, false);
    }

}

MarkerClusterer.prototype.addMarkers = function(markers, opt_noRedraw) {//添加坐标点到数组
    for (var i = 0; i < markers.length; i++) {
        this._pushMarkerTo(markers[i]);
    }
    if (!opt_noRedraw) {
        this._createClusters();
    }
};

MarkerClusterer.prototype._pushMarkerTo = function(marker) {//所有点默认为非集合
    marker.isInCluster = false;
    this.markers.push(marker);
    //Marker拖放后enableDragging不做变化，忽略
};

MarkerClusterer.prototype.addMarker = function(marker, opt_noRedraw) {//添加单个坐标
    this._pushMarkerTo(marker);
    if (!opt_noRedraw) {
        this._createClusters();
    }
};
//加一个，默认需要重绘的，除非显示声明不需要

MarkerClusterer.prototype._createClusters = function() {//创建聚合点
    var mapBounds = this.map.getBounds();
    var zoom = this.map.getZoom();
    //获取视野范围
    var extendedBounds = this.getExtendedBounds(mapBounds);
    for (var i = 0, marker; marker = this.markers[i]; i++) {
        var position = marker.getPosition();
        if (!marker.isInCluster && extendedBounds.containsPoint(marker.getPosition())) {// //全部一次性算完 稳定算法
            if(zoom < 14){
                this._addToClosestCluster(marker);
            }else{
                this.map.addOverlays(marker);
                marker.show();
            }
            
        }
    }
};

MarkerClusterer.prototype._addToClosestCluster = function(marker) {//创建聚合点
    var distance = 6000;
    //聚集最小距离4000像素
    var clusterToAddTo = null;
    var position = marker.getPosition();
    for (var i = 0, cluster; cluster = this.clusters[i]; i++) {
        var center = cluster.getCenter();
        //获取当前地图上所包含的cluster并判断当前新加点到cluster的中心点距离
        if (center) {
            var d = this.distanceBetweenPoints(center, marker.getPosition());
            if (d < distance) {
                distance = d;
                clusterToAddTo = cluster;
            }
        }
    }

    if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
    } else {
        var cluster = new Cluster(this);
        cluster.addMarker(marker);
        this.clusters.push(cluster);
    }
};

MarkerClusterer.prototype.distanceBetweenPoints = function(p1, p2) {//判断两点距离
    if (!p1 || !p2) {
        return 0;
    }

    var R = 6371;//地球半径？
    
    var dLat = (p2.lat - p1.lat) * Math.PI / 180;//?算的两个维度之间的弧度？
    
    var dLon = (p2.lng - p1.lng) * Math.PI / 180;//算的经度之间的弧度？
    
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};
//BMap的扩展

MarkerClusterer.prototype.getExtendedBounds = function(bounds) {
    this.cutBoundsInRange(bounds);
    var level = this.map.getZoom();
    var ne = new MMap.LngLat(bounds.northeast.lng, bounds.northeast.lat);
    var sw = new MMap.LngLat(bounds.southwest.lng, bounds.southwest.lat);
    var pixelNE = this.map.lnglatToPixel(ne, level);
    var pixelSW = this.map.lnglatToPixel(sw, level);

    pixelNE.x += this.gridSize;
    pixelNE.y -= this.gridSize;
    pixelSW.x -= this.gridSize;
    pixelSW.y += this.gridSize;

    var newNE = this.map.pixelToLngLat(pixelNE, level);
    var newSW = this.map.pixelToLngLat(pixelSW, level);
    return new MMap.Bounds(newSW, newNE);
};
MMap.Bounds.prototype.containsPoint = function(markerPoint) {
    var lng = markerPoint.lng;
    var lat = markerPoint.lat;
    var swlng = this.southwest.lng;
    var swlat = this.southwest.lat;
    var nelng = this.northeast.lng;
    var nelat = this.northeast.lat;
    return lng > swlng && lng < nelng && lat > swlat && lat < nelat;
}
//MMap.Map的扩展

MarkerClusterer.prototype.cutBoundsInRange = function(bounds) {
    bounds.northeast.lng = this.getRange(bounds.northeast.lng, -180, 180);
    bounds.southwest.lng = this.getRange(bounds.southwest.lng, -180, 180);
    bounds.northeast.lat = this.getRange(bounds.northeast.lat, -74, 74);
    bounds.southwest.lat = this.getRange(bounds.southwest.lat, -74, 74);
};
//MMap.Map的扩展

MarkerClusterer.prototype.getRange = function(i, mix, max) {
    if (mix != null) {
        i = Math.max(i, mix)
    }
    if (max != null) {
        i = Math.min(i, max)
    }
    return i;
};
//JS函数扩展

MarkerClusterer.prototype._clearLastClusters = function() {
    for (var i = 0, cluster; cluster = this.clusters[i]; i++) {
        cluster.remove();
    }
    this.clusters = [];
    this._removeMarkersFromCluster();
};

MarkerClusterer.prototype._removeMarkersFromCluster = function() {
    for (var i = 0, marker; marker = this.markers[i]; i++) {
        marker.isInCluster = false;
    }
};

MarkerClusterer.prototype._removeMarkersFromMap = function() {
    for (var i = 0, marker; marker = this.markers[i]; i++) {
        marker.isInCluster = false;
        this.map.removeOverlays(marker);
    }
};

MarkerClusterer.prototype._removeMarker = function(marker) {
    var index = -1;
    if (this.markers.indexOf) {
        index = this.markers.indexOf(marker);
    } else {
        for (var i = 0, m; m = this.markers[i]; i++) {
            if (m == marker) {
                index = i;
                break;
            }
        }
    }

    if (index == -1) {
        return false;
    }

    this.markers.splice(index, 1);
    return true;
};

MarkerClusterer.prototype.removeMarker = function(marker, opt_nodraw) {
    var removed = this._removeMarker(marker);
    if (!opt_nodraw && removed) {
        this._clearLastClusters();
        this._createClusters();
        return true;
    } else {
        return false;
    }
};
//删除一个Marker后，默认重绘，除非显示设置为true，不进行重绘。

MarkerClusterer.prototype.removeMarkers = function(markers, opt_nodraw) {
    var removed = false;
    for (var i = 0, marker; marker = markers[i]; i++) {
        var r = this._removeMarker(marker);
        removed = removed || r;
    }

    if (!opt_nodraw && removed) {
        this._clearLastClusters();
        this._createClusters();
        return true;
    }
};

MarkerClusterer.prototype.clearMarkers = function() {
    this._clearLastClusters();
    this._removeMarkersFromMap();
    this.markers = [];
};

//开放属性，设置后需调用 重绘接口
MarkerClusterer.prototype.getGridSize = function() {
    return this.gridSize;
};
MarkerClusterer.prototype.setGridSize = function(size) {
    this.gridSize = size;
};

MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
    this.maxZoom = maxZoom;
};
MarkerClusterer.prototype.getMaxZoom = function() {
    return this.maxZoom;
};

MarkerClusterer.prototype.setStyles = function(styles) {
    this.styles = styles;
};
MarkerClusterer.prototype.getStyles = function() {
    return this.styles;
};

MarkerClusterer.prototype.getMinClusterSize = function() {
    return this.minClusterSize;
};
MarkerClusterer.prototype.setMinClusterSize = function(size) {
    this.minClusterSize = size;
};

//为Cluster类提供一些方法

MarkerClusterer.prototype.isAverageCenter = function() {
    return this.averageCenter;
};

MarkerClusterer.prototype.getMap = function() {
    return this.map;
};

//为用户提供一些便利方法
MarkerClusterer.prototype.getMarkers = function() {
    return this.markers;
};

MarkerClusterer.prototype.getMarkersCount = function() {
    return this.markers.length;
};

MarkerClusterer.prototype.getClustersCount = function() {
    return this.clusters.length;
};

//..........................................
//Cluster类，包含聚合相关的所有marker.初始化一个聚合点到地图。
function Cluster(markerClusterer) {
    this.markerClusterer = markerClusterer;
    this.map = markerClusterer.getMap();
    this.minClusterSize = markerClusterer.getMinClusterSize();
    this.averageCenter = markerClusterer.isAverageCenter();
    this.center = null;
    this.markers = [];
    this.bounds = null;
    this.clusterMarker = new MMap.Marker({
        content : this.getStyle(this.markers.length),
        draggable : false,
        autoRotation : false,
        position : this.map.getCenter()
    })
    var that = this;
    this.map.addOverlays(this.clusterMarker);
    this.map.bind(this.clusterMarker,'click',function(){
        that.map.zoomIn();
    })
}

Cluster.prototype.addMarker = function(marker) {
    if (this.isMarkerInCluster(marker)) {
        return false;
    }//也可用marker.isInCluster判断,外面判断OK，这里基本不会命中

    if (!this.center) {
        this.center = marker.getPosition();
        this.calculateBounds();
    } else {
        if (this.averageCenter) {
            var l = this.markers.length + 1;
            var lat = (this.center.lat * (l - 1) + marker.getPosition().lat) / l;
            var lng = (this.center.lng * (l - 1) + marker.getPosition().lng) / l;
            this.center = new MMap.Point(lng, lat);
            this.calculateBounds();
        }//计算新的Center
    }

    marker.isInCluster = true;
    this.markers.push(marker);

    var len = this.markers.length;
    if (len < this.minClusterSize) {//判断新建聚合点是否已经添加到地图。如果没有c则添加.
        this.map.addOverlays(marker);
        this.map.bind(marker,'hover',function(){
            var type = marker.type;
            type = type.substring(0,1).toUpperCase(1)+type.substring(1);
            marker.setIcon('./css/v01/mapStyle/Marker'+ type +'.png');
            this.map.updateOverlay(marker);
        });
    }
    if (len == this.minClusterSize) {
        for (var i = 0; i < len; i++) {
            this.map.removeOverlays(this.markers[i]);
        }
    }
    if (len >= this.minClusterSize) {
        this.map.removeOverlays(marker);
    }

    this.updateClusterMarker();
    return true;
};
//可以加个标记的 marker.isInCluster = true;
Cluster.prototype.isMarkerInCluster = function(marker) {
    if (this.markers.indexOf) {
        return this.markers.indexOf(marker) != -1;
    } else {
        for (var i = 0, m; m = this.markers[i]; i++) {
            if (m == marker) {
                return true;
            }
        }
    }
    return false;
};
//JS函数扩展

Cluster.prototype.isMarkerInClusterBounds = function(marker) {
    return this.bounds.containsPoint(marker.getPosition());
};

Cluster.prototype.calculateBounds = function() {
    var sw = new MMap.LngLat(this.center.lng, this.center.lat);
    var ne = new MMap.LngLat(this.center.lng, this.center.lat)
    var bounds = new MMap.Bounds(sw, ne);
    this.bounds = this.markerClusterer.getExtendedBounds(bounds);
};

Cluster.prototype.updateClusterMarker = function() {
    if (this.map.getZoom() > this.markerClusterer.getMaxZoom()) {
        for (var i = 0, marker; marker = this.markers[i]; i++) {
            this.map.addOverlays(marker);
            marker.show();
        }
        return;
    }

    if (this.markers.length < this.minClusterSize) {
        this.clusterMarker.hide();
        return;
    }
    this.clusterMarker.setPosition(this.center);
    this.clusterMarker.setContent(this.getStyle(this.markers.length));
    this.clusterMarker.show();
    //this.map.setBounds(this.getBounds());
    //更新Bounds
};

Cluster.prototype.remove = function() {
    this.map.removeOverlays(this.clusterMarker);
    this.markers.length = 0;
    delete this.markers;
}
MMap.Bounds.prototype.extend = function(point) {
    var swLng = this.southwest.lng;
    var swLat = this.southwest.lat;
    var neLng = this.northeast.lng;
    var neLat = this.northeast.lat;
    var lng = point.lng;
    var lat = point.lat;
    if (!swLng || swLng > lng) {
        this.southwest.lng = lng
    }
    if(!neLng || neLng < lng){
        this.northeast.lng = lng;
    }
    if(!swLat || swLat > lat){
        this.southwest.lat = lat;
    }
    if(!neLat || neLat < lat){
        this.northeast.lat = lat;
    }
}
Cluster.prototype.getBounds = function() {
    var southwest = {
        lng : this.center.lng,
        lat : this.center.lat
    };
    var northeast = {
        lng : this.center.lng,
        lat : this.center.lat
    };
    var bounds = new MMap.Bounds(new MMap.LngLat(this.center.lng, this.center.lat), new MMap.LngLat(this.center.lng, this.center.lat));
    for (var i = 0, marker; marker = this.markers[i]; i++) {
        bounds.extend(marker.getPosition());
    }
    return bounds;
};

Cluster.prototype.getCenter = function() {
    return this.center;
};
Cluster.prototype.getStyle = function(text) {
    var length = (""+text).length;
    var content = "";
    switch(length-1) {
        case 0 :
            content = '<div class="m0Icon">' + text + '</div>';
            break;
        case 1 :
            content = '<div class="m1Icon">' + text + '</div>';
            break;
        case 2:
            content = '<div class="m2Icon">' + text + '</div>';
            break;
        case 3:
            content = '<div class="m3Icon">' + text + '</div>';
            break;
        case 4:
            content = '<div class="m4Icon">' + text + '</div>';
            break;
        default:
            content = '<div class="m0Icon">' + text + '</div>';
    }
    return content;
}
