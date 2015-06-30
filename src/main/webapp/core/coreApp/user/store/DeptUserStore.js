 Ext.define("core.user.store.DeptUserStore",{
	extend:"Ext.data.TreeStore",
	defaultRootId:"root",
	model:"core.user.model.DeptUserModel",
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/userAction!loadUserTree.action",
		reader:{
			type:"json"
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true
 });