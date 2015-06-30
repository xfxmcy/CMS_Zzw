Ext.define("core.jbpm.view.TaskLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.tasklayout',
			title:"<center height=40>任务节点信息</center>",
			defaults : {
				bodyStyle : 'padding:1px'
			},
			items:[{
				xtype:"taskgrid",
				height:200
			},{
				xtype:"tasktab"
			}]
});