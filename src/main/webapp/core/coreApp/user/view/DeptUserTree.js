/**
 * ClassName 部门树形视图
 */
Ext.define("core.user.view.DeptUserTree", {
			extend : "Ext.tree.Panel",
			alias : "widget.deptusertree",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			animate : false, // 去掉一些动画效果
			store : "core.user.store.DeptUserStore"
		});