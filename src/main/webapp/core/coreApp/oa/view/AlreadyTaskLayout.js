Ext.define("core.oa.view.AlreadyTaskLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.alreadyTaskLayout',
			title : "<center height=40>已办任务</center>",
			closable:true,
			defaults : {
				//bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"alreadytaskgrid"
			},{
				xtype:"alreadytaskform",
					hidden:true
			}]
});