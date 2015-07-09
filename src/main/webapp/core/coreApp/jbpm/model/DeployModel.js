/*
 * ClassName 流程部署
 */
 Ext.define("core.jbpm.model.DeployModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"processDefinitionId",type:"string",srotable:true},
 		{name:"deployId",type:"string",srotable:true},
 		{name:"filePath",type:"string",srotable:true},
 		{name:"fileName",type:"string",srotable:true},
 		{name:"processName",type:"string",srotable:true},
 		{name:"processKey",type:"string",srotable:true},
 		{name:"descript",type:"string",srotable:true},
 		{name:"version",type:"int",srotable:true},
 		{name:"createTime",type:"string",srotable:true},
		{name:"createUser",type:"string",srotable:true},
		{name:"photoPath",type:"string",srotable:false}
		
 	]
 });