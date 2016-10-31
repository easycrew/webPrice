/**
 * jquery.tokeninput.js v0.1
 * jQuery Token Input Plugin
 * @author huozhe3136 <huozhe3136@hotmail.com>
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * $Date: 2009-01-23 7:44  $
 * Revision: $Id: jquery.tokeninput.js $
 * Example please visit http://www.xiami.com/res/js/jquery/tokeninput/index.html
 */
;(function($){
	$.fn.tokeninput = function(settings){
		//defaults
		var defaults ={
			url				: '',
			data			: [], //格式[{'id':1,'name':'hh'},{'id':2,'name':'hhh'}]
			initDataFromId	: '',
			cssWrap			: 'token-wrap',	//最外层div的css
			cssMain			: 'token-main',
			cssToken		: 'token-li', 	//div里是ul，ul里是li
			cssTokenFocus	: 'token-li-focus',
			cssArrowUp		: 'up',
			preAddFromId	: '',
			tokenLimit		: 0,	//0为不限制
			allowSelAll		: true,//是否允许全选
			inputItem		:{
				id				: 'token-inputItem',
				cssName			: 'token-inputItem',
				inputId			: 'token-input',
				inputCssName	: 'token-input',
				inputTabIndex	: '1'
			},
			dropDown		:{
				cssName			: 'token-dropdown',
				cssFocus		: 'focus',
				viewItemNum  	: 8
			},
			popWin			:{
				cssName 		: 'token-popwin',
				cssHead 		: 'head',
				cssBody 		: 'body',
				cssFoot 		: 'foot',
				headerText		: '请选择好友',
				cssBtnOk 		: 'bt_sub2',
				btnText 		: '确 定',
				selAllText		: '选择全部'
			}
		};
		
		$.extend(defaults, settings);
		
		//Data
		var Data={
			//InitFromUrl
			GetFromUrl : function(url){
				var data = null;
				if (url) {
					$.getJSON(defaults.url, null, function(response){
						data = response;
					});
				}
				return data;
			},
			
			//InitFromUl
			GetFromUl : function(ul){
				var data=[];
				$('li',$('#'+ul)).each(function(i){
					data[i]={name:$(this).text(),id:$(this).attr('val')};			 
				});
				return data;
			}
		};
		
		return this.each(function(){
			var isTokenFocus=false;
			var $this,$wrap,$main,$ul,$li,$input,$arrow,$popWin,$dropDown,$selAll;			
			$this = $(this);
			
			//与token相关
			var Token={
				//创建Token			
				Create : function(domObj){
					if(defaults.tokenLimit>0){
						if(Token.Count() >= defaults.tokenLimit){
							alert('最多只能选择'+defaults.tokenLimit+'个');
							if(domObj.tagName.toLowerCase() == 'input')
							domObj.checked=false;
							return false;
						}
					}
					
					var $domObj = $(domObj);
					var title = (domObj.tagName.toLowerCase() == 'input')  ? $domObj.attr('name') :  $domObj.html().replace(/<em>/gi,'').replace(/<\/em>/gi,'');;
					
					var value = $domObj.attr('val') || $domObj.val();
					if (value == '') return;
					if (Token.IsExist(value))return;
					
					var $tli=$('<li/>')	
						.attr({'val': value, 'class':defaults.cssToken,'style':'cursor:pointer;'})
						.append(title)
						.click(function(){Token.FocusOn(this);return false;})
						.dblclick(function(){
							PopWin.UnCheckItemByValue($(this).children('input').val());
							$(this).fadeOut('fast',function() {$(this).remove();});
							$input.focus();
						});
						
					$('<a/>').attr({'href': 'javascript:;'}).appendTo($tli).click(function() {
							PopWin.UnCheckItemByValue($(this).next().val());
							$(this).parent('li').fadeOut('fast',function() {$(this).remove();});
						});
						
					$('<input type="hidden"/>').appendTo($tli).attr({'name': ($this.attr('id')+'[]'), 'id': ($this.attr('id')+'[]'), 'value': value});
					
					$input.val('').parent().before($tli);
					PopWin.CheckItemByValue(value);
					return $tli;
				},
				
				//计算Token总数
				Count : function(){
					return $('li',$ul).size()-1;
				},
				
				//根据值来移除
				RemoveByValue : function(value){
					var $input = $("input[type=hidden]",$ul);
					for(var i=0;i<$input.size();i++){
						if($($input[i]).val()==value) $($input[i]).parent().remove();	
					}
					if($input.size()>0) $selAll.attr('checked',false);
				},
				
				//检查token是否已经存在
				IsExist : function(value){
					var input = $("input[type=hidden]",$ul);
					for(var i=0;i<input.size();i++){
						if($(input[i]).val()==value) return true;	
					}
					return false;
				},
				
				//FocusOn
				FocusOn : function(token){
					Token.FocusOff();
					$(token).addClass(defaults.cssTokenFocus);
					isTokenFocus = true;
				},
				
				//FocusOff
				FocusOff: function(){
					$('li',$ul).removeClass(defaults.cssTokenFocus);
					isTokenFocus = false;
				}
			};
			
			//与下拉相关
			var DropDown = {
				FocusItem : null,
				
				//重建下拉菜单
				ReBuild : function(){
					$dropDown.empty();
					var str = $input.val();
					if (str == ''){DropDown.FocusItem = null;return;}
					if(defaults.tokenLimit>0){
						if(Token.Count() >= defaults.tokenLimit){return;}
					}
					$.each(defaults.data, function(i, row){					
						if (row.name && row.name.indexOf(str)!= -1 && !Token.IsExist(row.id)){
							$('<a/>').attr({'val': row.id,'href':'javascript:;'})
								.html(row.name.replace(str, '<em>' + str + '</em>'))
								.appendTo($dropDown)
								.click(function(){
									Token.Create(this);
									$input.focus();
									DropDown.Hide();
								})
								.hover(
									function(){
										DropDown.FocusItem = this;
										$('a',$(this).parent()).removeClass(defaults.dropDown.cssFocus);
										$(this).addClass(defaults.dropDown.cssFocus);
									},function(){
										DropDown.FocusItem = null;
										$(this).removeClass(defaults.dropDown.cssFocus);
									}
								);
						}      
					});
					$('a:first',$dropDown).addClass(defaults.dropDown.cssFocus);
					DropDown.FocusItem = $('a:first',$dropDown)[0];
					DropDown.SetAutoHeight();
				},
				
				//设置自动高度
				SetAutoHeight : function(){
					if ($dropDown.children('a').size() > defaults.dropDown.viewItemNum) {
						$dropDown.css({'height':(defaults.dropDown.viewItemNum*24)+'px', 'overflow':'auto'}); 
					} else {
						$dropDown.css('height','auto');
					}   	
				},
				
				//显示下拉菜单
				Show : function(){
					$popWin.hide();
					$dropDown.fadeIn('fast');			
				},
				
				//隐藏下拉菜单
				Hide : function(){
					$dropDown.fadeOut('fast');
				}
			};
			
			//与弹出窗相关
			var PopWin = {
				//显示弹出窗
				Show : function(){
					$dropDown.hide();			
					$popWin.fadeIn('fast');
					$arrow.addClass(defaults.cssArrowUp);
				},
				
				//隐藏弹出窗
				Hide : function(){
					$popWin.fadeOut('fast');
					$arrow.removeClass();
				},
				
				//UnCheckItemByValue
				UnCheckItemByValue : function(value){
					var $checkbox = $("input[type=checkbox]",$popWin);
					for(var i=0;i<$checkbox.size();i++){
						if($checkbox[i].value==value) $checkbox[i].checked=false;
					}
					if($checkbox.size()>0) $selAll.attr('checked',false);
				},
				
				//CheckItemByValue
				CheckItemByValue : function(value){
					var $checkbox = $("input[type=checkbox]",$popWin);
					for(var i=0;i<$checkbox.size();i++){
						if($checkbox[i].value==value) $checkbox[i].checked=true;
					}
				},
				
				//Create
				Create : function(){
					var $pop,$head,$body,$bodyUl,$foot,$footBtn;
					$pop = $('<div/>')
						.attr({'class':defaults.popWin.cssName})
						.click(function(e){
							if (e) e.stopPropagation();
							else window.event.cancelBubble = true;
						});
					
					$head = $('<div/>')
						.attr({'class':defaults.popWin.cssHead})
						.append('<h4/>'+defaults.popWin.headerText+'</h4>')
						.appendTo($pop);
						
					$body = $('<div/>')
						.attr({'class':defaults.popWin.cssBody})
						.appendTo($pop);
					
					$bodyUl = $('<ul/>').appendTo($body);
					
					$.each(defaults.data, function(i, row){
						if (row.name) {
							var $ch = $('<input type="checkbox"/>')
								.attr({'value':row.id,'name':row.name,'checked': Token.IsExist(row.id)})
								.click(function(){
									if(this.checked){Token.Create(this);}
									else{Token.RemoveByValue($(this).val());} 
								});
							var $lab = $('<label/>').append($ch).append(row.name);
							$('<li/>').append($lab).appendTo($bodyUl);
						}
					});
					
					$foot = $('<div/>')
						.attr({'class':defaults.popWin.cssFoot})
						.appendTo($pop);
					
						
					if(defaults.allowSelAll){
						$selAll=$('<input type="checkbox"/>')
						.click(function(){
							if(defaults.tokenLimit>0){
								if(Token.Count() >= defaults.tokenLimit){
									alert('最多只能选择'+defaults.tokenLimit+'个');
									return false;
								}
							}
							
							var $ch = $('input[type=checkbox]',$bodyUl);
							for(var i=0;i<$ch.size();i++){
								$ch[i].checked=this.checked;
								if(this.checked){
									if(!Token.IsExist($ch[i].value)) Token.Create($ch[i]);
								}else
									Token.RemoveByValue($ch[i].value);
							}					
						});
						
						$('<label/>').append($selAll).append(defaults.popWin.selAllText).appendTo($foot);
					}else{
						$selAll=$('<input type="checkbox"/>');
						$('<label/>').appendTo($foot);					
					}
					
					$footBtn = $('<input type="button"/>')
						.attr({'value':defaults.popWin.btnText,'class':defaults.popWin.cssBtnOk})
						.click(PopWin.Hide)
						.appendTo($foot);
					
					$pop.append('<b/><i/><u/><tt/>');
					return $pop;
				}			
			};
			
			//init
			function init(){
				if(defaults.initDataFromId!=''){
					defaults.data = Data.GetFromUl(defaults.initDataFromId);
				}
				
				var r = defaults.inputItem;
				
				$wrap = $('<div/>').attr('class',defaults.cssWrap);				
				$main = $('<div/>').attr('class',defaults.cssMain).appendTo($wrap);
				$ul	  = $('<ul/>').click(function(){$input.focus();}).appendTo($main);
				$li   = $('<li/>').attr({'class': r.cssName, 'id': r.id}).appendTo($ul);
				
				//create input
				$input = $('<input type="text"/>').appendTo($li)
					.attr({'id':r.inputId,'class': r.inputCssName,'tabindex':r.inputTabIndex,'autocomplete':'off'})
					.focus(function(){PopWin.Hide();Token.FocusOff();})
					.keyup(function(e){
						var inputStr = $(this).val();
						if(inputStr != ''){
							Token.FocusOff();
							if(e.keyCode != 40 && e.keyCode!=38){DropDown.ReBuild();}
							DropDown.Show();
						}else{						
							DropDown.Hide();
						}						
					})
					.keydown(function(e){
						var inputStr = $(this).val();					
						//backspace press and then set pre token focus or remove last token
						if(e.keyCode==8 && inputStr==''){
							var lastToken = $(this).parent().prev();
							if(!isTokenFocus){
								Token.FocusOn(lastToken);
								return false;
							}else{
								$(lastToken).fadeOut('fast',function() {
									$(this).remove();
									PopWin.UnCheckItemByValue($('input',$(this)).val());
								});
								isTokenFocus = false;
							}
						}
						
						var cssFocus = defaults.dropDown.cssFocus;
						if(e.keyCode==40){
							if(typeof(DropDown.FocusItem) == 'undefined' || DropDown.FocusItem.length ==0){
								DropDown.FocusItem = $('a:first',$dropDown)[0];
							}else{
								$(DropDown.FocusItem).removeClass(cssFocus);
								DropDown.FocusItem = $(DropDown.FocusItem).next('a')[0];
								if(typeof(DropDown.FocusItem) == 'undefined' || DropDown.FocusItem.length ==0){
									DropDown.FocusItem = $('a:first',$dropDown)[0];
								}
							}	
							$(DropDown.FocusItem).addClass(cssFocus);
						}
						
						if(e.keyCode==38){
							if(typeof(DropDown.FocusItem) == 'undefined' || DropDown.FocusItem.length ==0){
								DropDown.FocusItem = $('a:last',$dropDown)[0];
							}else{
								$(DropDown.FocusItem).removeClass(cssFocus);
								DropDown.FocusItem = $(DropDown.FocusItem).prev('a')[0];
								if(typeof(DropDown.FocusItem) == 'undefined' || DropDown.FocusItem.length ==0){
									DropDown.FocusItem = $('a:last',$dropDown)[0];
								}
							}
							$(DropDown.FocusItem).addClass(cssFocus);
						}
						
						if(e.keyCode==13){
							if(DropDown.FocusItem != null){
								Token.Create(DropDown.FocusItem);
								$(this).val('');
								DropDown.Hide();
								DropDown.FocusItem = null;
							}
							return false;
						}
					});
				
				//create arrow
				$arrow=$('<span/>').appendTo($main).click(function(){
						$popWin.css('display')=='none' ? PopWin.Show() : PopWin.Hide(); return false;
					});
				
				//create preadd token item,maybe foreach
				if(defaults.preAddFromId!=''){
					var preadd = $('#'+defaults.preAddFromId+'>li');
					for(var i=0;i<preadd.size();i++){
						Token.Create(preadd[i]);
					}
				}
				
				//create Dropdown
				$dropDown=$('<div/>').attr({'class':defaults.dropDown.cssName}).appendTo($wrap);			
				DropDown.ReBuild();
				
				//create popup window
				$popWin = $(PopWin.Create()).appendTo($wrap);
				
				//append all of this
				$this.before($wrap).remove();
				
				$(document).click(function(){
					PopWin.Hide();
					DropDown.Hide();
				});
			};
			
			init();			
		});		
	}
})(jQuery);