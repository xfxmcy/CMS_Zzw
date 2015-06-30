Ext.define("core.user.view.ProcessForm",{
	extend:"Ext.form.Panel",
	alias:"widget.processform",
		layout : {
				type : "table",
				columns : 3
			},
	align:"left",
	defaults:{
			margin:"10 0 0 15",
			selectOnFocus:true,
			msgTarget:"side" //提示信息现在的位置
		},
	tbar:[{
				xtype:"button",
				ref:"return",
				iconCls:"return",
				text:"返回"
			}],
	items:[{
				xtype:"textfield",
				fieldLabel:"流程名称",
				name:"processName",
				readOnly:true
			},{
				xtype:"textfield",
				fieldLabel:"流程key",
				name:"processKey",
				readOnly:true
			},{
				xtype:"textfield",
				fieldLabel:"实体名称",
				name:"modelName",
				readOnly:true
			},{
				xtype:"textfield",
				fieldLabel:"实体主键名称",
				name:"modelIdName",
				readOnly:true
			},{
				xtype:"textfield",
				fieldLabel:"挂接状态",
				name:"mountStatus",
				readOnly:true
			},{
				xtype:"textfield",
				fieldLabel:"流程版本",
				name:"version",
				readOnly:true
				
			},{
				xtype:"textfield",
				fieldLabel:"主键值",
				name:"id",
				hidden:true
			},{
				xtype:"processtab",
				colspan: 3,
				height:480,
				margin:"20 0 0 15"
			}]
});