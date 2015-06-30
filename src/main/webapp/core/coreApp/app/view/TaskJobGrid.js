/**
 * ClassName 事务列表视图
 * */
Ext.define("core.app.view.TaskJobGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.taskjobgrid",
	store:"core.app.store.TaskJobStore",
	border:0,
	title:"事务提醒",
	multiSelect:false, //设置单选
	frame:true,
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.app.store.TaskJobStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"流程名称",dataIndex:"processName",width:130},
		{text:"任务名称",dataIndex:"taskName",width:150},
		{text:"执行人",dataIndex:"assigne",width:100},
		{text:"创建时间",dataIndex:"createTime",width:150}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});