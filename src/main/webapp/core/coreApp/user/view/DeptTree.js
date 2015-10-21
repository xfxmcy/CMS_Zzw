/**
 * ClassName 部门树形视图
 */
Ext.define("core.user.view.DeptTree", {
			extend : "Ext.tree.Panel",
			alias : "widget.depttree",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			animate : false, // 去掉一些动画效果
			store : "core.user.store.DeptStore",
			tools : [{
						type:'refresh',
	   					 qtip: '刷新',
	   					 handler: function(event, toolEl, header){
	    					header.ownerCt.getStore().load();
	    					header.ownerCt.down('button[ref=treechildIns]').setDisabled(true);
	    					header.ownerCt.down('button[ref=treeDel]').setDisabled(true);
	    					var deptForm=header.ownerCt.up("deptlayout").down("deptform").getForm();
	   					 	deptForm.findField("deptId").setValue("");
							deptForm.findField("deptName").setValue("");
							deptForm.findField("deptCode").setValue("");
							deptForm.findField("parentId").setValue("");
							deptForm.findField("treeSign").setValue("");
	   					 }
					}],
			// rbar
			tbar : [{
						xtype : 'button',
						tooltip : '添加部门',
						iconCls : 'tree_model_add',
						ref : 'treeIns'
					},{
						xtype : 'button',
						tooltip : '添加子部门',
						iconCls : 'tree_func_add',
						disabled : true,
						ref : 'treechildIns'
					}, {
						xtype : 'button',
						tooltip : '删除部门',
						iconCls : 'tree_delete',
						disabled : true,
						ref : 'treeDel'
					}]
		});