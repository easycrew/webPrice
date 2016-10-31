(function(window, undefined) {

	var Car = {};

	window.Car = Car;

	Car.url = function(method) {
		return "/website-ws/ws/0.1" + method;
	};

	// ************************* event **************************************
	var events = {};
	
	/**
	 * 
	 * @param  {[type]}   event
	 * @param  {Function} callback(data)
	 * @return {[type]}
	 */
	Car.on = function (event, callback) {

		if (!callback) {
			return;
		}
	
		if (!events[event])	{
			events[event] = [callback];
		}

		else {
			events[event].push(callback);
		}
	};

	Car.broadcast = function (event, data) {

		if (typeof event != "string") {
			console.error("event must be string");
			return;
		}

		console.log("Event[" + event + "]: ");
		console.log(data);

		var callbacks = events[event];
		if (!callbacks) {
			return;
		}

		for (var index in callbacks) {
			var callback = callbacks[index];
			if (typeof callback == "function") {
				callback(data);	
			}
		}
	};

	// ************************* task ******************************
	var tasks = {};

	Car.task = function (name, execute) {

		// get
		if (typeof execute == "undefined") {
			return tasks[name];
		}

		// set
		else {
			if (tasks[name]) {
				console.warn("task: " + name + "already exist, skip");
				return;
			}
			tasks[name] = execute;
		}
	};

	Car.runTasks = function (taskNames) {
		if (!$.isArray(taskNames)) {
			console.error("runTasks taskNames must be array");
			return;
		}
		console.log("runTasks: " + taskNames);
		for (var index in taskNames) {
			var fn = tasks[taskNames[index]];
			if (typeof fn == "function") {
				fn();
			}
		}
	};

	// ****************************** cookie ******************************
	Car.cookie = function (name, value, options) {
			  
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        var path = options.path ? '; path=' + options.path : '';
	        var domain = options.domain ? '; domain=' + options.domain : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = jQuery.trim(cookies[i]);
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};

	// ************************** model bind ************************
	Car.eval = function (js) {
		try {
			return eval(js);
		} catch (e) {
			console.warn(e);
			return undefined;
		}
	};

	Car.populate = function (container, context) {

		if (!container) {
			console.error("populate container can not be empty");
		}

		if (context == null) {
			context = {};
		}

		if (typeof context != "object") {
			console.error("populate context must be object");
			return;
		}
		
		// car-val
		var valElements = $("*[car-val]", $(container));
		$.each(valElements, function () {

			var valElement = $(this);
			var valAttr = valElement.attr("car-val");

			var val = getValue(context, valAttr);
			if (val === undefined) {
			
			}
			else if (val === null) {
				valElement.html("");
			}
			else {
				valElement.html(val);
			}
		});

		// car-repeat
		// not now
		
		// car-src (img)
		var srcElements = $("*[car-src]", container);
		$.each(srcElements, function () {
			
			var srcElement = $(this);
			var srcAttr = srcElement.attr("car-src");

			var val = getValue(context, srcAttr);
			if (val == undefined) {

			}
			else if (val === null) {

			}
			else if (typeof val == "string") {
				srcElement.attr("src", val);
			}
			else {
				console.warn(srcElement);
			}
		});
		
		// car-href
		var hrefElements = $("*[car-href]", container);
		$.each(hrefElements, function () {
			var hrefElement = $(this);
			var hrefAttr = hrefElement.attr("car-href");
			var val = getValue(context, hrefAttr);
			if (val == undefined) {
			} else if (val === null) {
			} else if (typeof val == "string") {
				hrefElement.attr("href", val);
			} else {
				console.warn(hrefElement);
			}
		});

		// car-title
		var titleElements = $("*[car-title]", container);
		$.each(titleElements, function () {
			
			var element = $(this);
			var attr = element.attr("car-title");

			var val = getValue(context, attr);
			if (val == undefined) {

			}
			else if (val === null) {

			}
			else if (typeof val == "string") {
				element.attr("title", val);
			}
			else {
				console.warn(element);
			}
		});

		function getValue(context, attr) {
			var attrInContext = "context." + attr;
			try {
				var val = eval(attrInContext);
				return val;
			} catch (e) {
				//console.warn(e);
				return undefined;
			}
		};

	};

	// ************************** util ******************************
	Car.safeString = function (value) {
		return value ? value : "";
	};

	/**
	 * broadcast vip.shopAccountId.changed
	 * @return {[type]}
	 */
	Car.task("detectVipShopAccountId", function () {

		var shopAccountId = Car.cookie("WEBSITE_VIP");

		// first detect
		broadcast(shopAccountId, undefined, true);

		var oldShopAccountId = shopAccountId;
		function detect() {
		  		
	  		var newShopAccountId = Car.cookie("WEBSITE_VIP");
	  		if (newShopAccountId != oldShopAccountId) {
	  			broadcast(newShopAccountId, oldShopAccountId);
	  		}

	  		oldShopAccountId = newShopAccountId;
	  		setTimeout(detect, 10 * 1000);
		};

		function broadcast (newShopAccountId, oldShopAccountId, isFirstDetect) {
			Car.broadcast("vip.shopAccountId.changed", {
				oldValue: oldShopAccountId,
				newValue: newShopAccountId,
				isFirstDetect: !!isFirstDetect
			});
		}
	});

	/**
	 * broadcast vip.changed
	 * @return {[type]}
	 */
	Car.task("detectVip", function () {

		Car.on("vip.shopAccountId.changed", function (data) {

			var oldVip = vip();
			var newShopAccountId = data.newValue;

			if (!newShopAccountId) {
				
				vip(null);
				Car.broadcast("vip.changed", {
					newValue: null,
					oldValue: oldVip
				});
			}
			else {

				if (data.isFirstDetect || !oldVip || oldVip.shopAccountId != newShopAccountId) {

					$.get(Car.url("/businessWeb/getBusinessInformation"), {shopAccountId: newShopAccountId}, function(data) {

						if (typeof data == "object" && !!data.shopAccountId) {
							vip(data);
							Car.broadcast("vip.changed", {
								newValue: data,
								oldValue: oldVip
							});
						}
						else {
							console.warn(data);
						}
					
					});  	
				}	
			}
		});

		function vip(vip) {

			/**
			var vip = {
				shopAccountId: 1,
		  		account: "vip-account-1",
		  		waitingOrderCount: "15",
				allOrderCount: "20",
				historyVistorCount: "1000",
				collectCount: "200"
		  	};
		  	*/
		  	// vip given, set vip
		  	if (typeof vip != "undefined") {
		  		if (vip == null) {
		  			Car.cookie("WEBSITE_VIP_STORE", null);
		  			return;
		  		}
		  		var vipStore = [vip.shopAccountId, val(vip.waitingOrderCount), val(vip.allOrderCount), val(vip.historyVistorCount), val(vip.collectCount), val(vip.account, "unknown")].join("-");
		  		Car.cookie("WEBSITE_VIP_STORE", vipStore);
		  	}

		  	// get vip
		  	else {
		  		var vipStore = Car.cookie("WEBSITE_VIP_STORE");
		  		if (!vipStore) {
		  			return null;		
		  		}

		  		try {
		  			var values = vipStore.split("-");
		  			var vip = {
			  			shopAccountId: values[0],
			  			waitingOrderCount: values[1],
						allOrderCount: values[2],
						historyVistorCount: values[3],
						collectCount: values[4],
						account: values[5]
		  			};

		  			return vip;
		  		} catch (e) {
		  			console.log(e);
		  			return null;
		  		}
		  	}

		  	function val(value, defaultValue) {
		  		if (typeof defaultValue == "undefined") {
		  			defaultValue = "0";
		  		}
		  		return !!value ? value : defaultValue;
		  	}
		}
	});
	
	Car.footer = function(){
		$.get(Car.url("/footerWeb/getFooter"), function(data) {
			if (data) {
				$(".footer").html(data.content);
			}
		});
	};
	
})(window, undefined);
  	