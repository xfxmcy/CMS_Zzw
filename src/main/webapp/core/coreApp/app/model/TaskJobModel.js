/*
 * ClassName 事务提醒
 */
 Ext.define("core.app.model.TaskJobModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"taskId",type:"string",srotable:true},
 		{name:"taskName",type:"string",srotable:true},
 		{name:"processName",type:"string",srotable:true},
 		{name:"pdid",type:"string",srotable:true},
 		{name:"assigne",type:"string",srotable:true},
 		{name:"createTime",type:"string",srotable:true},
 		{name:"modelName",type:"string",srotable:true},
 		{name:"idValue",type:"string",srotable:true}
 	]
 });