/*
 * ClassName 用户数据集
 */
 Ext.define("core.oa.store.AlreadyTaskStore",{
 	extend:'Ext.data.Store',
	model:'core.oa.model.AlreadyTaskModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:CY.ns + "/app/appAction!doQueryMyApplicationPaged.asp",
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