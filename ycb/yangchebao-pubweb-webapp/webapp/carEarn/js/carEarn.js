function getCarEarnInfo(loginStatus, userId,driveFlag) {
	//loginStatus	Int	登录状态  0：未登录  1：已登录
	$.ajax({
		url: '/yangchebao-app-ws/ws/0.1/autogain/general?userInfoId=' + userId + '&loginStatus=' + loginStatus + '&' + (new Date()).getTime(),
		type: 'get',
		async: false,
		dataType: 'json',
		success: function(data) {
			$(".lqTip").html(data.ruleTips);
			if (loginStatus == "0") {
				$(".championEarning").html(data.championEarning);
			} else {
				$(".earningRanking").html(data.earningRanking);
				$(".totalBalance").html(data.totalBalance);
				$(".earningRanking").html(data.earningRanking);
				$(".totalInsuranceFund").html(data.totalInsuranceFund);
				if (data.unreceivedSubsidyFlag == "1") {
					$(".rewardDialog").css('visibility', 'visible');
					centerReward();
				}
				$(".memberCount").html(data.memberCount);
				if (parseInt(data.insuranceSubsidyInfo.unreceivedSubsidy) == 0) {
					if (data.insuranceSubsidyInfo.insuranceSubsidyType == "4") {
						$(".insuranceLi .liRT").html("");
					} else {
						$(".insuranceLi .liRT").html("领取记录");
					}
					$(".insuranceLi").attr("lq", "0");
				} else {
					$(".insuranceLi .yuan").html(data.insuranceSubsidyInfo.unreceivedSubsidy);
					$(".insuranceLi").attr("lq", "1");
				}
				$(".insuranceLi").attr("url", data.insuranceSubsidyInfo.forwardPageUrl);
				if (data.insuranceSubsidyInfo.insuranceSubsidyType == 4) {
					getBaoxianPage();
				}
				if (parseFloat(data.boxSubsidyInfo.unreceivedSubsidy) == 0) {
					if (data.boxSubsidyInfo.boxSubsidyType == "4") {
						$(".boxLi .liRT").html("");
					} else {
						$(".boxLi .liRT").html("领取记录");
					}
					$(".boxLi").attr("lq", "0");
				} else {
					$(".boxLi .yuan").html(data.boxSubsidyInfo.unreceivedSubsidy);
					$(".boxLi").attr("lq", "1");
				}
				$(".boxLi").attr("url", data.boxSubsidyInfo.forwardPageUrl);
				if (data.userChannel == "1"||driveFlag) { //1：养车宝  2：人保  3：人保珠海  4：众诚
					$(".driveLi").show();
					if (data.drivingSubsidyInfo) {
						if (data.drivingSubsidyInfo.unreceivedSubsidyFlag == "1") {
							$(".driveLi .flag").html("立即领取");
						} else {
							$(".driveLi .flag").html("查看排名");
						}
						$(".driveLi").attr("lq", data.drivingSubsidyInfo.unreceivedSubsidyFlag);
						$(".driveLi").attr("url", data.drivingSubsidyInfo.forwardPageUrl);
					}
				}

			}
		},
		error: function(xhr) {
			var mes = eval('(' + xhr.responseText + ')');
			errorLog("获取数据失败");
		}
	});
}

function getAward(cid, type) {
	msgTip("奖励领取中...", "lqTip", false);
	//awardSource 0:所有 1:盒子返利 2:车险返利 3:驾驶排名 
	var postData = {};
	postData.customerId = cid;
	postData.awardSource = type;
	$.ajax({
		url: '/yangchebao-app-ws/ws/0.1/autogain/receive/award',
		type: 'post',
		async: false,
		data: $.toJSON(postData),
		dataType: 'json',
		contentType: 'application/json;charset=utf-8',
		success: function(data) {
			$(".lqTip").remove();
			var msg = data.message;
			msgTip(msg);
			getCarEarnInfo(1, paramJson.userId);
		},
		error: function(xhr) {
			$(".lqTip").remove();
			var mes = eval('(' + xhr.responseText + ')');
			errorLog("获取数据失败");
		}
	});
}
// 弹出框上下居中
function centerZM() {
	var vailH = $(window).height();
	var _zmjConH = $('div.zmjCon').outerHeight() + 45;
	var zmjConH = $('div.zmjCon').outerHeight();
	if (_zmjConH <= vailH) {
		$('div.zmjCon').css({
			'margin-top': -zmjConH / 2 + 10 + 'px',
			'top': '50%'
		})
	} else {
		$('div.zmjCon').css({
			'margin-top':'4.3rem',
			'top':0
		});
	}
}

function centerReward() {
	var vailH = $(window).height();
	var rewardConH = $('div.rewardCon').outerHeight();
	if (rewardConH < vailH) {
		$('div.rewardCon').css({
			'margin-top': -rewardConH / 2 + 'px',
			'top': '50%'
		})
	}
}

function getBaoxianPage() {
	var cityName = decodeURIComponent(paramJson.cityName);
	$.ajax({
		url: '/yangchebao-app-ws/ws/0.1/advertise/location?modelId=' + paramJson.modelId + '&cityName=' + cityName + '&location=26&count=1&' + (new Date()).getTime(),
		type: 'get',
		dataType: 'json',
		success: function(data) {
			$(".insuranceLi").attr("url", data[0].entityUrl);
		},
		error: function(xhr) {}
	});

}