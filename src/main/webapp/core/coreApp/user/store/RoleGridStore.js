/*
 * ClassName 用户数据集
 */
 Ext.define("core.user.store.RoleGridStore",{
 	extend:'Ext.data.Store',
	model:'core.user.model.RoleGridModel',
	pageSize:10,
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
	listeners: {
		load: function(self, records, successful, eOpts ){
			var selmod = Ext.getCmp('rolegrid').getSelectionModel();
			//selmod.selectAll();
			selmod.deselectAll();
			for(var i=0 ; i < records.length ; i++){
				if("1" === records[i].data.checked){
					selmod.select(records[i],true);//true  已经选中的  保持选中
				}	
			}	
		}
	},
	autoLoad:true	
 });