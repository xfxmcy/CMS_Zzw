/*
 * ClassName 用户数据集
 */
 Ext.define("core.user.store.UserStore",{
 	extend:'Ext.data.Store',
	model:'core.user.model.UserModel',
	pageSize:20,
	proxy:{
		type:"ajax",
		url:CY.ns + "/user/userAction!doQueryUsers.asp",
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