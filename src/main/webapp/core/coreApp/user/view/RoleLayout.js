/**
 * ClassName 人员布局
 */
Ext.define("core.user.view.RoleLayout", {
			extend : 'Ext.panel.Panel',
			alias : 'widget.rolelayout',
			title : "<center height=40>角色管理</center>",
			closable:true,
			defaults : {
				split : true,// 可以设置好看点的折叠效果
				bodyStyle : 'padding:1px'
			},
			layout : 'border',
			id:"rolelayout",
			items : [/*{
						title : "角色管理",
						region : 'west',
						// iconCls:'goodtype_tree',
						xtype : "roletree",
						margins : '5 2 5 5',
						width : 250
					},*/ {
						xtype : "panel",
						title : '角色信息',
						region : "center",
						height : 500,
						margins : '5 5 5 0',
						layout : 'fit',
						items : [/*{
									xtype : 'panel',
									region : 'north',
									// iconCls:'goodtype_tree',
									margins : '5 2 5 5',
									height : 200,
									// width: 200,

									collapsible : true,// 可以被折叠
									layout : 'fit',
									items : [{
												xtype : "roleform"
											}]
								}, {

									// iconCls:'good_table',
									xtype : 'panel',
									region : 'center',
									title : "角色人员",
									height : 500,
									margins : '5 5 5 0',
									layout : 'fit',
									items : [*/{
												xtype : "rolesgrid"/*,
												tbar : [{
															xtype : 'button',
															text : '添加角色',
															ref : 'roleAdd',
															iconCls : 'table_add'
														},{
															xtype : 'button',
															text : '修改角色',
															ref : 'roleAdd',
															iconCls : 'table_edit'
														}, {
															xtype : 'button',
															text : '删除角色',
															ref : 'roleDelete',
															iconCls : 'table_remove'
														}],
												columns : [{
															xtype : "rownumberer"
														}, {
															text : "角色",
															align : "center",
															dataIndex : "userName",
															width : 250
														}, {
															text : "角色编码",
															dataIndex : "userCode",
															align : "center",
															width : 250
														}]*/
											}/*]
								}*/]
					}]
		});