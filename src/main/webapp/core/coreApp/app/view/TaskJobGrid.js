/**
 * ClassName 事务列表视图
 * */
Ext.define("core.app.view.TaskJobGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.taskjobgrid",
	store:"core.app.store.TaskJobStore",
	border:0,
	title:"待办事务提醒",
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
		{text:"流程名称",dataIndex:"processName",align:'center',width:200},
		{text:"任务名称",dataIndex:"taskName",align:'center',width:200},
		{text:"执行人",dataIndex:"assigne",align:'center',width:200},
		{text:"创建时间",dataIndex:"createTime",align:'center',width:250}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});