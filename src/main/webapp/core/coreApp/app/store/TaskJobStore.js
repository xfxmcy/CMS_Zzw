/*
 * ClassName 用户数据集
 */
 Ext.define("core.app.store.TaskJobStore",{
 	extend:'Ext.data.Store',
	model:'core.app.model.TaskJobModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/wfTaskAction!getCurrentUserTasks.action",
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