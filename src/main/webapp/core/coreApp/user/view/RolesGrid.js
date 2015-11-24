/**
 * ClassName 人员数据列表视图
 * */
Ext.define("core.user.view.RolesGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.rolesgrid",
	store:"core.user.store.RolesGridStore",
	selModel:{
		selType:"rowmodel"
	},
	border:0,
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'添加',ref:'add',iconCls:'table_add'},
		{xtype:'button',text:'修改',ref:'edit',iconCls:'table_edit'},
		{xtype:'button',text:'删除',ref:'delete',iconCls:'table_remove'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.user.store.RolesGridStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"角色名称",dataIndex:"name",width:300,field:{
			xtype:"textfield"
		},align:'center'},
		{text:"角色编码",dataIndex:"code",width:300,field:{
			xtype:"textfield"
		},align:'center'}/*,
		{text:"性别",dataIndex:"sex",width:50,field:{
			xtype:"textfield"
		}},{text:"出生日期",dataIndex:"birthday",width:150,field:{
			xtype:"datefield",
			width:150
		}}*/
	],
	initComponent:function(){
		this.editing=Ext.create("Ext.grid.plugin.CellEditing");
		this.plugins=[this.editing];
		this.callParent(arguments);
	}
});