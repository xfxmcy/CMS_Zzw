/*
 * ClassName 功能挂接表格
 */
 Ext.define("core.jbpm.model.ProcessModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"deployId",type:"string",srotable:true},
 		{name:"pdId",type:"string",srotable:true},
 		{name:"deploymentId",type:"string",srotable:true},
 		{name:"photoPath",type:"string",srotable:true},
 		{name:"processName",type:"string",srotable:true},
 		{name:"mountStatus",type:"string",srotable:true},
 		{name:"createTime",type:"string",srotable:true},
 		{name:"createDept",type:"string",srotable:true},
 		{name:"version",type:"string",srotable:true}
 	]
 });