/**
 * 程序布局放大中间的部分
 */
Ext.define("core.jbpm.view.ProcessTab",{
	extend: 'Ext.tab.Panel',
	alias: 'widget.processtab',
	border : 0,
	bodyStyle: 'padding:0px',
	menuAlign:"center",
	items:[{
		xtype:"processeventgrid"
	},{
		xtype:'tasklayout'
	}]
});