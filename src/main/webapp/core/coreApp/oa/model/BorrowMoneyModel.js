/*
 * ClassName 功能挂接表格
 */
 Ext.define("core.oa.model.BorrowMoneyModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"money",type:"double",srotable:true},
 		{name:"createUser",type:"string",srotable:true},
 		{name:"createUserCode",type:"string",srotable:true},
 		{name:"createDept",type:"string",srotable:true},
 		{name:"createDeptCode",type:"string",srotable:true},
 		{name:"jieYou",type:"string",srotable:true},
 		{name:"createTime",type:"string",srotable:true}
 	]
 });