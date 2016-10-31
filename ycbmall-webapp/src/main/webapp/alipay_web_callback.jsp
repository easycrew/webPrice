<%
/* *
 功能：支付宝页面跳转同步通知页面
 版本：3.2
 日期：2011-03-17
 说明：
 以下代码只是为了方便商户测试而提供的样例代码，商户可以根据自己网站的需要，按照技术文档编写,并非一定要使用该代码。
 该代码仅供学习和研究支付宝接口使用，只是提供一个参考。

 //***********页面功能说明***********
 该页面可在本机电脑测试
 可放入HTML等美化页面的代码、商户业务逻辑程序代码
 TRADE_FINISHED(表示交易已经成功结束，并不能再对该交易做后续操作);
 TRADE_SUCCESS(表示交易已经成功结束，可以对该交易做后续操作，如：分润、退款等);
 //********************************
 * */
%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ page import="java.util.Map"%>
<%@ page import="cn.com.carsmart.pay.engine.alipayweb.AlipayWebNotify"%>
<%@ page import="cn.com.carsmart.ws.guice.GuiceConfig"%>
<%@ page import="cn.com.carsmart.ycbmall.web.controller.business.UserOrderController"%>

<html>
  <head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>支付宝页面跳转同步通知页面</title>
		<style>
		*{
			margin:0;
			padding:0;
		}
		body{
			font: 14px/1.5 '微软雅黑';
			color: #555;
		}
		a{
			text-decoration: none;
		}
		a:focus{
			outline: none;
		}
		div.container{
			position: relative;
			left: 50%;
			width: 330px;
			margin-left: -165px;
			margin-top: 200px;
		}
		div.success,div.fail{
			overflow: hidden;
		}
		div.left,div.right{
			float:left;
		}
		div.right{
			margin-left: 15px;
		}
		span.congratulate{
			font-size: 28px;
			color:#7FBB00;
		}
		span.sorry{
			font-size: 28px;
			color:#AB423E;
		}
		a.btn{
			color: #fff;
			padding: 5px 40px;
			display: inline-block;
			background: -moz-linear-gradient(top,#5F87CE,#4B6DA7);
			background: -webkit-linear-gradient(top,#5F87CE,#4B6DA7);
			background: -ms-linear-gradient(top,#5F87CE,#4B6DA7);
			background: linear-gradient(top,#5F87CE,#4B6DA7);
			border-radius: 5px;
			cursor: pointer;
		}
		div.sucessBtn,div.failBtn{
			margin-top: 100px;
			text-align: center;
		}
	</style>
  </head>
  <body>
<%
	//获取支付宝GET过来反馈信息
	Map<String,String> params = new HashMap<String,String>();
	Map requestParams = request.getParameterMap();
	for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
		String name = (String) iter.next();
		String[] values = (String[]) requestParams.get(name);
		String valueStr = "";
		for (int i = 0; i < values.length; i++) {
			valueStr = (i == values.length - 1) ? valueStr + values[i]
					: valueStr + values[i] + ",";
		}
		//乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
		valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
		params.put(name, valueStr);
	}
	
	//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以下仅供参考)//
	//商户订单号

	String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");

	//支付宝交易号

	String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");

	//交易状态
	String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),"UTF-8");
	
	//通知时间
	String notify_time = new String(request.getParameter("notify_time").getBytes("ISO-8859-1"),"UTF-8");

	//获取支付宝的通知返回参数，可参考技术文档中页面跳转同步通知参数列表(以上仅供参考)//
	
	//计算得出通知验证结果
	boolean verify_result = AlipayWebNotify.verify(params);
	String errorMsg = "";
	
	if(verify_result){//验证成功
		//////////////////////////////////////////////////////////////////////////////////////////
		//请在这里加上商户的业务逻辑程序代码

		//——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
		try {
			if(trade_status.equals("TRADE_FINISHED") || trade_status.equals("TRADE_SUCCESS")){
			    UserOrderController userOrderController = GuiceConfig.getStaticInjector().getInstance(UserOrderController.class);
			    userOrderController.paySucess(out_trade_no, trade_no, notify_time,"支付宝同步通知");
			}
		}catch(Exception e) {
			errorMsg = e.getMessage();
		}
%>
		<div class="container">
		<div class="success">
			<div class="left">
				<img src="img/pay_success.jpg">
			</div>
			<div class="right">
				<p><span class="congratulate">恭喜您！</span>您的支付已经完成！</p>
				<p>如有疑问，请致电01058377979</p>
			</div>
		</div>
		<div class="sucessBtn">
			<a class="btn" href="javascript:window.close();">确定</a>
		</div>
	</div>
	<%}else{%>
		<div class="container">
		<div class="fail">
			<div class="left">
				<img src="img/pay_fail.jpg">
			</div>
			<div class="right">
				<p><span class="sorry">很抱歉！</span>您的支付未完成！<%=errorMsg %>></p>
				<p>如有疑问，请致电01058377979</p>
			</div>
		</div>
		<div class="failBtn">
			<a class="btn" href="javascript:window.close();">确定</a>
		</div>
	</div>
	<%}
%>
  </body>
</html>