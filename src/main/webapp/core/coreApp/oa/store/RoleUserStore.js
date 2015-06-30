 Ext.define("core.oa.store.RoleUserStore",{
	extend:"Ext.data.TreeStore",
	defaultRootId:"root",
	model:"core.oa.model.RoleUserModel",
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/roleAction!findWfUserRole.action",
		reader:{
			type:"json"
		},
		writer:{
			type:"json"
		}
	},
	autoSync : true,
	autoLoad:false
 });