Ext.define("core.oa.view.BorrowForm",{
	extend:"Ext.form.Panel",
	alias:"widget.borrowform",
		layout : {
				type : "table",
				columns : 2
			},
	id:"borrowform",
	align:"left",
	defaults:{
			margin:"10 0 0 15",
			selectOnFocus:true,
			width:300,
			msgTarget:"side" //提示信息现在的位置
		},
	tbar:[{
			xtype:"button",
				ref:"save",
				iconCls:"table_save",
				text:"确认申请"
			},{
				xtype:"button",
				ref:"wfEnd",
				iconCls:"wfend",
				text:"撤销",
				hidden:true
			},{
				xtype:"button",
				ref:"wfReturn",
				iconCls:"wfreturn",
				text:"取回",
				hidden:true
			},{
				xtype:"button",
				ref:"wfBack",
				iconCls:"wfback",
				text:"回退",
				hidden:true
			},{
				xtype:"button",
				ref:"wfNext",
				iconCls:"wfnext",
				text:"送交",
				hidden:true
			},{
				xtype:"button",
				ref:"wfTake",
				iconCls:"wftake",
				text:"处理任务",
				hidden:true
			},{
				xtype:"button",
				ref:"return",
				iconCls:"return",
				text:"返回"
			},{
				xtype:"button",
				ref:"wfStart",
				iconCls:"wfstart",
				text:"启动买车流程",
				hidden:true
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
				name:"app.state",
				hidden:true

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
			},/*{
				xtype:"textfield",
				fieldLabel:"申请时间",
				name:"app.createTime",
				readOnly:true
			},*/{
				xtype:"textareafield",
				fieldLabel:"申请备注",
				name:"app.remark",
				width:620,
				colspan: 2
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
			}],
	initComponent:function(){
		this.callParent(arguments);
	}
});