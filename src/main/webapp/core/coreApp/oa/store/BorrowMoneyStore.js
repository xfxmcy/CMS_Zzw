/*
 * ClassName 用户数据集
 */
 Ext.define("core.oa.store.BorrowMoneyStore",{
 	extend:'Ext.data.Store',
	model:'core.oa.model.BorrowMoneyModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/borrowMoneyAction!load.action",
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