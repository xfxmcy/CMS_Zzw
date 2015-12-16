Ext.define("core.app.view.TaskJobForm",{
	extend:"Ext.form.Panel",
	alias:"widget.taskjobform",
		layout : {
				type : "table",
				columns : 2
			},
	id:"taskjobform",
	align:"left",
	defaults:{
			margin:"10 0 0 15",
			selectOnFocus:true,
			width:300,
			msgTarget:"side" //提示信息现在的位置
		},
	tbar:[{
			xtype:"button",
				ref:"button_first",
				iconCls:"table_save",
				text:"",
				hidden:true
			},{
				xtype:"button",
				ref:"button_second",
				iconCls:"wfend",
				text:"",
				hidden:true
			},{
				xtype:"button",
				ref:"button_third",
				iconCls:"wfreturn",
				text:"",
				hidden:true
			},{
				xtype:"button",
				ref:"return",
				iconCls:"return",
				text:"返回"
			},{
				xtype:"displayfield",
				value:"流程已经结束",
				hidden:true
			}],
	items:[{
			xtype:"textfield",
				fieldLabel:"主键",
				name:"app.id",
				hidden:true
			},{
				xtype:"textfield",
				fieldLabel:"key",
				name:"app.key",
				value:"car",
				hidden:true
			},{
				xtype:"textfield",
				fieldLabel:"申请人",
				name:"app.createUser",
				readOnly:true
			},{
				xtype:"textfield",
				fieldLabel:"申请人编码",
				name:"app.createUserCode",
				readOnly:true
			},{
				xtype:"textfield",
				fieldLabel:"车型",
				allowBlank : false,
				name:"app.vehicleType"

			},{
				xtype:"textfield",
				fieldLabel:"状态",
				value:0,
				name:"app.state"

			},{
				xtype:"textfield",
				fieldLabel:"车牌",
				allowBlank : false,
				name:"app.plateNumber"
			},{
				xtype:"numberfield",
				fieldLabel:"申请金额",
				name:"app.money",
				allowBlank : false,
				value:0,
				colspan: 2
			},{
				xtype:"textareafield",
				fieldLabel:"申请备注",
				name:"app.remark",
				width:620,
				colspan: 2
			},{
				xtype:"textareafield",
				fieldLabel:"审批备注",
				name:"assess",
				width:620,
				colspan: 2,
				hidden:true
			},{
				xtype:"textareafield",
				fieldLabel:"流程定义ID",
				name:"pdid",
				hidden:true
			},{
				xtype:"textareafield",
				fieldLabel:"流程实例ID",
				name:"piid",
				hidden:true
			},{
				xtype:"textareafield",
				fieldLabel:"流程状态",
				name:"status",
				hidden:true
			},{
				xtype:"textfield",
				fieldLabel:"任务ID",
				name:"taskId",
				hidden:true

			}],
	initComponent:function(){
		this.callParent(arguments);
	}
});