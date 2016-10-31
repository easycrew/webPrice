(function($){
	$.expand = function(){
		$("li.navbar_li ul").show();
		$("ul.navbar li.navbar_li p").toggle(function() {
			$(this).parent("li.navbar_li").find("ul").stop(false, true).slideUp();
			$(this).parent("li.navbar_li").find("img.bar_icon3").attr({src : "img/bar_icon3.png"});
		}, function() {
			$(this).parent("li.navbar_li").find("ul").stop(false, true).slideDown();
			$(this).parent("li.navbar_li").find("img.bar_icon3").attr({src : "img/bar_icon4.png"});
		});
	};
	
	$.collapse = function(){
		$("li.navbar_li ul").hide();
		$("ul.navbar li.navbar_li p").toggle(function() {
			$(this).parent("li.navbar_li").find("ul").stop(false, true).slideDown();
			$(this).parent("li.navbar_li").find("img.bar_icon3").attr({src : "img/bar_icon4.png"});
		}, function() {
			$(this).parent("li.navbar_li").find("ul").stop(false, true).slideUp();
			$(this).parent("li.navbar_li").find("img.bar_icon3").attr({src : "img/bar_icon3.png"});
		});
	};
})(jQuery);
