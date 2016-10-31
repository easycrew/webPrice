(function($, undefined) {
	$.widget("jrad.module", {
		options: {
			modules:null,
			columnNum: 2
		},
		_initElement: function() {
			var $main = this.element.main;
			var columnNum = this.options.columnNum;
			var grid = 'span' + (24 - 24%columnNum)/columnNum;
			$main.empty();
			var $row = {};
			if(this.options.modules != undefined) {
				$.each(this.options.modules,function(index,module){
					if(index%columnNum == 0) {
						$row = $('<div>').addClass('row-fluid').appendTo($main);
					}
					var $module = $('<div>').addClass('each-module').addClass(grid);
					var $tit = $('<div>').addClass('module-tit');
					var $status = $('<span>').addClass('module-status').addClass('status-ing').html(module.status);
					var $tit_content = $('<span>').addClass('module-tit-content').addClass(module.icon).html(module.title);
					var $h2 = $('<h2>').append($tit_content).append($status);
					$tit.append($h2);
					var opts = $('<div>').addClass('module-op');
					if(module.buttons != undefined) {
						$.each(module.buttons,function(index,btn){
							opts.append(btn);
						});
					}
					var $content = $('<div>').addClass('each-module-content').append($('<div>').addClass('each-module-content-inner').append(opts));
					$module.append($tit);
					$module.append($content);
					$row.append($module);
				});
			}
		},
		_create: function() {
			var $main = $('<div>').addClass('grid-layout-main');
			this.element.append($main).addClass('grid-layout');
			this.element.main = $main;
		},
		_init: function() {
			this._initElement();
		},
		destory: function() {
			this.element.empty();
			this.element.removeClass('grid-layout-main');
			$.Widget.prototype.destroy.call(this);
		}
	});
} (jQuery));