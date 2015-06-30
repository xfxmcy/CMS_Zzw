/**
 * ClassName 部门树形视图
 */
Ext.define("core.oa.view.RoleUserTree", {
			extend : "Ext.tree.Panel",
			alias : "widget.roleusertree",
			title:"委托选择",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			animate : false, // 去掉一些动画效果
			store : "core.oa.store.RoleUserStore"
		});