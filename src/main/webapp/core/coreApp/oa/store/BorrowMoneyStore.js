/*
 * ClassName 用户数据集
 */
 Ext.define("core.oa.store.BorrowMoneyStore",{
 	extend:'Ext.data.Store',
	model:'core.oa.model.BorrowMoneyModel',
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