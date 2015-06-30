/*
 * ClassName 用户数据集
 */
 Ext.define("core.jbpm.store.TaskStore",{
 	extend:'Ext.data.Store',
	model:'core.jbpm.model.TaskModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/wfTaskAction!load.action",
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'		
		},
		writer:{
			type:"json"
		}
	}
 });