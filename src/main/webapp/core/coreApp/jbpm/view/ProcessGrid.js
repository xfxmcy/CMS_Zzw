/**
 * ClassName 流程挂接视图
 * */
Ext.define("core.jbpm.view.ProcessGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.processgrid",
	store:"core.jbpm.store.ProcessStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	multiSelect:false,
	frame:true,
	tbar:[
		{xtype:'button',text:'挂接流程',ref:'addProcess',iconCls:'table_add'},
		{xtype:'button',text:'取消挂接',ref:'calProcess',iconCls:'table_remove'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.jbpm.store.ProcessStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"流程名称",dataIndex:"processName",width:100},
		{text:"流程key",dataIndex:"processKey",width:100},
		{text:"实体名称",dataIndex:"modelName",width:100},
		{text:"实体主键名称",dataIndex:"modelIdName",width:100},
		{text:"挂接状态",dataIndex:"mountStatus",width:100},
		{text:"流程版本",dataIndex:"version",width:100}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});