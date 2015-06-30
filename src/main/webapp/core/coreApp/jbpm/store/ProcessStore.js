/*
 * ClassName 用户数据集
 */
 Ext.define("core.jbpm.store.ProcessStore",{
 	extend:'Ext.data.Store',
	model:'core.jbpm.model.ProcessModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/wfProcessAction!load.action",
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