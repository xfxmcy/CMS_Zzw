/*
 * ClassName 功能挂接表格
 */
 Ext.define("core.jbpm.model.ProcessModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		
 		{name:"deployment.processName",type:"string",srotable:true},
 		{name:"deployment.version",type:"string",srotable:true},
 		{name:"deployment.processKey",type:"string",srotable:true},
 		
 		{name:"updateUser.username",type:"string",srotable:true},
 		
 		{name:"updateTime",type:"string",srotable:true},
 		{name:"mountStatus",type:"string",srotable:true},
 		{name:"departmentCode",type:"string",srotable:true}
 	]
 });