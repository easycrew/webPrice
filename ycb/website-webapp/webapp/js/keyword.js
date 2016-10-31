(function($) {
	$.keyword = function(content){
		var keyword = ["在线保养", "洗车券", "汽车美容", "免费电话救援", "特价贴膜", "特价镀膜", "修车", "内饰清洗", "二手车", "汽车费用"];
		
		function link($1){
			return "<a class='keyword' href='cbswd_1.html?question=" + encodeURIComponent($1)    + "'>" + $1 + "</a>";
		}

		if (content) {
			for (var i in keyword) {
				content = content.replace(new RegExp("(" + keyword[i] + ")", "g"), link);
			}
		}
		return content;
	};
})(jQuery);