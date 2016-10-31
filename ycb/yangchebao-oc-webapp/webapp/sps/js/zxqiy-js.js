// JavaScript Document
function markKeyWord(type,content){
        var oilReg = /当前剩余油量\d+\.\d+升/;
        var volReg = /当前电瓶电压为\d+\.\d+伏/;
        var fireReg = /发生异常点火/;
        var moveReg = /发生异常移动/;
        var shakeReg = /发生异常震动/;
        var iobdReg= /iOBD终端已和车辆断开连接/;
        var simReg = /(SIM|电话)卡余额不足/;
        var maintanece = /距离下次保养还有\d+公里\d+天/;
        var errorCodeReg = /出现故障码:\s\w\d+/;  
        var plugReg = /设备异常插拔报警/;
        var phoneReg = /余额为\d+\.\d+/;
        var gprsReg = /(SIM卡)?数据流量不足,剩余|余\d+\.\d+M\g/;
        var returnContent = content;  
        switch(type){
            case 'status':
                if(oilReg.test(content)){
                    returnContent = content.replace(oilReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }else if(volReg.test(content)){
                    returnContent = content.replace(volReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }
                break;
             case 'maintenance':
                if(maintanece.test(content)){
                    returnContent = content.replace(maintanece,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }
                break;
             case 'security':
                if(fireReg.test(content)){
                    returnContent = content.replace(fireReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }else  if(moveReg.test(content)){
                    returnContent = content.replace(moveReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }else  if(shakeReg.test(content)){
                    returnContent = content.replace(shakeReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }
                break;
             case 'terminal':
                if(iobdReg.test(content)){
                    returnContent = content.replace(iobdReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }else if(simReg.test(content)){
                    returnContent = content.replace(simReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }else if(plugReg.test(content)){
                    returnContent = content.replace(plugReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }else if(phoneReg.test(content)){
                    returnContent = content.replace(plugReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }
                break;
              case 'diagnosis':
                if(errorCodeReg.test(content)){
                    returnContent = content.replace(errorCodeReg,function(val){
                        return '<span class="keyMark">'+val+'</span>';
                    })
                }
                break;
        }   
        return returnContent;
}
function showMessageList(result,pageIndex){
        var i = (pageIndex - 1) * 10;
        var count = result.length;
        var pageSize = pageIndex * 10;
        var htmlText = [];
        for(i ; i < count && i < pageSize; i++){
                               var item = result[i];
                               var licensePlate = item.licensePlate;
                               var content = item.content;
                               var type = item.type;
                               content = markKeyWord(type,content);
                               content = licensePlate + " " + content; 
                               var receivedTime = item.receivedTime;
                               var id = item.id;
                               var status = item.status;
                               var className = "";
                               if(status == 1){
                                   className = "readedTr";
                               };
                               receivedTime = getMinuteToTimes(receivedTime,true);
                               htmlText.push('<tr id="'+id+'" class="'+className+'"><td  class="Unread"><div class="ui-checkbox" style="width:20px"><input type="checkbox" name="messageId" value="'+id+'"></div></td><td class="contentDetail">')
                               htmlText.push('<div>'+content+'</div>')
                               htmlText.push('</td><td><div style="width:200px">'+receivedTime+'</div></td></tr>')
                        }
                        $('.message-table tbody').html(htmlText.join(''));
                        $('.toToVehicle').click(function(event){
                            var self = $(this);
                            $.jRadOpenTab({
                                name:'车辆档案',
                                url:'/smb/smb/smb-vehicle.jsp'
                            });
                             $.jRadCancelPop(event);
                        });
                        $('.message-table tbody tr').each(function(index){
                                $.data(this,'values',result[index + (pageIndex - 1) * 10])
                        });
             
}
function getMessageInfo(type){
				var url = "/smb-ws/ws/0.1/message/show?type="+type;
				success = function(data){
						showMessageList(data,1)
						$('.currentPage').html('1-10');
                         $('.totalPage').html(data.length);
					};
				result = $.jRadGet({
						url:url,
						success:success
					});
			     return result;
			}
			//获取维保信息
	function getMaintenanceList(){
				var url = "/smb-ws/ws/0.1/message/maintenance";
				var success = function(data){
						var items = data.items;
						var count = data.count;
						var i = 0;
						var htmlText = [];
						$('#maintenanceList').html('');
						$('#maintenanceList').parents('.ui-layout-infobox').find('.maintenanceIcon').html(count);
						if(count == 0){
						    return false;
						}
						for(i ; i < 5 && i < count; i++){
							   var item = items[i];
							   var licensePlate = item.licensePlate;
							   var content = item.content;
							  
							   var receivedTime = item.receivedTime;
							   receivedTime = getMinuteToTimes(receivedTime,true);
							    var titileContent = licensePlate + " " + content + " " +receivedTime;
							   content = markKeyWord('maintenance',content);
							   content = licensePlate + " " + content + " " + '<label class=\'dataLebl\'>'+receivedTime+'</label>';
							   
							   htmlText.push('<li><span class="smb_messageIcon"></span><div><span class="infodetail"></span><span class="infomiddle" title="'+titileContent+'">'+content+'</span><span class="inforight"></span></div><div class="clear"></div></li>')
						}
						$('#maintenanceList').html(htmlText.join(''));
					
					};
				$.jRadGet({
						url:url,
						success:success,
						async:true
					});
			}
			//获取安防信息
	function getSecurityList(){
				var url = "/smb-ws/ws/0.1/message/security";
				var success = function(data){
						var items = data.items;
						var count = data.count;
						var i = 0;
						var htmlText = [];
						$('#securityList').html('');
						$('#securityList').parents('.ui-layout-infobox').find('.securityIcon').html(count);
						if(count == 0){
                            return false;
                        }
						for(i ; i < 5 && i < count; i++){
							   var item = items[i];
							   var licensePlate = item.licensePlate;
							   var content = item.content;
							   var receivedTime = item.receivedTime;
							   receivedTime = getMinuteToTimes(receivedTime,true);
							   var titileContent = licensePlate + " " + content + " " +receivedTime;
							    content = markKeyWord('security',content);
							   content = licensePlate + " " + content + " " + '<label class=\'dataLebl\'>'+receivedTime+'</label>';
							   htmlText.push('<li><span class="smb_messageIcon"></span><span class="infodetail"></span><span class="infomiddle" title="'+titileContent+'">'+content+'</span><span class="inforight"></span><div class="clear"></div></li>')
						}
						$('#securityList').html(htmlText.join(''));
					
					};
				var result = $.jRadGet({
						url:url,
						success:success,
                        async:true
					});
			}
			//获取车况信息
	function getStatusList(){
				var url = "/smb-ws/ws/0.1/message/status";
				var success = function(data){
						var items = data.items;
						var count = data.count;
						var i = 0;
						var htmlText = [];
						$('#statusList').parents('.ui-layout-infobox').find('.statusIcon').html(count);
						if(count == 0){
                            return false;
                        }
						for(i ; i < 5 && i < count; i++){
							   var item = items[i];
							   var licensePlate = item.licensePlate;
							   var content = item.content;
							   var receivedTime = item.receivedTime;
							   receivedTime = getMinuteToTimes(receivedTime,true);
							   var titileContent = licensePlate + " " + content + " " +receivedTime;
							   content = markKeyWord('status',content);
							   content = licensePlate + " " + content + " " + '<label class=\'dataLebl\'>'+receivedTime+'</label>';
							   htmlText.push('<li><span class="smb_messageIcon"></span><span class="infodetail"></span><span class="infomiddle" title="'+titileContent+'">'+content+'</span><span class="inforight"></span><div class="clear"></div></li>')
						}
						$('#statusList').html(htmlText.join(''));
					
					};
				var result = $.jRadGet({
						url:url,
						success:success,
                        async:true
					});
			}
			//获取故障信息
	function getDiagnosisList(){
				var url = "/smb-ws/ws/0.1/message/diagnosis";
				var success = function(data){
						var items = data.items;
						var count = data.count;
						var i = 0;
						var htmlText = [];
						$('#diagnosisList').html('');
						$('#diagnosisList').parents('.ui-layout-infobox').find('.diagnosisIcon').html(count);
						if(count == 0){
                            return false;
                        }
						for(i ; i < 5  && i < count; i++){
							   var item = items[i];
							   var licensePlate = item.licensePlate;
							   var content = item.content;
							   var receivedTime = item.receivedTime;
							   receivedTime = getMinuteToTimes(receivedTime,true);
							    var titileContent = licensePlate + " " + content + " " +receivedTime;
							    content = markKeyWord('diagnosis',content);
							   content = licensePlate + " " + content + " " + '<label class=\'dataLebl\'>'+receivedTime+'</label>';
							   htmlText.push('<li><span class="smb_messageIcon"></span><div><span class="infodetail"></span><span class="infomiddle" title="'+titileContent+'">'+content+'</span><span class="inforight"></span></div><div class="clear"></div></li>')
						}
						$('#diagnosisList').html(htmlText.join(''));
					
					};
				var result = $.jRadGet({
						url:url,
						success:success,
                        async:true
					});
			}
			//获取终端信息
	function getTerminalisList(){
				var url = "/smb-ws/ws/0.1/message/terminal";
				var success = function(data){
						var items = data.items;
						var count = data.count;
						var i = 0;
						var htmlText = [];
						$('#terminalList').parents('.ui-layout-infobox').find('.terminalIcon').html(count);
                        $('#terminalList').html('');
						if(count == 0){
                            return false;
                        }
						for(i ; i < 5 && i < count;  i++){
							   var item = items[i];
							   var licensePlate = item.licensePlate;
							   var content = item.content;
							   var receivedTime = item.receivedTime;
							   receivedTime = getMinuteToTimes(receivedTime,true);
							   var titileContent = licensePlate + " " + content + " " +receivedTime;
							   content = markKeyWord('terminal',content);
							   content = licensePlate + " " + content + " " + '<label class=\'dataLebl\'>'+receivedTime+'</label>';
							   htmlText.push('<li><span class="smb_messageIcon"></span><span class="infodetail"></span><span class="infomiddle" title="'+titileContent+'">'+content+'</span><span class="inforight"></span><div class="clear"></div></li>')
						}
						$('#terminalList').html(htmlText.join(''));
					
					};
				var result = $.jRadGet({
						url:url,
						success:success,
                        async:true
					});
			} 

   function getMinuteToTimes(created,showTime) {
	 var date = new Date();
	 var currentDate = date.getTime();
	 var minutes = new String((currentDate - created) / 1000 / 60);
	 var createDate = new Date(created);
	 var month = createDate.getMonth()+1;
	 if(month < 10){
		 month = "0"+month;
	 }
	 var dateDay = createDate.getDate();
	 if(dateDay < 10){
		 dateDay = "0"+dateDay;
	 }
	 var hours = createDate.getHours();
	 if(hours < 10){
		 hours = "0"+hours;
	 }
	 var mins = createDate.getMinutes();
	 if(mins < 10){
		 mins = "0"+mins;
	 }
	 var dateTime = createDate.getFullYear()+"-"+month+"-"+dateDay+" "+hours+":"+mins;
		var minute = parseInt(minutes);
		if (minute < 1) {
			return  "1秒以前";
		}
		if (minute > 60) {// 大于60分钟,转换为小时
			minute = minute / 60;
			if (minute > 24) {// 转为小时判断大于24,转换为天数
				minute = minute / 24;
				if (minute > 30) {// 转为天数判断是否大于30,转为月
					minute = minute / 30;
					if (minute > 12) {
						minute = minute / 12;
						if(showTime){
						   return dateTime;
						}
						return Math.round(minute) + "年以前";
					} else {
						if( showTime){
						  return dateTime;
						}
						return Math.round(minute) + "月以前";
					}
				} else {
					if(Math.round(minute) > 7 && showTime){
						return dateTime;
					}
					return Math.round(minute) + "天以前";
				}
			} else {
				return Math.round(minute) + "小时以前";
			}
		} else {
			return Math.round(minute) + "分钟以前";
		}
}
var infoCount = 0 ;
function getMessageCount(){
    var url = '/shop4s-ws/ws/0.1/message/count';
    success = function(data){
                       var count = data.count;
                       var countText=  count;
                       if(count > 0){
                           if(count > 99){
                               countText = "99+";
                           }
                           $('.messageCount').find('.inner').html(countText);
                           $('.messageCount').show();
                           if(count != infoCount){
                               $('title').text('您有'+count+'条新消息');
                               if(notify.show){
                                   notify.show("","未读消息",'您有'+count+'条新消息');
                               }
                           }
                           infoCount = count;
                       }else{
                            $('.messageCount').find('.inner').html(count);
                           $('.messageCount').hide();
                       }
                    };
     result = $.jRadGet({
                        url:url,
                        success:success
                    });
}
function getMessageSet(){
    var url = '/shop4s-ws/ws/0.1/alarmSetting/settings?securitydomain='+carsmart_config.securityDomain;
    var success = function(data){
            $('#insureDay').input('val',data.insureTime);
            $('#maintenanceDay').input('val',data.maintenanceTime);
            $('#maintenanceMileage').input('val',data.maintenanceMileage);
    };
    $.jRadGet({
        url:url,
        success:success
    })
};
function setMessage(){
    var url ='/shop4s-ws/ws/0.1/alarmSetting/settings?securitydomain='+carsmart_config.securityDomain;
    var maintenanceDay = $('#maintenanceDay').input('val');
    var maintenanceMileage = $('#maintenanceMileage').input('val');
    var insureDay = $('#insureDay').input('val');
    var data = {
        maintenanceDay:maintenanceDay,
        maintenanceMileage:maintenanceMileage
    } ;
    if(!$('#maintenanceDay').input('validate')){
        return false;
    };
    if(!$('#maintenanceMileage').input('validate')){
        return false;
    };
    $.jRadPost({
        url:url,
        data:data,
        contentType:'application/json;charset=utf-8',
        dataType:'json',
        success:function(){
            $.jRadAlert('设置成功','success',null,1500);
        },
        error:function(xhr){
            var data = xhr.responseText;
            data = eval("("+data+")");
            var message = data[0].message;
             $.jRadAlert(message,'error',null,1500);
        }
    }); 
}
