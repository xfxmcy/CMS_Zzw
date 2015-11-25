/*
 * ClassName 用户实体
 */
 Ext.define("core.user.model.UserModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"userId",type:"string",srotable:true},
 		{name:"username",type:"string",srotable:true},
 		{name:"usercode",type:"string",srotable:true}
 	]
 });