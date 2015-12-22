Ext.define("core.oa.view.AlreadyTaskForm",{
	extend:"Ext.form.Panel",
	alias:"widget.alreadytaskform",
		layout : {
				type : "table",
				columns : 2
			},
	id:"alreadytaskform",
	align:"left",
	defaults:{
			margin:"10 0 0 15",
			selectOnFocus:true,
			width:300,
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
				//allowBlank : false,
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
				//allowBlank : false,
				name:"app.plateNumber"
			},{
				xtype:"numberfield",
				fieldLabel:"申请金额",
				name:"app.money",
				//allowBlank : false,
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
				xtype:"displayfield",
				fieldLabel:"流程批注",
				name:"outDetail",
				fieldStyle:'color:salmon',
				colspan: 2
			},{
				xtype:"displayfield",
				fieldLabel:"流程走向",
				fieldStyle:'color:salmon',
				name:"outcome"
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