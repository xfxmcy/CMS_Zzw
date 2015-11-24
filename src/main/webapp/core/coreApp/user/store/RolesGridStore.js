/*
 * ClassName 用户数据集
 */
 Ext.define("core.user.store.RolesGridStore",{
 	extend:'Ext.data.Store',
	model:'core.user.model.RoleGridModel',
	pageSize:20,
	proxy:{
		type:"ajax",
		url:CY.ns + "/role/roleAction!doQueryRolesPagedByDept.asp",
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'		
		},
		writer:{
			type:"json"
		}
	},
	/*listeners: {
		load: function(self, records, successful, eOpts ){

		}
	},*/
	autoLoad:true	
 });