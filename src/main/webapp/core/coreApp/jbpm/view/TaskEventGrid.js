/**
 * ClassName 流程挂接视图
 * */
Ext.define("core.jbpm.view.TaskEventGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.taskeventgrid",
	store:"core.jbpm.store.TaskEventStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	title:"<center height=40>节点事件</center>",
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'添加事件',ref:'addEvent',iconCls:'table_add'},
		{xtype:'button',text:'保存',ref:'saveEvent',iconCls:'table_save'},
		{xtype:'button',text:'删除',ref:'delEvnet',iconCls:'table_remove'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.jbpm.store.TaskEventStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"排序",dataIndex:"orderIndex",width:100,field:{xtype:"numberfield"}},
		{text:"事件类型",dataIndex:"eventType",width:100,field:{xtype:"textfield"}},
		{text:"执行策略",dataIndex:"executeStrategy",width:100,field:{xtype:"textfield"}},
		{text:"执行业务Bean",dataIndex:"serviceId",width:100,field:{xtype:"textfield"}},
		{text:"执行业务方法",dataIndex:"serviceMethod",width:100,field:{xtype:"textfield"}},
		{text:"方法参数",dataIndex:"methodParams",width:100,field:{xtype:"textfield"}}
	],
	initComponent:function(){
		this.editing=Ext.create("Ext.grid.plugin.CellEditing");
		this.plugins=[this.editing];
		this.callParent(arguments);
	}
});