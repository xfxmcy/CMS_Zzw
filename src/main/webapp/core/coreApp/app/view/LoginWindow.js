Ext.define('core.app.view.LoginWindow', {
	extend : 'Ext.window.Window',
	title : "登录系统",
	width : 300,
	height : 220,
	alias:"widget.loginwindow",
	modal : true,
	closable : false,
	closeAction:"destroy",
	layout : "fit",
	id:"loginwindow",
	items : [{
		xtype : "form",
		ref:"loginform",
		defaults : {
			labelSeparator : ':',
			labelWidth : 30,
			width : 170,
			allowBlank : false,
			labelAlign : 'left',
			msgTarget : 'side'
		},
		defaultType : 'textfield',
		frame:true,
		items : [{
					xtype : "displayfield",
					hideLabel : true,
					margin : "10 10 20 90",
					value : "<font color=red size=3><b>人员登录</b></font>"
				}, {
					fieldLabel : "帐号",
					selectOnFocus : true,
					regex : /([A-Za-z]{1})\w{1,19}/,
					regexText : '用户名格式有误',
					name : 'userName',
					margin : "20 10 10 50",
					value:"admin"
				}, {
					name : 'password',
					fieldLabel : '密码',
					inputType : 'password',
					margin : "10 10 10 50",
					value:"admin"
				}, {
					xtype : "button",
					text : '登录',
					ref:"login",
					id:"loginWindowLogin",
					width : 50,
					margin : "10 10 10 80",
					handler : function(btn) {
						
					}
				}/*, {
					xtype : "button",
					text : '退出',
					width : 50,
					margin : "10 10 10 20",
					handler : function(btn) {
						var window=btn.up("loginwindow");
						window.hide();
					}
				}*/]
	}]
});
