/**
 * ClassName 流程挂接视图
 * */
Ext.define("core.jbpm.view.TaskGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.taskgrid",
	store:"core.jbpm.store.TaskStore",
	border:0,
	multiSelect:false,
	frame:true,
	tbar:[
		{xtype:'button',text:'保存节点信息',ref:'saveNode',iconCls:'table_save'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.jbpm.store.TaskStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"任务节点名称",dataIndex:"taskNodeName",width:100},
		{text:"可编辑字段",dataIndex:"ableFileds",width:100,field:{
			xtype:"textfield"
		}},
		{text:"可显示按钮",dataIndex:"ableButtons",width:100,field:{
			xtype:"textfield"
		}}
	],
	initComponent:function(){
		this.editing=Ext.create("Ext.grid.plugin.CellEditing");
		this.plugins=[this.editing];
		this.callParent(arguments);
	}
});