DateFormat = (function(){     
	  var SIGN_REGEXP = /([yMdhsm])(\1*)/g;     
	  function padding(s,len){     
	   var len =len - (s+'').length;     
	   for(var i=0;i<len;i++){s = '0'+ s;}     
	   return s;     
	  };  
	  return({     
	   parse: function(dateString,pattern){     
	   var matchs1=pattern.match(SIGN_REGEXP);     
	   var matchs2=dateString.match(/(\d)+/g);     
	   if(matchs1.length==matchs2.length){     
	     var _date = new Date(1970,0,1);     
	     for(var i=0;i<matchs1.length;i++){  
	    	 var _int = parseInt(matchs2[i]);  
		     var sign = matchs1[i];  
		     switch(sign.charAt(0)){     
		      case 'y' : _date.setFullYear(_int);break;     
		      case 'M' : _date.setMonth(_int-1);break;     
		      case 'd' : _date.setDate(_int);break;     
		      case 'h' : _date.setHours(_int);break;     
		      case 'm' : _date.setMinutes(_int);break;     
		      case 's' : _date.setSeconds(_int);break;     
		     }  
	    }     
	     return _date;     
	   }     
	    return null;     
	   }     
	  });     
})();     