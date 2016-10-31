<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta http-equiv="x-ua-compatible" content="IE=9" />
<!--[if lt IE 8]>
<meta http-equiv="x-ua-compatible" content="IE=EmulateIE8" />
<![endif]-->
<title>养车宝vip商家自管理系统-注册</title> 
<script type="text/javascript" src='extra/jquery-1.9.1.js'></script>
<script type="text/javascript" src="js/index.js"></script>
<script type="text/javascript" src="js/cs_base.js"></script>
<script type="text/javascript" src="js/md5.js"></script>
<script type="text/javascript" src="extra/LAB.js"></script> 
<script type="text/javascript" src="scripts/plugin/loading.js"></script> 
<!-- <link rel="icon" href="css/images/ICON-16-16-3.png" type="image/png" > -->
<link href="favicon.ico" rel="shortcut icon" type="image/x-icon"/>
<script type="text/javascript">
    var url = window.location.href; 
	var PATH = "";
	if(url.indexOf("vip.yangchebao.com.cn")>-1){ 
	}else{
		PATH = "/yangchebao-vip"
	} 
	$.jRadLoading({app:PATH,type:'css'}); 
    $.jRadLoading({app:PATH,type:'js'});
</script> 
<link rel="stylesheet" type="text/css" href="./css/login.css"/>
<style>
.login-container .ui-radio{
	display:block;
}
</style>
</head>
<body> 
	<div class="login-container" style="width:671px;margin:100px 0px 0px -335px;top:0;">
		<h1 style="height:auto;overflow:auto;margin-bottom:0;">
			<!-- <img src="css/images/logo.png" alt="养车宝商家后台" style="float:left;"/> -->
			<img src="img/regest-bg.png" alt="养车宝商家后台" style="float:left;"/>
<!-- 			<span style="display:inline-block;float:left;height:54px;line-heigh:45px;">.</span>
			<span style="display:inline-block;float:left;height:54px;line-height:54px;margin-left:10px;">商户注册</span> -->
		</h1> 
		<div id="jrad-step-form">
			<div class="jrad-form ui-form" >
				<input name="id" type="hidden">
				<input name="userStr" type="hidden">
					<div class="step-content" style="background-color:#fff;padding:30px 50px;">
					<div class="jrad-steps">
						<ul class="clearfix wizard-steps">
							<li data-target="#step1" class="active" style="width:30%">  
								<span class="line"></span>
								<span class="step">1</span>
								<span class="title">账号注册</span>
							</li>
							<li data-target="#step2" style="width:30%">
								<span class="line"></span>
								<span class="step">2</span>
								<span class="title"> 店铺信息认证</span>
							</li>
							<li data-target="#step3" style="width:30%">
								<span class="line"></span>
								<span class="step">3</span>
								<span class="title">等待审核</span>
							</li> 
						</ul>
					</div>
					<div style="border-top:3px solid #dfe4ec;margin:15px 0 10px 0;"></div>
					<div class="step-pane active" id="step1">
						<p style='color:#e74c3c;font-size:1.2em;'>注册的手机号、密码即为登录商家后台的账号及密码。客服电话:400-607-1222</p>
						<div class="grid-row-fluid">
							<label class="span6 grid-layout-label"><span class="ui-form-required">*</span>手机号：</label>
							<div class="span10 grid-layout-content fluid-wrap">
								<div data-name="alias" class="jrad-input-container"></div>
							</div>
							<button class="btn btn-small btn-primary" id="getcodeBtn">
							获取验证码 
							</button>
						</div>
						<div class="grid-row-fluid">
							<label class="span6 grid-layout-label"><span class="ui-form-required">*</span>附加码：</label>
							<div class="span5 grid-layout-content fluid-wrap">
								<div data-name="verifyCode" class="jrad-input-container"></div>
							</div>
							<img align="absmiddle" style="width:100px;height:30px;" onclick="index.refreshCaptchaImgcount('captchimg');return false;" class="captcha-img" id="captchimg" style="margin:0px 5px 5px;" title="点击图片刷新附加码" alt="附加码" src="/vip-ws/ws/0.1/verify/genCode">
							<a href="javascript:void(0)" onclick="index.refreshCaptchaImgcount('captchimg');return false;" >换一个</a>
						</div>
						<div class="grid-row-fluid">
							<p class="note" style="display:none;margin:0 0 0 145px;"></p>
						</div>
						<div class="grid-row-fluid">
							<label class="span6 grid-layout-label"><span class="ui-form-required">*</span>短信验证码：</label>
							<div class="span10 grid-layout-content fluid-wrap">
								<div data-name="code" class="jrad-input-container"></div>
							</div>
						</div>
						<div class="grid-row-fluid">
							<label class="span6 grid-layout-label"><span class="ui-form-required">*</span>密码：</label>
							<div class="span10 grid-layout-content fluid-wrap">
								<div data-name="password" class="jrad-input-container"></div>
							</div>
						</div>
						<div class="grid-row-fluid">
							<label class="span6 grid-layout-label"><span class="ui-form-required">*</span>重复密码：</label>
							<div class="span10 grid-layout-content fluid-wrap">
								<div data-name="repassword" class="jrad-input-container"></div>
							</div>
						</div>
						<div class="grid-row-fluid">
							<label class="span6 grid-layout-label"></label>
							<div class="span17 grid-layout-content fluid-wrap">
								<div style="height:200px;overflow:auto;border: 1px solid #d5d5d5;">  
									养车宝商家注册协议</br>特别提示：</br>本协议是由商户您（以下简称您）与北京车网互联科技有限公司之间就养车宝网站服务及合作等相关事宜所订立的契约，本协议具有合同法律效力。您应当认真阅读并遵守本协议，请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、争议解决和法律适用条款。如您对协议有任何疑问，应向养车宝咨询。</br>本协议中“养车宝网站”（以下简称养车宝）指由北京车网互联科技有限公司运营的网络服务平台，域名为yangchebao.com.cn。请您仔细阅读本协议，当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并与养车宝达成协议，同意养车宝与您进行商户信息认证及商务联系，本协议即构成对双方有约束力的法律文件。您承诺接受并遵守本协议的约定，届时您不应以未阅读本协议的内容或者未获得养车宝对您问询的解答等理由，主张本协议无效，或要求撤销本协议。</br>一、	协议内容及签署</br>1.养车宝平台的经营者是北京车网互联科技有限公司，养车宝平台网站是指域名为yangchebao.com.cn的“养车宝”。</br>2.本协议内容包括协议正文及所有养车宝已经发布的或将来可能发布的各类规则、公告或通知。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。除另行明确声明外，任何养车宝提供的服务均受本协议约束。</br>3.您应当在使用养车宝之前认真阅读全部协议内容，如您对协议有任何疑问，应向养车宝咨询。但无论您事实上是否在使用养车宝之前认真阅读了本协议内容，只要您同意本协议并注册养车宝，则本协议即对您产生约束，届时您不应以未阅读本协议的内容或者未获得养车宝对您问询的解答等理由，主张本协议无效，或要求撤销本协议。</br>4.您承诺接受并遵守本协议的约定。如果您不同意本协议的约定，您应立即停止注册程序或停止使用养车宝。养车宝有权根据需要不时地制订、修改本协议及/或各类规则，并以网站公示的方式进行公告，不再单独通知您。变更后的协议和规则一经在网站公布后，立即自动生效。如您不同意相关变更，应当立即停止使用养车宝。如您继续使用养车宝，即视为您完全知悉并接受经修订的协议和规则。</br>5.本协议不涉及您与养车宝用户之间因网上交易等而产生的法律关系及法律纠纷。</br>二、	注册</br>1.	注册者资格</br>您确认，在您完成注册程序时，您应当是在工商行政监督管理局注册成功的法人、个体工商户或其他经济组织，或是具备完全民事权利能力和完全民事行为能力的自然人，若您不具备前述主体资格，或在注册过程中提交虚假资料，养车宝有权注销（永久冻结）您的养车宝注册账户，并向您索偿。</br>2.	账户</br>（1）在您签署本协议，完成会员注册程序时，您的注册手机号即为您的养车宝注册账户（以下简称账户）。</br>（2） 您应对您的账户和密码的安全，以及对通过您的账户和密码实施的行为负责。除非有法律规定或司法裁定，且征得养车宝的同意，否则，账户和密码不得以任何方式转让、赠与或继承（与账户相关的财产权益除外）。</br>（3）如果发现任何人不当使用您的账户或有任何其它可能危及您的账户安全的情形时，您应当立即以有效方式通知养车宝，以便养车宝暂停相关服务。您理解养车宝对您的请求采取行动需要合理时间，养车宝对在采取行动前已经产生的后果（包括但不限于您的任何损失）以及采取行动后非可归责于养车宝的后果不承担任何责任。</br>3. 会员</br>（1）在您按照注册程序提示填写注册信息、商户信息并完成全部注册程序后，您即成为养车宝商户会员（以下简称会员）。在注册时，您应当按照法律法规要求，或注册程序的提示准确提供并及时申请变更您的资料，以使之真实、及时，完整和准确。</br>（2）经养车宝审核认证，如您提供的资料错误、不实、需更新或不完整的，养车宝有权向您发出询问及/或要求变更的通知，并有权直接做出删除相应资料的处理，直至中止、终止对您提供部分或全部养车宝服务。养车宝对此不承担任何责任，您将承担因此产生的任何直接或间接的责任及损失。</br>（3）您应当准确填写您提供的商户名称、商户简称、行政区域、详细地址、商务联系人、商务联系电话等联系方式信息并上传合法有效的企业法人营业执照，以便养车宝或养车宝个人用户与您进行有效联系，如上述信息发生变化，您需及时向养车宝申请变更。因您提供的联系方式错误或无效，无法与您取得联系，导致您在使用养车宝过程中产生任何损失或增加费用的，应由您完全独自承担。</br>（4）您在使用养车宝过程中，所产生的应纳税赋，以及一切硬件、软件、服务及其它方面的费用，均由您独自承担。</br>如果您提供给养车宝的资料不准确，不真实，或合法有效性值得商榷，养车宝享有结束您使用养车宝各项服务的权利。您同意，您所提供的真实、准确的养车宝注册信息、商户信息作为认定您与您的养车宝账户的关联性以及您商户会员身份的唯一证据。您同意，与您养车宝注册账户相关的一切资料、数据和记录（包括但不限于登录记录、登录后行为等）以养车宝的系统数据为准。</br>三、	 养车宝使用规范</br>1.	使用养车宝过程中，您承诺遵守以下约定：</br>（1）在使用养车宝过程中实施的所有行为均遵守国家法律、法规等规范性文件及养车宝各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。您如果违反前述承诺，产生任何法律后果的，您应以自己的名义独立承担所有的法律责任，并确保养车宝免于因此产生任何损失。</br>（2）在养车宝交易过程中，遵守诚实信用原则，不在交易过程中采取不正当竞争行为，不扰乱网上交易的正常秩序，不从事与网上交易无关的行为。</br>（3）不以虚构或歪曲事实的方式不当评价其他商户会员的产品及服务，不采取不正当方式制造或提高自己的信用度，降低其他商户会员的信用度。</br>（4）不对养车宝上的任何数据作商业性利用（除您自己拥有知识产权或版权的作品图集、产品信息、资讯信息外），包括但不限于在未经养车宝事先书面同意的情况下，以复制、传播等任何方式使用养车宝上展示的资料。</br>（5）不使用任何装置、软件或例行程序等技术手段干预或试图干预养车宝的正常运作或正在养车宝上进行的任何交易、活动。您不得采取任何将导致不合理的庞大数据负载加诸养车宝网络设备的行动。</br>（6） 不得侵犯其他商户的知识产权（包括但不限于商户商标、作品图集等）及合法权益。未经养车宝或其他商户书面同意，不得使用其他商户在养车宝平台发布的商户信息、作品图集、产品信息及资讯活动等资料。不得盗用其他商户信息进行养车宝注册或认证。</br>（7）不得发布下列违法信息：</br>① 反对宪法所确定的基本原则的； </br>② 危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的； </br>③ 损害国家荣誉和利益的； </br>④ 煽动民族仇恨、民族歧视，破坏民族团结的； </br>⑤ 破坏国家宗教政策，宣扬邪教和封建迷信的； </br>⑥ 散布谣言，扰乱社会秩序，破坏社会稳定的； </br>⑦ 散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的； </br>⑧	 侮辱或者诽谤他人，侵害他人合法权益的； </br>⑨	 含有法律、行政法规禁止的其它内容的。 </br>2.	您了解并同意：</br>（1）养车宝有权对您是否违反上述承诺做出单方认定，并根据单方认定结果适用规则予以处理或终止向您提供服务，且无须征得您的同意或提前通知您。</br>（2）对于您在养车宝上发布的涉嫌违法或涉嫌侵犯他人合法权利或违反本协议及/或规则的信息，养车宝有权不经通知您即予以删除，且按照规则的规定进行处罚。</br>（3）对于您在养车宝上实施的行为，包括您未在养车宝上实施但已经对养车宝及其用户产生影响的行为，养车宝有权单方认定您行为的性质是否构成对本协议及/或规则的违反，并据此做出相应处罚。您应自行保存与您行为有关的全部证据，并应对无法提供证据而承担不利后果。</br>（4）对于您涉嫌违反承诺的行为对任何第三方造成损害的，您均应当以自己的名义独立承担所有的法律责任，并应确保养车宝免于因此产生损失或增加费用。 </br>（5）如您涉嫌违反有关法律或者本协议之规定，使养车宝遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，您应当赔偿养车宝因此造成的损失及/或发生的费用，包括合理的律师费用。</br>四、特别授权</br>您完全理解并不可撤销地授予养车宝及其关联公司下列权利：</br>1.一旦您向养车宝做出任何形式的承诺，且已确认您违反了该承诺，则养车宝有权立即按您的承诺或协议约定的方式对您的账户采取限制措施，包括中止或终止向您提供服务。您了解并同意，养车宝无须就相关确认与您核对事实，或另行征得您的同意，且养车宝无须就此限制措施或公示行为向您承担任何的责任。</br>2. 对于您提供的资料及数据信息，您授予养车宝独家的、全球通用的、永久的、免费的许可使用权利 (并有权在多个层面对该权利进行再授权)。此外，养车宝有权(全部或部分的) 使用、复制、修订、改写、发布、翻译、分发、执行和展示您的全部资料数据（包括但不限于注册资料、商户信息、交易行为数据及全部展示于养车宝平台的各类信息），并以现在已知或日后开发的任何形式、媒体或技术，将上述信息应用于法律许可的范围内。</br>五、责任范围和责任限制</br>1. 养车宝负责“现有的”和“未来的”的状态向您提供养车宝服务。但养车宝对养车宝服务不作任何明示或暗示的保证，包括但不限于养车宝服务的适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。同时，养车宝也不对养车宝服务所涉及的技术及信息的有效性、准确性、正确性、可靠性、质量、稳定、完整和及时性做出任何承诺和保证。</br>2. 您了解养车宝上的部分信息系您自行发布，且可能存在风险和瑕疵。养车宝仅作为您发布服务信息、物色交易对象、就物品及服务的交易开展交易的平台，养车宝无法控制交易所涉及的物品及服务的质量、安全或合法性，以及交易各方履行其在交易协议中各项义务的能力。您应自行谨慎判断确定相关物品及信息的真实性、合法性和有效性，并自行承担因此产生的责任与损失。</br>3. 除非法律法规明确要求，或出现以下情况，否则养车宝没有义务对您的注册数据、商户信息、交易行为以及与交易有关的其它事项进行事先审查：</br>（1）养车宝有合理的理由认为您及具体交易事项可能存在重大违法或违约情形。 </br>（2）养车宝有合理的理由认为您在养车宝的行为涉嫌违法或不当。</br>4. 您了解并同意，养车宝不对因下述任一情况而导致您的任何损害赔偿承担责任，包括但不限于您在养车宝交易中产生的费用、服务使用、数据等方面的损失或其它无形损失的损害赔偿 (无论养车宝是否已被告知该等损害赔偿的可能性) ：</br>（1）使用或未能使用养车宝服务。 </br>（2）第三方未经批准的使用您的账户或更改您的数据。 </br>（3）通过养车宝购买或获取任何商品、服务、数据、信息或进行交易等行为或替代行为产生的费用及损失。 </br>（4）您对养车宝服务的误解。 </br>（5）任何非因养车宝的原因而引起的与养车宝服务有关的其它损失。</br>5. 不论在何种情况下，养车宝均不对由于信息网络正常的设备维护，信息网络连接故障，电脑、通讯或其它系统的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令或第三方的不作为等而造成的不能服务或延迟服务承担责任。</br>六、协议终止</br>1. 您同意，出现以下情况时，养车宝有权直接以注销账户的方式终止本协议:</br>（1）养车宝终止向您提供服务后，您涉嫌再一次直接或间接或以他人名义注册为养车宝商户会员的。 </br>（2）您提供的手机号码不存在或无法接收短信，且没有其它方式可以与您进行联系，或养车宝以其它联系方式通知您更改手机号码信息，而您在养车宝通知后七个工作日内仍未更改为有效的手机号码的。 </br>（3）您注册信息中的主要内容及/或商户信息内容不真实或不准确或不及时或不完整。 </br>（4）本协议（含规则）变更时，您明示并书面通知养车宝不愿接受新的协议的。 </br>（5）其它养车宝认为应当终止服务的情况。</br>2. 您有权向养车宝要求注销您的账户，经养车宝审核同意的，养车宝注销（永久冻结）您的账户，届时，您与养车宝基于本协议的合同关系即终止。您的账户被注销（永久冻结）后，养车宝没有义务为您保留或向您披露您账户中的任何信息，也没有义务向您或第三方转发任何您未曾阅读或发送过的信息。</br>3. 您同意，您与养车宝的合同关系终止后，养车宝仍享有下列权利： </br>（1）继续保存您的注册信息、商户信息及您使用养车宝服务期间的所有交易信息。 </br>（2）您在使用养车宝期间存在违法行为或违反本协议及/或规则的行为的，养车宝仍可依据本协议向您主张权利。</br>4. 养车宝中止或终止向您提供养车宝服务后，对于您在服务中止或终止之前的交易行为依下列原则处理，您应独力处理并完全承担进行以下处理所产生的任何争议、损失或增加的任何费用，并应确保养车宝免于因此产生任何损失或承担任何费用： </br>您在服务中止或终止之前已经与个人用户会员达成交易合同，但合同尚未实际履行或已部分履行的，养车宝有权在中止或终止服务的同时处理您就该订单与养车宝的结算金额，并将相关情形通知您的交易对方，同时养车宝有权按照个人用户要求或指示取消该订单。</br>七、法律适用及争议解决 </br>1、本协议的订立、效力、解释、履行及争议均适用中华人民共和国法律，并排除一切冲突法规的运用。   </br>2、因本协议产生之争议，双方一致同意提交北京市海淀区人民法院进行诉讼解决。 </br>3、养车宝因主张权利所支付的律师费、诉讼费等一切相关费用由过错方承担。</br>八、其他</br>养车宝不行使、未能及时行使或者未充分行使本条款或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响养车宝在将来行使该权利。 </br>在法律允许的最大范围内，养车宝保留对本协议条款的最终解释权。</br>如您对本条款内容有任何疑问，可拨打客服电话01058377979进行咨询。</br></br>
								</div>
							</div>
						</div>
						<div class="grid-row-fluid"> 
							<label class="span6 grid-layout-label"></label>
							<div class="span10 grid-layout-content fluid-wrap">
								<div data-name="agree" class="jrad-checkbox-container"></div>
							</div>
						</div>
					</div>
					<div class="step-pane" id="step2">
					    <div class="grid-row-fluid">
						    <label class="span5 grid-layout-label">
							<span class="ui-form-required">*</span>店铺类型：</label>
							<div class="span19 grid-layout-content fluid-wrap">
								<div data-name="shopType" class="jrad-radio-container"></div>
							</div>
						</div>
						<div class="grid-row-fluid">
							<label class="span5 grid-layout-label">
								<span class="ui-form-required">*</span>店名：
							</label>
							<div class="span19 grid-layout-content fluid-wrap">
								<div class="jrad-input-container" name="shopName"></div>
							</div>
							<div class="checkInfo"></div>
						</div>
						<div class="grid-row-fluid">
							<label class="span5 grid-layout-label">
								<span class="ui-form-required">*</span>工商注册名称：</label>
							<div class="span19 grid-layout-content fluid-wrap">
								<div class="jrad-input-container" name="businessName">
								</div>
							</div>
							<div class="checkInfo"></div>
						</div>
						<!-- <div class="grid-row-fluid">
							<label class="span4 grid-layout-label">
								<span class="ui-form-required">
									*
								</span>
								商户对外简称：
							</label>
							<div class="span6 grid-layout-content fluid-wrap">
								<div class="jrad-input-container" name="businessRegName">
								</div>
							</div> 
							<div class="checkInfo"></div>
						</div>  -->
						<div class="grid-row-fluid"> 
							<label class="span5 grid-layout-label"> 
								<span class="ui-form-required">
									*
								</span>
								店铺地址：
							</label>
							<label class="span1 grid-layout-label"> 
								省：
							</label>
							<div class="span5 grid-layout-content fluid-wrap">
								<div class="jrad-select-container" name="provinceId">
								</div>
							</div>
							<label class="span1 grid-layout-label"> 
								市：
							</label>
							<div class="span5 grid-layout-content fluid-wrap">
								<div class="jrad-select-container" name="areaCodeId">
								</div>
							</div>
							<label class="span2 grid-layout-label"> 
								区县：
							</label>
							<div class="span5 grid-layout-content fluid-wrap">
								<div class="jrad-select-container" name="countyId">
								</div>
							</div>
						</div>
						<div class="grid-row-fluid">
							<label class="span5 grid-layout-label"> 
								<span class="ui-form-required">
									*
								</span>
								详细地址：
							</label>
							<div class="span19 grid-layout-content fluid-wrap">
								<div class="jrad-input-container" name="address">
								</div>
							</div>
						</div> 
						<div class="grid-row-fluid">
							<label class="span5 grid-layout-label"> 
								<span class="ui-form-required">
									*
								</span>
								联系人姓名：
							</label>
							<div class="span19 grid-layout-content fluid-wrap">
								<div class="jrad-input-container" name="linkman">
								</div>
							</div>
						</div> 
						<div class="grid-row-fluid">
							<label class="span5 grid-layout-label"> 
								<span class="ui-form-required">
									*
								</span>
								联系人手机 ：
							</label>
							<div class="span19 grid-layout-content fluid-wrap">
								<div class="jrad-input-container" name="phone">
								</div>
							</div>
						</div> 
						<div class="grid-row-fluid">
							<label class="span5 grid-layout-label">
								<span class="ui-form-required">
									*
								</span> 营业执照： 
							</label>
							<div class="span19 grid-layout-content fluid-wrap">
								<div name="licenseUrl" class="jrad-uploadimg-container">
								</div>
							</div>
						</div>
						<div style="border-top:3px solid #dfe4ec;margin:20px 0 5px 0;"></div>
						<div class="grid-row-fluid chainStore" type="hidden">
							<label class="grid-layout-label"></label>
							<div class="span15 grid-layout-content fluid-wrap" style="color:#e74c3c">
								 总店信息审核通过后，您可以在后台创建并管理分店信息。
							</div>
						</div>
						<div class="grid-row-fluid">
							<label class="grid-layout-label"></label>
							<div class="span15 ui-note" style="width:555px;">
								<div style="overflow:hidden;margin-bottom:10px;">
									<p style="float:left;">营业执照电子版上传方式1：</p>
									<ul style="float:left;">
										<li>1、手机拍摄清晰的营业执照；</li>
										<li>2、通过手机QQ“我的电脑”，传送到电脑QQ，保存到电脑桌面；</li>
										<li>3、在此界面点击“选择”，选择桌面对应图片即可。</li>
									</ul>							  
								</div>
								<div style="overflow:hidden;margin-left:107px;margin-bottom:10px;width:350px;">
									<p style="float:left;">方式2：</p>
									<ul style="float:left;">
										<li>1、手机拍摄清晰的营业执照；</li>
										<li>2、通过USB连接线连接电脑；</li>
										<li>3、在电脑上找到对应图片放到电脑桌面；</li>
										<li>4、在此界面点击“选择”，选择桌面对应图片即可。</li>
									</ul>
								</div>
								<p>您如果无法上传营业执照，可拨打客服电话01058377979咨询。</p>
							</div>
						</div>
					</div>
					<div class="step-pane" id="step3">
						<div style="margin-top:30px;"> 
							<p>我们会在一个工作日完成审核（节假日除外），审核结果我们将以短信的方式通知您；</p>
							<p>您可通过注册手机号及密码登录vip.yangchebao.com.cn查询审核进度；</p>
							<p>如有疑问，您可拨打客服电话01058377979咨询。</p>
						</div> 
						<div class="btnBox">
							<a href="http://www.yangchebao.com.cn/index.html" style="text-align:center;border:1px solid #000;padding-top:10px;padding-bottom:10px;dispaly:block;width:150px;margin:0 auto;margin-top:250px;" target="_blank">进入官网首页</a>
							<a href="http://www.yangchebao.com.cn/qdhz.html" style="text-align:center;border:1px solid #000;padding-top:10px;padding-bottom:10px; dispaly:block;width:150px;margin:10px auto;" target="_blank">更多合作</a>
						</div>
					</div>
					 
					<div class="wizard-actions" style="padding-left:70px;overflow:hidden;">
						<button class="btn btn-small btn-prev" disabled="disabled" style="float:left;padding:10px 50px;margin:0px 10px 0 0;font-size:16px;">
							上一步,注册账号
						</button>
						<button class="btn btn-small btn-primary btn-next" last-data="下一步" style="float:left;padding:10px 50px;font-size:16px;">下一步，店铺信息认证
						</button>
					</div>
				</div>
			</div>
		</div> 
	</div>
<script type="text/javascript" src="scripts/plugin/index.js"></script>  
<script type="text/javascript">
var wait = 60;
$(document).ready(function(){
	var wraper=$('div.login-container');
	var jRad = {params:{},validators:{}};  
    jRad.params['agree'] = {
        data: [{id:'0',name:'同意'}],
		onclick:function(){
			var arr = $("div[data-name='agree']").checkbox('val'); 
			if(arr.length==0){
				$(".wizard-actions .btn-next").addClass("disabled");
			}else{
				$(".wizard-actions .btn-next").removeClass("disabled");
			}
		}
    }; 
	jRad.params['password'] = {
        type: 'password'
    };
	jRad.params['repassword'] = {
        type: 'password'
    };
    jRad.params['shopType'] = {
        data: [
		{id:'1',name:'独立经营，只有1家店面，只管理自己的店铺信息'},
		{id:'2',name:'连锁店/加盟店的总店，管理包括总店在内所有分店的信息'},
		{id:'3',name:'连锁店/加盟店的分店，只管理自己的店铺信息'} 
		]
    };
	jRad.params['provinceId'] = {
			urlData:{
				url:'/vip-ws/ws/0.1/area/provinceAll'
			},
			unshiftData: {id:'',name:'请选择'},
			onchange: function(){
				var provinceCode = $('div[name=provinceId]',wraper).select('val');
				if(provinceCode==''){
					$('div[name=areaCodeId]',wraper).select({
						urlData:{url:''},
						data:[{id:'',name:'请选择'}],
						val: ''
					});
				}else{
					$('div[name=areaCodeId]',wraper).select({
						urlData:{
							url: '/vip-ws/ws/0.1/area/municipalities?provinceId=' + provinceCode 
						},
						unshiftData: {id:'',name:'请选择'},
						val:''
					});
				} 
				$('div[name=countyId]',wraper).select({
					urlData:{url:''},
					data:[{id:'',name:'请选择'}],
					val: ''
				});
			}
		};
	 jRad.params['areaCodeId'] = {
		data: [{id:'',name:'请选择'}],
		onchange: function(){
			var cityId = $('div[name=areaCodeId]',wraper).select('val');
			if(cityId==''){
				$('div[name=countyId]',wraper).select({
														urlData:{url:''},
														data:[{id:'',name:'请选择'}],val: ''});
			}else{
				$('div[name=countyId]',wraper).select({
					urlData:{
						url: '/vip-ws/ws/0.1/area/countries?areaCodeId=' + cityId
					},
					unshiftData: {id:'',name:'请选择'},
					val:''
				});
			}
		}
	}; 
	jRad.params['countyId'] = {
			data: [{id:'',name:'请选择'}]
		};
	jRad.params['licenseUrl']={
		grid:4,
		url :'/vip-ws/ws/0.1/file/upload',
		dataType:'text/html',
		filename:"file", 
		note: '仅支持 JPG图片文件，且建议大小小于20M,宽高不能小于180*135。',
		beforeSubmit: function(obj){
			  var re = /^.*\.(jpg|JPG)$/;
			  if(re.test(obj.val())){
			    return true;
			  }else{  
				$.jRadAlert("只能上传jpg文件", "error");
			    return false;
			  }
		},
		validator : [{
			msg : "请选择要上传的文件",
			type : "min",
			value : "1"
		}],
		error:function(data){
			 $.jRadAlert(data,"error"); 
		},
		show:true,
		showLarge:true,
	    single:true,
		prev:'large'		
	}; 
	jRad.validators['alias'] = [{msg:'请输入',type:'min',value:1},{msg:"手机格式不对",type:'regex',value:/^((\+86)|(86)){0,}1\d{10}$/}];	
    jRad.validators['code'] = [{msg:'请输入',type:'min',value:1},{msg:"验证码为四位数字",type:'regex',value:/^\d{4}$/}];
    jRad.validators['password'] = [{msg:'请输入6-16位的密码',type:'min',value:6},{msg:'请输入6-16位的密码',type:'max',value:16}];
    jRad.validators['repassword'] = [{msg:'请输入',type:'min',value:1}];
   
    jRad.validators['shopType'] = [{msg:'请选择',type:'min',value:1}]; 
	jRad.validators['shopName'] = [{msg:'请输入',type:'min',value:1}]; 
	jRad.validators['businessName'] = [{msg:'请输入',type:'min',value:1}]; 
	jRad.validators['businessRegName'] = [{msg:'请输入',type:'min',value:1}]; 
	jRad.validators['provinceId'] = [{msg:'请选择',type:'min',value:1}]; 
	jRad.validators['areaCodeId'] = [{msg:'请选择',type:'min',value:1}]; 
	jRad.validators['countyId'] = [{msg:'请选择',type:'min',value:1}]; 
	jRad.validators['address'] = [{msg:'请输入',type:'min',value:1}]; 
	jRad.validators['linkman'] = [{msg:'请输入',type:'min',value:1}]; 
	jRad.validators['phone'] = [{msg:'请输入',type:'min',value:1},{msg:"手机格式不对",type:'regex',value: /^((\+86)|(86)){0,}1\d{10}$/}];	
	jRad.validators['licenseUrl'] = [{msg:'请输入',type:'min',value:1}];

	$('#jrad-step-form').stepform({ 
        layout: 'block',
        validators: jRad.validators,
        fields: jRad.params,
        readonly: {
            contentResourceId: true
        }, 
		item:{'agree':'0'},
        fluid: true,
		next:function(e,info){   
			if(info.step==1){ 
				if(info.direction == 'next'){
				var pwd = $("#step1 div[data-name = 'password']").input('val');
				var repwd = $("#step1 div[data-name = 'repassword']").input('val');
				var agree =  $("#step1 div[data-name = 'agree']").checkbox('val');
				var again =  $("#step1 div[data-name = 'verifyCode']").input('val');
				//alert(again)
				if(agree.length==0){ 
						return false
					}else{
						if(pwd=='' || repwd==''){
							return false
						}
						if(pwd!==repwd){ 
							$.jRadAlert("重复密码需和密码一致。","error");
							return false
						}
						if(again == ''){
							$('.note').html('附加码不能为空').css('color','#ff0000').show();
							return false
						}else{
							$('.note').html("").hide();
						}

						var postData = {};  
						postData.alias = $("#step1 div[data-name = 'alias']").input('val');
						postData.password = hex_md5($("#step1 div[data-name = 'password']").input('val')); 
						postData.code = $("#step1 div[data-name = 'code']").input('val');
						var flag = false;
						$.jRadPost({
						   url:'/vip-ws/ws/0.1/user/registry/checkParam',
						   data:postData,
						   success:function(){
							 flag = true;
							 $(".wizard-actions .btn-next").html('下一步，等待审核')
						   },
						   error:function(xhr){
							var errormsg = eval("(" + xhr.responseText + ")");
							$.jRadAlert(errormsg[0].message,"error",-1); 
						}});
						return flag;
					}
				}
			}
			else if(info.step==2){
				if(info.direction == 'previous'){
					$(".wizard-actions .btn-next").html('下一步，店铺信息认证')
				}
				$('#jrad-step-form').attr("style","margin-bottom:60px;")
				if(info.direction == 'next'){
			    	var flag = $('#jrad-step-form').stepform('validateAll');
					if(!flag){
						return false;
					}
					var postData = $('#jrad-step-form').stepform('getValue');  
						if(postData.licenseUrl[0]==undefined){
							$.jRadAlert("请上传营业执照","error");
							return false;
					}else{
						postData.licenseUrl = postData.licenseUrl[0].src;  
					}
					postData.password = hex_md5($("#step1 div[data-name = 'password']").input('val')); 
						$.jRadPost({
						   url:'/vip-ws/ws/0.1/shopAccountBack/registry/info',
						   data:postData,
						   success:function(){
						   	$(".wizard-actions").hide();
							 return;
						   },
						   error:function(xhr){
								var errormsg = eval("(" + xhr.responseText + ")");
								$.jRadAlert(errormsg[0].message,"error",-1);
								return false;
						   }
						})
					}
			}
			else if(info.step==3){ 
			}  
			return;
		}
    });
	$("#getcodeBtn").click(function(){
	    if($(this).hasClass("disabled")){
	    	$('.note').html("").hide();
			return false;
		}
		var input =  $("#step1 div[data-name = 'alias']"); 
		var yzm =  $("#step1 div[data-name = 'verifyCode']"); 
		var flag = input.input('validate');
		if(flag){  
			var mobile = input.input('val'); 
			var _verifyCode = yzm.input('val')
			//alert(_verifyCode)
			$.jRadGet({url:'/vip-ws/ws/0.1/user/registry/getcode?user='+mobile+'&verifyCode='+_verifyCode,
					   success:function(){
						$.jRadAlert("如果您在1分钟内没有收到验证码，请检查您填写的手机号码是否正确或重新发送。","success","",-1); 
						$('.note').html("").hide();
					   },error:function(xhr){
					 	var errormsg = eval("(" + xhr.responseText + ")");
						//$.jRadAlert(errormsg[0].message,"error","",-1);
						$('.note').html(errormsg[0].message).css('color','#ff0000').show();
						wait = 0; 
					   }});
			time(); 
		}
	});
});
function time() {
	var o = $("#getcodeBtn");
	if (wait == 0) {
	o.removeClass("disabled");
	o.html("获取验证码"); 
	wait = 60;
	} else {
	o.addClass("disabled", true);
	o.html(wait + " 秒后重新获取验证码");
	wait--;
	setTimeout(function() {
	time();//循环调用
	},
	1000)
	}
} 
</script>
</body>
</html>
