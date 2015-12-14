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
		{text:"流程名称",dataIndex:"processName",align:'center',width:'20%'},
		{text:"任务名称",dataIndex:"taskName",align:'center',width:'20%'},
		{text:"执行人",dataIndex:"assigne",align:'center',width:'19%'},
		{text:"创建时间",dataIndex:"createTime",align:'center',width:'18%'},
		{
			xtype: 'actioncolumn',
			width: '20%',
			align: 'center',
			text: '操作',
			items: [{
				icon: 'ext4/icon/cog_edit.png',  // Use a URL in the icon config
				tooltip: '处理',
				handler: function (grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					var taskForm = grid.up("centerview").down("taskjobform");
					var taskGrid = grid.up("centerview").down("taskjobgrid");
					taskGrid.hide();
					taskForm.show();


				}
			}]
		}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});