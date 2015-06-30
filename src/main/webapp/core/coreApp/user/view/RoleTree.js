/**
 * ClassName 部门树形视图
 */
Ext.define("core.user.view.RoleTree", {
			extend : "Ext.tree.Panel",
			alias : "widget.roletree",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			animate : false, // 去掉一些动画效果
			store : "core.user.store.RoleStore",
			tools : [{
						type:'refresh',
	   					 qtip: '刷新',
	   					 handler: function(event, toolEl, header){
	    					Ext.Msg.alert("提示","刷新角色")
	   					 }
					}],
			rbar : [{
						xtype : 'button',
						tooltip : '添加角色',
						iconCls : 'tree_role_add',
						ref : 'treeIns'
					}, {
						xtype : 'button',
						tooltip : '删除角色',
						iconCls : 'tree_role_delete',
						disabled : true,
						ref : 'treeDel'
					}]
		});