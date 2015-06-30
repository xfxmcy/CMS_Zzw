/*
 * ClassName 用户数据集
 */
 Ext.define("core.jbpm.store.DeployStore",{
 	extend:'Ext.data.Store',
	model:'core.jbpm.model.DeployModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:"/jbpmItem/pc/wfDeploymentAction!load.action",
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