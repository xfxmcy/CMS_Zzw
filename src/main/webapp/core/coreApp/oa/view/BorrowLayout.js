Ext.define("core.oa.view.BorrowLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.borrowlayout',
			title : "<center height=40>申请买车</center>",
			closable:true,
			defaults : {
				//bodyStyle : 'padding:1px'
			},
			layout : 'fit',
			items:[{
				xtype:"borrowgrid"
			},{
				xtype:"borrowform",
					hidden:true
			}]
});