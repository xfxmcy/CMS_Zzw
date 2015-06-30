/**
 * 系统主程序的主页面布局
 * 
 */
Ext.define("core.app.view.MainView", {
			extend : 'Ext.panel.Panel',
			border : 0,
			layout : 'border',
			alias : 'widget.mainview',
			width : 1000,
			height : 1000,
			items : [{
						region : 'north',
						xtype : 'topview'
					}, {
						xtype : 'westview',
						region : 'west'
					}, {
						xtype : 'panel',
						region : 'center',
						layout : 'fit',
						margins : '2 0 0 0',
						border : 0,
						items : [{
									xtype : 'centerview',
									border : 0
								}]
					}],
			initComponent : function() {
				this.callParent(arguments);
			}
		})
