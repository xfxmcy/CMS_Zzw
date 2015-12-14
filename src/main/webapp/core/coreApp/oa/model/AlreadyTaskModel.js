

/*
 * ClassName 功能挂接表格
 */
 Ext.define("core.oa.model.AlreadyTaskModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"id",type:"string",srotable:true},
 		{name:"money",type:"double",srotable:true},
 		{name:"remark",type:"string",srotable:true},
		{name:"user.username",type:"string",srotable:true},
 		{name:"vehicleType",type:"string",srotable:true},
 		{name:"createDept",type:"string",srotable:true},
 		{name:"plateNumber",type:"string",srotable:true},
 		{name:"state",type:"string",srotable:true},
 		{name:"createTime",type:"string",srotable:true}
 	]
 });