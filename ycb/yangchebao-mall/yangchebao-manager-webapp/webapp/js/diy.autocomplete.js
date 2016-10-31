( function($, undefined) {
        $.widget("diy.autocomplete", $.jrad.autocomplete, {
        	options:{
        		success_callback:false
        	},
            val : function(item) {
            	if(item==undefined){
            		return this._val();
            	}else{
            		this._val(item);
            		if(this.options.success_callback&&jQuery.isFunction(this.options.success_callback)){
            			this.options.success_callback(item);
            		}
            	}
            }
        });
}(jQuery)); 