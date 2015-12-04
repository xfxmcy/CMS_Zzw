/**
 * ClassName 人员数据列表视图
 * */
Ext.define("core.user.view.UserGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.usergrid",
	id:"usergrid",
	store:"core.user.store.UserStore",
	selModel:{
		//selType:"checkboxmodel"
		selType:"rowmodel"
	},
	border:0,
	multiSelect:false,
	frame:true,
	tbar:[
		{xtype:'button',text:'添加',ref:'add',iconCls:'table_add'},
		{xtype:'button',text:'修改',ref:'edit',iconCls:'table_edit'},
		{xtype:'button',text:'删除',ref:'delete',iconCls:'table_remove'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.user.store.UserStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"用户姓名",dataIndex:"username",width:"45%",align:'center'},
		{text:"用户编码",dataIndex:"usercode",width:"45%",align:'center'}

	],
	initComponent:function(){
		/*this.editing=Ext.create("Ext.grid.plugin.CellEditing");
		this.plugins=[this.editing];*/
		this.callParent(arguments);
	}
});