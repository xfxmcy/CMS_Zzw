/**
 * ClassName 借款申请视图
 * */
Ext.define("core.oa.view.AlreadyTaskGrid",{
	extend:"Ext.grid.Panel",
	mixins:{
		gridUtils:"core.utils.FormUtils"
	},
	alias:"widget.alreadytaskgrid",
	store:"core.oa.store.AlreadyTaskStore",
	/*selModel:{
		selType:"checkboxmodel"
	},*/
	border:0,
	multiSelect:false,
	frame:true,
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.oa.store.AlreadyTaskStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"办理人",align:'center',dataIndex:"username",width:'14%'},
		{text:"处理时间",align:'center',dataIndex:"TIME_",width:'15%'},
		{text:"所用时长",align:'center',dataIndex:"countTime",width:'14%'},
		{text:"处理结果",align:'center',dataIndex:"OUTCOME_",width:'17%'},
		{text:"备注",align:'center',dataIndex:"MESSAGE_",width:'20%'},
		{xtype: 'actioncolumn',width:'17%',align: 'center',
			text: '操作',
			items: [{
				icon: 'ext4/icon/cog_edit.png',  // Use a URL in the icon config
				tooltip: '详情',
				handler: function (grid, rowIndex, colIndex) {
					var alreadyGrid = grid.up('alreadyTaskLayout').down('alreadytaskgrid');
					alreadyGrid.hide();
					var form = grid.up('alreadyTaskLayout').down('alreadytaskform');
					//render data
					var renderData = alreadyGrid.getStore().getAt(rowIndex);
					form.getForm().findField('outcome').setValue(renderData.data.OUTCOME_);
					form.getForm().findField('outDetail').setValue(renderData.data.MESSAGE_);
					Ext.Ajax.request({
						url: CY.ns + "/app/appAction!doQueryApplicationById.asp",
						params: {"app.id": renderData.data.businessId},
						method: "POST",
						timeout: 4000,
						success: function (response, opts) {
							var resObj = Ext.decode(response.responseText);
							var result = resObj.result;
							if (resObj.success) {
								if (result.user) {
									form.getForm().findField('app.createUser').setValue(result.user.username);
									form.getForm().findField('app.createUserCode').setValue(result.user.usercode);
								}
								form.getForm().findField('app.vehicleType').setValue(result.vehicleType);
								///form.getForm().findField('app.state').setValue(CY.changeStateValue(result.state));
								form.getForm().findField('app.plateNumber').setValue(result.plateNumber);
								form.getForm().findField('app.money').setValue(result.money);
								form.getForm().findField('app.remark').setValue(result.remark);
								form.getForm().findField('app.id').setValue(result.id);
							}
							alreadyGrid.readOnlyFields(form.getForm());
							form.show();
						}
					});





				}
			}]
		}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});