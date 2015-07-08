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
					fieldLabel : "流程名称",
					labelWidth : 60,
					width : 220,
					selectOnFocus : true,
					regex : /([A-Za-z]{1})\w{1,19}/,
					regexText : '流程名称格式有误',
					name : 'deploy.processName',
					margin : "10 0 10 20",
					allowBlank : false,
					//value:"admin"
				},{
					name : 'deploy.descript',
					fieldLabel : '流程描述',
					labelWidth : 60,
					width : 220,
					allowBlank : false,
					//inputType : 'password',
					margin : "10 0 10 20"
					//value:"admin"
				},{
			        xtype: 'filefield',
			        name: 'jpdl',
			        fieldLabel: 'jpdl',
			        labelWidth: 60,
			        msgTarget: 'side',
			        allowBlank: false,
			        anchor: '88%',
			        margin : "10 0 10 20",
			        buttonText: 'Select...',
			        validator: function(value){
    		            var arr = value.split('.');
    		            if(arr[arr.length-1] != 'xml'){
    		            	return '文件不合法！！！';
    		            }else{
    		              return true;
    		            }
			        }
			    },{
					xtype : "button",
					text : '提交',
					ref:"submitPD",
					width : 50,
					margin : "10 10 10 80",
					handler : function(btn) {
					}
				},{
					xtype : "button",
					text : '关闭',
					ref:"cancelPD",
					width : 50,
					margin : "10 10 10 20",
					handler : function(btn) {
						var window=btn.up("upProcessDefinitionWindow");
						window.hide();
					}
				}]
	}]
});
