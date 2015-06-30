/*
 * ClassName 用户数据集
 */
 Ext.define("core.jbpm.store.TaskEventStore",{
 	extend:'Ext.data.Store',
	model:'core.jbpm.model.TaskEventModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/wfTaskEventAction!load.action",
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