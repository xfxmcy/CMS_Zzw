Ext.define("core.jbpm.view.DeployLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.deploylayout',
			title : "<center height=40>流程部署管理</center>",
			closable:true,
			defaults : {
				bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"deploygrid"
			}]
});