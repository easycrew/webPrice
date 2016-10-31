
	var map = new BMap.Map("b_map");//在指定的容器内创建地图实例
	//map.setDefaultCursor("crosshair");//设置地图默认的鼠标指针样式
	map.enableScrollWheelZoom();//启用滚轮放大缩小，默认禁用。
	map.centerAndZoom(new BMap.Point(116.124878, 24.309178), 13);
	map.addControl(new BMap.NavigationControl()); 
	map.addEventListener("click", function(e){//地图单击事件
		document.getElementById("lonlat").value = e.point.lng + ", " + e.point.lat;
	});
	
    function iploac(result){//根据IP设置地图中心
    var cityName = result.name;
	    map.setCenter(cityName);
		}
	var myCity = new BMap.LocalCity();
		myCity.get(iploac);
	function sear(result){//地图搜索
		var local = new BMap.LocalSearch(map, {
	  		renderOptions:{map: map}
		});
		local.search(result);
	}