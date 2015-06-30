/*
 * ClassName 用户实体
 */
 Ext.define("core.user.model.UserModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"userId",type:"string",srotable:true},
 		{name:"userName",type:"string",srotable:true},
 		{name:"userCode",type:"string",srotable:true},
 		{name:"treeSign",type:"string",srotable:true},
 		{name:"parentId",type:"string",srotable:true},
 		{name:"deptCode",type:"string",srotable:true},
 		{name:"deptName",type:"string",srotable:true}
 	]
 });