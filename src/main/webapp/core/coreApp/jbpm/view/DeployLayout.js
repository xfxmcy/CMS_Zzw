Ext.define("core.jbpm.view.DeployLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.deploylayout',
			title : "<center height=40>流程定义</center>",
			closable:true,
			defaults : {
				bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"deploygrid"
			}]
});