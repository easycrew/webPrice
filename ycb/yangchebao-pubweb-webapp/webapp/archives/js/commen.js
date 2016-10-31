// 错误框
var errorLog=function(msg){
	$('div.errorLog').remove();
	var errorStr='';
	errorStr+='<div class="errorLog" style="display:none;"><p></p></div>'
	$('body').append(errorStr);
	$('div.errorLog p').html(msg);
	$('div.errorLog').fadeIn();
	var errorHeight=$('div.errorLog p').outerHeight();
	$('div.errorLog p').css({'top':'50%','margin-top':'-'+errorHeight/2+'px'});
	$('div.errorLog').unbind('click').bind('click',function(){
		$('div.errorLog').fadeOut()
	});
	setTimeout(function(){
		$('div.errorLog').fadeOut()
	},3000)
};
// 区分ip
var urlIp=function(){
	if((window.location.href).indexOf('app.yangchebao.com.cn')!=-1){
		return 'app.yangchebao.com.cn'
	}else{
		return '172.18.180.11'
	}
}
var calender=function(userId,thisYear,thisMonth){
	var dateList=[];
    // 获取当前月
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    // 获取相应年月
    if(thisYear){
    	var _year=thisYear;
    	var _month=thisMonth;
    }
    // 月函数
    var monthCalender=function(year,month){
		if((month+"").length==1){
			month = "0"+month;
		}
    	$('article.calender-top span.year').html(year);
    	$('article.calender-top span.month').html(month);
    	// 当前月第一天是周几
    	var week=new Date(year+'/'+month+'/1').getDay();
    	var days='';
    	// 当前月的天数
    	if(month==4||month==6||month==9||month==11){
    		days=30
    	}else if(month==2){
    		if(year%4==0){
    			days=28
    		}else{
    			days=29
    		}
    	}else{
    		days=31
    	}
    	// 填写
    	var daysStr='';
    	// 第一行
    	daysStr+='<tr>';
    	for(i=0;i<week;i++){
    		daysStr+='<td></td>'
    	}
    	for(i=1;i<8-week;i++){
    		daysStr+='<td><span data-id='+i+'>'+i+'</span></td>'
    	}
    	daysStr+='</tr>';
    	// 中间几行
    	var firstDays=7-week;
    	var lastDays=(days-firstDays)%7;
    	var miDays=days-firstDays-lastDays;
    	for(i=0;i<miDays/7;i++){
    		daysStr+='<tr>';
    		for(j=1;j<8;j++){
    			var nowDay=7*i+firstDays+j;
    			daysStr+='<td><span data-id='+nowDay+'>'+nowDay+'</span></td>'
    		}
    		daysStr+='</tr>'
    	}
    	// 最后一行
    	if(lastDays!=0){
    		var lfDay=days-lastDays+1;
    		daysStr+='<tr>';
    		for(i=lfDay;i<days+1;i++){
    			daysStr+='<td><span data-id='+i+'>'+i+'</span></td>'
    		}
    		daysStr+='</tr>'
    	}
    	$('article.calender-bottom tbody').html(daysStr);
    	// 标记有数据日期
    	for(i=1;i<days+1;i++){
    		dateList.forEach(function(key,j){
    			if(key.month==month&&key.date==i){
    				$('article.calender-bottom tbody tr td span[data-id='+i+']').addClass('hasData')
    			}
    		})
    	}
    	// // 点击查询当天的驾驶报告
    	// $('tbody tr td').on('click','span.hasData',function(){
    	// 	var thisVal=$(this).html();
    	// 	if(thisVal<10){
    	// 		thisVal='0'+thisVal
    	// 	}
    	// 	window.location.href="driveNote.html?userId="+userId+'&dateNum='+year+'-'+month+'-'+thisVal
    	// })
    };
    // 获取有数据的日期
    $.ajax({
    	url:'/yangchebao-app-ws/ws/0.1/driving/getTripDateList?userInfoId='+userId,
    	type:'get',
    	dataType:'json',
    	contentType:'application/json;charset=utf-8',
    	success:function(data){
    		data.dateList.forEach(function(key,i){
    			var json={};
    			var arr=key.split('-');
    			json.year=arr[0];
    			json.month=arr[1];
    			json.date=arr[2];
    			dateList.push(json)
    		});
    		console.log(dateList);
    		// 日历初始化
    		if(thisYear){
    			monthCalender(_year,_month)
    		}else{
    			monthCalender(year,month)
    		}
    	},
    	error:function(xhr){
    		var error=eval('('+xhr.responseText+')');
    		errorLog(error[0].message)
    	}
    });
    
    // 月份范围
    var monthArr=[];
    if(month==1){
    	monthArr=[{'year':year-1,'month':11},{'year':year-1,'month':12},{'year':year,'month':1}]
    }else if(month==2){
    	monthArr=[{'year':year-1,'month':12},{'year':year,'month':1},{'year':year,'month':2}]
    }else{
    	monthArr=[{'year':year,'month':month-2},{'year':year,'month':month-1},{'year':year,'month':month}]
    }
    // 前后箭头初始化
	var _index='';
	var len=monthArr.length;
	monthArr.forEach(function(key,i){
		if(_year==key.year && _month==key.month){
			_index=i
		}
	});
	if(_index==0){
		$('article.calender-top span.arrowL').hide()
	}else if(_index==(len-1)){
		$('article.calender-top span.arrowR').hide()
	}
    // prevMonth
    $('article.calender-top span.arrowL').unbind('click').bind('click',function(){
    	var theYear=$('article.calender-top span.year').html();
    	var theMonth=$('article.calender-top span.month').html();
    	var index='';
    	monthArr.forEach(function(key,i){
    		if(theYear==key.year && theMonth==key.month){
    			index=i
    		}
    	});
    	monthCalender(monthArr[index-1].year,monthArr[index-1].month);
    	if(index==1){
    		$('article.calender-top span.arrowL').hide()
    	}
    	if($('article.calender-top span.arrowR').is(':hidden')){
    		$('article.calender-top span.arrowR').show()
    	}
    });
    // nextMonth
    $('article.calender-top span.arrowR').unbind('click').bind('click',function(){
    	var theYear=$('article.calender-top span.year').html();
    	var theMonth=$('article.calender-top span.month').html();
    	var index='';
    	monthArr.forEach(function(key,i){
    		if(theYear==key.year && theMonth==key.month){
    			index=i
    		}
    	});
    	monthCalender(monthArr[index+1].year,monthArr[index+1].month);
    	if(index==(len-2)){
    		$('article.calender-top span.arrowR').hide()
    	}
    	if($('article.calender-top span.arrowL').is(':hidden')){
    		$('article.calender-top span.arrowL').show()
    	}
    })
}