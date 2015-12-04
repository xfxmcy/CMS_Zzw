/*
 * ClassName role grid model
 */
 Ext.define("core.user.model.JobGridModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"jobName",type:"string",srotable:true},
 		{name:"checked",type:"string",srotable:true}
 		
 	]
 });