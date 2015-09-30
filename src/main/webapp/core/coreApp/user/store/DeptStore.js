 Ext.define("core.user.store.DeptStore",{
	extend:"Ext.data.TreeStore",
	defaultRootId:"root",
	proxy:{
		api:{
			remove:"/jbpmItem/pc/deptAction!doDeleteTree.action",  //后台处理删除的url地址
			save:"/jbpmItem/pc/deptAction!doSaveTree.action",  //后台处理删除的url地址
			update:"/jbpmItem/pc/deptAction!doUpdateTree.action"  //后台处理删除的url地址
		},
		type:"ajax",
		url:CY.ns + "/dept/deptAction!loadTree.action",
		reader:{
			type:"json"
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true
 });