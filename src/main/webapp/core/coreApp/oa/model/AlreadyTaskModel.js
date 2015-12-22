

/*
 * ClassName 功能挂接表格
 */
 Ext.define("core.oa.model.AlreadyTaskModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"username",type:"string",srotable:true},
 		{name:"OUTCOME_",type:"string",srotable:true},
		{name:"TIME_",type:"string",srotable:true},
 		{name:"countTime",type:"string",srotable:true},
 		{name:"businessId",type:"string",srotable:true},
 		{name:"modelName",type:"string",srotable:true},
 		{name:"MESSAGE_",type:"string",srotable:true}
 	]
 });