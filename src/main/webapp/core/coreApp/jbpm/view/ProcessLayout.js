Ext.define("core.jbpm.view.ProcessLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.processlayout',
			title : "<center height=40>流程挂接管理</center>",
			closable:true,
			defaults : {
				bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"processgrid"
			},{
				xtype:"processform",
					hidden:true
			}]
});