/*
 * ClassName 任务节点挂接表格
 */
 Ext.define("core.jbpm.model.TaskModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"deploymentId",type:"string",srotable:true},
 		{name:"processDefinitionId",type:"string",srotable:true},
 		{name:"modelName",type:"string",srotable:true},
 		{name:"modelIdName",type:"string",srotable:true},
 		{name:"taskNodeId",type:"string",srotable:true},
 		{name:"taskNodeName",type:"string",srotable:true},
 		{name:"ableButtons",type:"string",srotable:true},
 		{name:"ableFileds",type:"string",srotable:true}
 	]
 });