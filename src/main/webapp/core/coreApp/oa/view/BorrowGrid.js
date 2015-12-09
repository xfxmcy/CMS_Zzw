/**
 * ClassName 借款申请视图
 * */
Ext.define("core.oa.view.BorrowGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.borrowgrid",
	store:"core.oa.store.BorrowMoneyStore",
	/*selModel:{
		selType:"checkboxmodel"
	},*/
	border:0,
	multiSelect:true,
	frame:true,
	tbar:[
		{xtype:'button',text:'申请',ref:'add',iconCls:'table_add'},
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
		{text:"申请人",align:'center',dataIndex:"user.username",width:'18%'},
		{text:"车型",align:'center',dataIndex:"vehicleType",width:'15%'},
		{text:"车牌",align:'center',dataIndex:"plateNumber",width:'15%'},
		{text:"金额",align:'center',dataIndex:"money",width:'18%'},
		{text:"申请时间",align:'center',dataIndex:"createTime",width:'20%'},
		{text:"状态",align:'center',dataIndex:"state",width:'10%'}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});