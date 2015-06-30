/*
 * ClassName 功能挂接表格
 */
 Ext.define("core.jbpm.model.ProcessModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"modelName",type:"string",srotable:true},
 		{name:"modelIdName",type:"string",srotable:true},
 		{name:"deploymentId",type:"string",srotable:true},
 		{name:"processDefinitionId",type:"string",srotable:true},
 		{name:"processName",type:"string",srotable:true},
 		{name:"processKey",type:"string",srotable:true},
 		{name:"mountStatus",type:"string",srotable:true},
 		{name:"wfDeploymentId",type:"string",srotable:true},
 		{name:"version",type:"string",srotable:true}
 	]
 });