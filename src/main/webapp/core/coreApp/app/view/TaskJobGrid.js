/**
 * ClassName 事务列表视图
 * */
Ext.define("core.app.view.TaskJobGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.taskjobgrid",
	id:"taskjobgrid",
	mixins : {
		formUtils : "core.utils.FormUtils"
	},
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
		{text:"任务名称",dataIndex:"taskName",align:'center',width:'20%'},
		{text:"流程名称",dataIndex:"processName",align:'center',width:'20%'},
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
					var businessId = rec.data.idValue;
					if(!businessId){
						Ext.Msg.alert("提示","程序异常");
						return;
					}
					var param = {};
					param.id = rec.data.taskId;
					param.fn = function(transition) {
						Ext.Ajax.request({
							url: CY.ns + "/app/appAction!doQueryApplicationById.asp",
							params: {"app.id": businessId},
							method: "POST",
							timeout: 4000,
							success: function (response, opts) {
								var resObj = Ext.decode(response.responseText);
								var result = resObj.result;
								if (resObj.success) {
									if (result.user) {
										taskForm.getForm().findField('app.createUser').setValue(result.user.username);
										taskForm.getForm().findField('app.createUserCode').setValue(result.user.usercode);
									}
									taskForm.getForm().findField('app.vehicleType').setValue(result.vehicleType);
									taskForm.getForm().findField('app.state').setValue(CY.changeStateValue(result.state));
									taskForm.getForm().findField('app.plateNumber').setValue(result.plateNumber);
									taskForm.getForm().findField('app.money').setValue(result.money);
									taskForm.getForm().findField('app.remark').setValue(result.remark);
									taskForm.getForm().findField('taskId').setValue(rec.data.taskId);
									taskGrid.readOnlyFields(taskForm.getForm());
									CY.setTransitionIntoForm(transition,taskForm);
									var field = taskForm.getForm().findField('assess');
									field.setReadOnly(false);
									field.show();
									taskGrid.hide();
									taskForm.show();
								} else {
									Ext.Msg.alert("提示", resObj.info);
								}
							}
						});
					};
					CY.queryTransitionByTaskId(param);


				}
			}]
		}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});