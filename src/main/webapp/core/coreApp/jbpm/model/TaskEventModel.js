/*
 * ClassName 流程部署
 */
 Ext.define("core.jbpm.model.TaskEventModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"processDefinitionId",type:"string",srotable:true},
 		{name:"eventType",type:"string",srotable:true},
 		{name:"taskName",type:"string",srotable:true},
 		{name:"eventScope",type:"string",srotable:true},
 		{name:"executeStrategy",type:"string",srotable:true},
 		{name:"serviceId",type:"string",srotable:true},
 		{name:"serviceMethod",type:"string",srotable:true},
 		{name:"methodParams",type:"string",srotable:true},
 		{name:"orderIndex",type:"string",srotable:true}
 	]
 });