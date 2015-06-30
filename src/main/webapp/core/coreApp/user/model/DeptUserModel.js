/*
 * ClassName 用户实体
 */
 Ext.define("core.user.model.DeptUserModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"text",type:"string",srotable:true},
 		{name:"leaf",type:"boolean",srotable:true},
 		{name:"expandable",type:"boolean",srotable:true},
 		{name:"code",type:"string",srotable:true},
 		{name:"nodeInfo",type:"string",srotable:true},
 		{name:"parent",type:"string",srotable:true},
 		{name:"checked",type:"boolean",srotable:true,defaultValue:false}
 	]
 });

	