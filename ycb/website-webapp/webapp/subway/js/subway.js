$(function(){
	$('.search').on('click',function(){
		var origin = $("#origin").val();
		var destination = $("#destination").val();
		if(origin==null||destination==null){
			alert("不要搞笑，你确定你需要地铁么？");
			return;
		}
		if(origin!=destination) {  
			$.ajax({ 
				url:'/yangchebao-pubinfo-ws/ws/0.1/common/get/subway/result?startId='+origin+'&endId='+destination,
				dataType: 'json',
				success:function(data){
					alert(data);
				}
			});

		}
		else {
			alert("不要搞笑，你确定你需要地铁么？")
		}
		return false;
	});
	$("#originLine").change(function(){  
		$("#origin").empty(); 
		$.ajax({
			url:"json/"+$("#originLine").val()+".json",
			dataType: 'json',
			success:function(resp){
				var optionList = '';
				for(var i =0;i< resp.data.length;i++){
					var data = resp.data[i];
					optionList+= '<option value="'+ data.id +'">'+ data.name+'</option>'
				}
				$("#origin").html(optionList);  
			}
		});
	});
	
	$("#destinationLine").change(function(){
		$("#destination").empty(); 
		$.ajax({
			url:"json/"+$("#destinationLine").val()+".json",
			dataType: 'json',
			success:function(resp){
				var optionList = ""; 
				for(var i =0;i< resp.data.length;i++){
					var data = resp.data[i];
					optionList+= '<option value="'+ data.id +'">'+ data.name+'</option>'
				}
				$("#destination").html(optionList);  
			}
		});
	});
})