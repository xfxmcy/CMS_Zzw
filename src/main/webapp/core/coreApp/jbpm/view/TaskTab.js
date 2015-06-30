Ext.define("core.jbpm.view.TaskTab", {
			extend : 'Ext.tab.Panel',
			alias : 'widget.tasktab',
			title:"任务节点信息",
			defaults : {
				bodyStyle : 'padding:1px'
			},
			items:[{
				xtype:"taskform"
			},{
				xtype:"taskeventgrid",
				height:200
			}]
});