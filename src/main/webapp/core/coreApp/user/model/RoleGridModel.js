/*
 * ClassName role grid model
 */
 Ext.define("core.user.model.RoleGridModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		
 		{name:"name",type:"string",srotable:true},
 		{name:"code",type:"string",srotable:true},
 		{name:"checked",type:"string",srotable:true}
 		
 	]
 });