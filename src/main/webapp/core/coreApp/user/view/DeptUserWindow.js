/**
 * ClassName 部门树形视图
 */
Ext.define("core.user.view.DeptUserWindow", {
			extend : "Ext.window.Window",
			alias : "widget.deptuserwindow",
			id:"deptuserwindow",
			width:362,
			height:518,
			title:"选择人员",
			layout:"fit",
			closable:true,
			closeAction:"destroy",
			modal:true,
			items:[{xtype:"deptusertree"}],
			bbar:[{
				xtype:"button",
				text:"确定",
				ref:"submit"
			},{
				xtype:"button",
				text:"取消",
				ref:"cal"
			}]
	});