/**
 * ClassName 人员布局
 */
Ext.define("core.user.view.DeptLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.deptlayout',
			title : "<center height=40>部门岗位管理</center>",
			closable:true,
			defaults : {
				split : true,// 可以设置好看点的折叠效果
				bodyStyle : 'padding:1px'
			},
			layout : 'border',
			items : [{
						title : "部门管理",
						region : 'west',
						//region : 'center',
						// iconCls:'goodtype_tree',
						xtype : "depttree",
						margins : '5 2 5 5',
						width : 250
					}, {
						xtype : "panel",
						title : '部门信息',
						region : "center",
						layout : "border",
						items : [{
									xtype : 'panel',
									region : 'north',
									// iconCls:'goodtype_tree',
									margins : '5 2 5 5',
									height : 200,
									// width: 200,

									collapsible : true,// 可以被折叠
									layout : 'fit',
									items : [{
												xtype : "deptform"
											}]
								}, {

									// iconCls:'good_table',
									xtype : 'panel',
									region : 'center',
									height : 500,
									margins : '5 5 5 0',
									layout : 'fit',
									items : [{
												xtype : "rolegrid",
												title:"角色"
											}]
								}]
					}]
		});