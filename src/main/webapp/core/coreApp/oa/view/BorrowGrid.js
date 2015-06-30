/**
 * ClassName 借款申请视图
 * */
Ext.define("core.oa.view.BorrowGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.borrowgrid",
	store:"core.oa.store.BorrowMoneyStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'添加',ref:'add',iconCls:'table_add'},
		{xtype:'button',text:'删除',ref:'delete',iconCls:'table_remove'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.oa.store.BorrowMoneyStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"申请人",dataIndex:"createUser",width:100},
		{text:"所属部门",dataIndex:"createDept",width:100},
		{text:"申请金额",dataIndex:"money",width:100},
		{text:"申请时间",dataIndex:"createTime",width:150},
		{text:"借款理由",dataIndex:"jieYou",width:300}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});