Ext.define('core.jbpm.view.UploadPDWindow', {
	extend : 'Ext.window.Window',
	title : "上传流程定义",
	width : 300,
	height : 220,
	alias:"widget.upProcessDefinitionWindow",
	modal : true,
	closable : false,
	closeAction:"destroy",
	layout : "fit",
	id:"upProcessDefinitionWindow",
	items : [{
		xtype : "form",
		ref:"uploadPDForm",
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
		items : [/*{
					xtype : "displayfield",
					hideLabel : true,
					margin : "10 10 20 90",
					value : "<font color=red size=3><b>人员登录</b></font>"
				},*/ {
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
					text : '提交',
					ref:"submitPD",
					width : 50,
					margin : "10 10 10 80",
					handler : function(btn) {
					}
				}]
	}]
});
