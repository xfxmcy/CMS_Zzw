Ext.define("core.jbpm.view.TaskForm", {
			extend:"Ext.form.Panel",
			alias : 'widget.taskform',
			tbar : [{
						xtype : "button",
						text : "保存信息",
						ref : "saveInfo",
						iconCls : "table_save"
					}],
			ref : "caledate",
			
			title : "<center height=40>委托管理</center>",
			border : 0,
			layout : {
				type : "table",
				columns : 2
			},
			items : [{
						xtype : "textfield",
						fieldLabel : "主键",
						name : "id",
						margin : "40 0 0 15",
						hidden : true
					},{
						xtype : "textfield",
						fieldLabel : "任务节点名称",
						name : "taskName",
						margin : "40 0 0 15",
						hidden : true
					}, {
						xtype : "textfield",
						fieldLabel : "任务委托方式",
						name : "assigneType",
						margin : "40 0 0 15"
					}, {
						xtype : "textfield",
						fieldLabel : "任务委托人",
						name : "assignees",
						margin : "40 0 0 15"
					}, {
						xtype : "textfield",
						fieldLabel : "任务委托角色",
						name : "roles",
						margin : "40 0 0 15"
					}]

		})