/*
 * ClassName 用户数据集
 */
 Ext.define("core.user.store.UserStore",{
 	extend:'Ext.data.Store',
	model:'core.user.model.UserModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/userAction!load.action",
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'		
		},
		writer:{
			type:"json"
		}
	},
	autoLoad:true	
 });