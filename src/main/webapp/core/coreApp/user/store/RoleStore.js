 Ext.define("core.user.store.RoleStore",{
	extend:"Ext.data.TreeStore",
	defaultRootId:"root",
	proxy:{
		api:{
			remove:"/jbpmItem/pc/roleAction!doDelete.action",  //后台处理删除的url地址
			save:"/jbpmItem/pc/roleAction!doSave.action",  //后台处理删除的url地址
			update:"/jbpmItem/pc/roleAction!doUpdate.action"  //后台处理删除的url地址
		},
		type:"ajax",
		url:"/jbpmItem/pc/roleAction!loadTree.action",
		reader:{
			type:"json"
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true
 });