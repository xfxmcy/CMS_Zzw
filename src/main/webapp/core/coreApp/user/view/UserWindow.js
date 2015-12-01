/**
 * ClassName role window
 */
Ext.define("core.user.view.UserWindow", {
			extend : "Ext.window.Window",
			alias : "widget.userwindow",
			id:"userwindow",
			width:362,
			height:208,
			title:"用户信息",
			layout:"fit",
			closable:true,
			closeAction:"destroy",
			modal:true,
			items:[{
				xtype : "form",
				ref:"userform",
				defaults : {
					labelSeparator : ':',
					labelWidth : 70,
					width : 190,
					allowBlank : false,
					labelAlign : 'left',
					msgTarget : 'side'
				},
				defaultType : 'textfield',
				frame:true,
				items : [{
					fieldLabel : "用户ID",
					hidden:true,
					allowBlank : true,
					name : 'id'

				}, {
					fieldLabel : "用户帐号",
					selectOnFocus : true,
					//regex : /([A-Za-z]{1})\w{1,19}/,
					//regexText : '用户名格式有误',
					name : 'username',
					margin : "10 10 10 50"

				}, {
					name : 'usercode',
					fieldLabel : '用户编码',
					//inputType : 'password',
					margin : "10 10 10 50"

				},{
					xtype:"button",
					text:"确定",
					ref:"submit",
					width : 50,
					margin : "0 0 0 100"
				},{
					xtype:"button",
					text:"取消",
					ref:"cal",
					width : 50,
					margin : "0 0 0 40",
					handler : function(btn) {
						var window=btn.up("userwindow");
						window.hide();
					}
				}]

			}]
	});